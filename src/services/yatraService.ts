import { CULTURAL_STATES, YATRA_DESTINATIONS, CulturalState, YatraDestination, TourScene } from "@/data/yatraData";

const LOCAL_SAVED_KEY_PREFIX = "bv_saved_yatra_";

export const yatraService = {
  // 1. Get all cultural states
  async getStates(): Promise<CulturalState[]> {
    return CULTURAL_STATES;
  },

  // 2. Get single state by slug
  async getStateBySlug(stateSlug: string): Promise<{ state: CulturalState | null; destinations: YatraDestination[] }> {
    const normalizedSlug = (stateSlug || "").toLowerCase().trim();
    const state = CULTURAL_STATES.find(s => s.slug === normalizedSlug) || null;
    const destinations = YATRA_DESTINATIONS.filter(d => d.stateSlug === normalizedSlug);
    return { state, destinations };
  },

  // 3. Get all destinations
  async getAllDestinations(): Promise<YatraDestination[]> {
    return YATRA_DESTINATIONS;
  },

  // 4. Get destination by stateSlug and destinationSlug
  async getDestinationBySlug(stateSlug: string, destinationSlug: string): Promise<YatraDestination | null> {
    const normalizedDestSlug = (destinationSlug || "").toLowerCase().trim();
    const normalizedStateSlug = (stateSlug || "").toLowerCase().trim();

    const match = YATRA_DESTINATIONS.find(
      d => d.slug === normalizedDestSlug && (normalizedStateSlug ? d.stateSlug === normalizedStateSlug : true)
    ) || YATRA_DESTINATIONS.find(d => d.slug === normalizedDestSlug) || null;

    return match;
  },

  // 5. Save destination to "My Yatra"
  async saveDestination(userId: string, destinationSlug: string, _destinationId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.saveToLocalStorage(userId, destinationSlug);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // 6. Remove saved destination
  async unsaveDestination(userId: string, destinationSlug: string): Promise<{ success: boolean; error?: string }> {
    try {
      this.removeFromLocalStorage(userId, destinationSlug);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // 7. Check if destination is saved
  async isDestinationSaved(userId: string | null, destinationSlug: string): Promise<boolean> {
    if (!userId) return false;
    return this.isSavedInLocalStorage(userId, destinationSlug);
  },

  // 8. Get all saved destinations for user
  async getUserSavedDestinations(userId: string): Promise<YatraDestination[]> {
    const localSlugs = new Set(this.getLocalStorageSaved(userId));
    return YATRA_DESTINATIONS.filter(d => localSlugs.has(d.slug));
  },

  // Local storage helpers for optimistic persistence & offline backup
  getLocalStorageSaved(userId: string): string[] {
    try {
      const raw = localStorage.getItem(`${LOCAL_SAVED_KEY_PREFIX}${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveToLocalStorage(userId: string, slug: string) {
    try {
      const list = this.getLocalStorageSaved(userId);
      if (!list.includes(slug)) {
        list.push(slug);
        localStorage.setItem(`${LOCAL_SAVED_KEY_PREFIX}${userId}`, JSON.stringify(list));
      }
    } catch {}
  },

  removeFromLocalStorage(userId: string, slug: string) {
    try {
      const list = this.getLocalStorageSaved(userId).filter(s => s !== slug);
      localStorage.setItem(`${LOCAL_SAVED_KEY_PREFIX}${userId}`, JSON.stringify(list));
    } catch {}
  },

  isSavedInLocalStorage(userId: string, slug: string): boolean {
    const list = this.getLocalStorageSaved(userId);
    return list.includes(slug);
  }
};

