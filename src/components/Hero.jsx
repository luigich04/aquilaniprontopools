import React from "react";
import Image from "next/image";

export default function Hero({ canvasRef, bgImageRef, overlayRef, heroTextRef }) {
  return (
    <div
      id="hero"
      className="hero relative w-full h-screen overflow-hidden z-10"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Canvas: sequenza frame video */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 hidden lg:block" />

      {/* Immagine di sfondo iniziale (sfuma per rivelare il canvas) */}
      <Image
        ref={bgImageRef}
        src="/img/overlay_hero.png"
        alt="Aquilani Pronto Pools Hero Background"
        fill
        className="object-cover z-[5] pointer-events-none"
        priority
        sizes="100vw"
        unoptimized
      />

      {/* Overlay scuro (sfuma insieme al testo) */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />

      {/* Gradiente fisso in alto per leggibilità della navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

      {/* Testo hero centrato */}
      <div
        ref={heroTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[135%] text-center w-full max-w-5xl px-6 z-20 pointer-events-none"
      >
        <h1 className="font-host font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-[1.1] tracking-tight text-white">
          <span className="block overflow-hidden pt-0 pb-1.5">
            <span className="reveal-line block">Design, acqua, lusso.</span>
          </span>
          <span className="block overflow-hidden pt-0 pb-1.5 -mt-1.5">
            <span className="reveal-line block">La tua piscina pronta in 5 giorni.</span>
          </span>
        </h1>
      </div>
    </div>
  );
}
