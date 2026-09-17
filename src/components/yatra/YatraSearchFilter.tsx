import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface YatraFilterState {
  query: string;
  region: string;
  category: string;
  stateSlug: string;
}

interface YatraSearchFilterProps {
  filters: YatraFilterState;
  onChange: (filters: YatraFilterState) => void;
  availableStates?: { slug: string; name: string }[];
}

const CATEGORIES = [
  { key: "all", label: "All Categories" },
  { key: "heritage", label: "🏛️ Heritage" },
  { key: "spiritual", label: "🛕 Spiritual" },
  { key: "art_craft", label: "🎨 Art & Crafts" },
  { key: "nature", label: "🌿 Nature & Scenic" },
  { key: "historical", label: "🏰 Historical Forts" },
  { key: "food_trail", label: "🍛 Food Trails" }
];

const REGIONS = ["All", "North", "West", "South", "East", "Central", "North-East"];

export const YatraSearchFilter = ({
  filters,
  onChange,
  availableStates = []
}: YatraSearchFilterProps) => {
  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.region !== "All" ||
    filters.category !== "all" ||
    filters.stateSlug !== "all";

  const handleClear = () => {
    onChange({
      query: "",
      region: "All",
      category: "all",
      stateSlug: "all"
    });
  };

  return (
    <div className="w-full glass-card rounded-3xl p-5 sm:p-6 border border-white/10 shadow-xl mb-10">
      {/* Search Input Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
        <Input
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Search destinations e.g., Varanasi, Taj Mahal, Amber Fort, Backwaters..."
          className="pl-12 pr-10 py-6 text-base bg-background/50 border-white/10 text-foreground placeholder:text-muted-foreground rounded-2xl focus-visible:ring-primary shadow-inner"
        />
        {filters.query && (
          <button
            type="button"
            onClick={() => onChange({ ...filters, query: "" })}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills Bar */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
            Experience Categories
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat.key;
              return (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => onChange({ ...filters, category: cat.key })}
                  className={`text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_2px_10px_-2px_hsl(var(--saffron)/0.5)]"
                      : "bg-background/40 border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region & Reset Filter Bar */}
        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
              Region:
            </span>
            {REGIONS.map((reg) => (
              <button
                type="button"
                key={reg}
                onClick={() => onChange({ ...filters, region: reg })}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  filters.region === reg
                    ? "bg-white/20 text-white font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-xs text-muted-foreground hover:text-foreground self-end sm:self-auto cursor-pointer"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
