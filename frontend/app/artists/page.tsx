import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"

export default function ArtistsPage() {
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
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Our Artists</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search artists..." className="pl-8 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Sarah O'Connor",
                featured: true,
                works: 12,
              },
              {
                id: 2,
                name: "Michael Byrne",
                featured: false,
                works: 8,
              },
              {
                id: 3,
                name: "Aoife Kelly",
                featured: true,
                works: 15,
              },
              {
                id: 4,
                name: "John Doyle",
                featured: false,
                works: 10,
              },
              {
                id: 5,
                name: "Emma Walsh",
                featured: false,
                works: 7,
              },
              {
                id: 6,
                name: "Patrick Murphy",
                featured: true,
                works: 9,
              },
            ].map((artist) => (
              <Link href={`/artists/${artist.id}`} key={artist.id} className="group">
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=600&width=450&text=${encodeURIComponent(artist.name)}`}
                      alt={artist.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {artist.featured && (
                      <div className="absolute top-2 right-2 bg-[#d1ac00] text-black text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{artist.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">{artist.works} works in gallery</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
