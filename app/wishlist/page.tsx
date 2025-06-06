'use client'

import { Header } from "@/app/components/header"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Heart, HeartOff } from "lucide-react"
import { Star } from "lucide-react"
import Link from "next/link"
import { ShoppingCart, Trash2 } from "lucide-react"

interface Product {
    id: number
    name: string
    description: string
    price: number
    originalPrice?: number
    image?: string
    rating: number
    reviews: number
    isNew?: boolean
    isSale?: boolean
}

interface CartItem extends Product {
    quantity: number
}

export default function Wishlist() {
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState("grid")
    const [isClient, setIsClient] = useState(false)
    const [cart, setCart] = useState<CartItem[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [removingItemId, setRemovingItemId] = useState<number | null>(null)

    useEffect(() => {
        setIsClient(true)
        getWishlist()
    }, [])

    const getWishlist = () => {
        if (typeof window !== 'undefined') {
            const wishlist = localStorage.getItem('wishlist') || '[]'
            try {
                const parsedWishlist = JSON.parse(wishlist)
                // Remove duplicates and ensure unique IDs
                const uniqueProducts = parsedWishlist.reduce((acc: Product[], current: Product) => {
                    const exists = acc.find(item => item.id === current.id)
                    if (!exists) {
                        acc.push(current)
                    }
                    return acc
                }, [])
                setProducts(uniqueProducts)
            } catch (error) {
                console.error('Error parsing wishlist:', error)
                setProducts([])
            }
        }
    }

    const removeFromWishlist = (productId: number): void => {
        if (!isClient) return

        setRemovingItemId(productId)

        // Remove from state
        const updatedProducts = products.filter(product => product.id !== productId)
        setProducts(updatedProducts)

        // Update localStorage
        localStorage.setItem('wishlist', JSON.stringify(updatedProducts))

        // Show success message
        const removedProduct = products.find(p => p.id === productId)
        if (removedProduct) {
            alert(`${removedProduct.name} has been removed from your wishlist!`)
        }

        setRemovingItemId(null)
    }

    const addToCart = (product: Product): void => {
        if (!isClient) return

        setLoading(true)

        // Get existing cart
        const existingCart = localStorage.getItem('cart') || '[]'
        let cartItems: CartItem[] = []

        try {
            cartItems = JSON.parse(existingCart)
        } catch (error) {
            console.error('Error parsing cart:', error)
            cartItems = []
        }

        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id)

        if (existingItemIndex >= 0) {
            // Increase quantity if item exists
            cartItems[existingItemIndex].quantity += 1
        } else {
            // Add new item to cart
            cartItems.push({ ...product, quantity: 1 })
        }

        setCart(cartItems)
        localStorage.setItem("cart", JSON.stringify(cartItems))
        alert(`${product.name} has been added to your cart!`)
        setLoading(false)
    }

    if (!isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
                <Header />
                <div className="container mx-auto py-8 justify-center text-center">
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
            <Header />
            <div className="container mx-auto py-8 px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Your Wishlist
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {products.length === 0
                            ? "Your wishlist is empty. Start adding items you love!"
                            : `You have ${products.length} item${products.length !== 1 ? 's' : ''} in your wishlist.`
                        }
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-6">
                            <HeartOff className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
                            <p className="text-gray-500 mb-6">Discover amazing products and add them to your wishlist!</p>
                            <Link href="/products">
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full">
                                    Start Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                            }`}
                    >
                        {products.map((product, index) => (
                            <Card
                                key={`wishlist-${product.id}-${index}`}
                                className={`group cursor-pointer overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50 ${viewMode === "list" ? "flex" : ""
                                    }`}
                            >
                                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                                    <div className={`relative overflow-hidden ${viewMode === "list" ? "h-48" : "h-80"}`}>
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.isNew && (
                                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">
                                                NEW
                                            </Badge>
                                        )}
                                        {product.isSale && (
                                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold">
                                                SALE
                                            </Badge>
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="rounded-full p-2 bg-red-500/90 hover:bg-red-600 text-white"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    removeFromWishlist(product.id)
                                                }}
                                                disabled={removingItemId === product.id}
                                            >
                                                {removingItemId === product.id ? (
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6 flex-1">
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={`star-${product.id}-${i}`}
                                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                                    </div>

                                    <Link href={`/products/${product.id}`}>
                                        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-purple-600 transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-purple-600">${product.price.toLocaleString()}</span>
                                            {product.originalPrice && (
                                                <span className="text-lg text-gray-500 line-through">
                                                    ${product.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => addToCart(product)}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <div className="flex flex-row items-center justify-center">
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    Add to Cart
                                                </div>
                                            )}
                                        </Button>

                                        <Button
                                            onClick={() => removeFromWishlist(product.id)}
                                            variant="outline"
                                            className="px-4 py-3 rounded-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300"
                                            disabled={removingItemId === product.id}
                                        >
                                            {removingItemId === product.id ? (
                                                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Heart className="h-4 w-4 fill-current" />
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}