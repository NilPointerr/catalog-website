"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface MobileMenuProps {
  onSearch?: (query: string) => void
}

export function MobileMenu({ onSearch }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
    setIsOpen(false)
  }

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/?category=All Categories" },
    { label: "Home Decor", href: "/?category=Home Decor" },
    { label: "Furniture", href: "/?category=Furniture" },
    { label: "Textiles", href: "/?category=Textiles" },
    { label: "Lighting", href: "/?category=Lighting" },
    { label: "Tableware", href: "/?category=Tableware" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="font-playfair text-xl font-semibold text-foreground">Luxe Store</span>
            </Link>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-border">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <Separator />

          {/* Account Actions */}
          <div className="p-6 space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart (0)
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
