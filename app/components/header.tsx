"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Heart, Menu, Crown, Sparkles, LogOut, Settings, Package } from "lucide-react"

interface CartItem {
  quantity?: number;
  [key: string]: any;
}

interface User {
  name: string;
  [key: string]: any;
}

export function Header() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [wishlist, setWishlist] = useState<any[]>([])

  const loadStorageData = () => {
    const savedCart = localStorage.getItem("cart")
    const savedUser = localStorage.getItem("user")
    const savedWishlist = localStorage.getItem("wishlist")

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }

  useEffect(() => {
    // Load initial data
    loadStorageData()

    // Listen for custom storage events
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail.key === 'cart' || e.detail.key === 'wishlist') {
        loadStorageData()
      }
    }

    // Listen for browser storage events (for cross-tab updates)
    const handleBrowserStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart' || e.key === 'wishlist') {
        loadStorageData()
      }
    }

    // Add event listeners
    window.addEventListener('storage', handleBrowserStorageChange)
    window.addEventListener('storageUpdate' as any, handleStorageChange)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleBrowserStorageChange)
      window.removeEventListener('storageUpdate' as any, handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0)
  const wishlistItemCount = wishlist.length

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100">
      <div className="container mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-purple-100">
          <div className="flex items-center space-x-4 text-gray-600">
            <span>Free shipping on orders over $500</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">30-day returns</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-purple-600 hover:text-purple-800 font-medium">
              Seller Dashboard
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LuxeJewels
              </h1>
              <p className="text-xs text-gray-500">Premium Jewelry Store</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              All Products
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/products?category=rings" className="flex items-center">
                    <Crown className="h-4 w-4 mr-2" />
                    Rings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=necklaces" className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Necklaces
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=earrings">Earrings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products?category=bracelets">Bracelets</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link href='/wishlist'>
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs">{wishlistItemCount}</Badge>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs">{cartItemCount}</Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-100">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-700 hover:text-purple-600 font-medium">
                All Products
              </Link>
              <Link href="/products?category=rings" className="text-gray-700 hover:text-purple-600 font-medium">
                Rings
              </Link>
              <Link href="/products?category=necklaces" className="text-gray-700 hover:text-purple-600 font-medium">
                Necklaces
              </Link>
              <Link href="/products?category=earrings" className="text-gray-700 hover:text-purple-600 font-medium">
                Earrings
              </Link>
              <Link href="/products?category=bracelets" className="text-gray-700 hover:text-purple-600 font-medium">
                Bracelets
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
