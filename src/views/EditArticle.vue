<template>
  <v-layout>
    <form @submit.prevent="save">
      <v-text-field
        v-model="article.title"
        label="Title"
        single-line
        :rules="titleValidation"
      />
      <v-text-field
        v-model="article.body"
        label="Content"
        multi-line
        :rules="bodyValidation"
      />

      <v-btn
        :to="{ name: 'home' }"
        small
      >Back to articles</v-btn>
      <v-btn
        color="success"
        small
        type="submit"
      >Save</v-btn>
    </form>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { required, maxLength } from '../validation'

export default {
  data () {
    return {
      article: {
        title: '',
        body: ''
      },
      titleValidation: [
        required,
        maxLength(250)
      ],
      bodyValidation: [
        required
      ]
    }
  },
  created () {
    const id = this.$route.params.id

    if (id) {
      this.$store.dispatch('setTitle', 'Edit Article')
      this.getArticle(id)
        .then(article => {
          this.article = article
          this.$store.dispatch('setTitle', `Edit "${article.title}"`)
        })
    } else {
      this.$store.dispatch('setTitle', 'New Article')
    }
  },
  methods: {
    ...mapActions('articles', {
      saveArticle: 'save',
      getArticle: 'findById'
    }),
    ...mapActions('notifications', ['info']),

    save () {
      return this.saveArticle(this.article)
        .then(() => {
          this.info('Article has been successfully saved')
          this.$router.push('/')
        })
    }
  }
}
</script>
