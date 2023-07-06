import React, { useState, useEffect, useRef } from 'react';
import { images, reversedImages } from '../tarotDeck2';

const Card = ({ card, reveal, drawWidth, windowHeight }) => {
    const [flipped, setFlipped] = useState(false)
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [startTop, setStartTop] = useState(0)
    const [startLeft, setStartLeft] = useState(0)
    const [transitionDuration, setTransitionDuration] = useState('0.3s')

    const ref = useRef(null)

    useEffect(() => {
        if (!reveal) {
            setTimeout(() => {
                setFlipped(true)
            }, 500)
        }
    }, [reveal])

    useEffect(() => {
        console.log(drawWidth)
        console.log(ref.current?.clientHeight)
    })
    return (
        // card.reversed ?
        true ?
            <div
                className={`draw-card ${flipped ? 'flipped' : ''} relative transition-all`}
                style={{ width: drawWidth, top, left, transitionDuration }}
                onTouchStart={(e) => {
                    setStartTop(e?.nativeEvent?.changedTouches[0]?.clientY)
                    setStartLeft(e?.nativeEvent?.changedTouches[0]?.clientX)
                }}
                onTouchMove={(e) => {
                    setTop(Math.min(0, -(startTop - e?.nativeEvent?.changedTouches[0]?.clientY)))
                    setLeft(-(startLeft - e?.nativeEvent?.changedTouches[0]?.clientX))
                    setTransitionDuration('0s')
                }}
                onTouchEnd={(e) => {
                    setTop(top < -75 ? -windowHeight - ref.current?.clientHeight : 0)
                    setLeft(0)
                    setTransitionDuration('0.3s')
                }}
            >
                <div className='front face'>
                    {reversedImages[card.name.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join('')]}
                </div>
                <div className='back face' ref={ref}>
                    {reversedImages["Back"]}
                </div>
            </div>
            :
            <div className={`draw-card ${flipped ? 'flipped' : ''}`} style={{ width: drawWidth }}>
                <div className='front face'>
                    {images[card.name.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join('')]}
                </div>
                <div className='back face'>
                    {images["Back"]}
                </div>
            </div>
    );
};

export default Card;