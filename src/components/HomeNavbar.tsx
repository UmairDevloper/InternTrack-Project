"use client"

import { useState } from "react"
import Link from "next/link"

export default function HomeNavbar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <style>{`
        nav.home-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 1.5rem;height:60px;display:flex;align-items:center;justify-content:space-between;background:rgba(10,15,30,0.92);backdrop-filter:blur(12px);border-bottom:0.5px solid rgba(255,255,255,0.08)}
        .nav-logo{font-size:17px;font-weight:600;color:#fff;letter-spacing:-0.3px;text-decoration:none}
        .nav-logo span{color:#5B5FEF}
        .nav-links{display:flex;gap:2rem;list-style:none;margin:0;padding:0}
        .nav-links a{color:rgba(255,255,255,0.65);text-decoration:none;font-size:14px;transition:color 0.2s}
        .nav-links a:hover{color:#fff}
        .nav-cta{background:#5B5FEF;color:#fff;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;transition:background 0.2s;display:inline-block}
        .nav-cta:hover{background:#4347C9}
        .nav-hamburger{display:none;flex-direction:column;justify-content:center;align-items:center;gap:5px;width:36px;height:36px;border-radius:8px;border:none;background:transparent;cursor:pointer;padding:0;flex-shrink:0}
        .nav-hamburger span{display:block;width:20px;height:2px;background:#fff;border-radius:2px;transition:all 0.3s ease}
        .nav-hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
        .nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
        .nav-hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
        .nav-mobile-dropdown{position:fixed;top:60px;left:0;right:0;z-index:99;background:rgba(10,15,30,0.97);backdrop-filter:blur(12px);border-bottom:0.5px solid rgba(255,255,255,0.08);flex-direction:column;padding:0.75rem 1.5rem 1.5rem;overflow:hidden;transition:all 0.3s ease}
        .nav-mobile-dropdown a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:15px;font-weight:500;padding:13px 0;display:block;border-bottom:0.5px solid rgba(255,255,255,0.07);transition:color 0.2s}
        .nav-mobile-dropdown a:hover{color:#fff}
        .nav-mobile-dropdown .nav-cta{margin-top:14px;text-align:center;border-bottom:none;padding:11px 18px;border-radius:8px}
        @media(max-width:768px){
          .nav-links{display:none!important}
          .nav-desktop-cta{display:none!important}
          .nav-hamburger{display:flex!important}
        }
        @media(min-width:769px){
          .nav-mobile-dropdown{display:none!important}
          .nav-hamburger{display:none!important}
        }
      `}</style>

            <nav className="home-nav">
                {/* Logo */}
                <Link href="/" className="nav-logo">
                    Intern<span>Track</span>
                </Link>

                {/* Desktop links */}
                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how">How it works</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                </ul>

                {/* Desktop CTA */}
                <Link href="/dashboard" className="nav-cta nav-desktop-cta">
                    Get started free
                </Link>

                {/* Mobile hamburger */}
                <button
                    className={`nav-hamburger ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            {/* Mobile dropdown */}
            <div
                className="nav-mobile-dropdown"
                style={{ display: open ? "flex" : "none" }}
            >
                <a href="#features" onClick={() => setOpen(false)}>Features</a>
                <a href="#how" onClick={() => setOpen(false)}>How it works</a>
                <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
                <Link href="/dashboard" className="nav-cta" onClick={() => setOpen(false)}>
                    Get started free
                </Link>
            </div>
        </>
    )
}