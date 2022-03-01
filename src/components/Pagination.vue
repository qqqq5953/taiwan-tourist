<template>
  <!--分頁按鈕-->
  <nav class="pagination_wrapper">
    <ul class="pagination">
      <!--First-->
      <li class="page-item" @click="onFirstPage()">
        <router-link
          :to="`${resultPath}`"
          class="page-link"
          :class="{ 'disabled-btn': currentPage === 1 }"
          href="#"
        >
          <span>First</span>
        </router-link>
      </li>

      <!--Prev-->
      <li class="page-item" @click="onPreviousPage()">
        <router-link
          :to="`${resultPath}`"
          class="page-link"
          :class="{ 'disabled-btn': currentPage === 1 }"
          href="#"
        >
          <span>&laquo;</span>
        </router-link>
      </li>

      <!--數字-->
      <li class="page-item page-item-number" v-for="page in pages" :key="page">
        <router-link
          :to="`${resultPath}`"
          class="page-link"
          :class="{ 'active-btn': page.isActive }"
          href="#"
          @click="onCurrentPage(page.num)"
          >{{ page.num }}</router-link
        >
      </li>

      <!--Next-->
      <li class="page-item" @click="onNextPage()">
        <router-link
          :to="`${resultPath}`"
          class="page-link"
          :class="{
            'disabled-btn': currentPage === totalPages || totalPages === 0
          }"
          href="#"
        >
          <span>&raquo;</span>
        </router-link>
      </li>

      <!--Last-->
      <li class="page-item" @click="onLastPage()">
        <router-link
          :to="`${resultPath}`"
          class="page-link"
          :class="{
            'disabled-btn': currentPage === totalPages || totalPages === 0
          }"
          href="#"
        >
          <span>Last</span>
        </router-link>
      </li>
    </ul>

    <!--手機板-->
    <ul class="pagination-mobile">
      <!--數字-->
      <li
        class="page-item page-item-number-mobile"
        v-for="page in pages"
        :key="page"
        @click="onCurrentPage(page.num)"
      >
        <router-link
          :to="`${resultPath}`"
          class="page-link"
          :class="{ 'active-btn': page.isActive }"
          href="#"
          >{{ page.num }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number
    },
    totalPages: {
      type: [Number, String]
    },
    maxViewPage: {
      type: Number,
      default: 3
    },
    resultPath: {
      type: String,
      default: 'SearchResult'
    }
  },
  emits: ['pageChange'],
  methods: {
    onFirstPage() {
      this.$emit('pageChange', 1);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    },
    onPreviousPage() {
      if (this.currentPage === 1) return;
      this.$emit('pageChange', this.currentPage - 1);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    },
    onCurrentPage(page) {
      this.$emit('pageChange', page);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    },
    onNextPage() {
      if (this.currentPage === this.totalPages || this.totalPages === 0) return;
      this.$emit('pageChange', this.currentPage + 1);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    },
    onLastPage() {
      if (this.currentPage === this.totalPages || this.totalPages === 0) return;
      this.$emit('pageChange', this.totalPages);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    }
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) return 1;
      if (this.currentPage === this.totalPages) {
        return Math.max(this.totalPages - this.maxViewPage + 1, 1);
      }
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxViewPage - 1, this.totalPages);
    },
    pages() {
      const pageArr = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        pageArr.push({
          num: i,
          isActive: i === this.currentPage
        });
      }
      return pageArr;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pagination.scss';
</style>
