"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"
import { categories, brands } from "@/lib/mock-data"
import type { ProductFilters as ProductFiltersType, SortOption } from "@/lib/types"

interface ProductFiltersProps {
  filters: ProductFiltersType
  sortBy: SortOption | "default"
  onFiltersChange: (filters: ProductFiltersType) => void
  onSortChange: (sort: SortOption | "default") => void
  onClearFilters: () => void
  isOpen: boolean
  onToggle: () => void
}

export function ProductFilters({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  isOpen,
  onToggle,
}: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 2000])

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    onFiltersChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    })
  }

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: category === "All Categories" ? undefined : category,
    })
  }

  const handleBrandChange = (brand: string) => {
    onFiltersChange({
      ...filters,
      brand: brand === "All Brands" ? undefined : brand,
    })
  }

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked ? true : undefined,
    })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating,
    })
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button variant="outline" onClick={onToggle} className="w-full justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`
        lg:block lg:sticky lg:top-24 lg:h-fit
        ${isOpen ? "block" : "hidden"}
        bg-card border border-border rounded-lg p-6 space-y-6
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Filters</h3>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear all
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Sort */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sort by</Label>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger>
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Category */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.category === category || (category === "All Categories" && !filters.category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brand */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Brand</Label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brand === brand || (brand === "All Brands" && !filters.brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={2000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Availability</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={filters.inStock || false} onCheckedChange={handleInStockChange} />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </div>
      </div>
    </>
  )
}
