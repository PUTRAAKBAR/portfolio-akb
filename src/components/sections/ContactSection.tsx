"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Star, Github, Linkedin, Instagram, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import portfolio from "../../data/portfolio.json";

export default function ContactSection() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    // Fetch reviews from API on mount
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("/api/reviews");
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
                // Fallback to JSON data if API fails
                setReviews(portfolio.contact.reviews);
            } finally {
                setIsLoadingReviews(false);
            }
        };
        fetchReviews();
    }, []);

    const handleNewReview = (newReview: any) => {
        setReviews((prev) => [newReview, ...prev]);
    };

    return (
        <section className="relative w-full py-24 px-6 lg:px-12 bg-[#050505] overflow-hidden" id="contact">

            <div className="absolute left-0 bottom-0 w-full h-[500px] bg-gradient-to-t from-[#6D12C3]/10 to-transparent pointer-events-none" />
            <div className="absolute right-[-10%] bottom-[-10%] w-[600px] h-[600px] bg-[#6D12C3] opacity-10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-jakarta font-bold text-white mb-4"
                        dangerouslySetInnerHTML={{ __html: portfolio.contact.title }}
                    />
                    <p className="text-gray-400 font-poppins max-w-lg mx-auto">
                        {portfolio.contact.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="p-8 rounded-[30px] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#6D12C3]/30 transition-all duration-300 group">
                            <h3 className="text-2xl font-jakarta font-bold text-white mb-6">Contact Info</h3>

                            <div className="space-y-6">
                                <a href={`mailto:${portfolio.contact.info.email}?subject=${encodeURIComponent(portfolio.contact.info.emailSubject)}`} className="flex items-start gap-4 group/item cursor-pointer">
                                    <div className="p-3 bg-white/5 rounded-xl text-[#C174FF] border border-white/10 group-hover/item:bg-[#6D12C3] group-hover/item:text-white transition-colors duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm font-poppins">Email Me (Click to Send)</p>
                                        <span className="text-white font-medium hover:text-[#C174FF] transition-colors">
                                            {portfolio.contact.info.email}
                                        </span>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl text-[#C174FF] border border-white/10">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm font-poppins">Location</p>
                                        <p className="text-white font-medium">{portfolio.contact.info.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {portfolio.contact.info.socials.map((social, idx) => {
                                let Icon = <Github size={20} />;
                                if (social.name === "LinkedIn") Icon = <Linkedin size={20} />;
                                else if (social.name === "Instagram") Icon = <Instagram size={20} />;

                                return (
                                    <SocialBtn key={idx} icon={Icon} href={social.url} label={social.name} />
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <FeedbackForm onAddReview={handleNewReview} />
                    </motion.div>

                </div>
            </div>

            <div className="relative w-full py-10 border-t border-white/5 bg-[#0A0A0A]/30 backdrop-blur-sm">
                <div className="mb-6 text-center">
                    <h3 className="text-sm font-jakarta font-bold text-gray-500 uppercase tracking-widest">Recent Reviews</h3>
                </div>

                <div className="relative flex overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                    <motion.div
                        initial={{ x: "0%" }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                        className="flex gap-6 px-6"
                    >
                        {[...reviews, ...reviews].map((review, idx) => (
                            <ReviewCard key={`${review.id}-${idx}`} data={review} />
                        ))}
                    </motion.div>
                </div>
            </div>

        </section>
    );
}


// --- COMPONENT: REVIEW CARD (Running) ---
function ReviewCard({ data }: any) {
    return (
        <div className="shrink-0 w-[350px] p-6 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-[#6D12C3]/50 transition-colors duration-300 relative group">
            <Quote className="absolute top-6 right-6 text-white/5 group-hover:text-[#6D12C3]/20 transition-colors" size={40} />

            <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} fill={star <= data.rating ? "#C174FF" : "transparent"} className={star <= data.rating ? "text-[#C174FF]" : "text-gray-700"} />
                ))}
            </div>

            <p className="text-gray-300 font-poppins text-sm leading-relaxed mb-4 line-clamp-3">
                "{data.text}"
            </p>

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                    {data.name.charAt(0)}
                </div>
                <span className="text-sm font-jakarta font-semibold text-white">{data.name}</span>
            </div>
        </div>
    )
}


// --- COMPONENT: SOCIAL BUTTON ---
function SocialBtn({ icon, href, label }: any) {
    return (
        <Link href={href} target="_blank" className="flex-1 group">
            <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-[24px] bg-[#1a1a1a]/40 border border-white/5 hover:bg-[#6D12C3] hover:border-[#6D12C3] transition-all duration-300 cursor-pointer">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <span className="text-xs font-jakarta font-medium text-gray-400 group-hover:text-white">{label}</span>
            </div>
        </Link>
    )
}


// --- COMPONENT: FEEDBACK FORM ---
function FeedbackForm({ onAddReview }: { onAddReview: (review: any) => void }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name || "Anonymous",
                    rating: rating || 5,
                    text: message,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            const newReview = await response.json();
            onAddReview(newReview);
            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting review:", err);
            setError("Gagal mengirim review. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative p-8 rounded-[30px] bg-gradient-to-br from-[#1a1a1a]/80 to-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-center">

            <AnimatePresence mode="wait">

                {!isSubmitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-6 relative z-10"
                    >
                        <div>
                            <h3 className="text-2xl font-jakarta font-bold text-white">Leave a Review</h3>
                            <p className="text-gray-400 text-sm mt-1">Review Anda akan muncul di running text di bawah!</p>
                        </div>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={32}
                                        fill={(hoverRating || rating) >= star ? "#C174FF" : "transparent"}
                                        className={(hoverRating || rating) >= star ? "text-[#C174FF] drop-shadow-[0_0_10px_rgba(193,116,255,0.5)]" : "text-gray-600"}
                                    />
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <input
                                required
                                type="text"
                                placeholder="Nama Anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C174FF] focus:bg-white/10 transition-all font-poppins text-sm"
                            />
                            <textarea
                                required
                                rows={4}
                                placeholder="Tulis pesan atau masukan..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C174FF] focus:bg-white/10 transition-all font-poppins text-sm resize-none"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-poppins">
                                {error}
                            </div>
                        )}

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full py-4 bg-[#6D12C3] hover:bg-[#570EA0] rounded-xl text-white font-bold font-jakarta flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(109,18,195,0.3)] hover:shadow-[0_0_30px_rgba(109,18,195,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <span className="animate-pulse">Posting...</span> : <>Post Review <Send size={18} /></>}
                        </button>
                    </motion.form>

                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center space-y-4 py-10"
                    >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_#22c55e]">
                                <Send className="text-white" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-jakarta font-bold text-white">Review Posted!</h3>
                        <p className="text-gray-400 font-poppins max-w-xs">
                            Terima kasih, {name}! Review Anda sekarang sudah muncul di barisan bawah.
                        </p>
                        <button
                            onClick={() => { setIsSubmitted(false); setRating(0); setName(""); setMessage(""); }}
                            className="mt-6 text-[#C174FF] text-sm font-semibold hover:text-white transition-colors flex items-center gap-1"
                        >
                            Tulis lagi <ArrowRight size={14} />
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#6D12C3] opacity-20 blur-[80px] rounded-full pointer-events-none" />
        </div>
    );
}