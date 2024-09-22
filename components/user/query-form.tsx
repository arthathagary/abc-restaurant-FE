'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function QueryFormComponent() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [queryType, setQueryType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ subject, message, queryType })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-background rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter the subject of your query"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="queryType">Query Type</Label>
        <Select value={queryType} onValueChange={setQueryType} required>
          <SelectTrigger>
            <SelectValue placeholder="Select query type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cancel_order">Cancel Order</SelectItem>
            <SelectItem value="normal_message">Normal Message</SelectItem>
            <SelectItem value="product_inquiry">Product Inquiry</SelectItem>
            <SelectItem value="shipping_issue">Shipping Issue</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here"
          required
          rows={5}
        />
      </div>

      <Button type="submit" className="w-full">Submit Query</Button>
    </form>
  )
}