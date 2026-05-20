import { motion } from 'framer-motion';
import { Camera, Aperture, Film, Sparkles } from 'lucide-react';
import { Timeline } from '@/components/ui/timeline';

const IMAGE_SHADOW = "shadow-[0_0_24px_rgba(212,175,55,0.06),_0_1px_1px_rgba(0,0,0,0.3),_0_0_0_1px_rgba(212,175,55,0.08),_0_0_4px_rgba(212,175,55,0.08),_0_16px_68px_rgba(0,0,0,0.4),_0_1px_0_rgba(255,255,255,0.05)_inset]";

const timelineEvents = [
    {
        year: "2018",
        title: "The First Cut",
        subtitle: "La Genèse",
        description: "Founded in a small Parisian loft, driven by a singular obsession: to capture the uncapturable. Our first short film garnered international acclaim at Cannes.",
        icon: <Aperture className="text-[#D4AF37]" size={16} />,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqhS-tIdQU0iNaQycs4x540iPbrO5glmQozPKJupd6SBTY019QNC0pNEYEGYkLqF6gD6IyeDMsPflRWgCOWU5rsdzyGH3Bk5JNoIo0wAZ--z9kMjW660zFjVmOsii9b1f7EPuz4wjpOXvpnylxt-gHWIG-dsWrMoabVD2Uw_P_N_WDl5Ft9i_pfTRRN8nBaeVFqneFDFrDyAhIyCnUn1eURxjBIyxxVQ2vmsel1uwEjvXB0Smq8h1Zn-lmfKw2aWi8RMjoNWv5Z5mm",
        image2: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    },
    {
        year: "2020",
        title: "Expanding Horizons",
        subtitle: "L'Expansion",
        description: "London called. We answered by opening our second studio dedicated to high-fidelity sound design, integrating Dolby Atmos workflows for immersive storytelling.",
        icon: <Camera className="text-[#D4AF37]" size={16} />,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASn-o7IpfVneytaIbMKBfE9j25FSJW0cV2mIZn-BUObJJTuaTXrkzzW49di_1EYXRGCXDKhz9Y_6Ei42Io4uQpiQOeeJA3ihTxj3kTRnx90mZjcjobDjHpamJ2gpbg44DxvumGii296P-A1c9DFVdzsicU3LKbQRjx6jQ9PQYy09aJN-V2BKSTI4T-y37soQ2FlUeYCUD3Ljbb7-MsB5kOXjNVsCgUQcReCUU-fNc9h4qzL5EZyDoWzRz31xLtjKxOpd8HwfVjHSwd",
        image2: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    },
    {
        year: "2022",
        title: "Global Recognition",
        subtitle: "La Consécration",
        description: "With projects spanning three continents, Voix d'Or became synonymous with luxury visual branding. Our New York office launched to serve major fashion houses.",
        icon: <Film className="text-[#D4AF37]" size={16} />,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeW0I2ROD5oETG10MatfyPZWtI21dhAC_XHbyRk9xf0JYAdwPlJlZlBG5PNr6Qrh8LKV1y5rHq8wll8VitQlHbTrar_z5cp1TleBZGdD2kVqe7TidPlJrdSmRPMnLuyY_m74UBuYrwVSmWpZ-Gs3sRP3L2R2PNgsYHIX4mJgcLY_hIMdAtHS7RTpwXaa3AxVh0z0jxD97hrnBOJoud6ZBap82iO9Xv-t1xlMjB88GMwyNxXy9HWnrbhDmDygARLmD2wTTQW2IfVgPd",
        image2: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
    },
    {
        year: "2024",
        title: "The New Era",
        subtitle: "L'Ère Nouvelle",
        description: "Embracing AI and virtual production. We are not just recording reality; we are building new ones. The studio expands into interactive media and VR.",
        icon: <Sparkles className="text-[#D4AF37]" size={16} />,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmxy56WN3P_Cr2WOgosg1MZd4u5c7F7FPY1BximpXHNAWVhHs2X_PNdcW6Rwi0MmV_u8vEQqc47LD6XgY8oF8s88FSxKE3upa40GWB3Ge8--ZftUgZK5m__vzlhDR8WbE_cfW5Sc60zjodbubV5NqV06u5Gtafmet6qERkMiHcEalrk0oov_fWSwzaLmV8PMkVo17nAkxrNQMHGA6-dI1DrouUT74C6b9fHhvTnbym9V2u7vD3cweDLKFoelTn0FTBORDF6-F9-zq2",
        image2: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    }
];

export const TimelineSection = () => {
    const timelineData = timelineEvents.map((event) => ({
        title: event.year,
        content: (
            <div>
                {/* Subtitle badge */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                        {event.icon}
                    </div>
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em]">
                        {event.subtitle}
                    </span>
                </div>

                {/* Title */}
                <h4 className="text-white text-xl md:text-2xl font-bold font-display mb-4">
                    {event.title}
                </h4>

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base font-light leading-7 mb-8 font-satoshi max-w-lg">
                    {event.description}
                </p>

                {/* Image grid */}
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src={event.image}
                        alt={event.title}
                        className={`rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-500 ${IMAGE_SHADOW}`}
                    />
                    <img
                        src={event.image2}
                        alt={`${event.title} detail`}
                        className={`rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-500 ${IMAGE_SHADOW}`}
                    />
                </div>
            </div>
        ),
    }));

    return (
        <section className="relative py-16 overflow-hidden bg-[#050505]">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        The Reel
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight font-display mb-4">
                        Our Legacy in Motion
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-md font-satoshi font-light leading-7">
                        From a Parisian loft to studios across three continents — the journey of Voix d'Or in motion.
                    </p>
                </motion.div>
            </div>

            {/* Timeline */}
            <Timeline data={timelineData} />
        </section>
    );
};
