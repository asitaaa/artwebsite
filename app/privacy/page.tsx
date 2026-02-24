import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Darshini.art',
    description: 'Privacy policy for Darshini.art',
};

export default function PrivacyPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="space-y-6 text-muted-foreground">
                <p>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Introduction</h2>
                <p>
                    Welcome to Darshini.art. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. The Data We Collect About You</h2>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                    <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                    <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                    <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. How We Use Your Personal Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal obligation.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Contact Us</h2>
                <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact us through our Contact page.
                </p>
            </div>
        </main>
    );
}
