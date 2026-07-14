/* ------------------------------------------------------------------ */
/* Shared constants + helpers                                          */
/* ------------------------------------------------------------------ */
export const HERO_VIDEO = "/hero.mp4";
export const SHOP_URL = "https://store.sixshop.com/chicap";
export const ACCENT = "#0ABAB5"; // Tiffany blue — brand point color

export const GALLERY = [
  "/gallery/g01.jpg",
  "/gallery/g02.jpg",
  "/gallery/g03.jpg",
  "/gallery/g04.jpg",
  "/gallery/g05.jpg",
  "/gallery/g06.jpg",
  "/gallery/g07.jpg",
  "/gallery/g08.jpg",
  "/gallery/g09.jpg",
  "/gallery/g10.jpg",
];

export type Category = {
  no: string;
  name: string;
  tag: string;
  image: string;
  to: string;
};

export const SHOP_CATEGORIES: Category[] = [
  { no: "01", name: "Cap", tag: "Headwear — the signature.", image: "/gallery/g02.jpg", to: "/shop/cap" },
  { no: "02", name: "Clothes", tag: "Beyond the brim.", image: "/gallery/g07.jpg", to: "/shop/clothes" },
];

export const SYMBOLS = ["C", "$", "®", "%", "/"];
export const EASE = [0.25, 0.1, 0.25, 1] as const;

/* Scatter grid layout: -1 = empty spacer, >=0 = gallery index */
export function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let idx = 0;
  let r = 0;
  while (idx < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = idx++;
    if (r % 3 === 0 && idx < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = idx++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

export function colsForWidth(w: number) {
  if (w >= 1024) return 4;
  if (w >= 640) return 3;
  return 2;
}
