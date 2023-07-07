import React, { useState, useEffect, useRef } from 'react';
import { images, reversedImages } from '../tarotDeck2';

const Card = ({ card, reveal, drawWidth, windowHeight, setDrawnCards }) => {
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

    return (
        <div
            className={`draw-card ${flipped ? 'flipped' : ''} relative transition-all`}
            style={{ width: drawWidth, top, left, transitionDuration }}
            onTouchStart={(e) => {
                setStartTop(e?.nativeEvent?.changedTouches[0]?.clientY)
                setStartLeft(e?.nativeEvent?.changedTouches[0]?.clientX)
            }}
            onTouchMove={(e) => {
                e.stopPropagation()
                setTop(Math.min(0, -(startTop - e?.nativeEvent?.changedTouches[0]?.clientY)))
                setLeft(-(startLeft - e?.nativeEvent?.changedTouches[0]?.clientX))
                setTransitionDuration('0s')
            }}
            onTouchEnd={(e) => {
                if (top < -75) {
                    setTop(top < -75 ? -windowHeight - ref.current?.clientHeight : 0)
                    setDrawnCards((drawnCards) => {
                        return [...drawnCards, card]
                    })
                }
                setLeft(0)
                setTransitionDuration('0.3s')
            }}
        >
            <div className='front face'>
                {(card.reversed ? reversedImages : images)[card.name.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join('')]}
            </div>
            <div className='back face' ref={ref}>
                {(card.reversed ? reversedImages : images)["Back"]}
            </div>
        </div>
    );
};

export default Card;