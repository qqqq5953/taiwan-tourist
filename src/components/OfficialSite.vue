<template id="officialSite">
  <section class="officialSite_section" id="officialSite_section">
    <table>
      <caption>
        以下活動請詳見官網
      </caption>
      <thead>
        <tr>
          <th>活動名稱</th>
          <th>活動內容</th>
          <th>主辦單位</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in item" :key="event.ActivityName">
          <td>{{ event.ActivityName }}</td>
          <td>{{ event.Description }}</td>
          <td>{{ event.Organizer }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  props: ['item']
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/officialSite.scss';
</style>
