import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
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
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
          <MobileNav />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#1d3c45] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                  Discover the Art of the West of Ireland
                </h1>
                <p className="max-w-[600px] text-gray-300 text-base md:text-xl">
                  Lahinch Art Gallery brings you intimate insights from local and international artists. Experience
                  their stories through videos, audio, and text.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/artworks">
                    <Button size="lg" className="w-full sm:w-auto bg-[#d1ac00] text-black hover:bg-[#b89700]">
                      Explore Artworks
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-white text-white bg-black/30 hover:bg-white/10"
                    >
                      View Subscription Plans
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d1ac00]/20 to-[#1d3c45]/20" />
                <img
                  src="/placeholder.svg?height=720&width=1280&text=Lahinch%20Gallery"
                  alt="Lahinch Art Gallery interior"
                  className="object-cover w-full h-full"
                />
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
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#eeebd3] px-3 py-1 text-sm">Our Gallery</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Celebrating Art of the West of Ireland
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  For over 25 years, our gallery has curated a unique collection of art that captures the spirit and
                  beauty of the West of Ireland.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eeebd3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"></path>
                    <path d="M6 11v-4a6 6 0 0 1 12 0v4"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Artist Insights</h3>
                  <p className="text-gray-500">
                    Hear directly from artists about their inspiration, techniques, and the stories behind their work.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eeebd3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Multimedia Content</h3>
                  <p className="text-gray-500">
                    Explore videos, audio guides, and detailed text descriptions that enhance your understanding of each
                    piece.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#eeebd3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="m7.5 4.27 9 5.15"></path>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Local Inspiration</h3>
                  <p className="text-gray-500">
                    Discover how the stunning landscapes and rich culture of the West of Ireland influence our artists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#eeebd3]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Artworks</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore some of our current collection highlighting the beauty of the West of Ireland.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((artwork) => (
                <div key={artwork} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <Link href={`/artworks/${artwork}`}>
                    <div className="aspect-[3/4] w-full overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=600&width=450&text=Artwork%20${artwork}`}
                        alt={`Artwork ${artwork}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="text-xl font-bold">Coastal Serenity {artwork}</h3>
                      <p className="text-sm text-gray-200">by Sarah O'Connor</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/artworks">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1d3c45] text-[#1d3c45] hover:bg-[#1d3c45] hover:text-white"
                >
                  View All Artworks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=720&width=720&text=West%20of%20Ireland"
                  alt="West of Ireland landscape"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[#eeebd3] px-3 py-1 text-sm">Our Location</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    The Heart of the Wild Atlantic Way
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Nestled in the charming coastal town of Lahinch, our gallery draws inspiration from the dramatic
                    landscapes and rich cultural heritage of County Clare.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeebd3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>Main Street, Lahinch, Co. Clare, Ireland</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeebd3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>+353 (0)65 123 4567</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeebd3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div>info@lahinchgallery.ie</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/visit">
                    <Button size="lg" className="w-full sm:w-auto bg-[#1d3c45] hover:bg-[#152b32]">
                      Plan Your Visit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#eeebd3]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Artists</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the talented individuals whose work brings the spirit of Ireland to life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((artist) => (
                <Link href={`/artists/${artist}`} key={artist} className="group">
                  <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=600&width=450&text=Artist%20${artist}`}
                        alt={`Artist ${artist}`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{`${
                        ["Sarah O'Connor", "Michael Byrne", "Aoife Kelly"][artist - 1]
                      }`}</h3>
                      <p className="text-sm text-gray-500">
                        {["Landscape Painter", "Sculptor", "Mixed Media Artist"][artist - 1]}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 15) + 5} works in gallery
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/artists">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1d3c45] text-[#1d3c45] hover:bg-[#1d3c45] hover:text-white"
                >
                  View All Artists
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=720&width=720&text=Subscription%20Plans"
                  alt="Subscription plans"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[#eeebd3] px-3 py-1 text-sm">Premium Access</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Unlock the Full Experience
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Subscribe to access exclusive content from our artists, including in-depth interviews, studio tours,
                    and creative process videos.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeebd3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>Full access to artist interviews and commentary</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeebd3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>Exclusive video content and studio tours</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eeebd3]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>Audio guides explaining techniques and inspiration</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/pricing">
                    <Button size="lg" className="w-full sm:w-auto bg-[#d1ac00] text-black hover:bg-[#b89700]">
                      View Subscription Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#eeebd3]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Visitors Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from art lovers who have experienced our gallery and subscription service.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Mary Connolly",
                  location: "Dublin",
                  quote:
                    "The subscription service has allowed me to stay connected to the West of Ireland art scene even when I can't visit. The artist interviews are fascinating!",
                },
                {
                  name: "John Fitzgerald",
                  location: "Galway",
                  quote:
                    "As a regular visitor to Lahinch, I love being able to learn more about the artists whose work I've admired in the gallery. The audio guides add so much depth.",
                },
                {
                  name: "Emma Walsh",
                  location: "Cork",
                  quote:
                    "The passion for art and the West of Ireland shines through in every aspect of the gallery. Their curation is thoughtful and the multimedia content is excellent.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col justify-between rounded-lg border bg-white p-6 shadow-sm">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-gray-300"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                    <p className="mt-4 text-lg">{testimonial.quote}</p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="rounded-full bg-gray-100 p-1">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1d3c45] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Enhance Your Art Experience?
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community of art lovers and discover the stories behind the beautiful works in our gallery.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-[#d1ac00] text-black hover:bg-[#b89700]">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white bg-black/30 hover:bg-white/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
