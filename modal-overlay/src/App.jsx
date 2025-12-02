import { useState } from 'react';
import { Modal } from './Modal';

const App = () => {
  const [isShow, setIsShow] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  const handleClose = () => {
    setIsShow(false);
  };

  const handleOfferAccept = () => {
    setIsOfferAccepted(true);
    handleClose();
  };

  return (
    <div>
      <div className='show-offer'>
        {!isOfferAccepted && (
          <button onClick={() => setIsShow(true)} className='offer-btn'>
            Show Offer
          </button>
        )}
        {isOfferAccepted && (
          <div
            style={{
              fontSize: '50px',
            }}
          >
            Offer Accepted
          </div>
        )}
      </div>
      {isShow && (
        <Modal
          handleClose={handleClose}
          handleOfferAccept={handleOfferAccept}
        />
      )}
    </div>
  );
};

export default App;
