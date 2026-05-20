import { useSearchParams } from 'react-router-dom';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { servicesData } from '@/data/servicesData';
import { ExpertiseGrid } from '@/components/services/ExpertiseGrid';
import { ServicesHero } from '@/components/services/ServicesHero';
import { motion } from 'framer-motion';

import { AudioStudio } from '@/pages/AudioStudio';

import { PostProductionStudio } from '@/pages/PostProductionStudio';

import { ProductionStudio } from '@/pages/ProductionStudio';

const Services = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('cat');

    // Check if category is valid
    const isValidCategory = category && Object.keys(servicesData).includes(category);

    if (category === 'audio') {
        return <AudioStudio />;
    }

    if (category === 'post') {
        return <PostProductionStudio />;
    }

    if (category === 'prod') {
        return <ProductionStudio />;
    }

    if (isValidCategory) {
        return <ServiceDetail serviceKey={category as keyof typeof servicesData} />;
    }

    return (
        <div className="bg-vantablack min-h-screen pb-20">
            {/* Hero Section */}
            <ServicesHero />

            {/* Header Section (Simulated flow from Hero) */}
            <div className="container mx-auto px-6 mt-20 mb-16 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-4">
                        Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500 theme-light:to-yellow-600">Expertises</span>
                    </h2>
                    <div className="w-20 h-1 bg-gold md:ml-0 mx-auto mb-6" />
                </motion.div>
            </div>

            {/* Grid Section */}
            <ExpertiseGrid />
        </div>
    );
};

export default Services;

