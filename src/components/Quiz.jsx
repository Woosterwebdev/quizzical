import React from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'he'

export default function Quiz(props) {
    const [quiz, setQuiz] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [complete, setComplete] = React.useState(false)
    const url = 'https://opentdb.com/api.php?amount=5&category=11&type=multiple'

    React.useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
          const quizData = data.results.map(question => {
            return{
                id: nanoid(),
                question: decode(question.question),
                correctAnswer: decode(question.correct_answer),
                incorrect_answers: [...question.incorrect_answers.map(decode)],
                allAnswers: shuffleArray([
                    ...question.incorrect_answers.map(decode),
                    decode(question.correct_answer),
                ]),
                selectedAnswer: ''
            }
          })
          setQuiz(quizData)
        })
    }, [])

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function handleChange(event){
        setQuiz(prevQuiz => prevQuiz.map(question => {
          return question.id === event.target.name ? 
            {...question, selectedAnswer: event.target.value} : 
            question     
        }))
    }

    function checkAnswers(e) {
        e.preventDefault()
        quiz.map(question => {
            question.allAnswers.map(answer => {
                if (answer !== question.correctAnswer) {
                    {document.getElementById(`${answer}`).classList.add('opacity')}
                }
            })
            if (question.correctAnswer === question.selectedAnswer) {
                {document.getElementById(`${question.selectedAnswer}`).classList.add('correct')}
                setScore(prevScore => prevScore + 1)
            } else {
                {document.getElementById(`${question.selectedAnswer}`).classList.add('incorrect')}
                {document.getElementById(`${question.correctAnswer}`).classList.add('correct')}
            }
        })
        setComplete(true)
    }

    const questionElements = quiz.map(object => {
        let sortAnswers = object.allAnswers.sort()
        let answers = sortAnswers.map((answer, index) => {
            return(
                <div className='answer' key={answer + index}>
                    <input 
                        type='radio' 
                        name={object.id} 
                        id={answer} 
                        value={answer} 
                        onChange={handleChange}
                        ></input>
                    <label htmlFor={answer}>{answer}</label>
                </div>
            )
        })
        
        return(
            <div className='question-container' key={object.id}>
                <legend>{object.question}</legend>
                <div className='answer-container'>
                    {answers}
                </div>
            </div>
        )
    })
    
    return(
        <form className='quiz-container'>
            {questionElements}
            <button className='btn' onClick={complete ? props.resetGame : checkAnswers}>{complete ? "Play again" : "Check Answers"}</button>
            {complete ? <p className='score'>You scored {score}/5 correct answers</p> : <p></p>}
        </form>
    )
}