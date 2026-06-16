import React from "react";
import Image from "next/image";

export default function Solutions({ scrollToSection }) {
  return (
    <section
      id="solutions"
      className="cta-section flex flex-col items-center justify-start lg:justify-center pt-24 pb-12 lg:pt-0 lg:pb-0 px-6 md:px-12 fixed inset-0 w-screen h-screen opacity-0 pointer-events-none z-50 overflow-hidden"
      style={{
        backgroundColor: "#050505",
        color: "#f5f3ef",
      }}
    >
      {/* Immagine di sfondo artistica per la sezione */}
      <Image
        src="/img/bg_soluzioni.png"
        alt="Soluzioni Background"
        fill
        className="object-cover z-0 opacity-20 pointer-events-none select-none"
        sizes="100vw"
        priority
        unoptimized
      />

      <div className="soluzioni-scroll-wrapper max-w-[1200px] w-full flex flex-col items-center gap-6 lg:gap-20 relative z-10">
        {/* Header Soluzioni */}
        <div className="text-center flex flex-col gap-2">
          <h2
            className="soluzioni-title font-semibold tracking-tight text-white leading-[1.05]"
            style={{ fontSize: "clamp(30px, 4.5vw, 44px)" }}
          >
            Scegli la soluzione più adatta al tuo spazio
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 w-full">
          {[
            {
              title: "Fuori terra",
              desc: "Rapida da installare, elegante e flessibile. La soluzione perfetta per vivere subito il tuo spazio.",
              img: "/img/card/card_esterna.png",
              alt: "Piscina fuori terra elegante",
            },
            {
              title: "Semi-interrata",
              desc: "Ideale per terreni complessi e ambienti scenografici. Equilibrio perfetto tra design e funzionalità.",
              img: "/img/card/card_seminterrata.png",
              alt: "Piscina semi-interrata",
            },
            {
              title: "Interrata",
              desc: "Massima integrazione nel paesaggio, per un risultato di assoluto prestigio.",
              img: "/img/card/card_interrata.png",
              alt: "Piscina interrata lussuosa",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="soluzione-card relative flex flex-col justify-between min-h-[340px] lg:min-h-[420px] lg:h-[420px] rounded-[24px] border border-white/10 overflow-hidden group"
            >
              {/* Immagine di sfondo a tutta la card */}
              <Image
                src={card.img}
                alt={card.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                sizes="(max-width: 768px) 100vw, 30vw"
                unoptimized
              />

              {/* Overlay gradiente scuro per leggibilità del testo */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/40 to-black/80 z-10 pointer-events-none transition-all duration-500 group-hover:from-[#050505]/90 group-hover:via-[#050505]/45 group-hover:to-black/85" />

              {/* Effetto riflesso acqua astratto */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(158,216,255,0.03),transparent_50%)] opacity-80 group-hover:opacity-100 group-hover:bg-[radial-gradient(circle_at_80%_20%,rgba(158,216,255,0.08),transparent_50%)] transition-all duration-500 pointer-events-none z-20" />

              {/* Contenuto (Testi in alto per lasciare visibile lo sfondo) */}
              <div className="pt-10 pb-6 px-6 lg:pt-16 lg:pb-10 lg:px-10 flex flex-col items-center justify-start h-full text-center relative z-30">
                <div className="flex flex-col items-center gap-2 lg:gap-6">
                  <h3 className="font-host font-semibold text-[17px] lg:text-[20px] leading-tight text-[#f5f3ef] transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="font-host text-[12px] lg:text-[13.5px] leading-relaxed text-[#c0c0c5] max-w-[24ch] lg:max-w-[28ch] transition-colors duration-300 group-hover:text-white/95">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Finale */}
        <div className="soluzioni-cta flex justify-center w-full mt-4">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "transformation")}
            className="inline-flex items-center justify-center min-h-[36px] px-6 rounded-full border border-white/20 bg-transparent text-white font-dm text-[9px] font-semibold tracking-[0.16em] uppercase hover:bg-white hover:text-black transition-all duration-300 text-center gap-1.5 group/btn"
          >
            SCOPRI DI PIÙ{" "}
            <span className="transform translate-x-0 group-hover/btn:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
