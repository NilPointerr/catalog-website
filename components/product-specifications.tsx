import { Separator } from "@/components/ui/separator"

interface ProductSpecificationsProps {
  specifications: Record<string, string>
  features: string[]
}

export function ProductSpecifications({ specifications, features }: ProductSpecificationsProps) {
  return (
    <div className="space-y-6">
      {/* Features */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* Specifications */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Specifications</h3>
        <div className="space-y-3">
          {Object.entries(specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between items-start gap-4">
              <span className="text-sm text-muted-foreground font-medium">{key}:</span>
              <span className="text-sm text-foreground text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
