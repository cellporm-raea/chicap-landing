import { useState } from "react";
import { Link } from "react-router-dom";

type Props = { name: string; tag: string; image: string };

const PRODUCTS = Array.from({ length: 27 }, (_, i) => ({
  id: i,
  name: "The CHICAP Classic Modern Cap",
  price: "72,000",
  desc: "유행이 아닌 품격을 입는다. 시간이 지나도 바래지 않는 색, CHICAP이 선택한 모던한 올드머니의 팔레트.",
}));

const PAGE = 8;

export default function ShopCategory({ name }: Props) {
  const [visible, setVisible] = useState(PAGE);
  const shown = PRODUCTS.slice(0, visible);
  const hasMore = visible < PRODUCTS.length;

  return (
    <section
      className="min-h-screen px-4 pb-28 pt-24 lg:px-8 lg:pt-28"
      style={{ background: "#ffffff", color: "#111111" }}
    >
      {/* category tabs */}
      <div
        className="mb-8 flex items-center gap-6 border-b pb-5 lg:mb-12"
        style={{ borderColor: "rgba(0,0,0,0.1)" }}
      >
        {[
          { label: "Cap", to: "/shop/cap" },
          { label: "Clothes", to: "/shop/clothes" },
        ].map((t) => {
          const active = t.label.toLowerCase() === name.toLowerCase();
          return (
            <Link
              key={t.label}
              to={t.to}
              className="font-medium uppercase transition-colors"
              style={{
                fontSize: 13,
                letterSpacing: "0.1em",
                color: active ? "#111" : "rgba(0,0,0,0.4)",
                textDecoration: "none",
              }}
            >
              {t.label}
            </Link>
          );
        })}
        <span
          className="ml-auto font-medium uppercase"
          style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: "0.1em" }}
        >
          {PRODUCTS.length} items
        </span>
      </div>

      {/* product grid — desktop 4 / mobile 2 */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-9 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-14">
        {shown.map((p) => (
          <Link
            key={p.id}
            to="/shop/product"
            className="group block"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* image — 3:4 placeholder */}
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{ background: "#f2f1ef", aspectRatio: "3 / 4" }}
            >
              <span
                className="font-bold uppercase"
                style={{ fontSize: 15, letterSpacing: "-0.02em", color: "rgba(0,0,0,0.13)" }}
              >
                CHICAP<sup className="align-super text-[0.5em]">®</sup>
              </span>
              {/* add to cart bar (hover) */}
              <div
                className="absolute inset-x-0 bottom-0 translate-y-full py-3 text-center font-medium uppercase transition-transform duration-300 ease-out group-hover:translate-y-0"
                style={{ background: "rgba(17,17,17,0.92)", color: "#fff", fontSize: 11, letterSpacing: "0.16em" }}
              >
                Add to cart
              </div>
            </div>

            {/* info */}
            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="font-medium" style={{ fontSize: 14, letterSpacing: "-0.01em" }}>
                {p.name}
              </div>
              <div className="whitespace-nowrap font-medium" style={{ fontSize: 13 }}>
                {p.price}
                <span style={{ fontSize: 11, color: "rgba(0,0,0,0.45)" }}> 원</span>
              </div>
            </div>
            <p className="mt-1.5" style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(0,0,0,0.45)" }}>
              {p.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* load more */}
      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + PAGE, PRODUCTS.length))}
            className="flex h-14 w-14 items-center justify-center rounded-full border transition-colors hover:bg-[#111] hover:text-white"
            style={{ borderColor: "rgba(0,0,0,0.25)", fontSize: 24, fontWeight: 300, lineHeight: 1 }}
            aria-label="더보기"
          >
            +
          </button>
        </div>
      )}
    </section>
  );
}
