import React, { useState } from 'react';
import { images } from '../tarotDeck';

const Card = ({ card, index }) => {
    const [flipped, setFlipped] = useState(false)
    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className='front face'>
                <img key={index} src={images[card.name.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join('')]} alt={card.name} className={`${card.reversed ? 'reversed' : ''} tarot-img`} />
            </div>
            <div className='back face'>
                <img key={index} src={'/images/1909_PAM_A/back.jpg'} alt={card.name} className={`${card.reversed ? 'reversed' : ''} tarot-img`} />
            </div>
        </div>
    );
};

export default Card;