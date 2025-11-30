import fireWorks from "../assets/video/fireWorks.mp4";
import celebrationMusic from "../assets/sound/celebration-music.wav"
import wishMusic from "../assets/sound/wish-2.wav"
import yellowBg from "../assets/video/yello-bokeh-twinkle.mp4"
import { useEffect, useState } from "react";

import PropTypes from 'prop-types';
import Card from "./Card";

const WishArea = ({ playAudio = false, setShowGallery = () => { }, setShowWishArea = () => { }, celMusicRef = {} }) => {

    const [showFirstScreen, setShowFirstScreen] = useState(true);

    useEffect(() => {
        if (playAudio) {
            celMusicRef.current = document.createElement("audio");
            celMusicRef.current.src = wishMusic;
            celMusicRef.current.play();
            celMusicRef.current.addEventListener("ended", () => {
                celMusicRef.current.src = celebrationMusic;
                celMusicRef.current.loop = true;
                celMusicRef.current.play();
            });
        }
        setTimeout(() => {
            // if (celMusic) celMusic.pause();
            setShowFirstScreen(false);
        }, 23000);

    }, [celMusicRef, playAudio])





    return (
        <div className="wd-100vw ht-100vh overflow-hidden pos-relative">

            {showFirstScreen && <video autoPlay muted loop className="wd-100vw ht-100vh center_el-c+abs" style={{ objectFit: "cover" }}>
                <source src={fireWorks} type="video/mp4" />
            </video>}

            {!showFirstScreen && <>
                <video autoPlay muted loop className="wd-100vw ht-100vh center_el-c+abs" style={{ objectFit: "cover" }}>
                    <source src={yellowBg} type="video/mp4" />
                </video>

                <Card setShowGallery={setShowGallery} setShowWishArea={setShowWishArea} />
            </>}


        </div>
    );
};

export default WishArea;

WishArea.propTypes = {
    playAudio: PropTypes.bool,
    setShowGallery: PropTypes.func.isRequired,
    setShowWishArea: PropTypes.func.isRequired,
    celMusicRef: PropTypes.object.isRequired,
}