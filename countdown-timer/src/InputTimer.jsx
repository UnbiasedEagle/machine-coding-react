export const InputTimer = ({ handleStart, handleInput }) => {
  return (
    <div className='input-container'>
      <div className='input-box'>
        <input onChange={handleInput} type='text' id='hours' placeholder='HH' />
        <input
          onChange={handleInput}
          type='text'
          id='minutes'
          placeholder='MM'
        />
        <input
          onChange={handleInput}
          type='text'
          id='seconds'
          placeholder='SS'
        />
      </div>
      <button className='timer-button' onClick={handleStart}>
        Start
      </button>
    </div>
  );
};
