import http from '../services/http'

export default {
  namespaced: true,

  actions: {
    find () {
      return http('/articles')
        .then(response => response.body.articles)
    },

    findById (_, id) {
      return http(`/articles/${id}`)
        .then(response => response.body.article)
    },

    destroy (_, article) {
      return http(`/articles/${article.id}`, { method: 'DELETE' })
        .then(response => response.body.article)
    },

    save (_, article) {
      const request = article.id
        ? http(`/articles/${article.id}`, { method: 'PUT', body: JSON.stringify(article) })
        : http('/articles', { method: 'POST', body: JSON.stringify(article) })

      return request.then(response => response.body.article)
    }
  }
}
