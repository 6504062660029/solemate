import { CheckCircle } from "lucide-react"

interface CheckoutStepsProps {
  currentStep: number
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 1, name: "Shipping" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Confirmation" },
  ]

  return (
    <div className="relative">
      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
      <ol className="relative z-10 flex justify-between">
        {steps.map((step) => (
          <li key={step.id} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : <span>{step.id}</span>}
            </div>
            <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? "text-primary" : "text-gray-500"}`}>
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

