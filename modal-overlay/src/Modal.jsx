export const Modal = ({ handleClose, handleOfferAccept }) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal')) {
      handleClose();
    }
  };

  return (
    <div onClick={handleClickOutside} className='modal'>
      <div className='modal-content'>
        <button className='close-btn' onClick={handleClose}>
          X
        </button>
        <div className='content'>
          click the button below to accept our amazing offer!
        </div>
        <button className='accept-btn' onClick={handleOfferAccept}>
          Accept Offer
        </button>
      </div>
    </div>
  );
};
