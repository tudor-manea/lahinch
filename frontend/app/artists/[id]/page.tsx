import Link from "next/link"
import { ArrowLeft, Play, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArtistPage({ params }: { params: { id: string } }) {
  const artistId = params.id

  // Artist data based on ID
  const artists = [
    {
      id: "1",
      name: "Sarah O'Connor",
      specialty: "Landscape Painter",
      location: "Lahinch, Co. Clare",
      born: "1975, Galway, Ireland",
      education: "National College of Art and Design, Dublin",
      bio: "Sarah O'Connor is a celebrated landscape painter whose work captures the dramatic beauty of the West of Ireland. Her paintings are characterized by bold brushwork and a deep understanding of the changing light that defines the Atlantic coastline. Having grown up in Galway and now based in Lahinch, Sarah's connection to the landscape is profound and personal.",
      additionalBio:
        "Her work has been exhibited throughout Ireland and internationally, with pieces held in numerous private collections. Sarah's painting process often begins with extended periods spent observing the landscape in different weather conditions, making sketches and taking photographs before returning to her studio to create her finished works.",
    },
    {
      id: "2",
      name: "Michael Byrne",
      specialty: "Sculptor",
      location: "Ennistymon, Co. Clare",
      born: "1968, Cork, Ireland",
      education: "Crawford College of Art and Design, Cork",
      bio: "Michael Byrne creates powerful sculptural works that draw inspiration from the unique geological formations of the Burren and the rugged coastline of Clare. Working primarily in stone and bronze, his pieces explore the relationship between natural forms and human experience. Michael's studio in Ennistymon has become a creative hub for artists in the region.",
      additionalBio:
        "Before focusing exclusively on sculpture, Michael worked as a stonemason, giving him an intimate knowledge of his materials. This background is evident in the technical precision of his work, which often incorporates traditional craft techniques alongside contemporary sculptural approaches.",
    },
    {
      id: "3",
      name: "Aoife Kelly",
      specialty: "Mixed Media Artist",
      location: "Doolin, Co. Clare",
      born: "1982, Dublin, Ireland",
      education: "Limerick School of Art and Design",
      bio: "Aoife Kelly's mixed media works combine painting, collage, and found objects to create richly textured pieces that reflect the layered history and diverse landscapes of the West of Ireland. Her studio in Doolin provides constant inspiration, with the changing moods of the ocean and the distinctive rock formations of the coastline frequently appearing in her work.",
      additionalBio:
        "Aoife's artistic practice is deeply influenced by environmental concerns, and she often incorporates natural and reclaimed materials in her work. Her recent series explores the impact of climate change on coastal communities, combining documentary elements with more abstract expressions of place and memory.",
    },
    {
      id: "4",
      name: "John Doyle",
      specialty: "Photographer",
      location: "Liscannor, Co. Clare",
      born: "1979, Belfast, Northern Ireland",
      education: "Belfast School of Art",
      bio: "John Doyle's photographic work captures the dramatic interplay of light, weather, and landscape along the Wild Atlantic Way. His images reveal hidden aspects of familiar scenes, often photographed at dawn or dusk when the quality of light transforms the coastline. Having lived in Clare for over a decade, John has developed an intimate knowledge of the region's changing moods and hidden locations, allowing him to capture moments of extraordinary beauty in his work.",
      additionalBio:
        "John's background in documentary photography informs his approach to landscape, with a focus on revealing the human connection to place. His recent projects have explored the traditional farming and fishing practices that continue to shape the coastal communities of Clare.",
    },
    {
      id: "5",
      name: "Emma Walsh",
      specialty: "Abstract Painter",
      location: "Kilkee, Co. Clare",
      born: "1985, Limerick, Ireland",
      education: "Burren College of Art",
      bio: "Emma Walsh creates vibrant abstract paintings inspired by the colors and textures of the West of Ireland landscape. Her work translates the emotional experience of place into dynamic compositions of color and form. Based in her studio overlooking the bay in Kilkee, Emma's paintings capture the energy and movement of the Atlantic Ocean.",
      additionalBio:
        "Emma's artistic practice involves extensive research into the history and folklore of the places that inspire her work. This research, combined with direct observation and sketching in the landscape, informs abstract compositions that balance spontaneity with careful consideration of color relationships and spatial dynamics.",
    },
    {
      id: "6",
      name: "Patrick Murphy",
      specialty: "Watercolorist",
      location: "Spanish Point, Co. Clare",
      born: "1972, Sligo, Ireland",
      education: "Self-taught",
      bio: "Patrick Murphy's delicate watercolor paintings capture the atmospheric quality of the Irish landscape with remarkable sensitivity. His work focuses on the subtle interplay of light, mist, and rain that characterizes the West of Ireland. Patrick works primarily en plein air, creating immediate responses to the landscape in all weather conditions.",
      additionalBio:
        "Though largely self-taught, Patrick has developed a highly distinctive approach to watercolor that combines traditional techniques with contemporary compositional strategies. His work has gained recognition for its ability to evoke not just the visual aspects of the landscape but also its sounds, smells, and emotional resonance.",
    },
  ]

  const artist = artists.find((a) => a.id === artistId) || artists[0]

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
            <Link href="/artists">
              <Button variant="outline" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Artist Profile</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6">
                  <img
                    src={`/placeholder.svg?height=600&width=450&text=${encodeURIComponent(artist.name)}`}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
                <p className="text-gray-500 mb-4">{artist.specialty}</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Based in</p>
                    <p className="text-sm">{artist.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Born</p>
                    <p className="text-sm">{artist.born}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="text-sm">{artist.education}</p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="works">Works</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="pt-6 space-y-6">
                  <div className="prose max-w-none">
                    <p>{artist.bio}</p>
                    <p>{artist.additionalBio}</p>
                  </div>

                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 mt-8">
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
                      Artist Interview: Creative Process and Inspiration
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 italic mt-4">
                    Subscribe for just €1.99/month to access the full artist interview and exclusive insights.
                  </div>
                  <Button className="bg-[#1d3c45] hover:bg-[#152b32]">Subscribe for €1.99/month</Button>
                </TabsContent>

                <TabsContent value="works" className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => {
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
                      return (
                        <Link href={`/artworks/${i + 1}`} key={i} className="group">
                          <div className="overflow-hidden rounded-lg">
                            <div className="aspect-square relative overflow-hidden">
                              <img
                                src={`/placeholder.svg?height=400&width=400&text=${encodeURIComponent(
                                  artworkTitles[i % artworkTitles.length],
                                )}`}
                                alt={artworkTitles[i % artworkTitles.length]}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <h3 className="font-medium text-sm">{artworkTitles[i % artworkTitles.length]}</h3>
                            <p className="text-xs text-gray-500">{2020 + (i % 5)}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="flex justify-center mt-8">
                    <Link href={`/artworks?artist=${artist.id}`}>
                      <Button
                        variant="outline"
                        className="border-[#1d3c45] text-[#1d3c45] hover:bg-[#1d3c45] hover:text-white"
                      >
                        View All Works
                      </Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="interviews" className="pt-6">
                  <div className="space-y-6">
                    {[
                      {
                        title: "Studio Visit",
                        date: "January 15, 2023",
                        description: "A behind-the-scenes look at the artist's studio and working methods.",
                      },
                      {
                        title: "Creative Process",
                        date: "June 10, 2023",
                        description: "The artist discusses their creative process and sources of inspiration.",
                      },
                      {
                        title: "West of Ireland Influence",
                        date: "October 5, 2023",
                        description:
                          "How the landscape and culture of the West of Ireland influences the artist's work.",
                      },
                    ].map((interview, i) => (
                      <div key={i} className="border rounded-lg overflow-hidden">
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
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
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{interview.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">Recorded on {interview.date}</p>
                          <p className="text-sm">{interview.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 italic mt-6">
                    Subscribe for just €1.99/month to access all interviews and exclusive content.
                  </div>
                  <Button className="mt-2 bg-[#1d3c45] hover:bg-[#152b32]">Subscribe for €1.99/month</Button>
                </TabsContent>
              </Tabs>
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
