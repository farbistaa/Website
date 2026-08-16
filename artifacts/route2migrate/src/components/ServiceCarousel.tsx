import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  title: string;
  short: string;
  desc: string;
  points: string[];
  badge: string;
  color: string;
  bg: string;
}

interface ServiceCarouselProps {
  services: Service[];
}

const SLIDE_DURATION = 5000;

export function ServiceCarousel({ services }: ServiceCarouselProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = services.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setActive(((next % total) + total) % total);
    },
    [total]
  );

  const prev = () => go(active - 1, -1);
  const next = () => go(active + 1, 1);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(active + 1, 1), SLIDE_DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active, paused, go]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }),
  };

  const svc = services[active];
  const Icon = svc.icon;

  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Services carousel"
      aria-roledescription="carousel"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[440px]">
        {/* LEFT — visual panel */}
        <div className={`lg:col-span-2 ${svc.bg} relative flex flex-col items-center justify-center p-10 overflow-hidden`}>
          <div className="absolute inset-0 opacity-10" aria-hidden="true" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")"
          }} />
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center text-center relative z-10"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 shadow-xl">
                <Icon className="h-12 w-12 text-white" aria-hidden="true" />
              </div>
              <span className="text-white/70 text-xs font-semibold uppercase tracking-[0.2em] mb-2">{svc.badge}</span>
              <h3 className="text-2xl font-serif font-bold text-white leading-tight">{svc.title}</h3>
              <p className="text-white/70 text-sm mt-2 max-w-[200px]">{svc.short}</p>
            </motion.div>
          </AnimatePresence>

          {/* Slide number */}
          <div className="absolute bottom-5 left-5 text-white/40 text-xs font-mono">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* RIGHT — content */}
        <div className="lg:col-span-3 flex flex-col justify-between p-8 lg:p-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1"
            >
              <p className="text-gray-600 leading-relaxed mb-6 text-base">{svc.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {svc.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className={`w-5 h-5 rounded-full ${svc.color} flex items-center justify-center shrink-0 mt-0.5`} aria-hidden="true">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-600 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
            <a
              href="https://riffathmohaimen.setmore.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book a consultation for ${svc.title}`}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10 text-sm glow-primary-sm">
                Book Consultation <ArrowRight aria-hidden="true" />
              </Button>
            </a>
            <Link href="/services" aria-label="View all services">
              <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                View all services <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 right-5 flex items-center gap-2" role="group" aria-label="Carousel navigation">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary flex items-center justify-center transition-all shadow-sm"
          aria-label="Previous service"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary flex items-center justify-center transition-all shadow-sm"
          aria-label="Next service"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute top-5 right-5 flex items-center gap-1.5" role="tablist" aria-label="Service slides">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > active ? 1 : -1)}
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}: ${services[i].title}`}
            className={`transition-all duration-300 rounded-full ${i === active ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100" aria-hidden="true">
          <motion.div
            key={active}
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}
