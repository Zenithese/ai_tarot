import React, { useState } from 'react';
import { images, reversedImages } from '../tarotDeck2';

const Card = ({ card }) => {
    const [flipped, setFlipped] = useState(false)
    return (
        card.reversed ?
            <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className='front face'>
                    {reversedImages[card.name.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join('')]}
                </div>
                <div className='back face'>
                    {reversedImages["Back"]}
                </div>
            </div>
            :
            <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
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