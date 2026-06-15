import React from "react";

export default function MethodModal({ isMethodModalOpen, setIsMethodModalOpen }) {
  if (!isMethodModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-6 select-none animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => setIsMethodModalOpen(false)} />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-[#0b0b0a] border border-white/10 rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden max-h-[90vh] flex flex-col z-10 animate-[fadeIn_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 md:px-8 border-b border-white/10">
          <div className="flex flex-col gap-0.5">
            <span className="font-dm text-[9px] font-bold tracking-[0.25em] text-[#3d5a80] uppercase">
              RISORSE & DOWNLOADS
            </span>
            <h3 className="font-host font-bold text-lg text-white">
              Il Metodo Aquilani Pronto Pools
            </h3>
          </div>
          <button
            onClick={() => setIsMethodModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 cursor-pointer"
          >
            <svg
              className="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Video Player */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                <video
                  src="/video/pronto-pools _video.mp4"
                  poster="/img/pool_06_lifestyle.jpg"
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-host text-[12px] text-neutral-400 leading-relaxed max-w-[90%]">
                Guarda la video-guida per scoprire come i nostri moduli autoportanti consentono di
                posare la tua piscina in soli 5 giorni, azzerando la complessità del cantiere
                tradizionale.
              </p>
            </div>

            {/* Right Column: Downloads / Resource cards */}
            <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
              {[
                {
                  category: "CATALOGO E LISTINO",
                  title: "Aquilani Pronto Pools",
                  desc: "Scarica il Catalogo e listino prezzi Aquilani Pronto Pools e scoprine tutti i punti di forza! La Piscina diventa un sogno facile da realizzare!",
                  action: "Scarica catalogo",
                  href: "/files/catalogo.pdf",
                },
                {
                  category: "GUIDA GRATUITA",
                  title: "Piscine Interrate e Fuoriterra",
                  desc: "Una guida sul mondo delle piscine, per orientarvi e capire, ma soprattutto per non dover mai dire: “ah… se lo avessi sabuto prima”",
                  action: "Scarica guida",
                  href: "/files/guida-piscine.pdf",
                },
                {
                  category: "STORY",
                  title: "Dal nulla alla tua nuova piscina!",
                  desc: "Dal progetto alla realtà in pochi step! Scopri tutto quello che c'è da sapere su come realizzare la tua piscina interrata o la tua piscina fuori terra dal nulla...",
                  action: "Scarica story",
                  href: "/files/Prontopools-story.pdf",
                },
                {
                  category: "GALLERIA FOTOGRAFICA",
                  title: "Le foto delle nostre piscine",
                  desc: "Una carrellata dei nostri lavori, delle nostre piscine, sia interrate che fuori terra. Per vedere con i tuoi occhi la bellezza delle piscine Aquilani Pronto Pools.",
                  action: "Foto-Gallery",
                  href: "/files/catfoto.pdf",
                },
              ].map((res, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] rounded-xl p-5 flex flex-col gap-3 text-left transition-all duration-300 group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-dm text-[8px] font-bold tracking-[0.2em] text-[#3d5a80] uppercase">
                      {res.category}
                    </span>
                    <h4 className="font-host font-bold text-[15px] text-white group-hover:text-[#3d5a80] transition-colors duration-300">
                      {res.title}
                    </h4>
                    <p className="font-host text-[12px] text-neutral-400 leading-relaxed mt-0.5">
                      {res.desc}
                    </p>
                  </div>
                  <a
                    href={res.href}
                    download
                    className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold text-[#3d5a80] hover:text-white uppercase tracking-wider transition-colors duration-300 mt-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    {res.action}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
