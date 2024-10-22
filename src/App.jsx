import React from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

export default function App() {
  const [start, setStart] = React.useState(true)  
  
  /* Flip start state once Start is clicked */
  function startQuiz() {
    setStart(prevStart => !prevStart)
  }

  /* Flip state to restart quiz */
  function resetGame() {
    setStart(true)
  }
  
  /* Conditionally render Quiz or Start page based on start state */
  if (start) {
    return(
      <Start
        startQuiz={() => startQuiz()}
      />
    )
  } else {
    return(
      <Quiz
        resetGame={() => resetGame()}
      />
    )
  }  
}