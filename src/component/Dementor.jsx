import dementor from "../assets/imgs/dementor.png";
import dementorRight from "../assets/imgs/dementor-right.png";

import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Dementor = ({ right = "auto", left = "auto", top = "auto", btm = "auto", zIndex = 1, scale = 100, showDementor = false, idx = 0, creepyTic = false }) => {

    const [nextTic, setNextTic] = useState(false);
    const dementorRef = useRef();
    const initialMaxDelayRef = useRef(1000 * 70); // Start with 15 seconds as the initial max delay
    const minDelayRef = useRef(1000); // The minimum delay
    const delayReductionRateRef = useRef(5000); // The amount by which the max delay will reduce each time (in ms)
    const currentMaxDelayRef = useRef(initialMaxDelayRef.current);



    const animateShadow = () => {
        if (!dementorRef.current) return;
        gsap
            .to(dementorRef.current, {
                filter: "drop-shadow(0px 0px 6px #494949)",
                duration: .25,
                ease: "elastic.inOut(1.5,0.4)"
            })
        gsap.to(dementorRef.current, {
            filter: "drop-shadow(0px 0px 0px transparent)",
            duration: .25,
            delay: .25,
            ease: "elastic.inOut(1.5,0.4)"
        })
    }

    useEffect(() => {
        if (!creepyTic) return;

        // Generate a random delay based on the current max delay
        const randomDelay = Math.floor(Math.random() * (currentMaxDelayRef.current - minDelayRef.current + 1)) + minDelayRef.current;

        // Reduce the max delay for the next iteration
        currentMaxDelayRef.current = Math.max(minDelayRef.current, currentMaxDelayRef.current - delayReductionRateRef.current);
        setTimeout(() => {
            animateShadow();
            if (showDementor) setNextTic(state => !state);
        }, randomDelay);

    }, [creepyTic, nextTic, showDementor])


    useEffect(() => {
        if (!showDementor) {
            setTimeout(() => {
                const tl = gsap.timeline({
                    defaults: {
                        duration: 2
                    }
                });

                tl
                    .to(dementorRef.current, {
                        filter: "drop-shadow(0px 0px 6px #494949)",
                        z: "-4000px",
                        opacity: 0
                    })
                    .set(dementorRef.current, {
                        display: "none"
                    })
            }, (idx + 1) * 200)
        }
    }, [idx, showDementor])




    return (
        <>
            {<div ref={dementorRef} className={`pos-absolute zIndex-${zIndex} wd-${scale}rem `}
                style={{
                    filter: "drop-shadow(0px 0px 0px transparent)",
                    left, right, top, bottom: btm,
                }}>
                <img src={left !== "auto" ? dementor : dementorRight} alt="" />
            </div>}
        </>
    );
};

export default Dementor;

Dementor.propTypes = {
    right: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string,
    btm: PropTypes.string,
    zIndex: PropTypes.number,
    scale: PropTypes.number,
    showDementor: PropTypes.bool,
    idx: PropTypes.number,
    creepyTic: PropTypes.bool,
}