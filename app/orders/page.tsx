"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, Eye, Download } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    name: string;
    image?: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  trackingNumber?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    const savedUser = localStorage.getItem("user")

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  interface OrderStatus {
    status: "confirmed" | "processing" | "shipped" | "delivered" | string;
  }

  const getStatusIcon = (status: OrderStatus["status"]) => {
    switch (status) {
      case "confirmed":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  interface OrderStatusColors {
    "confirmed": string;
    "processing": string;
    "shipped": string;
    "delivered": string;
    [key: string]: string;
  }

  const getStatusColor = (status: OrderStatus["status"]): string => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <Header />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-8">🔒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-8">You need to be signed in to view your orders.</p>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <Header />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl mb-8">📦</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">No orders yet</h1>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                    <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                    <span className="text-2xl font-bold text-purple-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Items ({order.items.length})</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-3 bg-gradient-to-r from-white to-purple-50 rounded-lg border border-purple-100"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                    <div className="text-gray-600">
                      <p>
                        {order.shipping.firstName} {order.shipping.lastName}
                      </p>
                      <p>{order.shipping.address}</p>
                      <p>
                        {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                      </p>
                      <p>{order.shipping.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Tracking Information</h3>
                    <div className="text-gray-600">
                      <p className="font-mono text-purple-600">{order.trackingNumber}</p>
                      <p className="text-sm">
                        {order.status === "shipped" || order.status === "delivered"
                          ? "Your order is on its way!"
                          : "Tracking will be available once shipped"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {(order.status === "shipped" || order.status === "delivered") && (
                    <Button variant="outline" className="flex-1">
                      <Truck className="h-4 w-4 mr-2" />
                      Track Package
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  {order.status === "delivered" && (
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Leave Review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{orders.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter((order) => order.status === "delivered").length}
                </p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter((order) => order.status === "shipped").length}
                </p>
                <p className="text-sm text-gray-600">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
