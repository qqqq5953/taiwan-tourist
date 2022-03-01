<template>
  <nav class="nav">
    <h1>
      <router-link :to="{ name: 'Home' }" class="logo-wrap">
        <img class="logo" src="@/assets/images/logo.png" alt="logo" />
        <img class="websiteName" src="@/assets/images/websiteName.png" alt="" />
      </router-link>
    </h1>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/navbar.scss';
</style>
