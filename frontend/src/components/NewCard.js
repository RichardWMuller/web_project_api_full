const NewCard = ({ title, link, onUpdateTitle, onUpdateCardLink }) => {
  return (
    <div className="popupAdd__input-container">
      <div className="popupAdd__control popupAdd__size">
        <input
          id="title"
          className="popupAdd__input-box popupAdd__input-box-title"
          type="text"
          name="title"
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required=""
          value={title}
          onChange={onUpdateTitle}
        />
        <span className="popupAdd__error" />
      </div>
      <div className="popupAdd__control">
        <input
          id="link"
          className="popupAdd__input-box popupAdd__input-box-link"
          type="url"
          name="link"
          placeholder="Link da imagem"
          minLength={15}
          required=""
          value={link}
          onChange={onUpdateCardLink}
        />
        <span className="popupAdd__error" />
      </div>
    </div>
  )
}

export default NewCard
