import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(0);
  const [redoList, setRedoList] = useState([]);
  const [history, setHistory] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  const maintainHistory = (key, prev, curr) => {
    const action = {
      key,
      prev,
      curr,
    };
    setHistory((prev) => [action, ...prev]);
  };

  const handleClick = (key) => {
    const val = parseInt(key);
    maintainHistory(key, value, val + value);
    setValue((prev) => prev + val);
  };

  const handleUndo = () => {
    if (history.length) {
      if (undoCount + 1 > 5) {
        alert('Undo limit reached');
        return;
      }
      const historyCopy = [...history];
      const latestAction = historyCopy.shift();
      setHistory(historyCopy);
      setUndoCount((prev) => prev + 1);
      setValue(latestAction.prev);
      setRedoList((prev) => [...prev, latestAction]);
    }
  };

  const handleRedo = () => {
    if (redoList.length) {
      const copyRedo = [...redoList];
      const lastAction = copyRedo.pop();
      setRedoList(copyRedo);
      setValue(lastAction.curr);
      setUndoCount((prev) => prev - 1);
      maintainHistory(lastAction.key, lastAction.prev, lastAction.curr);
    }
  };

  return (
    <div className='App'>
      <h1>Undoable Counter</h1>
      <div className='action-btn'>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo} disabled={undoCount === 0}>
          Redo
        </button>
      </div>
      <div className='user-actions'>
        {[-100, -10, -1].map((btn) => {
          return <button onClick={() => handleClick(btn)}>{btn}</button>;
        })}
        <div
          style={{
            fontSize: '40px',
          }}
        >
          {value}
        </div>
        {['+1', '+10', '+100'].map((btn) => {
          return <button onClick={() => handleClick(btn)}>{btn}</button>;
        })}
      </div>
      <div className='history'>
        {history.map((item) => {
          return (
            <div className='row'>
              <div>{item.key}</div>
              <div>{`[ ${item.prev} -> ${item.curr} ]`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
