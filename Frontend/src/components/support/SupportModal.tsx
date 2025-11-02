"use client"

import type React from "react"
import { X } from "lucide-react"
import DonationForm from "./DonationForm"

interface SupportWay {
  title: string
  description: string
  fullDescription: string
  benefits: string[]
  icon: React.ComponentType<{ className?: string }>
  image: string
}

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
  supportWay: SupportWay | null
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, supportWay }) => {
  if (!isOpen || !supportWay) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-800">{supportWay.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <img
              src={supportWay.image || "/placeholder.svg"}
              alt={supportWay.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div>
            <p className="text-gray-600 leading-relaxed">{supportWay.fullDescription}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Benefits</h3>
            <ul className="space-y-2">
              {supportWay.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 font-bold mr-3">✓</span>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Support Now</h3>
            <DonationForm supportType={supportWay.title} onSuccess={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportModal
