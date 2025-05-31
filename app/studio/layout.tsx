import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Design Studio',
  description: 'Create beautiful room designs with our AI-powered studio',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-gray-900">
      {children}
    </div>
  );
}