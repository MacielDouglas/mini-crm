"use client";

import { useEffect, useRef } from "react";
import { useAnimation, useInView } from "motion/react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  return { ref, controls };
}
