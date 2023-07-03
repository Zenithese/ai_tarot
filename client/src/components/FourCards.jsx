import React from 'react';
import GridCard from './GridCard';
import Card from './Card';

export default function FourCards({ drawnCards }) {
    return (
        <div className='my-[50px]'>
            <div className='grid grid-cols-10 mb-[50px]'>
                {
                    drawnCards[0] && (
                        <div className='sm:col-span-2 sm:col-start-4 col-start-2 col-span-4'>
                            <Card card={drawnCards[0]} />
                        </div>
                    )
                }
                {
                    drawnCards[1] && (
                        <div className='sm:col-span-2 col-span-4'>
                            <Card card={drawnCards[1]} />
                        </div>
                    )
                }
            </div>
            <div className='grid grid-cols-10'>
                {
                    drawnCards[2] && (
                        <div className='sm:col-span-2 sm:col-start-4 col-start-2 col-span-4'>
                            <Card card={drawnCards[0]} />
                        </div>
                    )
                }
                {
                    drawnCards[3] && (
                        <div className='sm:col-span-2 col-span-4'>
                            <Card card={drawnCards[1]} />
                        </div>
                    )
                }
            </div>
        </div>
    )

}
