"use client"

import Link from "next/link"
import { ArrowLeft, Filter, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MobileNav } from "@/components/mobile-nav"

// Mock data for artworks
const ARTWORKS_PER_PAGE = 9
const TOTAL_ARTWORKS = 27 // 3 pages worth of artworks

const allArtworks = Array.from({ length: TOTAL_ARTWORKS }).map((_, i) => {
  const artistIndex = i % 3
  const artistId = (artistIndex + 1).toString()
  const artistNames = ["Sarah O'Connor", "Michael Byrne", "Aoife Kelly"]
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
  const mediums = ["Oil on Canvas", "Sculpture", "Watercolor", "Mixed Media", "Photography"]

  return {
    id: i + 1,
    title: artworkTitles[i % artworkTitles.length],
    artistId,
    artistName: artistNames[artistIndex],
    price: (i + 1) * 450 + 500,
    medium: mediums[i % mediums.length],
    year: 2020 + (i % 5),
    hasVideo: i % 3 === 0,
    hasAudio: i % 4 === 0,
  }
})

export default function ArtworksPage() {
  const router = useRouter()
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [artistFilter, setArtistFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check for URL parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const artistId = params.get("artist")
      const page = params.get("page")

      if (artistId) {
        setArtistFilter(artistId)
      }

      if (page) {
        setCurrentPage(Number.parseInt(page, 10))
      } else {
        setCurrentPage(1) // Default to page 1
      }
    }
  }, [])

  const getArtistNameById = (id: string) => {
    const artistNames = ["Sarah O'Connor", "Michael Byrne", "Aoife Kelly", "John Doyle", "Emma Walsh", "Patrick Murphy"]
    return artistNames[Number.parseInt(id) - 1] || "Unknown Artist"
  }

  // Filter artworks based on current filters
  const filteredArtworks = allArtworks.filter((artwork) => {
    // Filter by artist if artistFilter is set
    if (artistFilter && artwork.artistId !== artistFilter) {
      return false
    }

    // Filter by search query if set
    if (
      searchQuery &&
      !artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !artwork.artistName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredArtworks.length / ARTWORKS_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTWORKS_PER_PAGE
  const paginatedArtworks = filteredArtworks.slice(startIndex, startIndex + ARTWORKS_PER_PAGE)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    // Update URL with new page parameter
    const params = new URLSearchParams(window.location.search)
    params.set("page", page.toString())

    // Keep artist filter if it exists
    if (artistFilter) {
      params.set("artist", artistFilter)
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, "", newUrl)

    // Scroll to top
    window.scrollTo(0, 0)
  }

  // Handle clearing all filters
  const clearAllFilters = () => {
    setArtistFilter(null)
    setSearchQuery("")
    setCurrentPage(1)
    router.push("/artworks")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-lg">Lahinch Art Gallery</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/artworks"
            onClick={(e) => {
              e.preventDefault()
              clearAllFilters()
            }}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
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
            <h1 className="text-3xl font-bold">Explore Our Collection</h1>
          </div>
          {artistFilter && (
            <div className="mb-4 flex items-center">
              <p className="text-gray-500">
                Showing works by <span className="font-medium">{getArtistNameById(artistFilter)}</span>
              </p>
              <Button variant="link" onClick={clearAllFilters} className="ml-2 p-0 h-auto">
                Clear filter
              </Button>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search artworks..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Styles</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="impressionist">Impressionist</SelectItem>
                  <SelectItem value="realism">Realism</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="default">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="flex gap-2 w-full md:w-auto"
                onClick={() => setShowPriceFilter(!showPriceFilter)}
              >
                <Filter className="h-4 w-4" />
                Price Range
              </Button>
            </div>
          </div>

          {showPriceFilter && (
            <div className="mb-8" id="price-filter">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-medium mb-3">Price Range (€)</h3>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="space-y-2 w-full md:flex-1">
                    <Label htmlFor="min-price">Min Price</Label>
                    <Input id="min-price" type="number" placeholder="0" min="0" />
                  </div>
                  <div className="hidden md:block pt-6">-</div>
                  <div className="space-y-2 w-full md:flex-1">
                    <Label htmlFor="max-price">Max Price</Label>
                    <Input id="max-price" type="number" placeholder="10000" min="0" />
                  </div>
                  <Button className="w-full md:w-auto md:mt-6 bg-[#1d3c45] hover:bg-[#152b32]">Apply</Button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArtworks.map((artwork) => (
              <Link href={`/artworks/${artwork.id}`} key={artwork.id} className="group">
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=600&width=600&text=Artwork%20${artwork.id}`}
                      alt={artwork.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {artwork.hasVideo && (
                      <div className="absolute top-2 right-2 bg-[#1d3c45] text-white text-xs px-2 py-1 rounded">
                        Video Available
                      </div>
                    )}
                    {artwork.hasAudio && (
                      <div className="absolute top-2 right-2 bg-[#1d3c45] text-white text-xs px-2 py-1 rounded">
                        Audio Available
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{artwork.title}</h3>
                    <p className="text-sm text-gray-500">{artwork.artistName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium">€{artwork.price}</span>
                      <span className="text-sm">{artwork.medium}</span>
                    </div>
                    <div className="text-sm text-gray-500 text-right mt-1">{artwork.year}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className="mx-1"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}

          {/* No results message */}
          {paginatedArtworks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No artworks found matching your criteria.</p>
              <Button variant="link" onClick={clearAllFilters} className="mt-2">
                Clear all filters
              </Button>
            </div>
          )}
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
