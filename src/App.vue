<template>
  <div class="wrap" :class="{ loading_mask: false }">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskStatus: false
    };
  },
  created() {
    // 從 HeaderSection 傳來
    this.emitter.on('activate_mask', (data) => {
      console.log('遮罩是否打開?', data);
      this.maskStatus = data;
    });
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  max-width: 1440px;
  margin: 0 auto;
  height: 100vh;
}

.loading_mask {
  overflow: hidden;
}

.disabled {
  pointer-events: none;
  cursor: none;
}

.d-none {
  display: none !important;
}

.card_section_title_icon {
  margin-left: 23px;
  vertical-align: bottom;
}
</style>
