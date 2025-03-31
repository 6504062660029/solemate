"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Database } from "lucide-react"

export function DbStatus() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Database className="h-5 w-5 text-yellow-500 mr-2" />
          <div>
            <AlertTitle>Using Demo Data</AlertTitle>
            <AlertDescription>
              This preview is using demo data. To use real data, configure your database connection.
            </AlertDescription>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
          Dismiss
        </Button>
      </div>
    </Alert>
  )
}

