<template>
  <div>
    <h1>Register</h1>
    <div>
      <input type="email" name="email" placeholder="Email" v-model="email"> <br><br>
      <input type="password" name="password" placeholder="Password" v-model="password"> <br><br>
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
      password: '1234'
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      alert(response.data.message)
    }
  }
}
</script>

<style scoped>

</style>
