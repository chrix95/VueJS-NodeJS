<template>
   <div>
    <h1>Register</h1>
    <div>
      <input type="email" name="email" placeholder="Email" v-model="email"> <br><br>
      <input type="password" name="password" placeholder="Password" v-model="password"> <br><br>
      <div :class="[ error != null ? 'error' : '' ]" v-html="error != null ? error : ''"></div>
      <div :class="[ success != null ? 'success' : '' ]" v-html="success != null ? success : ''"></div>
      <button @click="register">Register</button>
    </div>
  </div>
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
        setTimeout(() => {
          this.success = null
        }, 5000)
      } catch (error) {
        this.error = error.response.data.error
        setTimeout(() => {
          this.error = null
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>

</style>
