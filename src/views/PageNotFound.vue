<template>
  <div class="d-flex flex-column h-100">
    <Header></Header>
    <h1>404</h1>
    <p>Oops! Page not found!</p>
    <div class="back-to-home">
      <router-link :to="{ name: 'Home' }"> Back to home page </router-link>
    </div>
    <Footer class="mt-auto"></Footer>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 80px;
  text-align: center;
  color: $color-primary;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 50px;

  @include pad {
    font-size: 50px;
  }

  @include mobile {
    font-size: $font-size-xxl;
  }
}

p {
  font-size: $font-size-xxl;
  text-align: center;
  color: $color-primary;

  @include pad {
    font-size: $font-size-lg;
  }

  @include mobile {
    font-size: 16px;
  }
}

.back-to-home {
  text-align: center;
  margin-top: 50px;

  a {
    @include btn-hover;
    display: inline-block;
    color: $color-primary;
    font-size: $font-size-xxl;
    background-color: $color-primary;
    border-radius: 100px;
    color: white;
    padding: 20px 40px;

    @include pad {
      font-size: $font-size-lg;
      margin-bottom: 50px;
    }

    @include mobile {
      font-size: 16px;
    }
  }
}

.d-flex{
  display: flex;
}

.flex-column{
  flex-direction: column;
}

.h-100{
  height: 100%;
}

.mt-auto{
  margin-top: auto;
}
</style>
