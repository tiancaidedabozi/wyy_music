import moment from 'moment'
import { createLogger } from 'vuex';

/**格式化searchSingles 返回的数据 */
export function formatSingles(data) {
    let singlesList = [];
    data.forEach((item, index) => {
        let obj = {};
        obj.id = item.id;
        obj.rank = index + 1;
        obj.linkOrLoad = '';
        obj.title = item.name;
        obj.singer = item.artists[0].name;
        obj.img1v1Url = item.artists[0].img1v1Url;
        obj.album = item.album.name;
        obj.time = dateFormat(item.duration);
        singlesList.push(obj);
    });
    return singlesList;
}

/**格式化 searchSuggest返回的数据 */
export function formatSearchSuggest(result) {
    let suggest = {};
    for(let key in result) {
        if(key === 'albums') {
            let albums = [];
            result[key].forEach(item => {
                let albumsObj = {};
                albumsObj.name = item.name;
                albumsObj.artist = item.artist.name;
                albums.push(albumsObj);
            })
            suggest.albums = albums;
        } else if (key === 'artists') {
            suggest.artists = result[key];
        } else if (key === 'songs') {
            let songs = [];
            result[key].forEach(item => {
                let songsObj = {};
                songsObj.name = item.name;
                let name = '';
                item.artists.forEach(item => {
                    name += ` ${item.name}`
                })
                songsObj.artists = name;
                songs.push(songsObj);
            })
            suggest.songs = songs;
        } else if (key === 'playlists') {
            suggest.playlists = result[key];
        }
    }
    return suggest;
}

/**格式化歌曲时长 */
function dateFormat(time) {
    let date = moment.duration(time);
    let hour = date.hours();
    let minute = date.minutes();
    let second = date.seconds();
    let h = hour > 0 ? hour > 0 && hour < 10 ? `0${hour}:` : hour+':' : '';
    let m = minute > 0 ? minute > 0 && minute < 10 ? `0${minute}:` : minute+':' : '00:';
    let s = second > 0 ? second > 0 && second < 10 ? `0${second}` : second : '';
    return `${h}${m}${s}`;
}