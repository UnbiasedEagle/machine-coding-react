import { useEffect, useRef, useState } from 'react';
import { InputTimer } from './InputTimer';
import { ShowTimer } from './ShowTimer';

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;

    if (hours < 0 || minutes < 0 || seconds < 0 || total === 0) {
      alert('Please enter a valid time');
      return;
    }

    setIsStart(true);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
  };

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    if (id === 'hours') {
      setHours(Number(value));
    } else if (id === 'minutes') {
      setMinutes(Number(value));
    } else if (id === 'seconds') {
      setSeconds(Number(value));
    }
  };

  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsPaused(false);
    clearInterval(timerRef.current);
  };

  const runTimer = (sec, min, hr) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0 && sec === 0 && hr > 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (hr === 0 && min === 0 && sec === 0) {
      handleReset();
      alert('Time is up!');
    }
  };

  useEffect(() => {
    if (isStart) {
      timerRef.current = setInterval(
        () => runTimer(seconds, minutes, hours),
        1000
      );
    }

    return () => clearInterval(timerRef.current);
  }, [isStart, hours, minutes, seconds, isPaused]);

  return (
    <div className='App'>
      <h1>Countdown Timer</h1>
      {!isStart && (
        <InputTimer handleStart={handleStart} handleInput={handleInput} />
      )}
      {isStart && (
        <ShowTimer
          isPaused={isPaused}
          handlePause={handlePause}
          handleResume={handleResume}
          handleReset={handleReset}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      )}
    </div>
  );
};

export default App;
