import React from 'react';
import Card from './Card';

export default function FourCards({ drawnCards }) {
    return (
        <div className='my-[50px]'>
            <div className='grid grid-cols-9 mb-[50px] max-w-[800px] m-auto'>
                {
                    drawnCards[0] && (
                        <div key={drawnCards[0].id} className='col-start-1 col-span-3'>
                            <Card card={drawnCards[0]} />
                        </div>
                    )
                }
                {
                    drawnCards[1] && (
                        <div key={drawnCards[1].id} className='col-span-3'>
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
            </div>
        </div>
    )

}
