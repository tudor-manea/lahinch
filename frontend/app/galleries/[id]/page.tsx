import Link from "next/link"
import { ArrowLeft, MapPin, Play, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage({ params }: { params: { id: string } }) {
  const galleryId = params.id

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-lg">ArtInsight</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/galleries" className="text-sm font-medium hover:underline underline-offset-4">
            Galleries
          </Link>
          <Link href="/artworks" className="text-sm font-medium hover:underline underline-offset-4">
            Artworks
          </Link>
          <Link href="/artists" className="text-sm font-medium hover:underline underline-offset-4">
            Artists
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
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
        <div className="container px-4 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/galleries">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Gallery Profile</h1>
          </div>

          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-lg mb-8">
            <img
              src={`/placeholder.svg?height=600&width=1400&text=Gallery%20${galleryId}%20Banner`}
              alt={`Gallery ${galleryId} Banner`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{`Modern Art Gallery ${galleryId}`}</h2>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {
                    ["New York, NY", "London, UK", "Paris, France", "Tokyo, Japan", "Berlin, Germany"][
                      Number.parseInt(galleryId) % 5
                    ]
                  }
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="current">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="current">Current Exhibition</TabsTrigger>
              <TabsTrigger value="artworks">Artworks</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="info">Information</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-video overflow-hidden rounded-lg mb-4">
                    <img
                      src={`/placeholder.svg?height=600&width=800&text=Exhibition`}
                      alt="Current Exhibition"
                      className="object-cover w-full h-full"
                    />
                  </div>
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
                      Exhibition Tour: Contemporary Visions
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 italic mt-2">
                    Subscribe to access the full exhibition tour and exclusive content.
                  </div>
                  <Button className="mt-2">Subscribe for Full Access</Button>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Contemporary Visions</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>June 1 - August 30, 2023</span>
                    <span className="mx-2">•</span>
                    <span>Curated by Jane Smith</span>
                  </div>
                  <div className="prose max-w-none mb-6">
                    <p>
                      "Contemporary Visions" brings together works by emerging and established artists who are pushing
                      the boundaries of their respective mediums. The exhibition explores themes of identity,
                      technology, and the environment through a diverse range of artistic practices.
                    </p>
                    <p>
                      Visitors will encounter paintings, sculptures, digital art, and installations that challenge
                      conventional notions of art-making and invite viewers to reconsider their relationship to the
                      world around them.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Featured Artists</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Link
                          key={i}
                          href={`/artists/${i + 1}`}
                          className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
                        >
                          Artist Name {i + 1}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="artworks" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Link href={`/artworks/${i + 1}`} key={i} className="group">
                    <div className="overflow-hidden rounded-lg">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=400&width=400&text=Artwork%20${i + 1}`}
                          alt={`Artwork ${i + 1}`}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-sm">{`Untitled #${i + 1}`}</h3>
                      <p className="text-xs text-gray-500">Artist Name {(i % 5) + 1}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Artworks</Button>
              </div>
            </TabsContent>
            <TabsContent value="artists" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Link href={`/artists/${i + 1}`} key={i} className="group">
                    <div className="overflow-hidden rounded-lg">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=400&width=400&text=Artist%20${i + 1}`}
                          alt={`Artist ${i + 1}`}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium text-sm">{`Artist Name ${i + 1}`}</h3>
                      <p className="text-xs text-gray-500">
                        {["Contemporary", "Abstract", "Figurative", "Minimalist", "Surrealist"][i % 5]} Artist
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Artists</Button>
              </div>
            </TabsContent>
            <TabsContent value="info" className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">About the Gallery</h3>
                  <div className="prose max-w-none mb-6">
                    <p>
                      Modern Art Gallery {galleryId} is a leading contemporary art space dedicated to showcasing
                      innovative and thought-provoking work by artists from around the world. Founded in 2005, the
                      gallery has established itself as a vital platform for emerging and mid-career artists working
                      across a range of media.
                    </p>
                    <p>
                      Our exhibition program features solo and group shows that engage with current artistic and
                      cultural discourse. We are committed to supporting artists who push the boundaries of their
                      practice and challenge conventional notions of art-making.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Address:</span> 123 Art Street,{" "}
                        {
                          ["New York, NY", "London, UK", "Paris, France", "Tokyo, Japan", "Berlin, Germany"][
                            Number.parseInt(galleryId) % 5
                          ]
                        }
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> +1 (555) 123-4567
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> info@modernartgallery{galleryId}.com
                      </p>
                      <p>
                        <span className="font-medium">Website:</span> www.modernartgallery{galleryId}.com
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Hours & Admission</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold">Opening Hours</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Monday</span>
                          <span>Closed</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Tuesday - Friday</span>
                          <span>10:00 AM - 6:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Saturday - Sunday</span>
                          <span>11:00 AM - 5:00 PM</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold">Admission</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>General</span>
                          <span>$15</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Students & Seniors</span>
                          <span>$10</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Members</span>
                          <span>Free</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Children under 12</span>
                          <span>Free</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-gray-500">Gallery Map</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 italic mt-2">
                    Subscribe to access interactive gallery maps and floor plans.
                  </div>
                  <Button className="mt-2">Subscribe for Full Access</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Upcoming Exhibitions</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=400&width=600&text=Exhibition%20${i + 1}`}
                      alt={`Exhibition ${i + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-1">
                      {["New Perspectives", "Digital Frontiers", "Material Matters"][i]}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {
                        [
                          "September 15 - November 30, 2023",
                          "December 10, 2023 - February 28, 2024",
                          "March 15 - May 30, 2024",
                        ][i]
                      }
                    </p>
                    <p className="text-sm">
                      {
                        [
                          "A group exhibition featuring emerging artists exploring themes of identity and perception.",
                          "An exhibition showcasing innovative digital art and new media works.",
                          "A focused look at artists who are pushing the boundaries of traditional materials.",
                        ][i]
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2025 ArtInsight. All rights reserved.</p>
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
