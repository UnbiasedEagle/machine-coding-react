import { useRef, useState } from 'react';

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const timerRefs = useRef({});

  const handleClose = (id) => {
    clearTimeout(timerRefs.current[id]);
    delete timerRefs.current[id];
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleAdd = (message, type) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    timerRefs.current[id] = setTimeout(() => handleClose(id), 5000);
  };

  return (
    <div className='container'>
      <div className='toast-container'>
        {toasts.map(({ id, message, type }) => (
          <div key={id} className={`toast ${type}`}>
            {message} <span onClick={() => handleClose(id)}>X</span>
          </div>
        ))}
      </div>
      <div className='btn-container'>
        <button onClick={() => handleAdd('Success Toast', 'success')}>
          Success Toast
        </button>
        <button onClick={() => handleAdd('Error Toast', 'error')}>
          Error Toast
        </button>
        <button onClick={() => handleAdd('Warning Toast', 'warning')}>
          Warning Toast
        </button>
        <button onClick={() => handleAdd('Info Toast', 'info')}>
          Info Toast
        </button>
      </div>
    </div>
  );
};
