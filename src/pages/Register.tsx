import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { CheckCircle, Loader2, Plus, Trash2, Users, User } from "lucide-react";
import { z } from "zod";

const EVENTS = [
  { id: "westwood", name: "Westwood - Western Solo Singing", type: "solo" },
  { id: "raagify", name: "Raagify - Eastern Solo Singing", type: "solo" },
  { id: "voxbox", name: "Voxbox - Solo Beatbox Battle", type: "solo" },
  { id: "illusion-jam", name: "Illusion Jam - Battle of Bands", type: "team" },
  { id: "eastern-euphoria", name: "Eastern Euphoria (Solo/Duo/Group)", type: "both" },
  { id: "step-up", name: "Step Up (Solo, Duo, Team)", type: "both" },
  { id: "stepistan", name: "Stepistan (Solo Street Dance Battle)", type: "solo" },
  { id: "halla-bol", name: "Halla Bol - Team", type: "team" },
  { id: "shrutirawngo", name: "Shrutirawngo (Team)", type: "team" },
  { id: "futsal", name: "Futsal (Team)", type: "team" },
  { id: "table-tennis", name: "Table Tennis (Solo/Duo)", type: "both" },
  { id: "chess", name: "Mind Over Moves - Chess (Solo)", type: "solo" },
  { id: "bgmi", name: "BGMI - Team", type: "team" },
  { id: "freefire", name: "FreeFire - Team", type: "team" },
  { id: "efootball", name: "EFootball - Solo", type: "solo" },
  { id: "8ball", name: "8 Ball Pool (Solo)", type: "solo" },
  { id: "quizzard", name: "Quizzard (Solo/Team)", type: "both" },
] as const;

// Shared schema parts
const fileSchema = z
  .instanceof(File, { message: "Payment screenshot is required" })
  .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Only .jpg, .png, .webp formats are supported."
  );

// Solo Schema
const soloSchema = z.object({
  registrationType: z.literal("solo"),
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  eventName: z.string().min(1, "Please select an event"),
  transactionUid: z.string().trim().min(1, "Transaction ID is required"),
  paymentScreenshot: fileSchema,
});

// Team Schema
const teamSchema = z.object({
  registrationType: z.literal("team"),
  teamName: z
    .string()
    .trim()
    .min(1, "Team name is required")
    .max(100, "Team name must be less than 100 characters"),
  teamLeader: z
    .string()
    .trim()
    .min(2, "Leader name is required"),
  teamMembers: z
    .array(z.string().trim().min(1, "Member name cannot be empty"))
    .min(1, "At least one team member is required"),
  eventName: z.string().min(1, "Please select an event"),
  transactionUid: z.string().trim().min(1, "Transaction ID is required"),
  paymentScreenshot: fileSchema,
});

// Discriminated Union
const registrationSchema = z.discriminatedUnion("registrationType", [
  soloSchema,
  teamSchema,
]);

type RegistrationForm = z.infer<typeof registrationSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event") || "";

  // Helper to get initial state based on type
  const [registrationType, setRegistrationType] = useState<"solo" | "team">("solo");
  
  // State for form fields
  // We keep a superset of state for UI, but validate only relevant parts
  const [formData, setFormData] = useState({
    fullName: "",
    teamName: "",
    teamLeader: "",
    teamMembers: [""] as string[],
    eventName: preselectedEvent,
    transactionUid: "",
    paymentScreenshot: undefined as unknown as File,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Filter events based on registration type
  const filteredEvents = EVENTS.filter(event => {
    if (registrationType === "solo") {
       return event.type === "solo" || event.type === "both";
    } else {
       return event.type === "team" || event.type === "both";
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = value;
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
    
    // Clear error for specific member index if simple error string logic is used, 
    // or just clear the general 'teamMembers' error
    if (errors.teamMembers) {
       setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.teamMembers;
        return newErrors;
       })
    }
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, ""],
    }));
  };

  const removeMember = (index: number) => {
    const updatedMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, teamMembers: updatedMembers }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, paymentScreenshot: e.target.files![0] }));
      if (errors.paymentScreenshot) {
         setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.paymentScreenshot;
            return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Construct object for Zod validation
    let validationPayload: any = {
      registrationType,
      eventName: formData.eventName,
      transactionUid: formData.transactionUid,
      paymentScreenshot: formData.paymentScreenshot,
    };

    if (registrationType === "solo") {
      validationPayload = {
        ...validationPayload,
        fullName: formData.fullName,
      };
    } else {
      validationPayload = {
        ...validationPayload,
        teamName: formData.teamName,
        teamLeader: formData.teamLeader,
        teamMembers: formData.teamMembers,
      };
    }

    const result = registrationSchema.safeParse(validationPayload);

    if (!result.success) {
      console.log("Validation failed:", result.error.errors);
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        // Handle array errors for team members specially if needed
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      
      const firstError = Object.values(fieldErrors)[0];
      toast.error("Form Validation Failed", {
        description: firstError || "Please check all fields.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to register.");
      }

      const submitData = new FormData();
      submitData.append("registrationType", registrationType);
      submitData.append("eventName", formData.eventName);
      submitData.append("transactionUid", formData.transactionUid);
      submitData.append("paymentScreenshot", formData.paymentScreenshot);

      if (registrationType === "solo") {
        submitData.append("fullName", formData.fullName);
      } else {
        submitData.append("teamName", formData.teamName);
        submitData.append("teamLeader", formData.teamLeader);
        submitData.append("teamMembers", JSON.stringify(formData.teamMembers));
      }

      console.log("Submitting:", Object.fromEntries(submitData.entries()));
      
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_BACKENDURL}/registration`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
        toast.success("Registration successful!");
      }
    } catch (error: any) {
      console.error("Registration Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Registration failed.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4 pt-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-8 max-w-md w-full bg-card/30 backdrop-blur-sm rounded-2xl border border-border/30"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="font-perandory text-4xl mb-2">Registration Complete!</h1>
              <p className="text-foreground/70 mb-8 font-perandory">
                Your {registrationType} registration has been received.
              </p>
              <div className="flex gap-4 justify-center">
                 <Button variant="hero" onClick={() => navigate("/events")}>
                  More Events
                </Button>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Register Another
                </Button>
              </div>
            </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register | IMPACT 2026</title>
      </Helmet>
      <div className="relative min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-24 pb-16 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <h1 className="font-perandory text-5xl md:text-7xl mb-4">
                <span className="text-gradient-accent">Register</span> Now
              </h1>
              <p className="text-foreground/70 font-perandory text-lg tracking-wide">
                Join the largest cultural fest.
              </p>
            </div>

            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8">
              {/* Type Selection Tabs */}
              <div className="flex p-1 bg-black/20 rounded-xl mb-8">
                <button
                  onClick={() => {
                      setRegistrationType("solo");
                      // Reset event selection when switching types to avoid invalid state
                      setFormData(prev => ({ ...prev, eventName: "" }));
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-perandoryCondensed tracking-wider ${
                    registrationType === "solo"
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Individual
                </button>
                <button
                  onClick={() => {
                      setRegistrationType("team");
                      // Reset event selection when switching types
                      setFormData(prev => ({ ...prev, eventName: "" }));
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all font-perandoryCondensed tracking-wider ${
                    registrationType === "team"
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Team
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Event Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium pl-1 font-perandory tracking-wide">Event</label>
                    <select
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none text-white font-perandory"
                    >
                      <option value="" className="bg-black">Select Event...</option>
                      {filteredEvents.map((e) => (
                        <option key={e.id} value={e.name} className="bg-black">{e.name}</option>
                      ))}
                    </select>
                    {errors.eventName && <p className="text-red-500 text-xs pl-1">{errors.eventName}</p>}
                </div>

                {/* Solo Fields */}
                {registrationType === "solo" && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium pl-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none"
                        />
                         {errors.fullName && <p className="text-red-500 text-xs pl-1">{errors.fullName}</p>}
                    </div>
                )}

                {/* Team Fields */}
                {registrationType === "team" && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium pl-1">Team Name</label>
                            <input
                                type="text"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleChange}
                                placeholder="Rockstars"
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none"
                            />
                            {errors.teamName && <p className="text-red-500 text-xs pl-1">{errors.teamName}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium pl-1">Team Leader</label>
                            <input
                                type="text"
                                name="teamLeader"
                                value={formData.teamLeader}
                                onChange={handleChange}
                                placeholder="Leader Name"
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none"
                            />
                            {errors.teamLeader && <p className="text-red-500 text-xs pl-1">{errors.teamLeader}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium pl-1">Team Members</label>
                                <Button type="button" size="sm" variant="ghost" onClick={addMember} className="h-6 text-xs text-accent">
                                    <Plus className="w-3 h-3 mr-1" /> Add Member
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {formData.teamMembers.map((member, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={member}
                                            onChange={(e) => handleMemberChange(index, e.target.value)}
                                            placeholder={`Member ${index + 1}`}
                                            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none text-sm"
                                        />
                                        {formData.teamMembers.length > 1 && (
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-white/40 hover:text-red-500"
                                                onClick={() => removeMember(index)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {errors.teamMembers && <p className="text-red-500 text-xs pl-1">{errors.teamMembers}</p>}
                            {/* Check individual member errors from Zod path teamMembers.0 etc */}
                        </div>
                    </div>
                )}

                {/* Payment Fields (Common) */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                     <h3 className="font-bebas text-lg opacity-80">Payment Details</h3>
                     <div className="space-y-2">
                        <label className="text-sm font-medium pl-1">Transaction ID</label>
                        <input
                            type="text"
                            name="transactionUid"
                            value={formData.transactionUid}
                            onChange={handleChange}
                            placeholder="UPI/Bank Transaction ID"
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none"
                        />
                         {errors.transactionUid && <p className="text-red-500 text-xs pl-1">{errors.transactionUid}</p>}
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium pl-1">Screenshot</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-border/50 focus:border-accent outline-none file:bg-accent file:text-accent-foreground file:border-0 file:rounded-md file:mr-4 file:px-2 file:text-sm"
                        />
                         {errors.paymentScreenshot && <p className="text-red-500 text-xs pl-1">{errors.paymentScreenshot}</p>}
                    </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                  Submit Registration
                </Button>

              </form>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Register;
