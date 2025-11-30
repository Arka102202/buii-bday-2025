import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";


const ImageCard = ({ img = [], audio = [], text = "", x = [], pos = 0 }) => {

    const showRef = useRef(false);
    const audioRef = useRef();
    const mainDivRef = useRef();
    const textRef = useRef();
    const [showText, setShowText] = useState(false);


    const hoverHandle = (e) => {
        e.stopPropagation();
        setShowText(true);
    }

    const unHoverHandle = (e) => {
        e.stopPropagation();
        setShowText(false);
    }

    useEffect(() => {

        const timer = setInterval(() => {

            if (mainDivRef.current && window.getComputedStyle(mainDivRef.current).height !== "0px") {
                textRef.current.style.height = window.getComputedStyle(mainDivRef.current).height;
                clearInterval(timer);
            }
        }, 100)



    }, [])

    useEffect(() => {
        if (!showRef.current && x[pos] === -50) {
            audioRef.current = document.createElement("audio");
            audioRef.current.src = audio[pos];
            audioRef.current.play();
            audioRef.current.loop = true;
            audioRef.current.volume = 0;

            const timer = setInterval(() => {
                if (audioRef.current.volume < .9) audioRef.current.volume += .1;
                else clearInterval(timer);
            }, 100);

            showRef.current = true;
        } else if (showRef.current && x[pos] !== -50) {
            const timer = setInterval(() => {
                if (audioRef.current.volume > .1) audioRef.current.volume -= .1;
                else {
                    clearInterval(timer);
                    audioRef.current.pause();
                    audioRef.current = null;
                }
            }, 100);

            showRef.current = false;
        }
    }, [audio, pos, x])

    return (
        <div ref={mainDivRef} className="wd-320px pos-absolute top-50% left-50% d-flex border_rad-5px overflow-hidden transition-all+1s" style={{ transform: `translate(${x[pos]}%, -50%)`, boxShadow: "15px 15px 15px #00000040" }} onMouseOver={hoverHandle} onMouseLeave={unHoverHandle}>
            <img src={img[pos]} alt="" />
            <div ref={textRef} className="pos-absolute wd-320px top-0 left-0 zIndex-100 transition-all+1s" style={{
                display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "column", backdropFilter: "blur(8px)", backgroundColor: "#ffffff40", backgroundSize: "cover", fontFamily: "grotesis", fontSize: "2rem",
                WebkitMaskImage: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                maskImage: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                WebkitMaskComposite: "destination-in",
                maskComposite: "intersect", opacity: showText ? 1 : 0, pointerEvents: "none", paddingBottom: "2rem"
            }}>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default ImageCard;

ImageCard.propTypes = {
    img: PropTypes.array.isRequired,
    audio: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    x: PropTypes.array.isRequired,
    pos: PropTypes.number.isRequired,
}