import type { Device } from "@/lib/types";

export const deviceBrands = ["Apple", "Samsung", "Google", "Motorola", "Huawei"] as const;

export const devices: Device[] = [
  { brand: "Apple", model: "iPhone 17 Pro", esimSupported: true },
  { brand: "Apple", model: "iPhone 16 / Plus / Pro", esimSupported: true },
  { brand: "Apple", model: "iPhone 15 / Plus / Pro", esimSupported: true },
  { brand: "Apple", model: "iPhone 14 / Pro", esimSupported: true },
  { brand: "Apple", model: "iPhone SE (2022)", esimSupported: true },
  { brand: "Apple", model: "iPhone XR / XS", esimSupported: true, note: "First eSIM-capable iPhones." },
  { brand: "Samsung", model: "Galaxy S25 / Ultra", esimSupported: true },
  { brand: "Samsung", model: "Galaxy S24 / Ultra", esimSupported: true },
  { brand: "Samsung", model: "Galaxy Z Fold / Flip 6", esimSupported: true },
  { brand: "Samsung", model: "Galaxy A55", esimSupported: true },
  { brand: "Google", model: "Pixel 9 / Pro", esimSupported: true },
  { brand: "Google", model: "Pixel 8 / Pro", esimSupported: true },
  { brand: "Google", model: "Pixel 7 / 6", esimSupported: true },
  { brand: "Google", model: "Pixel 3 (non-US carrier variants)", esimSupported: false, note: "eSIM disabled on some carrier models." },
  { brand: "Motorola", model: "Razr 2024", esimSupported: true },
  { brand: "Motorola", model: "Edge 50 Pro", esimSupported: true },
  { brand: "Motorola", model: "Moto G (2023 and earlier)", esimSupported: false, note: "Physical SIM only on most G-series." },
  { brand: "Huawei", model: "P40 / Pro", esimSupported: true },
  { brand: "Huawei", model: "Mate 40 Pro", esimSupported: true },
  { brand: "Huawei", model: "P30 and earlier", esimSupported: false, note: "No eSIM hardware." },
];

export function modelsForBrand(brand: string): Device[] {
  return devices.filter((d) => d.brand === brand);
}
