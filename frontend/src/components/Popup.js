import closeBtn from '../images/close_icon.svg'

export default function Popup({
  name,
  title,
  buttonLabel = 'Salvar',
  children,
  isOpen,
  onClosePopup,
  onSubmit,
  readOnly = false
}) {
  return (
    <div className={`popup ${isOpen ? 'popup__opened' : ''}`}>
      <form
        className="popup__form"
        name={name}
        onSubmit={event => onSubmit(event, name)}
        noValidate
      >
        <button
          type="button"
          className="popup__close-btn"
          onClick={onClosePopup}
        >
          <img
            className="popup__close-btn-icon"
            src={closeBtn}
            alt="botão de fechar janela"
          />
        </button>
        {!readOnly && <h2 className="popup__title">{title}</h2>}
        {children}
        {!readOnly && (
          <button
            type="submit"
            className="popup__save-btn popup__button-disabled"
          >
            {buttonLabel}
          </button>
        )}
      </form>
    </div>
  )
}
