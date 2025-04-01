"use client"

import { QRCode } from "qrcode.react"
import generatePayload from "promptpay-qr"

export default function PromptPayQRCode({
  promptpayId,
  amount,
}: {
  promptpayId: string
  amount: number
}) {
  const payload = generatePayload(promptpayId, { amount })

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <h2 className="text-lg font-semibold">PromptPay QR Code</h2>
      <QRCode value={payload} size={200} />
      <p className="text-sm text-muted-foreground">
        Scan with your banking app to pay ฿{amount.toFixed(2)}
      </p>
    </div>
  )
}
