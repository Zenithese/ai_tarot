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
            <div className='grid grid-cols-9 mb-[50px] max-w-[800px] m-auto'>
                {
                    drawnCards[1] && (
                        <div key={drawnCards[1].id} className='col-start-1 col-span-3'>
                            <Card card={drawnCards[1]} />
                        </div>
                    )
                }
                {
                    drawnCards[2] && (
                        <div key={drawnCards[2].id} className='col-span-3'>
                            <Card card={drawnCards[2]} />
                        </div>
                    )
                }
                {
                    drawnCards[3] && (
                        <div key={drawnCards[3].id} className='col-span-3'>
                            <Card card={drawnCards[3]} />
                        </div>
                    )
                }
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
