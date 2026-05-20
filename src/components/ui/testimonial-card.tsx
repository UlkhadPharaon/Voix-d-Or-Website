import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
    name: string
    handle: string
    avatar: string
}

export interface TestimonialCardProps {
    author: TestimonialAuthor
    text: string
    href?: string
    className?: string
}

export function TestimonialCard({
    author,
    text,
    href,
    className
}: TestimonialCardProps) {
    const Card = href ? 'a' : 'div'

    return (
        <Card
            {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
            className={cn(
                "flex flex-col rounded-xl border border-black/5",
                "bg-white/80 backdrop-blur-md",
                "p-5 sm:p-6 text-start",
                "hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/5",
                "max-w-[320px] sm:max-w-[320px]",
                "transition-all duration-500",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 ring-1 ring-[#D4AF37]/20">
                    <AvatarImage src={author.avatar} alt={author.name} />
                </Avatar>
                <div className="flex flex-col items-start">
                    <h3 className="text-sm font-semibold leading-none text-black font-display">
                        {author.name}
                    </h3>
                    <p className="text-xs text-[#D4AF37]/70 mt-1 font-monument uppercase tracking-wider">
                        {author.handle}
                    </p>
                </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed font-satoshi font-light italic">
                "{text}"
            </p>
        </Card>
    )
}
