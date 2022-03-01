import JsSHA from 'jssha';
export default {
  data() {
    return {
      config: { headers: this.GetAuthorizationHeader() },
      placeData: [],
      foodData: [],
      eventData: []
    };
  },
  methods: {
    async getPlaceData() {
      try {
        const placeResponse = await this.axios.get(this.placeUrl, this.config);
        return placeResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getFoodData() {
      try {
        const foodResponse = await this.axios.get(this.foodUrl, this.config);
        return foodResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getEventData() {
      try {
        const eventResponse = await this.axios.get(this.eventUrl, this.config);
        return eventResponse.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllData() {
      try {
        this.isLoading = true;

        await Promise.all([
          this.getPlaceData(),
          this.getFoodData(),
          this.getEventData()
        ]).then((res) => {
          this.isLoading = false;

          this.placeData = res[0];
          this.foodData = res[1];
          this.eventData = res[2];
        });
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
  }
};
