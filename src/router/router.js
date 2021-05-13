import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const SearchList = (r) => require(['../components/content/search/SearchList.vue'], r)
const Singles = (r) => require(['../components/content/search/searchChild/Singles.vue'], r)
const Singer = (r) => require(['../components/content/search/searchChild/Singer.vue'], r)
const Album = (r) => require(['../components/content/search/searchChild/Album.vue'], r)
const Video = (r) => require(['../components/content/search/searchChild/Video.vue'], r)
const SongList = (r) => require(['../components/content/search/searchChild/SongList.vue'], r)
const Lyric = (r) => require(['../components/content/search/searchChild/Lyric.vue'], r)
const AnchorStation = (r) => require(['../components/content/search/searchChild/AnchorStation.vue'], r)
const User = (r) => require(['../components/content/search/searchChild/User.vue'], r)

export default new VueRouter({
    routes: [
        {
            path: '/search', component: SearchList,
            children: [
                { path: 'singles/:searchWord', component: Singles },
                { path: 'singer/:searchWord', component: Singer },
                { path: 'album/:searchWord', component: Album },
                { path: 'video/:searchWord', component: Video },
                { path: 'songlist/:searchWord', component: SongList },
                { path: 'lyric/:searchWord', component: Lyric },
                { path: 'anchorstation/:searchWord', component: AnchorStation },
                { path: 'user/:searchWord', component: User },
            ]
        }
    ]
});