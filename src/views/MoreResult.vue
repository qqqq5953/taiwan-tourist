<template>
  <Loading
    :active="isLoading"
    :color="loaderColor"
    :width="loaderWidth"
    :height="loaderHeight"
  ></Loading>
  <Header></Header>
  <PopularSection
    :data="moreResultData"
    resultPath="MoreResult"
  ></PopularSection>

  <Footer></Footer>
</template>

<script>
import JsSHA from 'jssha';
export default {
  data() {
    return {
      config: { headers: this.GetAuthorizationHeader() },
      placeUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/?&$format=JSON',
      foodUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/?&$format=JSON',
      eventUrl:
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/?&$format=JSON',
      moreResultData: [],
      moreResultType: '',
      // Loader
      isLoading: false,
      loaderWidth: 150,
      loaderHeight: 150,
      loaderColor: 'rgba(47, 121, 140, 1)'
    };
  },
  methods: {
    async getPlaceData() {
      try {
        this.isLoading = true;
        const placeResponse = await this.axios.get(this.placeUrl, this.config);
        this.moreResultData = placeResponse.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getFoodData() {
      try {
        this.isLoading = true;

        const foodResponse = await this.axios.get(this.foodUrl, this.config);
        this.moreResultData = foodResponse.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getEventData() {
      try {
        this.isLoading = true;

        const eventResponse = await this.axios.get(this.eventUrl, this.config);
        this.moreResultData = eventResponse.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    GetAuthorizationHeader() {
      const AppID = '096409078e0c483f87d2ae7551b214ea';
      const AppKey = '4s6NU76FhxsKZGCH06RzkVnXoSk';

      const GMTString = new Date().toGMTString();
      const ShaObj = new JsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      const HMAC = ShaObj.getHMAC('B64');
      const Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
      return {
        Authorization: Authorization,
        'X-Date': GMTString
      };
    }
  },
  created() {
    // 接收 PopularSection.vue 傳來資料（讀取localStorage）
    this.moreResultType = JSON.parse(localStorage.getItem('passToMoreResult'));

    if (this.moreResultType === '熱門景點') {
      this.getPlaceData();
    } else if (this.moreResultType === '熱門美食') {
      this.getFoodData();
    } else {
      this.getEventData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pagination.scss';
</style>
