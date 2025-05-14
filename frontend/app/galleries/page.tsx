import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GalleriesPage() {
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
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Explore Galleries</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search galleries..." className="pl-8 w-full" />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="newyork">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Link href={`/galleries/${i + 1}`} key={i} className="group">
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=450&width=800&text=Gallery%20${i + 1}`}
                      alt={`Gallery ${i + 1}`}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {i % 3 === 0 && (
                      <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{`Modern Art Gallery ${i + 1}`}</h3>
                    <p className="text-sm text-gray-500">
                      {["New York, NY", "London, UK", "Paris, France", "Tokyo, Japan", "Berlin, Germany"][i % 5]}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10} artworks</span>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 20) + 5} artists</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="mx-1">
              ...
            </Button>
            <Button variant="outline" className="mx-1">
              10
            </Button>
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
