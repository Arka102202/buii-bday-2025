import barsoRe from "../assets/sound/Barso-Re.mp3";
import barsoReImg from "../assets/imgs/barso-re.jpeg";
import chalaJata from "../assets/sound/Chala-Jata-Hoon.mp3";
import chalaImg from "../assets/imgs/chala.jpeg";
import ekChatur from "../assets/sound/Ek-Chatur-Naar.mp3";
import ekChaturImg from "../assets/imgs/ek-chatur-img.jpg";
import hosanna from "../assets/sound/Hosanna.mp3";
import hosannaImg from "../assets/imgs/hosanna-img.jpg";
import innLamhon from "../assets/sound/Inn-Lamhon-Ke.mp3";
import innLamhoImg from "../assets/imgs/inn-lamho.webp";
import radha from "../assets/sound/Radha-Kaise-Na-Jale.mp3";
import radhaImg from "../assets/imgs/radha.jpeg";
import uffTeri from "../assets/sound/Uff-Teri-Adaa.mp3";
import uffTeriImg from "../assets/imgs/uff-teri.webp";
import voh from "../assets/sound/Voh-Dekhnay–Mein.mp3";
import vohImg from "../assets/imgs/voh.webp";
import yehDil from "../assets/sound/Yeh-Dil.mp3";
import yehDilImg from "../assets/imgs/yeh-dil.jpeg";
import maa from "../assets/sound/maa.mp3";
import maaImg from "../assets/imgs/maa-img.jpg";
import { useMemo, useState } from "react";
import ImageCard from "./ImageCard";

import rightArrow from "../assets/imgs/right-arrow.png";

const Gallery = () => {

    const songs = useMemo(() => {
        return [uffTeri, hosanna, ekChatur, maa, voh, yehDil, radha, innLamhon, barsoRe, chalaJata];
    }, [])
    const images = useMemo(() => {
        return [uffTeriImg, hosannaImg, ekChaturImg, maaImg, vohImg, yehDilImg, radhaImg, innLamhoImg, barsoReImg, chalaImg];
    }, []);

    const texts = useMemo(() => {
        return ["First Time", "My Heart", "My Dream Girl", "Our Family", "Innocence", "Attitude", "My BUIII", "My Love", "Mamon", "Mem Saahab"];
    }, []);

    const [imgX, setImgX] = useState([-50, 250, 550, 850, 1150, 1450, 1750, 2050, 2350, 2650]);

    const handleLeftClick = (e) => {
        e.stopPropagation();

        if (imgX[0] === -50) return;

        setImgX(state => {
            state = state.map(el => el + 300);

            return [...state];
        });
    }

    const handleRightClick = (e) => {
        e.stopPropagation();

        if (imgX.at(-1) === -50) return;

        setImgX(state => {
            state = state.map(el => el - 300);

            return [...state];
        });
    }


    return (
        <div className="wd-100vw ht-100vh bg-clr:#fff pos-relative overflow-hidden">

            {[...new Array(imgX.length)].map((el, idx) => (
                <ImageCard audio={songs} img={images} text={texts[idx]} pos={idx} key={idx} x={imgX} />))}

            <div className="pos-absolute top-50% left-2% wd-2rem zIndex-10 transition-all+1s"
                style={{ transform: "translate(0, -50%) rotate(180deg)", cursor: "pointer", opacity: imgX[0] === -50 ? 0 : 1, pointerEvents: imgX[0] === -50 ? "none" : "all" }}
                onClick={handleLeftClick}>
                <img src={rightArrow} alt="" />
            </div>

            <div className="pos-absolute top-50% right-2% wd-2rem zIndex-10 transition-all+1s"
                style={{ transform: "translate(0, -50%)", cursor: "pointer", opacity: imgX.at(-1) === -50 ? 0 : 1, pointerEvents: imgX.at(-1) === -50 ? "none" : "all" }}
                onClick={handleRightClick}>
                <img src={rightArrow} alt="" />
            </div>

        </div>
    );
};

export default Gallery;
