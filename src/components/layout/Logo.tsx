import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center", className)}>
        <img
            src="/assets/logo/logo-official.png"
            alt="Studio Voix d'Or"
            className="h-10 md:h-12 w-auto object-contain"
        />
    </div>
);
