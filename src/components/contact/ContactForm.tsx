import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';

// 💎 Composant d'entrée flottant (Stylisé)
const FloatingInput = ({
    label,
    id,
    type = "text",
    required = false,
    placeholder = "",
    value,
    onChange
}: {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    placeholder?: string,
    value: string,
    onChange: (val: string) => void
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group w-full mb-10">
            <motion.label
                htmlFor={id}
                initial={false}
                animate={{
                    y: isFocused || value ? -24 : 0,
                    scale: isFocused || value ? 0.85 : 1,
                    color: isFocused ? "var(--gold)" : "var(--text-muted)"
                }}
                className="absolute left-0 top-2 text-xs font-medium uppercase tracking-[0.2em] pointer-events-none origin-left transition-colors"
            >
                {label}
            </motion.label>
            <input
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent border-b border-white/10 py-2 text-white font-satoshi text-lg outline-none transition-all focus:border-champagne-gold placeholder:opacity-0"
                placeholder={placeholder}
            />
        </div>
    );
};

// 💎 Objectifs de Service
const objectivesList = [
    "Cinematic Launch (Haute Valeur)",
    "Spot Publicitaire Premium",
    "Production Vidéo Complète",
    "Post-Production & VFX",
    "Ingénierie Audio & Mixage",
    "Musique de Film & Scoring",
    "Candidature Formation (Académie)"
];

// 💎 Tiers de Budget
const budgetTiers = [
    { id: "standard", label: "Standard", amount: "Sur devis" },
    { id: "premium", label: "Premium", amount: "Excellence" },
    { id: "empire", label: "Empire", amount: "No Limit" }
];

export const ContactForm = () => {
    // 🔗 Clé d'accès Web3Forms (Pacte de Studio Voix d'Or)
    const WEB3FORMS_ACCESS_KEY = "1a273d1f-eb05-4f7f-a6c9-9b1d2cb7a7a9";

    const [formData, setFormData] = useState({
        name: "",
        org: "",
        email: "",
        objective: "",
        budget: "",
        vision: ""
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [isObjDropdownOpen, setIsObjDropdownOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Ajustement automatique de la hauteur du textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [formData.vision]);

    // 📩 Soumission du Formulaire via Fetch API (Web3Forms)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 🛡️ Validation de surface
        if (!formData.name || !formData.email || !formData.vision) {
            setErrorMessage("Veuillez remplir tous les champs obligatoires pour sceller le pacte.");
            setStatus("error");
            return;
        }

        // Validation Email simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage("Le format de l'adresse email semble invalide.");
            setStatus("error");
            return;
        }

        setErrorMessage("");
        setStatus("loading");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `Protocol : ${formData.objective || "Contact"} - ${formData.name}`,
                    from_name: formData.name,
                    Nom: formData.name,
                    Organisation: formData.org || "Non spécifié",
                    Email: formData.email,
                    Objectif: formData.objective || "Non sélectionné",
                    Budget: formData.budget || "Calcul sur devis",
                    Vision: formData.vision,
                    bot_field: "" // Honey pot simple
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
            } else {
                setErrorMessage(result.message || "La transmission a échoué. Veuillez réessayer.");
                setStatus("error");
            }
        } catch (error) {
            console.error("Erreur de soumission:", error);
            setErrorMessage("Une erreur de connexion est survenue. Veuillez vérifier votre réseau.");
            setStatus("error");
        }
    };

    return (
        <div className="relative w-full">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center text-center py-20 px-8 border border-champagne-gold/30 rounded-2xl bg-white/[0.02] backdrop-blur-md"
                    >
                        <div className="w-24 h-24 mb-10 rounded-full border border-champagne-gold flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.3)] relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                                className="absolute inset-0 rounded-full bg-champagne-gold/10 blur-xl"
                            />
                            <svg className="w-10 h-10 text-champagne-gold relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-3xl lg:text-5xl font-monument text-white mb-6 uppercase tracking-tight">
                            Le Pacte est <span className="text-champagne-gold">Scellé.</span>
                        </h3>
                        <p className="text-white/70 font-satoshi font-light max-w-lg text-lg leading-relaxed">
                            Votre vision a été transmise à notre direction. Nous étudions votre dossier et vous contacterons sous <span className="text-white font-medium">24 heures</span> pour planifier notre première audience.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                            <FloatingInput
                                label="Nom Complet"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(val) => setFormData({ ...formData, name: val })}
                            />
                            <FloatingInput
                                label="Organisation / Artiste"
                                id="org"
                                value={formData.org}
                                onChange={(val) => setFormData({ ...formData, org: val })}
                            />
                        </div>

                        <FloatingInput
                            label="Contact Sécurisé (Email)"
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(val) => setFormData({ ...formData, email: val })}
                        />

                        {/* 🔘 Custom Dropdown (L'Objectif) */}
                        <div className="relative mb-12 z-20">
                            <label className="block text-champagne-gold text-[10px] font-monument uppercase tracking-[0.2em] mb-4">
                                Le Cœur du Projet (Objectif)
                            </label>
                            <div
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white font-satoshi text-lg outline-none flex justify-between items-center cursor-pointer transition-colors hover:border-champagne-gold/50"
                                onClick={() => setIsObjDropdownOpen(!isObjDropdownOpen)}
                            >
                                <span className={formData.objective ? "text-white" : "text-white/30"}>
                                    {formData.objective || "Sélectionnez l'expertise requise"}
                                </span>
                                <motion.div animate={{ rotate: isObjDropdownOpen ? 180 : 0 }}>
                                    <svg className="w-4 h-4 text-champagne-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {isObjDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 w-full mt-2 bg-white/95 border border-champagne-gold/30 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md z-[60]"
                                    >
                                        {objectivesList.map((obj, idx) => (
                                            <div
                                                key={idx}
                                                className={`px-5 py-4 cursor-pointer text-satoshi transition-all duration-300 ${formData.objective === obj
                                                    ? "bg-champagne-gold/10 border-l-[3px] border-champagne-gold text-champagne-gold font-bold"
                                                    : "text-gray-900 hover:bg-champagne-gold/5 hover:text-champagne-gold"
                                                    }`}
                                                onClick={() => {
                                                    setFormData({ ...formData, objective: obj });
                                                    setIsObjDropdownOpen(false);
                                                }}
                                            >
                                                {obj}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 💎 Interactive Pills (Budget) */}
                        <div className="mb-12">
                            <label className="block text-champagne-gold text-[10px] font-monument uppercase tracking-[0.2em] mb-5">
                                Échelle de l'Empire (Budget)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {budgetTiers.map((tier) => {
                                    const isSelected = formData.budget === tier.id;
                                    return (
                                        <motion.div
                                            key={tier.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setFormData({ ...formData, budget: tier.id })}
                                            className={`relative cursor-pointer rounded-xl p-4 border transition-all duration-500 overflow-hidden ${isSelected
                                                ? "border-champagne-gold bg-champagne-gold/10"
                                                : "border-white/10 bg-white/[0.02] hover:border-white/30"
                                                }`}
                                        >
                                            {/* Glow effect when selected */}
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-champagne-gold/20 to-transparent pointer-events-none" />
                                            )}

                                            <div className="relative z-10">
                                                <h4 className={`font-monument text-xs uppercase tracking-[0.1em] mb-1 ${isSelected ? "text-white" : "text-white/60"}`}>
                                                    {tier.label}
                                                </h4>
                                                <p className={`font-satoshi text-sm ${isSelected ? "text-champagne-gold" : "text-white/30"}`}>
                                                    {tier.amount}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 🖋️ The Vision Textarea */}
                        <div className="relative mb-14 group">
                            <label className="block text-champagne-gold text-[10px] font-monument uppercase tracking-[0.2em] mb-4">
                                La Vision Initiale (Message)
                            </label>
                            <textarea
                                ref={textareaRef}
                                required
                                value={formData.vision}
                                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                placeholder={formData.objective === "Candidature Formation (Académie)" ? "Présentez votre parcours et vos ambitions..." : "Décrivez votre idée, le contexte et vos attentes..."}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-5 text-white font-satoshi text-lg outline-none focus:border-champagne-gold transition-all resize-none min-h-[140px]"
                                style={{
                                    '--tw-placeholder-opacity': '1',
                                    color: 'var(--text-primary)'
                                } as React.CSSProperties}
                            />
                        </div>

                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 font-satoshi text-sm text-center mb-8"
                            >
                                {errorMessage || "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer."}
                            </motion.div>
                        )}

                        <div className="pt-4">
                            <MagneticButton className="w-full">
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="relative w-full bg-champagne-gold text-vantablack py-5 px-8 font-monument text-xs uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500 overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed"
                                >
                                    <div className="flex items-center justify-center gap-4">
                                        {status === "loading" ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-vantablack border-t-transparent rounded-full"
                                                />
                                                Initialisation en cours...
                                            </>
                                        ) : (
                                            <>
                                                Sceller le Pacte
                                                <motion.span
                                                    className="transition-transform group-hover:translate-x-2"
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    →
                                                </motion.span>
                                            </>
                                        )}
                                    </div>

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
                                </button>
                            </MagneticButton>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};
