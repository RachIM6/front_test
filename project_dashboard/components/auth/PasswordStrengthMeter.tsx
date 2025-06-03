"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  
  // Password requirements
  const requirements = [
    { 
      regex: /.{8,}/, 
      text: "At least 8 characters" 
    },
    { 
      regex: /[A-Z]/, 
      text: "At least one uppercase letter" 
    },
    { 
      regex: /[a-z]/, 
      text: "At least one lowercase letter" 
    },
    { 
      regex: /[0-9]/, 
      text: "At least one number" 
    },
    { 
      regex: /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/, 
      text: "At least one special character" 
    },
  ];
  
  useEffect(() => {
    const calculateStrength = () => {
      if (!password) return 0;
      
      // Calculate strength based on how many requirements are met
      const metRequirements = requirements.filter(req => req.regex.test(password)).length;
      return (metRequirements / requirements.length) * 100;
    };
    
    setStrength(calculateStrength());
  }, [password]);
  
  // Get color based on strength
  const getColorClass = () => {
    if (strength < 30) return "text-red-500";
    if (strength < 60) return "text-yellow-500";
    if (strength < 80) return "text-blue-500";
    return "text-green-500";
  };
  
  const getProgressColor = () => {
    if (strength < 30) return "bg-red-500";
    if (strength < 60) return "bg-yellow-500";
    if (strength < 80) return "bg-blue-500";
    return "bg-green-500";
  };
  
  return (
    <div className="mt-2 space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Password strength:</span>
          <span className={getColorClass()}>
            {strength === 0 ? "None" : 
             strength < 30 ? "Weak" :
             strength < 60 ? "Fair" :
             strength < 80 ? "Good" :
             "Strong"}
          </span>
        </div>
        <Progress value={strength} className="h-1" indicatorClassName={getProgressColor()} />
      </div>
      
      <div className="text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center">
            {req.regex.test(password) ? (
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
            ) : (
              <XCircle className="h-3 w-3 mr-1 text-muted-foreground" />
            )}
            <span className={cn(
              req.regex.test(password) ? "text-green-500" : "text-muted-foreground"
            )}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}