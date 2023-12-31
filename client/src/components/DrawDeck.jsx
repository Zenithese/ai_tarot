import React, { useEffect, useState, useRef } from 'react'
import DrawCard from './DrawCard'
import useWindowSize from '../hooks/useWindowResize'

export const DrawDeck = ({ deck, setDrawnCards }) => {

    const windowSize = useWindowSize();

    const cardRef = useRef(null)

    const [leftZ, setLeftZ] = useState(0)
    const [rightZ, setRightZ] = useState(0)
    const [colCount, setColCount] = useState(78)
    const [rowCount, setRowCount] = useState(1)

    useEffect(() => {
        let cc = 78, rc = 1
        while ((windowSize.width - 256) / cc < 18) {
            cc /= 2
            rc += 1
        }
        setColCount(cc)
        setRowCount(rc)
    }, [windowSize])

    if (windowSize.width > 600) {
        return (
            <div
                className='h-[100vh] w-full'
                style={{ width: windowSize.width - (256 / 2) }}
            >
                <div
                    className={`relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
                    style={{ width: windowSize.width - 256 }}
                >
                    {
                        Array(rowCount).fill().map((_, i) => {
                            return (
                                <div
                                    className={`flex flex-row h-[260px] my-auto ${!Number.isInteger(i / 2) ? 'flex-reverse' : ''}`}
                                    key={i}
                                >
                                    {
                                        deck.slice(i * colCount, (i + 1) * colCount).map((card, idx) => {
                                            return (
                                                <div key={card.id}
                                                    style={{
                                                        // height: (windowSize.height) / 39,
                                                        width: (windowSize.width - 256) / colCount,
                                                        zIndex: !Number.isInteger(i / 2) ? Math.floor((colCount * (i + 1)) - idx) : Math.floor((colCount * i) + (idx + 1))
                                                    }}
                                                >
                                                    <div ref={cardRef} >
                                                        <DrawCard card={card} reveal drawWidth={(windowSize.width) / 2} windowHeight={windowSize.height} setDrawnCards={setDrawnCards} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div
                className='grid grid-cols-2 m-auto overflow-hidden no-touch-action'
                style={{ height: windowSize.height, zIndex: leftZ }}
            >
                <div
                    className='grid grid-cols-1'
                    style={{ width: (windowSize.width || 1) / 2 }}
                    onTouchStart={() => {
                        setLeftZ(100)
                        setRightZ(0)
                    }}
                >
                    {
                        deck.slice(0, 39).map(card => {
                            return (
                                <div key={card.id} className='m-auto'
                                    style={{
                                        height: (windowSize.height || 1) / 39
                                    }}
                                >
                                    <div ref={cardRef} >
                                        <DrawCard card={card} reveal drawWidth={windowSize.width / 2} windowHeight={windowSize.height} setDrawnCards={setDrawnCards} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    className='grid grid-cols-1'
                    style={{ width: (cardRef.current?.clientWidth || 1) / 2, zIndex: rightZ }}
                    onTouchStart={() => {
                        setLeftZ(0)
                        setRightZ(100)
                    }}
                >
                    {
                        deck.slice(39).map(card => {
                            return (
                                <div key={card.id} className='m-auto'
                                    style={{
                                        height: (windowSize.height || 1) / 39
                                    }
                                    }
                                >
                                    <div ref={cardRef} >
                                        <DrawCard card={card} reveal drawWidth={windowSize.width / 2} windowHeight={windowSize.height} setDrawnCards={setDrawnCards} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
