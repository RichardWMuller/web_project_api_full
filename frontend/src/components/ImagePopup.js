import closeBtn from '../images/close_icon.svg'
const ImagePopup = ({ srcImage, footerLabel, isOpen, onClose }) => {
  return (
    <div className={`popup popupImg ${isOpen && 'popupImg-opened'}`}>
      <div className="popupImg-container">
        <button type="button" className="popup__close-btn" onClick={onClose}>
          <img
            className="popupImg-close-btn-icon"
            src={closeBtn}
            alt="botão de fechar janela"
          />
        </button>
        <img className="popupImg-modal" src={srcImage} alt={footerLabel} />
        <p className="popupImg-footer">{footerLabel}</p>
      </div>
    </div>
  )
}

export default ImagePopup
