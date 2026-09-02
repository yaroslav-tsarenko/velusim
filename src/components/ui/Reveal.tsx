"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** 1–6, staggers the animation delay */
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "div" | "li" | "article" | "section";
}

/**
 * Fades content up when it scrolls into view. Content is never left hidden:
 * if IntersectionObserver is unavailable, the viewer prefers reduced motion,
 * or the observer has not fired within a second, the element is simply shown.
 */
export function Reveal({ children, className, delay, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);

    // Safety net — never leave content invisible if the observer never fires.
    const timer = window.setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 1000);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      data-delay={delay}
      className={cn(shown ? "animate-fade-up" : "opacity-0", className)}
    >
      {children}
    </Tag>
  );
}
