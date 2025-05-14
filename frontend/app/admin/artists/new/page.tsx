"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewArtist() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to artists list
    window.location.href = "/admin/artists"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/artists">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Artist</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Artist Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Enter artist name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty *</Label>
                <Input id="specialty" placeholder="e.g. Landscape Painter" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="e.g. Lahinch, Co. Clare" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="born">Born</Label>
                <Input id="born" placeholder="e.g. 1975, Galway, Ireland" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input id="education" placeholder="e.g. National College of Art and Design, Dublin" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" placeholder="https://" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Biography *</Label>
                <Textarea id="bio" placeholder="Enter artist biography" className="min-h-[120px]" required />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="additionalBio">Additional Biography</Label>
                <Textarea
                  id="additionalBio"
                  placeholder="Enter additional biographical information"
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured">Featured Artist</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Artist Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Drag and drop an image, or click to browse</p>
              <p className="text-xs text-gray-400">Recommended size: 800 × 1000px. Max file size: 5MB</p>
              <Input type="file" accept="image/*" className="hidden" id="artist-image" />
              <Label
                htmlFor="artist-image"
                className="mt-4 cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Select Image
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/artists">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Artist"}
          </Button>
        </div>
      </form>
    </div>
  )
}
