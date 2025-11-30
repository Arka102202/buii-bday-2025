import { useEffect, useMemo, useRef, useState } from "react";
import centerPart1 from "../assets/imgs/start-screen-bg-part-1-2.png";
import centerPart2 from "../assets/imgs/start-screen-bg-part-2.png";

import creepy from "../assets/sound/creepy.wav";


import PropTypes from 'prop-types';
import gsap from "gsap";
import FlippingClock from "./flippingClock/FlippingClock";
import Dementor from "./Dementor";

const WaitingArea = ({ waitingAreaTlRef = {}, firstAudioRef = {}, playAudio = false, showWaitingArea = true, setShowWaitingArea = () => { }, setShowWishArea = () => { } }) => {

    const centerPart2Ref = useRef();
    const centerPart1Ref = useRef();
    const centerPartRef = useRef();
    const tagLineRef = useRef();
    const secondsLeft = getTimeLeftInSeconds("2025-02-12T10:00:00");
    const remainingTimeRef = useRef(secondsLeft);
    const [showClock, setShowClock] = useState(false);
    const [showCenterPiece, setShowCenterPiece] = useState(true);
    const [centerPieceEndAnim, setCenterPieceEndAnim] = useState(false);
    const [showDementor, setShowDementor] = useState(true);
    const [creepyTic, setCreepyTic] = useState(false);
    const [tagLine, setTagLine] = useState("Welcome to the realm of wizardry—where magic awakens.");
    const getDementorProps = (isLeft = true) => {
        const scale = getRandomInt(10, 15);
        const width = parseInt(window.getComputedStyle(document.body).fontSize);
        let centerWidth = 0;
        if (window.innerWidth > 500) {
            centerWidth = 250;
        } else centerWidth = 170;
        const top = getRandomInt(20, 150);
        const side = getRandomInt(-100, (parseInt((window.innerWidth / 2)) - parseInt(width * scale)) - centerWidth + top);

        return isLeft ? { top, left: side, scale } : { top, right: side, scale };
    }
    const leftDementorPropsArr = useMemo(() => {
        return [...new Array(30)].map(() => getDementorProps(true))
    }, []);

    const leftDementorArr = useMemo(() => {
        return leftDementorPropsArr.map((val, idx) => {
            const { top, left, scale } = val;
            return <Dementor scale={scale} zIndex={201} left={`${left}px`} top={`${top}%`} key={idx} showDementor={showDementor} idx={idx} creepyTic={creepyTic} />
        })
    }, [creepyTic, leftDementorPropsArr, showDementor])

    const rightDementorPropsArr = useMemo(() => {
        return [...new Array(30)].map(() => getDementorProps(false))
    }, []);

    const rightDementorArr = useMemo(() => {
        return rightDementorPropsArr.map((val, idx) => {
            const { top, right, scale } = val;
            return <Dementor scale={scale} zIndex={201} right={`${right}px`} top={`${top}%`} key={idx} showDementor={showDementor} idx={idx} creepyTic={creepyTic} />
        })
    }, [creepyTic, rightDementorPropsArr, showDementor])




    useEffect(() => {

        if (showWaitingArea && creepyTic && playAudio) {

            const audio = document.createElement("audio");
            audio.src = creepy;
            audio.play();
            audio.volume = .8;

            setTimeout(() => {
                setShowDementor(false);
            }, 218000);

        }

    }, [creepyTic, playAudio, showWaitingArea])

    useEffect(() => {

        if (showWaitingArea) {

            waitingAreaTlRef.current = gsap.timeline({
                defaults: {
                    duration: 1
                }
            });

            waitingAreaTlRef.current
                .to(centerPart1Ref.current, {
                    opacity: 1,
                    scale: 1,
                })
                .to({}, {
                    onComplete: () => {
                        centerPart2Ref.current.classList.add("transform-translateZ:0");
                        centerPart2Ref.current.classList.remove("transform-translateZ:1000px");
                    }
                }, 0)
                .set({}, {
                    onComplete: () => {
                        setShowClock(true);
                    },
                });


        }

    }, [waitingAreaTlRef, showWaitingArea, playAudio])


    useEffect(() => {
        if (centerPieceEndAnim) {
            const tl = gsap.timeline({
                defaults: {
                    duration: 1
                }
            });

            tl
                .set(centerPart2Ref.current, {
                    opacity: 1,
                })
                .to(centerPart2Ref.current, {
                    z: "4000px"
                }, 0)
                .to(centerPart1Ref.current, {
                    opacity: 0,
                    scale: .3
                }, 0)
                .set({}, {
                    onComplete: () => {
                        setShowCenterPiece(false);
                    },
                });
        }
    }, [centerPieceEndAnim])

    useEffect(() => {
        setTimeout(() => {
            setTagLine("Your letter is coming... hold tight, Buiiiiiiiiiiiiiii.");
        }, 10000)
        setTimeout(() => {
            tagLineRef.current.style.opacity = 0;
        }, 17000)
    }, [])


    return (
        <div className="wd-100vw ht-100vh overflow-hidden bg-clr:#000 d-flex&justify:center&align:center&flexDir:column pos-relative" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
            {leftDementorArr}
            {rightDementorArr}
            <div className="d-flex&justify:center&align:center&flexDir:column bg-clr:#000 zIndex-200" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                {showCenterPiece && <div ref={centerPartRef} className="d-flex&justify:center&align:center pos-relative wd-500px wd-500px-340px" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                    <img src={centerPart1} alt="" ref={centerPart1Ref} className="opacity-0 transform-scale:2" />
                    <img src={centerPart2} alt="" className="center_el-c+abs wd-500px wd-500px-340px mix_blend-screen transform-translateZ:1000px opacity-0 transition-all+1s" ref={centerPart2Ref} />
                </div>}
                <div className="pos-relative p_t-3rem">
                    <p ref={tagLineRef} className="font-weight:600&family:hpFont&s:1.5rem color-#eee zIndex-1000 transition-all+.5s pos-absolute top-0 left-50% zIndex-1000 txt_align-center wd-100vw" style={{ letterSpacing: "1px", transform: "translate(-50%, 0)" }}>{tagLine}</p>
                    {showClock && <FlippingClock firstAudioRef={firstAudioRef} playAudio={playAudio} setCenterPieceEndAnim={setCenterPieceEndAnim} remainingTimeRef={remainingTimeRef} setCreepyTic={setCreepyTic} setShowWaitingArea={setShowWaitingArea} setShowWishArea={setShowWishArea} setTagLine={setTagLine} tagLineRef={tagLineRef} />}
                </div>
            </div>

        </div>
    );
};

export default WaitingArea;

WaitingArea.propTypes = {
    waitingAreaTlRef: PropTypes.object.isRequired,
    firstAudioRef: PropTypes.object.isRequired,
    playAudio: PropTypes.bool.isRequired,
    showWaitingArea: PropTypes.bool.isRequired,
    setShowWaitingArea: PropTypes.func.isRequired,
    setShowWishArea: PropTypes.func.isRequired,
}

function getRandomInt(min, max) {
    const range = max - min + 1;
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const randomValue = randomArray[0] / (Math.pow(2, 32) - 1);  // Normalized to [0, 1)
    return Math.floor(randomValue * range) + min;
}


function getTimeLeftInSeconds(futureDate) {
    const maximum = 300;
    const now = new Date(); // Current date and time
    const future = new Date(futureDate); // Convert the input to a Date object

    // Calculate the difference in milliseconds
    const difference = Math.floor((future - now) / 1000);

    console.log(difference);

    if (difference > maximum || difference < 0) return maximum;

    if (difference <= maximum) return difference;
}