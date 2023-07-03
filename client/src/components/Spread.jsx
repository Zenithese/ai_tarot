import React, { useState, useEffect } from 'react';
import Card from './Card';
import CelticCross from './FiveCards'
import FourCards from './FourCards';
import ThreeCards from './ThreeCards';

export default function Spread({ drawnCards, selectedSpread }) {
    const [cardCount, setCardCount] = useState(0)

    useEffect(() => {
        setCardCount(Number(selectedSpread.split('')[0]))
    }, [selectedSpread])
    
    if (cardCount < 3) {
        return (
            <div className='flex flex-row flex-wrap justify-center my-5 deck max-w-[400px] m-auto'>
                {
                    drawnCards.map((card) => (
                        <div key={card.id} className='m-auto'>
                            <Card card={card} />
                        </div>
                    ))
                }
            </div>
        )
    } else if (cardCount < 4) {
        return (
            <ThreeCards drawnCards={drawnCards}/>
        )
    } else if (cardCount < 5) {
        return <FourCards drawnCards={drawnCards} />
    } else {
        return (
            <CelticCross drawnCards={drawnCards} />
        )
    }
}
