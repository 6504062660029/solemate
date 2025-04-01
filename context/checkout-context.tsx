import { createContext, useContext, useState } from "react"

const CheckoutContext = createContext<any>(null)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [paymentMethod, setPaymentMethod] = useState("cod")

  return (
    <CheckoutContext.Provider value={{ paymentMethod, setPaymentMethod }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  return useContext(CheckoutContext)
}
