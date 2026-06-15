import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "Giardino Classico (Roma)",
    desc: "Trasformazione di un giardino privato in terra battuta in un'oasi di relax con piscina e prato verde in soli 5 giorni.",
    before: "/img/prima_dopo/piscina1_prima.jpeg",
    after: "/img/prima_dopo/piscina1_dopo.jpg",
  },
  {
    id: 2,
    name: "Oasi Contemporanea (Toscana)",
    desc: "Integrazione di una piscina dal design moderno in un contesto collinare toscano, con solarium panoramico.",
    before: "/img/prima_dopo/piscina2_prima.jpeg",
    after: "/img/prima_dopo/piscina2_dopo.jpg",
  },
  {
    id: 3,
    name: "Solarium Elegante (Milano)",
    desc: "Realizzazione di una piscina modulare autoportante integrata con pavimentazione in legno e finiture di lusso.",
    before: "/img/prima_dopo/piscina3_prima.jpeg",
    after: "/img/prima_dopo/piscina3_dopo.jpg",
  },
];

function BeforeAfterSlider({ beforeSrc, afterSrc, altBefore, altAfter }) {
  const [pct, setPct] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPct(newPct);
  };

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    handleMove(clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowMouseMove = (e) => {
      handleMove(e.clientX);
    };

    const handleWindowTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        // Prevent scrolling during slider drags on mobile devices
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("touchmove", handleWindowTouchMove, { passive: false });
    window.addEventListener("mouseup", handleWindowMouseUp);
    window.addEventListener("touchend", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
      window.removeEventListener("touchend", handleWindowMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      className="w-full aspect-[16/10] relative overflow-hidden border-black/5 shadow-md bg-neutral-100 select-none cursor-ew-resize group/slider-card"
    >
      {/* PRIMA */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeSrc}
          alt={altBefore}
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
        <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded text-white font-dm text-[8px] tracking-widest uppercase font-semibold">
          Prima
        </div>
      </div>

      {/* DOPO */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden animate-[clip-change_0.3s_ease]"
        style={{ clipPath: `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)` }}
      >
        <Image
          src={afterSrc}
          alt={altAfter}
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
        <div className="absolute bottom-3 right-3 bg-[#3d5a80] backdrop-blur-md px-2.5 py-1 rounded text-white font-dm text-[8px] tracking-widest uppercase font-semibold">
          Dopo
        </div>
      </div>

      {/* Cursore del divisore */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] z-10 pointer-events-none"
        style={{ left: `${pct}%` }}
      >
        {/* Cursore premium con glassmorphism */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center shadow transition-transform duration-200 hover:scale-110">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Transformation({ setIsMethodModalOpen, scrollToSection }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    province: "",
    userType: "Privato",
    phone: "",
    message: "",
    privacyAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section
      id="transformation"
      className="transformation-section flex flex-col items-center justify-start pt-24 pb-16 px-6 md:px-12 fixed inset-0 w-screen h-screen opacity-0 pointer-events-none z-50 overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Immagine di sfondo materica per la sezione */}
      <img
        src="/img/bg_trasformazione_new.png"
        alt="Trasformazione Background"
        className="trans-bg absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none select-none object-top scale-[1.4] blur-[1.5px]"
      />
      {/* Overlay scuro ridotto per valorizzare lo sfondo e garantire la leggibilità del testo */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[5px] z-0 pointer-events-none" />

      <div className="trans-scroll-wrapper max-w-[1200px] w-full flex flex-col gap-6 lg:gap-10 relative z-10">
        {/* Header Editoriale Massive Fullwidth */}
        <div className="w-full text-center trans-title select-none flex flex-col items-center justify-center">
          <h2
            className="font-helvetica-ltw font-black uppercase text-white tracking-[-0.06em] leading-[0.78] text-center flex flex-col items-center"
            style={{ fontSize: "clamp(55px, 13vw, 180px)" }}
          >
            <span className="block">GUARDA COSA</span>
            <span className="block">POSSIAMO CREARE</span>
          </h2>
        </div>

        {/* Row Contenuto - Staccato in righe verticali alternate */}
        <div className="flex flex-col gap-16 lg:gap-20 w-full trans-content">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={proj.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center"
              >
                {/* Immagine con Slider (Colonna da 7 su desktop) */}
                <div className={`lg:col-span-7 w-full ${isEven ? "lg:order-2" : ""}`}>
                  <BeforeAfterSlider
                    beforeSrc={proj.before}
                    afterSrc={proj.after}
                    altBefore={`Prima - ${proj.name}`}
                    altAfter={`Dopo - ${proj.name}`}
                  />
                </div>

                {/* Dettagli Progetto (Colonna da 5 su desktop) */}
                <div
                  className={`lg:col-span-5 text-left flex flex-col gap-2 ${isEven ? "lg:order-1" : ""}`}
                >
                  <h3 className="font-helvetica-ltw font-bold text-[20px] lg:text-[24px] leading-tight text-white">
                    {proj.name}
                  </h3>
                  <p className="font-helvetica-ltw text-[13px] lg:text-[14px] leading-relaxed text-neutral-300">
                    {proj.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer & Modulo Contatto */}
        <footer
          id="contact"
          className="w-screen relative left-1/2 -translate-x-1/2 bg-[#050505] border-t border-white/10 mt-36 lg:mt-48 pt-32 pb-12 px-6 md:px-12 lg:px-20 text-white z-20"
        >
          <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-16 relative z-10">
            {/* Floating Light Card: CTA & Contact Form */}
            <div className="relative -mt-48 lg:-mt-60 mb-8 w-full bg-gradient-to-br from-white via-[#f9fafb] to-[#f3f4f6] border border-black/5 rounded-[32px] p-6 md:p-10 lg:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.12)] overflow-hidden">
              {/* Subtle tech background dot & line pattern */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none select-none">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <defs>
                    <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="#000000" fillOpacity="0.05" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dotGrid)" />
                  {/* Tech Circuit-like Lines */}
                  <path
                    d="M 0 60 H 200 L 260 120 V 220 L 320 280 H 600"
                    fill="none"
                    stroke="rgba(0,0,0,0.05)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 100% 100 H calc(100% - 150px) L calc(100% - 210px) 160 V 240 L calc(100% - 300px) 330 H 400"
                    fill="none"
                    stroke="rgba(0,0,0,0.05)"
                    strokeWidth="1.5"
                  />
                  {/* Glowing Nodes */}
                  <circle
                    cx="260"
                    cy="120"
                    r="3.5"
                    fill="#3d5a80"
                    fillOpacity="0.5"
                    className="animate-pulse"
                  />
                  <circle
                    cx="calc(100% - 210px)"
                    cy="160"
                    r="3.5"
                    fill="#3d5a80"
                    fillOpacity="0.5"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">
                {/* Left Column: Heading & Call to action */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left">
                  <div className="flex flex-col gap-4">
                    <span className="font-dm text-[9px] font-bold tracking-[0.25em] text-[#3d5a80] uppercase">
                      PREVENTIVO & SOPRALLUOGO
                    </span>
                    <h3 className="font-host font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-tight text-neutral-900">
                      La tua piscina pronta in 5 giorni.
                    </h3>
                    <p className="font-host text-[13px] leading-relaxed text-neutral-600 max-w-[36ch]">
                      Scegli la velocità senza rinunciare al lusso. Compila il modulo per
                      richiedere un sopralluogo gratuito o un preventivo personalizzato.
                    </p>
                  </div>

                  {/* Additional Sub-CTA like "Watch how it works" */}
                  <div className="flex items-center gap-6 mt-4 font-dm">
                    <button
                      type="button"
                      onClick={() => setIsMethodModalOpen(true)}
                      className="inline-flex items-center gap-2 text-[10px] font-bold text-neutral-700 hover:text-neutral-900 transition-colors uppercase tracking-wider group bg-transparent border-none cursor-pointer"
                    >
                      <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <svg
                          className="w-3 h-3 text-neutral-700 fill-current ml-0.5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      Scopri il metodo
                    </button>
                  </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="lg:col-span-7 flex flex-col gap-6 bg-black/[0.01] border border-black/5 rounded-2xl p-5 md:p-6 backdrop-blur-md">
                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center gap-4 animate-fadeIn">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="font-host font-semibold text-[16px] text-neutral-900">
                          Messaggio inviato con successo!
                        </h4>
                        <p className="font-host text-[13px] text-neutral-600 max-w-[32ch] mx-auto">
                          Grazie per l'interesse. Un nostro esperto ti contatterà al più presto.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nome e Cognome */}
                        <div className="flex flex-col gap-1 text-left relative">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                              </svg>
                            </span>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Nome e Cognome:"
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 font-host text-[13px] focus:outline-none focus:border-black transition-all"
                            />
                          </div>
                        </div>

                        {/* E-mail */}
                        <div className="flex flex-col gap-1 text-left relative">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                />
                              </svg>
                            </span>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="E-mail:"
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 font-host text-[13px] focus:outline-none focus:border-black transition-all"
                            />
                          </div>
                        </div>

                        {/* Città */}
                        <div className="flex flex-col gap-1 text-left relative">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
                                />
                              </svg>
                            </span>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Città"
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 font-host text-[13px] focus:outline-none focus:border-black transition-all"
                            />
                          </div>
                        </div>

                        {/* Provincia */}
                        <div className="flex flex-col gap-1 text-left relative">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                                />
                              </svg>
                            </span>
                            <input
                              type="text"
                              id="province"
                              name="province"
                              required
                              value={formData.province}
                              onChange={handleInputChange}
                              placeholder="Provincia"
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 font-host text-[13px] focus:outline-none focus:border-black transition-all"
                            />
                          </div>
                        </div>

                        {/* Dropdown Select (Tipo utente) */}
                        <div className="flex flex-col gap-1 text-left relative">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.97 5.97 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                />
                              </svg>
                            </span>
                            <select
                              id="userType"
                              name="userType"
                              value={formData.userType}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-8 py-3 text-neutral-900 font-host text-[13px] focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
                            >
                              <option value="Privato">Privato</option>
                              <option value="Azienda">Azienda</option>
                              <option value="Progettista / Architetto">
                                Progettista / Architetto
                              </option>
                            </select>
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-500">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>

                        {/* Telefono */}
                        <div className="flex flex-col gap-1 text-left relative">
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.94-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                />
                              </svg>
                            </span>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Telefono:"
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 font-host text-[13px] focus:outline-none focus:border-black transition-all"
                            />
                          </div>
                        </div>

                        {/* Messaggio */}
                        <div className="flex flex-col gap-1 text-left relative md:col-span-1">
                          <div className="relative">
                            <span className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-neutral-400">
                              <svg
                                className="w-4.5 h-4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                              </svg>
                            </span>
                            <textarea
                              id="message"
                              name="message"
                              required
                              rows={3}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Messaggio:"
                              className="w-full bg-white border border-neutral-300 rounded-lg pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 font-host text-[13px] focus:outline-none focus:border-black transition-all resize-none min-h-[100px]"
                            />
                          </div>
                        </div>

                        {/* Privacy Checkbox */}
                        <div className="flex items-center text-left relative md:col-span-1 py-2 pl-2">
                          <label className="flex items-start gap-3 cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              id="privacyAccepted"
                              name="privacyAccepted"
                              required
                              checked={formData.privacyAccepted}
                              onChange={handleInputChange}
                              className="w-5 h-5 accent-black rounded border-neutral-300 text-black focus:ring-black cursor-pointer mt-0.5"
                            />
                            <span className="font-host text-[12px] leading-relaxed text-neutral-600">
                              Ho preso visione dell'{" "}
                              <a
                                href="#privacy"
                                className="text-[#3d5a80] underline hover:text-black transition-colors"
                              >
                                Informativa Privacy
                              </a>{" "}
                              (Artt. 13-14 GDPR)
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Centered Invia Button */}
                      <div className="flex justify-center mt-3">
                        <button
                          type="submit"
                          className="min-h-[46px] px-12 rounded-lg bg-black text-white font-host text-[14px] font-bold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                        >
                          Invia
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Columns: Brand & Links in columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-8 border-t border-white/10 text-left font-host">
              {/* Column 1: Logo & Tagline */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <Image
                  src="/img/logo-aquilani-pronto-pools.webp"
                  alt="Aquilani Pronto Pools"
                  width={230}
                  height={64}
                  className="h-[38px] w-auto object-contain brightness-0 invert self-start"
                  unoptimized
                />
                <p className="text-[13px] leading-relaxed text-neutral-400 max-w-[36ch]">
                  Piscine di design pronte all'uso in 5 giorni. Soluzioni autoportanti e interrate
                  di lusso, senza la complessità del cantiere tradicional.
                </p>
              </div>

              {/* Column 2: Metodo */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">
                  Progetto
                </h4>
                <div className="flex flex-col gap-2 text-[13px] text-neutral-400 font-medium">
                  <a
                    href="#hero"
                    onClick={(e) => scrollToSection(e, "hero")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#overview"
                    onClick={(e) => scrollToSection(e, "overview")}
                    className="hover:text-white transition-colors"
                  >
                    Il Metodo
                  </a>
                  <a
                    href="#solutions"
                    onClick={(e) => scrollToSection(e, "solutions")}
                    className="hover:text-white transition-colors"
                  >
                    Le Soluzioni
                  </a>
                  <a
                    href="#transformation"
                    onClick={(e) => scrollToSection(e, "transformation")}
                    className="hover:text-white transition-colors"
                  >
                    Prima / Dopo
                  </a>
                </div>
              </div>

              {/* Column 3: Contatti */}
              <div className="lg:col-span-3 flex flex-col gap-3">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">
                  Contatti
                </h4>
                <div className="flex flex-col gap-2.5 text-[13px] text-neutral-400">
                  <a href="tel:+39061234567" className="hover:text-white transition-colors font-medium">
                    +39 06 123 4567
                  </a>
                  <a
                    href="mailto:info@aquilaniprontopools.it"
                    className="hover:text-white transition-colors font-medium"
                  >
                    info@aquilaniprontopools.it
                  </a>
                  <p className="leading-relaxed">
                    Via Appia Nuova, 1234
                    <br />
                    00178 Roma (RM)
                  </p>
                </div>
              </div>

              {/* Column 4: Social */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">
                  Seguici
                </h4>
                <div className="flex flex-col gap-2 text-[13px] text-neutral-400 font-medium">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Pinterest
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright & Legal Row */}
            <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-[12px] text-neutral-500 font-host w-full">
              <span>
                © {new Date().getFullYear()} Aquilani Pronto Pools. Tutti i diritti riservati.
              </span>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#privacy" className="hover:text-neutral-400 transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#cookie" className="hover:text-neutral-400 transition-colors">
                  Cookie Policy
                </a>
                <span>•</span>
                <span>P.IVA IT01234567890</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
