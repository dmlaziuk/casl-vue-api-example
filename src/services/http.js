const API_URL = 'http://localhost:3000/api'

const http = (url, { headers, ...options } = {}) => {
  return fetch(`${API_URL}${url}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: http.token,
      ...headers
    },
    ...options
  }).then(response => {
    return response.json().then(body => ({
      body,
      status: response.status
    }))
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }

    if (!http.onError(response)) {
      throw new Error(response.body.message || response.body.errors.join('\n'))
    }
  })
}

http.token = ''
http.onError = () => {}

export default http
