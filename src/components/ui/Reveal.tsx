"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" };

/** Мягкое появление блока при прокрутке */
export function Reveal({ delay = 0, y = 24, as = "div", children, ...rest }: RevealProps) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(rest as HTMLMotionProps<"div"> & HTMLMotionProps<"li">)}
    >
      {children}
    </Comp>
  );
}
