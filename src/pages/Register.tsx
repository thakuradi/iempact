import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import fareStripes from "/fare-tent.svg";
const events = [
  "Battle of Bands",
  "Classical Dance",
  "Open Mic Night",
  "Art Exhibition",
  "Photography Walk",
  "Hackathon",
  "Street Dance",
  "Fashion Show",
  "Debate Competition",
  "Quiz Championship",
];

const registrationSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number format"),
  college_name: z
    .string()
    .trim()
    .min(2, "College name must be at least 2 characters")
    .max(200, "College name must be less than 200 characters"),
  event_name: z.string().min(1, "Please select an event"),
  team_name: z
    .string()
    .trim()
    .max(100, "Team name must be less than 100 characters")
    .optional(),
  team_size: z
    .number()
    .min(1, "Team size must be at least 1")
    .max(10, "Team size cannot exceed 10"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  const [formData, setFormData] = useState<RegistrationForm>({
    full_name: "",
    email: "",
    phone: "",
    college_name: "",
    event_name: preselectedEvent,
    team_name: "",
    team_size: 1,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationForm, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "team_size" ? parseInt(value) || 1 : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegistrationForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof RegistrationForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("registrations").insert({
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        college_name: formData.college_name.trim(),
        event_name: formData.event_name,
        team_name: formData.team_name?.trim() || null,
        team_size: formData.team_size,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Registration successful! See you at IMPACT 2026!");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Registration Successful | IMPACT 2026</title>
        </Helmet>
        <div
          className="relative min-h-screen 
        bg-background text-foreground"
        >
          <Navbar />
          <main
            className="pt-20 min-h-[80vh] flex 
          items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-8 max-w-md mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-bebas text-4xl md:text-5xl mb-4">
                <span className="text-gradient-accent">Registration</span>{" "}
                Complete!
              </h1>
              <p className="font-poppins text-foreground/70 mb-8">
                Thank you for registering for {formData.event_name}. We've sent
                a confirmation to {formData.email}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" onClick={() => navigate("/events")}>
                  Explore More Events
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      full_name: "",
                      email: "",
                      phone: "",
                      college_name: "",
                      event_name: "",
                      team_name: "",
                      team_size: 1,
                    });
                  }}
                >
                  Register Another
                </Button>
              </div>
            </motion.div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register | IMPACT 2026 College Cultural Fest</title>
        <meta
          name="description"
          content="Register for IMPACT 2026 events. Join thousands of participants from 100+ colleges in the largest cultural fest."
        />
      </Helmet>

      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="font-bebas text-5xl md:text-7xl mb-4">
                  <span className="text-gradient-accent">Register</span> Now
                </h1>
                <p className="font-poppins text-foreground/70 text-lg">
                  Secure your spot at IMPACT 2026. Fill in your details below.
                </p>
              </div>

              {/* Registration Form */}
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30"
              >
                <div className="space-y-6">
                  {/* Event Selection */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                      Select Event <span className="text-primary">*</span>
                    </label>
                    <select
                      name="event_name"
                      value={formData.event_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm focus:border-accent focus:outline-none transition-colors ${
                        errors.event_name
                          ? "border-primary"
                          : "border-border/50"
                      }`}
                    >
                      <option value="">Choose an event...</option>
                      {events.map((event) => (
                        <option key={event} value={event}>
                          {event}
                        </option>
                      ))}
                    </select>
                    {errors.event_name && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.event_name}
                      </p>
                    )}
                  </div>

                  {/* Personal Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.full_name
                            ? "border-primary"
                            : "border-border/50"
                        }`}
                      />
                      {errors.full_name && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.full_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.email ? "border-primary" : "border-border/50"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        Phone Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.phone ? "border-primary" : "border-border/50"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                        College Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="college_name"
                        value={formData.college_name}
                        onChange={handleChange}
                        placeholder="Your college/university"
                        className={`w-full px-4 py-3 rounded-lg bg-input border font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors ${
                          errors.college_name
                            ? "border-primary"
                            : "border-border/50"
                        }`}
                      />
                      {errors.college_name && (
                        <p className="mt-1 text-sm text-primary">
                          {errors.college_name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Team Details (Optional) */}
                  <div className="border-t border-border/30 pt-6">
                    <h3 className="font-bebas text-xl text-foreground/80 mb-4">
                      Team Details (Optional)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                          Team Name
                        </label>
                        <input
                          type="text"
                          name="team_name"
                          value={formData.team_name}
                          onChange={handleChange}
                          placeholder="Your team name"
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-foreground/80 mb-2">
                          Team Size
                        </label>
                        <input
                          type="number"
                          name="team_size"
                          value={formData.team_size}
                          onChange={handleChange}
                          min="1"
                          max="10"
                          className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 font-poppins text-sm placeholder:text-foreground/40 focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Registering...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>

                  <p className="text-center text-sm text-foreground/50">
                    By registering, you agree to our terms and conditions.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Register;
