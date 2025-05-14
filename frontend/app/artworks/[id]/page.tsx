import Link from "next/link"
import { ArrowLeft, Heart, Play, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artworkId = params.id

  // Artwork titles based on ID
  const artworkTitles = [
    "Cliffs of Moher",
    "Atlantic Waves",
    "Burren Landscape",
    "Coastal Light",
    "Wild Atlantic",
    "Irish Countryside",
    "Lahinch Beach",
    "Misty Mountains",
    "Emerald Fields",
  ]

  // Artist names based on ID
  const artistNames = ["Sarah O'Connor", "Michael Byrne", "Aoife Kelly"]

  // Medium types based on ID
  const mediumTypes = ["Oil on Canvas", "Sculpture", "Watercolor", "Mixed Media", "Photography"]

  const artworkTitle = artworkTitles[Number(artworkId) - 1] || `Artwork ${artworkId}`
  const artistName = artistNames[(Number(artworkId) - 1) % 3]
  const medium = mediumTypes[(Number(artworkId) - 1) % 5]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-lg">Lahinch Art Gallery</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/artworks" className="text-sm font-medium hover:underline underline-offset-4">
            Artworks
          </Link>
          <Link href="/artists" className="text-sm font-medium hover:underline underline-offset-4">
            Artists
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/visit" className="text-sm font-medium hover:underline underline-offset-4">
            Visit
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/artworks">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Artwork Details</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={`/placeholder.svg?height=800&width=800&text=${encodeURIComponent(artworkTitle)}`}
                  alt={artworkTitle}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{artworkTitle}</h2>
                <p className="text-gray-500">
                  <Link href={`/artists/${((Number(artworkId) - 1) % 3) + 1}`} className="hover:underline">
                    {artistName}
                  </Link>
                  , {2020 + ((Number(artworkId) - 1) % 5)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Medium</p>
                  <p>{medium}</p>
                </div>
                <div>
                  <p className="text-gray-500">Dimensions</p>
                  <p>{medium === "Sculpture" ? "45 × 30 × 25 cm" : "60 × 80 cm"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p>€{Number(artworkId) * 450 + 500}</p>
                </div>
                <div>
                  <p className="text-gray-500">Availability</p>
                  <p>{Number(artworkId) % 2 === 0 ? "Available" : "On Hold"}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <Tabs defaultValue="about">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="artist">Artist Commentary</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="pt-4 space-y-4">
                    <p>
                      This captivating piece draws inspiration from the dramatic landscapes of the West of Ireland.
                      {medium === "Oil on Canvas" &&
                        " The rich textures and bold brushstrokes capture the raw energy and ever-changing light that defines this rugged coastline."}
                      {medium === "Sculpture" &&
                        " The organic forms and natural materials reflect the geological formations found throughout County Clare."}
                      {medium === "Watercolor" &&
                        " The delicate washes and atmospheric quality evoke the misty, ethereal quality of the Irish countryside."}
                      {medium === "Mixed Media" &&
                        " Combining various materials and techniques, this piece explores the layered history and diverse textures of the landscape."}
                      {medium === "Photography" &&
                        " This striking image captures a fleeting moment of extraordinary light and atmosphere along the Wild Atlantic Way."}
                    </p>
                    <p>
                      Created during {artistName}'s exploration of the{" "}
                      {
                        [
                          "Cliffs of Moher",
                          "Lahinch coastline",
                          "Burren region",
                          "Aran Islands",
                          "Loop Head Peninsula",
                        ][Number(artworkId) % 5]
                      }
                      , this artwork represents the artist's deep connection to the natural beauty of County Clare.
                    </p>
                  </TabsContent>
                  <TabsContent value="artist" className="pt-4">
                    <div className="bg-[#eeebd3] rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                        <div>
                          <p className="font-medium">{artistName}</p>
                          <p className="text-sm text-gray-500">
                            Recorded on{" "}
                            {["January 15", "March 22", "June 10", "August 5", "October 18"][Number(artworkId) % 5]},
                            2023
                          </p>
                        </div>
                      </div>
                      <p className="italic">
                        "When creating this piece, I was deeply influenced by the{" "}
                        {
                          ["dramatic cliffs", "powerful ocean", "unique landscape", "changing light", "rich heritage"][
                            Number(artworkId) % 5
                          ]
                        }{" "}
                        of this special part of Ireland. I wanted to capture not just what you see, but what you feel
                        when you're standing there."
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 italic">
                      Subscribe for just €1.99/month to access the full artist commentary and exclusive insights.
                    </div>
                    <Button className="mt-2 bg-[#1d3c45] hover:bg-[#152b32]">Subscribe for €1.99/month</Button>
                  </TabsContent>
                  <TabsContent value="media" className="pt-4">
                    <div className="space-y-4">
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            size="icon"
                            variant="outline"
                            className="w-16 h-16 rounded-full bg-black/50 border-white text-white hover:bg-black/70"
                          >
                            <Play className="h-8 w-8" />
                            <span className="sr-only">Play video</span>
                          </Button>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-2 rounded text-sm">
                          Studio Visit: The Making of {artworkTitle}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 italic">
                        Subscribe for just €1.99/month to access all videos, audio guides, and additional media content.
                      </div>
                      <Button className="bg-[#1d3c45] hover:bg-[#152b32]">Subscribe for €1.99/month</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">More Works by {artistName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Link href={`/artworks/${((Number(artworkId) + i + 1) % 9) + 1}`} key={i} className="group">
                  <div className="overflow-hidden rounded-lg">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=400&width=400&text=${encodeURIComponent(
                          artworkTitles[(Number(artworkId) + i) % 9],
                        )}`}
                        alt={artworkTitles[(Number(artworkId) + i) % 9]}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium text-sm">{artworkTitles[(Number(artworkId) + i) % 9]}</h3>
                    <p className="text-xs text-gray-500">{2020 + (i % 5)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 Lahinch Art Gallery. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
