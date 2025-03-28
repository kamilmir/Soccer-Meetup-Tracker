<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/create-match">Create Game</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Add your styles here */
nav {
  display: flex;
  justify-content: space-around;
  background-color: #007BFF;
  padding: 1rem;
}
nav a {
  color: white;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}
</style>