import axios from 'axios';
import queryString from 'query-string';
import { API_HOST, PLAYLIST_CONFIG, TOP_ARTIST_CONFIG } from '../constants/APIConfig';

const api_request = axios.create({
  baseURL: API_HOST
});

/**
 * 歌单 ( 网友精选碟 )
 * @param limit
 * @param order 可选值为'new'和'hot',默认为'hot'
 * @param offset (page-1)*limit
 * @param cat 比如'华语','古风','欧美','流行',默认为'全部'
 */
export const api_playlist = (params = {
    limit: PLAYLIST_CONFIG.limit,
    order: PLAYLIST_CONFIG.order,
    offset: 0
}) => {
  var parsed = queryString.parse(window.location.search);
  parsed.limit = parsed.limit === undefined ? PLAYLIST_CONFIG.limit : parsed.limit;
  parsed.offset = parsed.offset === undefined ? 0 : parsed.offset;
  parsed.order = parsed.order === undefined ? PLAYLIST_CONFIG.order : parsed.order;
  return api_request.get('/top/playlist/', {
    params: parsed
  })
}

/**
 * 获取歌单详情
 * @param id
 */
export const api_playlist_detail = (params) => api_request.get(`/playlist/detail`, {
    params: params
})

/**
 * 获取歌单分类
 */
export const api_playlist_catlist = () => api_request.get(`/playlist/catlist`)

/**
 * 获取热门分类
 */
export const api_playlist_hot = () => api_request.get(`/playlist/hot`)

/**
 * 歌单评论
 * @param id
 * @param limit
 * @param offset
 */
export const api_playlist_comment = (params) => api_request.get(`/comment/playlist`, { params: params })

/**
 * 歌单收藏者
 * @param id, required
 * @param limit, optional, default 20
 * @param offset, optional, (page-1)*limit
 */
export const api_playlist_subscriber = (params) => api_request.get(`/playlist/subscribers`, { params: params });

/**
 * 获取歌曲详情
 * @param ids eg: ids=1,2,3
 */
export const api_song_detail = (params) => api_request.get(`/song/detail`, { params: params });

/**
 * 搜索
 * @param keywords
 * @param limit
 * @param type 搜索类型；取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
 */
export const api_search = (params) => api_request.get(`/search`, { params: params });

/**
 * 热搜
 */
export const api_search_hot = () => api_request.get(`/search/hot`);

/**
 * 搜索建议
 * @param keywords
 */
export const api_search_suggest = (params) => api_request.get(`/search/suggest`, { params: params });

/**
 * 所有榜单
 */
export const api_toplist = () => api_request.get(`/toplist`);

/**
 * 榜单内容摘要
 */
export const api_toplist_detail = () => api_request.get(`/toplist/detail`);

/**
 * 热门歌手
 * @param limit
 * @param offset
 */
export const api_top_artists = ( params = {
    limit: TOP_ARTIST_CONFIG.limit,
    offset: 0
} ) => api_request.get(`/top/artists`, { params: params });

/**
 * 歌手单曲
 * @param id
 */
export const api_artists = ( params  ) => api_request.get(`/artists`, { params: params });

/**
 * 歌手专辑
 * @param id
 * @param limit
 * @param offset
 */
export const api_artist_album = ( params = {
    limit: TOP_ARTIST_CONFIG.limit,
    offset: 0
} ) => api_request.get(`/artist/album`, { params: params });

/**
 * 歌手MV
 * @param id
 */
export const api_artist_mv = ( params ) => api_request.get(`/artist/mv`, { params: params });

/**
 * 歌手描述
 * @param id
 */
export const api_artist_desc = ( params ) => api_request.get(`/artist/desc`, { params: params });

/**
 * 相似歌手
 * @param id
 */
export const api_artist_simi = ( params ) => api_request.get(`/artist/simi`, { params: params });

/**
 * 专辑内容
 * @param id
 */
export const api_album = ( params ) => api_request.get(`/album`, { params: params });

/**
 * 专辑评论
 * @param id
 */
export const api_album_comment = ( params ) => api_request.get(`/comment/album`, { params: params });

/**
 * 音乐url
 * @param id
 */
export const api_song_url = ( params ) => api_request.get(`/song/url`, { params: params });

/**
 * 歌词
 * @param id
 */
export const api_lyric = ( params ) => api_request.get(`/lyric`, { params: params });

