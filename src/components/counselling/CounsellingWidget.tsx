'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function CounsellingWidget() {
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [countdown, setCountdown] = useState(5)
    const [showTip, setShowTip] = useState(true)

    useEffect(() => {
        if (open) document.body.classList.add('counselling-open')
        else document.body.classList.remove('counselling-open')

        return () => document.body.classList.remove('counselling-open')
    }, [open])


    useEffect(() => {
        if (!submitted) return

        const timer = setInterval(() => {
            setCountdown((c) => {
                if (c === 1) {
                    clearInterval(timer)
                    setOpen(false)
                    setSubmitted(false)
                    return 5
                }
                return c - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [submitted])

    /* =========================
       FLOATING COUNSELLING ICON
       ========================= */

    if (!open) {
        return (
            <div className="fixed bottom-6 left-6 z-50">
                <div className="relative group">

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/30" />
                    <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-500/20" />

                    {/* Icon Button */}
                    <button
                        onClick={() => {
                            setOpen(true)
                            setShowTip(false)
                        }}
                        className="relative w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-10"
                    >
                        <Image
                            src="/images/counselling.png"
                            alt="Free Counselling"
                            width={42}
                            height={42}
                            className="object-contain"
                        />
                    </button>

                    {/* Tooltip */}
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                        <div className="bg-black text-white text-sm px-4 py-2 rounded-md shadow-xl whitespace-nowrap">
                            Get Free Counselling
                        </div>
                    </div>

                </div>
            </div>

        )
    }

    /* =========================
         MODAL WINDOW
       ========================= */

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md" />

            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative">

                    <button
                        onClick={() => {
                            setOpen(false)
                            setSubmitted(false)
                            setCountdown(5)
                        }}
                        className="absolute right-4 top-4 text-slate-400 hover:text-black"
                    >
                        <X />
                    </button>

                    {!submitted ? (
                        <>
                            <h3 className="text-3xl font-bold text-center mb-8">
                                🎓 Get Free Career Counselling
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <input className="c-input" placeholder="Full Name" />
                                <input className="c-input" placeholder="Mobile Number" />
                                <input className="c-input" placeholder="Age" />
                                <input className="c-input" placeholder="City" />
                                <input className="c-input" placeholder="Interested Stream" />
                                <input className="c-input" placeholder="Preferred Course" />
                            </div>

                            <button
                                onClick={() => setSubmitted(true)}
                                className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] text-white font-semibold shadow-lg"
                            >
                                Submit Request
                            </button>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-3xl font-bold mb-2">Request received 🎉</h3>
                            <p className="text-slate-600 mb-4">
                                Our counsellor will contact you shortly
                            </p>

                            <div className="text-sm text-slate-500">
                                Closing in <span className="font-bold text-purple-600">{countdown}</span> seconds
                            </div>

                            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
                                <div
                                    className="h-full bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] transition-all"
                                    style={{ width: `${(countdown / 5) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
