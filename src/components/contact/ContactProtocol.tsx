import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';

export const ContactProtocol = () => {
    return (
        <section className="min-h-screen bg-vantablack flex flex-col lg:flex-row overflow-hidden">

            {/* 🗺️ Left Part: The GOLDEN RADAR (Stylized Map) */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen relative overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                {/* Map Overlay for Golden Effect */}
                <div className="absolute inset-0 z-10 bg-[#C5A059]/5 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-vantablack via-transparent to-vantablack/20 pointer-events-none" />

                {/* Stylized Google Maps Iframe with CSS Filters */}
                <iframe
                    title="Studio Voix d'Or Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.945821035048!2d-1.4988!3d12.3714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIyJzE3LjAiTiAxwrAyOSc1NS43Ilc!5e0!3m2!1sfr!2sbf!4v1708500000000!5m2!1sfr!2sbf"
                    className="w-full h-full grayscale-[100%] contrast-[1.2] brightness-[0.8] sepia-[0.2] transition-all duration-1000"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Radar Overlay Decoration */}
                <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <div className="w-[80%] h-[80%] border border-white/5 rounded-full flex items-center justify-center">
                        <div className="w-[60%] h-[60%] border border-white/5 rounded-full flex items-center justify-center">
                            <div className="w-[40%] h-[40%] border border-white/5 rounded-full" />
                        </div>
                    </div>
                    {/* Pulsing Location indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-4 h-4 bg-[#C5A059] rounded-full shadow-[0_0_20px_#C5A059] animate-ping opacity-75" />
                        <div className="mt-4 text-center">
                            <p className="text-[#C5A059] font-monument text-[10px] tracking-[0.4em] uppercase">Location Anchored</p>
                            <h3 className="text-white font-monument text-lg tracking-tight">OUAGADOUGOU HQ</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✉️ Right Part: The VIP APPLICATION FORM */}
            <div className="w-full lg:w-1/2 min-h-[60vh] lg:h-screen relative flex items-center justify-center p-8 pt-44 lg:p-24 lg:pt-44 bg-[url('/assets/images/studio-bg-blur.jpg')] bg-cover bg-center">
                {/* Glassmorphism Backdrop */}
                <div className="absolute inset-0 bg-vantablack/80 backdrop-blur-xl z-0" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-xl bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-14 shadow-2xl"
                >
                    <div className="mb-10 lg:mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-[1px] w-8 bg-[#C5A059]" />
                            <span className="text-[#C5A059] font-monument text-[10px] tracking-[0.3em] uppercase">Inquiry Protocol v4</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-monument text-white mb-6 leading-tight">
                            Initier le <br /><span className="text-[#C5A059]">Projet.</span>
                        </h2>
                        <p className="text-white/40 font-satoshi font-light leading-relaxed text-sm lg:text-base">
                            Chaque collaboration commence par une vision. Décrivez-nous la vôtre, notre équipe examinera votre demande dans les 24h.
                        </p>
                    </div>

                    <ContactForm />
                </motion.div>
            </div>

            {/* Decorative Corner Numbers (Aesthetics) */}
            <div className="absolute top-10 right-10 z-50 pointer-events-none hidden lg:block">
                <span className="text-white/5 font-monument text-8xl">06</span>
            </div>
        </section>
    );
};
