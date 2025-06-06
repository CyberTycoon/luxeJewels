"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, ArrowRight, Sparkles, Crown, Gem } from "lucide-react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

const featuredProducts = [
  {
    id: 1,
    name: "Diamond Eternity Ring",
    price: 2499.99,
    originalPrice: 3199.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 127,
    category: "Rings",
    isNew: true,
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 89,
    category: "Earrings",
    isSale: true,
  },
  {
    id: 3,
    name: "Gold Chain Necklace",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Necklaces",
  },
  {
    id: 4,
    name: "Sapphire Tennis Bracelet",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 203,
    category: "Bracelets",
  },
]

const categories = [
  {
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
    count: 156,
    icon: Crown,
  },
  {
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
    count: 89,
    icon: Sparkles,
  },
  {
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
    count: 124,
    icon: Gem,
  },
  {
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop",
    count: 67,
    icon: Crown,
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cart, setCart] = useState<CartItem[]>([])

  const heroSlides = [
    {
      title: "Luxury Jewelry Collection",
      subtitle: "Discover Timeless Elegance",
      description: "Handcrafted pieces that tell your unique story",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop",
      cta: "Shop Now",
    },
    {
      title: "Diamond Dreams",
      subtitle: "Sparkle Like Never Before",
      description: "Premium diamonds for life's precious moments",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=600&fit=crop",
      cta: "Explore Diamonds",
    },
    {
      title: "Fashion Forward",
      subtitle: "Statement Pieces",
      description: "Bold designs for the modern trendsetter",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop",
      cta: "View Collection",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    category: string;
    isNew?: boolean;
    isSale?: boolean;
  }

  interface CartItem extends Product {
    quantity: number;
  }

  const triggerStorageUpdate = (key: string) => {
    const event = new CustomEvent('storageUpdate', {
      detail: { key }
    })
    window.dispatchEvent(event)
  }


  const [loading, setLoading] = useState(false)
  const isClient = typeof window !== 'undefined'

  // Updated addToCart function (use this in your ProductsPage)
  const addToCart = (product: Product): void => {
    if (!isClient) return

    setLoading(true)
    const newCart: CartItem[] = [...cart, { ...product, quantity: 1, id: Date.now() }]
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))

    // Trigger storage update event
    triggerStorageUpdate('cart')

    alert(`${product.name} has been added to your cart!`)
    setLoading(false)
  }

  // Updated addToWishlist function (use this wherever you add to wishlist)
  const addToWishlist = (product: Product): void => {
    const savedWishlist = localStorage.getItem("wishlist")
    const currentWishlist = savedWishlist ? JSON.parse(savedWishlist) : []

    // Check if item already exists
    const existingIndex = currentWishlist.findIndex((item: any) => item.id === product.id)

    if (existingIndex === -1) {
      const newWishlist = [...currentWishlist, product]
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))

      // Trigger storage update event
      triggerStorageUpdate('wishlist')

      alert(`${product.name} has been added to your wishlist!`)
    } else {
      alert(`${product.name} is already in your wishlist!`)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <Header />

      {/* Hero Slideshow */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${index === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="relative h-full">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                      {slide.title}
                    </h1>
                    <h2 className="text-3xl font-semibold mb-4">{slide.subtitle}</h2>
                    <p className="text-xl mb-8 opacity-90">{slide.description}</p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">Discover our curated collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={index} href={`/products?category=${category.name.toLowerCase()}`}>
                  <Card className="group cursor-pointer overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center mb-2">
                          <IconComponent className="h-6 w-6 mr-2 text-yellow-400" />
                          <h3 className="text-2xl font-bold">{category.name}</h3>
                        </div>
                        <p className="text-sm opacity-90">{category.count} items</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">Handpicked treasures just for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-pink-50"
              >
                <div className="relative">
                  <div className="relative h-80 overflow-hidden">
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
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => {
                          addToWishlist(product)
                        }}
                        size="sm"
                        variant="secondary"
                        className="rounded-full p-2 bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.category}</p>
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

                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl text-white/90 mb-8">
              Get exclusive access to new collections, special offers, and jewelry care tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
