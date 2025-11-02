"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Heart, Globe } from "lucide-react"

const impacts = [
  {
    icon: Users,
    number: "5000+",
    title: "Students Supported",
    description: "Providing education and guidance to practitioners worldwide",
  },
  {
    icon: BookOpen,
    number: "1000+",
    title: "Teaching Hours",
    description: "Delivering quality Buddhist education and meditation instruction",
  },
  {
    icon: Heart,
    number: "20+",
    title: "Community Programs",
    description: "Supporting local communities through various initiatives",
  },
  {
    icon: Globe,
    number: "10+",
    title: "Countries Reached",
    description: "Spreading Buddhist wisdom across international borders",
  },
]

const ImpactSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-gray-600">Your support helps us make a difference</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
            >
              <impact.icon className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-red-600 mb-2">{impact.number}</h3>
              <h4 className="text-xl font-semibold mb-2">{impact.title}</h4>
              <p className="text-gray-600">{impact.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
