<template>
  <nav class="navbar">
    <router-link to="/" class="logo">BookStore</router-link>
  </nav>
  <router-view></router-view>
</template>

<style scoped>
.navbar {
  background-color: #f0c80f;
  padding: 1rem 2rem;
}

.logo {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>