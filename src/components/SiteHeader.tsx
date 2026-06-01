"use client";

import { useEffect, useState } from "react";

function PawMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M7.1 11.3c1.2 0 2.1-1.4 2.1-3.1S8.3 5 7.1 5 5 6.4 5 8.2s.9 3.1 2.1 3.1Zm9.8 0c1.2 0 2.1-1.4 2.1-3.1S18.1 5 16.9 5s-2.1 1.4-2.1 3.2.9 3.1 2.1 3.1ZM11.9 8c1.3 0 2.3-1.5 2.3-3.4S13.2 1.2 11.9 1.2 9.6 2.7 9.6 4.6 10.6 8 11.9 8Zm-4.2 5.4c-1.5 1.2-2.9 2.7-2.9 4.6 0 2.4 2.2 3.7 4.1 3.1 1.9-.6 4.2-.6 6.1 0 1.9.6 4.1-.7 4.1-3.1 0-1.9-1.4-3.4-2.9-4.6-1.4-1.1-2.2-2.5-4.2-2.5s-2.9 1.4-4.3 2.5Z" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="泡泡爪宠物洗护首页" onClick={closeMenu}>
          <PawMark />
          <span>泡泡爪宠物洗护</span>
        </a>
        <div className="nav-links" id="navLinks">
          <a href="#services" onClick={closeMenu}>
            洗护服务
          </a>
          <a href="#care" onClick={closeMenu}>
            护理标准
          </a>
          <a href="#pricing" onClick={closeMenu}>
            价目表
          </a>
          <a href="#booking" onClick={closeMenu}>
            预约到店
          </a>
        </div>
        <div className="nav-actions">
          <a className="phone-link" href="tel:400-820-6620">
            400-820-6620
          </a>
          <a className="button" href="#booking" onClick={closeMenu}>
            立即预约
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label="打开导航菜单"
            aria-controls="navLinks"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
