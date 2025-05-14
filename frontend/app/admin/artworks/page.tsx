"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, FileVideo, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for artworks
const mockArtworks = [
  {
    id: 1,
    title: "Cliffs of Moher",
    artist: "Sarah O'Connor",
    medium: "Oil on Canvas",
    price: 1450,
    year: 2022,
    hasVideo: true,
    hasAudio: false,
    status: "Available",
  },
  {
    id: 2,
    title: "Atlantic Waves",
    artist: "Michael Byrne",
    medium: "Sculpture",
    price: 2200,
    year: 2021,
    hasVideo: false,
    hasAudio: true,
    status: "Sold",
  },
  {
    id: 3,
    title: "Burren Landscape",
    artist: "Aoife Kelly",
    medium: "Watercolor",
    price: 1800,
    year: 2023,
    hasVideo: true,
    hasAudio: true,
    status: "Available",
  },
  {
    id: 4,
    title: "Coastal Light",
    artist: "Sarah O'Connor",
    medium: "Oil on Canvas",
    price: 1650,
    year: 2022,
    hasVideo: false,
    hasAudio: false,
    status: "Available",
  },
  {
    id: 5,
    title: "Wild Atlantic",
    artist: "Michael Byrne",
    medium: "Photography",
    price: 950,
    year: 2023,
    hasVideo: false,
    hasAudio: true,
    status: "On Hold",
  },
]

export default function ArtworksAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter artworks based on search query
  const filteredArtworks = mockArtworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort artworks if sort field is set
  const sortedArtworks = sortField
    ? [...filteredArtworks].sort((a, b) => {
        const aValue = a[sortField as keyof typeof a]
        const bValue = b[sortField as keyof typeof b]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        }

        return 0
      })
    : filteredArtworks

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artwork Management</h1>
        <Link href="/admin/artworks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Artwork
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artworks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center">
                      Title
                      {renderSortIndicator("title")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("artist")}>
                    <div className="flex items-center">
                      Artist
                      {renderSortIndicator("artist")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("medium")}>
                    <div className="flex items-center">
                      Medium
                      {renderSortIndicator("medium")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("price")}>
                    <div className="flex items-center justify-end">
                      Price
                      {renderSortIndicator("price")}
                    </div>
                  </TableHead>
                  <TableHead>Premium Media</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedArtworks.map((artwork) => (
                  <TableRow key={artwork.id}>
                    <TableCell className="font-medium">{artwork.title}</TableCell>
                    <TableCell>{artwork.artist}</TableCell>
                    <TableCell>{artwork.medium}</TableCell>
                    <TableCell className="text-right">€{artwork.price}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {artwork.hasVideo && (
                          <Badge variant="outline" className="bg-blue-50">
                            Video
                          </Badge>
                        )}
                        {artwork.hasAudio && (
                          <Badge variant="outline" className="bg-green-50">
                            Audio
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          artwork.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : artwork.status === "Sold"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {artwork.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/admin/artworks/${artwork.id}`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/artworks/${artwork.id}/media`}>
                            <DropdownMenuItem>
                              <FileVideo className="mr-2 h-4 w-4" />
                              Manage Media
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {sortedArtworks.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No artworks found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
