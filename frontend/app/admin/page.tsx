import Link from "next/link"
import { Palette, Users, FileVideo, TrendingUp, DollarSign, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>View Reports</Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
            <Palette className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-gray-500">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Premium Media</CardTitle>
            <FileVideo className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-gray-500">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-gray-500">+28 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/artworks/new">
              <Button className="w-full justify-start">
                <Palette className="mr-2 h-4 w-4" />
                Add New Artwork
              </Button>
            </Link>
            <Link href="/admin/artists/new">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New Artist
              </Button>
            </Link>
            <Link href="/admin/media/new">
              <Button className="w-full justify-start" variant="outline">
                <FileVideo className="mr-2 h-4 w-4" />
                Upload Premium Media
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Last 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Cliffs of Moher", artist: "Sarah O'Connor", price: "€1,450", date: "Today" },
                { title: "Atlantic Waves", artist: "Michael Byrne", price: "€2,200", date: "Yesterday" },
                { title: "Burren Landscape", artist: "Aoife Kelly", price: "€1,800", date: "3 days ago" },
              ].map((sale, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{sale.title}</p>
                    <p className="text-sm text-gray-500">{sale.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{sale.price}</p>
                    <p className="text-sm text-gray-500">{sale.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  <span>Payment System</span>
                </div>
                <span className="text-green-500 font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileVideo className="h-4 w-4 mr-2 text-green-500" />
                  <span>Media Storage</span>
                </div>
                <span className="text-green-500 font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                  <span>Last Backup</span>
                </div>
                <span className="text-gray-500 font-medium">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
