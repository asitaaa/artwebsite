import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border mt-auto py-12">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col items-center gap-6">
                <div className="flex gap-6">
                    <a href="https://www.instagram.com/darshini_theartist" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                </div>
                <div className="flex gap-4">
                    <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                    <Link href="/awards" className="hover:text-foreground transition-colors">Awards</Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Darshini.art. All rights reserved.</p>
            </div>
        </footer>
    );
}
