import React, {useState,useEffect} from 'react';
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import Photo from '../components/Photo';
import '../index.css'
import AboutMeModal from '../components/AboutMe';
import SkatePopUp from '../components/SkatePopUp'
import UxUi from '../components/UxUi';

const Homepage = () => {
    const aboutMeDisclosure = useDisclosure();
    // const spotifyDisclosure = useDisclosure();
    const myProjectsDisclosure = useDisclosure();
    const skateDiscolsure = useDisclosure();
    const uxuiDisclosure = useDisclosure();

    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const imageUrls = [
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/03400013.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield006978-r1-066-31a.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-055-26.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009935-r1-015-6.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-031-14.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-015-6.jpg"
    ];

    const mobileImageUrls = [
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/2B75FAA1-D290-4BA4-AAD1-C60A0F0DE681-12299-0000025D29899B78.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/GV3A6124.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/IMG_1974.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/IMG_2141.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/IMG_2386.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/IMG_3593.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/IMG_3655.JPG",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/IMG_5035.JPG"
    ];

    // Full-screen styles for mobile
    const mobileBackgroundStyle: React.CSSProperties = {
        position: 'fixed', 
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
        overflow: 'hidden'
    };

        // Switching images for mobile
        useEffect(() => {
            if (isMobile) {
                const interval = setInterval(() => {
                    setCurrentImageIndex((prevIndex) => 
                        prevIndex === mobileImageUrls.length - 1 ? 0 : prevIndex + 1
                    );
                }, 3000); // Switch every 3 seconds
    
                return () => clearInterval(interval);
            }
        }, [isMobile, mobileImageUrls.length]);

    return (
        <div>
            {/* Clickable logo that takes user to about me */}
            <div onClick={aboutMeDisclosure.onOpen} style={{ cursor: 'pointer', position: 'absolute', top: 20, left: 20 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/DrewLogoPNG.png" 
                    alt="Logo" 
                    className='image-hover-effect'
                    style={{ maxWidth: '350px', maxHeight: '350px' }} 
                    />
            </div>

            {/* Clickable logo that takes user to ux/ui */}
            <div onClick={uxuiDisclosure.onOpen} style={{ cursor: 'pointer', position: 'absolute', top: 500, left: 900 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/uxui.png" 
                    alt="Logo" 
                    className='image-hover-effect'
                    style={{ maxWidth: '175px', maxHeight: '175px' }} 
                    />
            </div>

            {/* If User is on mobile then swtich formatting of background photos */}
            {isMobile ? (
                <div style={mobileBackgroundStyle}>
                    <img
                        src={mobileImageUrls[currentImageIndex]}
                        alt={`Background ${currentImageIndex}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            ) : (
                <div className="homepage-container">
                    <Photo urls={imageUrls} alt="Background Image" />
                </div>
            )}
            {/* Spotify pop up
            <div onClick={spotifyDisclosure.onOpen} style={{ cursor: 'pointer', position: 'absolute', top: 200, left: 200 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/WhatImListeningTo.png" 
                    alt="Logo" 
                    className = 'image-hover-effect'
                    style={{ maxWidth: '350px', maxHeight: '350px' }} />
            </div> */}
            {/* About me tab */}
            <div onClick={aboutMeDisclosure.onOpen} style={{ cursor: 'pointer', position: 'absolute', top: 80, left: 250 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/aboutme.png" 
                    alt="Logo" 
                    className='image-hover-effect'
                    style={{ maxWidth: '125px', maxHeight: '125px' }} />
            </div>

             {/* If the user is on mobile then add a swipe icon to help with usability */}
            {isMobile && (
                <div style={{ cursor: 'pointer', position: 'absolute', top: 650, left: 25 }}>
                    <img 
                        src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/mobileBackground/swipe.png" alt="Swipe Icon" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
            )}

            {/* External link to my github */}
            <div onClick={() => {
                myProjectsDisclosure.onOpen();
                window.location.href = 'https://github.com/drewharts';
            }} 
            style={{ cursor: 'pointer', position: 'absolute', top: 400, left: 400 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/MyProjects.png" 
                    alt="Logo" 
                    className = 'image-hover-effect'
                    style={{ maxWidth: '350px', maxHeight: '350px' }} />
            </div>

            {/* External link to my Skate video */}
            <div onClick={skateDiscolsure.onOpen} 
                style={{ cursor: 'pointer', position: 'absolute', top: 600, left: 500 }}>
            <img 
                src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/skate.png" 
                alt="Logo" 
                className='image-hover-effect'
                style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>


            {/* External link to my medium */}
            <div onClick={() => {
                myProjectsDisclosure.onOpen();
                window.location.href = 'https://medium.com/@drewharts8';
            }} 
            style={{ cursor: 'pointer', position: 'absolute', top: 300, left: 900 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/myArcticles.png" 
                    alt="Logo" 
                    className = 'image-hover-effect'
                    style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
            
            {/* Allows for viewing/download of my resume from S3 bucket */}
            <div onClick={() => {
                myProjectsDisclosure.onOpen();
                window.open('https://s3.us-west-1.amazonaws.com/wiseman2.0images/DrewHartsfieldJul2024.pdf', '_blank');
            }} 
            style={{ cursor: 'pointer', position: 'absolute', top: 500, left: 1200 }}>
                <img 
                    src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/+Resume.png" 
                    alt="Logo" 
                    className='image-hover-effect'
                    style={{ maxWidth: '150px', maxHeight: '150px' }} />
            </div>
            
            {/* opens and closes chakra pop ups */}
            <AboutMeModal isOpen={aboutMeDisclosure.isOpen} onClose={aboutMeDisclosure.onClose} />
            {/* <SpotifyPopUp isOpen={spotifyDisclosure.isOpen} onClose={spotifyDisclosure.onClose} songs={[]} /> */}
            <SkatePopUp isOpen={skateDiscolsure.isOpen} onClose={skateDiscolsure.onClose} />
            <UxUi isOpen={uxuiDisclosure.isOpen} onClose={uxuiDisclosure.onClose} />
        </div>
    );
};

export default Homepage;
