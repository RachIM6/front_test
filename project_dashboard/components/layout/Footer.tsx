import Link from "next/link";
import { School } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center">
              <School className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">EduManager</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Empowering educational institutions with modern management tools to
              enhance learning experiences and streamline administration.
            </p>
            <div className="flex space-x-4 mt-6">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a 
                  key={social}
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Documentation", "Tutorials", "Blog", "FAQs"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Education Avenue</p>
              <p>Learning City, LC 12345</p>
              <p className="mt-4">
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
              <p>
                <a href="mailto:info@edumanager.com" className="hover:text-primary transition-colors">
                  info@edumanager.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} EduManager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}