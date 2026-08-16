import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/White_logo_With_Transparent_Backgrund_1782379235056.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

/**
 * Single shared transition for the active pill.
 * Critically-damped spring => smooth, premium, NO overshoot / NO bounce.
 * Critical damping for (stiffness=400, mass=1) is 2*sqrt(400*1) = 40,
 * so damping=40 is exactly critically damped.
 */
const pillTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 40,
  mass: 1,
};

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4" role="banner">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`flex items-center gap-1 rounded-full transition-all duration-500 ${
            isScrolled
              ? "bg-[#0b0b18]/95 backdrop-blur-2xl border border-white/[0.13] shadow-[0_8px_48px_rgba(0,0,0,0.65)] pl-3 pr-2 py-1.5"
              : "bg-[#0d0d20]/72 backdrop-blur-xl border border-white/[0.09] pl-3 pr-2 py-1.5"
          }`}
          aria-label="Main navigation"
          role="navigation"
        >
          <Link href="/" onClick={scrollTop} aria-label="Route 2 Migrate — Home">
            <motion.img
              src={logoPath}
              alt="Route 2 Migrate"
              className="h-11 w-auto cursor-pointer mr-2"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </Link>

          <div className="hidden lg:block w-px h-5 bg-white/12 mx-1" aria-hidden="true" />

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={scrollTop}
                  aria-current={isActive ? "page" : undefined}
                >
                  <motion.span
                    className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full cursor-pointer block whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white hover:bg-white/6"
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/*
                      The active pill + red dot are now ONE element.
                      The red dot is a static child of the pill, so when the pill
                      animates via layoutId, the dot rides along — no independent motion.
                    */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white/12"
                        transition={pillTransition}
                      >
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      </motion.span>
                    )}

                    <span className="relative z-10">{link.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block w-px h-5 bg-white/12 mx-1" aria-hidden="true" />

          <div className="hidden lg:flex items-center gap-1.5">
            <a
              href="tel:+8801896060702"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors duration-200 px-2.5 py-1.5 rounded-full hover:bg-white/5"
              aria-label="Call Route 2 Migrate: +8801896060702"
            >
              <Phone className="h-3 w-3 text-primary shrink-0" aria-hidden="true" />
              <span>+8801896060702</span>
            </a>
            <a
              href="https://riffathmohaimen.setmore.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a free consultation via Calendly"
            >
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-9 text-xs font-semibold transition-all duration-300 hover:scale-105 glow-primary-sm">
                Book Consultation
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden p-2 ml-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#08080f]/97 backdrop-blur-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-8 pt-24 pb-8 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                >
                  <Link href={link.href} onClick={scrollTop}>
                    <span
                      className={`text-4xl font-serif font-bold block py-3 text-center cursor-pointer transition-colors duration-200 ${
                        location === link.href ? "text-primary" : "text-white hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.05, duration: 0.4 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <a
                  href="tel:+8801896060702"
                  className="text-white/60 text-base hover:text-white transition-colors flex items-center gap-2"
                  aria-label="Call +8801896060702"
                >
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  +8801896060702
                </a>
                <a
                  href="https://riffathmohaimen.setmore.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a free consultation via Calendly"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg font-semibold mt-2">
                    Book Consultation
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}