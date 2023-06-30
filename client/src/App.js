import React, { useState } from 'react';
import './App.css';
import { tarotDeck, tarotNames } from './tarotDeck';
import Card from './components/Card';

const App = () => {
  const [drawnCards, setDrawnCards] = useState([]);
  const [deck, setDeck] = useState(tarotDeck);
  const [question, setQuestion] = useState('')
  const [tarotReading, setTarotReading] = useState('')
  const [theme, setTheme] = useState('')

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

    // Determine the overall theme of the reading based on the number of cards drawn
    let theme = '';
    if (drawnCards.length === 1) {
      theme = 'A message from the universe';
    } else if (drawnCards.length === 2) {
      theme = 'The situation and the challenge';
    } else if (drawnCards.length === 3) {
      theme = 'The past, present, and future';
    } else if (drawnCards.length === 4) {
      theme = 'The four elements and how they influence the situation';
    } else if (drawnCards.length === 5) {
      theme = 'The cross and the staff (a Celtic Cross reading)';
    }

    // // Combine the card meanings and the theme into a single reading
    // const fullReading = `Your ${theme}:\n\n${meanings.join('\n\n')}`;

    // // Display the reading to the user
    // alert(fullReading);

    setTheme(theme)
    return { theme, arrangement }
  };

  const AIReading = async () => {
    const { theme, arrangement } = reading()
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
      <h1>Tarot Card Reader</h1>
      <button className='border-2 border-black p-2 m-2 disabled:opacity-50' onClick={drawCard} disabled={drawnCards.length >= 5}>Draw a card</button>
      <button className='border-2 border-black p-2 m-2' onClick={clearDrawnCards}>Clear cards</button>
      <h1>Ask the cards a question</h1>
      <textarea className='m-2' onChange={(e) => setQuestion(e.target.value)} />
      {drawnCards.length > 0 && (
        <div className='flex flex-row flex-wrap justify-center my-5 deck'>
          {drawnCards.map((card) => (
            <Card card={card} />
          ))}
        </div>
      )}
      {drawnCards.length > 1 && <button className='border-2 border-black p-2 m-2' onClick={AIReading}>Get Reading</button>}
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
