import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <span className="font-heading font-bold text-xl">College Insights</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for authentic college reviews and insights. 
              Made by students, for students.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">Explore Colleges</Link></li>
              <li><Link href="/compare" className="text-muted-foreground hover:text-primary transition-colors">Compare Colleges</Link></li>
              <li><Link href="/insights" className="text-muted-foreground hover:text-primary transition-colors">Insights & Reviews</Link></li>
              <li><Link href="/submit-review" className="text-muted-foreground hover:text-primary transition-colors">Submit Review</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Popular Cities</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Delhi NCR</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Bangalore</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Mumbai</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Chennai</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pune</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@collegeinsights.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Delhi, India</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                © 2024 College Insights. All rights reserved.
              </p>
              <div className="flex space-x-4 text-xs mt-2">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
