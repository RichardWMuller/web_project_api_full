// export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1'

// export const register = async ({ email, password }) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   }).then(res => {
//     if (!res.ok) {
//       return Promise.reject('400 - um dos campos foi preenchido incorretamente')
//     }
//     return res.json()
//   })
// }

// export const authorize = async ({ email, password }) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ email, password })
//   }).then(res => {
//     if (!res.ok) {
//       let errorMessage

//       switch (res.status) {
//         case 400:
//           errorMessage = '400 - um ou mais campos não foram fornecidos'
//           break
//         case 401:
//           errorMessage =
//             '401 - o usuario com e-mail especificado não foi encontrado'
//           break
//         default:
//           errorMessage = 'Erro'
//       }
//       return Promise.reject(errorMessage)
//     }
//     return res.json()
//   })
// }

// export const checkToken = async token => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     }
//   }).then(res => {
//     if (!res.ok) {
//       let errorMessage

//       switch (res.status) {
//         case 400:
//           errorMessage =
//             '400 — Token não fornecido ou fornecido em formato errado'
//           break
//         case 401:
//           errorMessage = '401 —  O token fornecido é inválido'
//           break
//         default:
//           errorMessage = 'Erro'
//       }

//       return Promise.reject(errorMessage)
//     }

//     return res.json()
//   })
// }

export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1'

export const register = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    const errorText = await res.text() // ou await res.json() se API retornar JSON
    return Promise.reject(
      `Erro ${res.status}: ${errorText || 'Requisição inválida'}`
    )
  }

  return res.json() // retorna só os dados do corpo (JSON)
}

export const authorize = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    let errorMessage

    switch (res.status) {
      case 400:
        errorMessage = '400 - um ou mais campos não foram fornecidos'
        break
      case 401:
        errorMessage =
          '401 - usuário com e-mail especificado não foi encontrado'
        break
      default:
        errorMessage = 'Erro no login'
    }

    return Promise.reject(errorMessage)
  }

  return res.json() // retorna dados com token etc
}

export const checkToken = async token => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    let errorMessage

    switch (res.status) {
      case 400:
        errorMessage =
          '400 — Token não fornecido ou fornecido em formato errado'
        break
      case 401:
        errorMessage = '401 — O token fornecido é inválido'
        break
      default:
        errorMessage = 'Erro'
    }

    return Promise.reject(errorMessage)
  }

  return res.json()
}
