/**
 * 本文件封装的是通过用户输入内容的相关搜索
 */
import { request, requestGet } from '../network/request.js'

/**搜索热搜列表 */
export function searchHotDetail() {
    return requestGet({
        url: 'search/hot/detail'
    })
}

/**搜索建议 */
export function searchSuggest(keywords) {
    return requestGet({
        url: 'search/suggest',
        params: {
            keywords: keywords
        }
    })
}

//搜索与用户输入内容相关歌曲
export function searchSingles(searchWord, offset = 1, limit = 100, type = 1) {
    return request({
        url: '/search',
        params: {
            keywords: searchWord,
            limit: limit,
            offset: offset - 1,
            type: type
        }
    });
}

/**获取音乐URL
 * id： 一个装着音乐id的数组
 */
export function getMusicUrl(id) {
    let inNum = id.join(',')
    return request({
        url: '/song/url',
        params: {
            id: inNum
        }
    });
}

export function getLyric(id) {
    return request({
        url: '/lyric',
        params: {
            id: id
        }
    });
}
