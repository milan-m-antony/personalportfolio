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
  // Add honeypot field for Netlify spam detection
  'bot-field': z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;


const ContactForm = () => {
  const { toast } = useToast();
  // Use formState.isSubmitting from react-hook-form
  // const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      'bot-field': '', // Initialize honeypot field
    },
  });

  // Netlify handles the submission, so we don't need a custom onSubmit async function
  // We can use the onSubmit handler primarily for client-side feedback if needed,
  // but often Netlify's default success page is sufficient.
  // For this implementation, we'll keep the toast logic using formState.
  // The actual form submission happens via standard HTML form submission due to Netlify attributes.

  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
       toast({
        title: "Success!",
        description: "Message sent successfully! Thank you.",
        variant: "default",
      });
      form.reset(); // Reset form on successful submission indication
    }
     // Check for submission errors caught by react-hook-form if any custom client logic caused issues
     // Note: Netlify submission errors (like network issues during POST) won't be directly caught here.
     if (form.formState.isSubmitted && !form.formState.isSubmitSuccessful && Object.keys(form.formState.errors).length > 0) {
         toast({
             title: "Error",
             description: "Please check the form for errors.",
             variant: "destructive",
       });
     }
  }, [form.formState.isSubmitSuccessful, form.formState.isSubmitted, form.formState.errors, form.reset, toast]);


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
            <CardTitle className="text-2xl font-semibold text-primary dark:text-foreground">Contact Me</CardTitle>
            <CardDescription className="text-foreground/80 dark:text-foreground/70">
                Have a question or want to work together? Fill out the form below.
            </CardDescription>
            </CardHeader>
            <CardContent>
            {/* Use React Hook Form's Form provider */}
            <Form {...form}>
                 {/* Add Netlify attributes to the form element */}
                <form
                    name="contact" // This name must match the hidden "form-name" input
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field" // Point to the honeypot field
                    onSubmit={form.handleSubmit(() => {
                        // onSubmit logic here is mostly for triggering RHF state updates
                        // The actual POST is handled by Netlify due to the attributes above
                        // We don't need to call an async function like submitContactForm anymore
                        console.log("Form submitted (client-side validation passed)");
                    })}
                    className="space-y-6"
                    >
                    {/* Hidden input for Netlify to identify the form */}
                    <input type="hidden" name="form-name" value="contact" />

                     {/* Honeypot field for spam detection (should be hidden) */}
                      <FormField
                        control={form.control}
                        name="bot-field"
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormLabel>Don’t fill this out if you're human:</FormLabel>
                            <FormControl>
                              <Input {...field} autoComplete="off" />
                            </FormControl>
                          </FormItem>
                        )}
                      />

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
                        disabled={form.formState.isSubmitting} // Use RHF submitting state
                        className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        data-cursor-pointer
                    >
                         {form.formState.isSubmitting ? (
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
