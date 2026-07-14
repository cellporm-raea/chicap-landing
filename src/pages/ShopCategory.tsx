import { Link } from "react-router-dom";
import { SHOP_URL, ACCENT } from "../lib/data";

type Props = { name: string; tag: string; image: string };

export default function ShopCategory({ name, tag, image }: Props) {
  return (
    <section className="min-h-screen bg-black" style={{ color: "#fff", ["--accent" as string]: ACCENT }}>
      {/* category hero */}
      <div className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover opacity-70" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-10 lg:px-8 lg:pb-14">
          <div
            className="mb-3 font-medium uppercase"
            style={{ fontSize: 11, letterSpacing: "0.2em", color: ACCENT }}
          >
            Shop — {name}
          </div>
          <h1
            className="font-bold uppercase leading-[0.85] text-[18vw] lg:text-[9vw]"
            style={{ letterSpacing: "-0.045em" }}
          >
            {name}
          </h1>
          <p className="mt-3 max-w-[480px]" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
            {tag}
          </p>
        </div>
      </div>

      {/* body — products live on the store */}
      <div className="mx-auto max-w-[900px] px-4 py-20 lg:px-8 lg:py-28">
        <div
          className="grid gap-2.5 sm:grid-cols-3 lg:gap-4"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-neutral-900"
              style={{ aspectRatio: "4 / 5" }}
            >
              <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.25)" }} className="uppercase">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }} className="max-w-[440px]">
            The {name.toLowerCase()} line is being prepared. Browse the full CHICAP
            collection and check out on our store.
          </p>
          <a
            href={SHOP_URL}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium uppercase transition-colors"
            style={{ background: ACCENT, color: "#0a0a0a", fontSize: 14, letterSpacing: "0.04em", textDecoration: "none" }}
          >
            Shop on store
            <span>&rarr;</span>
          </a>
          <Link
            to="/shop"
            className="mt-6 font-medium uppercase transition-colors hover:text-[var(--accent)]"
            style={{ fontSize: 12, letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
          >
            ← All categories
          </Link>
        </div>
      </div>
    </section>
  );
}
