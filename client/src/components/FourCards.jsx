import React from 'react';
import Card from './Card';

export default function FourCards({ drawnCards }) {
    return (
        <div className='my-[50px]'>
            <div className='grid grid-cols-10 mb-[50px]'>
                {
                    drawnCards[0] && (
                        <div key={drawnCards[0].id} className='sm:col-span-2 sm:col-start-4 col-start-2 col-span-4'>
                            <Card card={drawnCards[0]} />
                        </div>
                    )
                }
                {
                    drawnCards[1] && (
                        <div key={drawnCards[1].id} className='sm:col-span-2 col-span-4'>
                            <Card card={drawnCards[1]} />
                        </div>
                    )
                }
            </div>
            <div className='grid grid-cols-10'>
                {
                    drawnCards[2] && (
                        <div key={drawnCards[2].id} className='sm:col-span-2 sm:col-start-4 col-start-2 col-span-4'>
                            <Card card={drawnCards[2]} />
                        </div>
                    )
                }
                {
                    drawnCards[3] && (
                        <div key={drawnCards[3].id} className='sm:col-span-2 col-span-4'>
                            <Card card={drawnCards[3]} />
                        </div>
                    )
                }
            </div>
        </div>
    )

}
