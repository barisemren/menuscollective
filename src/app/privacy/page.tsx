import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MenusCollective",
  description:
    "Privacy Policy for MenusCollective - Learn how we handle and protect your data",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground">
            At MenusCollective, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              Personal information (email address, full name) when you create an
              account
            </li>
            <li>
              Usage data and preferences (favorite restaurants, browsing
              history)
            </li>
            <li>
              Technical information (IP address, browser type, device
              information)
            </li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our service
            </li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Data Storage and Security
          </h2>
          <p className="text-muted-foreground">
            We use Supabase for secure data storage and authentication. Your
            data is encrypted and stored securely following industry best
            practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to our use of your data</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at baris.emren@yahoo.com
          </p>
        </section>

        <div className="pt-8">
          <Link href="/" className="text-mc-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
