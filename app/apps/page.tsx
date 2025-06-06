"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Star,
  Download,
  BarChart3,
  Mail,
  Truck,
  CreditCard,
  MessageSquare,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Package,
} from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

const featuredApps = [
  {
    id: 1,
    name: "Revenue Analytics Pro",
    description: "Advanced analytics and reporting for your store performance",
    icon: BarChart3,
    rating: 4.9,
    reviews: 1247,
    price: "Free",
    category: "Analytics",
    installed: false,
    featured: true,
  },
  {
    id: 2,
    name: "Email Marketing Suite",
    description: "Automated email campaigns and customer engagement tools",
    icon: Mail,
    rating: 4.8,
    reviews: 892,
    price: "$29/month",
    category: "Marketing",
    installed: true,
    featured: true,
  },
  {
    id: 3,
    name: "Smart Shipping Manager",
    description: "Optimize shipping costs and delivery times automatically",
    icon: Truck,
    rating: 4.7,
    reviews: 634,
    price: "$19/month",
    category: "Shipping",
    installed: false,
    featured: true,
  },
  {
    id: 4,
    name: "Payment Gateway Plus",
    description: "Accept multiple payment methods with enhanced security",
    icon: CreditCard,
    rating: 4.9,
    reviews: 1156,
    price: "2.9% per transaction",
    category: "Payments",
    installed: true,
    featured: true,
  },
]

const allApps = [
  ...featuredApps,
  {
    id: 5,
    name: "Customer Support Chat",
    description: "Live chat support for better customer service",
    icon: MessageSquare,
    rating: 4.6,
    reviews: 445,
    price: "$15/month",
    category: "Support",
    installed: false,
  },
  {
    id: 6,
    name: "Security Shield",
    description: "Advanced security features and fraud protection",
    icon: Shield,
    rating: 4.8,
    reviews: 723,
    price: "$25/month",
    category: "Security",
    installed: false,
  },
  {
    id: 7,
    name: "Performance Optimizer",
    description: "Speed up your store and improve user experience",
    icon: Zap,
    rating: 4.7,
    reviews: 567,
    price: "$12/month",
    category: "Performance",
    installed: false,
  },
  {
    id: 8,
    name: "Social Media Manager",
    description: "Manage all your social media accounts from one place",
    icon: TrendingUp,
    rating: 4.5,
    reviews: 389,
    price: "$22/month",
    category: "Marketing",
    installed: false,
  },
  {
    id: 9,
    name: "Customer Loyalty Program",
    description: "Build customer loyalty with rewards and points system",
    icon: Users,
    rating: 4.6,
    reviews: 512,
    price: "$18/month",
    category: "Marketing",
    installed: false,
  },
  {
    id: 10,
    name: "Inventory Management Pro",
    description: "Advanced inventory tracking and management tools",
    icon: Package,
    rating: 4.8,
    reviews: 678,
    price: "$35/month",
    category: "Inventory",
    installed: false,
  },
]

const categories = [
  "All",
  "Analytics",
  "Marketing",
  "Shipping",
  "Payments",
  "Support",
  "Security",
  "Performance",
  "Inventory",
]

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [installedApps, setInstalledApps] = useState(allApps.filter((app) => app.installed).map((app) => app.id))

  const filteredApps = allApps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleInstallApp = (appId) => {
    setInstalledApps((prev) => (prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]))
  }

  const isAppInstalled = (appId) => installedApps.includes(appId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            LuxeJewels App Store
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your store with powerful apps and integrations. Boost sales, improve customer experience, and
            streamline operations.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg rounded-full border-2 border-purple-200 focus:border-purple-500"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 w-full">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Featured Apps Section */}
          {selectedCategory === "All" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Apps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredApps.map((app) => {
                  const IconComponent = app.icon
                  return (
                    <Card
                      key={app.id}
                      className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          {app.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <p className="text-sm text-gray-600">{app.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(app.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">({app.reviews})</span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-bold text-purple-600">{app.price}</span>
                          <Badge variant="outline">{app.category}</Badge>
                        </div>

                        <Button
                          onClick={() => handleInstallApp(app.id)}
                          className={`w-full font-semibold py-2 rounded-full transition-all duration-300 ${
                            isAppInstalled(app.id)
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          }`}
                        >
                          {isAppInstalled(app.id) ? (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Installed
                            </>
                          ) : (
                            "Install App"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* All Apps */}
          <TabsContent value={selectedCategory} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "All" ? "All Apps" : `${selectedCategory} Apps`} ({filteredApps.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => {
                const IconComponent = app.icon
                return (
                  <Card
                    key={app.id}
                    className="group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        {app.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Featured</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{app.name}</CardTitle>
                      <p className="text-sm text-gray-600">{app.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(app.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({app.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-purple-600">{app.price}</span>
                        <Badge variant="outline">{app.category}</Badge>
                      </div>

                      <Button
                        onClick={() => handleInstallApp(app.id)}
                        className={`w-full font-semibold py-2 rounded-full transition-all duration-300 ${
                          isAppInstalled(app.id)
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        }`}
                      >
                        {isAppInstalled(app.id) ? (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Installed
                          </>
                        ) : (
                          "Install App"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No apps found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Installed Apps Summary */}
        {installedApps.length > 0 && (
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-green-800">Your Installed Apps ({installedApps.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {allApps
                    .filter((app) => installedApps.includes(app.id))
                    .map((app) => {
                      const IconComponent = app.icon
                      return (
                        <div key={app.id} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full mb-2">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-sm font-medium text-center">{app.name}</span>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
