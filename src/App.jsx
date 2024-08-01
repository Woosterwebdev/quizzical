import React from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

export default function App() {
  const [start, setStart] = React.useState(true)  
  
  function startQuiz() {
    setStart(prevStart => !prevStart)
  }

  function resetGame() {
    setStart(true)
  }
        
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