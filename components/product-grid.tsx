import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="aspect-square bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-5 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
              <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">📦</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
