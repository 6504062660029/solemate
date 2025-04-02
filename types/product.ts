export type Product = {
    id: number
    name: string
    brand: string
    price: number
    original_price: number
    rating: number
    review_count: number
    image_url: string
    is_new: boolean
    is_best_seller: boolean
    category_id?: number // เผื่อใช้ filter category
  }
  