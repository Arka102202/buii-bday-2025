import { useEffect } from "react";
import gryffiendor from "../assets/imgs/Gryffindor.jpg";
import hufflepuff from "../assets/imgs/Hufflepuff.jpeg";
import revenclaw from "../assets/imgs/Ravenclaw.jpg";
import slytherin from "../assets/imgs/Slytherin.jpg";
import hogwarts from "../assets/imgs/hogwarts-sign.jpeg";
import PropTypes from 'prop-types';
import { useRef } from "react";
import gsap from "gsap";

const StartScreen = ({ startScreenTlRef = {}, setShowWaitingArea = () => { } }) => {
    const top1Ref = useRef();
    const top2Ref = useRef();
    const top3Ref = useRef();
    const btm1Ref = useRef();
    const btm2Ref = useRef();
    const backDropInnerRef = useRef();
    const backDropRef = useRef();

    useEffect(() => {

        startScreenTlRef.current = gsap.timeline({
            defaults: {
                duration: 1
            }
        });

        startScreenTlRef.current
            .addLabel("start")
            .to(backDropInnerRef.current, {
                rotationY: "180deg",
                ease: "elastic.inOut(1.5,0.4)"
            })
            .addLabel("first")
            .set(top1Ref.current, { zIndex: -1 })
            .set(top2Ref.current, { zIndex: 0 })
            .to(backDropInnerRef.current, {
                rotationY: "360deg",
                ease: "elastic.inOut(1.5,0.4)"
            })
            .addLabel("second")
            .set(btm1Ref.current, { zIndex: -1 })
            .set(btm2Ref.current, { zIndex: 0 })
            .to(backDropInnerRef.current, {
                rotationY: "540deg",
                ease: "elastic.inOut(1.5,0.4)"
            })
            .addLabel("third")
            .set(top2Ref.current, { zIndex: -1 })
            .set(top3Ref.current, { zIndex: 0, scale: 1.5, borderWidth: 0 })
            .to(backDropInnerRef.current, {
                rotationY: "720deg",
                ease: "elastic.inOut(1.5,0.4)"
            })
            .set(top1Ref.current, { display: "none" })
            .set(top2Ref.current, { display: "none" })
            .set(btm1Ref.current, { display: "none" })
            .set(btm2Ref.current, { display: "none" })
            .addLabel("last")
            .to(top3Ref.current, { scale: 50, opacity: 0, duration: 2 })
            .to(backDropRef.current, { opacity: 0, duration: 2 }, "last")
            .set({}, {
                onComplete: () => {
                    setShowWaitingArea(true);
                }
            })

    }, [startScreenTlRef, setShowWaitingArea])


    return (
        <div id="backdrop" ref={backDropRef} className="pos-fixed top-0 left-0 bg-clr:#000 wd-100vw ht-100vh d-flex&justify:center&align:center">
            <div id="backdrop-inner" ref={backDropInnerRef} className="wd-150px ht-150px border_rad-50% pos-relative transform_style-preserve3d __#backdrop-inner>div@backface_visibility-hidden,transform_style-preserve3d,pos-absolute,wd-150px,ht-150px,bg-s:80%&pos:center&re:noRepeat,border-clr:#fff,border_rad-50%">
                <div id="top-1" ref={top1Ref} className="" style={{ backgroundImage: `url(${gryffiendor})` }}>
                </div>
                <div id="btm-1" ref={btm1Ref} className="transform-rotateY:180deg" style={{ backgroundImage: `url(${hufflepuff})` }}>
                </div>
                <div id="top-2" ref={top2Ref} className="zIndex-m1" style={{ backgroundImage: `url(${revenclaw})` }}>
                </div>
                <div id="btm-2" ref={btm2Ref} className="zIndex-m1 transform-rotateY:180deg" style={{ backgroundImage: `url(${slytherin})` }}>
                </div>
                <div id="top-3" ref={top3Ref} className="zIndex-m1" style={{ backgroundImage: `url(${hogwarts})` }}>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;

StartScreen.propTypes = {
    startScreenTlRef: PropTypes.object.isRequired,
    setShowWaitingArea: PropTypes.func.isRequired
}