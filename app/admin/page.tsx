"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, Eye, Download } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

const salesData = [
  { month: "Jan", sales: 12000, orders: 45 },
  { month: "Feb", sales: 15000, orders: 52 },
  { month: "Mar", sales: 18000, orders: 61 },
  { month: "Apr", sales: 22000, orders: 73 },
  { month: "May", sales: 25000, orders: 84 },
  { month: "Jun", sales: 28000, orders: 92 },
]

const categoryData = [
  { name: "Rings", value: 35, color: "#8B5CF6" },
  { name: "Necklaces", value: 25, color: "#EC4899" },
  { name: "Earrings", value: 20, color: "#F59E0B" },
  { name: "Bracelets", value: 20, color: "#10B981" },
]

const recentOrders = [
  { id: "LJ12345", customer: "Sarah Johnson", amount: 2499.99, status: "completed", date: "2024-01-15" },
  { id: "LJ12346", customer: "Michael Chen", amount: 899.99, status: "processing", date: "2024-01-15" },
  { id: "LJ12347", customer: "Emma Davis", amount: 1299.99, status: "shipped", date: "2024-01-14" },
  { id: "LJ12348", customer: "James Wilson", amount: 1899.99, status: "completed", date: "2024-01-14" },
  { id: "LJ12349", customer: "Lisa Brown", amount: 799.99, status: "processing", date: "2024-01-13" },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    revenueGrowth: 0,
    orderGrowth: 0,
  })

  useEffect(() => {
    // Simulate fetching dashboard data
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const totalCustomers = users.length
    const totalProducts = 156 // Simulated

    setStats({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      revenueGrowth: 12.5,
      orderGrowth: 8.3,
    })
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+{stats.revenueGrowth}% from last month</span>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+{stats.orderGrowth}% from last month</span>
                  </div>
                </div>
                <ShoppingCart className="h-12 w-12 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Total Customers</p>
                  <p className="text-3xl font-bold">{stats.totalCustomers}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+15.2% from last month</span>
                  </div>
                </div>
                <Users className="h-12 w-12 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+5.1% from last month</span>
                  </div>
                </div>
                <Package className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Trend */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#EC4899" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-white to-purple-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <p className="font-bold text-lg">${order.amount.toLocaleString()}</p>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Management</h3>
                  <p className="text-gray-600 mb-6">Manage your product inventory, pricing, and descriptions</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Add New Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Database</h3>
                  <p className="text-gray-600 mb-6">View and manage your customer information and purchase history</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    View All Customers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
