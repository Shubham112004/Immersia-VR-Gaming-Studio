import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from "gsap";

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [showToaster, setShowToaster] = useState(true)

    const navContainerRef = useRef(null)
    const audioElementRef = useRef(null)
    const { y: currentScrollY } = useWindowScroll()

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }

        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        })
    }, [isNavVisible])

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev)
        setIsIndicatorActive((prev) => !prev)
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play()
        } else {
            audioElementRef.current.pause()
        }
    }, [isAudioPlaying])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToaster(false)
        }, 1500) // auto-hide after 7 seconds

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
                <header className='absolute top-1/2 w-full -translate-y-1/2'>
                    <nav className='flex size-full items-center justify-between p-4'>
                        <div className='flex items-center gap-7'>
                            <img src="/img/logo.png" alt="Logo" className='w-10' />
                            <Button
                                id="product-button"
                                title="Products"
                                rightIcon={<TiLocationArrow />}
                                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                            />
                        </div>
                        <div className='flex h-full items-center'>
                            <div className='hidden md:block'>
                                {navItems.map((item) => (
                                    <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>{item}</a>
                                ))}
                            </div>
                            <button className='ml-10 flex items-center space-x-0.5 relative' onClick={toggleAudioIndicator}>
                                {/* Blinking ring while toaster is visible */}
                                {showToaster && <span className="ring-pulse" />}

                                <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
                                {[1, 2, 3, 4].map((bar) => (
                                    <div
                                        key={bar}
                                        className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                        style={{ animationDelay: `${bar * 0.1}s` }}
                                    />
                                ))}
                            </button>

                        </div>
                    </nav>
                </header>
            </div>

            {/* Toaster */}
            {showToaster && (
                <div className="hidden sm:fixed sm:top-20 sm:right-6 sm:z-50 sm:w-[320px] sm:rounded-2xl sm:border sm:border-blue-200 sm:bg-gradient-to-br sm:from-white sm:to-blue-50 sm:opacity-65 sm:p-4 sm:shadow-lg sm:animate-fade-in">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                🎶
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">
                                    Turn on the sound!
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Enjoy a better experience with background music.
                                </p>
                            </div>
                        </div>
                        <button
                            className="text-gray-400 hover:text-red-500 text-xl leading-none"
                            onClick={() => setShowToaster(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}


        </>
    )
}

export default Navbar
