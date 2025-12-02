import { useState } from 'react';

export const FAQItem = ({ faq, index }) => {
  const [isShow, setIsShow] = useState(() => index === 0);

  const handleClick = () => {
    setIsShow((isShow) => !isShow);
  };

  return (
    <div className='faq-box'>
      <div className='que' onClick={handleClick}>
        <button className={isShow ? 'arrow' : ''}>&gt;</button>
        <div>{faq.question}</div>
      </div>
      {isShow && <div className='ans'>{faq.answer}</div>}
    </div>
  );
};
