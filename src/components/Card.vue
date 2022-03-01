<template>
  <div class="card">
    <div class="card_image">
      <img :src="item.Picture.PictureUrl1" />
      <p
        class="card_description"
        :class="{ 'd-none': !item.DescriptionDetail }"
      >
        {{ item.DescriptionDetail }}
      </p>
      <p class="card_description" :class="{ 'd-none': item.DescriptionDetail }">
        {{ item.Description }}
      </p>
    </div>
    <div class="card_body">
      <div class="card_header">
        <div class="card_header_location">
          <i class="fas fa-map-marker-alt"></i>
          <span v-if="item.City">{{ item.City }}</span>
          <span v-else-if="item.Address">{{
            item.Address[2] === '縣' || item.Address[2] === '市'
              ? item.Address.slice(0, 3)
              : item.Address.slice(0, 2)
          }}</span>
          <span v-else>無</span>
        </div>
        <h4 class="card_header_title">
          {{
            item.ScenicSpotName
              ? item.ScenicSpotName
              : item.RestaurantName
              ? item.RestaurantName
              : item.HotelName
              ? item.HotelName
              : item.ActivityName
          }}
        </h4>
      </div>
      <slot name="card_phone" :item="item"></slot>
      <slot name="card_address" :item="item"></slot>
      <div class="card_openTime">
        <h5>開放時間：</h5>
        <div class="card_openTime_details">{{ item.OpenTime || '無' }}</div>
      </div>
    </div>
    <router-link
      :to="{ name: 'CardDetail' }"
      @click="toContentPage"
      v-if="txt !== 'cardDetail'"
    >
      <button type="button" class="card_moreInfoBtn">查看詳情</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['item', 'txt', 'name'],
  methods: {
    toContentPage() {
      console.log('card 發送');

      // 傳送到 CardDetails.vue (用 localStorage)
      const cardItem = JSON.stringify({ ...this.item });
      const moreInfoBtnDnone = 'cardDetail';
      localStorage.setItem('passToCardDetails', cardItem);

      // 讓 CardDetail 中的卡片不要有"查看更多"按鈕
      localStorage.setItem('moreInfoBtnDnone', moreInfoBtnDnone);

      // 換頁時回到頁面最上方
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/card.scss';
</style>
