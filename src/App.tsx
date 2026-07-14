import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/* Assets (placeholder — swap for real CHICAP headwear later)          */
/* ------------------------------------------------------------------ */
const HERO_VIDEO = "/hero.mp4";
const SHOP_URL = "https://store.sixshop.com/chicap";

const GALLERY = [
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

type Category = { no: string; name: string; tag: string; image: string; href: string };
const SHOP_CATEGORIES: Category[] = [
  { no: "01", name: "Ball Cap", tag: "The signature silhouette.", image: "/gallery/g02.jpg", href: SHOP_URL },
  { no: "02", name: "Beanie", tag: "Knit, for the cold months.", image: "/gallery/g03.jpg", href: SHOP_URL },
  { no: "03", name: "Leopard", tag: "The statement line.", image: "/gallery/g06.jpg", href: SHOP_URL },
  { no: "04", name: "Archive", tag: "Everything, in one place.", image: "/gallery/g08.jpg", href: SHOP_URL },
];

const SYMBOLS = ["C", "$", "®", "%", "/"];
const EASE = [0.25, 0.1, 0.25, 1] as const;

/* Scatter grid layout: -1 = empty spacer, >=0 = gallery index */
function buildLayout(count: number, cols: number): number[][] {
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

function colsForWidth(w: number) {
  if (w >= 1024) return 4;
  if (w >= 640) return 3;
  return 2;
}

export default function App() {
  const [cols, setCols] = useState(() =>
    colsForWidth(typeof window !== "undefined" ? window.innerWidth : 1440)
  );
  const [videosReady, setVideosReady] = useState(false);
  const [infoShown, setInfoShown] = useState(false);
  const [spacerH, setSpacerH] = useState("500vh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // refs
  const spacerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const symbolRef = useRef<HTMLSpanElement>(null);

  // interaction state
  const lastSymbolRef = useRef(0);

  const layout = buildLayout(GALLERY.length, cols);

  /* ---- responsive columns ---- */
  useEffect(() => {
    const onResize = () => setCols(colsForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---- staggered entry for product info ---- */
  useEffect(() => {
    const t = setTimeout(() => setInfoShown(true), 450);
    return () => clearTimeout(t);
  }, []);

  /* ---- custom cursor follow ---- */
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const onMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ---- hero video: load fade-in + autoplay loop ---- */
  useEffect(() => {
    const v = heroVideoRef.current;
    if (!v) return;
    const onLoad = () => setVideosReady(true);
    v.addEventListener("loadeddata", onLoad);
    if (v.readyState >= 2) onLoad();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) v.play().catch(() => {});
    return () => v.removeEventListener("loadeddata", onLoad);
  }, []);

  /* ---- master RAF loop: scroll phases ---- */
  useEffect(() => {
    let raf = 0;

    const computeHeights = () => {
      const vh = window.innerHeight;
      const wrap = wrapRef.current;
      if (!wrap) return 0;
      const maxScroll = Math.max(0, wrap.scrollHeight - vh);
      setSpacerH(`${vh + maxScroll + 2 * vh}px`);
      return maxScroll;
    };

    let maxScroll = computeHeights();
    const onResize = () => {
      maxScroll = computeHeights();
    };
    window.addEventListener("resize", onResize);
    const heightTimer = setTimeout(() => {
      maxScroll = computeHeights();
    }, 1200);

    const frame = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      // hide hero video past first viewport
      if (canvasRef.current) {
        canvasRef.current.style.visibility = scrollY > vh ? "hidden" : "visible";
      }

      // phase 1: black panel slides up from below over first viewport
      if (panelRef.current) {
        const panelY = Math.max(0, vh - scrollY);
        panelRef.current.style.transform = `translateY(${panelY}px)`;
      }

      // phase 2: gallery scroll inside fixed panel
      if (wrapRef.current) {
        const shift = scrollY > vh ? -(scrollY - vh) : 0;
        wrapRef.current.style.transform = `translateY(${shift}px)`;
      }

      // per-card scale based on rendered viewport position
      const cards = document.querySelectorAll<HTMLElement>(".bp-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;
        let scale: number;
        if (bottom <= 0 || top >= vh) {
          scale = 0;
        } else {
          const enter = Math.min(1, (vh - top) / (vh * 0.6));
          const exit = Math.min(1, bottom / (vh * 0.4));
          scale = Math.max(0, Math.min(enter, exit));
        }
        card.style.transform = `scale(${scale})`;
      });

      // randomize circle symbol on scroll (throttled ~80ms via distance)
      const now = scrollY;
      if (Math.abs(now - lastSymbolRef.current) > 40 && symbolRef.current) {
        lastSymbolRef.current = now;
        symbolRef.current.textContent =
          SYMBOLS[Math.floor((scrollY / 40) % SYMBOLS.length)] ?? "C";
      }

      // outro
      const outroStart = vh + maxScroll;
      const outroOffset = window.innerWidth >= 1024 ? 166 : 132;
      let progress = 0;
      if (scrollY > outroStart) {
        progress = Math.min(1, Math.max(0, (scrollY - outroStart) / (vh - 100)));
      }
      if (overlayRef.current) overlayRef.current.style.opacity = `${progress}`;
      if (footerRef.current) footerRef.current.style.opacity = `${progress}`;
      if (infoRef.current) {
        infoRef.current.style.transform = `translateY(${-outroOffset * progress}px)`;
      }
      if (buyRef.current) {
        buyRef.current.style.transform = `scale(${progress})`;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(heightTimer);
    };
  }, [cols]);

  return (
    <>
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className="relative select-none bg-black"
      style={{ height: spacerH }}
    >
      {/* ---- Custom cursor (desktop only) ---- */}
      <div
        id="custom-cursor"
        className="pointer-events-none fixed z-50 hidden lg:block"
        style={{ mixBlendMode: "exclusion", transform: "translate(-50%, -50%)" }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22.75" stroke="#fff" strokeWidth="2.5" />
          <path
            d="M24 15v18M15 24h18M18 18l12 12M30 18L18 30"
            stroke="#fff"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ---- Video hero canvas ---- */}
      <div
        id="main-canvas"
        ref={canvasRef}
        className="pointer-events-none fixed left-0 top-[220px] z-0 h-[calc(100vh-220px)] w-screen overflow-hidden lg:inset-0 lg:h-full lg:w-full"
        style={{
          opacity: videosReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
      </div>

      {/* ---- Logo (top left) ---- */}
      <motion.div
        className="pointer-events-none fixed left-4 top-4 z-20 font-bold uppercase leading-none tracking-[-0.03em] text-[28px] sm:text-[40px] lg:left-8 lg:top-8 lg:text-[52px]"
        style={{ mixBlendMode: "exclusion", color: "#fff" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0 }}
      >
        CHICAP<sup className="align-super text-[0.4em]">®</sup>
      </motion.div>

      {/* ---- Caption (below logo) ---- */}
      <motion.p
        className="pointer-events-none fixed left-4 top-[118px] z-20 w-[calc(100vw-32px)] font-medium sm:top-[180px] sm:w-[calc(50vw-48px)] lg:left-8 lg:top-[244px] lg:w-[692px]"
        style={{
          mixBlendMode: "exclusion",
          color: "#fff",
          fontSize: 16,
          lineHeight: "140%",
          letterSpacing: "-0.04em",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      >
        Let&rsquo;s live a chic and confident life. While others look at the
        waves,
        <br />
        CHICAP looks at the seacap.
      </motion.p>

      {/* ---- Header nav (top right) ---- */}
      <motion.div
        className="pointer-events-none fixed right-4 top-4 z-20 flex h-[30px] items-center justify-between lg:right-8 lg:top-8 lg:w-[330px]"
        style={{ mixBlendMode: "exclusion", color: "#fff" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      >
        <span
          className="hidden font-medium uppercase lg:block"
          style={{ fontSize: 15 }}
        >
          About
        </span>
        <div className="flex items-center gap-5 lg:gap-[50px]">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => {
              setOpenSection(null);
              setMenuOpen(true);
            }}
            className="pointer-events-auto cursor-pointer"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              className="h-6 w-6 lg:h-[30px] lg:w-[30px]"
            >
              <path d="M0 14H40" stroke="#fff" strokeWidth="2.5" />
              <path d="M0 26H40" stroke="#fff" strokeWidth="2.5" />
            </svg>
          </button>
          <a
            href={SHOP_URL}
            className="pointer-events-auto cursor-pointer font-medium text-[13px] lg:text-[15px]"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            [ CART ]
          </a>
        </div>
      </motion.div>

      {/* ---- Product info (bottom) ---- */}
      <div
        id="outro-info"
        ref={infoRef}
        className="pointer-events-none fixed bottom-12 left-0 right-0 z-20 flex flex-col items-center lg:bottom-20 lg:left-auto lg:right-8 lg:w-[330px]"
        style={{
          mixBlendMode: "exclusion",
          color: "#fff",
          opacity: infoShown ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="mb-3 flex w-[252px] flex-col items-start lg:mb-8 lg:w-full">
          <div className="relative mb-3 h-5 w-5 lg:h-[30px] lg:w-[30px]">
            <svg
              viewBox="0 0 40 40"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              <circle cx="20" cy="20" r="18.75" stroke="#fff" strokeWidth="2" />
            </svg>
            <span
              ref={symbolRef}
              id="circle-symbol"
              className="absolute inset-0 flex items-center justify-center font-medium uppercase"
              style={{ letterSpacing: "-0.04em", fontSize: 10 }}
            >
              C
            </span>
          </div>
          <div
            className="text-center font-medium uppercase leading-none text-[20px] lg:text-[30px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Archive Collection
            <br />
            &ldquo;CHICAP&rdquo;
          </div>
        </div>
      </div>

      {/* ---- View button (hidden until outro) ---- */}
      <div
        id="outro-buy"
        ref={buyRef}
        className="pointer-events-none fixed bottom-[60px] left-4 right-4 z-20 flex h-[100px] items-center justify-center lg:bottom-8 lg:left-auto lg:right-8 lg:h-[174px] lg:w-[330px]"
        style={{
          mixBlendMode: "exclusion",
          background: "#fff",
          borderRadius: 1335,
          transformOrigin: "right bottom",
          transform: "scale(0)",
        }}
      >
        <a
          href={SHOP_URL}
          className="pointer-events-auto flex h-full w-full cursor-pointer items-center justify-center font-medium leading-none text-[72px] lg:text-[110px]"
          style={{
            letterSpacing: "-0.04em",
            color: "#fff",
            mixBlendMode: "exclusion",
            textDecoration: "none",
          }}
        >
          view
        </a>
      </div>

      {/* ---- Footer ---- */}
      <div
        id="outro-footer"
        ref={footerRef}
        className="pointer-events-none fixed bottom-6 left-4 z-20 flex w-[calc(100vw-32px)] justify-between lg:bottom-8 lg:w-auto lg:justify-start lg:gap-20"
        style={{ mixBlendMode: "exclusion", color: "#fff", opacity: 0 }}
      >
        <span
          className="font-medium uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          CHICAP ® 2026
        </span>
        <span
          className="font-medium uppercase text-[11px] lg:text-[13px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Privacy Policy
        </span>
      </div>

      {/* ---- White outro overlay ---- */}
      <div
        id="outro-overlay"
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[12] bg-white"
        style={{ opacity: 0 }}
      />

      {/* ---- Black panel (gallery) ---- */}
      <div
        id="black-panel"
        ref={panelRef}
        className="fixed inset-0 z-10 bg-black"
        style={{ transform: "translateY(100vh)" }}
      >
        <div ref={wrapRef} style={{ paddingTop: "min(400px, 40vh)" }}>
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {layout.flatMap((row, r) =>
              row.map((cell, c) => {
                const key = `${r}-${c}`;
                if (cell === -1) {
                  return <div key={key} style={{ aspectRatio: "2 / 3" }} />;
                }
                const origin = c < cols / 2 ? "right bottom" : "left bottom";
                return (
                  <div
                    key={key}
                    className="bp-card"
                    style={{
                      aspectRatio: "2 / 3",
                      transform: "scale(0)",
                      transformOrigin: origin,
                    }}
                  >
                    <img
                      src={GALLERY[cell]}
                      alt={`CHICAP archive ${cell + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>

    {/* ================= SHOP CATEGORIES ================= */}
    <section
      id="shop"
      className="relative z-40 bg-black px-4 pb-20 pt-24 lg:px-8 lg:pb-28 lg:pt-32"
      style={{ color: "#fff" }}
    >
      {/* header */}
      <div className="mb-12 lg:mb-20">
        <div
          className="mb-4 font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}
        >
          Select your line
        </div>
        <h2
          className="font-bold uppercase leading-[0.88] text-[15vw] lg:text-[7.5vw]"
          style={{ letterSpacing: "-0.045em" }}
        >
          Shop the
          <br />
          Archive
        </h2>
      </div>

      {/* category grid */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
        {SHOP_CATEGORIES.map((cat) => (
          <a
            key={cat.no}
            href={cat.href}
            className="group relative block overflow-hidden bg-neutral-900"
            style={{ aspectRatio: "3 / 4", textDecoration: "none" }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
              loading="lazy"
            />
            {/* dark gradient for legibility */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.82) 100%)",
              }}
            />
            {/* labels */}
            <div className="absolute inset-0 flex flex-col justify-between p-3.5 lg:p-5">
              <span
                className="font-medium"
                style={{ fontSize: 12, letterSpacing: "0.1em", color: "#C1445A" }}
              >
                {cat.no}
              </span>
              <div>
                <div
                  className="font-bold uppercase leading-none text-[20px] lg:text-[26px]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {cat.name}
                </div>
                <div
                  className="mt-1.5 font-medium"
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}
                >
                  {cat.tag}
                </div>
                <div
                  className="mt-2 h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
                  style={{ background: "#C1445A" }}
                />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* footer CTA */}
      <div
        className="mt-14 flex items-center justify-between border-t pt-7 lg:mt-20"
        style={{ borderColor: "rgba(255,255,255,0.15)" }}
      >
        <span
          className="font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)" }}
        >
          CHICAP ® 2026
        </span>
        <a
          href={SHOP_URL}
          className="group inline-flex items-center gap-2 font-medium uppercase"
          style={{ fontSize: 14, letterSpacing: "0.04em", color: "#fff", textDecoration: "none" }}
        >
          View full store
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>
    </section>

    {/* ================= MENU OVERLAY ================= */}
    {menuOpen && (
      <div className="fixed inset-0 z-[70] flex flex-col bg-black" style={{ color: "#fff" }}>
        {/* top bar */}
        <div className="flex items-center justify-between px-4 py-4 lg:px-8 lg:py-6">
          <span
            className="font-bold uppercase leading-none text-[22px] lg:text-[26px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            CHICAP<sup className="align-super text-[0.4em]">®</sup>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer"
          >
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
              <path
                d="M7 7L33 33M33 7L7 33"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* menu items */}
        <nav className="flex flex-1 flex-col justify-center gap-4 overflow-y-auto py-4 px-4 lg:gap-5 lg:px-8">
          {/* SHOP (accordion) */}
          <div>
            <button
              type="button"
              onClick={() => setOpenSection(openSection === "shop" ? null : "shop")}
              className="flex w-full items-center gap-3 text-left font-bold uppercase leading-[0.95] text-white transition-colors text-[8vw] hover:text-[#C1445A] lg:text-[4.2vw]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Shop
              <span
                className="transition-transform duration-300"
                style={{ fontSize: "0.3em", transform: openSection === "shop" ? "rotate(45deg)" : "none", color: "rgba(255,255,255,0.5)" }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: openSection === "shop" ? 80 : 0,
                opacity: openSection === "shop" ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease, opacity 0.35s ease",
              }}
            >
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 pl-1">
                {["Cap", "Clothes"].map((s) => (
                  <a
                    key={s}
                    href={SHOP_URL}
                    className="font-medium uppercase transition-colors hover:text-[#C1445A]"
                    style={{ fontSize: 14, letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="text-left font-bold uppercase leading-[0.95] text-white transition-colors text-[8vw] hover:text-[#C1445A] lg:text-[4.2vw]"
            style={{ letterSpacing: "-0.04em" }}
          >
            About
          </button>

          {/* CONTACT */}
          <a
            href="mailto:chiccaapp@gmail.com"
            className="font-bold uppercase leading-[0.95] text-white transition-colors text-[8vw] hover:text-[#C1445A] lg:text-[4.2vw]"
            style={{ letterSpacing: "-0.04em", textDecoration: "none" }}
          >
            Contact
          </a>

          {/* VIEW */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              const s = document.getElementById("shop");
              if (s) s.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-left font-bold uppercase leading-[0.95] text-white transition-colors text-[8vw] hover:text-[#C1445A] lg:text-[4.2vw]"
            style={{ letterSpacing: "-0.04em" }}
          >
            View
          </button>

          {/* CUSTOMER CARE (accordion, bottom) */}
          <div>
            <button
              type="button"
              onClick={() => setOpenSection(openSection === "care" ? null : "care")}
              className="flex w-full items-center gap-3 text-left font-bold uppercase leading-[0.95] text-white transition-colors text-[8vw] hover:text-[#C1445A] lg:text-[4.2vw]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Customer Care
              <span
                className="transition-transform duration-300"
                style={{ fontSize: "0.3em", transform: openSection === "care" ? "rotate(45deg)" : "none", color: "rgba(255,255,255,0.5)" }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: openSection === "care" ? 120 : 0,
                opacity: openSection === "care" ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease, opacity 0.35s ease",
              }}
            >
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 pl-1">
                {["공지사항", "상품 후기", "상품 Q&A", "이용안내 FAQ"].map((s) => (
                  <a
                    key={s}
                    href={SHOP_URL}
                    className="font-medium transition-colors hover:text-[#C1445A]"
                    style={{ fontSize: 14, letterSpacing: "0.02em", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* footer */}
        <div
          className="flex items-center justify-between px-4 py-6 lg:px-8"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.1em" }}
        >
          <span className="uppercase">CHICAP ® 2026</span>
          <span>store.sixshop.com/chicap</span>
        </div>
      </div>
    )}
    </>
  );
}
