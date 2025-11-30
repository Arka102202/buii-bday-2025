import { useEffect, useRef, useState } from 'react';
import FlippingPair from './FlippingPair';
import PropTypes from 'prop-types';

import bgMusic from "../../assets/sound/BRINK OF ANNIHILATION - Epic Cinematic Music by Tommee Profitt.wav";
import clickTicking from "../../assets/sound/clock-ticking-60.wav"

import gsap from "gsap";

const FlippingClock = ({ firstAudioRef = {}, playAudio = false, setCenterPieceEndAnim = () => { }, remainingTimeRef = {}, setCreepyTic = () => { }, setShowWaitingArea = () => { }, setShowWishArea = () => { }, setTagLine = () => { }, tagLineRef = {} }) => {

    const [pairTicRight, setPairTicRight] = useState(false);
    const [pairTicLeft, setPairTicLeft] = useState(false);

    const digit1Ref = useRef();
    const digit2Ref = useRef();
    const digit3Ref = useRef();
    const digit4Ref = useRef();
    const stopFlipping = false;

    const clockTlRef = useRef(gsap.timeline({
        defaults: {
            duration: 1
        }
    }));


    const firstSongEndRef = useRef();

    const [endAnimTic, setEndAnimTic] = useState({ 1: false, 2: false, 3: false, 4: false });
    const [checkIfZero, setCheckIfZero] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: {
                duration: 1
            }
        });

        tl
            .to(digit4Ref.current, {
                z: "0px"
            }, 0)
            .to(digit3Ref.current, {
                z: "0px"
            }, "-=.5")
            .add("sec-end")
            .to(digit2Ref.current, {
                z: "0px"
            }, "sec-end-=.5")
            .add("third-end")
            .to(digit1Ref.current, {
                z: "0px"
            }, "third-end-=.5")


        clockTlRef.current.add(tl);
    }, [])

    useEffect(() => {

        if (stopFlipping) return;

        let pairCount = parseInt(remainingTimeRef.current / 60);

        if (parseInt(pairCount / 10) === 0 && !endAnimTic[4]) setEndAnimTic({ ...endAnimTic, 4: true });
        if (pairCount % 10 === 0 && endAnimTic[4] && !endAnimTic[3]) setEndAnimTic({ ...endAnimTic, 3: true });

        pairCount = parseInt(remainingTimeRef.current % 60);

        if (parseInt(pairCount / 10) === 0 && endAnimTic[3] && !endAnimTic[2]) {
            setEndAnimTic({ ...endAnimTic, 2: true });
            setCenterPieceEndAnim(true);
        }
        if (pairCount % 10 === 0 && endAnimTic[2] && !endAnimTic[1]) setEndAnimTic({ ...endAnimTic, 1: true });

        setTimeout(() => {
            if (playAudio) {
                if (remainingTimeRef.current === 217) {
                    const audio = document.createElement("audio");
                    audio.src = bgMusic;
                    audio.play();
                    setTimeout(() => {
                        clearInterval(firstSongEndRef.current);
                        firstAudioRef.current.pause();
                    }, 15000);
                }
                if (remainingTimeRef.current === 61) {
                    const audio = document.createElement("audio");
                    audio.src = clickTicking;
                    audio.play();
                }

                if (remainingTimeRef.current === 230) {
                    firstSongEndRef.current = setInterval(() => {
                        if (firstAudioRef.current.volume >= .015)
                            firstAudioRef.current.volume -= .015;
                    }, 300)
                }
            }
            remainingTimeRef.current -= 1;

            if (remainingTimeRef.current === 238) {
                setCreepyTic(true);
                tagLineRef.current.style.opacity = 1;
                setTagLine("A sudden chill fills the air.... They’ve arrived....");
                setTimeout(() => {
                    setTagLine("The Dementors..........");
                }, 5000)
                setTimeout(() => {
                    setTagLine("Don’t move. Don’t even breathe. Silence is your only shield.");
                }, 15000)
                setTimeout(() => {
                    tagLineRef.current.style.opacity = 0;
                }, 23000)
                setTimeout(() => {
                    tagLineRef.current.style.opacity = 1;
                    setTagLine("But fear not — The Owl and Half-Blood Prince guard you.");
                }, 30000)
                setTimeout(() => {
                    tagLineRef.current.style.opacity = 0;
                }, 38000)
            }

            if (remainingTimeRef.current === 60) {
                tagLineRef.current.style.opacity = 1;
                setTagLine("Their numbers grow, swirling shadows closing in like a tempest.");
                setTimeout(() => {
                    tagLineRef.current.style.opacity = 0;
                }, 7000)
            }
            if (remainingTimeRef.current === 25) {
                tagLineRef.current.style.opacity = 1;
                setTagLine("It’s time.... summon your power. Let’s end this.");
                setTimeout(() => {
                    setTagLine("Raise your wand. Avada Kedavra!");
                }, 5000)
            }
            if (remainingTimeRef.current === 12) {
                setTagLine("They are gone Buiiiiiiiiiiiiii......");
            }
            if (remainingTimeRef.current === 8) {
                tagLineRef.current.style.fontSize = "2rem";
                setTagLine("Your Letter will come in ....");
            }
            if (remainingTimeRef.current === -1) setTimeout(() => {
                setShowWaitingArea(false);
                setShowWishArea(true);
            }, 500);
            if (remainingTimeRef.current >= 0)
                setCheckIfZero(state => !state);
        }, 1000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkIfZero])


    return (
        <div className='d-flex&justify:center&align:center&gap:2rem' style={{ perspective: "1000px" }}>
            <FlippingPair isSecondDigit={false} pairTic={pairTicLeft} setPairTic={setPairTicLeft} numberToShow={parseInt(remainingTimeRef.current / 60)} posArr={[3, 4]} digitLeftRef={digit4Ref} digitRightRef={digit3Ref} perspective_origin_left="center+left" perspective_origin_right="center+left" clockTlRef={clockTlRef} endAnimTic={endAnimTic} sizes={[3, 4]} stopFlipping={stopFlipping} />
            <FlippingPair isSecondDigit={true} pairTic={pairTicRight} setPairTic={setPairTicRight} setPrevPairTic={setPairTicLeft} numberToShow={parseInt(remainingTimeRef.current % 60)} posArr={[1, 2]} digitLeftRef={digit2Ref} digitRightRef={digit1Ref} perspective_origin_right="center+right" perspective_origin_left="center+right" clockTlRef={clockTlRef} endAnimTic={endAnimTic} playAudio={playAudio} sizes={[5, 8]} stopFlipping={stopFlipping} />
        </div>
    );
};

export default FlippingClock;

FlippingClock.propTypes = {
    firstAudioRef: PropTypes.object.isRequired,
    playAudio: PropTypes.bool.isRequired,
    setCenterPieceEndAnim: PropTypes.func.isRequired,
    remainingTimeRef: PropTypes.object.isRequired,
    setCreepyTic: PropTypes.func.isRequired,
    setShowWaitingArea: PropTypes.func.isRequired,
    setShowWishArea: PropTypes.func.isRequired,
    setTagLine: PropTypes.func.isRequired,
    tagLineRef: PropTypes.object.isRequired,
}