import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { SHOP_URL, EASE, ACCENT } from "../lib/data";

const bigItem =
  "text-left font-bold uppercase leading-[0.95] text-white transition-colors text-[8vw] hover:text-[var(--accent)] lg:text-[4.2vw]";
const subItem = "font-medium transition-colors hover:text-[var(--accent)]";

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ---- Logo (top left) ---- */}
      <motion.button
        type="button"
        onClick={() => go("/")}
        className="pointer-events-auto fixed left-4 top-4 z-40 cursor-pointer font-bold uppercase leading-none tracking-[-0.03em] text-[28px] sm:text-[40px] lg:left-8 lg:top-8 lg:text-[52px]"
        style={{ mixBlendMode: "exclusion", color: "#fff" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        CHICAP<sup className="align-super text-[0.4em]">®</sup>
      </motion.button>

      {/* ---- Nav (top right) ---- */}
      <motion.div
        className="fixed right-4 top-4 z-40 flex h-[30px] items-center gap-5 lg:right-8 lg:top-8 lg:gap-[50px]"
        style={{ mixBlendMode: "exclusion", color: "#fff" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      >
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => {
            setOpenSection(null);
            setMenuOpen(true);
          }}
          className="cursor-pointer"
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
          className="cursor-pointer font-medium text-[13px] lg:text-[15px]"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          [ CART ]
        </a>
      </motion.div>

      {/* ---- Menu overlay ---- */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-black"
          style={{ color: "#fff", ["--accent" as string]: ACCENT }}
        >
          <div className="flex items-center justify-between px-4 py-4 lg:px-8 lg:py-6">
            <button
              type="button"
              onClick={() => go("/")}
              className="cursor-pointer font-bold uppercase leading-none text-[22px] lg:text-[26px]"
              style={{ letterSpacing: "-0.03em" }}
            >
              CHICAP<sup className="align-super text-[0.4em]">®</sup>
            </button>
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

          <nav className="flex flex-1 flex-col justify-center gap-4 overflow-y-auto py-4 px-4 lg:gap-5 lg:px-8">
            {/* SHOP */}
            <div>
              <button
                type="button"
                onClick={() => setOpenSection(openSection === "shop" ? null : "shop")}
                className={`flex w-full items-center gap-3 ${bigItem}`}
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
                  <button type="button" onClick={() => go("/shop/cap")} className={`${subItem} uppercase`} style={{ fontSize: 14, letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)" }}>
                    Cap
                  </button>
                  <button type="button" onClick={() => go("/shop/clothes")} className={`${subItem} uppercase`} style={{ fontSize: 14, letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)" }}>
                    Clothes
                  </button>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <button type="button" onClick={() => go("/about")} className={bigItem} style={{ letterSpacing: "-0.04em" }}>
              About
            </button>

            {/* CONTACT */}
            <button type="button" onClick={() => go("/contact")} className={bigItem} style={{ letterSpacing: "-0.04em" }}>
              Contact
            </button>

            {/* VIEW */}
            <button type="button" onClick={() => go("/shop")} className={bigItem} style={{ letterSpacing: "-0.04em" }}>
              View
            </button>

            {/* CUSTOMER CARE */}
            <div>
              <button
                type="button"
                onClick={() => setOpenSection(openSection === "care" ? null : "care")}
                className={`flex w-full items-center gap-3 ${bigItem}`}
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
                    <a key={s} href={SHOP_URL} className={subItem} style={{ fontSize: 14, letterSpacing: "0.02em", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

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
