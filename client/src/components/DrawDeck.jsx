import React, { useEffect, useState, useRef } from 'react'
import DrawCard from './DrawCard'
import useWindowSize from '../hooks/useWindowResize'

export const DrawDeck = ({ deck, setDeck, setDrawnCards }) => {

    const windowSize = useWindowSize();

    const cardRef = useRef(null)

    const [leftZ, setLeftZ] = useState(0)
    const [rightZ, setRightZ] = useState(0)

    // useEffect(() => {
    //     shuffle()
    // }, [])

    // const shuffle = () => {
    //     const newDeck = [...deck];
    //     const suffledDeck = []
    //     while (newDeck.length) {
    //         const randomIndex = Math.floor(Math.random() * newDeck.length);
    //         const card = newDeck[randomIndex];
    //         const reversed = Math.random() < 0.5; // Determine whether the card is reversed
    //         const newCard = {
    //             ...card,
    //             reversed: reversed
    //         };
    //         newDeck.splice(randomIndex, 1); // Remove the drawn card from the deck
    //         suffledDeck.push(newCard);
    //     }
    //     console.log(suffledDeck)
    //     setDeck(suffledDeck);
    // }



    return (
        <div className='grid grid-cols-2 m-auto overflow-hidden' style={{ height: windowSize.height, zIndex: leftZ }}>
            <div
                className='grid grid-cols-1'
                style={{ width: windowSize.width / 2 }}
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
                                    height: (windowSize.height) / 39
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
            <div
                className='grid grid-cols-1'
                style={{ width: cardRef.current?.clientWidth / 2, zIndex: rightZ }}
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
                                    height: (windowSize.height) / 39
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
