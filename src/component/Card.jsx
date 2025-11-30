import coverFront from "../assets/imgs/card-cover-front.webp";
import coverInside from "../assets/imgs/cover-inside.webp";
import coverBckTop from "../assets/imgs/card-cover-BACK-TOP.webp";
import coverBckBtm from "../assets/imgs/card-cover-BACK-btm.webp";
import letter from "../assets/imgs/letter.webp";
import letterSeal from "../assets/imgs/letter-seal.webp";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import gsap from "gsap";


const Card = ({ setShowGallery = () => { }, setShowWishArea = () => { } }) => {


    const cardRef = useRef();
    const cardBackRef = useRef();
    const carBackTopRef = useRef();
    const sealRef = useRef();
    const letterRef = useRef();


    const [isCardClicked, setCardClicked] = useState(false);
    const [isSealClicked, setSealClicked] = useState(false);
    const [isLetterClicked, setLetterClicked] = useState(false);

    const handleFrontClicked = (e) => {
        e.stopPropagation();
        setCardClicked(true);
    }
    const handleSealClicked = (e) => {
        e.stopPropagation();
        setSealClicked(true);
    }
    const handleLetterClicked = (e) => {
        e.stopPropagation();
        setLetterClicked(true);
    }


    useEffect(() => {
        if (isCardClicked) {
            cardRef.current.style.transform = "translate(-50%, -50%) rotateY(180deg)";
        }
    }, [isCardClicked])


    useEffect(() => {
        if (isSealClicked) {
            const tl = gsap.timeline({
                defaults: {
                    duration: .5
                }
            });

            tl
                .to(sealRef.current, {
                    opacity: 0
                }, 0)
                .to(cardBackRef.current, {
                    z: "-1000px",
                    rotateY: "150deg"
                }, 0)
                .set(carBackTopRef.current, {
                    transformOrigin: "top"
                })
                .to(carBackTopRef.current, {
                    rotateX: "-180deg",
                    duration: 1
                })
                .set(letterRef.current, {
                    zIndex: 100
                })
                .to(letterRef.current, {
                    y: "-100%"
                })
                .addLabel("last")
                .to(cardBackRef.current, {
                    z: "0px",
                    rotateY: "180deg",
                    scale: .7
                }, "last")
                .to(letterRef.current, {
                    y: "0",
                    rotateZ: "90deg",
                    scale: 1.4
                }, "last")


        }
    }, [isSealClicked])


    useEffect(() => {
        if (isLetterClicked) {
            if (letterRef.current.style.scale == "1")
                letterRef.current.style.scale = window.innerWidth >= 500 ? "1.1" : "1.5";
            else letterRef.current.style.scale = "1";
        }
        setLetterClicked(false);
    }, [isLetterClicked])


    return (
        <div id="card" ref={cardRef} className="wd-50vw wd-500px-45vh transition-all+1s" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotateY(0deg)", transformStyle: "preserve-3d", perspective: "1000px", aspectRatio: "5324/3550", }}>
            <div id="card-front" className="wd-100% pos-absolute top-0 left-0 backface_visibility-hidden" onClick={handleFrontClicked}>
                <img src={coverFront} alt="" />
                <div className="color-#423100 wd-35rem" style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1.2rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <p style={{ fontWeight: "600", fontFamily: "classy-voguish", fontSize: "1.2rem" }}>My Love, Buiiiiiiiiiiiiiiiiiiiiiiiiiiiii</p>
                    <p style={{ fontFamily: "grotesis", fontSize: "1.5rem", textAlign: "center" }}>A HAPPY BIRTHDAY to my cutie pie</p>
                    <div >
                        <p style={{ fontFamily: "grotesis", fontSize: "1rem", textAlign: "right" }}>at the center of my heart</p>
                        <p style={{ fontFamily: "classy-voguish", fontSize: "1.2rem", textAlign: "right" }}>Your Arka</p>
                    </div>
                </div>
            </div>

            <div id="card-back" ref={cardBackRef} className="wd-100% pos-absolute top-0 left-0 backface_visibility-hidden" style={{ transform: "rotateY(180deg)", aspectRatio: "5324/3550", filter: "drop-shadow(2px 4px 6px #00000014)", transition: "all .5s" }}>
                <img src={coverInside} alt="" className="wd-100% pos-absolute top-0 left-0" />
                <div ref={letterRef} alt="" className="wd-100% pos-absolute top-0 left-0 transition-all+.3s" onClick={handleLetterClicked} >
                    <img src={letter} />
                    <div className="pos-absolute" style={{
                        top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-90deg)", fontSize: "0.8rem", width: "60%", display: "flex", flexDirection: "column", gap: "0.3rem",
                        fontFamily: 'Boniface', color: "#392101",
                    }}>
                        <p>
                            Happy Birthday, Buii — My Love and Eternal Patronus Charm!
                        </p>
                        <p>
                            Buii, you are the most enchanting part of my life, a magic beyond anything taught at Hogwarts. Your beauty is like Hogwarts under snow—timeless, breathtaking, and more radiant than a thousand shimmering Galleons under Gringotts&#180; vault lights.
                        </p>
                        <p>
                            You carry the courage of a true Gryffindor, unyielding in the face of challenges. Your kindness rivals Luna Lovegood&#180;s warmth, effortlessly accepting and embracing everything with a heart that&#180;s pure magic. Your loyalty? Fierce and unwavering like Dobby&#180;s, always standing by those you love, even when it costs you. And your brilliance is nothing short of Hermione Granger&#180;s—quick, sharp, and dazzling, casting light where confusion lurks.
                        </p>
                        <p>
                            But there&#180;s more. You have a compassion as vast as Hagrid&#180;s heart, embracing everyone without judgment. You&#180;re mysterious like the Room of Requirement—always appearing with exactly what my soul needs, whether it&#180;s comfort, laughter, or inspiration.
                        </p>
                        <p>
                            Your love, Buii, is rare and eternal, like Lily Potter&#180;s sacrifice—a love that transcends time itself. And just like Snape&#180;s lifelong devotion to Lily, I will always choose you, again and again. Your presence in my life is like a Lumos spell, guiding me through darkness, and like Felix Felicis, making every moment feel charmed with boundless joy.
                        </p>
                        <p>
                            If I were a wizard, I&#180;d cast the most powerful spells that would be
                        </p>
                        <p style={{ fontSize: "1.5rem", fontFamily: "hp-font", textAlign: "center", cursor: "pointer" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowGallery(true);
                                setShowWishArea(false);
                            }}>
                            Buiiiiiiiiiiiiiiiiiiiiiii
                        </p>
                        <p>
                            So today, on your magical day, here&#180;s to moments sweeter than Honeydukes&#180; finest chocolate, more thrilling than a Firebolt ride, and more unforgettable than a Butterbeer toast at The Three Broomsticks.
                        </p>
                        <p>
                            Happy Birthday, my Chosen One, my love, my forever. Always. 💕✨ 🪄
                        </p>

                    </div>
                </div>
                <img src={coverBckBtm} alt="" className="wd-100% pos-absolute bottom-0 left-0" />
                <div className="pos-absolute top-0 left-0 wd-100%" style={{ aspectRatio: "5324/2724" }}>
                    <img src={coverBckTop} alt="" ref={carBackTopRef} />
                    <img src={letterSeal} ref={sealRef} alt="" className="wd-6vw wd-500px-8vh pos-absolute bottom-0 left-50% zIndex-10" style={{ transform: "translateX(-50%)" }} onClick={handleSealClicked} />
                </div>
            </div>

        </div >
    );
};

export default Card;

Card.propTypes = {
    setShowGallery: PropTypes.func.isRequired,
    setShowWishArea: PropTypes.func.isRequired,
}