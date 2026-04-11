"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setTimeout(() => el.classList.add("visible"), 100);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-shape hero-bg-shape-1" />
      <div className="hero-bg-shape hero-bg-shape-2" />

      <div className="container">
        <div className="hero-layout fade-in" ref={ref}>
          <div className="hero-content">
            <h1 className="hero-title">
              Сайн байна уу! Би бол{" "}
              <span className="highlight">Хатанбаатар</span>, full stack
              хөгжүүлэгч.
            </h1>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                Төслүүдийг үзэх
              </a>
              <a href="#contact" className="btn-outline">
                Холбоо барих
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">10+</span>
                <span className="hero-stat-label">Төсөл</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">Full Stack</span>
                <span className="hero-stat-label">Хөгжүүлэлт</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">Cloudinary</span>
                <span className="hero-stat-label">Image workflow</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="hero-showcase-card hero-showcase-main">
              <div className="showcase-window-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="showcase-preview">
                <div className="showcase-preview-sidebar" />
                <div className="showcase-preview-content">
                  <div className="showcase-preview-top" />
                  <div className="showcase-preview-grid">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-showcase-note">
              <strong>Admin panel</strong>
              <p>
                Төслийн screenshot-оо upload хийгээд Cloudinary-д хадгалж, нүүр
                хуудсан дээрээ шууд жагсааж харуулна.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
