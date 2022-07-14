import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dice from './components/Dice'
import Score from './components/Score'

function App() {

  let deck = {
    width: "18rem",
    padding: "2rem"
  }

  let diceSet = []
  let iniDiceSet = [0,0,0,0,0]
  let iniCount = [0, 0, 0, 0, 0]

  const [diceDisplay, setDiceDisplay] = useState(iniDiceSet)
  const [diceCount, setDiceCount] = useState(iniCount)
  const [sumCount, setSumCount] = useState(0)
  const [selectedSet, setSelectedSet] = useState([])
  const [content, setContent] = useState('')
  const [players, setPlayers] = useState([{ player: 1, score: [] }, { player: 2, score: [] }])
  const [throwCount, setThrowCount] = useState(0)
  const [gameName,setGameName]=useState("")
  let totalList = ["Joueurs", "As", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sous-total", "Prime", "TOTAL I", "Maximum", "Minimum", "TOTAL II", "Brelan", "Carré", "Full", "Petite suite", "Grande Suite", "Yahtzee", "Chance", "TOTAL III", "TOTAL I+II+III"];


  async function getData() {
    var rawResponse = await fetch('/get-grid')
    var response = await rawResponse.json()
    setPlayers(response.grid)
    setGameName(response.gameName)
  }

  async function updateData() {
        var rawResponse = await fetch('/update-grid', {
          method: 'POST',
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(players)
        })
        var response = await rawResponse.json()
        console.log(response)
      }

  async function updateName() {
        var rawResponse = await fetch('/name-game', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `gameName=${gameName}`
        })
        var response = await rawResponse.json()
        console.log(response)
      }


  var handleSubmitName=()=>{
  updateName();
  }
  
  var getGrid = () => {
    getData();
  }

  var calcSum = (arr) => {
    let sum = 0;
    arr.forEach(x => {
      sum += x
    })
    return sum;
  }

  function clickDice(diceIndex) {
    if (throwCount > 0 && throwCount < 3){
      setSelectedSet([...selectedSet, diceIndex])
    }
    // VERSION ANCIENNE FONCTION : AU CLIC RANDOM NUMBER
    // let diceValue = Math.floor(Math.random() * 6) + 1;
    // let newSet = []
    // let newCount = []
    // for (let i = 0; i < 5; i++) {
    //   if (i === diceIndex) {
    //     newSet.push(diceValue)
    //     newCount.push(diceCount[i] + 1)
    //   } else {
    //     newSet.push(diceDisplay[i])
    //     newCount.push(diceCount[i])
    //   }
    // }
    // setDiceDisplay(newSet)
    // setDiceCount(newCount)
    // calcSum(newSet)
  }

  var throwAllDice = () => {
    if(throwCount < 3){
      let newDisplay = []
      let newCount = diceCount;
      diceDisplay.map((x, index) => {
        var result = selectedSet.find((element) => element === index)
        if (result !== undefined) {
          newDisplay.push(x)
          newCount[index] = newCount[index]
        } else {
          newDisplay.push(Math.floor(Math.random() * 6) + 1)
          newCount[index] = newCount[index] + 1
        }
        return newDisplay
      })
      if (newDisplay.filter(x => x === 6).length === 5) {
        setContent("Bravo")
      } else {
        setContent('')
      }
      setDiceCount(newCount)
      setDiceDisplay(newDisplay)
      setSumCount(calcSum(newDisplay))
      setSelectedSet([])
      setThrowCount(throwCount+1)
    }
    

    //Ancienne version : lancer en random de tous les des
    // let newRandom = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
    // let newCount = []
    // diceCount.forEach(x => newCount.push(x + 1))
    // setDiceCount(newCount)
    // setDiceDisplay(newRandom)
    // calcSum(newRandom);
  }

  var calcScore = (indexPlayer, caseName) => {
    let newScores = [...players]
    let indexCase = totalList.findIndex(elem => elem === caseName)
    if (indexCase === 10 || indexCase === 11) {
      newScores[indexPlayer].score[indexCase] = sumCount
      console.log(newScores[indexPlayer].score[10], newScores[indexPlayer].score[11])
      if (newScores[indexPlayer].score[10] !== undefined && newScores[indexPlayer].score[11] !== undefined) {
        newScores[indexPlayer].score[12] = newScores[indexPlayer].score[10] + newScores[indexPlayer].score[11]
      }
    } else {
      newScores[indexPlayer].score[indexCase] = 0
    }

    setPlayers(newScores)
    updateData();
    setThrowCount(0)
  }

  for (let i = 0; i < 5; i++) {
    let result = selectedSet.find((element) => element === i)
    var isSelected = false
    if (result !== undefined) {
      isSelected = true
    }
    diceSet.push(<Dice key={i} diceCount={diceCount[i]} diceNumber={diceDisplay[i]} isSelected={isSelected} index={i} clickDiceParent={clickDice} />)
  }

  let grid = []
  grid = totalList.map((label, index) => {
    return <Score name={label} players={players} index={index} diceDisplay={diceDisplay} diceSum={sumCount} calcScoreParent={calcScore} />
  })

  return (
    <div className="App">
      <div className="d-flex justify-content-center gap-4" style={{ opacity: 0.9 }}>
        <div className='border rounded bg-white p-2 m-3 d-flex flex-column align-items-center'>
          <div className='row'>
          <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon3">Nom de la partie</span>
              <input type="text" id="add-on" className="form-control opacity-75" placeholder="Nom de la partie"  onChange={(e) => setGameName(e.target.value)} value={gameName} aria-label="Nom de la partie" aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={() => handleSubmitName()}>Renommer</button>
              </div>
            </div>
          </div>
            
        {/* <h4 style={{height:"1.5em"}}>{gameName} </h4> */}
          {grid}
        </div>

        <div className='d-flex flex-column align-items-center'>
            <button  id="last-game" className='btn btn-secondary m-2 mb-4' onClick={() => getGrid()}>Recharger la dernière partie</button>
          
            

            <div className="d-flex">
              
                <div className='border px-4'>
                  <h4 className='text-white'> Lancers</h4>
                  <h4 className='text-white'>{throwCount}</h4>
                </div>
                <div className='px-4 border border-start-0'>
                  <h4 className='text-white'> Somme</h4>
                  <h4 className='text-white'>{sumCount}</h4>
                </div>
            </div>
            <button id="throw-btn" className='btn btn-secondary m-2 d-block' onClick={() => throwAllDice()}>Lancer les dés</button>

         

          <div className='d-flex justify-content-around flex-wrap border rounded bg-white' style={deck}>
            {diceSet}
          </div>

          <h4>{content}</h4>
        </div>
      </div>
    </div>
  )
}


export default App;
