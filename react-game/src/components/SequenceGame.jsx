import React, { useEffect, useState, useRef } from 'react';
import "../assets/styles.css"
import Square from './Square'

const colors = ["red", "orange", "yellow", "green", "lightblue", "blue", "purple", "pink", "gray"];

function SimonGame() {

    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIdx, setPlayingIdx] = useState(0);
    const [result, setResult] = useState("");
    const [resultText, setResultText] = useState('Для начала игры нажмите кнопку "Старт"');
    const [message, setMessage] = useState('');

    const redRef = useRef(null)
    const orangeRef = useRef(null)
    const yellowRef = useRef(null)
    const greenRef = useRef(null)
    const lightblueRef = useRef(null)
    const blueRef = useRef(null)
    const purpleRef = useRef(null)
    const pinkRef = useRef(null)
    const grayRef = useRef(null)

    const resetGame = () => {
        setSequence([]);
        setPlaying(false);
        setPlayingIdx(0);
    }

    const handleColorClick = (e) => {
        if (playing)
        {
            e.target.style.opacity = 0.5;
            setTimeout(() => {
            e.target.style.opacity = 1;
                const clickColor = e.target.getAttribute("color");

            if (sequence[playingIdx] === clickColor) {
                if(playingIdx === sequence.length - 1)
                {
                    setTimeout(() => {
                        setPlayingIdx(0);
                        addNewColor();
                    }, 250)
                }

                else {
                    setPlayingIdx(playingIdx + 1);
                }
            }

            else {
                setResult("Ваш результат: " + sequence.length);
                if (sequence.length < 4)
                {
                    setMessage("В следующий раз повезет больше! :)");
                }
                else if (sequence.length < 10)
                {
                    setMessage("Молодец! Отличный результат! :)");
                }
                else 
                {
                    setMessage("Вау!!! Превосходный результат! :О")
                }
                setResultText("Конец игры! Нажмите старт, чтобы начать заново.");
                resetGame()
            }
            }, 250)
        }
    }

    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 9 )];
        const newSequence = [...sequence, color];
        setSequence(newSequence);
    };

    const handleNextLevel = () => {
        if (!playing) {
            setResultText("Постарайтесь запомнить последовательность цветов и повторить ее");
            setResult("");
            setMessage("")
            setPlaying(true);
            addNewColor();
        }

    };

    useEffect(() => {
        if (sequence.length > 0) {
        const showSequence = (idx = 0) => {
            let ref = null;

            if (sequence[idx] === "red") ref = redRef;
            if (sequence[idx] === "orange") ref = orangeRef;
            if (sequence[idx] === "yellow") ref = yellowRef;
            if (sequence[idx] === "green") ref = greenRef;
            if (sequence[idx] === "lightblue") ref = lightblueRef;
            if (sequence[idx] === "blue") ref = blueRef;
            if (sequence[idx] === "purple") ref = purpleRef;
            if (sequence[idx] === "pink") ref = pinkRef;
            if (sequence[idx] === "gray") ref = grayRef;

            setTimeout(() => {
                ref.current.style.filter = "brightness(3)";

                setTimeout(() => {
                    ref.current.style.filter = "brightness(1)";
                    if (idx < sequence.length - 1) showSequence(idx + 1);
                }, 300
                );
            }, 300);
        };

    
    showSequence()
        }
    }, [sequence]);

    return (
     <>
        <div className='game'>   
       
            <div className = 'left-menu'>
                <button className = "start-button" onClick={handleNextLevel}>Старт</button>
                <div className='score'> Текущий счёт: {[sequence.length]}</div>
                <div className='result-text'>{resultText}</div>
                <div className ='result'>{result}</div>
                <div className='message'>{message}</div>
            </div>
        
               <div className='game-board'>
                    <div className='row'>
                        <Square color = "red" value = "red-square" onClick = {handleColorClick} ref = {redRef}/>
                        <Square color = "orange" value = "orange-square" onClick = {handleColorClick} ref = {orangeRef}/>
                        <Square color = "yellow" value = "yellow-square" onClick = {handleColorClick} ref = {yellowRef}/>
                    </div >
                    <div className='row'>
                        <Square color = "green" value = "green-square" onClick = {handleColorClick} ref = {greenRef}/>
                        <Square color = "lightblue" value = "light-blue-square" onClick = {handleColorClick} ref = {lightblueRef}/>
                        <Square color = "blue" value = "blue-square" onClick = {handleColorClick} ref = {blueRef}/>
                    </div>
                    <div className='row'>
                        <Square color = "purple" value = "purple-square" onClick = {handleColorClick} ref = {purpleRef}/>
                        <Square color = "pink" value = "pink-square" onClick = {handleColorClick} ref = {pinkRef}/>
                        <Square color = "gray" value = "gray-square" onClick = {handleColorClick} ref = {grayRef}/>
                    </div>
               </div>
            
        </div>
     </>
    )
}

export default SimonGame
   