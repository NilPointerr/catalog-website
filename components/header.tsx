"use client"

import type React from "react"
import Link from "next/link"
import { ShoppingBag, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileMenu } from "@/components/mobile-menu"
import { useState } from "react"

interface HeaderProps {
  onSearch?: (query: string) => void
}

export function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-playfair text-xl font-semibold text-foreground">Luxe Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/?category=All Categories"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/?category=Furniture"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Furniture
            </Link>
            <Link
              href="/?category=Home Decor"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home Decor
            </Link>
            <Link
              href="/?category=Lighting"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Lighting
            </Link>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            <MobileMenu onSearch={onSearch} />
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </form>
      </div>
    </header>
  )
}
