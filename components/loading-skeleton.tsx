export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-6 bg-muted rounded w-1/4" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
