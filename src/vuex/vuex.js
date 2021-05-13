import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        searchWord: '',//搜索关键词
        loading: false,//加载动画化阀门
        tableData: [],//搜索返回歌曲数据
        songCount: 0,//搜索返回歌曲总数
        loginStatus: '',//登陆状态
        playList: [],//播放列表
        songObj: {},//正在播放的歌曲
    },
    mutations: {
        //将用户输入的搜索词存到状态管理中，并持久化到本地
        addSearchWord: function (state, searchWord) {
            if (searchWord != undefined && searchWord != '') {
                localStorage.setItem('searchWord', searchWord)
                state.searchWord = searchWord;
            }
        },
        addTableData: function (state, tableData) {
            state.tableData = tableData;
        },
        addSongCount: function (state, songCount) {
            state.songCount = songCount;
        },
        //展示加载动画
        showLoading: function (state) {
            state.loading = true;
        },
        //隐藏加载动画
        hiddenLoading: function (state) {
            state.loading = false;
        },
        //给播放列添添加元素
        addSingle: function (state, single) {
            for (let i = 0; i < state.playList.length; i++) {
                if(state.playList[i].id == single.id) {
                    return;
                }
            }
            state.playList.unshift(single);
        },
        //添加马上要播放的歌曲
        addSongObj(state,song){
            state.songObj = song;
        }
    },
    getters: {
        //获取用户输入的热词，如果状态管理为空那么区本地查找
        getSearchWord: function (state) {
            if (state.searchWord === '' && localStorage.getItem('searchWord') !== null) {
                return localStorage.getItem('searchWord');
            } else {
                return state.searchWord;
            }
        },

        getTableData: function (state) {
            return state.tableData;
        }
    }
});