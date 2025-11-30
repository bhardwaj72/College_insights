import { Target, Users, Heart, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  const team = [
    { name: 'Rahul', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Priya', role: 'Head of Content', emoji: '👩‍💻' },
    { name: 'Arjun', role: 'Tech Lead', emoji: '👨‍🔧' },
    { name: 'Sneha', role: 'Community Manager', emoji: '👩‍🎓' }
  ]

  const values = [
    { icon: Target, title: 'Authenticity', desc: 'Real reviews from real students' },
    { icon: Users, title: 'Community', desc: 'Built by students, for students' },
    { icon: Heart, title: 'Transparency', desc: 'No paid promotions or bias' },
    { icon: Sparkles, title: 'Innovation', desc: 'Modern tools for college discovery' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9A7EB]/20 via-[#F8FAFB] to-[#FFD6E0]/20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#C9A7EB]/30 via-[#00B4D8]/20 to-[#FFD6E0]/30 py-20">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-[#2F2F2F]">
              We're Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8]">Future</span> of College Discovery
            </h1>
            <p className="text-xl text-[#2F2F2F]/70 leading-relaxed">
              College Insights is India's first student-powered college review platform. We believe every student deserves honest, unbiased information to make the right choice.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-16">
        {/* Mission */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <CardContent className="p-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold font-heading mb-4 text-[#2F2F2F]">Our Mission</h2>
              <p className="text-lg text-[#2F2F2F]/70 leading-relaxed">
                To democratize college admissions by providing transparent, student-driven insights. We're eliminating information asymmetry and helping lakhs of students make confident decisions about their future.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold font-heading text-center mb-12 text-[#2F2F2F]">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Card
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#C9A7EB]/20 to-[#00B4D8]/20 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-[#8A2BE2]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F2F2F]">{value.title}</h3>
                  <p className="text-sm text-[#2F2F2F]/60">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="mb-16 bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] rounded-3xl border-none shadow-[0_10px_40px_rgba(138,43,226,0.3)]">
          <CardContent className="p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-white/80">Reviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-white/80">Colleges</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-white/80">Students Helped</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-white/80">Authenticity Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold font-heading text-center mb-12 text-[#2F2F2F]">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <Card
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#C9A7EB]/20 to-[#00B4D8]/20 rounded-full flex items-center justify-center text-4xl">
                    {member.emoji}
                  </div>
                  <h3 className="font-bold text-lg text-[#2F2F2F]">{member.name}</h3>
                  <p className="text-sm text-[#2F2F2F]/60">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
