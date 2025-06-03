"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronDown, 
  BookOpen, 
  School,
  User,
  Calendar,
  Users,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/theme/ModeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "Resources",
    href: "#",
    children: [
      { name: "Student Handbook", href: "#" },
      { name: "Course Catalog", href: "#" },
      { name: "Academic Calendar", href: "#" },
    ]
  },
  { name: "About Us", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <School className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">EduManager</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => 
              !item.children ? (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.name}
                </Link>
              ) : (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href} className="w-full">
                          {child.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <ModeToggle />
            
            <div className="hidden md:flex space-x-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden -m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-50 bg-background ${isOpen ? "block" : "hidden"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <School className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">EduManager</span>
          </Link>
          <button
            className="rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {!item.children ? (
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <details className="group">
                  <summary className="list-none flex justify-between items-center py-2 text-base font-medium cursor-pointer">
                    {item.name}
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pl-4 space-y-2 mt-2 border-l border-border">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block py-1 text-sm text-muted-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
          <div className="pt-4 space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}