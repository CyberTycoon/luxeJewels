'use client'

import { Header } from "@/app/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    Send,
    Star,
    Gift,
    Sparkles,
    Calendar,
    Shield,
    Award
} from "lucide-react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))

        alert('Thank you for your message! We\'ll get back to you within 24 hours.')
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            inquiryType: 'general'
        })
        setIsSubmitting(false)
    }

    const contactInfo = [
        {
            icon: <MapPin className="h-6 w-6" />,
            title: "Visit Our Showroom",
            details: [
                "123 Luxury Avenue",
                "Diamond District, NY 10036",
                "United States"
            ],
            badge: "Flagship Store"
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Call Us",
            details: [
                "+1 (555) 123-LUXE",
                "+1 (555) 123-5893",
                "Toll-free: 1-800-LUXE-GEM"
            ],
            badge: "24/7 Support"
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Us",
            details: [
                "info@luxejewels.com",
                "custom@luxejewels.com",
                "support@luxejewels.com"
            ],
            badge: "Quick Response"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Business Hours",
            details: [
                "Monday - Saturday: 10AM - 8PM",
                "Sunday: 12PM - 6PM",
                "Holiday hours may vary"
            ],
            badge: "Extended Hours"
        }
    ]

    const services = [
        {
            icon: <Gift className="h-8 w-8" />,
            title: "Custom Design",
            description: "Work with our master jewelers to create your dream piece",
            features: ["Free consultation", "3D design preview", "Unlimited revisions"]
        },
        {
            icon: <Sparkles className="h-8 w-8" />,
            title: "Jewelry Repair",
            description: "Expert restoration services for your precious pieces",
            features: ["Same-day service", "Insurance appraisals", "Lifetime warranty"]
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Private Appointments",
            description: "Personalized shopping experience in our VIP suite",
            features: ["One-on-one consultation", "Champagne service", "Private viewing"]
        }
    ]

    const inquiryTypes = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'custom', label: 'Custom Design' },
        { value: 'repair', label: 'Jewelry Repair' },
        { value: 'appointment', label: 'Private Appointment' },
        { value: 'corporate', label: 'Corporate Orders' },
        { value: 'support', label: 'Customer Support' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="mb-6">
                        <MessageCircle className="h-16 w-16 text-purple-600 mx-auto mb-4 animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Get In Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        Whether you're looking for the perfect piece, need expert advice, or want to create something truly unique,
                        our team is here to help make your jewelry dreams come true.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <Card key={index} className="p-6 bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {info.icon}
                                    </div>
                                    <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                        {info.badge}
                                    </Badge>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">{info.title}</h3>
                                    <div className="space-y-2">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-600">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Services */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div>
                            <div className="mb-8">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Send Us a Message
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    We'd love to hear from you. Send us a message and we'll respond within 24 hours.
                                </p>
                            </div>

                            <Card className="p-8 bg-white border-0 shadow-xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Inquiry Type
                                            </label>
                                            <select
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300"
                                            >
                                                {inquiryTypes.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="Tell us more about what you're looking for..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <Send className="h-5 w-5 mr-2" />
                                                Send Message
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </Card>
                        </div>

                        {/* Services */}
                        <div>
                            <div className="mb-8">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Our Services
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Discover the exceptional services we offer to make your jewelry experience unforgettable.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {services.map((service, index) => (
                                    <Card key={index} className="p-6 bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                                        <div className="flex items-start space-x-4">
                                            <div className="text-purple-600 group-hover:text-pink-600 transition-colors duration-300">
                                                {service.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                                                <p className="text-gray-600 mb-4">{service.description}</p>
                                                <div className="space-y-2">
                                                    {service.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                                                            <span className="text-sm text-gray-600">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Why Choose LuxeJewels?</h2>
                        <p className="text-xl opacity-95">Your trust and satisfaction are our highest priorities</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <Shield className="h-16 w-16 mb-4 animate-pulse" />
                            <h3 className="text-2xl font-bold mb-2">Lifetime Warranty</h3>
                            <p className="opacity-90">Comprehensive protection for all our jewelry pieces</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Award className="h-16 w-16 mb-4 animate-pulse" />
                            <h3 className="text-2xl font-bold mb-2">Certified Experts</h3>
                            <p className="opacity-90">GIA certified gemologists and master jewelers</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Star className="h-16 w-16 mb-4 animate-pulse fill-current" />
                            <h3 className="text-2xl font-bold mb-2">5-Star Service</h3>
                            <p className="opacity-90">Rated #1 in customer satisfaction for 5 years running</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map/Location Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Visit Our Showroom
                        </h2>
                        <p className="text-xl text-gray-600">Experience our collection in person at our flagship location</p>
                    </div>

                    <Card className="p-8 bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Diamond District Flagship</h3>
                                <div className="space-y-4 text-gray-600">
                                    <div className="flex items-center">
                                        <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                                        <span>123 Luxury Avenue, Diamond District, NY 10036</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-purple-600 mr-3" />
                                        <span>+1 (555) 123-LUXE</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-purple-600 mr-3" />
                                        <span>Mon-Sat: 10AM-8PM, Sun: 12PM-6PM</span>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-2">
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mr-2">
                                        Free Parking
                                    </Badge>
                                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white mr-2">
                                        VIP Lounge
                                    </Badge>
                                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                        Private Consultation
                                    </Badge>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8 text-center">
                                <MapPin className="h-24 w-24 text-purple-600 mx-auto mb-4" />
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Interactive Map</h4>
                                <p className="text-gray-600 mb-4">Located in the heart of NYC's Diamond District</p>
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                    Get Directions
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600">Quick answers to common questions</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Do you offer custom jewelry design?</h3>
                            <p className="text-gray-600">Yes! Our master jewelers work with you to create one-of-a-kind pieces. Free consultation included.</p>
                        </Card>

                        <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">What is your return policy?</h3>
                            <p className="text-gray-600">We offer a 30-day return policy for unworn items in original condition with receipt.</p>
                        </Card>

                        <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Do you provide jewelry appraisals?</h3>
                            <p className="text-gray-600">Yes, our GIA certified gemologists provide professional appraisals for insurance purposes.</p>
                        </Card>

                        <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">How long does custom design take?</h3>
                            <p className="text-gray-600">Custom pieces typically take 2-4 weeks, depending on complexity. Rush orders available.</p>
                        </Card>

                        <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Do you offer financing options?</h3>
                            <p className="text-gray-600">Yes, we offer flexible payment plans and financing options with approved credit.</p>
                        </Card>

                        <Card className="p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Can I schedule a private appointment?</h3>
                            <p className="text-gray-600">Absolutely! Our VIP suite is available for private consultations. Contact us to schedule.</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container mx-auto text-center">
                    <Sparkles className="h-16 w-16 mx-auto mb-6 animate-bounce" />
                    <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
                    <p className="text-xl mb-8 opacity-95">
                        Subscribe to receive exclusive offers, new collection previews, and jewelry care tips
                    </p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                            Subscribe
                        </Button>
                    </div>
                    <p className="text-sm opacity-80 mt-4">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </section>
        </div>
    )
}