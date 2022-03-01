<template>
  <Loading
    :active="isLoading"
    :color="loaderColor"
    :width="loaderWidth"
    :height="loaderHeight"
  ></Loading>
  <header class="header" :style="{ backgroundImage: `url(${image})` }">
    <Navbar></Navbar>
    <section class="banner">
      <h2 class="banner_title">尋找台灣</h2>
      <h3 class="banner_subtitle">景點、活動、美食</h3>
      <div class="banner_search">
        <div class="banner_searchBar">
          <input
            type="text"
            placeholder="請輸入關鍵字"
            v-model.trim="search"
            @keyup.enter="searchBtn"
          />
          <i class="fas fa-lg fa-search"></i>
        </div>
        <button
          type="button"
          class="banner_filterBtn"
          @click="changeMaskStatus"
        >
          <div class="banner_filterIcon">
            <i class="fas fa-bars"></i>
          </div>
          <span class="banner_filterText">篩選</span>
        </button>
      </div>
      <input
        type="button"
        class="banner_searchBtn"
        @click="searchBtn"
        value="搜尋"
        :disabled="!this.search"
      />
      <FilterSection
        v-if="hasMask"
        @close-mask="changeMaskStatus"
      ></FilterSection>
    </section>
  </header>
</template>

<script>
export default {
  data() {
    return {
      image:
        'https://images.unsplash.com/photo-1612249632917-bc95d832105b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      // Loader
      isLoading: false,
      loaderColor: 'rgba(47, 121, 140, 1)',
      loaderWidth: 150,
      loaderHeight: 150,
      // other
      hasMask: false,
      temp: '',
      search: ''
    };
  },
  methods: {
    changeMaskStatus() {
      // 被 FilterSection.vue 觸發
      this.hasMask = !this.hasMask;

      // 開啟遮罩，傳送至 App.vue
      this.emitter.emit('activate_mask', this.hasMask);
    },
    async searchBtn() {
      if (this.search === '') return;

      // 傳送資料到 SearchSection.vue
      this.$router.push({ name: 'SearchResult', query: { q: this.search } });

      this.search = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/header.scss';
.outline {
  outline: 2px solid red;
}
</style>
