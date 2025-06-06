import Link from "next/link"
import { Crown, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-full">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">LuxeJewels</h3>
                <p className="text-sm text-gray-300">Premium Jewelry Store</p>
              </div>
            </div>
            <p className="text-gray-300">
              Crafting timeless elegance with the finest jewelry pieces for over 25 years.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
              <Link href="/products?category=rings" className="block text-gray-300 hover:text-white transition-colors">
                Rings
              </Link>
              <Link
                href="/products?category=necklaces"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Necklaces
              </Link>
              <Link
                href="/products?category=earrings"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Earrings
              </Link>
              <Link
                href="/products?category=bracelets"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Bracelets
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-2">
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/size-guide" className="block text-gray-300 hover:text-white transition-colors">
                Size Guide
              </Link>
              <Link href="/care" className="block text-gray-300 hover:text-white transition-colors">
                Jewelry Care
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-gray-300">hello@luxejewels.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-purple-400 mt-1" />
                <span className="text-gray-300">
                  123 Jewelry District
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LuxeJewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
