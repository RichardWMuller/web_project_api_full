import profileBtn from '../images/Vector_btn.png'
import addBtn from '../images/Vector_plus.png'
import { useState, useEffect } from 'react'
import Popup from './Popup'
import EditProfile from './EditProfile'
import NewCard from './NewCard'
import EditAvatar from './EditAvatar'
import { api } from '../utils/api'
import Card from './Card'
import ImagePopup from './ImagePopup'
import { useRef } from 'react'
import { checkToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Main() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [imagePopupOpen, setImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState('')
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [avatar, setAvatar] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [cardLink, setCardLink] = useState('')
  const [cardTitle, setCardTitle] = useState('')
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      validateTokenAuth(token)
    }

    getUser()
  }, [])

  useEffect(() => {
    getInitialCards()
  }, [])

  const avatarFormRef = useRef(null)

  async function validateTokenAuth(token) {
    const tokenResponse = await checkToken(token)
  }

  async function getUser() {
    const user = await api.getUser()
    setCurrentUser(user)
    setName(user.name)
    setJob(user.about)
  }

  async function getInitialCards() {
    const cards = await api.getInitialCards()
    setCards(cards)
  }

  const handleProfileClick = function () {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = function () {
    setIsAddPlacePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleNameChange = event => {
    setName(event.target.value)
  }
  const handleJobChange = event => {
    setJob(event.target.value)
  }

  const handleAvatarChange = link => {
    setAvatar(link.target.value)
  }

  const handleTitleChange = event => {
    setCardTitle(event.target.value)
  }

  const handleChangeCardLink = event => {
    setCardLink(event.target.value)
  }

  const handleFormSubmit = (event, formName) => {
    event.preventDefault()
    if (formName === 'editProfile') {
      handleUpdateProfile(name, job)
    }

    if (formName === 'changeAvatar') {
      handleUpdateAvatar(avatar)
    }

    if (formName === 'addPlace') {
      handleCreateNewCard(cardTitle, cardLink)
    }
  }

  async function handleUpdateProfile(userName, userJob) {
    await api.updateUser(userName, userJob)
    getUser()
    closeAllPopups()
  }

  async function handleUpdateAvatar(avatarFormRef) {
    await api.updateAvatar(avatarFormRef)
    getUser()
    closeAllPopups()
  }

  async function handleCreateNewCard(title, cardLink) {
    const newCard = { name: title, link: cardLink }
    await api.createCard(newCard)
    getInitialCards()
    closeAllPopups()
  }

  function verifyCardLikes(likes) {
    const isMyOwnLike = likes.some(like => like._id === currentUser._id)
    return isMyOwnLike
  }

  function verifyCardOwner(ownerId) {
    const isMyOwnCard = ownerId === currentUser._id
    return isMyOwnCard
  }

  async function handleCardLike(cardId, isLiked) {
    isLiked ? handleRemoveLike(cardId) : handleAddLike(cardId)
  }

  async function handleAddLike(cardId) {
    await api.addLike(cardId)
    getInitialCards()
  }

  async function handleRemoveLike(cardId) {
    await api.removeLike(cardId)
    getInitialCards()
  }

  async function handleCardDelete(cardId) {
    await api.deleteCard(cardId)
    getInitialCards()
  }

  const handleCardClick = selectedCardId => {
    const selectedCardById = cards.find(card => card._id === selectedCardId)
    setSelectedCard(selectedCardById)

    setImagePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
  }

  return (
    // <CurrentUserProvider>
    <main className="main container">
      <section className="profile">
        {isEditProfilePopupOpen && (
          <Popup
            name="editProfile"
            title="Editar Perfil"
            isOpen={isEditProfilePopupOpen}
            onClosePopup={closeAllPopups}
            onSubmit={handleFormSubmit}
          >
            <EditProfile
              name={name}
              job={job}
              onNameChange={handleNameChange}
              onJobChange={handleJobChange}
            />
          </Popup>
        )}

        {isAddPlacePopupOpen && (
          <Popup
            name="addPlace"
            title="Novo local"
            isOpen={isAddPlacePopupOpen}
            onClosePopup={closeAllPopups}
            buttonLabel="Criar"
            onSubmit={handleFormSubmit}
          >
            <NewCard
              title={cardTitle}
              link={cardLink}
              onUpdateTitle={handleTitleChange}
              onUpdateCardLink={handleChangeCardLink}
            />
          </Popup>
        )}

        {isEditAvatarPopupOpen && (
          <Popup
            name="changeAvatar"
            title="Alterar a foto do perfil"
            isOpen={isEditAvatarPopupOpen}
            onClosePopup={closeAllPopups}
            onSubmit={handleFormSubmit}
          >
            <EditAvatar
              onUpdateAvatar={handleAvatarChange}
              ref={avatarFormRef}
              avatar={avatar}
            />
          </Popup>
        )}

        {imagePopupOpen && (
          <ImagePopup
            srcImage={selectedCard.link}
            footerLabel={selectedCard.name}
            isOpen={imagePopupOpen}
            onClose={closeAllPopups}
          />
        )}

        <div className="profile__content">
          <button
            className="button profile__button-avatar"
            onClick={handleEditAvatarClick}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Foto de Perfil"
            />
          </button>
          <div className="profile__info">
            <div className="profile__title-btn">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="button profile__btn-title"
                onClick={handleProfileClick}
              >
                <img src={profileBtn} alt="Botão de editar perfil" />
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="button profile__btn-add"
            onClick={handleAddPlaceClick}
          >
            <img src={addBtn} alt="Botão de adicionar" />
          </button>
        </div>
      </section>
      <section className="elements">
        <ul className="elements__list" id="elements__list">
          {cards.map(card => {
            const { link, name, likes, _id, owner } = card
            const isLiked = verifyCardLikes(likes)
            const isOwner = verifyCardOwner(owner._id)
            return (
              <Card
                key={card._id}
                link={link}
                name={name}
                likes={likes}
                _id={_id}
                onCardClick={handleCardClick}
                isLiked={isLiked}
                handleCardLike={handleCardLike}
                isOwner={isOwner}
                onCardDelete={handleCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
    // </CurrentUserProvider>
  )
}
