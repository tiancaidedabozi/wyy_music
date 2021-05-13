import Vue from 'vue';
import App from './App.vue'
import router from './router/router.js'
import store from './vuex/vuex.js'

import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);

new Vue({
    el: '#app',
    render: c => c(App),
    router,
    store,
    components: {
        'overlay-scrollbars': OverlayScrollbarsComponent
    }
});