<template>
  <Loading
    :active="isLoading"
    :color="loaderColor"
    :width="loaderWidth"
    :height="loaderHeight"
  ></Loading>
  <div class="d-flex flex-column h-100">
    <Header></Header>
    <PopularSection
        :data="searchedData"
        :touristType="filteredType"
        :resultPath="path"
      >
        <template #card_section_title_text>
          <div
            class="card_section_title_search_text"
            v-if="filteredType === 'ScenicSpot'"
          >
            <span>熱門景點</span>
            <img src="@/assets/images/place-icon.png" alt="place-icon" />
          </div>
          <div
            class="card_section_title_search_text"
            v-else-if="filteredType === 'Restaurant'"
          >
            <span>熱門美食</span>
            <img src="@/assets/images/restaurant-icon.png" alt="restaurant-icon" />
          </div>
          <div
            class="card_section_title_search_text"
            v-else-if="filteredType === 'Activity'"
          >
            <span>近期活動</span>
            <img src="@/assets/images/event-icon.png" alt="event-icon" />
          </div>
          <div v-else>搜尋結果 <i class="fas fa-lg fa-search"></i></div>
        </template>
    </PopularSection>
    <Footer class="mt-auto"></Footer>
  </div>
</template>

<script>
import getDataMixin from '@/mixins/getDataMixin.js';

export default {
  mixins: [getDataMixin],
  data() {
    return {
      allData: [],
      searchedData: [],
      filteredType: '',
      filteredCity: '',
      keywords: '',
      path: '',
      // Loader
      isLoading: false,
      loaderWidth: 150,
      loaderHeight: 150,
      loaderColor: 'rgba(47, 121, 140, 1)'
    };
  },
  computed: {
    placeUrl() {
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.filteredCity}?&$format=JSON`;
    },
    foodUrl() {
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${this.filteredCity}?&$format=JSON`;
    },
    eventUrl() {
      return `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${this.filteredCity}?&$format=JSON`;
    }
  },
  methods: {
    matchKeywords(database, keywords) {
      this.searchedData = database.filter((data) => {
        const name = data.ScenicSpotName
          ? data.ScenicSpotName
          : data.RestaurantName
          ? data.RestaurantName
          : data.ActivityName;
        return name.match(keywords);
      });
    },
    async processFillterData(filteredType) {
      // 根據不同類型，抓取相對應資料
      if (filteredType === 'ScenicSpot') {
        this.searchedData = await this.getPlaceData();
      }
      if (filteredType === 'Restaurant') {
        this.searchedData = await this.getFoodData();
      }
      if (filteredType === 'Activity') {
        this.searchedData = await this.getEventData();
      }
    }
  },
  props: ['inputKeywords', 'type', 'city'],
  watch: {
    async inputKeywords() {
      // 將關鍵字與資料庫比對
      this.matchKeywords(this.allData, this.inputKeywords);

      // 讀取當前頁面路徑，並傳進 PopularSection.vue
      this.path = this.$route.fullPath;
    },
    async city() {
      // 重新篩選後，將變數重新賦值
      this.filteredCity = this.city;

      // 重新篩選後，讀取當前頁面路徑，並傳進 PopularSection.vue
      this.path = this.$route.fullPath;
    },
    async type() {
      // 重新篩選後，將變數重新賦值
      this.filteredType = this.type;

      // 重新篩選後，讀取當前頁面路徑，並傳進 PopularSection.vue
      this.path = this.$route.fullPath;
    },
    async filteredCity() {
      this.isLoading = true;
      this.processFillterData(this.filteredType);
      this.isLoading = false;
    },
    async filteredType() {
      this.isLoading = true;
      this.processFillterData(this.filteredType);
      this.isLoading = false;
    }
  },
  async created() {
    window.scrollTo(0, -1000);

    // 搜尋用 API
    await this.getAllData();
    this.allData = [...this.placeData, ...this.foodData, ...this.eventData];

    // 搜尋：關鍵字傳入，開始處理資料
    this.inputKeywords && this.matchKeywords(this.allData, this.inputKeywords);

    // 篩選：旅遊類型及城市傳入，watch filteredCity
    this.filteredType = this.type;
    this.filteredCity = this.city;

    // 讀取當前頁面路徑，並傳進 PopularSection.vue
    this.path = this.$route.fullPath;
  }
};
</script>

<style lang="scss" scoped>
.card_section_title_search_text {
  display: flex;
  align-items: stretch;

  img {
    margin-left: 24px;
    object-fit: cover;

    @include mobile {
      margin-left: 12px;
      width: 16px;
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
