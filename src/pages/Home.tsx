import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  HERO_VIDEO,
  GALLERY,
  SYMBOLS,
  EASE,
  SHOP_URL,
  buildLayout,
  colsForWidth,
} from "../lib/data";

export default function Home() {
  const [cols, setCols] = useState(() =>
    colsForWidth(typeof window !== "undefined" ? window.innerWidth : 1440)
  );
  const [videosReady, setVideosReady] = useState(false);
  const [infoShown, setInfoShown] = useState(false);
  const [spacerH, setSpacerH] = useState("500vh");

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
  );
}
