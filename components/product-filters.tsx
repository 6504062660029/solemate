"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useRouter, useSearchParams } from "next/navigation"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL parameters
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice") || 0),
    Number(searchParams.get("maxPrice") || 200),
  ])

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || [],
  )

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get("brands")?.split(",").filter(Boolean) || [],
  )

  const categories = [
    { id: "athletic", label: "Athletic" },
    { id: "casual", label: "Casual" },
    { id: "formal", label: "Formal" },
    { id: "outdoor", label: "Outdoor" },
    { id: "sandals", label: "Sandals" },
  ]

  const brands = [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "reebok", label: "Reebok" },
    { id: "converse", label: "Converse" },
    { id: "vans", label: "Vans" },
    { id: "new-balance", label: "New Balance" },
  ]

  const colors = [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
    { id: "brown", label: "Brown" },
  ]

  const sizes = [
    { id: "6", label: "6" },
    { id: "7", label: "7" },
    { id: "8", label: "8" },
    { id: "9", label: "9" },
    { id: "10", label: "10" },
    { id: "11", label: "11" },
    { id: "12", label: "12" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)))
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setSelectedBrands((prev) => (checked ? [...prev, brandId] : prev.filter((id) => id !== brandId)))
  }

  const applyFilters = () => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams()

    // Add price range
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 200) params.set("maxPrice", priceRange[1].toString())

    // Add categories
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","))

    // Add brands
    if (selectedBrands.length > 0) params.set("brands", selectedBrands.join(","))

    // Navigate to the new URL
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 200]} max={200} step={1} value={priceRange} onValueChange={setPriceRange} />
          <div className="flex items-center justify-between">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "brands"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-lg font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger className="text-lg font-medium">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={(checked) => handleBrandChange(brand.id, checked === true)}
                  />
                  <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="text-lg font-medium">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color.id}`} />
                  <Label htmlFor={`color-${color.id}`}>{color.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger className="text-lg font-medium">Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size.id}`} />
                  <Label htmlFor={`size-${size.id}`}>{size.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}

