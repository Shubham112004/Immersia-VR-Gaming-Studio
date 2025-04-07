import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedTitle from './AnimatedTitle';
gsap.registerPlugin(ScrollTrigger)

const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: '100vh',
            borderRadius: 0
        })
    })

    return (
        <div id='about' className='min-h-screen w-screen'>
            <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
                <h2 className='font-general text-sm uppercase md:text-[10px]'>welcome to Immersia</h2>
                <AnimatedTitle
                    title='Where Reality Ends and Imagination Begins'
                    containerClass="mt-5 !text-black text-center"
                />

                <div className='about-subtext'>
                    <p>Step into a world where boundaries disappear. At Immersia, we offer an electrifying mix of cutting-edge VR games, 360° cinematic adventures, and immersive group experiences.</p>
                    <p>Whether you're a solo explorer or with friends, our studio is designed to transport you beyond the screen into unforgettable virtual realms.</p>
                </div>
            </div>
            <div className='h-dvh w-screen' id='clip'>
                <div className='mask-clip-path about-image'>
                    <img src="img/about2.jpg" alt="Background" className='absolute left-0 top-0 size-full object-cover border-1 border-black' />
                </div>
            </div>
        </div>
    )
}

export default About