import React from 'react';
import Card from './Card';

export default function FiveCards({ drawnCards }) {
    return (
        <div>
            <div className='flex flex-row flex-wrap justify-center my-5 sm:my-10 deck'>
                {drawnCards.slice(0, 1).map((card) => (
                    <div key={card.id} className='m-auto'>
                        <Card card={card} />
                    </div>
                ))}
            </div>
            <div className='flex flex-row flex-wrap justify-center my-5 sm:my-10 deck max-w-[800px] m-auto'>
                {drawnCards.slice(1, 4).map((card) => (
                    <div key={card.id} className='m-auto'>
                        <Card card={card} />
                    </div>
                ))}
            </div>
            <div className='flex flex-row flex-wrap justify-center my-5 sm:my-10 deck'>
                {drawnCards.slice(4).map((card) => (
                    <div key={card.id} className='m-auto'>
                        <Card card={card} />
                    </div>
                ))}
            </div>
        </div>
    )

}
