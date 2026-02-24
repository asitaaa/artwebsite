"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <Image src="/logo.png" alt="Darshini.art" width={150} height={40} priority className="object-contain" />
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors" aria-label="Home">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    </Link>
                    <Link href="/about" className="hover:text-foreground hover:underline hover:decoration-red-500 hover:underline-offset-[6px] transition-all">About</Link>
                    <Link href="/awards" className="hover:text-foreground hover:underline hover:decoration-red-500 hover:underline-offset-[6px] transition-all">Awards</Link>
                    <Link href="/contact" className="hover:text-foreground hover:underline hover:decoration-red-500 hover:underline-offset-[6px] transition-all">Contact</Link>
                    <a href="https://www.instagram.com/darshini_theartist" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors ml-2" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                </nav>
                <button
                    className="md:hidden p-2 text-foreground font-medium"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? "Close" : "Menu"}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border bg-background absolute w-full left-0 shadow-lg">
                    <nav className="flex flex-col px-6 py-6 gap-6 text-base font-medium text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-2" onClick={() => setIsMenuOpen(false)} aria-label="Home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            <span>Home</span>
                        </Link>
                        <Link href="/about" className="hover:text-foreground hover:underline hover:decoration-red-500 hover:underline-offset-[6px] transition-all" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link href="/awards" className="hover:text-foreground hover:underline hover:decoration-red-500 hover:underline-offset-[6px] transition-all" onClick={() => setIsMenuOpen(false)}>Awards</Link>
                        <Link href="/contact" className="hover:text-foreground hover:underline hover:decoration-red-500 hover:underline-offset-[6px] transition-all" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <a href="https://www.instagram.com/darshini_theartist" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors mt-2 flex items-center gap-2" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            <span>Instagram</span>
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
