export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  brand: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  features: string[]
  specifications: Record<string, string>
  tags: string[]
}

export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  rating?: number
}

export type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest"
