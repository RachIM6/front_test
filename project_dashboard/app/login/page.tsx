"use client";

import { useState } from "react";
import Link from "next/link";
import { School } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center">
              <School className="h-10 w-10 text-primary" />
              <span className="ml-2 text-2xl font-bold">EduManager</span>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold">Sign in to your account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Or{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                register as a new student
              </Link>
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-8 py-10 mb-6">
            <LoginForm />
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              By signing in, you agree to our{" "}
              <Link href="#" className="font-medium text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}