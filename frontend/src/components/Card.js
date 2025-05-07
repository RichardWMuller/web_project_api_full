import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card({
  link,
  name,
  likes,
  _id,
  onCardClick,
  isLiked,
  handleCardLike,
  isOwner,
  onCardDelete
}) {
  const cardLikeButtonClassName = `button elements__btn-hrt ${
    isLiked ? 'elements__btn-hrt_actived' : ''
  }`

  const cardTrashButton = `button elements__btn-trh ${
    isOwner ? 'elements__btn-trh-visible' : ''
  }`

  return (
    <li className="elements__list-img">
      <div
        className="elements__list-img-wrapper"
        onClick={() => onCardClick(_id)}
      >
        <img src={link} alt={name} className="elements__item" />
      </div>
      <button
        className={cardTrashButton}
        onClick={() => onCardDelete(_id)}
      ></button>
      <div className="elements__description">
        <p className="elements__title">{name}</p>
        <div className="elements__heart-container">
          <button
            className={cardLikeButtonClassName}
            onClick={() => handleCardLike(_id, isLiked)}
          ></button>
          <span className="elements__btn-hrt-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  )
}
