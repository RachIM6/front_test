"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function RegistrationProgress({
  currentStep,
  totalSteps,
}: RegistrationProgressProps) {
  const steps = [
    { id: 1, name: "Personal Info" },
    { id: 2, name: "Contact" },
    { id: 3, name: "Account" },
    { id: 4, name: "Education" },
    { id: 5, name: "Emergency" },
  ];

  return (
    <div className="bg-muted py-4 px-6 border-b">
      <div className="hidden sm:block">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="flex items-center"
          >
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={cn(
                  stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                  "relative flex-1"
                )}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    )}
                  >
                    <span>{step.id}</span>
                  </div>
                  <div
                    className={cn(
                      "ml-4 text-sm font-medium",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </div>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-[38px] top-5 -ml-px h-0.5 w-full sm:w-full",
                      currentStep > step.id ? "bg-primary" : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Mobile Progress Bar */}
      <div className="sm:hidden">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}: {steps[currentStep - 1].name}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}