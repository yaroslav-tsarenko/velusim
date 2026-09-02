import type { Country, RegionId } from "@/lib/types";

/**
 * Country catalogue. Each entry is a compact seed; the exported `countries`
 * array is built from it so coordinates, speeds and derived fields stay
 * consistent. This mirrors the coverage exposed by the Yesim partner API so the
 * storefront lists every reachable destination (see src/lib/api/client.ts).
 */
interface Seed {
  slug: string;
  name: string;
  iso3: string;
  dial: string;
  flag: string;
  region: RegionId;
  lat: number;
  lon: number;
  nets: [string, string] | [string];
  price: number;
  g5?: boolean;
  pop?: boolean;
  best?: boolean;
}

const SEED: Seed[] = [
  // ── Europe ──────────────────────────────────────────────────────────────
  { slug: "al", name: "Albania", iso3: "ALB", dial: "+355", flag: "🇦🇱", region: "europe", lat: 41.3275, lon: 19.8189, nets: ["Vodafone", "One"], price: 5.2 },
  { slug: "ad", name: "Andorra", iso3: "AND", dial: "+376", flag: "🇦🇩", region: "europe", lat: 42.5063, lon: 1.5218, nets: ["Andorra Telecom"], price: 6.0 },
  { slug: "at", name: "Austria", iso3: "AUT", dial: "+43", flag: "🇦🇹", region: "europe", lat: 48.2082, lon: 16.3738, nets: ["A1", "Magenta"], price: 4.6, g5: true },
  { slug: "be", name: "Belgium", iso3: "BEL", dial: "+32", flag: "🇧🇪", region: "europe", lat: 50.8503, lon: 4.3517, nets: ["Proximus", "Orange"], price: 4.6, g5: true },
  { slug: "ba", name: "Bosnia & Herzegovina", iso3: "BIH", dial: "+387", flag: "🇧🇦", region: "europe", lat: 43.8563, lon: 18.4131, nets: ["BH Telecom", "m:tel"], price: 5.4 },
  { slug: "bg", name: "Bulgaria", iso3: "BGR", dial: "+359", flag: "🇧🇬", region: "europe", lat: 42.6977, lon: 23.3219, nets: ["A1", "Yettel"], price: 4.8, g5: true },
  { slug: "hr", name: "Croatia", iso3: "HRV", dial: "+385", flag: "🇭🇷", region: "europe", lat: 45.815, lon: 15.9819, nets: ["Hrvatski Telekom", "A1"], price: 4.7, g5: true },
  { slug: "cy", name: "Cyprus", iso3: "CYP", dial: "+357", flag: "🇨🇾", region: "europe", lat: 35.1856, lon: 33.3823, nets: ["Cyta", "Epic"], price: 5.0, g5: true },
  { slug: "cz", name: "Czechia", iso3: "CZE", dial: "+420", flag: "🇨🇿", region: "europe", lat: 50.0755, lon: 14.4378, nets: ["O2", "T-Mobile"], price: 4.6, g5: true },
  { slug: "dk", name: "Denmark", iso3: "DNK", dial: "+45", flag: "🇩🇰", region: "europe", lat: 55.6761, lon: 12.5683, nets: ["TDC", "Telenor"], price: 4.7, g5: true },
  { slug: "ee", name: "Estonia", iso3: "EST", dial: "+372", flag: "🇪🇪", region: "europe", lat: 59.437, lon: 24.7536, nets: ["Telia", "Elisa"], price: 4.6, g5: true },
  { slug: "fi", name: "Finland", iso3: "FIN", dial: "+358", flag: "🇫🇮", region: "europe", lat: 60.1699, lon: 24.9384, nets: ["Elisa", "Telia"], price: 4.6, g5: true },
  { slug: "fr", name: "France", iso3: "FRA", dial: "+33", flag: "🇫🇷", region: "europe", lat: 48.8566, lon: 2.3522, nets: ["Orange", "SFR"], price: 4.5, g5: true, pop: true },
  { slug: "de", name: "Germany", iso3: "DEU", dial: "+49", flag: "🇩🇪", region: "europe", lat: 52.52, lon: 13.405, nets: ["Telekom", "Vodafone"], price: 4.6, g5: true },
  { slug: "gr", name: "Greece", iso3: "GRC", dial: "+30", flag: "🇬🇷", region: "europe", lat: 37.9838, lon: 23.7275, nets: ["Cosmote", "Vodafone"], price: 4.8, g5: true },
  { slug: "hu", name: "Hungary", iso3: "HUN", dial: "+36", flag: "🇭🇺", region: "europe", lat: 47.4979, lon: 19.0402, nets: ["Magyar Telekom", "Yettel"], price: 4.7, g5: true },
  { slug: "is", name: "Iceland", iso3: "ISL", dial: "+354", flag: "🇮🇸", region: "europe", lat: 64.1466, lon: -21.9426, nets: ["Síminn", "Vodafone"], price: 5.6, g5: true },
  { slug: "ie", name: "Ireland", iso3: "IRL", dial: "+353", flag: "🇮🇪", region: "europe", lat: 53.3498, lon: -6.2603, nets: ["Vodafone", "Three"], price: 4.7, g5: true },
  { slug: "it", name: "Italy", iso3: "ITA", dial: "+39", flag: "🇮🇹", region: "europe", lat: 41.9028, lon: 12.4964, nets: ["TIM", "Vodafone"], price: 4.5, g5: true, pop: true },
  { slug: "xk", name: "Kosovo", iso3: "XKX", dial: "+383", flag: "🇽🇰", region: "europe", lat: 42.6629, lon: 21.1655, nets: ["Vala", "IPKO"], price: 5.6 },
  { slug: "lv", name: "Latvia", iso3: "LVA", dial: "+371", flag: "🇱🇻", region: "europe", lat: 56.9496, lon: 24.1052, nets: ["LMT", "Tele2"], price: 4.7, g5: true },
  { slug: "li", name: "Liechtenstein", iso3: "LIE", dial: "+423", flag: "🇱🇮", region: "europe", lat: 47.141, lon: 9.5209, nets: ["Telecom Liechtenstein"], price: 6.4 },
  { slug: "lt", name: "Lithuania", iso3: "LTU", dial: "+370", flag: "🇱🇹", region: "europe", lat: 54.6872, lon: 25.2797, nets: ["Telia", "Bite"], price: 4.7, g5: true },
  { slug: "lu", name: "Luxembourg", iso3: "LUX", dial: "+352", flag: "🇱🇺", region: "europe", lat: 49.6116, lon: 6.1319, nets: ["POST", "Orange"], price: 4.9, g5: true },
  { slug: "mt", name: "Malta", iso3: "MLT", dial: "+356", flag: "🇲🇹", region: "europe", lat: 35.8989, lon: 14.5146, nets: ["GO", "Epic"], price: 5.0, g5: true },
  { slug: "md", name: "Moldova", iso3: "MDA", dial: "+373", flag: "🇲🇩", region: "europe", lat: 47.0105, lon: 28.8638, nets: ["Orange", "Moldcell"], price: 5.2 },
  { slug: "mc", name: "Monaco", iso3: "MCO", dial: "+377", flag: "🇲🇨", region: "europe", lat: 43.7384, lon: 7.4246, nets: ["Monaco Telecom"], price: 6.4, g5: true },
  { slug: "me", name: "Montenegro", iso3: "MNE", dial: "+382", flag: "🇲🇪", region: "europe", lat: 42.4304, lon: 19.2594, nets: ["Crnogorski Telekom", "One"], price: 5.4 },
  { slug: "nl", name: "Netherlands", iso3: "NLD", dial: "+31", flag: "🇳🇱", region: "europe", lat: 52.3676, lon: 4.9041, nets: ["KPN", "Vodafone"], price: 4.6, g5: true },
  { slug: "mk", name: "North Macedonia", iso3: "MKD", dial: "+389", flag: "🇲🇰", region: "europe", lat: 41.9981, lon: 21.4254, nets: ["A1", "Telekom"], price: 5.3 },
  { slug: "no", name: "Norway", iso3: "NOR", dial: "+47", flag: "🇳🇴", region: "europe", lat: 59.9139, lon: 10.7522, nets: ["Telenor", "Telia"], price: 4.9, g5: true },
  { slug: "pl", name: "Poland", iso3: "POL", dial: "+48", flag: "🇵🇱", region: "europe", lat: 52.2297, lon: 21.0122, nets: ["Orange", "Play"], price: 4.5, g5: true },
  { slug: "pt", name: "Portugal", iso3: "PRT", dial: "+351", flag: "🇵🇹", region: "europe", lat: 38.7223, lon: -9.1393, nets: ["MEO", "NOS"], price: 4.6, g5: true },
  { slug: "ro", name: "Romania", iso3: "ROU", dial: "+40", flag: "🇷🇴", region: "europe", lat: 44.4268, lon: 26.1025, nets: ["Orange", "Vodafone"], price: 4.5, g5: true },
  { slug: "rs", name: "Serbia", iso3: "SRB", dial: "+381", flag: "🇷🇸", region: "europe", lat: 44.7866, lon: 20.4489, nets: ["MTS", "A1"], price: 5.1 },
  { slug: "sk", name: "Slovakia", iso3: "SVK", dial: "+421", flag: "🇸🇰", region: "europe", lat: 48.1486, lon: 17.1077, nets: ["Orange", "O2"], price: 4.7, g5: true },
  { slug: "si", name: "Slovenia", iso3: "SVN", dial: "+386", flag: "🇸🇮", region: "europe", lat: 46.0569, lon: 14.5058, nets: ["Telekom", "A1"], price: 4.7, g5: true },
  { slug: "es", name: "Spain", iso3: "ESP", dial: "+34", flag: "🇪🇸", region: "europe", lat: 40.4168, lon: -3.7038, nets: ["Movistar", "Orange"], price: 4.5, g5: true, pop: true },
  { slug: "se", name: "Sweden", iso3: "SWE", dial: "+46", flag: "🇸🇪", region: "europe", lat: 59.3293, lon: 18.0686, nets: ["Telia", "Tele2"], price: 4.6, g5: true },
  { slug: "ch", name: "Switzerland", iso3: "CHE", dial: "+41", flag: "🇨🇭", region: "europe", lat: 46.948, lon: 7.4474, nets: ["Swisscom", "Sunrise"], price: 5.4, g5: true },
  { slug: "gb", name: "United Kingdom", iso3: "GBR", dial: "+44", flag: "🇬🇧", region: "europe", lat: 51.5072, lon: -0.1276, nets: ["EE", "Vodafone"], price: 4.7, g5: true, pop: true },
  { slug: "ua", name: "Ukraine", iso3: "UKR", dial: "+380", flag: "🇺🇦", region: "europe", lat: 50.4501, lon: 30.5234, nets: ["Kyivstar", "Vodafone"], price: 4.4 },

  // ── Asia ────────────────────────────────────────────────────────────────
  { slug: "am", name: "Armenia", iso3: "ARM", dial: "+374", flag: "🇦🇲", region: "asia", lat: 40.1792, lon: 44.4991, nets: ["Team", "Ucom"], price: 5.0 },
  { slug: "az", name: "Azerbaijan", iso3: "AZE", dial: "+994", flag: "🇦🇿", region: "asia", lat: 40.4093, lon: 49.8671, nets: ["Azercell", "Bakcell"], price: 5.2 },
  { slug: "bd", name: "Bangladesh", iso3: "BGD", dial: "+880", flag: "🇧🇩", region: "asia", lat: 23.8103, lon: 90.4125, nets: ["Grameenphone", "Robi"], price: 4.4 },
  { slug: "bt", name: "Bhutan", iso3: "BTN", dial: "+975", flag: "🇧🇹", region: "asia", lat: 27.4728, lon: 89.639, nets: ["Bhutan Telecom", "TashiCell"], price: 5.6 },
  { slug: "bn", name: "Brunei", iso3: "BRN", dial: "+673", flag: "🇧🇳", region: "asia", lat: 4.9031, lon: 114.9398, nets: ["DST", "Progresif"], price: 5.6, g5: true },
  { slug: "kh", name: "Cambodia", iso3: "KHM", dial: "+855", flag: "🇰🇭", region: "asia", lat: 11.5564, lon: 104.9282, nets: ["Smart", "Cellcard"], price: 4.4 },
  { slug: "cn", name: "China", iso3: "CHN", dial: "+86", flag: "🇨🇳", region: "asia", lat: 39.9042, lon: 116.4074, nets: ["China Mobile", "China Unicom"], price: 4.8, g5: true, pop: true },
  { slug: "ge", name: "Georgia", iso3: "GEO", dial: "+995", flag: "🇬🇪", region: "asia", lat: 41.7151, lon: 44.8271, nets: ["Magti", "Silknet"], price: 4.9, g5: true },
  { slug: "hk", name: "Hong Kong", iso3: "HKG", dial: "+852", flag: "🇭🇰", region: "asia", lat: 22.3193, lon: 114.1694, nets: ["CSL", "3 HK"], price: 4.6, g5: true },
  { slug: "in", name: "India", iso3: "IND", dial: "+91", flag: "🇮🇳", region: "asia", lat: 28.6139, lon: 77.209, nets: ["Jio", "Airtel"], price: 4.4, g5: true },
  { slug: "id", name: "Indonesia", iso3: "IDN", dial: "+62", flag: "🇮🇩", region: "asia", lat: -6.2088, lon: 106.8456, nets: ["Telkomsel", "XL"], price: 4.2, g5: true, best: true },
  { slug: "jp", name: "Japan", iso3: "JPN", dial: "+81", flag: "🇯🇵", region: "asia", lat: 35.6762, lon: 139.6503, nets: ["NTT Docomo", "SoftBank"], price: 4.5, g5: true, pop: true, best: true },
  { slug: "kz", name: "Kazakhstan", iso3: "KAZ", dial: "+7", flag: "🇰🇿", region: "asia", lat: 51.1605, lon: 71.4704, nets: ["Kcell", "Beeline"], price: 4.8, g5: true },
  { slug: "kg", name: "Kyrgyzstan", iso3: "KGZ", dial: "+996", flag: "🇰🇬", region: "asia", lat: 42.8746, lon: 74.5698, nets: ["Beeline", "O!"], price: 5.2 },
  { slug: "la", name: "Laos", iso3: "LAO", dial: "+856", flag: "🇱🇦", region: "asia", lat: 17.9757, lon: 102.6331, nets: ["Unitel", "Lao Telecom"], price: 5.0 },
  { slug: "mo", name: "Macau", iso3: "MAC", dial: "+853", flag: "🇲🇴", region: "asia", lat: 22.1987, lon: 113.5439, nets: ["CTM", "China Telecom"], price: 5.0, g5: true },
  { slug: "my", name: "Malaysia", iso3: "MYS", dial: "+60", flag: "🇲🇾", region: "asia", lat: 3.139, lon: 101.6869, nets: ["Maxis", "Celcom"], price: 4.4, g5: true },
  { slug: "mv", name: "Maldives", iso3: "MDV", dial: "+960", flag: "🇲🇻", region: "asia", lat: 4.1755, lon: 73.5093, nets: ["Dhiraagu", "Ooredoo"], price: 6.0, g5: true },
  { slug: "mn", name: "Mongolia", iso3: "MNG", dial: "+976", flag: "🇲🇳", region: "asia", lat: 47.8864, lon: 106.9057, nets: ["Mobicom", "Unitel"], price: 5.2 },
  { slug: "mm", name: "Myanmar", iso3: "MMR", dial: "+95", flag: "🇲🇲", region: "asia", lat: 16.8409, lon: 96.1735, nets: ["MPT", "Ooredoo"], price: 5.0 },
  { slug: "np", name: "Nepal", iso3: "NPL", dial: "+977", flag: "🇳🇵", region: "asia", lat: 27.7172, lon: 85.324, nets: ["Ncell", "NTC"], price: 4.8 },
  { slug: "ph", name: "Philippines", iso3: "PHL", dial: "+63", flag: "🇵🇭", region: "asia", lat: 14.5995, lon: 120.9842, nets: ["Globe", "Smart"], price: 4.4, g5: true },
  { slug: "sg", name: "Singapore", iso3: "SGP", dial: "+65", flag: "🇸🇬", region: "asia", lat: 1.3521, lon: 103.8198, nets: ["Singtel", "StarHub"], price: 4.7, g5: true },
  { slug: "kr", name: "South Korea", iso3: "KOR", dial: "+82", flag: "🇰🇷", region: "asia", lat: 37.5665, lon: 126.978, nets: ["SKT", "KT"], price: 4.9, g5: true, pop: true },
  { slug: "lk", name: "Sri Lanka", iso3: "LKA", dial: "+94", flag: "🇱🇰", region: "asia", lat: 6.9271, lon: 79.8612, nets: ["Dialog", "Mobitel"], price: 4.6, g5: true },
  { slug: "tw", name: "Taiwan", iso3: "TWN", dial: "+886", flag: "🇹🇼", region: "asia", lat: 25.033, lon: 121.5654, nets: ["Chunghwa", "Taiwan Mobile"], price: 4.6, g5: true },
  { slug: "tj", name: "Tajikistan", iso3: "TJK", dial: "+992", flag: "🇹🇯", region: "asia", lat: 38.5598, lon: 68.787, nets: ["Tcell", "Megafon"], price: 5.4 },
  { slug: "th", name: "Thailand", iso3: "THA", dial: "+66", flag: "🇹🇭", region: "asia", lat: 13.7563, lon: 100.5018, nets: ["AIS", "TrueMove"], price: 4.0, g5: true, pop: true, best: true },
  { slug: "tm", name: "Turkmenistan", iso3: "TKM", dial: "+993", flag: "🇹🇲", region: "asia", lat: 37.9601, lon: 58.3261, nets: ["TM Cell"], price: 5.8 },
  { slug: "uz", name: "Uzbekistan", iso3: "UZB", dial: "+998", flag: "🇺🇿", region: "asia", lat: 41.2995, lon: 69.2401, nets: ["Ucell", "Beeline"], price: 5.0 },
  { slug: "vn", name: "Vietnam", iso3: "VNM", dial: "+84", flag: "🇻🇳", region: "asia", lat: 21.0278, lon: 105.8342, nets: ["Viettel", "Vinaphone"], price: 4.3, g5: true },

  // ── Americas ────────────────────────────────────────────────────────────
  { slug: "ar", name: "Argentina", iso3: "ARG", dial: "+54", flag: "🇦🇷", region: "americas", lat: -34.6037, lon: -58.3816, nets: ["Claro", "Movistar"], price: 5.6 },
  { slug: "bo", name: "Bolivia", iso3: "BOL", dial: "+591", flag: "🇧🇴", region: "americas", lat: -16.4897, lon: -68.1193, nets: ["Entel", "Tigo"], price: 5.4 },
  { slug: "br", name: "Brazil", iso3: "BRA", dial: "+55", flag: "🇧🇷", region: "americas", lat: -15.7939, lon: -47.8828, nets: ["Vivo", "Claro"], price: 5.4, g5: true },
  { slug: "ca", name: "Canada", iso3: "CAN", dial: "+1", flag: "🇨🇦", region: "americas", lat: 45.4215, lon: -75.6972, nets: ["Rogers", "Bell"], price: 5.0, g5: true },
  { slug: "cl", name: "Chile", iso3: "CHL", dial: "+56", flag: "🇨🇱", region: "americas", lat: -33.4489, lon: -70.6693, nets: ["Entel", "Movistar"], price: 5.2, g5: true },
  { slug: "co", name: "Colombia", iso3: "COL", dial: "+57", flag: "🇨🇴", region: "americas", lat: 4.711, lon: -74.0721, nets: ["Claro", "Movistar"], price: 5.0, g5: true },
  { slug: "cr", name: "Costa Rica", iso3: "CRI", dial: "+506", flag: "🇨🇷", region: "americas", lat: 9.9281, lon: -84.0907, nets: ["Kölbi", "Claro"], price: 5.2 },
  { slug: "do", name: "Dominican Republic", iso3: "DOM", dial: "+1", flag: "🇩🇴", region: "americas", lat: 18.4861, lon: -69.9312, nets: ["Claro", "Altice"], price: 5.2 },
  { slug: "ec", name: "Ecuador", iso3: "ECU", dial: "+593", flag: "🇪🇨", region: "americas", lat: -0.1807, lon: -78.4678, nets: ["Claro", "Movistar"], price: 5.2 },
  { slug: "sv", name: "El Salvador", iso3: "SLV", dial: "+503", flag: "🇸🇻", region: "americas", lat: 13.6929, lon: -89.2182, nets: ["Tigo", "Claro"], price: 5.4 },
  { slug: "gt", name: "Guatemala", iso3: "GTM", dial: "+502", flag: "🇬🇹", region: "americas", lat: 14.6349, lon: -90.5069, nets: ["Tigo", "Claro"], price: 5.3 },
  { slug: "hn", name: "Honduras", iso3: "HND", dial: "+504", flag: "🇭🇳", region: "americas", lat: 14.0723, lon: -87.1921, nets: ["Tigo", "Claro"], price: 5.5 },
  { slug: "jm", name: "Jamaica", iso3: "JAM", dial: "+1", flag: "🇯🇲", region: "americas", lat: 18.0179, lon: -76.8099, nets: ["Digicel", "Flow"], price: 5.6 },
  { slug: "mx", name: "Mexico", iso3: "MEX", dial: "+52", flag: "🇲🇽", region: "americas", lat: 19.4326, lon: -99.1332, nets: ["Telcel", "AT&T"], price: 5.2, g5: true, pop: true },
  { slug: "ni", name: "Nicaragua", iso3: "NIC", dial: "+505", flag: "🇳🇮", region: "americas", lat: 12.1149, lon: -86.2362, nets: ["Claro", "Tigo"], price: 5.6 },
  { slug: "pa", name: "Panama", iso3: "PAN", dial: "+507", flag: "🇵🇦", region: "americas", lat: 8.9824, lon: -79.5199, nets: ["Más Móvil", "Tigo"], price: 5.2 },
  { slug: "py", name: "Paraguay", iso3: "PRY", dial: "+595", flag: "🇵🇾", region: "americas", lat: -25.2637, lon: -57.5759, nets: ["Tigo", "Personal"], price: 5.4 },
  { slug: "pe", name: "Peru", iso3: "PER", dial: "+51", flag: "🇵🇪", region: "americas", lat: -12.0464, lon: -77.0428, nets: ["Claro", "Movistar"], price: 5.2, g5: true },
  { slug: "pr", name: "Puerto Rico", iso3: "PRI", dial: "+1", flag: "🇵🇷", region: "americas", lat: 18.4655, lon: -66.1057, nets: ["Claro", "T-Mobile"], price: 5.0, g5: true },
  { slug: "us", name: "United States", iso3: "USA", dial: "+1", flag: "🇺🇸", region: "americas", lat: 40.7128, lon: -74.006, nets: ["T-Mobile", "AT&T"], price: 4.9, g5: true, pop: true, best: true },
  { slug: "uy", name: "Uruguay", iso3: "URY", dial: "+598", flag: "🇺🇾", region: "americas", lat: -34.9011, lon: -56.1645, nets: ["Antel", "Movistar"], price: 5.4, g5: true },
  { slug: "ve", name: "Venezuela", iso3: "VEN", dial: "+58", flag: "🇻🇪", region: "americas", lat: 10.4806, lon: -66.9036, nets: ["Movistar", "Digitel"], price: 5.8 },

  // ── Middle East ─────────────────────────────────────────────────────────
  { slug: "bh", name: "Bahrain", iso3: "BHR", dial: "+973", flag: "🇧🇭", region: "middle-east", lat: 26.2285, lon: 50.586, nets: ["Batelco", "Zain"], price: 5.6, g5: true },
  { slug: "ir", name: "Iran", iso3: "IRN", dial: "+98", flag: "🇮🇷", region: "middle-east", lat: 35.6892, lon: 51.389, nets: ["MCI", "Irancell"], price: 6.0 },
  { slug: "iq", name: "Iraq", iso3: "IRQ", dial: "+964", flag: "🇮🇶", region: "middle-east", lat: 33.3152, lon: 44.3661, nets: ["Zain", "Asiacell"], price: 6.0 },
  { slug: "il", name: "Israel", iso3: "ISR", dial: "+972", flag: "🇮🇱", region: "middle-east", lat: 31.7683, lon: 35.2137, nets: ["Partner", "Cellcom"], price: 5.8, g5: true },
  { slug: "jo", name: "Jordan", iso3: "JOR", dial: "+962", flag: "🇯🇴", region: "middle-east", lat: 31.9454, lon: 35.9284, nets: ["Zain", "Orange"], price: 5.6 },
  { slug: "kw", name: "Kuwait", iso3: "KWT", dial: "+965", flag: "🇰🇼", region: "middle-east", lat: 29.3759, lon: 47.9774, nets: ["Zain", "Ooredoo"], price: 5.6, g5: true },
  { slug: "lb", name: "Lebanon", iso3: "LBN", dial: "+961", flag: "🇱🇧", region: "middle-east", lat: 33.8938, lon: 35.5018, nets: ["Alfa", "touch"], price: 6.0 },
  { slug: "om", name: "Oman", iso3: "OMN", dial: "+968", flag: "🇴🇲", region: "middle-east", lat: 23.588, lon: 58.3829, nets: ["Omantel", "Ooredoo"], price: 5.6, g5: true },
  { slug: "ps", name: "Palestine", iso3: "PSE", dial: "+970", flag: "🇵🇸", region: "middle-east", lat: 31.9522, lon: 35.2332, nets: ["Jawwal", "Ooredoo"], price: 5.8 },
  { slug: "qa", name: "Qatar", iso3: "QAT", dial: "+974", flag: "🇶🇦", region: "middle-east", lat: 25.2854, lon: 51.531, nets: ["Ooredoo", "Vodafone"], price: 5.6, g5: true },
  { slug: "sa", name: "Saudi Arabia", iso3: "SAU", dial: "+966", flag: "🇸🇦", region: "middle-east", lat: 24.7136, lon: 46.6753, nets: ["STC", "Mobily"], price: 6.0, g5: true },
  { slug: "sy", name: "Syria", iso3: "SYR", dial: "+963", flag: "🇸🇾", region: "middle-east", lat: 33.5138, lon: 36.2765, nets: ["Syriatel", "MTN"], price: 6.4 },
  { slug: "tr", name: "Turkey", iso3: "TUR", dial: "+90", flag: "🇹🇷", region: "middle-east", lat: 39.9334, lon: 32.8597, nets: ["Turkcell", "Vodafone"], price: 5.5, g5: true, pop: true },
  { slug: "ae", name: "United Arab Emirates", iso3: "ARE", dial: "+971", flag: "🇦🇪", region: "middle-east", lat: 25.2048, lon: 55.2708, nets: ["Etisalat", "du"], price: 6.5, g5: true, pop: true },
  { slug: "ye", name: "Yemen", iso3: "YEM", dial: "+967", flag: "🇾🇪", region: "middle-east", lat: 15.3694, lon: 44.191, nets: ["YemenMobile", "Sabafon"], price: 6.6 },

  // ── Africa ──────────────────────────────────────────────────────────────
  { slug: "dz", name: "Algeria", iso3: "DZA", dial: "+213", flag: "🇩🇿", region: "africa", lat: 36.7538, lon: 3.0588, nets: ["Djezzy", "Mobilis"], price: 6.0 },
  { slug: "ao", name: "Angola", iso3: "AGO", dial: "+244", flag: "🇦🇴", region: "africa", lat: -8.839, lon: 13.2894, nets: ["Unitel", "Movicel"], price: 6.4 },
  { slug: "bj", name: "Benin", iso3: "BEN", dial: "+229", flag: "🇧🇯", region: "africa", lat: 6.3703, lon: 2.3912, nets: ["MTN", "Moov"], price: 6.2 },
  { slug: "bw", name: "Botswana", iso3: "BWA", dial: "+267", flag: "🇧🇼", region: "africa", lat: -24.6282, lon: 25.9231, nets: ["Mascom", "Orange"], price: 6.2 },
  { slug: "cm", name: "Cameroon", iso3: "CMR", dial: "+237", flag: "🇨🇲", region: "africa", lat: 3.848, lon: 11.5021, nets: ["MTN", "Orange"], price: 6.2 },
  { slug: "cv", name: "Cape Verde", iso3: "CPV", dial: "+238", flag: "🇨🇻", region: "africa", lat: 14.933, lon: -23.5133, nets: ["CVMovel", "Unitel"], price: 6.4 },
  { slug: "eg", name: "Egypt", iso3: "EGY", dial: "+20", flag: "🇪🇬", region: "africa", lat: 30.0444, lon: 31.2357, nets: ["Vodafone", "Orange"], price: 6.0, g5: true },
  { slug: "et", name: "Ethiopia", iso3: "ETH", dial: "+251", flag: "🇪🇹", region: "africa", lat: 9.03, lon: 38.74, nets: ["Ethio Telecom", "Safaricom"], price: 6.2 },
  { slug: "gh", name: "Ghana", iso3: "GHA", dial: "+233", flag: "🇬🇭", region: "africa", lat: 5.6037, lon: -0.187, nets: ["MTN", "Vodafone"], price: 6.0 },
  { slug: "ke", name: "Kenya", iso3: "KEN", dial: "+254", flag: "🇰🇪", region: "africa", lat: -1.2921, lon: 36.8219, nets: ["Safaricom", "Airtel"], price: 5.8, g5: true },
  { slug: "ma", name: "Morocco", iso3: "MAR", dial: "+212", flag: "🇲🇦", region: "africa", lat: 33.5731, lon: -7.5898, nets: ["Maroc Telecom", "Orange"], price: 6.4 },
  { slug: "mu", name: "Mauritius", iso3: "MUS", dial: "+230", flag: "🇲🇺", region: "africa", lat: -20.1609, lon: 57.5012, nets: ["Emtel", "my.t"], price: 6.0, g5: true },
  { slug: "mz", name: "Mozambique", iso3: "MOZ", dial: "+258", flag: "🇲🇿", region: "africa", lat: -25.9692, lon: 32.5732, nets: ["Vodacom", "Tmcel"], price: 6.4 },
  { slug: "ng", name: "Nigeria", iso3: "NGA", dial: "+234", flag: "🇳🇬", region: "africa", lat: 9.0765, lon: 7.3986, nets: ["MTN", "Airtel"], price: 5.8 },
  { slug: "rw", name: "Rwanda", iso3: "RWA", dial: "+250", flag: "🇷🇼", region: "africa", lat: -1.9441, lon: 30.0619, nets: ["MTN", "Airtel"], price: 6.0 },
  { slug: "sn", name: "Senegal", iso3: "SEN", dial: "+221", flag: "🇸🇳", region: "africa", lat: 14.7167, lon: -17.4677, nets: ["Orange", "Free"], price: 6.2 },
  { slug: "sc", name: "Seychelles", iso3: "SYC", dial: "+248", flag: "🇸🇨", region: "africa", lat: -4.6796, lon: 55.492, nets: ["Cable & Wireless", "Airtel"], price: 6.2 },
  { slug: "za", name: "South Africa", iso3: "ZAF", dial: "+27", flag: "🇿🇦", region: "africa", lat: -33.9249, lon: 18.4241, nets: ["MTN", "Vodacom"], price: 6.2, g5: true },
  { slug: "tz", name: "Tanzania", iso3: "TZA", dial: "+255", flag: "🇹🇿", region: "africa", lat: -6.7924, lon: 39.2083, nets: ["Vodacom", "Airtel"], price: 6.0 },
  { slug: "tn", name: "Tunisia", iso3: "TUN", dial: "+216", flag: "🇹🇳", region: "africa", lat: 36.8065, lon: 10.1815, nets: ["Ooredoo", "Tunisie Telecom"], price: 5.9 },
  { slug: "ug", name: "Uganda", iso3: "UGA", dial: "+256", flag: "🇺🇬", region: "africa", lat: 0.3476, lon: 32.5825, nets: ["MTN", "Airtel"], price: 6.0 },
  { slug: "zm", name: "Zambia", iso3: "ZMB", dial: "+260", flag: "🇿🇲", region: "africa", lat: -15.3875, lon: 28.3228, nets: ["MTN", "Airtel"], price: 6.2 },
  { slug: "zw", name: "Zimbabwe", iso3: "ZWE", dial: "+263", flag: "🇿🇼", region: "africa", lat: -17.8252, lon: 31.0335, nets: ["Econet", "NetOne"], price: 6.4 },

  // ── Oceania ─────────────────────────────────────────────────────────────
  { slug: "au", name: "Australia", iso3: "AUS", dial: "+61", flag: "🇦🇺", region: "oceania", lat: -33.8688, lon: 151.2093, nets: ["Telstra", "Optus"], price: 5.0, g5: true, pop: true },
  { slug: "fj", name: "Fiji", iso3: "FJI", dial: "+679", flag: "🇫🇯", region: "oceania", lat: -18.1416, lon: 178.4419, nets: ["Vodafone", "Digicel"], price: 6.0 },
  { slug: "pf", name: "French Polynesia", iso3: "PYF", dial: "+689", flag: "🇵🇫", region: "oceania", lat: -17.6797, lon: -149.4068, nets: ["Vini", "Vodafone"], price: 6.4 },
  { slug: "gu", name: "Guam", iso3: "GUM", dial: "+1", flag: "🇬🇺", region: "oceania", lat: 13.4443, lon: 144.7937, nets: ["GTA", "IT&E"], price: 5.8, g5: true },
  { slug: "nc", name: "New Caledonia", iso3: "NCL", dial: "+687", flag: "🇳🇨", region: "oceania", lat: -22.2758, lon: 166.458, nets: ["OPT-NC"], price: 6.4 },
  { slug: "nz", name: "New Zealand", iso3: "NZL", dial: "+64", flag: "🇳🇿", region: "oceania", lat: -41.2865, lon: 174.7762, nets: ["Spark", "One NZ"], price: 5.3, g5: true },
  { slug: "pg", name: "Papua New Guinea", iso3: "PNG", dial: "+675", flag: "🇵🇬", region: "oceania", lat: -9.4438, lon: 147.1803, nets: ["Digicel", "Vodafone"], price: 6.4 },
  { slug: "ws", name: "Samoa", iso3: "WSM", dial: "+685", flag: "🇼🇸", region: "oceania", lat: -13.8507, lon: -171.7514, nets: ["Digicel", "Vodafone"], price: 6.4 },
  { slug: "sb", name: "Solomon Islands", iso3: "SLB", dial: "+677", flag: "🇸🇧", region: "oceania", lat: -9.4456, lon: 159.9729, nets: ["Our Telekom", "bmobile"], price: 6.6 },
  { slug: "to", name: "Tonga", iso3: "TON", dial: "+676", flag: "🇹🇴", region: "oceania", lat: -21.179, lon: -175.1982, nets: ["Digicel", "TCC"], price: 6.4 },
  { slug: "vu", name: "Vanuatu", iso3: "VUT", dial: "+678", flag: "🇻🇺", region: "oceania", lat: -17.7334, lon: 168.322, nets: ["Vodafone", "Digicel"], price: 6.4 },
];

function coord(lat: number, lon: number): string {
  const la = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const lo = `${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
  return `${la} · ${lo}`;
}

export const countries: Country[] = SEED.map((s) => ({
  slug: s.slug,
  name: s.name,
  iso3: s.iso3,
  dialCode: s.dial,
  flag: s.flag,
  region: s.region,
  coords: coord(s.lat, s.lon),
  networks: s.nets,
  speeds: s.g5 ? ["4G", "5G"] : ["4G"],
  popular: s.pop,
  bestseller: s.best,
  fromPrice: s.price,
}));

const bySlug = new Map(countries.map((c) => [c.slug, c]));

export function getCountry(slug: string): Country | undefined {
  return bySlug.get(slug);
}

export function popularCountries(): Country[] {
  return countries.filter((c) => c.popular);
}

export function countriesByRegion(region: string): Country[] {
  return countries.filter((c) => c.region === region);
}

export function searchCountries(query: string, limit = 6): Country[] {
  const q = query.trim().toLowerCase();
  if (!q) return popularCountries().slice(0, limit);
  return countries
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q) ||
        c.slug.includes(q),
    )
    .slice(0, limit);
}
