"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    name: "Giardino Classico (Roma)",
    desc: "Trasformazione di un giardino privato in terra battuta in un'oasi di relax con piscina e prato verde in soli 5 giorni.",
    before: "/img/pool_01_garden.jpg",
    after: "/img/pool_04_completed.jpg",
  },
  {
    id: 2,
    name: "Oasi Contemporanea (Toscana)",
    desc: "Integrazione di una piscina dal design moderno in un contesto collinare toscano, con solarium panoramico.",
    before: "/img/pool_03_construction.jpg",
    after: "/img/pool_06_lifestyle.jpg",
  },
  {
    id: 3,
    name: "Solarium Elegante (Milano)",
    desc: "Realizzazione di una piscina modulare autoportante integrata con pavimentazione in legno e finiture di lusso.",
    before: "/img/pool_02_structure.jpg",
    after: "/img/pool_05_details.jpg",
  },
];

function BeforeAfterSlider({ beforeSrc, afterSrc, altBefore, altAfter }) {
  const [pct, setPct] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef(null);

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

  React.useEffect(() => {
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
      className="w-full aspect-[16/10] relative overflow-hidden  border-black/5 shadow-md bg-neutral-100 select-none cursor-ew-resize group/slider-card"
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

export default function Home() {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const navRef = useRef(null);
  const canvasRef = useRef(null);
  const countdownRef = useRef(null);
  const finalTextRef = useRef(null);
  const bgImageRef = useRef(null);
  const overlayRef = useRef(null);

  const scrollToSection = (e, sectionName) => {
    if (e) e.preventDefault();
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    const h = window.innerHeight;

    if (isDesktop && window.lenis) {
      let targetScroll = 0;
      if (sectionName === "hero" || sectionName === "home") {
        targetScroll = 0;
      } else if (sectionName === "overview") {
        targetScroll = 3.5 * h;
      } else if (sectionName === "solutions") {
        targetScroll = 9.4 * h;
      } else if (sectionName === "transformation" || sectionName === "contact" || sectionName === "get-started" || sectionName === "demo") {
        targetScroll = 11.0 * h;
      }
      window.lenis.scrollTo(targetScroll, { duration: 1.5 });
    } else {
      let targetId = sectionName;
      if (sectionName === "home") targetId = "hero";
      if (sectionName === "contact" || sectionName === "get-started" || sectionName === "demo") targetId = "transformation";
      if (sectionName === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useGSAP(
    () => {
      // ─────────────────────────────────────────────────────────────────────────
      // 1. LENIS — smooth scroll only.
      //    Unico listener: ScrollTrigger.update per sincronizzare le posizioni.
      //    Nessun altro lenis.on("scroll", ...) verrà aggiunto.
      // ─────────────────────────────────────────────────────────────────────────
      const lenis = new Lenis({
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 5),
      });
      if (typeof window !== "undefined") {
        window.lenis = lenis;
      }
      const lenisRafFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisRafFn);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      // ─────────────────────────────────────────────────────────────────────────
      // 2. ENTRANCE ANIMATIONS — al caricamento della pagina, non scroll-based.
      //    Controlla: .reveal-line (una sola volta, all'inizio).
      //    Dopo il fade-out scroll, .reveal-line è gestita esclusivamente da
      //    initHeroPin tramite gsap.set.
      // ─────────────────────────────────────────────────────────────────────────
      function initEntranceAnim() {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .fromTo(
            ".reveal-line",
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 1.4, stagger: 0.1, delay: 0.2 }
          )
          .fromTo(
            ".nav-item",
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.05 },
            "-=0.8"
          );
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 3. CANVAS SETUP — dimensionamento, rendering, preload frame.
      //    Restituisce { state, render, frameCount, cleanup } usato da initHeroPin.
      //    Se il canvas non esiste (SSR/hydration), restituisce null.
      // ─────────────────────────────────────────────────────────────────────────
      function initCanvas() {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext("2d");
        const frameCount = 109;
        const images = [];
        const state = { frame: 0 };

        const getFrameSrc = (i) =>
          `/frames/frame_${(i + 1).toString().padStart(4, "0")}.jpg`;

        const setCanvasSize = () => {
          const pr = window.devicePixelRatio || 1;
          canvas.width = window.innerWidth * pr;
          canvas.height = window.innerHeight * pr;
          canvas.style.width = `${window.innerWidth}px`;
          canvas.style.height = `${window.innerHeight}px`;
          ctx.setTransform(pr, 0, 0, pr, 0, 0);
        };

        const render = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          ctx.clearRect(0, 0, w, h);
          const img = images[state.frame];

          if (img?.complete && img.naturalWidth > 0) {
            const ia = img.naturalWidth / img.naturalHeight;
            const ca = w / h;
            let dw, dh, dx, dy;
            if (ia > ca) {
              dh = h; dw = dh * ia; dx = (w - dw) / 2; dy = 0;
            } else {
              dw = w; dh = w / ia; dx = 0; dy = (h - dh) / 2;
            }
            ctx.drawImage(img, dx, dy, dw, dh);
          } else {
            // Placeholder grid visibile finché i frame non sono caricati
            ctx.strokeStyle = "rgba(128,128,128,0.1)";
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 40) {
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let y = 0; y < h; y += 40) {
              ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }
            ctx.fillStyle = "#888888";
            ctx.font = "bold 14px var(--font-dm-mono), monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("[ SEQUENZA VIDEO 3D ]", w / 2, h / 2 - 15);
            ctx.fillStyle = "#a3a3a3";
            ctx.font = "11px var(--font-host-grotesk), sans-serif";
            ctx.fillText(
              "Inserisci frame_0001.jpg → frame_0109.jpg in public/frames/",
              w / 2,
              h / 2 + 15
            );
          }
        };

        setCanvasSize();
        render();

        // Preload tutti i frame; ogni load aggiorna il render
        for (let i = 0; i < frameCount; i++) {
          const img = new window.Image();
          img.onload = img.onerror = () => render();
          img.src = getFrameSrc(i);
          images.push(img);
        }

        const handleResize = () => {
          setCanvasSize();
          render();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return {
          state,
          render,
          frameCount,
          cleanup: () => window.removeEventListener("resize", handleResize),
        };
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 4. HERO PIN + SCROLL ANIMATION
      //    Un singolo ScrollTrigger gestisce: pin, canvas scrub, fade testo/overlay.
      //    Fonte esclusiva di controllo per: .reveal-line, overlayRef, bgImageRef.
      //    Funziona anche senza canvas (canvasData nullable).
      // ─────────────────────────────────────────────────────────────────────────
      function initHeroPin(canvasData) {
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: `+=${window.innerHeight * 2.5}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;

            // Canvas frame scrub: 0% → 90% di scroll = tutti i 109 frame
            if (canvasData) {
              canvasData.state.frame = Math.round(
                Math.min(p / 0.9, 1) * (canvasData.frameCount - 1)
              );
              canvasData.render();
            }

            // Testo hero + overlay: fade-out da 0% a 25% di scroll progress
            const textOp = p <= 0.25 ? 1 - p / 0.25 : 0;
            gsap.set(".reveal-line", { opacity: textOp, y: `${(1 - textOp) * 100}%` });
            gsap.set(overlayRef.current, { opacity: textOp });
            if (bgImageRef.current) gsap.set(bgImageRef.current, { opacity: textOp });
          },
        });
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 5. CINEMATIC FRAMES — ScrollTrigger per ogni slot immagine.
      //    Fonte ESCLUSIVA di controllo per: .cinematic-frame (rotateX, scale, opacity).
      //    Frames 1–5: entrata + uscita con rotazione 3D.
      //    Frame 6 (ultimo): SOLO entrata — non ruota mai via.
      //    Nessuna logica manuale di scroll, nessun getBoundingClientRect nel ticker.
      // ─────────────────────────────────────────────────────────────────────────
      function initCinematicFrames() {
        const frames = Array.from(document.querySelectorAll(".cinematic-frame"));
        const lastIndex = frames.length - 1;

        // Stato iniziale: inclinati e quasi invisibili (fuori schermo in basso)
        gsap.set(frames, { rotateX: 28, scale: 0.84, opacity: 0.35 });

        frames.forEach((frame, i) => {
          // Struttura DOM: .cinematic-frame → div wrapper → div slot (h-screen)
          const slot = frame.closest(".w-full.h-screen");
          if (!slot) return;

          // ENTRATA: lo slot entra dal basso → il frame si porta a stato neutro
          //   "top bottom" = il top dello slot tocca il fondo del viewport
          //   "top top"    = il top dello slot raggiunge il top del viewport
          //                  (per uno slot h-screen, il centro è al centro)
          gsap.timeline({
            scrollTrigger: {
              trigger: slot,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }).to(frame, { rotateX: 0, scale: 1, opacity: 1, ease: "none" });

          // USCITA: lo slot scorre verso l'alto — solo per frame 1–5
          //   "top top"    = inizio: slot allineato in alto
          //   "bottom top" = fine: lo slot è completamente uscito
          if (i < lastIndex) {
            gsap.timeline({
              scrollTrigger: {
                trigger: slot,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }).to(frame, { rotateX: -28, scale: 0.84, opacity: 0, ease: "none" });
          }
          // Il frame 6 resta a { rotateX: 0, scale: 1, opacity: 1 } per sempre
        });
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 6. LEFT HEADING REVEAL — una sola volta, tramite ScrollTrigger.
      //    Sostituisce il vecchio listener manuale lenis.on("scroll", revealHeading).
      //    Trigger: sezione #overview (più affidabile del pannello sticky).
      //    Dopo il reveal, rimuove gli stili inline GSAP per ripristinare CSS hover.
      // ─────────────────────────────────────────────────────────────────────────
      function initHeadingReveal() {
        const heading = document.getElementById("left-heading");
        if (!heading) return;
        const words = Array.from(heading.querySelectorAll(".left-word"));
        if (!words.length) return;

        gsap.set(words, { y: 24, opacity: 0 });

        ScrollTrigger.create({
          trigger: "#overview",
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(words, {
              y: 0,
              opacity: 1,
              color: (_, el) => el.dataset.color,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.04,
              onComplete: () => {
                // Rimuove stili inline GSAP così le hover class CSS tornano a funzionare
                gsap.set(words, { clearProps: "color,y,opacity" });
                heading.classList.add("entry-complete");
              },
            });
          },
        });
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 7. FINAL FRAME PIN + ANIMAZIONE CENTRAMENTO (solo desktop ≥ 1024px)
      //    Pinna #overview quando il fondo tocca il fondo dello schermo.
      //    Anima .last-frame-wrapper (NON .cinematic-frame) → zero conflitto
      //    con initCinematicFrames che agisce sul figlio .cinematic-frame.
      //    Controlla l'opacity di #left-heading SOLO qui su desktop.
      //    invalidateOnRefresh: true → x() ricalcolato ad ogni ScrollTrigger.refresh().
      // ─────────────────────────────────────────────────────────────────────────
      const mm = gsap.matchMedia();
      function initFinalFramePin() {
        mm.add("(min-width: 1024px)", () => {
          const overviewSection = document.getElementById("overview");
          const lastWrapper = document.querySelector(".last-frame-wrapper");
          const lastSlot = document.querySelector(".last-frame-slot");
          const leftPanel = document.getElementById("left-heading");
          const ctaSection = document.querySelector(".cta-section");
          const transformationSection = document.querySelector(".transformation-section");

          if (!overviewSection || !lastWrapper || !lastSlot || !leftPanel || !ctaSection || !transformationSection) return;

          // Stato iniziale per i layer dell'Inception Zoom (nascosti inizialmente)
          gsap.set([".zoom-layer-2", ".zoom-layer-3", ".zoom-layer-cta"], { scale: 0 });

          const pinTl = gsap.timeline();

          // Fase 1: Centra l'immagine horizontally e sfuma il testo sinistro + la didascalia dell'immagine
          pinTl
            .to([leftPanel, ".last-caption"], { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 0)
            .to(
              lastWrapper,
              {
                x: () => {
                  const rect = lastWrapper.getBoundingClientRect();
                  return window.innerWidth / 2 - (rect.left + rect.width / 2);
                },
                y: () => {
                  const slotRect = lastSlot.getBoundingClientRect();
                  const wrapperRect = lastWrapper.getBoundingClientRect();
                  const relativeTop = wrapperRect.top - slotRect.top;
                  return window.innerHeight / 2 - (relativeTop + wrapperRect.height / 2);
                },
                duration: 0.6,
                ease: "power2.inOut",
              },
              0
            )
            // Fase 2: Inception Zoom (Livelli nidificati in sequenza fortemente sovrapposta)
            // Layer 1 (Lifestyle) scala a tutto schermo
            .to(
              lastWrapper,
              {
                scale: () => {
                  const rect = lastWrapper.getBoundingClientRect();
                  const scaleX = window.innerWidth / rect.width;
                  const scaleY = window.innerHeight / rect.height;
                  return Math.max(scaleX, scaleY) * 1.05;
                },
                duration: 1.2,
                ease: "none",
              },
              0.6
            )
            // Layer 2 (t2) inizia a zoomare molto prima (solo 0.1s dopo Layer 1)
            .fromTo(
              ".zoom-layer-2",
              { scale: 0 },
              {
                scale: 2.5,
                duration: 1.2,
                ease: "none",
              },
              0.7
            )
            // Layer 3 (t3) inizia a zoomare subito dopo
            .fromTo(
              ".zoom-layer-3",
              { scale: 0 },
              {
                scale: 2.5,
                duration: 1.2,
                ease: "none",
              },
              0.8
            )
            // Layer 4 (CTA preview) inizia a zoomare subito dopo
            .fromTo(
              ".zoom-layer-cta",
              { scale: 0 },
              {
                scale: 2.5,
                duration: 1.2,
                ease: "none",
              },
              0.9
            )
            // Fase 3: Rivelazione scenica della CTA reale
            .fromTo(
              ctaSection,
              {
                scale: 0.9,
                opacity: 0,
              },
              {
                opacity: 1,
                scale: 1,
                pointerEvents: "auto",
                duration: 0.5,
                ease: "power2.out",
              },
              1.9
            )
            // Fase 4: Stagger di comparsa degli elementi della sezione Soluzioni
            .fromTo(
              [
                ctaSection.querySelector(".soluzioni-title"),
                ctaSection.querySelectorAll(".soluzione-card"),
                ctaSection.querySelector(".soluzioni-cta"),
              ],
              { y: 45, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
              },
              2.4
            )
            // Fase 5: Rivelazione della sezione Trasformazione direttamente sopra la sezione Soluzioni
            .fromTo(
              transformationSection,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                pointerEvents: "auto",
                duration: 1.0,
                ease: "power2.inOut",
              },
              3.2
            )
            // Fase 6: Nascondi la sezione Soluzioni istantaneamente subito dopo che la nuova sezione è completamente visibile
            .to(
              ctaSection,
              {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.1,
              },
              4.2
            )
            // Fase 7: Stagger di comparsa degli elementi interni della sezione Trasformazione
            .fromTo(
              [
                transformationSection.querySelector(".trans-title"),
                transformationSection.querySelector(".trans-content"),
                transformationSection.querySelector(".trans-footer"),
              ],
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              },
              3.7
            )
            // Fase 8: Scorrimento del wrapper dei contenuti della Trasformazione per mostrare le Row in verticale
            .to(
              ".trans-scroll-wrapper",
              {
                y: () => {
                  const wrapper = transformationSection.querySelector(".trans-scroll-wrapper");
                  if (!wrapper) return 0;
                  // Calcoliamo l'altezza in eccedenza rispetto al viewport
                  const overflowHeight = wrapper.scrollHeight - window.innerHeight + 120; // 120px di margine di sicurezza
                  return overflowHeight > 0 ? -overflowHeight : 0;
                },
                duration: 4.0, // Diamo un'ottima durata per rendere la discesa fluida
                ease: "none",
              },
              4.5
            )
            // Parallasse dello sfondo ottimizzato: parte traslato in basso del 10% dell'altezza dello schermo e finisce a -10% per supportare lo zoom ridotto scale-[1.2] senza bordi neri
            .fromTo(
              ".trans-bg",
              {
                y: () => window.innerHeight * 0.1
              },
              {
                y: () => -window.innerHeight * 0.1,
                duration: 4.0,
                ease: "none",
              },
              4.5
            );

          ScrollTrigger.create({
            trigger: overviewSection,
            start: "bottom bottom",
            end: "+=850%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            animation: pinTl,
            invalidateOnRefresh: true,
          });
        });
      }

      // ─── BOOTSTRAP ───────────────────────────────────────────────────────────
      initEntranceAnim();
      const canvasData = initCanvas();
      initHeroPin(canvasData);
      initCinematicFrames();
      initHeadingReveal();
      initFinalFramePin();

      // Ricalcola tutte le posizioni dopo che tutti i trigger sono registrati
      ScrollTrigger.refresh();

      // ─── CLEANUP COMPLETO ─────────────────────────────────────────────────────
      return () => {
        if (typeof window !== "undefined") {
          delete window.lenis;
        }
        mm.revert();                                          // reverte matchMedia e i suoi trigger
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        gsap.ticker.remove(lenisRafFn);
        ScrollTrigger.getAll().forEach((t) => t.kill());     // kill tutti i trigger rimasti
        canvasData?.cleanup();                                // rimuove resize listener del canvas
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col min-h-screen bg-[#faf9f5] text-[#111111] dark:bg-[#0b0b0a] dark:text-[#f5f5f4] selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-800 dark:selection:text-white"
    >
      {/* Navbar - Absolute outside hero to prevent perspective context bug */}
      <header
        ref={navRef}
        className="absolute top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between z-[100] transition-all duration-300 ease-out"
      >
        {/* Link sinistri */}
        <nav className="hidden md:flex items-center gap-8 font-dm text-[11px] font-medium tracking-widest text-white/70">
          {[
            { label: "HOME", target: "hero" },
            { label: "IL METODO", target: "overview" },
            { label: "SOLUZIONI", target: "solutions" },
            { label: "PRIMA / DOPO", target: "transformation" },
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.target}`}
              onClick={(e) => scrollToSection(e, item.target)}
              className="nav-item relative group py-1 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Logo centrato */}
        <div
          onClick={(e) => scrollToSection(e, "hero")}
          className="nav-item flex items-center mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer group"
        >
          <Image
            src="/img/logo-aquilani-pronto-pools.webp"
            alt="Aquilani Pronto Pools"
            width={230}
            height={64}
            className="h-[50px] md:h-[54px] w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
            priority
            unoptimized
          />
        </div>

        {/* CTA a destra */}
        <div className="flex items-center gap-3 font-dm">
          <a
            href="#demo"
            onClick={(e) => scrollToSection(e, "demo")}
            className="nav-item text-[11px] font-semibold tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors rounded-md px-5 py-2.5 uppercase text-center"
          >
            Live Demo
          </a>
          <a
            href="#get-started"
            onClick={(e) => scrollToSection(e, "get-started")}
            className="nav-item text-[11px] font-semibold tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors rounded-md px-5 py-2.5 uppercase text-center"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* ── HERO: fullscreen pinnata ── */}
      <div
        id="hero"
        className="hero relative w-full h-screen overflow-hidden z-10"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {/* Canvas: sequenza frame video */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

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
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/35 z-10 pointer-events-none"
        />

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
              <span className="reveal-line block">
                La tua piscina pronta in 5 giorni.
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* ── SEZIONE 2: scroll cinematico ── */}
      <section id="overview" className="relative z-20 w-full bg-[#f8f7f3]">
        <div className="relative flex flex-col lg:flex-row items-start max-w-[1600px] mx-auto">

          <div className="hidden lg:flex lg:w-[40%] sticky top-0 h-screen items-center px-12 xl:px-20">
            <div className="flex flex-col items-start text-left max-w-[450px]">
              <h2
                id="left-heading"
                className="font-host font-bold text-5xl leading-[1.25] tracking-tight text-[#3C3B4D] cursor-default select-none"
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
            className="w-full lg:w-[60%] flex flex-col relative"
            style={{ perspective: "1000px", perspectiveOrigin: "center center" }}
          >
            <div className="lg:hidden px-6 pb-10 flex flex-col gap-4">
              <h2 className="font-host font-medium text-2xl leading-[1.2] tracking-tight text-neutral-900">
                Dal progetto alla piscina pronta,
                senza cantieri infiniti.
              </h2>
            </div>

            {[
              { src: "/img/pool_01_garden.jpg", alt: "Giardino elegante prima della piscina", caption: "Analisi dello spazio" },
              { src: "/img/pool_02_structure.jpg", alt: "Struttura piscina in costruzione", caption: "Montaggio struttura modulare" },
              { src: "/img/pool_05_details.jpg", alt: "Dettagli architettonici acqua e finiture", caption: "Rivestimento e solarium" },
              { src: "/img/pool_06_lifestyle.jpg", alt: "Atmosfera lifestyle piscina di lusso", caption: "Piscina pronta all’uso" },
            ].map(({ src, alt, caption }, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <div
                  key={i}
                  className={`w-full h-screen flex items-center px-4 md:px-6 ${isLast ? "last-frame-slot" : ""
                    }`}
                >
                  <div className="cinematic-frame w-full flex flex-col gap-3">
                    <div
                      className={`w-full ${isLast ? "last-frame-wrapper" : ""
                        }`}
                    >
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ height: "52vh" }}
                      >
                        {!isLast ? (
                          <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 60vw"
                            unoptimized
                          />
                        ) : (
                          <>
                            {/* Layer 1: pool_06_lifestyle.jpg */}
                            <Image
                              src={src}
                              alt={alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 60vw"
                              unoptimized
                            />

                            {/* Layer 2: foto-t2.jpg */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="zoom-layer-2 w-[40%] h-[40%] relative overflow-hidden flex items-center justify-center">
                                <Image
                                  src="/img/foto-t2.jpg"
                                  alt="Second Inception Step"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />

                                {/* Layer 3: foto-t3.jpg */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="zoom-layer-3 w-[40%] h-[40%] relative overflow-hidden flex items-center justify-center">
                                    <Image
                                      src="/img/foto-t3.jpg"
                                      alt="Third Inception Step"
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />

                                    {/* Layer 4: cta preview */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="zoom-layer-cta w-[40%] h-[40%] relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center select-none">
                                        <Image
                                          src="/img/bg_soluzioni.png"
                                          alt="Solutions Background Preview"
                                          fill
                                          className="object-cover opacity-40"
                                          unoptimized
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

      {/* ── SEZIONE 3: Soluzioni ── */}
      <section
        id="solutions"
        className="cta-section flex flex-col items-center justify-center py-16 lg:py-0 px-6 md:px-12 z-20 relative lg:fixed lg:inset-0 lg:w-screen lg:h-screen lg:opacity-0 lg:pointer-events-none lg:z-50 overflow-hidden"
        style={{
          backgroundColor: "#050505",
          color: "#f5f3ef"
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

        <div className="max-w-[1200px] w-full flex flex-col items-center gap-6 lg:gap-8 relative z-10">
          {/* Header Soluzioni */}
          <div className="text-center flex flex-col gap-2">
            <h2 className="soluzioni-title font-semibold tracking-tight text-white leading-[1.05]" style={{ fontSize: "clamp(30px, 4.5vw, 44px)" }}>
              Scegli la soluzione più adatta al tuo spazio
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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
                className="soluzione-card relative flex flex-col justify-between min-h-[340px] lg:min-h-[340px] lg:h-[340px] rounded-[24px] border border-white/10 overflow-hidden group"
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
                <div className="pt-10 pb-6 px-6 flex flex-col items-center justify-start h-full text-center relative z-30">
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="font-host font-semibold text-[17px] leading-tight text-[#f5f3ef] transition-colors duration-300 group-hover:text-white">
                      {card.title}
                    </h3>
                    <p className="font-host text-[12px] leading-relaxed text-[#c0c0c5] max-w-[24ch] transition-colors duration-300 group-hover:text-white/95">
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
              SCOPRI DI PIÙ <span className="transform translate-x-0 group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SEZIONE 4: Prima / Dopo (Dal progetto alla realtà) ── */}
      <section
        id="transformation"
        className="transformation-section flex flex-col items-center justify-start py-16 lg:pt-24 lg:pb-16 px-6 md:px-12 z-20 relative lg:fixed lg:inset-0 lg:w-screen lg:h-screen lg:opacity-0 lg:pointer-events-none lg:z-50 overflow-hidden bg-[#0a0a0a] text-white"
      >
        {/* Immagine di sfondo materica per la sezione */}
        <img
          src="/img/bg_trasformazione_new.png"
          alt="Trasformazione Background"
          className="trans-bg absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none select-none object-center scale-[1.2]"
        />
        {/* Overlay scuro ridotto per valorizzare lo sfondo e garantire la leggibilità del testo */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 pointer-events-none" />

        <div className="trans-scroll-wrapper max-w-[1200px] w-full flex flex-col gap-6 lg:gap-10 relative z-10">
          {/* Header Editoriale Massive Fullwidth */}
          <div className="w-full text-center trans-title  md: select-none flex flex-col items-center justify-center">
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
                  <div className={`lg:col-span-5 text-left flex flex-col gap-2 ${isEven ? "lg:order-1" : ""}`}>
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
        </div>
      </section>
    </div>
  );
}
