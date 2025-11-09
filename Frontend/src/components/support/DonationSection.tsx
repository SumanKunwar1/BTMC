"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, Users, Heart, CheckCircle } from "lucide-react"

const DonationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
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
    if (!formData.amount) newErrors.amount = "Amount is required"
    else if (Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    }
    if (!formData.screenshot) newErrors.screenshot = "Payment screenshot is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshot: e.target.files[0] })
      if (errors.screenshot) setErrors({ ...errors, screenshot: "" })
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
      console.log("Donation submitted:", formData)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", amount: "", screenshot: null })
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dihev9qxc/image/upload/v1762075318/a-cinematic-wide-angle-photograph-of-a-m_CYibIl1yTZq0NLAJZrcvzA_I_igCA0-S7CF5gMT-vWVEA_wggrfk.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
            <p className="text-lg mb-8">
              Your generous donation helps us maintain our facilities, support our teachers, and continue providing
              Buddhist education and meditation programs to our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: "Transparent", text: "Clear use of funds" },
                { icon: Users, title: "Impactful", text: "Helping thousands" },
                { icon: Heart, title: "Meaningful", text: "Supporting dharma" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Generosity!</h3>
                <p className="text-gray-600 mb-2">
                  Your donation of ${formData.amount} has been received successfully.
                </p>
                <p className="text-sm text-gray-500">
                  A confirmation email will be sent to <span className="font-semibold">{formData.email}</span>
                </p>
                <p className="text-sm text-gray-500 mt-4">Your support will make a real difference in our community.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6">Make a Donation</h3>
                
                {/* Bank Details */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
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

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Donation Amount ($)</label>
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
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.screenshot ? "border-red-500" : ""
                      }`}
                      onChange={handleFileChange}
                      disabled={isLoading}
                    />
                    {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Please upload a screenshot of your bank transfer confirmation
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      isLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700 active:scale-95"
                    }`}
                  >
                    {isLoading ? "Processing Donation..." : "Submit Donation Details"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DonationSection