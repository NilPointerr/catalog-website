import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"
import type { SortOption } from "@/lib/types"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Extract filter parameters
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const inStock = searchParams.get("inStock")
  const rating = searchParams.get("rating")
  const sort = searchParams.get("sort") as SortOption
  const search = searchParams.get("search")

  let filteredProducts = [...mockProducts]

  // Apply filters
  if (category && category !== "All Categories") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  if (brand && brand !== "All Brands") {
    filteredProducts = filteredProducts.filter((product) => product.brand === brand)
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseInt(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseInt(maxPrice))
  }

  if (inStock === "true") {
    filteredProducts = filteredProducts.filter((product) => product.inStock)
  }

  if (rating) {
    filteredProducts = filteredProducts.filter((product) => product.rating >= Number.parseFloat(rating))
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  // Apply sorting
  if (sort) {
    switch (sort) {
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // For demo purposes, reverse the array to simulate newest first
        filteredProducts.reverse()
        break
    }
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  })
}
