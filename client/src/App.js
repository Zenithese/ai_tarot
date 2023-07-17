import React, { useState, useEffect } from 'react';
import './App.css';
import { tarotDeck, tarotNames } from './tarotDeck';
import Spread from './components/Spread';
import { DrawDeck } from './components/DrawDeck';
import useWindowSize from './hooks/useWindowResize'

const App = () => {

  const windowSize = useWindowSize();

  const [drawnCards, setDrawnCards] = useState([]);
  const [deck, setDeck] = useState(tarotDeck);
  const [question, setQuestion] = useState('')
  const [tarotReading, setTarotReading] = useState('')
  const [theme, setTheme] = useState('')
  const [selectedSpread, setSelectedSpread] = useState('1 card')
  const [fetching, setFetching] = useState(false)
  const [fetchingMessage, setFetchingMessage] = useState('Blessings to those who wait')
  const [quantumFetching, setQuantumFetching] = useState(false)
  const [quantumFetchingMessage, setQuantumFetchingMessage] = useState('Connecting to quantum server for a quantum shuffle')
  const [quantumFetchingError, setQuantumFetchingError] = useState(false)
  const [quantumFetchingErrorMessage, setQuantumFetchingErrorMessage] = useState('Quantum computer unavailable. Using psudorandom shuffle')
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    (async () => {
      await fetch(
        // "http://127.0.0.1:8000/deck/startserver",
        "https://quantum-server-m3ow.onrender.com/deck/startserver",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

      // await fetch(
      //   "http://localhost:3001",
      //   // "https://ai-tarot.onrender.com",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
    })()
  }, [])

  useEffect(() => {
    if (drawnCards.length >= Number(selectedSpread.split('')[0])) {
      setDrawing(false)
    }
  }, [drawnCards, selectedSpread])

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

  useEffect(() => {
    setTimeout(() => {
      if (quantumFetching) {
        if (!quantumFetchingMessage.includes('.')) setQuantumFetchingMessage('Connecting to quantum server for a quantum shuffle.')
        else if (quantumFetchingMessage.includes('.') && !quantumFetchingMessage.includes('..')) setQuantumFetchingMessage('Connecting to quantum server for a quantum shuffle..')
        else if (quantumFetchingMessage.includes('..') && !quantumFetchingMessage.includes('...')) setQuantumFetchingMessage('Connecting to quantum server for a quantum shuffle...')
        else setQuantumFetchingMessage('Connecting to quantum server for a quantum shuffle')
      }
    }, 1000)
  }, [quantumFetching, quantumFetchingMessage])

  useEffect(() => {
    setTimeout(() => {
      if (quantumFetchingError) {
        if (!quantumFetchingErrorMessage.includes('.')) setQuantumFetchingErrorMessage('Quantum computer unavailable. Using psudorandom shuffle.')
        else if (quantumFetchingErrorMessage.includes('.') && !quantumFetchingErrorMessage.includes('..')) setQuantumFetchingErrorMessage('Quantum computer unavailable. Using psudorandom shuffle..')
        else if (quantumFetchingErrorMessage.includes('..') && !quantumFetchingErrorMessage.includes('...')) setQuantumFetchingErrorMessage('Quantum computer unavailable. Using psudorandom shuffle...')
        else setQuantumFetchingErrorMessage('Quantum computer unavailable. Using psudorandom shuffle')
      }
    }, 1000)
  }, [quantumFetchingError, quantumFetchingErrorMessage])

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

  const drawCards = () => {
    setDrawing(true)
    shuffle()
  }

  const shuffle = async () => {
    setQuantumFetching(true)
    try {
      const response = await fetch(
        // "http://127.0.0.1:8000/deck/shuffle",
        "https://quantum-server-m3ow.onrender.com/deck/shuffle",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      const jsonData = await response.json()
      const shuffledDeck = jsonData.deck.map(([num, reversed]) => { return { ...tarotDeck[num], reversed } })
      setDeck(shuffledDeck);
      setQuantumFetching(false);
    } catch (error) {
      console.log('error: ', error)
      setQuantumFetching(false);
      setQuantumFetchingError(true);
      const newDeck = [...deck];
      const shuffledDeck = []
      while (newDeck.length) {
        const randomIndex = Math.floor(Math.random() * newDeck.length);
        const card = newDeck[randomIndex];
        const reversed = Math.random() < 0.5; // Determine whether the card is reversed
        const newCard = {
          ...card,
          reversed: reversed
        };
        newDeck.splice(randomIndex, 1); // Remove the drawn card from the deck
        shuffledDeck.push(newCard);
      }
      setDeck(shuffledDeck);
      setTimeout(() => {
        setQuantumFetchingError(false)
      }, 1000)
    }
  }

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
      {
        drawing && !quantumFetching && !quantumFetchingError ? <DrawDeck
          deck={deck}
          setDeck={setDeck}
          setDrawnCards={setDrawnCards}
          setQuantumFetching={setQuantumFetching}
          setQuantumFetchingError={setQuantumFetchingError}
          setQuantumFetchingErrorMessage={setQuantumFetchingErrorMessage}
        /> :
          <>
            <div className={`App ${tarotReading.length || fetching ? 'overflow-hidden h-0' : ''}`}>
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
              <div className='w-fit m-auto mb-0'>
                <button className='border-2 border-black p-2 m-2 disabled:opacity-50' onClick={drawCards} disabled={drawnCards.length >= Number(selectedSpread.split('')[0])}>Draw cards</button>
                <button className='border-2 border-black p-2 m-2 disabled:opacity-50' onClick={drawCard} disabled={drawnCards.length >= Number(selectedSpread.split('')[0])}>Draw a card</button>
                <button className='border-2 border-black p-2 m-2' onClick={clearDrawnCards}>Clear cards</button>
              </div>
              <br />
              <div className='w-[100%] bg-white mt-2 mb-[10px] flex'>
                <textarea placeholder='You may give the deck an intention.' className='flex m-auto mb-0 w-full [@media(min-width:342.64px)]:w-[342.64px] p-2 resize-none focus:outline-none' onChange={(e) => setQuestion(e.target.value)} />
              </div>
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
            }
            {
              quantumFetching &&
              <div className='bg-black opacity-75 absolute w-[95%] m-auto h-[100%] overflow-scroll text-white top-0 left-0 right-0 bottom-0 flex flex-col'>
                {
                  windowSize.width > 640 ? (
                    <div className='tablet:w-[420px] text-left absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                      {quantumFetchingMessage}
                    </div>
                  ) : (
                    <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                      <div className='w-[221px] text-left'>
                        {quantumFetchingMessage.split(' ').slice(0, 4).join(' ')}
                      </div>

                      <div className='w-[169px] mt-2 text-left relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        {quantumFetchingMessage.split(' ').slice(4).join(' ')}
                      </div>
                    </div>
                  )
                }
              </div>
            }
            {
              quantumFetchingError &&
              <div className='bg-black opacity-75 absolute w-[95%] m-auto h-[100%] overflow-scroll text-white top-0 left-0 right-0 bottom-0 flex flex-col'>
                {
                  windowSize.width > 640 ? (
                    <div className='tablet:w-[420px] text-left absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                      {quantumFetchingErrorMessage}
                    </div>
                  ) : (
                    <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                      <div className='w-[231px] text-left'>
                        {quantumFetchingErrorMessage.split(' ').slice(0, 3).join(' ')}
                      </div>

                      <div className='w-[201px] mt-2 text-left relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        {quantumFetchingErrorMessage.split(' ').slice(3).join(' ')}
                      </div>
                    </div>
                  )
                }
              </div>
            }
          </>
      }
    </div>
  );

};

export default App;
