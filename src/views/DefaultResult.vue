<template>
  <Loading
    :active="isLoading"
    :color="loaderColor"
    :width="loaderWidth"
    :height="loaderHeight"
  ></Loading>
  <Header ref="wrap"></Header>
  <PopularSection :data="placeData" defaultType="熱門景點">
    <template #card_section_title_text>
      <span>熱門景點</span>
      <img src="@/assets/images/place-icon.png" alt="place-icon" />
    </template>
  </PopularSection>

  <PopularSection :data="foodData" defaultType="熱門美食">
    <template #card_section_title_text>
      <span>熱門美食</span>
      <img src="@/assets/images/restaurant-icon.png" alt="restaurant-icon" />
    </template>
  </PopularSection>

  <PopularSection :data="eventData" defaultType="近期活動">
    <template #card_section_title_text>
      <span>近期活動</span>
      <img src="@/assets/images/event-icon.png" alt="event-icon"
    /></template>
  </PopularSection>

  <Footer></Footer>
</template>

<script>
import getDataMixin from '@/mixins/getDataMixin.js';

export default {
  mixins: [getDataMixin],
  data() {
    return {
      // Loader
      isLoading: false,
      loaderWidth: 150,
      loaderHeight: 150,
      loaderColor: 'rgba(47, 121, 140, 1)',
      placeUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=6&$format=JSON',
      foodUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/Taipei?$top=6&$format=JSON',
      eventUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/Taipei?$top=6&$format=JSON'
    };
  },
  created() {
    this.getAllData();
  }
};
</script>

<style lang="scss" scoped>
img {
  margin-left: 24px;
  object-fit: cover;

  @include mobile {
    width: 16px;
    margin-left: 12px;
  }
}
</style>
