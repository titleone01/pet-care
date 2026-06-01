"use client";

import { createElement, type ElementType, type HTMLAttributes, type PropsWithChildren } from "react";
import { useReveal } from "@/components/useReveal";

type RevealOnScrollProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    as?: ElementType;
  }
>;

export function RevealOnScroll({
  as: Component = "div",
  className,
  children,
  ...props
}: RevealOnScrollProps) {
  const ref = useReveal<HTMLElement>();
  const classes = className ? `${className} reveal` : "reveal";

  return createElement(
    Component,
    {
      ...props,
      ref,
      className: classes
    },
    children
  );
}
