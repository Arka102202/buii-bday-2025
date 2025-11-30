import { useEffect, useRef, useState } from "react";
import "./FlippingClock.css"
import PropTypes from 'prop-types';
import flip from "../../assets/sound/flipcard.wav";

import gsap from "gsap";


const FlippingCounter = ({ numberToShow = 6, maxCount = 9, tic = false, setPrevTic = () => { }, setTic = () => { }, isSecondDigit = false, setCount = () => { }, pos = 0, counterRef = {}, perspective_origin = "center", endAnimTic = {}, clockTlRef = {}, playAudio = false, sizes = [], stopFlipping = false }) => {

  const tbRef = useRef();
  const bbRef = useRef();
  const topBgClrRef = useRef("#282828");
  const btmBgClrRef = useRef("#2d2d2d");
  const borderRadRef = useRef(".6rem");
  const audioRef = useRef();
  const countRef = useRef(numberToShow);
  const isFirstTime = useRef(true);
  const cardHeightRef = useRef(sizes[0]);
  const [fontSize, setFontSize] = useState(sizes[1]);

  const [showCounter, setShowCounter] = useState(true);
  const interValRef = useRef();

  const animate = () => {

    if (endAnimTic[pos]) return;

    countRef.current = isFirstTime.current ? numberToShow : parseInt(tbRef.current && tbRef.current.innerText);

    setCount(nextCount());
    const topPart = document.querySelector(`.top-box-${pos}`);
    const btmPart = document.querySelector(`.btm-box-${pos}`);

    const topFlipEl = document.createElement("div");
    const btmFlipEl = document.createElement("div");

    topFlipEl.style.height = cardHeightRef.current + "rem";
    btmFlipEl.style.height = cardHeightRef.current + "rem";
    topFlipEl.style.width = cardHeightRef.current + 2 + "rem";
    btmFlipEl.style.width = cardHeightRef.current + 2 + "rem";

    topFlipEl.classList.add("top", "top-flip", "top_flip_anim", `top_flip_${pos}`);
    btmFlipEl.classList.add("bottom", "bottom_flip", "bottom_flip_anim", `btm_flip_${pos}`);

    topFlipEl.addEventListener("animationend", topAnimationEnd);
    btmFlipEl.addEventListener("animationend", btmAnimationEnd);

    topFlipEl.innerText = countRef.current;
    btmFlipEl.innerText = nextCount();
    tbRef.current.innerText = nextCount();
    bbRef.current.innerText = countRef.current;

    topPart.append(topFlipEl);
    btmPart.append(btmFlipEl);


    if (countRef.current === 0 && setPrevTic) setPrevTic(true);
    if (isFirstTime.current) isFirstTime.current = false;

    if (playAudio) {
      if (!audioRef.current) {
        audioRef.current = document.createElement("audio");
        audioRef.current.src = flip;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  const nextCount = () => countRef.current - 1 === -1 ? maxCount : countRef.current - 1;

  const topAnimationEnd = () => {
    document.querySelector(`.top_flip_${pos}`).remove();
    setTimeout(() => {
      bbRef.current.innerText = nextCount();
    }, 100)
  }

  const btmAnimationEnd = () => {
    document.querySelector(`.btm_flip_${pos}`).remove();
  }

  useEffect(() => {
    if (isSecondDigit && !stopFlipping) interValRef.current = setInterval(animate, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSecondDigit && endAnimTic[pos]) clearInterval(interValRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endAnimTic])

  useEffect(() => {
    if (!isSecondDigit && tic) {
      animate();
      setTic(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tic])

  useEffect(() => {
    if (!endAnimTic[pos] || !showCounter) return;
    const createEndAnim = () => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1
        }
      });
      tl
        .to(counterRef.current, {
          z: -4000,
          opacity: 0,
        })
        .set({}, {
          onComplete: () => {
            setShowCounter(false);
          }
        }, .7);

      clockTlRef.current.add(tl);
    }

    if (pos === 1) setTimeout(createEndAnim, 1000);
    else createEndAnim();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockTlRef, counterRef, endAnimTic, pos])


  useEffect(() => {
    if (endAnimTic[2]) {
      const tl = gsap.timeline({
        defaults: {
          duration: 1
        }
      });
      tl
        .to({}, {
          onComplete: () => {
            cardHeightRef.current = 15;
            setFontSize(28);
            const topFlipEl = document.querySelector(".top-flip");
            const btmFlipEl = document.querySelector(".bottom_flip");

            if (topFlipEl) {
              topFlipEl.style.height = cardHeightRef.current + "rem";
              topFlipEl.style.width = cardHeightRef.current + 2 + "rem";
            }
            if (btmFlipEl) {
              btmFlipEl.style.height = cardHeightRef.current + "rem";
              btmFlipEl.style.width = cardHeightRef.current + 2 + "rem";
            }
          },
        })
    }
  }, [endAnimTic])




  return (
    <>
      {showCounter && <div ref={counterRef} className={`segment d-flex&gap:2rem font-weight:600&family:hpFont color-#eee transform-translateZ:1000px perspective_origin-${perspective_origin} __.top-flip,.bottom_flip@pos-absolute,top-0,left-0 __.top-flip,.bottom_flip,.top,.bottom@line_height-1,p-1rem,overflow-hidden,txt_align-center __.top-flip,.top@bg-clr:${topBgClrRef.current},border_rad_tl-${borderRadRef.current},border_rad_tr-${borderRadRef.current},border_b-wd:.1rem&st:solid&clr:black __.bottom,.bottom_flip@bg-clr:${btmBgClrRef.current},border_rad_bl-${borderRadRef.current},border_rad_br-${borderRadRef.current},d-flex&align:flexEnd&justify:center`}>
        <div className="flip_card flip_card--hour-1 pos-relative d-inlineFlex flex_dir-column border_rad-.6rem shadow-0+.5rem+1rem+.2rem+#0000004d">
          <div style={{ position: "relative", fontSize: fontSize + "rem" }} className={`top-box-${pos}`}>
            <div className="top" ref={tbRef} style={{ height: cardHeightRef.current + "rem", width: cardHeightRef.current + 2 + "rem" }}>{isFirstTime.current ? numberToShow : nextCount()}</div>
          </div>
          <div style={{ position: "relative", fontSize: fontSize + "rem" }} className={`btm-box-${pos}`}>
            <div className="bottom" style={{ height: cardHeightRef.current + "rem", width: cardHeightRef.current + 2 + "rem" }} ref={bbRef}>{countRef.current}</div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default FlippingCounter;

FlippingCounter.propTypes = {
  numberToShow: PropTypes.number.isRequired,
  maxCount: PropTypes.number,
  tic: PropTypes.bool.isRequired,
  setPrevTic: PropTypes.func,
  setTic: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
  isSecondDigit: PropTypes.bool,
  pos: PropTypes.number.isRequired,
  counterRef: PropTypes.object.isRequired,
  perspective_origin: PropTypes.string,
  clockTlRef: PropTypes.object.isRequired,
  endAnimTic: PropTypes.object.isRequired,
  playAudio: PropTypes.bool,
  sizes: PropTypes.array,
  stopFlipping: PropTypes.bool,
}