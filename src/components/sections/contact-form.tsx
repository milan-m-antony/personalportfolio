"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

// Define Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

// Placeholder for Server Action
async function submitContactForm(data: FormData): Promise<{ success: boolean; message: string }> {
  console.log("Form data submitted:", data);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate success/failure
  // const success = Math.random() > 0.2; // 80% success rate
  const success = true; // Assume success for now

  if (success) {
    return { success: true, message: "Message sent successfully! Thank you." };
  } else {
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}


const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      toast({
        title: result.success ? "Success!" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
      if (result.success) {
        form.reset(); // Reset form on success
      }
    } catch (error) {
        console.error("Form submission error:", error);
        toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
      });
    } finally {
       setIsSubmitting(false);
    }
  }

  return (
    <SectionWrapper id="contact" title="Get In Touch">
      <motion.div
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.6 }}
       >
        <Card className={cn("max-w-2xl mx-auto glassmorphism")}>
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-primary dark:text-primary-foreground">Contact Me</CardTitle>
            <CardDescription className="text-foreground/80 dark:text-foreground/70">
                Have a question or want to work together? Fill out the form below.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} className="bg-background/70 dark:bg-background/30" data-cursor-pointer />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background/70 dark:bg-background/30" data-cursor-pointer />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                        <Input placeholder="Subject of your message" {...field} className="bg-background/70 dark:bg-background/30" data-cursor-pointer />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Type your message here..." {...field} rows={5} className="bg-background/70 dark:bg-background/30 resize-none" data-cursor-pointer />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    data-cursor-pointer
                >
                     {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                         <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                         </>
                      )}

                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
};

export default ContactForm;
