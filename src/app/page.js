"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Import modular components
import Header from "../components/Header";
import Hero from "../components/Hero";
import Overview from "../components/Overview";
import Solutions from "../components/Solutions";
import Transformation from "../components/Transformation";
import MethodModal from "../components/MethodModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const canvasRef = useRef(null);
  const bgImageRef = useRef(null);
  const overlayRef = useRef(null);

  const [scrolled, setScrolled] = React.useState(false);
  const [headerTheme, setHeaderTheme] = React.useState("dark");
  const [isMethodModalOpen, setIsMethodModalOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      // Il pin della hero dura 2.5 * h, quindi passiamo la hero dopo questa soglia
      if (window.scrollY > heroHeight * 2.5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Inizializza al caricamento
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMethodModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.lenis?.start();
    };
  }, [isMethodModalOpen, isMobileMenuOpen]);

  const scrollToSection = (e, sectionName) => {
    if (e) e.preventDefault();
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    const h = window.innerHeight;

    if (isDesktop && window.lenis) {
      if (sectionName === "contact" || sectionName === "get-started") {
        window.lenis.scrollTo("bottom", { duration: 1.5 });
        return;
      }

      let targetScroll = 0;
      if (sectionName === "hero" || sectionName === "home") {
        targetScroll = 0;
      } else if (sectionName === "overview") {
        targetScroll = 3.5 * h;
      } else if (sectionName === "solutions") {
        targetScroll = 9.4 * h;
      } else if (
        sectionName === "transformation" ||
        sectionName === "demo"
      ) {
        targetScroll = 11.0 * h;
      }
      window.lenis.scrollTo(targetScroll, { duration: 1.5 });
    } else {
      let targetId = sectionName;
      if (sectionName === "home") targetId = "hero";
      if (sectionName === "demo") {
        targetId = "transformation";
      } else if (sectionName === "contact" || sectionName === "get-started") {
        targetId = "contact";
      }
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
      // 1. LENIS — smooth scroll only (desktop only to prevent mobile lag).
      // ─────────────────────────────────────────────────────────────────────────
      let lenis = null;
      let lenisRafFn = null;

      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

      if (isDesktop) {
        lenis = new Lenis({
          duration: 1.8,
          easing: (t) => 1 - Math.pow(1 - t, 5),
        });
        if (typeof window !== "undefined") {
          window.lenis = lenis;
        }
        lenisRafFn = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisRafFn);
        gsap.ticker.lagSmoothing(0);
        lenis.on("scroll", ScrollTrigger.update);
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 2. ENTRANCE ANIMATIONS — al caricamento della pagina.
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
      // ─────────────────────────────────────────────────────────────────────────
      function initCanvas() {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext("2d");
        let isMobile = window.innerWidth < 1024;
        let frameCount = isMobile ? 111 : 114;
        let images = [];
        const state = { frame: 0 };

        const getFrameSrc = (i) => {
          if (isMobile) {
            return `/frames_mobile/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.png`;
          } else {
            return `/frames_pc/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.png`;
          }
        };

        const setCanvasSize = () => {
          const pr = window.devicePixelRatio || 1;
          const isMobileViewport = window.innerWidth < 1024;
          
          canvas.width = window.innerWidth * pr;
          // Use screen height on mobile to ensure the buffer is large enough for address bar collapse
          canvas.height = (isMobileViewport ? Math.max(window.innerHeight, window.screen.height) : window.innerHeight) * pr;
          
          // Clear inline styles so absolute inset-0 w-full h-full CSS classes handle layout size
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
          
          ctx.setTransform(pr, 0, 0, pr, 0, 0);
        };

        const render = () => {
          const pr = window.devicePixelRatio || 1;
          const w = canvas.width / pr;
          const h = canvas.height / pr;
          ctx.clearRect(0, 0, w, h);
          const img = images[state.frame];

          if (img?.complete && img.naturalWidth > 0) {
            const ia = img.naturalWidth / img.naturalHeight;
            const ca = w / h;
            let dw, dh, dx, dy;
            if (ia > ca) {
              dh = h;
              dw = dh * ia;
              dx = (w - dw) / 2;
              dy = 0;
            } else {
              dw = w;
              dh = w / ia;
              dx = 0;
              dy = (h - dh) / 2;
            }
            ctx.drawImage(img, dx, dy, dw, dh);
          } else {
            // Placeholder grid visibile finché i frame non sono caricati
            ctx.strokeStyle = "rgba(128,128,128,0.1)";
            ctx.lineWidth = 1;
            for (let x = 0; x < w; x += 40) {
              ctx.beginPath();
              ctx.moveTo(x, 0);
              ctx.lineTo(x, h);
              ctx.stroke();
            }
            for (let y = 0; y < h; y += 40) {
              ctx.beginPath();
              ctx.moveTo(0, y);
              ctx.lineTo(w, y);
              ctx.stroke();
            }
            ctx.fillStyle = "#888888";
            ctx.font = "bold 14px var(--font-dm-mono), monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("[ SEQUENZA VIDEO 3D ]", w / 2, h / 2 - 15);
            ctx.fillStyle = "#a3a3a3";
            ctx.font = "11px var(--font-host-grotesk), sans-serif";
            ctx.fillText(
              isMobile
                ? "Caricamento sequenza mobile in corso..."
                : "Caricamento sequenza desktop in corso...",
              w / 2,
              h / 2 + 15
            );
          }
        };

        const preloadImages = () => {
          images = [];
          for (let i = 0; i < frameCount; i++) {
            const img = new window.Image();
            img.onload = img.onerror = () => render();
            img.src = getFrameSrc(i);
            images.push(img);
          }
        };

        setCanvasSize();
        preloadImages();
        render();

        let lastWidth = window.innerWidth;
        const handleResize = () => {
          const currentIsMobile = window.innerWidth < 1024;
          
          if (currentIsMobile !== isMobile) {
            isMobile = currentIsMobile;
            frameCount = isMobile ? 111 : 114;
            preloadImages();
          }

          if (currentIsMobile && window.innerWidth === lastWidth) {
            return;
          }

          lastWidth = window.innerWidth;
          setCanvasSize();
          render();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return {
          state,
          render,
          get frameCount() {
            return frameCount;
          },
          cleanup: () => window.removeEventListener("resize", handleResize),
        };
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 4. HERO PIN + SCROLL ANIMATION
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

            if (canvasData) {
              canvasData.state.frame = Math.round(
                Math.min(p / 0.9, 1) * (canvasData.frameCount - 1)
              );
              canvasData.render();
            }

            const textOp = p <= 0.25 ? 1 - p / 0.25 : 0;
            gsap.set(".reveal-line", { opacity: textOp, y: `${(1 - textOp) * 100}%` });
            gsap.set(overlayRef.current, { opacity: textOp });
            if (bgImageRef.current) gsap.set(bgImageRef.current, { opacity: textOp });
          },
        });
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 5. CINEMATIC FRAMES
      // ─────────────────────────────────────────────────────────────────────────
      function initCinematicFrames() {
        const frames = Array.from(document.querySelectorAll(".cinematic-frame"));
        const lastIndex = frames.length - 1;

        gsap.set(frames, { rotateX: 28, scale: 0.84, opacity: 0.35 });

        frames.forEach((frame, i) => {
          const slot = frame.parentElement;
          if (!slot) return;

          gsap.timeline({
            scrollTrigger: {
              trigger: slot,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }).to(frame, { rotateX: 0, scale: 1, opacity: 1, ease: "none" });

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
        });
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 6. LEFT HEADING REVEAL
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
                gsap.set(words, { clearProps: "color,y,opacity" });
                heading.classList.add("entry-complete");
              },
            });
          },
        });
      }

      // ─────────────────────────────────────────────────────────────────────────
      // 7. FINAL FRAME PIN + ANIMAZIONE CENTRAMENTO (desktop & mobile matchMedia)
      // ─────────────────────────────────────────────────────────────────────────
      const mm = gsap.matchMedia();
      function initFinalFramePin() {
        const overviewSection = document.getElementById("overview");
        const lastWrapper = document.querySelector(".last-frame-wrapper");
        const lastSlot = document.querySelector(".last-frame-slot");
        const leftPanel = document.getElementById("left-heading");
        const ctaSection = document.querySelector(".cta-section");
        const transformationSection = document.querySelector(".transformation-section");

        if (
          !overviewSection ||
          !lastWrapper ||
          !lastSlot ||
          !leftPanel ||
          !ctaSection ||
          !transformationSection
        )
          return;

        gsap.set([".zoom-layer-2", ".zoom-layer-3", ".zoom-layer-cta"], { scale: 0 });

        // DESKTOP: Vertical Pin Timeline
        mm.add("(min-width: 1024px)", () => {
          initCinematicFrames();

          const pinTl = gsap.timeline();

          pinTl
            .call(
              () => {
                const time = pinTl.time();
                setHeaderTheme(time < 1.2 ? "light" : "dark");
              },
              null,
              0
            )
            .call(
              () => {
                const time = pinTl.time();
                setHeaderTheme(time < 1.2 ? "light" : "dark");
              },
              null,
              1.2
            )
            .to(
              [leftPanel, ".last-caption"],
              { opacity: 0, duration: 0.4, ease: "power2.inOut" },
              0
            )
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
            .fromTo(
              ".zoom-layer-2",
              { scale: 0 },
              { scale: 2.5, duration: 1.2, ease: "none" },
              0.7
            )
            .fromTo(
              ".zoom-layer-3",
              { scale: 0 },
              { scale: 2.5, duration: 1.2, ease: "none" },
              0.8
            )
            .fromTo(
              ".zoom-layer-cta",
              { scale: 0 },
              { scale: 2.5, duration: 1.2, ease: "none" },
              0.9
            )
            .fromTo(
              ctaSection,
              { scale: 0.9, opacity: 0 },
              { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" },
              1.9
            )
            .fromTo(
              [
                ctaSection.querySelector(".soluzioni-title"),
                ctaSection.querySelectorAll(".soluzione-card"),
                ctaSection.querySelector(".soluzioni-cta"),
              ],
              { y: 45, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
              2.4
            )
            .fromTo(
              transformationSection,
              { opacity: 0 },
              { opacity: 1, pointerEvents: "auto", duration: 1.0, ease: "power2.inOut" },
              3.2
            )
            .to(ctaSection, { opacity: 0, pointerEvents: "none", duration: 0.1 }, 4.2)
            .fromTo(
              [
                transformationSection.querySelector(".trans-title"),
                transformationSection.querySelector(".trans-content"),
                transformationSection.querySelector(".trans-footer"),
              ],
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
              3.7
            )
            .to(
              ".trans-scroll-wrapper",
              {
                y: () => {
                  const wrapper = transformationSection.querySelector(".trans-scroll-wrapper");
                  if (!wrapper) return 0;
                  const overflowHeight = wrapper.scrollHeight - window.innerHeight;
                  return overflowHeight > 0 ? -overflowHeight : 0;
                },
                duration: 4.0,
                ease: "none",
              },
              4.5
            )
            .fromTo(
              ".trans-bg",
              { y: () => window.innerHeight * 0.15 },
              { y: () => -window.innerHeight * 0.15, duration: 4.0, ease: "none" },
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

        // MOBILE: Horizontal Pin & Scroll Timeline
        mm.add("(max-width: 1023px)", () => {
          const pinTl = gsap.timeline();
          const frames = Array.from(document.querySelectorAll(".cinematic-frame"));

          // Mobile initial rotated frame states
          gsap.set(frames, { rotateX: 18, scale: 0.9, opacity: 0.6 });
          gsap.set(frames[0], { rotateX: 0, scale: 1, opacity: 1 });

          pinTl
            .call(() => {
              const time = pinTl.time();
              setHeaderTheme(time < 7.2 ? "light" : "dark");
            }, null, 0)
            .call(() => {
              const time = pinTl.time();
              setHeaderTheme(time < 7.2 ? "light" : "dark");
            }, null, 7.2)
            .to(".mobile-horizontal-track", {
              x: () => {
                const track = document.querySelector(".mobile-horizontal-track");
                return track ? -(track.offsetWidth * 3) : -(window.innerWidth * 3);
              },
              ease: "none",
              duration: 4.0,
            }, 0)
            // Frame 2 active
            .to(frames[1], { rotateX: 0, scale: 1, opacity: 1, duration: 0.8 }, 0.8)
            .to(frames[0], { rotateX: -18, scale: 0.9, opacity: 0.6, duration: 0.8 }, 0.8)
            // Frame 3 active
            .to(frames[2], { rotateX: 0, scale: 1, opacity: 1, duration: 0.8 }, 2.0)
            .to(frames[1], { rotateX: -18, scale: 0.9, opacity: 0.6, duration: 0.8 }, 2.0)
            // Frame 4 active
            .to(frames[3], { rotateX: 0, scale: 1, opacity: 1, duration: 0.8 }, 3.2)
            .to(frames[2], { rotateX: -18, scale: 0.9, opacity: 0.6, duration: 0.8 }, 3.2)

            // Fade out left text panel and captions
            .to(
              [leftPanel, ".last-caption"],
              { opacity: 0, duration: 0.8, ease: "power2.inOut" },
              3.2
            )

            // Centering last wrapper visually onto mobile screen center
            .to(
              lastWrapper,
              {
                x: 0,
                y: () => {
                  const rect = lastWrapper.getBoundingClientRect();
                  return window.innerHeight / 2 - (rect.top + rect.height / 2);
                },
                duration: 1.0,
                ease: "power2.inOut",
              },
              4.0
            )
            // Scale last wrapper zoom
            .to(
              lastWrapper,
              {
                scale: () => {
                  const rect = lastWrapper.getBoundingClientRect();
                  const scaleX = window.innerWidth / rect.width;
                  const scaleY = window.innerHeight / rect.height;
                  return Math.max(scaleX, scaleY) * 1.05;
                },
                duration: 2.0,
                ease: "none",
              },
              5.0
            )
            .fromTo(
              ".zoom-layer-2",
              { scale: 0 },
              { scale: 2.5, duration: 1.8, ease: "none" },
              5.2
            )
            .fromTo(
              ".zoom-layer-3",
              { scale: 0 },
              { scale: 2.5, duration: 1.6, ease: "none" },
              5.4
            )
            .fromTo(
              ".zoom-layer-cta",
              { scale: 0 },
              { scale: 2.5, duration: 1.4, ease: "none" },
              5.6
            )
            // Solutions Section
            .fromTo(
              ctaSection,
              { scale: 0.9, opacity: 0 },
              { opacity: 1, scale: 1, pointerEvents: "auto", duration: 0.8, ease: "power2.out" },
              7.2
            )
            .fromTo(
              [
                ctaSection.querySelector(".soluzioni-title"),
                ctaSection.querySelectorAll(".soluzione-card"),
                ctaSection.querySelector(".soluzioni-cta"),
              ],
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power3.out" },
              7.8
            )
            .to(
              ".soluzioni-scroll-wrapper",
              {
                y: () => {
                  const wrapper = ctaSection.querySelector(".soluzioni-scroll-wrapper");
                  if (!wrapper) return 0;
                  const overflowHeight = wrapper.scrollHeight - window.innerHeight;
                  return overflowHeight > 0 ? -overflowHeight - 120 : 0;
                },
                duration: 3.0,
                ease: "none",
              },
              8.4
            )
            // Transformation Section
            .fromTo(
              transformationSection,
              { opacity: 0 },
              { opacity: 1, pointerEvents: "auto", duration: 1.2, ease: "power2.inOut" },
              11.8
            )
            .to(ctaSection, { opacity: 0, pointerEvents: "none", duration: 0.5 }, 12.5)
            .fromTo(
              [
                transformationSection.querySelector(".trans-title"),
                transformationSection.querySelector(".trans-content"),
                transformationSection.querySelector(".trans-footer"),
              ],
              { y: 25, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.2, stagger: 0.18, ease: "power3.out" },
              12.2
            )
            .to(
              ".trans-scroll-wrapper",
              {
                y: () => {
                  const wrapper = transformationSection.querySelector(".trans-scroll-wrapper");
                  if (!wrapper) return 0;
                  const overflowHeight = wrapper.scrollHeight - window.innerHeight;
                  return overflowHeight > 0 ? -overflowHeight : 0;
                },
                duration: 5.0,
                ease: "none",
              },
              13.0
            )
            .fromTo(
              ".trans-bg",
              { y: () => window.innerHeight * 0.15 },
              { y: () => -window.innerHeight * 0.15, duration: 5.0, ease: "none" },
              13.0
            );

          ScrollTrigger.create({
            trigger: overviewSection,
            start: "top top",
            end: "+=1800%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            animation: pinTl,
            invalidateOnRefresh: true,
          });
        });

        // Theme scroll trigger
        ScrollTrigger.create({
          trigger: overviewSection,
          start: "top 60px",
          end: "bottom bottom",
          onEnter: () => setHeaderTheme("light"),
          onEnterBack: () => setHeaderTheme("light"),
          onLeaveBack: () => setHeaderTheme("dark"),
        });
      }

      // ─── BOOTSTRAP ───────────────────────────────────────────────────────────
      initEntranceAnim();
      const canvasData = initCanvas();
      initHeroPin(canvasData);
      initHeadingReveal();
      initFinalFramePin();

      // Ricalcola tutte le posizioni dopo che tutti i trigger sono registrati
      ScrollTrigger.refresh();

      // ─── CLEANUP COMPLETO ─────────────────────────────────────────────────────
      return () => {
        if (typeof window !== "undefined") {
          delete window.lenis;
        }
        mm.revert(); // reverte matchMedia e i suoi trigger
        if (lenis) {
          lenis.off("scroll", ScrollTrigger.update);
          lenis.destroy();
        }
        if (lenisRafFn) {
          gsap.ticker.remove(lenisRafFn);
        }
        ScrollTrigger.getAll().forEach((t) => t.kill()); // kill tutti i trigger rimasti
        canvasData?.cleanup(); // rimuove resize listener del canvas
      };
    },
    { scope: containerRef }
  );

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex flex-col min-h-screen bg-[#faf9f5] text-[#111111] dark:bg-[#0b0b0a] dark:text-[#f5f5f4] selection:bg-neutral-200 selection:text-black dark:selection:bg-neutral-800 dark:selection:text-white"
      >
        <Header
          scrolled={scrolled}
          headerTheme={headerTheme}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          scrollToSection={scrollToSection}
        />
        <Hero
          canvasRef={canvasRef}
          bgImageRef={bgImageRef}
          overlayRef={overlayRef}
          heroTextRef={heroTextRef}
        />
        <Overview />
        <Solutions scrollToSection={scrollToSection} />
        <Transformation
          setIsMethodModalOpen={setIsMethodModalOpen}
          scrollToSection={scrollToSection}
        />
      </div>

      <MethodModal
        isMethodModalOpen={isMethodModalOpen}
        setIsMethodModalOpen={setIsMethodModalOpen}
      />
    </>
  );
}
