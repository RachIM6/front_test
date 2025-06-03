"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import RegistrationProgress from "@/components/auth/registration/RegistrationProgress";
import PersonalInfoStep from "@/components/auth/registration/steps/PersonalInfo";
import ContactInfoStep from "@/components/auth/registration/steps/ContactInfo";
import AccountInfoStep from "@/components/auth/registration/steps/AccountInfo";
import EducationalInfoStep from "@/components/auth/registration/steps/EducationalInfo";
import EmergencyContactStep from "@/components/auth/registration/steps/EmergencyContact";
import { FormDataSchema, FormData } from "@/types/registration";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      // Personal Info
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: undefined,
      nationality: "",
      
      // Contact Info
      emailAddress: "",
      phoneNumber: "",
      country: "",
      streetAddress: "",
      city: "",
      stateOrProvince: "",
      postalCode: "",
      
      // Account Info
      username: "",
      password: "",
      confirmPassword: "",
      
      // Educational Info
      institutionName: "",
      major: undefined,
      educationLevel: undefined,
      institutionAddress: "",
      additionalInformation: "",
      
      // Emergency Contact
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
    },
    mode: "onChange",
  });
  
  const totalSteps = 5;
  
  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Remove confirmPassword as it's not needed in the API
      const { confirmPassword, ...submitData } = data;
      
      // Simulate API call
      console.log("Submitting data:", submitData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });
      
      // Redirect to login page
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <RegistrationProgress currentStep={step} totalSteps={totalSteps} />
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && <PersonalInfoStep form={form} />}
            {step === 2 && <ContactInfoStep form={form} />}
            {step === 3 && <AccountInfoStep form={form} />}
            {step === 4 && <EducationalInfoStep form={form} />}
            {step === 5 && <EmergencyContactStep form={form} />}
            
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1 || isSubmitting}
              >
                Previous
              </Button>
              
              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}