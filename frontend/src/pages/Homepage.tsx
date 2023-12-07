import Photo from '../components/Photo';
import GithubBox from '../components/GithubBox';
import { useDisclosure } from "@chakra-ui/react";
import AboutMeModal from '../components/AboutMe';
import SpotifyPopUp from '../components/SpotifyPopUp';

const Homepage = () => {
    const aboutMeDisclosure = useDisclosure();
    const spotifyDisclosure = useDisclosure();

    const imageUrls = [
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/03400013.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield006978-r1-066-31a.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-055-26.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009935-r1-015-6.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-031-14.jpg",
        "https://s3.us-west-1.amazonaws.com/wiseman2.0images/hartsfield009933-r1-015-6.jpg"
    ];

    return (
        <div>
            <div onClick={aboutMeDisclosure.onOpen} style={{ cursor: 'pointer', position: 'absolute', top: 20, left: 20 }}>
                <img src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/DrewLogoPNG.png" alt="Logo" style={{ maxWidth: '350px', maxHeight: '350px' }} />
            </div>

            <div className="homepage-container">
                <Photo urls={imageUrls} alt="Background Image" />
                <div onClick={spotifyDisclosure.onOpen} style={{ cursor: 'pointer', position: 'absolute', top: 200, left: 200 }}>
                    <img src="https://s3.us-west-1.amazonaws.com/wiseman2.0images/WhatImListeningTo.png" alt="Logo" style={{ maxWidth: '350px', maxHeight: '350px' }} />
                </div>

        </div>

            
            <AboutMeModal isOpen={aboutMeDisclosure.isOpen} onClose={aboutMeDisclosure.onClose} />
            <SpotifyPopUp isOpen={spotifyDisclosure.isOpen} onClose={spotifyDisclosure.onClose} songs={[]} />
        </div>
    );
};

export default Homepage;
