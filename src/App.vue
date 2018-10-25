<template>
  <v-app>
    <v-navigation-drawer
      v-model="isVisibleMenu"
      app
      mini-variant
    >
      <v-list
        dense
        class="pt-0"
      >
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="$can('create', 'Article')"
          :to="{ name: 'newArticle' }"
        >
          <v-list-tile-action>
            <v-icon>add_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add article</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-if="isLoggedIn">
          <v-list-tile
            title="Log out"
            @click="logout"
          >
            <v-list-tile-action>
              <v-icon>rowing</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-else>
          <v-list-tile
            title="Log in"
            @click="$router.push('/login')"
          >
            <v-list-tile-action>
              <v-icon>input</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-toolbar>
        <v-btn
          icon
          @click="isVisibleMenu = !isVisibleMenu"
        >
          <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-container
        fluid
        fill-height
      >
        <router-view />
      </v-container>
    </v-content>
    <v-snackbar
      v-for="notification in notifications"
      :key="notification.id"
      :timeout="notification.timeout"
      :color="notification.type"
      top
      center
      :value="true"
      @input="removeNotification(notification)"
    >
      {{ notification.message }}
      <v-btn
        flat
        @click.native="removeNotification(notification)"
      >&times;</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    isVisibleMenu: false
  }),
  computed: {
    ...mapState(['pageTitle']),
    ...mapState('notifications', {
      notifications: 'stack'
    }),
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions('notifications', { removeNotification: 'remove' }),

    logout () {
      return this.$store.dispatch('logout')
        .then(() => {
          this.isVisibleMenu = false
          this.$router.replace('/')
        })
    }
  }
}
</script>
