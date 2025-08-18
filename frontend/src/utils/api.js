export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  async _makeRequest(endpoint, options = {}) {
    const config = {
      headers: this._headers,
      ...options
    }

    const res = await fetch(`${this._baseUrl}${endpoint}`, config)

    if (res.ok) {
      return res.json()
    }

    let errorMessage = `Erro: ${res.status}`
    try {
      const errorData = await res.json()
      if (errorData.message) errorMessage += ` - ${errorData.message}`
    } catch {
      // se não puder parsear json, ignora
    }

    return Promise.reject(errorMessage)
  }

  getUser() {
    return this._makeRequest('/users/me')
  }

  getInitialCards() {
    return this._makeRequest('/cards')
  }

  createCard(card) {
    return this._makeRequest('/cards', {
      method: 'POST',
      body: JSON.stringify(card)
    })
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, {
      method: 'DELETE'
    })
  }

  updateUser(userName, userAbout) {
    return this._makeRequest('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name: userName, about: userAbout })
    })
  }

  updateAvatar(avatar) {
    return this._makeRequest('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }

  addLike(cardId) {
    return this._makeRequest(`/cards/likes/${cardId}`, {
      method: 'PUT'
    })
  }

  removeLike(cardId) {
    return this._makeRequest(`/cards/likes/${cardId}`, {
      method: 'DELETE'
    })
  }
}

export const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/web_ptbr_09',
  headers: {
    authorization: 'e56efdde-cda5-421a-9ac8-6287a7acd788',
    'Content-Type': 'application/json'
  }
})
