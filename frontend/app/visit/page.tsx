import Link from "next/link"
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VisitPage() {
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
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Visit Us</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src="/placeholder.svg?height=600&width=800&text=Lahinch%20Gallery%20Exterior"
                  alt="Lahinch Art Gallery exterior"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="prose max-w-none">
                <p>
                  Located in the heart of Lahinch, our gallery showcases the work of talented artists from the West of
                  Ireland and beyond. Our intimate space provides the perfect setting to experience art that captures
                  the unique spirit and landscape of this beautiful region.
                </p>
                <p>
                  We pride ourselves on creating a welcoming atmosphere for art enthusiasts of all levels. Our
                  knowledgeable staff are always available to provide information about the artworks and artists we
                  represent.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" /> Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt>Monday</dt>
                      <dd>Closed</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Tuesday - Friday</dt>
                      <dd>10:00 AM - 5:00 PM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Saturday</dt>
                      <dd>11:00 AM - 5:00 PM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Sunday</dt>
                      <dd>12:00 PM - 4:00 PM</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" /> Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Lahinch Art Gallery</p>
                  <p>Main Street</p>
                  <p>Lahinch, Co. Clare</p>
                  <p>Ireland</p>
                  <div className="mt-4">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1d3c45] hover:underline"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" /> Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>Phone: +353 (0)65 123 4567</p>
                  <p>Email: info@lahinchgallery.ie</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Getting Here</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>By Car</CardTitle>
                  <CardDescription>Parking available nearby</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Free parking is available on Main Street and in the public car park near the beach, just a 5-minute
                    walk from the gallery.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>By Bus</CardTitle>
                  <CardDescription>Public transport options</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Bus Éireann services connect Lahinch to Ennis, Galway, and Limerick. The gallery is a short walk
                    from the bus stop on Main Street.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>From Shannon Airport</CardTitle>
                  <CardDescription>International visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Shannon Airport is approximately 50 minutes by car. Taxis and car rental services are available at
                    the airport.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 bg-[#eeebd3] rounded-lg p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Enhance Your Visit</h2>
              <p className="mb-6">
                Subscribe to our digital content service to access exclusive artist interviews, audio guides, and videos
                that will deepen your appreciation of the artworks on display.
              </p>
              <Link href="/pricing">
                <Button className="bg-[#1d3c45] hover:bg-[#152b32]">View Subscription Plans</Button>
              </Link>
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
