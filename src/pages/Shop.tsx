import { Link } from "react-router-dom";
import { SHOP_CATEGORIES, STORE_SHOP, ACCENT } from "../lib/data";

export default function Shop() {
  return (
    <section
      className="min-h-screen bg-black px-4 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-40"
      style={{ color: "#fff", ["--accent" as string]: ACCENT }}
    >
      {/* header */}
      <div className="mb-12 lg:mb-20">
        <div
          className="mb-4 font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}
        >
          Select your line
        </div>
        <h1
          className="font-bold uppercase leading-[0.88] text-[15vw] lg:text-[7.5vw]"
          style={{ letterSpacing: "-0.045em" }}
        >
          Shop
        </h1>
      </div>

      {/* category grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:gap-4">
        {SHOP_CATEGORIES.map((cat) => (
          <Link
            key={cat.no}
            to={cat.to}
            className="group relative block overflow-hidden bg-neutral-900"
            style={{ aspectRatio: "4 / 5", textDecoration: "none" }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-100"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.82) 100%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
              <span className="font-medium" style={{ fontSize: 12, letterSpacing: "0.1em", color: ACCENT }}>
                {cat.no}
              </span>
              <div>
                <div
                  className="font-bold uppercase leading-none text-[28px] lg:text-[40px]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {cat.name}
                </div>
                <div className="mt-2 font-medium" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                  {cat.tag}
                </div>
                <div
                  className="mt-3 h-px w-0 transition-all duration-500 ease-out group-hover:w-full"
                  style={{ background: ACCENT }}
                />
              </div>
            </div>
          </Link>
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
          href={STORE_SHOP}
          className="group inline-flex items-center gap-2 font-medium uppercase"
          style={{ fontSize: 14, letterSpacing: "0.04em", color: "#fff", textDecoration: "none" }}
        >
          View full store
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
