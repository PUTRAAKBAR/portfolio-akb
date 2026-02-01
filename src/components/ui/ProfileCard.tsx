"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, MapPin, Calendar, User, Briefcase, Repeat } from "lucide-react";

export default function ProfileCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const profile = {
        name: "Putra Akbar",
        role: "Mahasiswa",
        username: "@barssky_",
        image: "/images/ProfileCard.png",
        details: {
            age: "21 Tahun",
            occupation: "Mahasiswa Informatika",
            email: "putraakbarrafsanjani@gmail.com",
            location: "Malang, Indonesia",
            status: "Mahasiswa Aktif"
        }
    };

    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        // 1. WRAPPER FLOATING
        <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="perspective-1000"
        >

            {/* 2. CONTAINER TILT */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-[320px] h-[450px] cursor-pointer group"
            >

                {/* 3. FLIPPING ANIMATION CONTAINER */}
                <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full h-full relative"
                >

                    {/* ==============================
                SISI DEPAN (FRONT)
               ============================== */}
                    <div
                        className="absolute inset-0 w-full h-full bg-[#1a1a1a] rounded-[30px] overflow-hidden border border-white/10 shadow-2xl backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none overflow-hidden">
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%]"
                                style={{
                                    background: "conic-gradient(from 0deg, transparent 0deg, #6D12C3 120deg, #00FFFF 180deg, #C174FF 240deg, transparent 360deg)",
                                    filter: "blur(60px)"
                                }}
                            />
                        </div>

                        {/* Konten Depan */}
                        <div className="absolute top-8 left-0 w-full text-center z-20">
                            <h3 className="font-jakarta font-bold text-xl text-white/90">{profile.name}</h3>
                            <p className="font-poppins text-sm text-gray-400">{profile.role}</p>
                        </div>

                        <div className="absolute inset-0 top-10 flex items-end justify-center z-10">
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a] z-20" />
                                <Image
                                    src={profile.image}
                                    alt="Profile"
                                    fill
                                    className="object-cover object-top scale-[1.1] translate-y-4"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-between px-2 pl-4 z-30 shadow-lg">
                            <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-full bg-gray-500 overflow-hidden border border-white/20">
                                    <Image src={profile.image} alt="Avatar" fill className="object-cover object-top" />
                                </div>
                                <span className="text-xs font-jakarta text-white">{profile.username}</span>
                            </div>
                            <div className="bg-white/20 text-white text-[10px] font-medium px-3 py-2 rounded-full flex items-center gap-1 hover:bg-[#6D12C3] transition-colors">
                                <Repeat size={10} /> Flip
                            </div>
                        </div>
                    </div>


                    {/* ==============================
                SISI BELAKANG (BACK - BIODATA)
               ============================== */}
                    <div
                        className="absolute inset-0 w-full h-full bg-[#0A0A0A] rounded-[30px] overflow-hidden border border-[#6D12C3]/50 shadow-2xl p-6 flex flex-col items-center justify-center text-center backface-hidden"
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                        }}
                    >
                        <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none overflow-hidden">
                            <motion.div
                                animate={{
                                    rotate: [360, 0],
                                    scale: [1.2, 1, 1.2]
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%]"
                                style={{
                                    background: "conic-gradient(from 0deg, transparent 0deg, #C174FF 100deg, #6D12C3 200deg, #00FFFF 300deg, transparent 360deg)",
                                    filter: "blur(50px)"
                                }}
                            />
                        </div>

                        {/* Content Biodata */}
                        <div className="relative z-10 w-full h-full flex flex-col">

                            <div className="mb-6 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full border-2 border-[#6D12C3] p-1 mb-3 bg-black/50 backdrop-blur-sm">
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <Image src={profile.image} alt="Profile" fill className="object-cover object-top" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold font-jakarta text-white">Biodata</h3>
                                <div className="w-10 h-1 bg-[#6D12C3] rounded-full mt-2" />
                            </div>

                            <div className="space-y-3 flex-1 text-left w-full px-1">
                                {/* 1. UMUR */}
                                <BioItem icon={<User size={16} />} label="Umur" value={profile.details.age} />

                                {/* 2. PEKERJAAN */}
                                <BioItem icon={<Briefcase size={16} />} label="Pekerjaan" value={profile.details.occupation} />

                                {/* 3. EMAIL */}
                                <BioItem icon={<Mail size={16} />} label="Email" value={profile.details.email} />

                                <div className="pt-2 border-t border-white/10 mt-2 space-y-3">
                                    <BioItem icon={<MapPin size={16} />} label="Lokasi" value={profile.details.location} />
                                    <BioItem icon={<Calendar size={16} />} label="Status" value={profile.details.status} />
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-500 mt-auto font-poppins pt-4">
                                *Tap card to flip back
                            </p>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// Komponen BioItem
function BioItem({ icon, label, value }: any) {
    return (
        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#6D12C3]/50 hover:bg-white/10 transition-colors backdrop-blur-sm">
            <div className="text-[#C174FF] mt-0.5">{icon}</div>
            <div className="flex-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-jakarta font-medium text-white break-words leading-tight">{value}</p>
            </div>
        </div>
    )
}