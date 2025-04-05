import { TiLocationArrow } from "react-icons/ti"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


import Button from "./Button"
import { useEffect, useState } from "react";

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [loadedVideo, setLoadedVideo] = useState(0)

    const handleLoadedVideo = () => {
        setLoadedVideo((prev) => prev + 1)
    }

    useEffect(() => {
        if (loadedVideo === 1) {
            setIsLoading(false)
        }
    }, [loadedVideo])

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 35% 1%'
        })
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom start',
                scrub: true
            }
        })
    })

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>

            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <video
                    src='/videos/hero-1.mp4'
                    autoPlay
                    loop
                    muted
                    onLoadedData={handleLoadedVideo}
                    className='absolute left-0 top-0 size-full object-cover object-center'
                />
                <h1 className='special-font hero-heading2 absolute bottom-5 right-5 z-40 text-blue-75'>
                    VR G<b>a</b>mi<b>n</b>g Studio
                </h1>
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-20 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading1 text-blue-100'>Immersi<b>a</b></h1>
                        <p className='mb-5 max-w-80 font-robert-regular text-blue-100'>Step into the Future.<br />Experience Virtual Reality Like Never Before.</p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass='bg-yellow-300 flex-center gap-1' />
                    </div>
                </div>
            </div>
            <h1 className='special-font hero-heading2 absolute bottom-5 right-5 text-black'>
                VR G<b>a</b>mi<b>n</b>g Studio
            </h1>
        </div>
    )
}

export default Hero