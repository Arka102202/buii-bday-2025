import { useEffect, useState } from 'react';
import FlippingCounter from './FlippingCounter';
import PropTypes from 'prop-types';

import "./FlippingClock.css";

const FlippingPair = ({ pairTic = false, setPairTic = () => { }, setPrevPairTic = () => { }, isSecondDigit = true, numberToShow = 10, posArr = [], digitLeftRef = {}, digitRightRef = {}, perspective_origin_left = "center", perspective_origin_right = "center", clockTlRef = {}, endAnimTic = {}, playAudio = false, sizes = [], stopFlipping = false }) => {


    const [leftTic, setLeftTic] = useState(false);
    const [leftCount, setLeftCount] = useState(parseInt(numberToShow / 10));
    const [rightCount, setRightCount] = useState(parseInt(numberToShow % 10));

    useEffect(() => {
        if (leftCount === 0 && rightCount === 0) setPrevPairTic(true);
    }, [leftCount, rightCount, setPrevPairTic])


    return (
        <>
            <FlippingCounter numberToShow={leftCount} setCount={setLeftCount} maxCount={5} tic={leftTic} setTic={setLeftTic} pos={posArr[1]} counterRef={digitLeftRef} perspective_origin={perspective_origin_left} endAnimTic={endAnimTic} clockTlRef={clockTlRef} sizes={sizes} stopFlipping={stopFlipping}/>
            <FlippingCounter numberToShow={rightCount} setCount={setRightCount} tic={pairTic} isSecondDigit={isSecondDigit} setPrevTic={setLeftTic} setTic={setPairTic} pos={posArr[0]} counterRef={digitRightRef} perspective_origin={perspective_origin_right} endAnimTic={endAnimTic} clockTlRef={clockTlRef} playAudio={playAudio} sizes={sizes} stopFlipping={stopFlipping}/>
        </>
    );
};

export default FlippingPair;

FlippingPair.propTypes = {
    pairTic: PropTypes.bool.isRequired,
    setPairTic: PropTypes.func.isRequired,
    setPrevPairTic: PropTypes.func,
    isSecondDigit: PropTypes.bool.isRequired,
    numberToShow: PropTypes.number.isRequired,
    posArr: PropTypes.array.isRequired,
    digitLeftRef: PropTypes.object.isRequired,
    digitRightRef: PropTypes.object.isRequired,
    perspective_origin_left: PropTypes.string,
    perspective_origin_right: PropTypes.string,
    clockTlRef: PropTypes.object.isRequired,
    endAnimTic: PropTypes.object.isRequired,
    playAudio: PropTypes.bool,
    sizes: PropTypes.array,
    stopFlipping: PropTypes.bool,
}