import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="relative py-32 px-6 container mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                    {subtitle}
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
                    {title}
                </h1>
                <div className="w-24 h-[1px] bg-gold-500/50 mx-auto" />
            </motion.div>
        </div>
    );
};
