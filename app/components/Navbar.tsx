"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight" onClick={() => setIsMenuOpen(false)}>
                    DARSHINI AITHAL
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                    <Link href="/awards" className="hover:text-foreground transition-colors">Awards</Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
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
                        <Link href="/about" className="hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link href="/awards" className="hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>Awards</Link>
                        <Link href="/contact" className="hover:text-foreground transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
