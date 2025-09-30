import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs font-medium">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="text-xs font-medium">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted-foreground",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full" disabled={!product.inStock} variant={product.inStock ? "default" : "secondary"}>
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  )
}
