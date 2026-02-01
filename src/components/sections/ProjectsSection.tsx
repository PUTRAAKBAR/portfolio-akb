"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Tambahkan ChevronUp di import
import { Code, Video, Github, ExternalLink, X, Play, Camera, Grid, Award, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import portfolio from "../../data/portfolio.json";

export default function ProjectsSection() {
    const [activeTab, setActiveTab] = useState<"all" | "developer" | "creative" | "certification">("all");
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

    // State limit item
    const [visibleItems, setVisibleItems] = useState(3);
    const projectsRef = useRef<HTMLDivElement>(null); // Ref untuk scroll balik saat Show Less

    // Reset saat ganti tab
    useEffect(() => {
        setVisibleItems(3);
    }, [activeTab]);

    const allItems = portfolio.projects.items;
    let filteredProjects = [];

    if (activeTab === "all") {
        filteredProjects = allItems.filter((item: any) => item.featured === true);
    } else {
        filteredProjects = allItems.filter((item: any) => item.category === activeTab);
    }

    const projectsToDisplay = activeTab === "all"
        ? filteredProjects
        : filteredProjects.slice(0, visibleItems);

    const tabs = [
        { id: "all", label: "All", icon: <Grid size={16} /> },
        { id: "developer", label: "Developer", icon: <Code size={16} /> },
        { id: "creative", label: "Creative", icon: <Video size={16} /> },
        { id: "certification", label: "Certifications", icon: <Award size={16} /> },
    ];

    // Fungsi Show More
    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + 3);
    };

    // Fungsi Show Less
    const handleShowLess = () => {
        setVisibleItems(3);
        // Scroll halus balik ke bagian atas list project agar user tidak bingung
        if (projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="relative w-full py-20 px-6 lg:px-12 bg-[#050505] overflow-hidden" id="projects">
            <div className="absolute left-[-20%] top-[10%] w-[600px] h-[600px] bg-[#6D12C3] opacity-10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-[#C174FF] opacity-10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-jakarta font-bold text-white mb-4"
                        dangerouslySetInnerHTML={{ __html: portfolio.projects.title }}
                    />
                    <motion.p
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 font-poppins max-w-lg"
                    >
                        {portfolio.projects.subtitle}
                    </motion.p>

                    <div className="flex flex-wrap justify-center items-center gap-1 p-1.5 mt-8 bg-white/5 border border-white/10 rounded-full backdrop-blur-md relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full font-jakarta font-medium text-sm transition-all duration-300 ${activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabBackground"
                                        className="absolute inset-0 bg-[#6D12C3] rounded-full z-[-1] shadow-[0_0_15px_#6D12C3]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pasang Ref disini untuk target scroll saat Show Less */}
                <div ref={projectsRef} className="scroll-mt-32" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
                    >
                        {/* --- VIEW 1: SELECTED / ALL (BENTO GRID) --- */}
                        {activeTab === "all" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
                                {projectsToDisplay.map((project: any, index: number) => (
                                    <BentoCard
                                        key={project.id}
                                        data={project}
                                        index={index}
                                        onClick={() => setSelectedMedia(project)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* --- VIEW 2: DEVELOPER (STANDARD GRID) --- */}
                        {activeTab === "developer" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projectsToDisplay.map((project: any) => (
                                    <DeveloperCard key={project.id} data={project} />
                                ))}
                            </div>
                        )}

                        {/* --- VIEW 3: CREATIVE (MASONRY-LIKE) --- */}
                        {activeTab === "creative" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projectsToDisplay.map((project: any) => (
                                    <CreativeCard key={project.id} data={project} onOpen={() => setSelectedMedia(project)} />
                                ))}
                            </div>
                        )}

                        {/* --- VIEW 4: CERTIFICATION (LIST/GRID) --- */}
                        {activeTab === "certification" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {projectsToDisplay.length > 0 ? (
                                    projectsToDisplay.map((project: any) => (
                                        <CertificationCard key={project.id} data={project} onOpen={() => setSelectedMedia(project)} />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-gray-500 font-poppins bg-white/5 rounded-2xl border border-white/5">
                                        No certification data found.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* --- BUTTONS ACTION (Show More / Show Less) --- */}
                        {activeTab !== "all" && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex justify-center gap-4 mt-12"
                            >
                                {/* Tombol SHOW MORE (Muncul jika masih ada sisa item) */}
                                {visibleItems < filteredProjects.length && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C174FF] rounded-full text-gray-300 hover:text-white transition-all duration-300 group"
                                    >
                                        <span>Show More</span>
                                        <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                                    </button>
                                )}

                                {/* Tombol SHOW LESS (Muncul jika item yang tampil > 3) */}
                                {visibleItems > 3 && (
                                    <button
                                        onClick={handleShowLess}
                                        className="flex items-center gap-2 px-6 py-3 bg-[#6D12C3]/10 hover:bg-[#6D12C3]/20 border border-[#6D12C3]/30 hover:border-[#C174FF] rounded-full text-[#C174FF] hover:text-white transition-all duration-300 group"
                                    >
                                        <span>Show Less</span>
                                        <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                )}
                            </motion.div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            <MediaModal selectedMedia={selectedMedia} onClose={() => setSelectedMedia(null)} />
        </section>
    );
}

// --- SUB-COMPONENTS  ---

function BentoCard({ data, index, onClick }: any) {
    const isLarge = index === 0;
    const isWide = index === 4 || index === 8;
    const isTall = index === 2 || index === 5;

    let gridClass = "col-span-1 row-span-1";
    if (isLarge) gridClass = "md:col-span-2 md:row-span-2";
    else if (isWide) gridClass = "md:col-span-2 row-span-1";
    else if (isTall) gridClass = "col-span-1 md:row-span-2";

    return (
        <motion.div
            whileHover={{ scale: 0.98 }}
            onClick={onClick}
            className={`group relative rounded-[24px] overflow-hidden cursor-pointer bg-[#1a1a1a] border border-white/5 hover:border-[#C174FF]/50 transition-all duration-500 ${gridClass}`}
        >
            <div className="absolute inset-0">
                <Image
                    src={data.thumbnail || data.src || "/images/placeholder.jpg"}
                    alt={data.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/5 text-[10px] uppercase font-bold tracking-wider text-white">
                {data.category}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#C174FF] text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    VIEW PROJECT
                </p>
                <h3 className={`font-jakarta font-bold text-white leading-tight ${isLarge ? "text-3xl" : "text-xl"}`}>
                    {data.title}
                </h3>
            </div>
        </motion.div>
    );
}

function CertificationCard({ data, onOpen }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onOpen}
            className="group flex items-center gap-4 p-4 bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/5 rounded-[20px] hover:border-[#6D12C3]/50 hover:bg-white/5 cursor-pointer transition-all duration-300"
        >
            <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#C174FF] transition-colors">
                <Image src={data.thumbnail} alt={data.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#C174FF]"><Award size={18} /></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-white/10 px-2 py-0.5 rounded-full">
                        {data.issuer || "Certification"}
                    </span>
                </div>
                <h3 className="text-lg font-jakarta font-bold text-white truncate group-hover:text-[#C174FF] transition-colors">{data.title}</h3>
                <p className="text-sm text-gray-500 font-poppins line-clamp-1">{data.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                    <CheckCircle size={14} className="text-green-500" /> Verified Credential
                </div>
            </div>
            <div className="p-2 bg-white/5 rounded-full text-gray-400 group-hover:text-white group-hover:bg-[#6D12C3] transition-all">
                <ExternalLink size={20} />
            </div>
        </motion.div>
    )
}

function DeveloperCard({ data }: any) {
    return (
        <motion.div whileHover={{ y: -5 }} className="group relative bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/5 rounded-[24px] overflow-hidden hover:border-[#6D12C3]/50 transition-all duration-500 flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6D12C3]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="h-40 bg-[#0A0A0A] flex items-start justify-end p-6 relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#6D12C3] opacity-10 blur-[50px] rounded-full" />
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#C174FF]"><Code size={24} /></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-jakarta font-bold text-white mb-3 group-hover:text-[#C174FF] transition-colors">{data.title}</h3>
                <p className="text-gray-400 font-poppins text-sm mb-6 flex-1 leading-relaxed">{data.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {data.techStack?.map((tech: string, index: number) => (
                            <span key={index} className="px-3 py-1 text-[10px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full">{tech}</span>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                        {data.githubUrl && (<Link href={data.githubUrl} target="_blank" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></Link>)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function CreativeCard({ data, onOpen }: any) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} onClick={onOpen} className="group relative aspect-[4/5] bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/5 rounded-[24px] overflow-hidden cursor-pointer hover:border-[#C174FF]/50 transition-all duration-500">
            <div className="absolute inset-0">
                <Image src={data.thumbnail} alt={data.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </div>
            {data.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"><Play fill="currentColor" size={24} /></div>
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md rounded-lg text-[#C174FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.type === 'video' ? <Video size={16} /> : <Camera size={16} />}
                </div>
                <h3 className="text-lg font-jakarta font-bold text-white">{data.title}</h3>
            </div>
        </motion.div>
    );
}

// --- HELPER FUNCTION: Deteksi Link YouTube / GDrive ---
const getEmbedUrl = (url: string) => {
    if (!url) return null;

    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) {
        return {
            type: 'youtube',
            src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
        };
    }

    const driveMatch = url.match(/\/d\/(.*?)\//);
    if (url.includes('drive.google.com') && driveMatch) {
        return {
            type: 'drive',
            src: `https://drive.google.com/file/d/${driveMatch[1]}/preview`
        };
    }

    return null;
};

function MediaModal({ selectedMedia, onClose }: any) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const embedData = selectedMedia ? getEmbedUrl(selectedMedia.src) : null;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Auto Play Logic (Khusus Video Local)
    useEffect(() => {
        if (selectedMedia?.type === 'video' && !embedData && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    }, [selectedMedia, embedData]);

    if (!selectedMedia) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 lg:p-8"
            >
                {/* Tombol Close */}
                <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10 bg-white/10 p-2 rounded-full">
                    <X size={24} />
                </button>

                {/* Container Utama Modal */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(109,18,195,0.2)] border border-white/10 bg-[#0A0A0A] flex flex-col"
                >

                    {/* 1. AREA MEDIA */}
                    <div className="relative flex-1 w-full bg-black min-h-0 flex items-center justify-center overflow-hidden">

                        {/* KONDISI 1: JIKA LINK YOUTUBE / GOOGLE DRIVE */}
                        {embedData ? (
                            <iframe
                                src={embedData.src}
                                className="w-full h-full aspect-video"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                title={selectedMedia.title}
                            />
                        ) :
                            /* KONDISI 2: VIDEO LOCAL / MP4 */
                            selectedMedia.type === 'video' ? (
                                <video
                                    ref={videoRef}
                                    src={selectedMedia.src}
                                    controls
                                    autoPlay
                                    loop
                                    className="w-full h-full max-h-[70vh] object-contain"
                                />
                            ) :
                                /* KONDISI 3: GAMBAR */
                                (
                                    <div className="relative w-full h-full min-h-[50vh]">
                                        <Image src={selectedMedia.src || selectedMedia.thumbnail} alt={selectedMedia.title} fill className="object-contain" />
                                    </div>
                                )}

                    </div>

                    {/* 2. AREA DESKRIPSI */}
                    <div className="w-full p-6 bg-[#121212] border-t border-white/10 z-20 shrink-0">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-jakarta font-bold text-white">{selectedMedia.title}</h3>
                                <p className="text-gray-300 font-poppins text-sm max-w-3xl leading-relaxed">
                                    {selectedMedia.description}
                                </p>
                            </div>

                            {/* Badge Kategori */}
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-[#C174FF] uppercase tracking-wider shrink-0 flex items-center gap-2">
                                {embedData?.type === 'youtube' && <Play size={12} fill="currentColor" />}
                                {embedData?.type === 'drive' && <ExternalLink size={12} />}
                                {selectedMedia.category}
                            </div>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}