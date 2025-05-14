"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Video,
  Headphones,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for media
const mockMedia = [
  {
    id: 1,
    title: "Studio Tour with Sarah O'Connor",
    type: "video",
    duration: "12:34",
    relatedTo: "Artist",
    relatedName: "Sarah O'Connor",
    dateAdded: "2023-10-15",
    fileSize: "45.2 MB",
  },
  {
    id: 2,
    title: "The Making of 'Cliffs of Moher'",
    type: "video",
    duration: "08:17",
    relatedTo: "Artwork",
    relatedName: "Cliffs of Moher",
    dateAdded: "2023-09-22",
    fileSize: "32.8 MB",
  },
  {
    id: 3,
    title: "Artist Commentary: Atlantic Waves",
    type: "audio",
    duration: "05:45",
    relatedTo: "Artwork",
    relatedName: "Atlantic Waves",
    dateAdded: "2023-11-03",
    fileSize: "12.5 MB",
  },
  {
    id: 4,
    title: "Interview with Michael Byrne",
    type: "audio",
    duration: "18:22",
    relatedTo: "Artist",
    relatedName: "Michael Byrne",
    dateAdded: "2023-08-17",
    fileSize: "22.1 MB",
  },
  {
    id: 5,
    title: "Creative Process: Mixed Media Techniques",
    type: "video",
    duration: "15:08",
    relatedTo: "Artist",
    relatedName: "Aoife Kelly",
    dateAdded: "2023-10-28",
    fileSize: "52.7 MB",
  },
]

export default function MediaAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter media based on search query
  const filteredMedia = mockMedia.filter(
    (media) =>
      media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.relatedName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort media if sort field is set
  const sortedMedia = sortField
    ? [...filteredMedia].sort((a, b) => {
        const aValue = a[sortField as keyof typeof a]
        const bValue = b[sortField as keyof typeof b]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        return 0
      })
    : filteredMedia

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
        <h1 className="text-3xl font-bold">Premium Media Management</h1>
        <Link href="/admin/media/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Media
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Premium Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search media..."
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
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("relatedTo")}>
                    <div className="flex items-center">
                      Related To
                      {renderSortIndicator("relatedTo")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("relatedName")}>
                    <div className="flex items-center">
                      Related Name
                      {renderSortIndicator("relatedName")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("dateAdded")}>
                    <div className="flex items-center">
                      Date Added
                      {renderSortIndicator("dateAdded")}
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMedia.map((media) => (
                  <TableRow key={media.id}>
                    <TableCell className="font-medium">{media.title}</TableCell>
                    <TableCell>
                      {media.type === "video" ? (
                        <Badge className="bg-blue-100 text-blue-800 flex items-center w-fit">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 flex items-center w-fit">
                          <Headphones className="h-3 w-3 mr-1" />
                          Audio
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{media.duration}</TableCell>
                    <TableCell>{media.relatedTo}</TableCell>
                    <TableCell>{media.relatedName}</TableCell>
                    <TableCell>{new Date(media.dateAdded).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/admin/media/${media.id}`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {sortedMedia.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No media found. Try adjusting your search.
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
