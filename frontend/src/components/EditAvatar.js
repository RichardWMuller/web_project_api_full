const EditAvatar = ({ onUpdateAvatar, ref, avatar }) => {
  return (
    <div className="popup__change-avatar-control">
      <input
        id="link"
        className="popup__change-avatar-input-box popup__change-avatar-input-box-link"
        type="url"
        name="link"
        placeholder="Insira a url da imagem..."
        minLength={15}
        required
        ref={ref}
        onChange={onUpdateAvatar}
        value={avatar}
      />
    </div>
  )
}

export default EditAvatar
