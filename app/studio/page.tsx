'use client';

import React, { useEffect, useState } from "react";
import { Upload, Wand2, Home as HomeIcon, Palette as PaletteIcon, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// The new vibrant palette is added as the first option.
const colorOptions = [
  { value: "vibrant_pop", label: "Vibrant Pop", colors: ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"] },
  { value: "scandinavian_minimal", label: "Scandinavian Minimal", colors: ["#FFFFFF", "#F8F8F8", "#E0E0E0", "#A9A9A9", "#333333"] },
  { value: "boho_chic", label: "Boho Chic", colors: ["#DEB887", "#FF7F50", "#DAA520", "#8FBC8F", "#483D8B"] },
  { value: "coastal_vibes", label: "Coastal Vibes", colors: ["#ADD8E6", "#B0E0E6", "#AFEEEE", "#F0FFFF"] },
  { value: "earthy_tones", label: "Earthy Tones", colors: ["#A0522D", "#8B4513", "#D2691E", "#CD853F"] },
  { value: "pastel_dream", label: "Pastel Dream", colors: ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#B0E0E6"] },
];

export default function StudioPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRoomImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRoomImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div className="md:h-screen bg-gray-100 p-2 sm:p-4">
      <div className="bg-white rounded-xl w-full md:h-full shadow-sm border border-gray-100">
        <div className="md:h-full rounded-xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-2 sm:p-4 md:p-8 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto">
            <Card className="w-full overflow-hidden border border-gray-200/80 shadow-xl bg-white/95 backdrop-blur-lg rounded-2xl relative">
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8338ec]/5 via-[#ff006e]/5 to-[#3a86ff]/5 opacity-50" />
                <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-[#8338EC] via-[#FF006E] to-[#FFBE0B]" />
              </div>
              
              <CardContent className="p-6 sm:p-8 md:p-10 relative">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#8338EC] to-[#FF006E] text-transparent bg-clip-text mb-2">
                    Design Your Space
                  </h2>
                  <p className="text-gray-500 text-base sm:text-lg">
                    Fill in the details below and let our AI create your perfect room.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column - Room Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
                        <HomeIcon className="w-6 h-6 text-[#8338EC]" />
                        Room Details
                        <span className="text-[#FF006E] ml-1 text-lg">*</span>
                      </h3>

                      <div className="space-y-5">
                        <div>
                          <label htmlFor="roomType" className="block text-sm font-medium text-gray-600 mb-1.5">Room Type</label>
                          <Select>
                            <SelectTrigger id="roomType" className="w-full h-12 bg-gray-50/80 border-gray-200 rounded-lg text-sm font-medium hover:border-[#8338EC]/50 transition-all duration-200 focus:ring-2 focus:ring-[#8338EC]/50 focus:border-[#8338EC] focus:bg-white">
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg border-gray-200 shadow-xl bg-white/80 backdrop-blur-md">
                              {['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Home Office', 'Dining Room', 'Kids Room', 'Nursery'].map(room => (
                                <SelectItem key={room.toLowerCase().replace(' ', '')} value={room.toLowerCase().replace(' ', '')} className="rounded-md text-sm hover:bg-gray-100 focus:bg-gray-100 cursor-pointer">
                                  {room}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1.5">Upload Image</label>
                          <div
                            className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[200px] group
                              ${isDragging ? 'border-[#8338EC] bg-[#8338EC]/10 ring-2 ring-[#8338EC]/30' : 'border-gray-300 hover:border-gray-400/80'}
                              ${roomImage ? 'border-[#8338EC]/50 bg-gray-50/50' : 'bg-gray-50/50 hover:bg-gray-100/50'}`}
                            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                            {roomImage ? (
                              <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <img src={roomImage} alt="Room preview" className="max-h-32 w-auto object-contain rounded-md shadow-sm" />
                                <Button variant="ghost" size="sm" onClick={() => setRoomImage(null)} className="absolute top-1 right-1 h-7 w-7 p-0 bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-[#FF006E] transition-colors">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <ImageIcon className={`h-10 w-10 mb-2 transition-colors duration-300 ${isDragging ? 'text-[#8338EC]' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                  Drag & drop image
                                </p>
                                <p className="text-xs text-gray-500 mb-2">or</p>
                                <input type="file" accept="image/*" className="hidden" id="room-image-input" onChange={handleImageUpload} />
                                <label htmlFor="room-image-input" className="px-4 py-1.5 bg-gray-200/80 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300/80 transition-all duration-200 font-medium text-xs">
                                  Browse
                                </label>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Style Preferences */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2.5">
                        <PaletteIcon className="w-6 h-6 text-[#FF006E]" />
                        Style Preferences
                      </h3>

                      <div className="space-y-5">
                        <div>
                          <label htmlFor="roomTheme" className="block text-sm font-medium text-gray-600 mb-1.5">Theme <span className="text-xs text-gray-400 font-normal">(Optional)</span></label>
                          <Select>
                            <SelectTrigger id="roomTheme" className="w-full h-12 bg-gray-50/80 border-gray-200 rounded-lg text-sm font-medium hover:border-[#FF006E]/50 transition-all duration-200 focus:ring-2 focus:ring-[#FF006E]/50 focus:border-[#FF006E] focus:bg-white">
                              <SelectValue placeholder="Choose a theme" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg border-gray-200 shadow-xl bg-white/80 backdrop-blur-md">
                              {['Modern', 'Minimalist', 'Scandinavian', 'Industrial', 'Bohemian', 'Coastal', 'Mid-Century Modern'].map(theme => (
                                <SelectItem key={theme.toLowerCase().replace(' ', '')} value={theme.toLowerCase().replace(' ', '')} className="rounded-md text-sm hover:bg-gray-100 focus:bg-gray-100 cursor-pointer">
                                  {theme}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="colorPalette" className="block text-sm font-medium text-gray-600 mb-1.5">Color Palette <span className="text-xs text-gray-400 font-normal">(Optional)</span></label>
                          <Select>
                            <SelectTrigger id="colorPalette" className="w-full h-12 bg-gray-50/80 border-gray-200 rounded-lg text-sm font-medium hover:border-[#FF006E]/50 transition-all duration-200 focus:ring-2 focus:ring-[#FF006E]/50 focus:border-[#FF006E] focus:bg-white">
                              <SelectValue placeholder="Select color palette" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg border-gray-200 shadow-xl bg-white/80 backdrop-blur-md max-h-72">
                              {colorOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="rounded-md text-sm hover:bg-gray-100 focus:bg-gray-100 cursor-pointer py-2">
                                  <div className="flex items-center justify-between w-full">
                                    <span>{option.label}</span>
                                    <div className="flex gap-1 ml-3">
                                      {option.colors.map((color, index) => (
                                        <div key={index} className="w-4 h-4 rounded-full border border-gray-300/50 shadow-sm" style={{ backgroundColor: color }} />
                                      ))}
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-600 mb-1.5">Instructions <span className="text-xs text-gray-400 font-normal">(Optional)</span></label>
                          <Textarea id="additionalInstructions" placeholder="e.g., 'Add lots of plants', 'I prefer gold accents'..." className="min-h-[108px] bg-gray-50/80 border-gray-200 rounded-lg text-sm resize-none hover:border-[#FF006E]/50 transition-all duration-200 focus:ring-2 focus:ring-[#FF006E]/50 focus:border-[#FF006E] focus:bg-white p-3"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-6 flex justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-[#8338EC] to-[#FF006E] hover:from-[#8338EC]/90 hover:to-[#FF006E]/90 text-white px-8 py-2.5 h-auto text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-100">
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Design
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}