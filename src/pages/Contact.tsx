import { ACCENT } from "../lib/data";

type Row = { label: string; value: string; href: string | null };

const ROWS: Row[] = [
  { label: "E-mail", value: "chiccap@naver.com", href: "mailto:chiccap@naver.com" },
  { label: "Instagram", value: "@chiclass.p", href: "https://instagram.com/chiclass.p" },
  { label: "Web site", value: "www.chicap.co.kr", href: "https://www.chicap.co.kr" },
  { label: "Company", value: "SEORAEA", href: null },
];

const labelStyle = {
  fontSize: 12,
  letterSpacing: "0.16em",
  color: ACCENT,
} as const;

export default function Contact() {
  return (
    <section
      className="min-h-screen bg-black px-4 pb-24 pt-28 lg:px-8 lg:pb-40 lg:pt-40"
      style={{ color: "#fff", ["--accent" as string]: ACCENT }}
    >
      <div className="mx-auto max-w-[900px]">
        <div
          className="mb-6 font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}
        >
          Contact — CHICAP
        </div>

        <h1
          className="font-bold uppercase leading-[0.88] text-[13vw] lg:text-[6.5vw]"
          style={{ letterSpacing: "-0.045em" }}
        >
          Contact
        </h1>

        {/* C/S CENTER */}
        <div
          className="mt-12 grid gap-3 border-t pt-8 lg:mt-16 lg:grid-cols-[220px_1fr]"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          <div className="font-medium uppercase" style={labelStyle}>
            SKIPP C/S Center
          </div>
          <div>
            <div className="font-bold uppercase text-[20px] lg:text-[24px]" style={{ letterSpacing: "-0.02em" }}>
              kakao. 시캡
            </div>
            <div className="mt-4" style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
              MON – FRI 10:00–18:00 (LUNCH 12:30–14:00)
              <br />
              SAT, SUN, HOLIDAY OFF
            </div>
          </div>
        </div>

        {/* info rows */}
        {ROWS.map((r) => (
          <div
            key={r.label}
            className="grid gap-2 border-t py-7 lg:grid-cols-[220px_1fr]"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <div className="font-medium uppercase" style={labelStyle}>
              {r.label}
            </div>
            {r.href ? (
              <a
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-medium transition-colors hover:text-[var(--accent)] text-[18px] lg:text-[20px]"
                style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", width: "fit-content" }}
              >
                {r.value}
              </a>
            ) : (
              <div className="font-medium text-[18px] lg:text-[20px]" style={{ color: "rgba(255,255,255,0.9)" }}>
                {r.value}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
