"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ShippingDetails } from "@/app/checkout/page"

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
})

interface ShippingFormProps {
  initialValues: ShippingDetails
  onSubmit: (data: ShippingDetails) => void
}

export function ShippingForm({ initialValues, onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ShippingDetails>({
    resolver: zodResolver(shippingSchema),
    defaultValues: initialValues,
  })

  const watchCountry = watch("country")

  const handleFormSubmit = (data: ShippingDetails) => {
    onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input id="firstName" {...register("firstName")} className={errors.firstName ? "border-red-500" : ""} />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input id="lastName" {...register("lastName")} className={errors.lastName ? "border-red-500" : ""} />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input id="phone" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input id="apartment" {...register("apartment")} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input id="city" {...register("city")} className={errors.city ? "border-red-500" : ""} />
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">
                State/Province <span className="text-red-500">*</span>
              </Label>
              <Input id="state" {...register("state")} className={errors.state ? "border-red-500" : ""} />
              {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">
                Postal Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                {...register("postalCode")}
                className={errors.postalCode ? "border-red-500" : ""}
              />
              {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select defaultValue={initialValues.country} onValueChange={(value) => setValue("country", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Thailand">Thailand</SelectItem>
                <SelectItem value="Singapore">Singapore</SelectItem>
                <SelectItem value="Malaysia">Malaysia</SelectItem>
                <SelectItem value="Vietnam">Vietnam</SelectItem>
                <SelectItem value="Indonesia">Indonesia</SelectItem>
              </SelectContent>
            </Select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            Continue to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

