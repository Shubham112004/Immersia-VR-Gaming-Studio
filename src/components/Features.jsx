import React, { useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('')

    const itemRef = useRef()

    const handleMouseMove = (e) => {
        if (!itemRef.current) return
        const { left, top, width, height } = itemRef.current.getBoundingClientRect()

        const relativeX = (e.clientX - left) / width
        const relativeY = (e.clientY - top) / height

        const tiltX = (relativeY - 0.5) * 5
        const tiltY = (relativeX - 0.5) * -5

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`

        setTransformStyle(newTransform)
    }

    const handleMouseLeave = () => {
        setTransformStyle('')
    }

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
            {children}
        </div>
    )
}

const BentoCard = ({ src, title, description }) => {
    return (
        <div className='relative size-full'>
            <video
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
                <div>
                    <h1 className='bento-title special-font'>{title}</h1>
                    {description && (
                        <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const Features = () => {
    return (
        <section className='bg-black pb-52'>
            <div className='container mx-auto px-3 md:px-10'>
                <div className='px-5 py-32'>
                    <p className='font-circular-web text-lg text-blue-50'>What Awaits You at Immersia</p>
                    <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas blanditiis molestias ipsam?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque adipisci exercitationem sed.</p>

                </div>
                <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                    <BentoCard
                        src='videos/feature-1.mp4'
                        title={<><b>N</b>ext-Gen <b>V</b>R Game Z<b>o</b>nes</>}
                        description='Step into hyper-realistic worlds with cutting-edge VR gear and motion tracking.'

                    />
                </BentoTilt>
                <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
                    <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                        <BentoCard
                            src='videos/feature-2.mp4'
                            title={<>Immersi<b>v</b>e 360° VR Cin<b>e</b>ma</>}
                            description='Experience stories like never before — be inside the movie.'
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                        <BentoCard
                            src='videos/feature-3.mp4'
                            title={<>Aug<b>m</b>ented Re<b>a</b>lit<b>y</b> Puzzle Roo<b>m</b>s</>}
                            description='Think escape room meets sci-fi tech.'
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src='videos/feature-4.mp4'
                            title={<>M<b>u</b>ltipla<b>y</b>er B<b>a</b>ttle Are<b>n</b>as</>}
                            description='Challenge your friends or team up in cooperative VR missions.'
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_2'>
                        <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                            <h1 className='bento-title special-font max-w-64 text-black'>More comming soon</h1>
                            <TiLocationArrow className='m-5 scale-[5] self-end' />
                        </div>
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_2'>
                        <video
                            src='/videos/feature-5.mp4'
                            loop
                            muted
                            autoPlay
                            className='size-full object-cover object-center'
                        />
                    </BentoTilt>
                </div>
            </div>

        </section>
    )
}

export default Features