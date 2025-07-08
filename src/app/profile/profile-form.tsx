"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const interests = [
  { id: "ai", label: "Artificial Intelligence" },
  { id: "saas", label: "SaaS & Cloud Computing" },
  { id: "vc", label: "Venture Capital & Funding" },
  { id: "ux", label: "UX/UI Design" },
  { id: "dev", label: "Software Development" },
  { id: "pm", label: "Product Management" },
];

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().optional(),
  title: z.string().optional(),
  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one interest.",
  }),
  goals: z.string().max(300, { message: "Goals cannot exceed 300 characters." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "Alex Doe",
  company: "AIxMeet Inc.",
  title: "AI Enthusiast",
  interests: ["ai", "dev"],
  goals: "I want to connect with other AI developers and find potential collaborators for a new project on ethical AI.",
};

export function ProfileForm() {
    const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });
//Data from ProfileForm
  // function onSubmit(data: ProfileFormValues) {
  //   toast({
  //       title: "Profile Updated!",
  //       description: "Your information has been saved successfully.",
  //   })
  //   console.log(data);
  // }
  // inside ProfileForm component
async function onSubmit(data: ProfileFormValues) {
  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    toast({
      title: 'Profile Updated!',
      description: 'Your information has been saved successfully.',
    });
  } else {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Something went wrong while saving your profile.',
    });
  }

  console.log(await res.json());
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Your Interests</FormLabel>
                <FormDescription>
                  Select the topics you are most interested in.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="interests"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Goals</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What do you hope to achieve at this event?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will help us recommend relevant sessions and people.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}
