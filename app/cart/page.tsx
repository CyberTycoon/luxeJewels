"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    category: string;
    image?: string;
  }

  const updateCart = (newCart: CartItem[]): void => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  interface UpdateQuantityParams {
    id: string | number;
    newQuantity: number;
  }

  const updateQuantity = ({ id, newQuantity }: UpdateQuantityParams): void => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    updateCart(updatedCart)
  }

  interface RemoveItemParams {
    id: string | number;
  }

  const removeItem = (id: RemoveItemParams['id']): void => {
    const updatedCart = cart.filter((item) => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    updateCart(updatedCart)
  }

  const applyPromoCode = () => {
    const validCodes: { [key: string]: number } = {
      SAVE10: 0.1,
      WELCOME20: 0.2,
      LUXURY15: 0.15,
    }

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()])
    } else {
      alert("Invalid promo code")
    }
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const shipping = subtotal > 500 ? 0 : 25
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <Header />
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl mb-8">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                <ShoppingBag className="h-5 w-5 mr-2" />
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
        <div className="flex items-center mb-8">
          <Link href="/products">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart ({cart.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-white to-purple-50"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                        <p className="text-lg font-bold text-purple-600 mt-1">${item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity({ id: item.id, newQuantity: item.quantity - 1 })}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity({ id: item.id, newQuantity: Number.parseInt(e.target.value) || 1 })}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity({ id: item.id, newQuantity: item.quantity + 1 })}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-2">Promo code applied! {discount * 100}% off</p>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount * 100}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                    Proceed to Checkout
                  </Button>
                </Link>

                {subtotal < 500 && (
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Secure checkout with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
