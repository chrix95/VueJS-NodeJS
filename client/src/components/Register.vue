<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <form name="tabtracker" autocomplete="off">
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-text-field label="Email Address" v-model="email" autocomplete="new-password"></v-text-field>
            <v-text-field type="password" label="Password" v-model="password"></v-text-field>
            <div :class="[ error != null ? 'error' : '' ]" v-html="error != null ? error : ''"></div>
          </form>
          <div :class="[ success != null ? 'success' : '' ]" v-html="success != null ? success : ''"></div>
          <v-btn class="cyan" @click="register" dark>Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  mounted () {
    if (this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'dashboard'
      })
    }
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
      success: null
    }
  },
  methods: {
    async register () {
      this.error = null
      this.success = null
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.success = response.data.message
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
