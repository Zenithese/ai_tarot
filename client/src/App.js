import React, { useState, useEffect } from 'react';
import './App.css';
import { tarotDeck, tarotNames } from './tarotDeck';
import Spread from './components/Spread';
import { DrawDeck } from './components/DrawDeck';

const App = () => {

  const [drawnCards, setDrawnCards] = useState([]);
  const [deck, setDeck] = useState(tarotDeck);
  const [question, setQuestion] = useState('')
  const [tarotReading, setTarotReading] = useState('')
  const [theme, setTheme] = useState('')
  const [selectedSpread, setSelectedSpread] = useState('1 card')
  const [fetching, setFetching] = useState(false)
  const [fetchingMessage, setFetchingMessage] = useState('Blessings to those who wait')

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
      setTheme('Past, present, future, reason and potential cross formation');
    }
  }, [selectedSpread, drawnCards])

  useEffect(() => {
    setTimeout(() => {
      if (fetching) {
        if (!fetchingMessage.includes('.')) setFetchingMessage('Blessings to those who wait.')
        else if (fetchingMessage.includes('.') && !fetchingMessage.includes('..')) setFetchingMessage('Blessings to those who wait..')
        else if (fetchingMessage.includes('..') && !fetchingMessage.includes('...')) setFetchingMessage('Blessings to those who wait...')
        else setFetchingMessage('Blessings to those who wait')
      }
    }, 1000)
  }, [fetching, fetchingMessage])

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
    setFetching(true)
    const { arrangement } = reading()
    const response = await fetch(
      // "http://localhost:3001",
      "https://ai-tarot.onrender.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrangement,
          theme,
          question
        }),
      });

    if (!response.ok) {
      const data = await response.json()
      const error = (data && data.message) || response.status;
      console.log(error)
      alert('Something went wrong. Please try again later.')
      setFetching(false)
      return Promise.reject(error)
    }

    const jsonData = await response.json()
    console.log(jsonData.reading)
    setTarotReading(jsonData.reading)
    setFetching(false)
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
        <div key={i}>
          <p className='indent-8 text-left leading-loose w-[90%] my-3 mx-auto'>{p}</p>
        </div>
      )
    }
  })

  const handleNewReading = () => {
    setTarotReading('')
    clearDrawnCards()
  }

  return (
    <div className={`App ${tarotReading.length ? 'overflow-hidden h-[100vh]' : ''}`}>
      {/* <div className={`App ${tarotReading.length || fetching ? 'overflow-hidden h-0' : ''}`}>
        <h1 className='text-[20px] mb-[15px] mt-5'>Tarot Card Reader</h1>
        <div className='text-[18px] mb-[15px]'>
          <select value={selectedSpread} onChange={(e) => setSelectedSpread(e.target.value)}>
            <option value={'1 card'}>1 card</option>
            <option value={'2 cards'}>2 cards</option>
            <option value={'3 cards'}>3 cards</option>
            <option value={'4 cards'}>4 cards</option>
            <option value={'5 cards'}>5 cards</option>
          </select>
        </div>
        <div>
          <p className='text-[20px] underline mb-[5px]'>
            {theme}
          </p>
        </div>
        <button className='border-2 border-black p-2 m-2 disabled:opacity-50' onClick={drawCard} disabled={drawnCards.length >= Number(selectedSpread.split('')[0])}>Draw a card</button>
        <button className='border-2 border-black p-2 m-2' onClick={clearDrawnCards}>Clear cards</button>
        <h1>Give the cards an intention</h1>
        <textarea className='m-2 mb-[10px]' onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div className={`${(tarotReading.length || fetching) ? 'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%]' : ''}`}>
        {drawnCards.length > 0 && (
          <Spread drawnCards={drawnCards} selectedSpread={selectedSpread} />
        )}
        {!(tarotReading.length || fetching) && drawnCards.length === Number(selectedSpread.slice(0, 1)) && (
          <button className={`border-2 border-black p-2 m-2 mb-20 disabled:opacity-50`} onClick={AIReading} disabled={drawnCards.length < Number(selectedSpread.split('')[0])}>Get Reading</button>
        )}
      </div>
      {
        tarotReading.length > 0 &&
        <div className='bg-black opacity-75 fixed w-[95%] m-auto h-[100%] overflow-scroll text-white top-0 left-0 right-0 top-0 flex flex-col'>
          <div className='flex m-auto flex-col'>
            {formatTarotReading}
            <button className='border-2 border-white p-2 m-2' onClick={() => handleNewReading()}>New Reading</button>
          </div>
        </div>
      }
      {
        fetching &&
        <div className='bg-black opacity-75 absolute w-[95%] m-auto h-[100%] overflow-scroll text-white top-0 left-0 right-0 bottom-0 flex flex-col'>
          <div className='w-[220px] text-left absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
            {fetchingMessage}
          </div>
        </div>
      } */}
      <DrawDeck deck={deck} setDeck={setDeck} />
    </div>
  );

};

export default App;
