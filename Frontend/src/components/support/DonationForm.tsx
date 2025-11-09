"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle } from "lucide-react"

interface DonationFormProps {
  supportType: string
  onSuccess?: () => void
}

const DonationForm: React.FC<DonationFormProps> = ({ supportType, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    frequency: supportType === "Monthly Giving" ? "monthly" : "one-time",
    screenshot: null as File | null,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (["One-time Donation", "Monthly Giving"].includes(supportType)) {
      if (!formData.amount) newErrors.amount = "Amount is required"
      else if (Number.parseFloat(formData.amount) <= 0) {
        newErrors.amount = "Amount must be greater than 0"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      console.log("Form submitted:", formData)

      if (onSuccess) {
        onSuccess()
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          amount: "",
          frequency: supportType === "Monthly Giving" ? "monthly" : "one-time",
          screenshot: null,
        })
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-2">Your generous {supportType.toLowerCase()} has been received.</p>
        <p className="text-sm text-gray-500">
          A confirmation email will be sent to <span className="font-semibold">{formData.email}</span>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Bank Details Section */}
      {["One-time Donation", "Monthly Giving"].includes(supportType) && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Bank Transfer Details</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Name:</span> B.T.M.C. Foundation</p>
            <p><span className="font-medium">A/c no.:</span> 0570155982700014</p>
            <p><span className="font-medium">Bank:</span> Prabhu Bank (Boudha Branch)</p>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Please transfer your donation to the above account and upload the payment screenshot below.
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          required
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
            errors.name ? "border-red-500" : ""
          }`}
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            if (errors.name) setErrors({ ...errors, name: "" })
          }}
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input
          type="email"
          required
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
            errors.email ? "border-red-500" : ""
          }`}
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
            if (errors.email) setErrors({ ...errors, email: "" })
          }}
          disabled={isLoading}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {["One-time Donation", "Monthly Giving"].includes(supportType) && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              required
              step="0.01"
              min="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                errors.amount ? "border-red-500" : ""
              }`}
              placeholder="Enter donation amount"
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value })
                if (errors.amount) setErrors({ ...errors, amount: "" })
              }}
              disabled={isLoading}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Screenshot (Required)
            </label>
            <input
              type="file"
              accept="image/*"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              onChange={handleFileChange}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Please upload a screenshot of your bank transfer confirmation
            </p>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isLoading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700 active:scale-95"
        }`}
      >
        {isLoading ? "Processing..." : supportType === "Volunteer" ? "Submit Application" : "Submit Donation Details"}
      </button>
    </form>
  )
}

export default DonationForm
