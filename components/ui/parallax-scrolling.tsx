'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

type ParallaxComponentProps = {
  title?: string;
};

export function ParallaxComponent({ title = 'Clippio' }: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = parallaxRef.current;
    if (!root) {
      return;
    }

    const triggerElement = root.querySelector('[data-parallax-layers]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;

    const ctx = gsap.context(() => {
      if (!triggerElement || prefersReducedMotion) {
        return;
      }

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<',
        );
      });
    }, root);

    if (!prefersReducedMotion) {
      lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);

      raf = (time) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      ctx.revert();

      if (raf) {
        gsap.ticker.remove(raf);
      }

      lenis?.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
              loading="eager"
              width="800"
              data-parallax-layer="1"
              alt=""
              aria-hidden="true"
              className="parallax__layer-img"
            />
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
              loading="eager"
              width="800"
              data-parallax-layer="2"
              alt=""
              aria-hidden="true"
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title" aria-hidden="true">
              <div className="parallax__title">{title}</div>
            </div>
            <img
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt=""
              aria-hidden="true"
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
    </div>
  );
}
