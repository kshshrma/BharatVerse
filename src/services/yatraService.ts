import { CULTURAL_STATES, YATRA_DESTINATIONS, CulturalState, YatraDestination, TourScene } from "@/data/yatraData";
import { supabase } from "@/integrations/supabase/client";

const LOCAL_SAVED_KEY_PREFIX = "bv_saved_yatra_";
const GUEST_KEY = "guest";

const withTimeout = <T>(promise: Promise<T>, timeoutMs: number, fallbackValue: T): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallbackValue), timeoutMs))
  ]);
};

export const yatraService = {
  // 1. Get all cultural states
  async getStates(): Promise<CulturalState[]> {
    return CULTURAL_STATES;
  },

  // 2. Get single state by slug
  async getStateBySlug(stateSlug: string): Promise<{ state: CulturalState | null; destinations: YatraDestination[] }> {
    const normalizedSlug = (stateSlug || "").toLowerCase().trim();
    const state = CULTURAL_STATES.find(s => s.slug.toLowerCase() === normalizedSlug) || null;
    const allDestinations = await this.getAllDestinations();
    const destinations = allDestinations.filter(d => (d.stateSlug || "").toLowerCase() === normalizedSlug);
    return { state, destinations };
  },

  // 3. Get all destinations (combines static with database/custom with fast timeout)
  async getAllDestinations(): Promise<YatraDestination[]> {
    try {
      const fetchPromise = supabase
        .from("yatra_destinations" as any)
        .select("*")
        .eq("is_published", true);

      const res: any = await withTimeout(fetchPromise, 1200, { data: null, error: true });

      if (res && res.data && !res.error && res.data.length > 0) {
        const dbDestinations: YatraDestination[] = res.data.map((d: any) => ({
          id: d.id,
          slug: d.slug,
          name: d.name,
          stateSlug: d.state_slug,
          stateName: d.state_name,
          region: d.region,
          category: d.category,
          tagline: d.tagline || "",
          description: d.description || "",
          culturalSignificance: d.cultural_significance || "",
          historySummary: d.history_summary || "",
          heroImageUrl: d.hero_image_url || "",
          panoramaUrl: d.panorama_url,
          bestTimeToVisit: d.best_time_to_visit || "October to March",
          isFeatured: d.is_featured || false,
          highlights: Array.isArray(d.highlights) ? d.highlights : [],
          attractions: Array.isArray(d.attractions) ? d.attractions : [],
          traditions: Array.isArray(d.traditions) ? d.traditions : [],
          localCrafts: Array.isArray(d.local_crafts) ? d.local_crafts : [],
          famousFood: Array.isArray(d.famous_food) ? d.famous_food : [],
          scenes: []
        }));

        const dbSlugs = new Set(dbDestinations.map(d => d.slug.toLowerCase()));
        const uniqueStatic = YATRA_DESTINATIONS.filter(d => !dbSlugs.has(d.slug.toLowerCase()));
        return [...dbDestinations, ...uniqueStatic];
      }
    } catch {
      // Offline or table not configured - fallback to static
    }
    return YATRA_DESTINATIONS;
  },


  // 4. Get destination by stateSlug and destinationSlug
  async getDestinationBySlug(stateSlug: string, destinationSlug: string): Promise<YatraDestination | null> {
    const normalizedDestSlug = (destinationSlug || "").toLowerCase().trim();
    const normalizedStateSlug = (stateSlug || "").toLowerCase().trim();
    const all = await this.getAllDestinations();

    const match = all.find(
      d => d.slug.toLowerCase() === normalizedDestSlug && (normalizedStateSlug ? d.stateSlug.toLowerCase() === normalizedStateSlug : true)
    ) || all.find(d => d.slug.toLowerCase() === normalizedDestSlug) || null;

    return match;
  },

  // 5. Save destination to "My Yatra" (Supports both logged-in users and guests)
  async saveDestination(userId: string | null | undefined, destinationSlug: string, destinationId?: string): Promise<{ success: boolean; error?: string }> {
    const slug = (destinationSlug || "").toLowerCase().trim();
    if (!slug) return { success: false, error: "Invalid destination" };

    const effectiveUserId = userId || GUEST_KEY;

    try {
      this.saveToLocalStorage(effectiveUserId, slug);

      // If user is authenticated, sync with Supabase cloud database
      if (userId && userId !== GUEST_KEY) {
        try {
          await supabase.from("saved_destinations" as any).upsert({
            user_id: userId,
            destination_slug: slug,
            ...(destinationId ? { destination_id: destinationId } : {})
          }, { onConflict: "user_id,destination_slug" });
        } catch {
          // Local storage will preserve it seamlessly if database is unreachable
        }
      }

      // Notify all listening components and Navbar
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("yatra:saved_changed", { detail: { slug, isSaved: true, userId: effectiveUserId } }));
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // 6. Remove saved destination
  async unsaveDestination(userId: string | null | undefined, destinationSlug: string): Promise<{ success: boolean; error?: string }> {
    const slug = (destinationSlug || "").toLowerCase().trim();
    if (!slug) return { success: false, error: "Invalid destination" };

    const effectiveUserId = userId || GUEST_KEY;

    try {
      this.removeFromLocalStorage(effectiveUserId, slug);

      // If user is authenticated, remove from Supabase cloud database
      if (userId && userId !== GUEST_KEY) {
        try {
          await supabase
            .from("saved_destinations" as any)
            .delete()
            .eq("user_id", userId)
            .eq("destination_slug", slug);
        } catch {}
      }

      // Notify all listening components and Navbar
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("yatra:saved_changed", { detail: { slug, isSaved: false, userId: effectiveUserId } }));
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // 7. Check if destination is saved
  async isDestinationSaved(userId: string | null | undefined, destinationSlug: string): Promise<boolean> {
    const slug = (destinationSlug || "").toLowerCase().trim();
    if (!slug) return false;

    if (userId) {
      const isSaved = this.isSavedInLocalStorage(userId, slug);
      if (isSaved) return true;
      // Also check guest storage in case migration is pending
      return this.isSavedInLocalStorage(GUEST_KEY, slug);
    }
    return this.isSavedInLocalStorage(GUEST_KEY, slug);
  },

  // 8. Get all saved destinations synchronously (instant zero-latency rendering)
  getUserSavedDestinationsSync(userId: string | null | undefined): YatraDestination[] {
    const effectiveUserId = userId || GUEST_KEY;
    const savedSlugsList = this.getLocalStorageSaved(effectiveUserId);
    const localSlugs = new Set(savedSlugsList.map(s => (s || "").toLowerCase().trim()));

    if (userId && userId !== GUEST_KEY) {
      const guestSlugs = this.getLocalStorageSaved(GUEST_KEY);
      guestSlugs.forEach(s => {
        const norm = (s || "").toLowerCase().trim();
        if (norm) localSlugs.add(norm);
      });
    }

    const matchedDestinations = YATRA_DESTINATIONS.filter(d => localSlugs.has(d.slug.toLowerCase().trim()));
    const matchedSlugs = new Set(matchedDestinations.map(d => d.slug.toLowerCase().trim()));
    const missingSlugs = Array.from(localSlugs).filter(s => !matchedSlugs.has(s));

    if (missingSlugs.length > 0) {
      missingSlugs.forEach(slug => {
        const capitalized = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        matchedDestinations.push({
          id: `saved-${slug}`,
          slug: slug,
          name: capitalized,
          stateSlug: "india",
          stateName: "Bharat Heritage",
          region: "North",
          category: "heritage",
          tagline: `Saved Cultural Yatra: ${capitalized}`,
          description: `Personalized saved heritage destination in BharatVerse.`,
          culturalSignificance: "Heritage site saved to your personal My Yatra collection.",
          historySummary: "Part of your curated cultural tour of India.",
          heroImageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
          bestTimeToVisit: "October to March",
          isFeatured: false,
          highlights: ["Curated personal yatra journey"],
          attractions: [],
          traditions: [],
          localCrafts: [],
          famousFood: [],
          scenes: []
        });
      });
    }

    return matchedDestinations;
  },

  // 9. Get all saved destinations for user or guest (with remote Supabase sync)
  async getUserSavedDestinations(userId: string | null | undefined): Promise<YatraDestination[]> {
    const effectiveUserId = userId || GUEST_KEY;
    const allDestinations = await this.getAllDestinations();

    // If authenticated user, attempt to fetch from Supabase to sync remote saves (protected with fast timeout)
    if (userId && userId !== GUEST_KEY) {
      try {
        const fetchPromise = supabase
          .from("saved_destinations" as any)
          .select("destination_slug")
          .eq("user_id", userId);

        const res: any = await withTimeout(fetchPromise, 1000, { data: null, error: true });

        if (res && res.data && !res.error && res.data.length > 0) {
          res.data.forEach((item: any) => {
            if (item.destination_slug) {
              this.saveToLocalStorage(userId, item.destination_slug.toLowerCase().trim());
            }
          });
        }
      } catch {
        // Fallback to local storage
      }
    }

    const savedSlugsList = this.getLocalStorageSaved(effectiveUserId);
    const localSlugs = new Set(savedSlugsList.map(s => (s || "").toLowerCase().trim()));

    // Also include guest items if user is logged in to ensure no lost bookmarks
    if (userId && userId !== GUEST_KEY) {
      const guestSlugs = this.getLocalStorageSaved(GUEST_KEY);
      guestSlugs.forEach(s => {
        const norm = (s || "").toLowerCase().trim();
        if (norm) {
          localSlugs.add(norm);
          this.saveToLocalStorage(userId, norm);
        }
      });
    }

    const matchedDestinations = allDestinations.filter(d => localSlugs.has(d.slug.toLowerCase().trim()));

    // For any saved slug that wasn't matched in destinations list, provide a fallback object
    const matchedSlugs = new Set(matchedDestinations.map(d => d.slug.toLowerCase().trim()));
    const missingSlugs = Array.from(localSlugs).filter(s => !matchedSlugs.has(s));

    if (missingSlugs.length > 0) {
      missingSlugs.forEach(slug => {
        const capitalized = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        matchedDestinations.push({
          id: `saved-${slug}`,
          slug: slug,
          name: capitalized,
          stateSlug: "india",
          stateName: "Bharat Heritage",
          region: "North",
          category: "heritage",
          tagline: `Saved Cultural Yatra: ${capitalized}`,
          description: `Personalized saved heritage destination in BharatVerse.`,
          culturalSignificance: "Heritage site saved to your personal My Yatra collection.",
          historySummary: "Part of your curated cultural tour of India.",
          heroImageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
          bestTimeToVisit: "October to March",
          isFeatured: false,
          highlights: ["Curated personal yatra journey"],
          attractions: [],
          traditions: [],
          localCrafts: [],
          famousFood: [],
          scenes: []
        });
      });
    }

    return matchedDestinations;
  },

  // 10. Get total count of saved destinations
  getSavedCount(userId: string | null | undefined): number {
    const effectiveUserId = userId || GUEST_KEY;
    const list = this.getLocalStorageSaved(effectiveUserId);
    if (userId && userId !== GUEST_KEY) {
      const guestList = this.getLocalStorageSaved(GUEST_KEY);
      const combined = new Set([...list, ...guestList]);
      return combined.size;
    }
    return list.length;
  },

  // 11. Migrate guest bookmarks to authenticated user profile
  async migrateGuestSaved(userId: string) {
    if (!userId || userId === GUEST_KEY) return;
    try {
      const guestSlugs = this.getLocalStorageSaved(GUEST_KEY);
      if (guestSlugs.length === 0) return;

      for (const slug of guestSlugs) {
        this.saveToLocalStorage(userId, slug);
        try {
          const upsertPromise = supabase.from("saved_destinations" as any).upsert({
            user_id: userId,
            destination_slug: slug
          }, { onConflict: "user_id,destination_slug" });
          await withTimeout(upsertPromise, 1000, null);
        } catch {}
      }

      // Clear guest storage after successful migration
      try {
        localStorage.removeItem(`${LOCAL_SAVED_KEY_PREFIX}${GUEST_KEY}`);
      } catch {}

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("yatra:saved_changed", { detail: { userId } }));
      }
    } catch {}
  },

  // Local storage helpers for optimistic persistence & offline backup
  getLocalStorageSaved(userId: string): string[] {
    try {
      const raw = localStorage.getItem(`${LOCAL_SAVED_KEY_PREFIX}${userId}`);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(s => String(s).toLowerCase().trim()).filter(Boolean);
      }
      return [];
    } catch {
      return [];
    }
  },

  saveToLocalStorage(userId: string, slug: string) {
    try {
      const normSlug = (slug || "").toLowerCase().trim();
      if (!normSlug) return;
      const list = this.getLocalStorageSaved(userId);
      if (!list.includes(normSlug)) {
        list.push(normSlug);
        localStorage.setItem(`${LOCAL_SAVED_KEY_PREFIX}${userId}`, JSON.stringify(list));
      }
    } catch {}
  },

  removeFromLocalStorage(userId: string, slug: string) {
    try {
      const normSlug = (slug || "").toLowerCase().trim();
      const list = this.getLocalStorageSaved(userId).filter(s => s !== normSlug);
      localStorage.setItem(`${LOCAL_SAVED_KEY_PREFIX}${userId}`, JSON.stringify(list));
    } catch {}
  },

  isSavedInLocalStorage(userId: string, slug: string): boolean {
    const normSlug = (slug || "").toLowerCase().trim();
    const list = this.getLocalStorageSaved(userId);
    return list.includes(normSlug);
  }
};


