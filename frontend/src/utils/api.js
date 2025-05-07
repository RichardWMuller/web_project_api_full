export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _verifyResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Erro: ${res.status}`)
  }

  async getUser() {
    return await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao buscar informações do usuário:', err)
      })
  }

  async getInitialCards() {
    return await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao buscar os cards iniciais:', err)
      })
  }

  async createCard(card) {
    return await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(card)
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao criar o card:', err)
      })
  }

  async deleteCard(cardId) {
    return await fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao deletar o card:', err)
      })
  }

  async updateUser(userName, userAbout) {
    return await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao buscar informações do usuário:', err)
      })
  }

  async updateAvatar(avatar) {
    return await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao atualizar o avatar do usuário:', err)
      })
  }

  async addLike(cardId) {
    return await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao dar likes:', err)
      })
  }

  async removeLike(cardId) {
    return await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._verifyResponse)
      .catch(err => {
        console.error('Erro ao remover likes:', err)
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
