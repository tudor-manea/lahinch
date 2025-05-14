"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleArtworksClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    router.push("/artworks")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <div className="flex flex-col h-full">
          <div className="px-2 py-4 border-b">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <span className="font-semibold text-lg">Lahinch Art Gallery</span>
            </Link>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            <a
              href="/artworks"
              onClick={handleArtworksClick}
              className="flex items-center h-10 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              Artworks
            </a>
            <Link
              href="/artists"
              onClick={() => setOpen(false)}
              className="flex items-center h-10 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              Artists
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="flex items-center h-10 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/visit"
              onClick={() => setOpen(false)}
              className="flex items-center h-10 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              Visit
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="flex items-center h-10 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
            >
              Subscription Plans
            </Link>
          </nav>
          <div className="px-2 py-4 border-t space-y-2">
            <Link href="/login" onClick={() => setOpen(false)} className="w-full">
              <Button variant="outline" className="w-full justify-start">
                Log in
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="w-full">
              <Button className="w-full justify-start">Sign up</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
