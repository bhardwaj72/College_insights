'use client'

import { Mail, MessageCircle, MapPin, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9A7EB]/20 via-[#F8FAFB] to-[#00B4D8]/20">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/40 py-12">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-[#2F2F2F]">
              <span className="inline-block">📬</span> Get in Touch
            </h1>
            <p className="text-lg text-[#2F2F2F]/60">
              Have questions? We're here to help!
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#8A2BE2]/20 to-[#00B4D8]/20 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-[#8A2BE2]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#2F2F2F]">Email Us</h3>
              <p className="text-sm text-[#2F2F2F]/60 mb-3">Drop us a line anytime</p>
              <a href="mailto:hello@collegeinsights.in" className="text-[#8A2BE2] font-medium hover:underline">
                hello@collegeinsights.in
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00B4D8]/20 to-[#C9A7EB]/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-[#00B4D8]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#2F2F2F]">Chat with Buddy</h3>
              <p className="text-sm text-[#2F2F2F]/60 mb-3">Get instant help</p>
              <button className="text-[#00B4D8] font-medium hover:underline">
                Start Chat →
              </button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#FFD6E0]/30 to-[#C9A7EB]/20 rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-[#C9A7EB]" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#2F2F2F]">Visit Us</h3>
              <p className="text-sm text-[#2F2F2F]/60 mb-3">Come say hi</p>
              <p className="text-sm text-[#2F2F2F]/70">
                Bangalore, India
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold font-heading mb-6 text-[#2F2F2F]">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2F2F2F]">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2F2F2F]">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your query..."
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-8 text-[#2F2F2F]">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How do you verify reviews?', a: 'We use multiple verification methods including email verification, college ID checks, and AI-powered authenticity scoring.' },
              { q: 'Can I trust the ratings?', a: 'Yes! All our reviews are from verified students. We have a strict no-paid-promotion policy.' },
              { q: 'How can I contribute?', a: 'You can submit reviews, answer questions, or even join our team of college ambassadors!' },
              { q: 'Is this platform free?', a: 'Absolutely! College Insights is 100% free for students.' }
            ].map((faq, idx) => (
              <Card
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(138,43,226,0.12)] transition-all"
              >
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#2F2F2F] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#2F2F2F]/60">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
