"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Users, Briefcase, BookOpen } from "lucide-react"
import SupportModal from "./SupportModal"

interface SupportWay {
  title: string
  description: string
  fullDescription: string
  benefits: string[]
  icon: React.ComponentType<{ className?: string }>
  image: string
}

const supportWays: SupportWay[] = [
  {
    title: "One-time Donation",
    description: "Make a one-time contribution to support our mission",
    fullDescription:
      "Your one-time donation provides immediate support for our programs and helps us respond quickly to community needs.",
    benefits: [
      "Direct impact on our programs",
      "Tax-deductible donation",
      "Receive donation receipt",
      "Support our mission immediately",
    ],
    icon: Heart,
    image: "https://images.unsplash.com/photo-1532996122724-8f3c2cd83c5d?auto=format&fit=crop&q=80",
  },
  {
    title: "Monthly Giving",
    description: "Become a sustaining member with regular donations",
    fullDescription:
      "Become a sustaining member with monthly donations to provide consistent support for our long-term initiatives.",
    benefits: ["Consistent monthly impact", "Tax benefits", "Recognition in our community", "Flexible monthly amount"],
    icon: Users,
    image: "https://images.unsplash.com/photo-1559027615-cd1628902249?auto=format&fit=crop&q=80",
  },
  {
    title: "Volunteer",
    description: "Contribute your time and skills to support us",
    fullDescription: "Join our volunteer team and help us deliver quality programs and services to our community.",
    benefits: [
      "Make a personal impact",
      "Build community connections",
      "Develop new skills",
      "Flexible time commitment",
    ],
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
  },
  {
    title: "In-Kind Donation",
    description: "Donate goods or services to support our mission",
    fullDescription: "Contribute material goods or professional services to help us expand our reach and impact.",
    benefits: ["Tax deductible", "Recycled resources", "Community partnerships", "Special recognition"],
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
  },
]

const SupportWays = () => {
  const [selectedWay, setSelectedWay] = useState<SupportWay | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLearnMore = (way: SupportWay) => {
    setSelectedWay(way)
    setIsModalOpen(true)
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl font-bold mb-4">Ways to Support</h2>
          <p className="text-gray-600">Choose how you'd like to contribute to our mission</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {supportWays.map((way, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
            >
              <way.icon className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{way.title}</h3>
              <p className="text-gray-600">{way.description}</p>
              <button
                onClick={() => handleLearnMore(way)}
                className="mt-4 text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} supportWay={selectedWay} />
    </section>
  )
}

export default SupportWays
