(() => {
  'use strict';

  const root = new URL(document.querySelector('base')?.href || location.href);
  const assetUrl = (path) => new URL(path, root).href;

  document.querySelectorAll('.pc-contact-btn').forEach((button) => {
    button.addEventListener('click', () => { location.href = assetUrl('kontakt/'); });
  });

  function initParallaxHero() {
    const layersRoot = document.querySelector('[data-parallax-layers]');
    if (!layersRoot) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    if (typeof window.Lenis !== 'undefined') {
      const lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Motion values from the template (unchanged)
    const layerMotion = [
      { layer: '1', yPercent: 70 },
      { layer: '2', yPercent: 55 },
      { layer: '3', yPercent: 40 },
      { layer: '4', yPercent: 10 }
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: layersRoot,
        start: '0% 0%',
        end: '100% 0%',
        scrub: true
      }
    });

    layerMotion.forEach((item, index) => {
      const targets = layersRoot.querySelectorAll('[data-parallax-layer="' + item.layer + '"]');
      if (!targets.length) return;
      tl.to(targets, { yPercent: item.yPercent, ease: 'none' }, index === 0 ? 0 : '<');
    });
  }

  function initFooterHover() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.footer-hover-text').forEach((svg) => {
      const ghost = svg.querySelector('.footer-hover-text__ghost');
      const line = svg.querySelector('.footer-hover-text__line');
      const radial = svg.querySelector('defs radialGradient');
      if (!radial) return;

      // draw outline animation once
      if (line) {
        line.style.strokeDasharray = '1000';
        line.style.strokeDashoffset = '1000';
        requestAnimationFrame(() => {
          if (reduce) {
            line.style.transition = 'none';
            line.style.strokeDashoffset = '0';
          } else {
            line.style.transition = 'stroke-dashoffset 3.2s cubic-bezier(0.76, 0, 0.24, 1)';
            line.style.strokeDashoffset = '0';
          }
        });
      }

      if (reduce) return;

      const updateMask = (clientX, clientY) => {
        const rect = svg.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const cx = ((clientX - rect.left) / rect.width) * 100;
        const cy = ((clientY - rect.top) / rect.height) * 100;
        radial.setAttribute('cx', cx.toFixed(2) + '%');
        radial.setAttribute('cy', cy.toFixed(2) + '%');
      };

      const linear = svg.querySelector('defs linearGradient');
      const defaultStops = linear
        ? Array.from(linear.querySelectorAll('stop')).map((stop) => stop.getAttribute('stop-color') || '#3ca2fa')
        : [];
      const hoverStops = ['#eab308', '#ef4444', '#80eeb4', '#06b6d4', '#8b5cf6'];

      const paintStops = (colors) => {
        if (!linear) return;
        const stops = linear.querySelectorAll('stop');
        stops.forEach((stop, index) => {
          stop.setAttribute('stop-color', colors[index % colors.length]);
        });
      };

      svg.addEventListener('pointerenter', () => {
        svg.classList.add('is-hovered');
        if (ghost) ghost.style.opacity = '0.7';
        paintStops(hoverStops);
      });
      svg.addEventListener('pointerleave', () => {
        svg.classList.remove('is-hovered');
        if (ghost) ghost.style.opacity = '0';
        radial.setAttribute('cx', '50%');
        radial.setAttribute('cy', '50%');
        paintStops(defaultStops.length ? defaultStops : ['#f5f5f5', '#25e7dd', '#7c5cff', '#ffffff']);
      });
      svg.addEventListener('pointermove', (event) => {
        updateMask(event.clientX, event.clientY);
      });
    });
  }

  initFooterHover();
  loadGallery();
})();
