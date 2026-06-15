import React from "react";
import Image from "next/image";

export default function Header({
  scrolled,
  headerTheme,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  scrollToSection,
}) {
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between z-[100] transition-all duration-500 ease-out ${
          scrolled ? "scrolled" : ""
        }`}
      >
        {/* Hamburger menu button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[110] relative focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${
              isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
            } ${
              isMobileMenuOpen || headerTheme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
          <span
            className={`w-6 h-0.5 mb-1.5 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            } ${
              isMobileMenuOpen || headerTheme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
          <span
            className={`w-6 h-0.5 transition-all duration-300 ${
              isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
            } ${
              isMobileMenuOpen || headerTheme === "dark" ? "bg-white" : "bg-black"
            }`}
          />
        </button>

        {/* Link sinistri */}
        <nav className="hidden md:flex items-center gap-8 font-dm text-[11px] font-medium tracking-widest transition-colors duration-500">
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
              className={`nav-item relative group py-1 transition-colors duration-500 ${
                headerTheme === "light"
                  ? "text-black/70 hover:text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                  headerTheme === "light" ? "bg-black" : "bg-white"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Logo centrato */}
        <div
          onClick={(e) => scrollToSection(e, "hero")}
          className="nav-item flex items-center absolute left-1/2 -translate-x-1/2 cursor-pointer group z-[110]"
        >
          <Image
            src="/img/logo-aquilani-pronto-pools.webp"
            alt="Aquilani Pronto Pools"
            width={230}
            height={64}
            className={`h-[50px] md:h-[54px] w-auto object-contain transition-all duration-500 group-hover:scale-105 ${
              isMobileMenuOpen || headerTheme === "dark" ? "brightness-0 invert" : "brightness-0"
            }`}
            priority
            unoptimized
          />
        </div>

        {/* CTA a destra */}
        <div className="hidden md:flex items-center gap-3 font-dm z-[110]">
          <a
            href="#demo"
            onClick={(e) => scrollToSection(e, "demo")}
            className={`nav-item text-[11px] font-semibold tracking-wider transition-colors duration-500 rounded-md px-5 py-2.5 uppercase text-center border hidden sm:inline-block ${
              headerTheme === "light"
                ? "text-black bg-black/5 border-black/20 hover:bg-black/15"
                : "text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
            }`}
          >
            Live Demo
          </a>
          <a
            href="#get-started"
            onClick={(e) => scrollToSection(e, "get-started")}
            className={`nav-item text-[11px] font-semibold tracking-wider transition-colors duration-500 rounded-md px-5 py-2.5 uppercase text-center ${
              headerTheme === "light"
                ? "text-white bg-black hover:bg-neutral-800"
                : "text-black bg-white hover:bg-neutral-200"
            }`}
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[99] flex flex-col justify-center items-center transition-all duration-500 animate-fadeIn md:hidden">
          <nav className="flex flex-col items-center gap-8 font-dm text-lg font-medium tracking-widest text-white">
            {[
              { label: "HOME", target: "hero" },
              { label: "IL METODO", target: "overview" },
              { label: "SOLUZIONI", target: "solutions" },
              { label: "PRIMA / DOPO", target: "transformation" },
            ].map((item, idx) => (
              <a
                key={item.label}
                href={`#${item.target}`}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  scrollToSection(e, item.target);
                }}
                className="hover:text-neutral-400 transition-colors uppercase py-2 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
            <div
              className="flex flex-col gap-4 mt-8 w-48 font-dm text-[11px] font-semibold tracking-wider uppercase text-center animate-fadeIn"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="#demo"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  scrollToSection(e, "demo");
                }}
                className="text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-md py-3 px-6"
              >
                Live Demo
              </a>
              <a
                href="#get-started"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  scrollToSection(e, "get-started");
                }}
                className="text-black bg-white hover:bg-neutral-200 rounded-md py-3 px-6"
              >
                Get Started
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
