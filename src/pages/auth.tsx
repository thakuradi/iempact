import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Ticket, Star, Sparkles, Wand2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import carnivalBg from "/pact.png";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Please show a valid ticket (email)." }),
  password: z.string().min(6, { message: "Secret code must be at least 6 characters." }),
  name: z.string().optional(),
});

const carnivalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Rye&display=swap');

  :root {
    /* Carnival Palette */
    --background: 40 50% 96%;
    --foreground: 222 47% 11%;
    --card: 40 60% 98%;
    --card-foreground: 222 47% 11%;
    --popover: 40 60% 98%;
    --popover-foreground: 222 47% 11%;
    --primary: 354 78% 48%;
    --primary-foreground: 40 50% 96%;
    --secondary: 45 93% 47%;
    --secondary-foreground: 222 47% 11%;
    --muted: 40 20% 90%;
    --muted-foreground: 222 20% 40%;
    --accent: 45 93% 47%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 45 93% 47%;
    --input: 45 50% 80%;
    --ring: 354 78% 48%;
    
    --radius: 0.5rem;
    --radius-md: calc(var(--radius) - 2px);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) + 4px);

    --font-sans: 'Roboto Slab', serif;
    --font-display: 'Rye', serif;
    
    /* Mappings for Tailwind */
    --color-background: hsl(var(--background));
    --color-foreground: hsl(var(--foreground));
    --color-card: hsl(var(--card));
    --color-card-foreground: hsl(var(--card-foreground));
    --color-popover: hsl(var(--popover));
    --color-popover-foreground: hsl(var(--popover-foreground));
    --color-primary: hsl(var(--primary));
    --color-primary-foreground: hsl(var(--primary-foreground));
    --color-secondary: hsl(var(--secondary));
    --color-secondary-foreground: hsl(var(--secondary-foreground));
    --color-muted: hsl(var(--muted));
    --color-muted-foreground: hsl(var(--muted-foreground));
    --color-accent: hsl(var(--accent));
    --color-accent-foreground: hsl(var(--accent-foreground));
    --color-destructive: hsl(var(--destructive));
    --color-destructive-foreground: hsl(var(--destructive-foreground));
    --color-border: hsl(var(--border));
    --color-input: hsl(var(--input));
    --color-ring: hsl(var(--ring));

    --animate-accordion-down: accordion-down 0.2s ease-out;
    --animate-accordion-up: accordion-up 0.2s ease-out;
  }

  .dark {
    --background: 222 47% 11%;
    --foreground: 40 50% 96%;
    --card: 222 40% 15%;
    --card-foreground: 40 50% 96%;
    --popover: 222 40% 15%;
    --popover-foreground: 40 50% 96%;
    --primary: 354 78% 48%;
    --primary-foreground: 40 50% 96%;
    --secondary: 45 93% 47%;
    --secondary-foreground: 222 47% 11%;
    --muted: 222 30% 20%;
    --muted-foreground: 215 20% 65%;
    --accent: 45 93% 47%;
    --accent-foreground: 222 47% 11%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 45 50% 30%;
    --input: 222 30% 25%;
    --ring: 354 78% 48%;
  }

  @keyframes accordion-down {
    from { height: 0; }
    to { height: var(--radix-accordion-content-height); }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height); }
    to { height: 0; }
  }
  
  body, .font-sans {
    font-family: var(--font-sans) !important;
  }
  .font-display {
    font-family: var(--font-display) !important;
  }
`;

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(()=>{
    const checkToken = async () => {
      if(localStorage.getItem("token")){
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_BACKENDURL}/auth/checkToken`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },  
        });
        const data = await response.json();
        if (data.valid) {
          navigate("/register");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    }
    };
    checkToken();
  },[])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // If 'name' is present and not empty, treat as Sign Up
      const isSignUp = !!values.name; 
      const endpoint = isSignUp ? "/auth/signup" : "/auth/signin";
      const url = `${import.meta.env.VITE_LOCAL_BACKENDURL}${endpoint}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: isSignUp ? "Welcome to the Carnival!" : "Welcome Back!",
          description: isSignUp ? "Your ticket has been printed. Step right in!" : "Good to see you again.",
          className: "bg-primary text-primary-foreground border-gold-500",
        });
        console.log("Success:", data);
        if(isSignUp){
        localStorage.setItem("token", data.token);
        }
        navigate("/register");
      } else {
        toast({
          title: "Entry Denied",
          description: data.message || data.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Connection Error",
        description: "Could not reach the ticket booth (server).",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background font-sans">
      <style>{carnivalStyles}</style>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 
        bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${carnivalBg})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t 
      from-black/80 via-black/40 to-black/20" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Ticket Shape Container */}
        <div className="relative bg-card 
        text-card-foreground rounded-xl shadow-2xl 
        overflow-hidden border-4 border-double border-secondary/50">
          
          {/* Ticket "Punch" Holes - Decorative */}
          <div className="absolute -left-3 top-1/2 
          -translate-y-1/2 w-6 h-6 rounded-full 
          bg-black border-r border-secondary/50" />
          <div className="absolute -right-3 top-1/2 
          -translate-y-1/2 w-6 h-6 rounded-full 
          bg-black border-l border-secondary/50" />

          {/* Ticket Texture Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply" />

          <CardHeader className="text-center pt-8 pb-2 relative 
          border-b-2 border-dashed border-secondary/30">
            <div className="absolute top-0 left-1/2 
            -translate-x-1/2 bg-primary text-primary-foreground 
            px-4 py-1 rounded-b-lg shadow-lg font-display text-sm 
            tracking-widest uppercase">
              Admit One
            </div>
            
            <motion.div 
              initial={{ y: -10 }} 
              animate={{ y: 0 }} 
              className="flex justify-center mb-4 text-primary"
            >
              <Ticket size={48} className="drop-shadow-sm" />
            </motion.div>
            
            <CardTitle className="text-4xl font-display text-primary drop-shadow-md tracking-wide">
              The Grand Fair
            </CardTitle>
            <CardDescription className="font-serif italic text-lg text-muted-foreground mt-2">
              Step right up for the show of a lifetime!
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 px-8 pb-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-lg border border-secondary/20">
                <TabsTrigger 
                  value="signin" 
                  className="font-display tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Return Visitor
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="font-display tracking-wide data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all duration-300"
                >
                  New Ticket
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif font-bold text-foreground/80">Email Ticket</FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Input 
                                  placeholder="your@email.com" 
                                  {...field} 
                                  className="border-secondary/30 focus-visible:ring-secondary pl-4 bg-background/50 font-serif" 
                                  data-testid="input-email-signin"
                                />
                                <div className="absolute inset-0 rounded-md ring-1 ring-secondary/0 group-hover:ring-secondary/20 pointer-events-none transition-all" />
                              </div>
                            </FormControl>
                            <FormMessage className="text-primary font-serif italic" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif font-bold text-foreground/80">Secret Code</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                {...field} 
                                className="border-secondary/30 focus-visible:ring-secondary pl-4 bg-background/50 font-serif"
                                data-testid="input-password-signin" 
                              />
                            </FormControl>
                            <FormMessage className="text-primary font-serif italic" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-xl py-6 border-b-4 border-primary/50 active:border-b-0 active:translate-y-1 transition-all shadow-lg hover:shadow-primary/20"
                        disabled={isLoading}
                        data-testid="button-signin"
                      >
                        {isLoading ? <Wand2 className="mr-2 h-5 w-5 animate-spin" /> : <Star className="mr-2 h-5 w-5 fill-current" />}
                        Enter the Fair
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              </TabsContent>

              <TabsContent value="signup" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif font-bold text-foreground/80">Ringmaster Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Greatest Showman" 
                                {...field} 
                                className="border-secondary/30 focus-visible:ring-secondary pl-4 bg-background/50 font-serif"
                                data-testid="input-name-signup" 
                              />
                            </FormControl>
                            <FormMessage className="text-primary font-serif italic" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif font-bold text-foreground/80">Email Ticket</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your@email.com" 
                                {...field} 
                                className="border-secondary/30 focus-visible:ring-secondary pl-4 bg-background/50 font-serif"
                                data-testid="input-email-signup" 
                              />
                            </FormControl>
                            <FormMessage className="text-primary font-serif italic" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-serif font-bold text-foreground/80">Secret Code</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                {...field} 
                                className="border-secondary/30 focus-visible:ring-secondary pl-4 bg-background/50 font-serif"
                                data-testid="input-password-signup" 
                              />
                            </FormControl>
                            <FormMessage className="text-primary font-serif italic" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display text-xl py-6 border-b-4 border-yellow-600/50 active:border-b-0 active:translate-y-1 transition-all shadow-lg hover:shadow-secondary/20"
                        disabled={isLoading}
                        data-testid="button-signup"
                      >
                        {isLoading ? <Wand2 className="mr-2 h-5 w-5 animate-spin" /> : <Ticket className="mr-2 h-5 w-5" />}
                        Print My Ticket
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          {/* Decorative Footer */}
          <div className="bg-muted/30 p-3 text-center border-t border-dashed border-secondary/30">
            <p className="font-display text-xs text-muted-foreground uppercase tracking-widest">
              Valid for one entry • No refunds • Enjoy the ride
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}