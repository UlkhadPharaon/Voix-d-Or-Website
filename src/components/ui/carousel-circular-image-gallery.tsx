"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Play, X } from "lucide-react"

export interface ImageData {
    title: string
    url: string
    videoId?: string
}

interface ImageGalleryProps {
    images: ImageData[]
}

// Main component for the Image Gallery
export function ImageGallery({ images }: ImageGalleryProps) {
    const [opened, setOpened] = useState(0)
    const [inPlace, setInPlace] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [gsapReady, setGsapReady] = useState(false)
    const [activeVideo, setActiveVideo] = useState<string | null>(null)
    const autoplayTimer = useRef<number | null>(null)

    useEffect(() => {
        // This effect loads the GSAP library and its plugin from a CDN.
        const loadScripts = () => {
            // @ts-ignore
            if (window.gsap && window.MotionPathPlugin) {
                // @ts-ignore
                window.gsap.registerPlugin(window.MotionPathPlugin)
                setGsapReady(true)
                return
            }

            const gsapScript = document.createElement("script")
            gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
            gsapScript.onload = () => {
                const motionPathScript = document.createElement("script")
                motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
                motionPathScript.onload = () => {
                    // @ts-ignore
                    if (window.gsap && window.MotionPathPlugin) {
                        // @ts-ignore
                        window.gsap.registerPlugin(window.MotionPathPlugin)
                        setGsapReady(true)
                    }
                }
                document.body.appendChild(motionPathScript)
            }
            document.body.appendChild(gsapScript)
        }

        loadScripts()
    }, [])

    const onClick = (index: number) => {
        if (!disabled) setOpened(index)
    }

    const onInPlace = (index: number) => setInPlace(index)

    const next = useCallback(() => {
        setOpened((currentOpened) => {
            let nextIndex = currentOpened + 1
            if (nextIndex >= images.length) nextIndex = 0
            return nextIndex
        })
    }, [images.length])

    const prev = useCallback(() => {
        setOpened((currentOpened) => {
            let prevIndex = currentOpened - 1
            if (prevIndex < 0) prevIndex = images.length - 1
            return prevIndex
        })
    }, [images.length])

    // Disable clicks during animation transitions
    useEffect(() => setDisabled(true), [opened])
    useEffect(() => setDisabled(false), [inPlace])

    // Autoplay and timer reset logic
    useEffect(() => {
        if (!gsapReady || activeVideo) return

        if (autoplayTimer.current) {
            clearInterval(autoplayTimer.current)
        }

        autoplayTimer.current = window.setInterval(next, 4500)

        return () => {
            if (autoplayTimer.current) {
                clearInterval(autoplayTimer.current)
            }
        }
    }, [opened, gsapReady, next, activeVideo])

    return (
        <>
            <div className="flex items-center justify-center bg-transparent min-h-screen font-sans overflow-hidden py-12">
                <div className="relative h-[80vmin] w-[80vmin] max-h-[700px] max-w-[700px] overflow-visible rounded-[20px]">
                    {gsapReady &&
                        images.map((image, i) => (
                            <div
                                key={image.url}
                                className="absolute left-0 top-0 h-full w-full"
                                style={{ zIndex: inPlace === i ? i : images.length + 1 }}
                            >
                                <GalleryImage
                                    total={images.length}
                                    id={i}
                                    url={image.url}
                                    title={image.title}
                                    open={opened === i}
                                    inPlace={inPlace === i}
                                    onInPlace={onInPlace}
                                />
                            </div>
                        ))}
                    <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
                        <Tabs images={images} onSelect={onClick} />
                    </div>

                    {/* Play Button Overlay for the central image */}
                    {gsapReady && images[inPlace] && images[inPlace].videoId && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[150] pointer-events-auto">
                            <button
                                onClick={() => setActiveVideo(images[inPlace].videoId!)}
                                className="w-20 h-20 bg-[#D4AF37]/90 hover:bg-[#D4AF37] hover:scale-110 transition-all duration-300 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-md"
                            >
                                <Play className="w-8 h-8 text-black fill-black ml-1" />
                            </button>
                        </div>
                    )}
                </div>

                <button
                    className="absolute left-[calc(50%-45vmin-20px)] sm:left-[calc(50%-350px-30px)] top-1/2 z-[101] flex h-14 w-14 sm:h-16 sm:w-16 -translate-y-1/2 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-white/10 hover:border-[#D4AF37]/40 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group hidden md:flex"
                    onClick={prev}
                    disabled={disabled}
                    aria-label="Previous Image"
                >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#D4AF37] transition-transform duration-300 group-hover:-translate-x-0.5"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    className="absolute right-[calc(50%-45vmin-20px)] sm:right-[calc(50%-350px-30px)] top-1/2 z-[101] flex h-14 w-14 sm:h-16 sm:w-16 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] outline-none transition-all duration-300 ease-out hover:scale-110 hover:bg-white/10 hover:border-[#D4AF37]/40 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group hidden md:flex"
                    onClick={next}
                    disabled={disabled}
                    aria-label="Next Image"
                >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Video Modal Overlay */}
            {activeVideo && (
                <div
                    className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex justify-center items-center p-4 md:p-12 cursor-pointer"
                    onClick={() => setActiveVideo(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] transition-colors"
                        onClick={() => setActiveVideo(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    )
}

interface GalleryImageProps {
    url: string
    title: string
    open: boolean
    inPlace: boolean
    id: number
    onInPlace: (id: number) => void
    total: number
}

function GalleryImage({ url, title, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
    const [firstLoad, setLoaded] = useState(true)
    const clip = useRef<SVGCircleElement>(null)

    // --- Animation Constants ---
    const gap = 10
    const circleRadius = 7
    const defaults = { transformOrigin: "center center" }
    const duration = 0.4
    const width = 400
    const height = 400
    const scale = 700

    const bigSize = circleRadius * scale
    const overlap = 0

    // --- Position Calculation Functions ---
    const getPosSmall = () => ({
        cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
        cy: height - 10,
        r: circleRadius,
    })
    const getPosSmallAbove = () => ({
        cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
        cy: height / 2,
        r: circleRadius * 2,
    })
    const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 7 })
    const getPosEnd = () => ({ cx: width / 2 - bigSize + overlap, cy: height / 2, r: bigSize })
    const getPosStart = () => ({ cx: width / 2 + bigSize - overlap, cy: height / 2, r: bigSize })

    // --- Animation Logic ---
    useEffect(() => {
        // @ts-ignore
        const gsap: any = (window as any).gsap
        if (!gsap) return // Guard against GSAP not being loaded yet

        setLoaded(false)
        if (clip.current) {
            const flipDuration = firstLoad ? 0 : duration
            const upDuration = firstLoad ? 0 : 0.2
            const bounceDuration = firstLoad ? 0.01 : 1
            const delay = firstLoad ? 0 : flipDuration + upDuration

            if (open) {
                gsap
                    .timeline()
                    .set(clip.current, { ...defaults, ...getPosSmall() })
                    .to(clip.current, {
                        ...defaults,
                        ...getPosCenter(),
                        duration: upDuration,
                        ease: "power3.inOut",
                    })
                    .to(clip.current, {
                        ...defaults,
                        ...getPosEnd(),
                        duration: flipDuration,
                        ease: "power4.in",
                        onComplete: () => onInPlace(id),
                    })
            } else {
                gsap
                    .timeline({ overwrite: true })
                    .set(clip.current, { ...defaults, ...getPosStart() })
                    .to(clip.current, {
                        ...defaults,
                        ...getPosCenter(),
                        delay: delay,
                        duration: flipDuration,
                        ease: "power4.out",
                    })
                    .to(clip.current, {
                        ...defaults,
                        motionPath: {
                            path: [getPosSmallAbove(), getPosSmall()],
                            curviness: 1,
                        },
                        duration: bounceDuration,
                        ease: "bounce.out",
                    })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
        >
            <defs>
                <clipPath id={`${id}_circleClip`}>
                    <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip}></circle>
                </clipPath>
                <clipPath id={`${id}_squareClip`}>
                    <rect className="clip" width={width} height={height} rx="20"></rect>
                </clipPath>
            </defs>
            <g clipPath={`url(#${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
                <image width={width} height={height} href={url} className="pointer-events-none" preserveAspectRatio="xMidYMid slice" aria-label={title}></image>
            </g>
        </svg>
    )
}

interface TabsProps {
    images: ImageData[]
    onSelect: (index: number) => void
}

function Tabs({ images, onSelect }: TabsProps) {
    const gap = 10
    const circleRadius = 7
    const width = 400
    const height = 400

    const getPosX = (i: number) =>
        width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap)
    const getPosY = () => height - 10

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full"
        >
            {images.map((image, i) => (
                <g key={image.url} className="pointer-events-auto">
                    <defs>
                        <clipPath id={`tab_${i}_clip`}>
                            <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
                        </clipPath>
                    </defs>
                    <image
                        x={getPosX(i) - circleRadius}
                        y={getPosY() - circleRadius}
                        width={circleRadius * 2}
                        height={circleRadius * 2}
                        href={image.url}
                        clipPath={`url(#tab_${i}_clip)`}
                        className="pointer-events-none"
                        preserveAspectRatio="xMidYMid slice"
                    />
                    <circle
                        onClick={() => onSelect(i)}
                        className="cursor-pointer fill-black/30 stroke-[#D4AF37]/50 hover:stroke-[#D4AF37] transition-all"
                        strokeWidth="1.5"
                        cx={getPosX(i)}
                        cy={getPosY()}
                        r={circleRadius + 2}
                    />
                </g>
            ))}
        </svg>
    )
}
