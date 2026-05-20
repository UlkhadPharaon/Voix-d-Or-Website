import { NewHero } from '@/components/home/NewHero';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TrustedBy } from '@/components/home/TrustedBy';
import { FAQSection } from '@/components/home/FAQSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';

import { AdvantagesSection } from '@/components/home/AdvantagesSection';

const Home = () => {
    return (
        <div className="bg-vantablack text-white overflow-x-hidden">
            <NewHero />
            <ServicesSection />
            <TrustedBy />
            <FAQSection />
            <TestimonialsSection />
            <AdvantagesSection />

        </div>
    );
};

export default Home;
