<template>
  <Loading
    :active="isLoading"
    :color="loaderColor"
    :width="loaderWidth"
    :height="loaderHeight"
  ></Loading>
  <section class="card_section">
    <div class="card_section_title">
      <slot name="card_section_title_text"></slot>
    </div>
    <NoResult v-if="!data.length"></NoResult>
    <div class="card_section_content">
      <Card v-for="obj in paginatedData" :key="obj.ID" :item="obj"></Card>
    </div>
    <router-link
      :to="{ name: 'MoreResult' }"
      v-if="defaultType"
      @click="moreResult"
    >
      <button type="button" class="card_section_morePlaceBtn">
        看更多{{ defaultType }}
      </button>
    </router-link>
    <Pagination
      v-if="!defaultType && data.length"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="onPageChange"
      :resultPath="resultPath"
    ></Pagination>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    defaultType: {
      type: String
    },
    touristType: {
      type: String
    },
    resultPath: {
      type: String,
      default: 'SearchResult'
    }
  },
  data() {
    return {
      searchData: null,
      searchTypeData: '',
      paginatedData: null,
      // 分頁資訊
      currentPage: 1,
      cardPerPage: 9,
      totalPages: '',
      // Loader
      isLoading: false,
      loaderWidth: 150,
      loaderHeight: 150,
      loaderColor: 'rgba(47, 121, 140, 1)'
    };
  },
  methods: {
    moreResult() {
      // 傳送到 MoreResult.vue (用 localStorage)
      const moreResult = JSON.stringify(this.defaultType);
      localStorage.setItem('passToMoreResult', moreResult);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    },
    setPageButton(data) {
      this.totalPages = Math.ceil(data.length / this.cardPerPage);
    },
    setPageData(data) {
      const page = this.currentPage;
      const perPage = this.cardPerPage;
      const start = page * perPage - perPage;
      const end = page * perPage;
      return data.slice(start, end);
    },
    onPageChange(page) {
      this.currentPage = page;
    }
  },
  watch: {
    data() {
      // 設置分頁按鈕
      this.setPageButton(this.data);

      // 當篩選或搜尋資料完成時，賦值給 PpaginatedData
      this.paginatedData = this.setPageData(this.data);

      // 重設起始頁面
      this.currentPage = 1;
    },
    currentPage() {
      // 當所在頁面變動時，重新賦值給 paginatedData

      if (!this.searchData) {
        this.paginatedData = this.setPageData(this.data);
        return;
      }
      this.paginatedData = this.setPageData(this.searchData);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/popularSection.scss';
</style>
