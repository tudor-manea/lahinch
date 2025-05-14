import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
            <h1 className="text-3xl font-bold">About Us</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="prose max-w-none">
                <p>
                  Lahinch Art Gallery was established in 1998, with a deep connection to the West of Ireland. What began
                  as a small space showcasing local artists has grown into a respected gallery representing both
                  established and emerging talents whose work captures the unique spirit of this remarkable region.
                </p>
                <p>
                  For over 25 years, we have been dedicated to promoting artists who draw inspiration from the dramatic
                  landscapes, rich cultural heritage, and distinctive light of County Clare and the Wild Atlantic Way.
                  Our collection encompasses a diverse range of media, from traditional painting and sculpture to
                  photography and mixed media works.
                </p>
                <p>
                  We pride ourselves on creating personal connections between artists and art lovers. We believe that
                  understanding the stories behind the artworks enhances appreciation, which is why we've developed our
                  subscription service offering exclusive multimedia content directly from the artists themselves.
                </p>
              </div>
            </div>
            <div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                <img
                  src="/placeholder.svg?height=600&width=800&text=Gallery%20Interior"
                  alt="Lahinch Art Gallery interior"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=600&width=800&text=Gallery%20Team"
                  alt="The O'Brien family"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sean O'Brien",
                  role: "Founder & Director",
                  bio: "Sean established the gallery in 1998 after a successful career as a landscape painter. His vision was to create a space that celebrates the artistic heritage of the West of Ireland.",
                },
                {
                  name: "Maeve Collins",
                  role: "Gallery Manager",
                  bio: "With a background in arts administration, Maeve oversees the day-to-day operations of the gallery and works closely with artists to curate our collection.",
                },
                {
                  name: "Ciaran Murphy",
                  role: "Digital Content Director",
                  bio: "Ciaran leads our digital initiatives, including the development of our subscription service providing multimedia content from our artists.",
                },
              ].map((person, i) => (
                <div key={i} className="flex flex-col">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                      src={`/placeholder.svg?height=400&width=400&text=${encodeURIComponent(person.name)}`}
                      alt={person.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-gray-500 mb-2">{person.role}</p>
                  <p className="text-sm">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <div className="bg-[#eeebd3] rounded-lg p-8">
              <div className="max-w-3xl mx-auto">
                <p className="text-lg italic text-center">
                  "To celebrate and promote the artistic talent of the West of Ireland, creating meaningful connections
                  between artists and art lovers through thoughtful curation and innovative digital content."
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Our Digital Subscription Service</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="prose max-w-none">
                  <p>
                    In 2022, we launched our digital subscription service to enhance the gallery experience and make our
                    artists' insights accessible to art lovers worldwide. This innovative platform offers:
                  </p>
                  <ul>
                    <li>In-depth interviews with artists about their inspiration and techniques</li>
                    <li>Studio tour videos showing artists at work</li>
                    <li>Audio guides providing detailed commentary on specific artworks</li>
                    <li>Behind-the-scenes content on the creation of featured pieces</li>
                  </ul>
                  <p>
                    Whether you're visiting our gallery in person or exploring our collection from afar, our
                    subscription service offers a deeper understanding of the art and artists we represent. We believe
                    that hearing directly from the creators adds immeasurable value to the art experience.
                  </p>
                </div>
                <div className="mt-6">
                  <Link href="/pricing">
                    <Button className="bg-[#1d3c45] hover:bg-[#152b32]">View Subscription Plans</Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=600&width=800&text=Digital%20Content"
                  alt="Digital content example"
                  className="object-cover w-full h-full"
                />
              </div>
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
