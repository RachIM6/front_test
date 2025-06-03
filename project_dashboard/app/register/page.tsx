import Link from "next/link";
import { School } from "lucide-react";
import RegistrationForm from "@/components/auth/registration/RegistrationForm";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center">
              <School className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">EduManager</span>
            </Link>
            <h1 className="mt-6 text-3xl font-extrabold">Student Registration</h1>
            <p className="mt-2 text-muted-foreground">
              Create your student account to access the portal
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <RegistrationForm />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}