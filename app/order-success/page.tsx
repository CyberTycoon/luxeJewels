"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail, ArrowRight } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState(null)
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o) => o.id.toString() === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <Header />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
            <Link href="/">
              <Button className="mt-4">Return Home</Button>
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

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed! 🎉</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase! Your order has been successfully placed.
          </p>

          {/* Order Details */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Order Number</h3>
                  <p className="text-purple-600 font-bold text-lg">#{order.id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Total Amount</h3>
                  <p className="text-green-600 font-bold text-lg">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Order Date</h3>
                  <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Tracking Number</h3>
                  <p className="text-purple-600 font-mono">{order.trackingNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Confirmation Email</h3>
                <p className="text-sm text-gray-600">We've sent a confirmation email with your order details</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 mx-auto text-pink-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Processing</h3>
                <p className="text-sm text-gray-600">Your order is being prepared for shipment</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">You'll receive tracking info once shipped</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/orders">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                View Order Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, our customer service team is here to help.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
