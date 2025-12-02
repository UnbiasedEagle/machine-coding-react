import { useEffect, useRef, useState } from 'react';

export const Otp = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(() => Array(otpLength).fill(''));
  const ref = useRef([]);

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === 'ArrowLeft') {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    } else if (key === 'ArrowRight') {
      if (index < otpLength - 1) {
        ref.current[index + 1].focus();
      }
    }

    const otpFieldsCopy = [...otpFields];

    if (key === 'Backspace') {
      otpFieldsCopy[index] = '';
      setOtpFields(otpFieldsCopy);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }
    if (isNaN(key)) {
      return;
    }
    otpFieldsCopy[index] = key;
    setOtpFields(otpFieldsCopy);
    if (index < otpLength - 1) {
      ref.current[index + 1].focus();
    }
  };

  return (
    <div className='container'>
      {otpFields.map((field, index) => {
        return (
          <input
            ref={(currentInput) => (ref.current[index] = currentInput)}
            type='text'
            value={field}
            key={index}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};
