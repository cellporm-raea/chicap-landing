import { ACCENT } from "../lib/data";

// 사진 추가/교체: public/gallery 에 파일 넣고 아래 배열에 경로만 추가하면 돼요.
const VIEW_IMAGES = [
  "/gallery/g01.jpg",
  "/gallery/g02.jpg",
  "/gallery/g04.jpg",
  "/gallery/g06.jpg",
  "/gallery/g03.jpg",
  "/gallery/g08.jpg",
  "/gallery/g07.jpg",
  "/gallery/g09.jpg",
  "/gallery/g05.jpg",
  "/gallery/about-real.jpg",
  "/gallery/g10.jpg",
];

export default function View() {
  return (
    <section
      className="min-h-screen bg-black px-4 pb-28 pt-24 lg:px-8 lg:pb-40 lg:pt-28"
      style={{ color: "#fff", ["--accent" as string]: ACCENT }}
    >
      {/* header */}
      <div className="mb-10 lg:mb-16">
        <div
          className="mb-4 font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: ACCENT }}
        >
          View — The CHICAP Archive
        </div>
        <h1
          className="font-bold uppercase leading-[0.88] text-[16vw] lg:text-[8vw]"
          style={{ letterSpacing: "-0.045em" }}
        >
          View
        </h1>
        <p className="mt-4 max-w-[440px]" style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>
          Moments, worn confidently. A living archive of CHICAP.
        </p>
      </div>

      {/* gallery grid */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
        {VIEW_IMAGES.map((src, i) => (
          <div key={i} className="group relative overflow-hidden" style={{ aspectRatio: "3 / 4", background: "#111" }}>
            <img
              src={src}
              alt={`CHICAP view ${i + 1}`}
              className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
