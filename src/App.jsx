import { useState, useEffect,useCallback } from 'react'
import Card from './Card'
import './App.css'

function App() {

  const [fetchedCards,setFetchedCards] = useState([]);
  
  const [usedCards, setUsedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardData, setCardData] = useState([]); // data within the cards
  const [cards, setCards] = useState([]); // physical card elements

  useEffect( ()  => {
    const fetchData = async () => {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const res = await result.json();
      setFetchedCards(res.results);
    }
    fetchData();

  }, []);
   function genNewCards(){
    var tempCardData = [];
    for (let i = 0; i < 9; i++) { // create array of random fetchedCards
      var cardIndex = Math.floor(Math.random() * fetchedCards.length);
      if(fetchedCards[0]?.name != undefined)tempCardData.push([i, (fetchedCards[cardIndex]).name,(fetchedCards[cardIndex]).url]);
    };

    setCardData(tempCardData);
  }
  useEffect(()=>{
    genNewCards();
  },[fetchedCards])
  useEffect(() => {
    const newCards = cardData.map((myCard) => {`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        `
      return (
        <Card key={myCard[0]} id={myCard[0]} callBack={removeCard} name={myCard[1]} url={myCard[2]} />
      );
    });
    setCards(newCards)
  },[JSON.stringify(cardData)])

  const removeCard = useCallback((cardIndex) =>{

    var removedCard = cardData[cardIndex][1];
    if(usedCards.includes(removedCard)){
      setScore(0);
      setUsedCards([]);
    }else{
      setScore((score)=> score+1);
      if(score+1 > highScore)setHighScore((score)=> score + 1);
      setUsedCards((usedCards) => usedCards + removedCard);
    }
    
    genNewCards();
  });
  

  return (
    <>
      <p> Score: {score} High Score: {highScore} </p>
      <div className="cardBox">
        {cards}
      </div>
      </>
  )
}

export default App
