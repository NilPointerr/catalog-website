"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Star, Heart, ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { ImageGallery } from "@/components/image-gallery"
import { ProductSpecifications } from "@/components/product-specifications"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    setLoading(true)
    try {
      // Fetch product details
      const productResponse = await fetch(`/api/products/${id}`)
      if (!productResponse.ok) {
        router.push("/")
        return
      }
      const productData = await productResponse.json()
      setProduct(productData)

      // Fetch related products (same category)
      const relatedResponse = await fetch(`/api/products?category=${productData.category}`)
      const relatedData = await relatedResponse.json()
      setRelatedProducts(relatedData.products.filter((p: Product) => p.id !== id).slice(0, 4))
    } catch (error) {
      console.error("Failed to fetch product:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-1/4" />
                <div className="h-12 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 -ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>

            {/* Title */}
            <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground text-balance">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge variant="destructive" className="text-sm">
                    -{discountPercentage}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
              <span className="text-sm text-muted-foreground">{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <ProductSpecifications specifications={product.specifications} features={product.features} />
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground">Reviews feature coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
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
