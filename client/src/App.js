import React, { useState, useEffect } from 'react';
import './App.css';
import { tarotDeck, tarotNames } from './tarotDeck';
import Spread from './components/Spread';

const App = () => {
  const [drawnCards, setDrawnCards] = useState([]);
  const [deck, setDeck] = useState(tarotDeck);
  const [question, setQuestion] = useState('')
  const [tarotReading, setTarotReading] = useState('')
  const [theme, setTheme] = useState('')
  const [selectedSpread, setSelectedSpread] = useState('1 card')

  useEffect(() => {
    const overflow = Number(selectedSpread.split('')[0]) - drawnCards.length
    if (overflow < 0) {
      for (let i = overflow; i < 0; i++) {
        drawnCards.pop()
      }
    }
    if (Number(selectedSpread.split('')[0]) === 1) {
      setTheme('A message from the universe');
    } else if (Number(selectedSpread.split('')[0]) === 2) {
      setTheme('The situation and the challenge');
    } else if (Number(selectedSpread.split('')[0]) === 3) {
      setTheme('The past, present, and future');
    } else if (Number(selectedSpread.split('')[0]) === 4) {
      setTheme('The four elements and how they influence the situation');
    } else if (Number(selectedSpread.split('')[0]) === 5) {
      setTheme('The cross formation');
    }
  }, [selectedSpread])

  const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    const reversed = Math.random() < 0.5; // Determine whether the card is reversed
    const newCard = {
      ...card,
      reversed: reversed
    };
    const newDeck = [...deck];
    newDeck.splice(randomIndex, 1); // Remove the drawn card from the deck
    setDrawnCards([...drawnCards, newCard]);
    setDeck(newDeck);
  };

  const clearDrawnCards = () => {
    setDrawnCards([]);
    setDeck(tarotDeck);
  };

  const reading = () => {
    // Create an array of card meanings based on the cards drawn, including whether they are reversed or upright
    // const meanings = drawnCards.map(card => `${card.name} ${card.reversed ? '(reversed)' : '(upright)'}: ${card.reversed ? card.meanings.reversed : card.meanings.upright}`);
    const arrangement = drawnCards.map(card => `${card.name} ${card.reversed ? '(reversed)' : '(upright)'}`)

    return { arrangement }
  };

  const AIReading = async () => {
    const { arrangement } = reading()
    const response = await fetch("https://ai-tarot.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "messages": [
          { "role": "system", "content": `Give a tarot reading.` },
          { "role": "user", "content": `Using this array of tarot cards ${arrangement} and the following theme: ${theme}, interpret them considering this intention: ${question.length ? question : 'give me a general reading'}.` }
        ]
      }),
    });
    const jsonData = await response.json();
    console.log(jsonData)
    setTarotReading(jsonData.reading)
  }

  const formatTarotReading = tarotReading.split("\n\n").map((p, i) => {
    if (i === 0 && tarotNames.some(name => p.includes(name.toLowerCase()))) {
      return (
        <>
          <p key={0} className='indent-8 text-left leading-loose w-[90%] my-3 mx-auto'>{`${theme}:`}</p>
        </>
      )
    } else {
      return (
        <>
          <p index={i} className='indent-8 text-left leading-loose w-[90%] my-3 mx-auto'>{p}</p>
        </>
      )
    }
  })

  const handleNewReading = () => {
    setTarotReading('')
    clearDrawnCards()
  }

  return (
    <div className={`App ${tarotReading.length ? 'overflow-hidden' : ''}`}>
      <h1 className='text-[20px] mb-[15px]'>Tarot Card Reader</h1>
      <div className='text-[18px] mb-[15px]'>
        <select value={selectedSpread} onChange={(e) => setSelectedSpread(e.target.value)}>
          <option value={'1 card'}>1 card</option>
          <option value={'2 cards'}>2 card</option>
          <option value={'3 cards'}>3 card</option>
          <option value={'4 cards'}>4 card</option>
          <option value={'5 cards'}>5 card</option>
        </select>
      </div>
      <button className='border-2 border-black p-2 m-2 disabled:opacity-50' onClick={drawCard} disabled={drawnCards.length >= Number(selectedSpread.split('')[0])}>Draw a card</button>
      <button className='border-2 border-black p-2 m-2' onClick={clearDrawnCards}>Clear cards</button>
      <h1>Ask the cards a question</h1>
      <textarea className='m-2 mb-[10px]' onChange={(e) => setQuestion(e.target.value)} />
      <div>
        <p className='text-[20px] underline'>
          {theme}
        </p>
      </div>
      {drawnCards.length > 0 && (
        <Spread drawnCards={drawnCards} selectedSpread={selectedSpread} />
      )}
      {drawnCards.length == selectedSpread.slice(0,1) && (
        <button className='border-2 border-black p-2 m-2 disabled:opacity-50' onClick={AIReading} disabled={drawnCards.length < Number(selectedSpread.split('')[0])}>Get Reading</button>
      )}
      {
        tarotReading.length ?
          <div className='bg-black opacity-75 absolute w-[95%] m-auto h-[100%] overflow-scroll text-white top-0 left-0 right-0 bottom-0 flex flex-col'>
            <div className='flex m-auto flex-col'>
              {formatTarotReading}
              <button className='border-2 border-white p-2 m-2' onClick={() => handleNewReading()}>New Reading</button>
            </div>
          </div>
          :
          null
      }
    </div>
  );
};

export default App;
