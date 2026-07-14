import { useState } from "react";
import { Link } from "react-router-dom";
import { STORE_SHOP } from "../lib/data";

const DETAILS = [
  { label: "Product information", body: "Cotton twill 6-panel cap. Embroidered CHICAP wordmark. Adjustable strap back. Made in Korea." },
  { label: "Shipping", body: "모든 상품 무료배송. 결제 후 1–3 영업일 내 출고됩니다." },
  { label: "Size guide", body: "Free size · 55–59cm 조절 가능. 스트랩으로 사이즈 조정." },
  { label: "Return & Delivery", body: "수령 후 14일 이내 반품/교환 가능. 자세한 내용은 이용안내를 확인하세요." },
];

export default function ProductDetail() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#ffffff", color: "#111111" }}>
      <div className="lg:grid lg:grid-cols-2">
        {/* RIGHT (order-2 desktop) — scrolling images */}
        <div className="lg:order-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ background: i % 2 === 0 ? "#f2f1ef" : "#eceae6", aspectRatio: "4 / 5" }}
            >
              <span
                className="font-bold uppercase"
                style={{ fontSize: 22, letterSpacing: "-0.02em", color: "rgba(0,0,0,0.12)" }}
              >
                CHICAP<sup className="align-super text-[0.5em]">®</sup>
              </span>
            </div>
          ))}
        </div>

        {/* LEFT (order-1 desktop) — sticky product info */}
        <div className="lg:order-1 lg:sticky lg:top-0 lg:self-start">
          <div className="mx-auto w-full max-w-[440px] px-4 pb-16 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
            <div
              className="mb-3 font-medium uppercase"
              style={{ fontSize: 11, letterSpacing: "0.16em", color: "rgba(0,0,0,0.4)" }}
            >
              CHICAP — Cap
            </div>
            <h1 className="font-medium leading-[1.15] text-[24px] lg:text-[28px]" style={{ letterSpacing: "-0.02em" }}>
              The CHICAP Classic Modern Cap
            </h1>
            <div className="mt-2 font-medium" style={{ fontSize: 18 }}>
              72,000<span style={{ fontSize: 13, color: "rgba(0,0,0,0.5)" }}> 원</span>
            </div>
            <p className="mt-5" style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(0,0,0,0.55)" }}>
              눌러쓰는 순간, 당신만의 공간이 시작됩니다.
              <br />
              당당한 걸음을 위한 하나의 선택.
            </p>

            {/* options */}
            <div className="mt-8 space-y-2.5">
              {[
                { ph: "색상", opts: ["Navy", "Burgundy", "Orange", "Red", "Black"] },
                { ph: "사이즈", opts: ["Free"] },
              ].map((s) => (
                <select
                  key={s.ph}
                  defaultValue=""
                  className="w-full appearance-none bg-transparent"
                  style={{ border: "1px solid rgba(0,0,0,0.2)", padding: "12px 14px", fontSize: 13, color: "#111", borderRadius: 0 }}
                >
                  <option value="" disabled>
                    {s.ph}
                  </option>
                  {s.opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ))}
            </div>

            {/* total */}
            <div
              className="mt-7 flex items-center justify-between border-t pt-4 font-medium uppercase"
              style={{ borderColor: "rgba(0,0,0,0.12)", fontSize: 12, letterSpacing: "0.1em" }}
            >
              <span style={{ color: "rgba(0,0,0,0.5)" }}>Total</span>
              <span>0 원</span>
            </div>

            {/* buttons */}
            <a
              href={STORE_SHOP}
              className="mt-4 flex h-[52px] items-center justify-center font-medium uppercase transition-opacity hover:opacity-85"
              style={{ background: "#111", color: "#fff", fontSize: 13, letterSpacing: "0.08em", textDecoration: "none" }}
            >
              Buy now
            </a>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              <a
                href={STORE_SHOP}
                className="flex h-[52px] items-center justify-center font-medium uppercase transition-colors hover:bg-black/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.2)", fontSize: 12, letterSpacing: "0.06em", color: "#111", textDecoration: "none" }}
              >
                Add to Cart
              </a>
              <a
                href={STORE_SHOP}
                className="flex h-[52px] items-center justify-center font-medium uppercase transition-colors hover:bg-black/[0.03]"
                style={{ border: "1px solid rgba(0,0,0,0.2)", fontSize: 12, letterSpacing: "0.06em", color: "#111", textDecoration: "none" }}
              >
                Wish List
              </a>
            </div>

            <p className="mt-5" style={{ fontSize: 11.5, color: "rgba(0,0,0,0.5)" }}>
              If you have any questions feel free to email us at{" "}
              <a href="mailto:chiccap@naver.com" style={{ color: "#111", textDecoration: "underline" }}>
                chiccap@naver.com
              </a>
            </p>

            {/* detail accordion */}
            <div className="mt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              {DETAILS.map((d, i) => (
                <div key={d.label} className="border-b" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center gap-3 py-4 text-left font-medium"
                    style={{ fontSize: 13 }}
                  >
                    <span
                      className="transition-transform duration-300"
                      style={{ transform: open === i ? "rotate(90deg)" : "none", color: "rgba(0,0,0,0.4)" }}
                    >
                      →
                    </span>
                    {d.label}
                  </button>
                  <div
                    style={{
                      maxHeight: open === i ? 160 : 0,
                      opacity: open === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease, opacity 0.3s ease",
                    }}
                  >
                    <p className="pb-4 pl-6" style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(0,0,0,0.55)" }}>
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/shop/cap"
              className="mt-8 inline-block font-medium uppercase"
              style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(0,0,0,0.45)", textDecoration: "none" }}
            >
              ← Back to shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
