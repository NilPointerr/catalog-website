"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import type { Product, ProductFilters as ProductFiltersType, SortOption } from "@/lib/types"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<ProductFiltersType>({})
  const [sortBy, setSortBy] = useState<SortOption | "">("")
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, filters, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)
      if (filters.category) params.append("category", filters.category)
      if (filters.brand) params.append("brand", filters.brand)
      if (filters.minPrice !== undefined) params.append("minPrice", filters.minPrice.toString())
      if (filters.maxPrice !== undefined) params.append("maxPrice", filters.maxPrice.toString())
      if (filters.inStock) params.append("inStock", "true")
      if (filters.rating) params.append("rating", filters.rating.toString())
      if (sortBy) params.append("sort", sortBy)

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters)
  }

  const handleSortChange = (sort: SortOption | "") => {
    setSortBy(sort)
  }

  const handleClearFilters = () => {
    setFilters({})
    setSortBy("")
  }

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Curated Collection of
            <br />
            <span className="text-accent">Premium Products</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Discover our carefully selected range of artisan-crafted items, designed to elevate your everyday living
            with exceptional quality and timeless style.
          </p>
        </section>

        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                {loading ? "Loading..." : `${products.length} products available`}
              </p>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                filters={filters}
                sortBy={sortBy}
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
                isOpen={filtersOpen}
                onToggle={toggleFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <ProductGrid products={products} loading={loading} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 Luxe Store. Crafted with care for discerning customers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
