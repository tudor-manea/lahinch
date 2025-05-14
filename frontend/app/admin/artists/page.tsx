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

// Mock data for artists
const mockArtists = [
  {
    id: 1,
    name: "Sarah O'Connor",
    specialty: "Landscape Painter",
    location: "Lahinch, Co. Clare",
    artworks: 12,
    hasVideo: true,
    hasAudio: true,
    featured: true,
  },
  {
    id: 2,
    name: "Michael Byrne",
    specialty: "Sculptor",
    location: "Ennistymon, Co. Clare",
    artworks: 8,
    hasVideo: true,
    hasAudio: false,
    featured: false,
  },
  {
    id: 3,
    name: "Aoife Kelly",
    specialty: "Mixed Media Artist",
    location: "Doolin, Co. Clare",
    artworks: 15,
    hasVideo: false,
    hasAudio: true,
    featured: true,
  },
  {
    id: 4,
    name: "John Doyle",
    specialty: "Photographer",
    location: "Liscannor, Co. Clare",
    artworks: 10,
    hasVideo: false,
    hasAudio: false,
    featured: false,
  },
  {
    id: 5,
    name: "Emma Walsh",
    specialty: "Abstract Painter",
    location: "Kilkee, Co. Clare",
    artworks: 7,
    hasVideo: true,
    hasAudio: false,
    featured: false,
  },
]

export default function ArtistsAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter artists based on search query
  const filteredArtists = mockArtists.filter(
    (artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort artists if sort field is set
  const sortedArtists = sortField
    ? [...filteredArtists].sort((a, b) => {
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
    : filteredArtists

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
        <h1 className="text-3xl font-bold">Artist Management</h1>
        <Link href="/admin/artists/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Artist
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search artists..."
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
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Name
                      {renderSortIndicator("name")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("specialty")}>
                    <div className="flex items-center">
                      Specialty
                      {renderSortIndicator("specialty")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                    <div className="flex items-center">
                      Location
                      {renderSortIndicator("location")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("artworks")}>
                    <div className="flex items-center justify-end">
                      Artworks
                      {renderSortIndicator("artworks")}
                    </div>
                  </TableHead>
                  <TableHead>Premium Media</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedArtists.map((artist) => (
                  <TableRow key={artist.id}>
                    <TableCell className="font-medium">{artist.name}</TableCell>
                    <TableCell>{artist.specialty}</TableCell>
                    <TableCell>{artist.location}</TableCell>
                    <TableCell className="text-right">{artist.artworks}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {artist.hasVideo && (
                          <Badge variant="outline" className="bg-blue-50">
                            Video
                          </Badge>
                        )}
                        {artist.hasAudio && (
                          <Badge variant="outline" className="bg-green-50">
                            Audio
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {artist.featured ? (
                        <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      ) : (
                        <Badge variant="outline">Standard</Badge>
                      )}
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
                          <Link href={`/admin/artists/${artist.id}`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/artists/${artist.id}/media`}>
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

                {sortedArtists.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No artists found. Try adjusting your search.
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
