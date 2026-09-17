export interface MapStateItem {
  id: string;
  name: string;
  slug: string;
  region: "North" | "South" | "East" | "West" | "Central" | "North-East";
  emoji: string;
  x: number; // percentage coordinate on interactive map grid (0 - 100)
  y: number; // percentage coordinate on interactive map grid (0 - 100)
  hasDestinations: boolean;
  destinationsCount: number;
}

export const INDIA_MAP_STATES: MapStateItem[] = [
  // North
  { id: "JK", name: "Jammu & Kashmir", slug: "jammu-kashmir", region: "North", emoji: "🏔️", x: 30, y: 12, hasDestinations: false, destinationsCount: 0 },
  { id: "LA", name: "Ladakh", slug: "ladakh", region: "North", emoji: "❄️", x: 44, y: 8, hasDestinations: false, destinationsCount: 0 },
  { id: "HP", name: "Himachal Pradesh", slug: "himachal-pradesh", region: "North", emoji: "⛰️", x: 37, y: 20, hasDestinations: false, destinationsCount: 0 },
  { id: "PB", name: "Punjab", slug: "punjab", region: "North", emoji: "🌾", x: 28, y: 24, hasDestinations: false, destinationsCount: 0 },
  { id: "UK", name: "Uttarakhand", slug: "uttarakhand", region: "North", emoji: "🏔️", x: 44, y: 25, hasDestinations: false, destinationsCount: 0 },
  { id: "HR", name: "Haryana", slug: "haryana", region: "North", emoji: "🤼", x: 33, y: 29, hasDestinations: false, destinationsCount: 0 },
  { id: "DL", name: "Delhi", slug: "delhi", region: "North", emoji: "🏛️", x: 36, y: 32, hasDestinations: false, destinationsCount: 0 },
  { id: "UP", name: "Uttar Pradesh", slug: "uttar-pradesh", region: "North", emoji: "🕌", x: 48, y: 35, hasDestinations: true, destinationsCount: 5 },

  // West
  { id: "RJ", name: "Rajasthan", slug: "rajasthan", region: "West", emoji: "🏜️", x: 23, y: 37, hasDestinations: true, destinationsCount: 4 },
  { id: "GJ", name: "Gujarat", slug: "gujarat", region: "West", emoji: "🦁", x: 16, y: 49, hasDestinations: true, destinationsCount: 3 },
  { id: "MH", name: "Maharashtra", slug: "maharashtra", region: "West", emoji: "🏰", x: 32, y: 58, hasDestinations: false, destinationsCount: 0 },
  { id: "GA", name: "Goa", slug: "goa", region: "West", emoji: "🏖️", x: 28, y: 73, hasDestinations: false, destinationsCount: 0 },

  // Central
  { id: "MP", name: "Madhya Pradesh", slug: "madhya-pradesh", region: "Central", emoji: "🐅", x: 40, y: 46, hasDestinations: false, destinationsCount: 0 },
  { id: "CG", name: "Chhattisgarh", slug: "chhattisgarh", region: "Central", emoji: "🌿", x: 54, y: 53, hasDestinations: false, destinationsCount: 0 },

  // East
  { id: "BR", name: "Bihar", slug: "bihar", region: "East", emoji: "📜", x: 62, y: 38, hasDestinations: false, destinationsCount: 0 },
  { id: "JH", name: "Jharkhand", slug: "jharkhand", region: "East", emoji: "🌳", x: 62, y: 47, hasDestinations: false, destinationsCount: 0 },
  { id: "WB", name: "West Bengal", slug: "west-bengal", region: "East", emoji: "🎭", x: 70, y: 48, hasDestinations: true, destinationsCount: 3 },
  { id: "OD", name: "Odisha", slug: "odisha", region: "East", emoji: "🛕", x: 61, y: 58, hasDestinations: false, destinationsCount: 0 },

  // South
  { id: "TS", name: "Telangana", slug: "telangana", region: "South", emoji: "🏛️", x: 42, y: 64, hasDestinations: false, destinationsCount: 0 },
  { id: "AP", name: "Andhra Pradesh", slug: "andhra-pradesh", region: "South", emoji: "🪷", x: 44, y: 73, hasDestinations: false, destinationsCount: 0 },
  { id: "KA", name: "Karnataka", slug: "karnataka", region: "South", emoji: "🐘", x: 32, y: 72, hasDestinations: false, destinationsCount: 0 },
  { id: "TN", name: "Tamil Nadu", slug: "tamil-nadu", region: "South", emoji: "🛕", x: 41, y: 86, hasDestinations: true, destinationsCount: 3 },
  { id: "KL", name: "Kerala", slug: "kerala", region: "South", emoji: "🌴", x: 34, y: 87, hasDestinations: true, destinationsCount: 3 },

  // North-East
  { id: "SK", name: "Sikkim", slug: "sikkim", region: "North-East", emoji: "🏔️", x: 69, y: 33, hasDestinations: false, destinationsCount: 0 },
  { id: "AS", name: "Assam", slug: "assam", region: "North-East", emoji: "🍵", x: 83, y: 37, hasDestinations: false, destinationsCount: 0 },
  { id: "AR", name: "Arunachal Pradesh", slug: "arunachal-pradesh", region: "North-East", emoji: "🦚", x: 90, y: 29, hasDestinations: false, destinationsCount: 0 },
  { id: "ML", name: "Meghalaya", slug: "meghalaya", region: "North-East", emoji: "🌧️", x: 80, y: 42, hasDestinations: false, destinationsCount: 0 },
  { id: "NL", name: "Nagaland", slug: "nagaland", region: "North-East", emoji: "🪶", x: 92, y: 38, hasDestinations: false, destinationsCount: 0 },
  { id: "MN", name: "Manipur", slug: "manipur", region: "North-East", emoji: "🌺", x: 90, y: 44, hasDestinations: false, destinationsCount: 0 },
  { id: "MZ", name: "Mizoram", slug: "mizoram", region: "North-East", emoji: "🎋", x: 87, y: 50, hasDestinations: false, destinationsCount: 0 },
  { id: "TR", name: "Tripura", slug: "tripura", region: "North-East", emoji: "🎋", x: 82, y: 48, hasDestinations: false, destinationsCount: 0 }
];
