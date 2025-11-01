"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export function Navigation() {
  const { language, setLanguage, t, colorBlindMode, setColorBlindMode } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileLanguageMenuOpen, setMobileLanguageMenuOpen] = useState(false);
  const [colorBlindMenuOpen, setColorBlindMenuOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const mobileLanguageMenuRef = useRef<HTMLDivElement>(null);
  const colorBlindMenuRef = useRef<HTMLDivElement>(null);

  const increaseFontSize = () => setFontScale((prev) => Math.min(prev + 10, 130));
  const decreaseFontSize = () => setFontScale((prev) => Math.max(prev - 10, 80));
  const resetFontSize = () => setFontScale(100);

  // Apply font size changes to html element
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.fontSize = `${fontScale}%`;
    }
  }, [fontScale]);

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
      if (mobileLanguageMenuRef.current && !mobileLanguageMenuRef.current.contains(event.target as Node)) {
        setMobileLanguageMenuOpen(false);
      }
      if (colorBlindMenuRef.current && !colorBlindMenuRef.current.contains(event.target as Node)) {
        setColorBlindMenuOpen(false);
      }
    };

    if (languageMenuOpen || mobileLanguageMenuOpen || colorBlindMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageMenuOpen, mobileLanguageMenuOpen, colorBlindMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const getColorBlindFilter = () => {
    switch (colorBlindMode) {
      case "protanopia":
        return "url(#protanopia)";
      case "deuteranopia":
        return "url(#deuteranopia)";
      case "tritanopia":
        return "url(#tritanopia)";
      case "highContrast":
        return "contrast(2) saturate(1.5)";
      default:
        return "none";
    }
  };

  return (
    <>
      <style jsx global>{`
        html {
          font-size: ${fontScale}%;
        }
        body {
          filter: ${getColorBlindFilter()};
        }
      `}</style>
      
      {/* SVG filters for color blindness simulation */}
      <svg style={{ height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0,     0, 0
                                                   0.558, 0.442, 0,     0, 0
                                                   0,     0.242, 0.758, 0, 0
                                                   0,     0,     0,     1, 0"/>
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0,   0, 0
                                                   0.7,   0.3,   0,   0, 0
                                                   0,     0.3,   0.7, 0, 0
                                                   0,     0,     0,   1, 0"/>
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05,  0,     0, 0
                                                   0,    0.433, 0.567, 0, 0
                                                   0,    0.475, 0.525, 0, 0
                                                   0,    0,     0,     1, 0"/>
          </filter>
        </defs>
      </svg>

      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Utilities (hidden on mobile) */}
          <div className="hidden lg:flex justify-end items-center py-1.5">
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search...", "搜索...")} className="w-32 px-2 py-0.5 border-2 border-black text-xs focus:outline-none focus:border-[#00a19a]" autoFocus />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="ml-1 p-0.5 hover:text-[#d62e39] text-sm">✕</button>
                  </form>
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="p-1 hover:text-[#d62e39]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative" ref={languageMenuRef}>
                <button onClick={() => setLanguageMenuOpen(!languageMenuOpen)} className="p-1 hover:text-[#d62e39]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </button>
                {languageMenuOpen && (
                  <div className="absolute right-0 mt-1 w-28 bg-white border-2 border-black shadow-lg z-50">
                    <button onClick={() => { setLanguage("en"); setLanguageMenuOpen(false); }} className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold">English</button>
                    <button onClick={() => { setLanguage("zh"); setLanguageMenuOpen(false); }} className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold">中文</button>
                  </div>
                )}
              </div>

              {/* Visual Aids */}
              <div className="relative" ref={colorBlindMenuRef}>
                <button onClick={() => setColorBlindMenuOpen(!colorBlindMenuOpen)} className="p-1 hover:text-[#d62e39]" title={t("Visual Aids", "视觉辅助")}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </button>
                {colorBlindMenuOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-white border-2 border-black shadow-lg z-50">
                    <button onClick={() => { setColorBlindMode("normal"); setColorBlindMenuOpen(false); }} className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold ${colorBlindMode === "normal" ? "bg-gray-200" : ""}`}>
                      {t("Standard", "标准")}
                    </button>
                    <button onClick={() => { setColorBlindMode("protanopia"); setColorBlindMenuOpen(false); }} className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold ${colorBlindMode === "protanopia" ? "bg-gray-200" : ""}`}>
                      {t("Protan (red-weak aid)", "Protan（红色通道减弱辅助）")}
                    </button>
                    <button onClick={() => { setColorBlindMode("deuteranopia"); setColorBlindMenuOpen(false); }} className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold ${colorBlindMode === "deuteranopia" ? "bg-gray-200" : ""}`}>
                      {t("Deutan (green-weak aid)", "Deutan（绿色通道减弱辅助）")}
                    </button>
                    <button onClick={() => { setColorBlindMode("tritanopia"); setColorBlindMenuOpen(false); }} className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold ${colorBlindMode === "tritanopia" ? "bg-gray-200" : ""}`}>
                      {t("Tritan (blue-yellow-weak aid)", "Tritan（蓝-黄通道减弱辅助）")}
                    </button>
                    <button onClick={() => { setColorBlindMode("highContrast"); setColorBlindMenuOpen(false); }} className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 font-semibold ${colorBlindMode === "highContrast" ? "bg-gray-200" : ""}`}>
                      {t("High Contrast", "高对比度")}
                    </button>
                  </div>
                )}
              </div>

              {/* Font Size Controls */}
              <div className="flex items-center space-x-2 border-l border-gray-300 pl-3">
                <span className="text-sm font-bold">{t("Font", "字体")}</span>
                <div className="flex space-x-1">
                  <button onClick={increaseFontSize} className="w-7 h-7 border-2 border-black text-sm font-bold hover:bg-gray-100 transition-all">+</button>
                  <button onClick={decreaseFontSize} className="w-7 h-7 border-2 border-black text-sm font-bold hover:bg-gray-100 transition-all">-</button>
                  <button onClick={resetFontSize} className="w-7 h-7 border-2 border-black text-sm font-bold hover:bg-gray-100 transition-all">↻</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Logo and Navigation */}
          <div className="flex justify-between items-center py-2.5">
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
              <div className="text-3xl font-black tracking-tight">
              <span className="text-[#d62e39] transition-colors hover:text-[#b82531]">EAST ASIAN</span>
              <span className="text-[#00a19a] transition-colors hover:text-[#008c85]"> GENDER</span>
              <span className="text-black"> BRIDGE</span>
            </div>
          </Link>

          <div className="lg:hidden flex items-center space-x-2">
            <div className="relative" ref={mobileLanguageMenuRef}>
              <button onClick={() => setMobileLanguageMenuOpen(!mobileLanguageMenuOpen)} className="p-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </button>
              {mobileLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border-2 border-black shadow-lg z-50">
                  <button onClick={() => { setLanguage("en"); setMobileLanguageMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100 font-semibold">English</button>
                  <button onClick={() => { setLanguage("zh"); setMobileLanguageMenuOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-gray-100 font-semibold">中文</button>
                </div>
              )}
            </div>

            <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b-4 border-black lg:hidden z-50 shadow-lg">
              {/* Mobile Utilities */}
              <div className="px-4 py-3 border-b-2 border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">{t("Settings", "设置")}</span>
                </div>
                
                {/* Visual Aids - Mobile */}
                <div className="mb-3">
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">{t("Visual Aids", "视觉辅助")}</label>
                  <select 
                    value={colorBlindMode} 
                    onChange={(e) => setColorBlindMode(e.target.value as "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "highContrast")}
                    className="w-full px-3 py-2 border-2 border-black text-sm focus:outline-none focus:border-[#00a19a]"
                  >
                    <option value="normal">{t("Standard", "标准")}</option>
                    <option value="protanopia">{t("Protan (red-weak aid)", "Protan（红色通道减弱辅助）")}</option>
                    <option value="deuteranopia">{t("Deutan (green-weak aid)", "Deutan（绿色通道减弱辅助）")}</option>
                    <option value="tritanopia">{t("Tritan (blue-yellow-weak aid)", "Tritan（蓝-黄通道减弱辅助）")}</option>
                    <option value="highContrast">{t("High Contrast", "高对比度")}</option>
                  </select>
                </div>

                {/* Font Size - Mobile */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">{t("Font Size", "字体大小")}</label>
                  <div className="flex items-center justify-between">
                    <button onClick={decreaseFontSize} className="flex-1 py-2 border-2 border-black text-sm font-bold hover:bg-gray-100 transition-all">-</button>
                    <span className="flex-1 text-center text-sm font-bold">{fontScale}%</span>
                    <button onClick={increaseFontSize} className="flex-1 py-2 border-2 border-black text-sm font-bold hover:bg-gray-100 transition-all">+</button>
                    <button onClick={resetFontSize} className="ml-2 px-4 py-2 border-2 border-black text-sm font-bold hover:bg-gray-100 transition-all">↻</button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col">
                <Link href="/about-us" className="px-4 py-3 font-bold hover:bg-gray-100 border-b border-gray-200" onClick={() => setMobileMenuOpen(false)}>{t("About Us", "关于我们")}</Link>
                <Link href="/academic-hub" className="px-4 py-3 font-bold hover:bg-gray-100 border-b border-gray-200" onClick={() => setMobileMenuOpen(false)}>{t("Academic Hub", "学术中心")}</Link>
                <Link href="/community-space" className="px-4 py-3 font-bold hover:bg-gray-100 border-b border-gray-200" onClick={() => setMobileMenuOpen(false)}>{t("Community Space", "社区空间")}</Link>
                <Link href="/action-center" className="px-4 py-3 font-bold hover:bg-gray-100 border-b border-gray-200" onClick={() => setMobileMenuOpen(false)}>{t("Action Center", "行动中心")}</Link>
                <Link href="/contact-us" className="px-4 py-3 font-bold hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t("Contact Us", "联系我们")}</Link>
              </div>
            </div>
          )}

            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/about-us" className="text-base font-bold hover:text-[#d62e39] transition-all hover:scale-105 whitespace-nowrap">{t("About Us", "关于我们")}</Link>
              <Link href="/academic-hub" className="text-base font-bold hover:text-[#d62e39] transition-all hover:scale-105 whitespace-nowrap">{t("Academic Hub", "学术中心")}</Link>
              <Link href="/community-space" className="text-base font-bold hover:text-[#d62e39] transition-all hover:scale-105 whitespace-nowrap">{t("Community Space", "社区空间")}</Link>
              <Link href="/action-center" className="text-base font-bold hover:text-[#d62e39] transition-all hover:scale-105 whitespace-nowrap">{t("Action Center", "行动中心")}</Link>
              <Link href="/contact-us" className="text-base font-bold hover:text-[#d62e39] transition-all hover:scale-105 whitespace-nowrap">{t("Contact Us", "联系我们")}</Link>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
