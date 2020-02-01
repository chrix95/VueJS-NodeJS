<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-4 pb-4">
          <v-text-field label="Email Address" v-model="email"></v-text-field>
          <v-text-field type="password" label="Password" v-model="password"></v-text-field>
          <div :class="[ error != null ? 'error' : '' ]" v-html="error != null ? error : ''"></div>
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
  data () {
    return {
      email: '1234',
      password: '1234',
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
          email: this.email,
          password: this.password
        })
        this.success = response.data.message
        // setTimeout(() => {
        //   this.success = null
        // }, 5000)
      } catch (error) {
        this.error = error.response.data.error
        // setTimeout(() => {
        //   this.error = null
        // }, 5000)
      }
    }
  }
}
</script>

<style scoped>

</style>
