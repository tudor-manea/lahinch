import Link from "next/link"
import type { ReactNode } from "react"
import { LayoutDashboard, Palette, Users, FileVideo, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1d3c45] text-white hidden md:block">
        <div className="p-6">
          <Link href="/admin" className="flex items-center">
            <span className="font-bold text-xl">Admin Panel</span>
          </Link>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-300">Main</div>
          <Link href="/admin" className="flex items-center px-6 py-3 hover:bg-[#152b32]">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-300 mt-4">Content</div>
          <Link href="/admin/artworks" className="flex items-center px-6 py-3 hover:bg-[#152b32]">
            <Palette className="h-5 w-5 mr-3" />
            Artworks
          </Link>
          <Link href="/admin/artists" className="flex items-center px-6 py-3 hover:bg-[#152b32]">
            <Users className="h-5 w-5 mr-3" />
            Artists
          </Link>
          <Link href="/admin/media" className="flex items-center px-6 py-3 hover:bg-[#152b32]">
            <FileVideo className="h-5 w-5 mr-3" />
            Premium Media
          </Link>
          <div className="px-4 py-2 text-xs uppercase tracking-wider text-gray-300 mt-4">System</div>
          <Link href="/admin/settings" className="flex items-center px-6 py-3 hover:bg-[#152b32]">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
          <Link href="/" className="flex items-center px-6 py-3 hover:bg-[#152b32]">
            <LogOut className="h-5 w-5 mr-3" />
            Back to Site
          </Link>
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow md:hidden">
          <div className="flex items-center justify-between p-4">
            <Link href="/admin" className="font-bold text-xl">
              Admin Panel
            </Link>
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
