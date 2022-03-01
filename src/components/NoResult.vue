<template>
  <h1>Sorry! No result matched!</h1>
  <p>Please try another keyword</p>
</template>

<style lang="scss" scoped>
h1 {
  font-size: $font-size-xxxl;
  text-align: center;
  color: $color-primary;
  font-weight: bold;
  margin-bottom: 20px;

  @include pad {
    font-size: 40px;
  }

  @include mobile {
    font-size: $font-size-xl;
  }
}

p {
  font-size: $font-size-xl;
  text-align: center;
  color: $color-primary;

  @include mobile {
    font-size: $font-size-md;
  }
}
</style>
