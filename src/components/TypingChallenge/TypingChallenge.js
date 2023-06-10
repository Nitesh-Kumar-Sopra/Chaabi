import React, { useEffect, useRef, useState } from 'react';
import correctAudio from '../../type.mp3';
import errorAudio from '../../wrong.mp3';
import './TypingChallenge.css';

export const TypingChallenge = ({
  handleKeyPress,
  timeRemaining,
  timerStarted,
  selectedParagraph
}) => {
  const correctAudioElement = useRef(null);
  const errorAudioElement = useRef(null);
  const [currentTypedText, setCurrentTypedText] = useState('');

  useEffect(() => {
    correctAudioElement.current = new Audio(correctAudio);
    errorAudioElement.current = new Audio(errorAudio);
  }, []);

  const playCorrectAudio = () => {
    correctAudioElement.current.currentTime = 0;
    correctAudioElement.current.play();
  };

  const playErrorAudio = () => {
    errorAudioElement.current.currentTime = 0;
    errorAudioElement.current.play();
  };

  const handleInput = (event) => {
    const typedValue = event.target.value;
    setCurrentTypedText(typedValue);

    if (!timerStarted) {
      // Start the timer
    }

    const lastTypedChar = typedValue.slice(-1);
    const lastExpectedChar = selectedParagraph[typedValue.length - 1];

    if (lastTypedChar === lastExpectedChar) {
      playCorrectAudio();
    } else {
      playErrorAudio();
    }

    // Pass the typed value to the parent component
    handleKeyPress(typedValue);
  };

  const renderSelectedParagraph = () => {
    return [...selectedParagraph].map((char, index) => {
      if (index < currentTypedText.length) {
        if (char === currentTypedText[index]) {
          return <span className="correct">{char}</span>;
        } else {
          return <span className="incorrect">{char}</span>;
        }
      } else {
        return <span>{char}</span>;
      }
    });
  };

  return (
    <div className="typing-challenge">
      <div className="timer-container">
        <p className="timer">00:{timeRemaining >= 10 ? timeRemaining : `0${timeRemaining}`}</p>
        <p className="timer-info">{!timerStarted && 'Start typing to start the test'}</p>
      </div>

      <div className="textarea-container">
        <div className="textarea-left">
          <div className="selected-paragraph">{renderSelectedParagraph()}</div>
        </div>
        <div className="textarea-right">
          <textarea
            onChange={handleInput}
            className="textarea"
            placeholder="Start typing here"
            value={currentTypedText}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
