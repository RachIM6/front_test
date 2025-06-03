import { z } from "zod";

// Personal Info
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name cannot exceed 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name cannot exceed 50 characters"),
  dateOfBirth: z.string().refine((date) => {
    // Check if date is valid and at least 16 years ago
    const dob = new Date(date);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    return !isNaN(dob.getTime()) && dob <= minAge;
  }, "You must be at least 16 years old"),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Please select a gender",
  }),
  nationality: z.string().min(1, "Nationality is required").max(100, "Nationality cannot exceed 100 characters"),
});

// Contact Info
const contactInfoSchema = z.object({
  emailAddress: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine(email => email.endsWith("@gmail.com"), "Email must end with @gmail.com"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number format"),
  country: z.string().min(1, "Country is required").max(100),
  streetAddress: z.string().min(1, "Street address is required").max(200),
  city: z.string().min(1, "City is required").max(100),
  stateOrProvince: z.string().min(1, "State/Province is required").max(100),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20)
    .regex(/^[A-Za-z0-9\s\-]{3,20}$/, "Invalid postal code format"),
});

// Account Info
const accountInfoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters")
    .regex(/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, underscores, and hyphens"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Educational Info
const educationalInfoSchema = z.object({
  institutionName: z.string().min(1, "Institution name is required").max(200),
  major: z.enum(["COMPUTER_SCIENCE", "ENGINEERING", "BUSINESS", "OTHER"], {
    required_error: "Please select a major",
  }),
  educationLevel: z.enum(["BACHELOR", "MASTER", "PHD", "OTHER"], {
    required_error: "Please select an education level",
  }),
  institutionAddress: z.string().min(1, "Institution address is required").max(300),
  additionalInformation: z.string().max(1000).optional(),
});

// Emergency Contact
const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency contact name is required").max(100),
  emergencyContactPhone: z
    .string()
    .min(1, "Emergency contact phone is required")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number format"),
  emergencyContactRelationship: z.string().min(1, "Relationship is required").max(50),
});

// Combined form schema
export const FormDataSchema = z.object({
  ...personalInfoSchema.shape,
  ...contactInfoSchema.shape,
  ...accountInfoSchema.shape,
  ...educationalInfoSchema.shape,
  ...emergencyContactSchema.shape,
});

export type FormData = z.infer<typeof FormDataSchema>;

// Export step schemas for validation
export const PersonalInfoSchema = personalInfoSchema;
export const ContactInfoSchema = contactInfoSchema;
export const AccountInfoSchema = accountInfoSchema;
export const EducationalInfoSchema = educationalInfoSchema;
export const EmergencyContactSchema = emergencyContactSchema;

// Step validation functions
export function validatePersonalInfo(data: Partial<FormData>) {
  return personalInfoSchema.safeParse(data);
}

export function validateContactInfo(data: Partial<FormData>) {
  return contactInfoSchema.safeParse(data);
}

export function validateAccountInfo(data: Partial<FormData>) {
  return accountInfoSchema.safeParse(data);
}

export function validateEducationalInfo(data: Partial<FormData>) {
  return educationalInfoSchema.safeParse(data);
}

export function validateEmergencyContact(data: Partial<FormData>) {
  return emergencyContactSchema.safeParse(data);
}