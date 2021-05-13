/**
 * 拦截器，唯一作用就是在请求的时候，展示加载动画
 * 请求完毕之后隐藏加载动画
 */
import axios from 'axios'
import $store from '../vuex/vuex.js'
let ajaxTimer = 0;

export function request(config) {
    $store.commit('showLoading');
    const instance = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000,
    });
    instance.interceptors.request.use(function (data) {
        ajaxTimer++;
        return data;
    }, function (err) {
        return err;
    });
    instance.interceptors.response.use(function (response) {
        ajaxTimer--;
        if (ajaxTimer === 0) {
            $store.commit('hiddenLoading');
        }
        return response;
    }, function (err) {
        return err;
    });

    return instance(config);
}

// 不展示加载动画
export function requestGet(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000,
    });
    instance.interceptors.request.use(function (data) {
        return data;
    }, function (err) {
        return err;
    });
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (err) {
        return err;
    });

    return instance(config);
}
//Post 请求
export function requestPost(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 5000,
        method: 'POST'
    });
    instance.interceptors.request.use(function (data) {
        return data;
    }, function (err) {
        return err;
    });
    instance.interceptors.response.use(function (response) {
        return response;
    }, function (err) {
        return err;
    });

    return instance(config);
}
