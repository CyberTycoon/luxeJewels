'use client'

import { Header } from "@/app/components/header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Gem, Crown, Heart, Award, Users, Globe, Sparkles, Diamond } from "lucide-react"

export default function About() {
    const values = [
        {
            icon: <Gem className="h-8 w-8" />,
            title: "Exceptional Quality",
            description: "Every piece is crafted with the finest materials and meticulous attention to detail, ensuring lasting beauty and durability."
        },
        {
            icon: <Crown className="h-8 w-8" />,
            title: "Timeless Elegance",
            description: "Our designs blend classic sophistication with contemporary style, creating jewelry that transcends trends and time."
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Personal Touch",
            description: "We believe jewelry tells your story. Our personalized service ensures each piece reflects your unique style and sentiment."
        },
        {
            icon: <Award className="h-8 w-8" />,
            title: "Master Craftsmanship",
            description: "Our artisans bring decades of experience and passion to every creation, upholding the highest standards of jewelry making."
        }
    ]

    const stats = [
        { number: "25+", label: "Years of Excellence" },
        { number: "10,000+", label: "Happy Customers" },
        { number: "500+", label: "Unique Designs" },
        { number: "50+", label: "Master Artisans" }
    ]

    const team = [
        {
            name: "Isabella Martinez",
            role: "Founder & Creative Director",
            image: "/placeholder.svg",
            description: "With over 20 years in luxury jewelry, Isabella founded LuxeJewels with a vision to make exceptional jewelry accessible to all."
        },
        {
            name: "Alexander Chen",
            role: "Master Jeweler",
            image: "/placeholder.svg",
            description: "A third-generation jeweler, Alexander brings traditional techniques and modern innovation to every piece he creates."
        },
        {
            name: "Sofia Laurent",
            role: "Design Director",
            image: "/placeholder.svg",
            description: "Former luxury brand designer, Sofia leads our creative team in developing collections that define contemporary elegance."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="mb-6">
                        <Diamond className="h-16 w-16 text-purple-600 mx-auto mb-4 animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Our Story
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        For over two decades, LuxeJewels has been crafting extraordinary pieces that celebrate life's most precious moments.
                        We believe that every diamond tells a story, every gemstone holds a memory, and every piece of jewelry becomes part of your legacy.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <Card key={index} className="p-8 bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container mx-auto text-center">
                    <Sparkles className="h-16 w-16 mx-auto mb-8 animate-bounce" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
                    <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">
                        To create jewelry that not only adorns but inspires. We're committed to ethical sourcing,
                        sustainable practices, and delivering pieces that bring joy for generations to come.
                        Every LuxeJewels creation is a testament to our dedication to excellence and your trust in our craft.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These principles guide everything we do, from design to delivery
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="p-8 bg-gradient-to-br from-white to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                                <div className="flex items-start space-x-4">
                                    <div className="text-purple-600 group-hover:text-pink-600 transition-colors duration-300">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate artisans and visionaries behind every LuxeJewels creation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <Card key={index} className="p-6 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="absolute -top-2 -right-2">
                                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                            <Crown className="h-3 w-3 mr-1" />
                                            Expert
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                                    <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                A Legacy of Excellence
                            </h2>
                            <div className="space-y-6 text-gray-700">
                                <p className="text-lg leading-relaxed">
                                    Founded in 1999 by Isabella Martinez, LuxeJewels began as a small boutique with a big dream:
                                    to make luxury jewelry accessible without compromising on quality or craftsmanship.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    What started as a passion project has grown into a renowned jewelry house, trusted by customers
                                    worldwide for our commitment to excellence, ethical sourcing, and personalized service.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Today, we continue to honor our founding principles while embracing innovation, ensuring that
                                    every piece we create meets the highest standards of beauty, quality, and ethical responsibility.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <Card className="p-8 bg-gradient-to-br from-white to-purple-50 border-0 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                                <div className="text-center">
                                    <Globe className="h-20 w-20 text-purple-600 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Global Reach</h3>
                                    <p className="text-gray-600 mb-6">
                                        From our headquarters to customers worldwide, we've built a community of jewelry lovers
                                        who appreciate quality and craftsmanship.
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                            <Users className="h-3 w-3 mr-1" />
                                            Trusted Globally
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}