<template>
  <div class="hello">
    <h3>Welcome {{ name }}</h3>
    <h4></h4>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  mounted () {
    if (!this.$store.state.isUserLoggedIn) {
      this.$router.push({
        name: 'root'
      })
    }
  },
  data () {
    return {
      name: this.$store.state.user.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
