import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';
import mitt from 'mitt';
import Loading from 'vue3-loading-overlay';

import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import '@/assets/scss/reset.scss';

import Navbar from '@/components/Navbar.vue';
import Card from '@/components/Card.vue';
import NoResult from '@/components/NoResult.vue';
import Header from '@/components/Header.vue';
import FilterSection from '@/components/FilterSection.vue';
import PopularSection from '@/components/PopularSection.vue';
import Pagination from '@/components/Pagination.vue';
import Footer from '@/components/Footer.vue';

import MoreResult from '@/views/MoreResult.vue';
import DefaultResult from '@/views/DefaultResult.vue';

const emitter = mitt();
const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.config.globalProperties.emitter = emitter;

app.component('Navbar', Navbar);
app.component('Footer', Footer);
app.component('Card', Card);
app.component('NoResult', NoResult);
app.component('Loading', Loading);
app.component('Header', Header);
app.component('FilterSection', FilterSection);
app.component('DefaultResult', DefaultResult);
app.component('PopularSection', PopularSection);
app.component('Pagination', Pagination);
app.component('MoreResult', MoreResult);

app.mount('#app');
