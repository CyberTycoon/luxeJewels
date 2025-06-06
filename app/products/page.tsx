"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Star, ShoppingCart, Heart, Filter, Grid, List } from "lucide-react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  material: string;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const allProducts = [
  {
    id: 1,
    name: "Diamond Eternity Ring",
    price: 2499.99,
    originalPrice: 3199.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 127,
    category: "rings",
    material: "gold",
    isNew: true,
    description: "Stunning diamond eternity ring crafted in 18k gold",
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 89,
    category: "earrings",
    material: "silver",
    isSale: true,
    description: "Elegant pearl drop earrings in sterling silver",
  },
  {
    id: 3,
    name: "Gold Chain Necklace",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "necklaces",
    material: "gold",
    description: "Classic gold chain necklace, perfect for layering",
  },
  {
    id: 4,
    name: "Sapphire Tennis Bracelet",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 203,
    category: "bracelets",
    material: "platinum",
    description: "Luxurious sapphire tennis bracelet in platinum",
  },
  {
    id: 5,
    name: "Rose Gold Wedding Band",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 94,
    category: "rings",
    material: "rose-gold",
    description: "Beautiful rose gold wedding band with subtle texture",
  },
  {
    id: 6,
    name: "Diamond Stud Earrings",
    price: 1599.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 178,
    category: "earrings",
    material: "platinum",
    description: "Classic diamond stud earrings in platinum setting",
  },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [products, setProducts] = useState(allProducts)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [loading, setLoading] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Fix hydration issue by only running client-side code after mount
  useEffect(() => {
    setIsClient(true)

    // Load cart from localStorage only on client
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Handle URL params and update categories when they change
  useEffect(() => {
    if (!isClient) return

    const category = searchParams.get("category")
    if (category) {
      setSelectedCategories([category])
    } else {
      setSelectedCategories([])
    }
  }, [searchParams, isClient])

  useEffect(() => {
    let filtered = allProducts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by materials
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((product) => selectedMaterials.includes(product.material))
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered = filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategories, selectedMaterials, priceRange, sortBy])

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


  interface CategoryChangeEvent {
    category: string;
    checked: boolean;
  }

  const handleCategoryChange = ({ category, checked }: CategoryChangeEvent): void => {
    let newCategories: string[]

    if (checked) {
      newCategories = [...selectedCategories, category]
    } else {
      newCategories = selectedCategories.filter((c) => c !== category)
    }

    setSelectedCategories(newCategories)

    // Update URL to reflect the new category selection
    const params = new URLSearchParams()
    if (newCategories.length === 1) {
      params.set('category', newCategories[0])
    }

    const newUrl = newCategories.length > 0
      ? `/products?${params.toString()}`
      : '/products'

    router.push(newUrl, { scroll: false })
  }

  interface MaterialChangeEvent {
    material: string;
    checked: boolean;
  }

  const handleMaterialChange = ({ material, checked }: MaterialChangeEvent): void => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    }
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 mr-2 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="w-full" />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                <div className="space-y-2">
                  {["rings", "necklaces", "earrings", "bracelets"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange({ category, checked: checked as boolean })}
                      />
                      <label htmlFor={category} className="text-sm capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
                <div className="space-y-2">
                  {["gold", "silver", "platinum", "rose-gold"].map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={material}
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={(checked) => handleMaterialChange({ material, checked: checked as boolean })}
                      />
                      <label htmlFor={material} className="text-sm capitalize">
                        {material.replace("-", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Products ({filteredProducts.length})</h1>
                <p className="text-gray-600">Discover our exquisite jewelry collection</p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
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
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button onClick={() => addToWishlist(product)} size="sm" variant="secondary" className="rounded-full p-2 bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1">
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

                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      {loading ? <div className="w-5 h-5 border-b-0 border-t-4 border-white rounded-full animate-spin" /> :
                        <div className="flex flex-row items-center justify-center">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </div>
                      }

                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
function triggerStorageUpdate(key: string) {
  // Create and dispatch a custom storage event
  const event = new StorageEvent('storage', {
    key: key,
    newValue: localStorage.getItem(key),
    oldValue: null,
    storageArea: localStorage,
  });
  window.dispatchEvent(event);
}
