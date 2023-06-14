import React, { useState } from 'react';
import './App.css';
import { tarotDeck, images } from './tarotDeck';

const App = () => {
  const [drawnCards, setDrawnCards] = useState([]);
  const [deck, setDeck] = useState(tarotDeck);
  const [question, setQuestion] = useState('')

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

    return {theme, arrangement}
  };

  const AIReading = async () => {
    const {theme, arrangement} = reading()
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        // "messages": [
        //     { "role": "system", "content": `Give a tarot reading.` },
        //     { "role": "user", "content": `Please randomly select 3 tarot cards and interpret them considering this question: ${question.length ? question : 'can you give me a general reading'}?.` }
        // ]
        "messages": [
          { "role": "system", "content": `Give a tarot reading.` },
          { "role": "user", "content": `Using this array of tarot cards ${arrangement} and the following theme: ${theme}, interpret them considering this question: ${question.length ? question : 'can you give me a general reading'}?.` }
      ]
        // "messages": [
        //     { "role": "system", "content": `Suggest a beer.` },
        //     { "role": "user", "content": `Please recommend some beers and their respective flavor profiles based on the following description/profile/question: ${question.length ? question : 'can you suggest a popular craft beer and what its flavor profile is'}?.` }
        // ]
      }), // body data type must match "Content-Type" header
    });
    const jsonData = await response.json();
    console.log(jsonData)
    alert(jsonData.choices[0].message.content)
  }

  return (
    <div className="App">
      <h1>Tarot Card Reader</h1>
      <button onClick={drawCard}>Draw a card</button>
      <button onClick={clearDrawnCards}>Clear cards</button>
      <h1>Ask the cards a question</h1>
      <input onChange={(e) => setQuestion(e.target.value)}></input>
      {drawnCards.length > 0 && (
        <div>
          {drawnCards.map((card, index) => (
            // <img key={index} src={'/Users/justin/Documents/Tarot/v2/tarot-reading-app-2/public/images/1909_PAM_A/the_fool.jpg'} alt={card.name} className={card.reversed ? 'reversed' : ''} />
            <img key={index} src={images[card.name.split(' ').map((string) => string.charAt(0).toUpperCase() + string.slice(1)).join('')]} alt={card.name} className={card.reversed ? 'reversed' : ''} />
          ))}
        </div>
      )}
      {drawnCards.length > 1 && <button onClick={AIReading}>Get Reading</button>}
    </div>
  );
};

export default App;
