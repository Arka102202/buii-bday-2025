import { useEffect, useRef, useState } from "react";
import StartScreen from "./component/StartScreen";
import WaitingArea from "./component/WaitingArea";

import firstSong from "../src/assets/sound/Hedwigs Theme.mp3"

import "./app.css";

import gsap from "gsap";
import WishArea from "./component/WishArea";
import Gallery from "./component/Gallery";

const App = () => {

  const masterTlRef = useRef(gsap.timeline());
  const startScreenTlRef = useRef();
  const waitingAreaTlRef = useRef();

  const firstAudioRef = useRef();
  const playAudio = true;

  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState("block");
  const [showWaitingArea, setShowWaitingArea] = useState(false);
  const [showWishArea, setShowWishArea] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const celMusicRef = useRef();

  const clickHandler = () => {
    setShow(true);
    setShowBtn("none");
    if (playAudio && !showWishArea && !showGallery) {
      firstAudioRef.current = document.createElement("audio");
      firstAudioRef.current.src = firstSong;
      firstAudioRef.current.play();
    }
  }

  useEffect(() => {

    if (startScreenTlRef.current && waitingAreaTlRef.current) {

      masterTlRef.current
        .add(startScreenTlRef.current)
        .addLabel("endOfStart")
        .add(waitingAreaTlRef.current, "endOfStart-=.5")
    }

  }, [])

  useEffect(() => {
    if (!showWishArea && celMusicRef.current) celMusicRef.current.pause();
  }, [showWishArea])

  return (
    <>
      <button onClick={clickHandler} style={{ display: showBtn, position: "fixed", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> Click This Button</button>
      {show && <>

        {
          // !showGallery && !showWishArea &&
          <>
            <StartScreen startScreenTlRef={startScreenTlRef} setShowWaitingArea={setShowWaitingArea} />
            {showWaitingArea && <WaitingArea waitingAreaTlRef={waitingAreaTlRef} firstAudioRef={firstAudioRef} playAudio={playAudio} showWaitingArea={showWaitingArea} setShowWaitingArea={setShowWaitingArea} setShowWishArea={setShowWishArea} />}
          </>}
        {showWishArea && <WishArea playAudio={playAudio} setShowGallery={setShowGallery} setShowWishArea={setShowWishArea} celMusicRef={celMusicRef} />}
        {
          showGallery && <Gallery />
        }
      </>}
    </>
  );
};

export default App;
