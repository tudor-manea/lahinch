import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
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
            <h1 className="text-3xl font-bold">Subscription Plans</h1>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Enhance Your Art Experience</h2>
              <p className="text-gray-500 mt-2">
                Access exclusive content from our artists and deepen your appreciation of their work.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Card className="border-[#d1ac00]">
                <CardHeader>
                  <div className="px-4 py-1 text-xs font-bold bg-[#d1ac00] text-black rounded-full w-fit mb-2">
                    FULL ACCESS
                  </div>
                  <CardTitle>Art Insider Subscription</CardTitle>
                  <CardDescription>Unlock all exclusive content</CardDescription>
                  <div className="mt-4 flex items-baseline justify-center">
                    <span className="text-3xl font-bold">€1.99</span>
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Full access to artist interviews and commentary</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>All video content including studio tours</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Audio guides for all artworks</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Behind-the-scenes content</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Monthly newsletter with artist insights</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#d1ac00] hover:bg-[#b89700] text-black">Subscribe Now</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="bg-[#eeebd3] rounded-lg p-6 mt-12">
              <h3 className="text-xl font-bold mb-4">Gift Subscriptions</h3>
              <p className="mb-6">
                Share the art experience with friends and family. Gift subscriptions are available for both plans and
                make perfect presents for art lovers.
              </p>
              <Link href="/gift">
                <Button
                  variant="outline"
                  className="border-[#1d3c45] text-[#1d3c45] hover:bg-[#1d3c45] hover:text-white"
                >
                  Purchase a Gift Subscription
                </Button>
              </Link>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    question: "Can I cancel my subscription at any time?",
                    answer:
                      "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
                  },
                  {
                    question: "Is there a free trial available?",
                    answer:
                      "Yes, we offer a 7-day free trial for new subscribers. You can explore our platform and decide which plan works best for you.",
                  },
                  {
                    question: "How do I access the content?",
                    answer:
                      "Once subscribed, you can access all content through our website or by scanning QR codes in the gallery with your smartphone.",
                  },
                  {
                    question: "Can I download content for offline viewing?",
                    answer:
                      "Premium subscribers can download audio guides and selected videos for offline viewing when visiting the gallery in areas with limited connectivity.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-500">{faq.answer}</p>
                  </div>
                ))}
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
