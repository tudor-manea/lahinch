"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewMedia() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaType, setMediaType] = useState<"video" | "audio">("video")
  const [relatedTo, setRelatedTo] = useState<"artist" | "artwork">("artist")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to media list
    window.location.href = "/admin/media"
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/media">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Premium Media</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Media Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" placeholder="Enter media title" required />
              </div>
              
              <div className="space-y-2">
                <Label>Media Type *</Label>
                <RadioGroup 
                  defaultValue="video" 
                  className="flex gap-4"
                  onValueChange={(value) => setMediaType(value as "video" | "audio")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="audio" id="audio" />
                    <Label htmlFor="audio">Audio</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Related To *</Label>
                <RadioGroup 
                  defaultValue="artist" 
                  className="flex gap-4"
                  onValueChange={(value) => setRelatedTo(value as "artist" | "artwork")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="artist" id="artist" />
                    <Label htmlFor="artist">Artist</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="artwork" id="artwork" />
                    <Label htmlFor="artwork">Artwork</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="related">
                  {relatedTo === "artist" ? "Select Artist *" : "Select Artwork *"}
                </Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      relatedTo === "artist" ? "Select artist" : "Select artwork"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {relatedTo === "artist" ? (
                      <>
                        <SelectItem value="1">Sarah O'Connor</SelectItem>
                        <SelectItem value="2">Michael Byrne</SelectItem>
                        <SelectItem value="3">Aoife Kelly</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="1">Cliffs of Moher</SelectItem>
                        <SelectItem value="2">Atlantic Waves</SelectItem>
                        <SelectItem value="3">Burren Landscape</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter media description" 
                  className="min-h-[120px]" 
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {mediaType === "video" ? "Upload Video" : "Upload Audio"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">
                Drag and drop {mediaType === "video" ? "a video" : "an audio"} file, or click to browse
              </p>
              <p className="text-xs text-gray-400">
                {mediaType === "video" 
                  ? "Supported formats: MP4, MOV, WebM. Max file size: 500MB"
                  : "Supported formats: MP3, WAV, AAC. Max file size: 100MB"
                }
              </p>
              <Input 
                type="file" 
                accept={mediaType === "video" ? "video/*" : "audio/*"} 
                className="hidden" 
                id="media-file" 
                required
              />
              <Label 
                htmlFor="media-file" 
                className="mt-4 cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Select File
              </Label>
            </div>
            
            <div className="mt-6">
              <Label htmlFor="thumbnail" className="mb-2 block">Thumbnail Image (for videos)</Label>
              <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="thumbnail" 
                  disabled={mediaType !== "video"}
                />
                <Label 
                  htmlFor="thumbnail" 
                  className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-
