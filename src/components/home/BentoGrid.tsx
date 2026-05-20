import { motion } from 'framer-motion';

const BentoItem = ({
    span = "col-span-12 lg:col-span-6",
    number,
    subtitle,
    title,
    description,
    image,
    delay = 0
}: {
    span?: string;
    number: string;
    subtitle: string;
    title: string;
    description: string;
    image: string;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className={`${span} group module-tile`}
    >
        <div className="relative bg-metallic-dark sharp-outline p-8 md:p-12 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl h-full min-h-[500px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-6xl md:text-8xl font-display font-bold text-white max-sm:text-5xl">{number}</span>
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            <div className="liquid-border"></div>

            <div className="relative z-10">
                <span className="text-champagne-gold text-xs font-extended tracking-[0.4em] uppercase mb-4 block">{subtitle}</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase">{title}</h2>
                <p className="text-white/60 text-sm uppercase tracking-widest leading-relaxed max-w-sm">{description}</p>
            </div>

            {/* Hidden Reel Content (Simplified for React) */}
            <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 mt-0 group-hover:mt-8">
                <div className="w-full h-[1px] bg-champagne-gold/50 my-6"></div>
                <span className="text-[10px] font-extended tracking-widest text-white uppercase flex items-center gap-2">
                    View Case Study <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
            </div>
        </div>
    </motion.div>
);

export const BentoGrid = () => {
    return (
        <section className="relative z-10 py-32 bg-vantablack">
            <div className="absolute inset-0 bg-faso-pattern opacity-30 pointer-events-none"></div>
            <div className="absolute inset-0 faso-overlay pointer-events-none"></div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4"
                    >
                        MODULAR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold to-white/20">PROJECT HUB</span>
                    </motion.h1>
                    <div className="w-24 h-[1px] bg-champagne-gold mb-8"></div>
                </header>

                <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
                    <BentoItem
                        span="col-span-12 lg:col-span-7"
                        number="01"
                        subtitle="Archive 2024"
                        title="Commercial"
                        description="High-fidelity brand storytelling for global visionaries."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDMe3L5bOZSWwVwEvlIzB0g0_07W27QWV9O2gVAr9w9ObPhUzqGhras1LXW9xY4FBl22BGQk18DFr0UJ1YCkZDFALCtd8FTlvyVQYU3xV3EOqBgNEz9ua22MOYRgnqf0A69NSJKk3c3EwcQZtdTH2AjBPOY8XNopD3Om98Tfof__Oc316GYWmw45-0yL6-s3DgbLaD9VaQl5S7MdXctkbD9wgFG3r9dGTxbHacmNI0jk5mC4E1Hov265XgBIdVmCHkp3Ssol0uZLwgu"
                        delay={0.1}
                    />
                    <BentoItem
                        span="col-span-12 lg:col-span-5 lg:mt-24"
                        number="02"
                        subtitle="Visual Essays"
                        title="Documentary"
                        description="Raw human experiences captured in 8K RAW."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ6_7KzfpWj6aXYyxiMDgn0GC8Y0ktQpVB3sBHbyOwwdfkFuDIDLMkF7mYmxGSzTJTiM3-eUMmuwg3t_gM_kwqTLb-sCwz1fZBP6MwG8qYv_9herEUhNQRQC6w6NfEK63fX2TvzLxFC52LNEkbqBBxtJLULv_nWfx8Y7rzbBkhmw6eQoETOd1mpGpScfvdPDSY96u4wQoS9FyAhhzKiA7fjqVxsQMaGVw_OnZ3fNjb7UzpBlIn-O8vvEJbfgZQ0FemuLoJ23iIMygs"
                        delay={0.2}
                    />
                    <BentoItem
                        span="col-span-12 lg:col-span-6 lg:-mt-12"
                        number="03"
                        subtitle="Aesthetic Motion"
                        title="Fashion Film"
                        description="Where couture meets cinematic innovation."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCqqW7ce3VW_mq3C4YJ24gOeWHFkHGBfLtfvMLqNpQNg6_Wt5gjVFK07EJ8wgkFgZULozyqFzvpZT_uIt-8HC00qwA6OxG1KJPyMpSW9zAtKXOHG2bN1TbMv01HgFlj6mVahNCvu3ZeJuvb0OiaR8V6W5NdjmH1U-lQ1ehXN5NjGuZ_pE3m-8agXk-vENO3s_l8Mlk_yWEKyIANnGHCFNNGWTrJtPaslGXE05vqSBCa29s5XknV725mKnSpxgQDK6QlyldEN3aBIUVC"
                        delay={0.3}
                    />
                    <BentoItem
                        span="col-span-12 lg:col-span-6"
                        number="04"
                        subtitle="Sonic Visuals"
                        title="Music Video"
                        description="Vibrant rhythms translated into visual poetry."
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAwg22iRcfvemmkXIpfcrfpEIVw5iqUaCVkWBNP6VZxE6IxBJ70BEx2YSAhFdNYFAh3iROjt_U1Dk0KFZu7ChooH0mn6AKps4Rp4aCRi5oHLfZDXf_LN5NupDKRaFrLSLdTlVSAJlhjQsPcstmtNgtZ4bvhJYWl9RbxgB0f6c80-Tj59-MNgORhi5bgiyl6pRPFs7fPy7OTuoI6xC1ELv47HtnC_j8OOLtuXHx92Ovi4qWzZKzbkwsRthx_73cScP2RzGin1FNzg4Z3"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};
