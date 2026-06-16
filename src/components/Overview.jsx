import React from "react";
import Image from "next/image";

export default function Overview() {
  return (
    <section
      id="overview"
      className="relative z-20 w-full bg-[#f8f7f3] overflow-hidden lg:overflow-visible h-screen lg:h-auto flex flex-col justify-center lg:block"
    >
      <div className="relative flex flex-col lg:flex-row items-stretch lg:items-start max-w-[1600px] mx-auto w-full">
        {/* Colonna sinistra sticky */}
        <div className="w-full lg:w-[40%] flex lg:sticky lg:top-0 lg:h-screen items-center pt-28 pb-4 lg:py-0 px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex flex-col items-start text-left max-w-[450px] w-full">
            <h2
              id="left-heading"
              className="font-host font-bold text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] leading-[1.2] tracking-tight text-[#3C3B4D] cursor-default select-none"
            >
              <span className="block">
                {["Dal", "progetto", "alla"].map((word, i) => (
                  <span
                    key={`l1-${i}`}
                    data-color="#3C3B4D"
                    className="left-word inline-block mr-[0.22em] text-[#3C3B4D]"
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block">
                {["piscina", "pronta,"].map((word, i) => (
                  <span
                    key={`l2-${i}`}
                    data-color="#3C3B4D"
                    className="left-word inline-block mr-[0.22em] text-[#3C3B4D]"
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block">
                {["senza", "cantieri", "infiniti."].map((word, i) => (
                  <span
                    key={`l3-${i}`}
                    data-color="#3C3B4D"
                    className="left-word inline-block mr-[0.22em] text-[#3C3B4D]"
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </div>

        {/* Colonna destra: immagini cinematiche scorrevoli */}
        <div
          className="w-full lg:w-[60%] flex flex-row lg:flex-col relative mobile-horizontal-track overflow-visible flex-nowrap"
          style={{ perspective: "1000px", perspectiveOrigin: "center center" }}
        >
          {[
            {
              src: "/img/pool_01_garden.jpg",
              alt: "Giardino elegante prima della piscina",
              caption: "Analisi dello spazio",
            },
            {
              src: "/img/pool_02_structure.jpg",
              alt: "Struttura piscina in costruzione",
              caption: "Montaggio struttura modulare",
            },
            {
              src: "/img/pool_05_details.jpg",
              alt: "Dettagli architettonici acqua e finiture",
              caption: "Rivestimento e solarium",
            },
            {
              src: "/img/pool_06_lifestyle.jpg",
              alt: "Atmosfera lifestyle piscina di lusso",
              caption: "Piscina pronta all’uso",
            },
          ].map(({ src, alt, caption }, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <div
                key={i}
                className={`w-full shrink-0 h-[60vh] lg:h-screen flex items-center px-4 md:px-6 ${
                  isLast ? "last-frame-slot" : ""
                }`}
              >
                <div className="cinematic-frame w-full flex flex-col gap-3">
                  <div className={`w-full ${isLast ? "last-frame-wrapper" : ""}`}>
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ height: "52vh" }}
                    >
                      {!isLast ? (
                        <img
                          src={src}
                          alt={alt}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          {/* Layer 1: pool_06_lifestyle.jpg */}
                          <img
                            src={src}
                            alt={alt}
                            className="absolute inset-0 w-full h-full object-cover"
                          />

                          {/* Layer 2: foto-t2.jpg */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="zoom-layer-2 w-[40%] h-[40%] relative overflow-hidden flex items-center justify-center">
                              <img
                                src="/img/foto-t2.jpg"
                                alt="Second Inception Step"
                                className="absolute inset-0 w-full h-full object-cover"
                              />

                              {/* Layer 3: foto-t3.jpg */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="zoom-layer-3 w-[40%] h-[40%] relative overflow-hidden flex items-center justify-center">
                                  <img
                                    src="/img/foto-t3.jpg"
                                    alt="Third Inception Step"
                                    className="absolute inset-0 w-full h-full object-cover"
                                  />

                                  {/* Layer 4: cta preview */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="zoom-layer-cta w-[40%] h-[40%] relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center select-none">
                                      <img
                                        src="/img/bg_soluzioni.png"
                                        alt="Solutions Background Preview"
                                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={isLast ? "last-caption" : ""}
                    style={{ paddingInline: "calc(var(--spacing) * 10)" }}
                  >
                    <p className="font-dm text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400 uppercase">
                      {caption}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
