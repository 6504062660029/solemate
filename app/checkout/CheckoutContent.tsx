import PaymentMethod from "@/components/checkout/PaymentMethod"

export default function CheckoutContent() {
    const { paymentMethod } = useCheckout()
    const [form, setForm] = useState(...)
    const handlePlaceOrder = async () => { ... }
  
    return (
      <div className="space-y-6">
        <ShippingForm ... />
        <PaymentMethod />
        <OrderSummary />
        {paymentMethod === "card" && <CardForm />}
        {paymentMethod === "bank" && <SlipUpload />}
        {paymentMethod === "promptpay" && <PromptPayQR />}
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    )
  }
  