export default function ThankYouPage() {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Your order has been placed successfully. We appreciate your purchase.
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition"
          >
            Back to Home
          </a>
          <a
            href="/products"
            className="inline-block px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition"
          >
            Shop More
          </a>
        </div>
      </div>
    )
  }
  