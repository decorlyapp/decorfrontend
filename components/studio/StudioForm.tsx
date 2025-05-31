'use client';

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDropzone } from 'react-dropzone';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/ui/form-section";
import { fadeIn, slideUp, staggerContainer, buttonHover, buttonTap } from "@/lib/animations";
import { ROOM_TYPES, ROOM_THEMES } from "@/lib/constants";
import { Sparkles, Upload } from "lucide-react";

const formSchema = z.object({
  room_type: z.string().min(1, { message: "Room type is required" }),
  room_theme: z.string().optional(),
  additional_instruction: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function StudioForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_type: "",
      room_theme: "",
      additional_instruction: "",
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Accepted files:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    alert("Form submitted successfully!");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="border-0 shadow-xl overflow-hidden gradient-border">
        <div className="h-2 bg-gradient-to-r from-[#FFBE0B] via-[#FF006E] to-[#3A86FF]"></div>
        <CardHeader className="pb-6 pt-8">
          <CardTitle className="text-3xl font-bold studio-gradient-text">Design Your Space</CardTitle>
          <CardDescription className="text-lg mt-2">
            Create your perfect room design by providing the details below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div variants={staggerContainer}>
                <FormSection title="Room Details" required>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="room_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="studio-input">
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                              <SelectContent>
                                {ROOM_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel>Room Image</FormLabel>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                          ${isDragActive ? 'border-[#8338EC] bg-[#8338EC]/10' : 'border-gray-300 hover:border-[#8338EC]'}`}
                      >
                        <input {...getInputProps()} />
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        {isDragActive ? (
                          <p className="text-lg text-[#8338EC]">Drop your image here</p>
                        ) : (
                          <div>
                            <p className="text-lg mb-2">Drag & drop your room image here</p>
                            <p className="text-sm text-gray-500">or click to select a file</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Style Preferences">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="room_theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Theme (Optional)</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="studio-input">
                                <SelectValue placeholder="Select a theme" />
                              </SelectTrigger>
                              <SelectContent>
                                {ROOM_THEMES.map((theme) => (
                                  <SelectItem key={theme.value} value={theme.value}>
                                    {theme.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additional_instruction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific preferences or requirements..."
                              className="min-h-[120px] studio-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>
              </motion.div>

              <motion.div
                className="flex justify-end mt-8"
                variants={slideUp}
              >
                <motion.div
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#8338EC] to-[#3A86FF] text-white px-8 py-6 text-lg font-medium"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Design
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}