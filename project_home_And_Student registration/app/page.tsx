import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Users, Calendar, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeatureCard from "@/components/home/FeatureCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Powerful Features for Modern Education
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive school management system streamlines administrative tasks
                and enhances the learning experience for students and educators alike.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<GraduationCap className="h-10 w-10 text-primary" />}
                title="Student Management" 
                description="Track academic progress, attendance, and performance with comprehensive student profiles."
              />
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Faculty Portal" 
                description="Enable teachers to manage classes, assignments, and communicate with students effortlessly."
              />
              <FeatureCard 
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Event Scheduling" 
                description="Plan and organize school events, parent meetings, and academic calendars."
              />
              <FeatureCard 
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Course Management" 
                description="Create and manage courses, curriculum, and learning resources all in one place."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Ready to transform your educational institution?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of schools worldwide that are already benefiting from our comprehensive management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/login">
                  Login to Dashboard
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-primary">
                <Link href="/register">
                  Register as Student <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                What Our Users Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from administrators, teachers, and students who use our platform daily.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4">
                      <span className="text-lg font-semibold">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        {["John Smith", "Sarah Johnson", "Michael Lee"][i - 1]}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {["Principal, Lincoln High", "Teacher, Westview Academy", "Student, Tech University"][i - 1]}
                      </p>
                    </div>
                  </div>
                  <p className="text-card-foreground">
                    {[
                      "This system has revolutionized how we manage our school operations. Everything is streamlined, and we've saved countless hours on administrative tasks.",
                      "The intuitive interface makes it easy to track student progress and communicate with parents. I can focus more on teaching, less on paperwork.",
                      "Registration was simple and the portal gives me access to all my courses, grades, and schedules in one place. It's made university life much easier!"
                    ][i - 1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}