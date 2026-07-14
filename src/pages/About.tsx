export default function About() {
  return (
    <section
      className="min-h-screen bg-black px-4 pb-24 pt-28 lg:px-8 lg:pb-40 lg:pt-40"
      style={{ color: "#fff" }}
    >
      <div className="mx-auto max-w-[900px]">
        {/* image at top — toned to match the moody theme */}
        <div className="relative mx-auto mb-12 w-full max-w-[460px] overflow-hidden lg:mb-16" style={{ aspectRatio: "4 / 5" }}>
          <img
            src="/gallery/about-real.jpg"
            alt="CHICAP"
            className="h-full w-full object-cover"
            style={{
              objectPosition: "50% 26%",
              filter: "brightness(0.8) contrast(1.06) saturate(0.6)",
            }}
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>

        <div
          className="mb-8 font-medium uppercase"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}
        >
          About — CHICAP
        </div>

        {/* English — continuous */}
        <div className="text-[16px] lg:text-[18px]" style={{ lineHeight: 1.9, color: "rgba(255,255,255,0.85)" }}>
          <p>
            CHICAP started with a small but determined step. When the world was
            trying to define me, I put down my hat and stepped on. For that
            moment, I was my standard, not the world. That step has become a
            brand.
          </p>
          <p className="mt-6">
            CHIC — dignity for me, not fashion to show. CAP — captain, a person
            who directs their own life. CHICAP is a brand for those who live as
            masters of life.
          </p>
          <p className="mt-6">
            A hat is not just an accessory. It&rsquo;s my own space. The moment I
            press it down, the noise of the world moves away and only I am left.
            Like a talisman worn on the body — a quiet but strong declaration: my
            life is subject to me.
          </p>
          <p className="mt-6">
            The symbol of CHICAP is the stirrup (등자, 鐙子). A small, elaborate
            piece of metal that turns hesitation into forward motion. Worn
            properly, it is not just a support — it is the power to steady a
            shaking person, and to turn a drifting life into a purposeful gallop.
          </p>
          <p className="mt-6">
            When others look at the waves, CHICAP looks at the seacap.
            Confidently. Cool. Just like you. CHICAP.
          </p>
        </div>

        {/* Korean — continuous */}
        <div className="mt-14 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div
            className="mb-6 font-medium uppercase"
            style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}
          >
            국문
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.95, color: "rgba(255,255,255,0.62)" }}>
            <p>
              CHICAP은 작지만 단호한 한 걸음에서 시작되었습니다. 세상이 나를 규정하려 할 때, 모자를 내려쓰고 걸음을 내딛었습니다. 그 순간만큼은, 세상이 아닌 내가 나의 기준이었습니다. 그 걸음이 브랜드가 되었습니다.
            </p>
            <p className="mt-5">
              CHIC — 보여주기 위한 멋이 아닌, 나를 위한 품격. CAP — 캡틴. 내 삶의 방향을 스스로 정하는 사람. CHICAP은 삶의 주인으로 사는 이들을 위한 브랜드입니다.
            </p>
            <p className="mt-5">
              모자는 단순한 액세서리가 아닙니다. 그것은 나만의 공간입니다. 눌러쓰는 순간, 세상의 소음은 멀어지고 오직 나만 남습니다. 몸에 지니는 부적처럼, 조용하지만 강한 선언 — 내 삶은 내가 주체다.
            </p>
            <p className="mt-5">
              CHICAP의 상징은 등자(鐙子)입니다. 망설임을 전진으로 바꾸는 작고 정교한 쇳조각. 제대로 착용했을 때, 그것은 단순한 지지대가 아닙니다. 흔들리는 사람을 단단히 세우고, 표류하는 삶을 목적 있는 질주로 바꾸는 힘입니다.
            </p>
            <p className="mt-5">
              남들은 파도를 바라볼 때, 시캡은 파도 위의 흰 거품을 봅니다. 당당하게. 멋지게. 온전히 당신답게. CHICAP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
