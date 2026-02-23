import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border mt-auto py-12">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Darshini Aithal. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                    <Link href="/awards" className="hover:text-foreground transition-colors">Awards</Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                </div>
            </div>
        </footer>
    );
}
