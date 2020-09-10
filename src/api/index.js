import axios from 'axios'
import urls from './urls'
import store from "../store/";

const $get = (url, data, options = {}) => {
  const urlApi = urls[url] ? urls[url] : url
  //options.instanceNum = options.instanceNum ? options.instanceNum : 1
  options.instanceNum = options.instanceNum ? options.instanceNum : 2
  options.method = 'get'
  return fetch(urlApi, data, options)
}

const $post = (url, data, options = {}) => {
  const urlApi = urls[url] ? urls[url] : url
  // options.instanceNum = options.instanceNum ? options.instanceNum : 1
  options.instanceNum = options.instanceNum ? options.instanceNum : 2
  options.method = 'post'
  return fetch(urlApi, data, options)
}


const fetch = (url, data, options) => {
  options.url = url
  if (options.method == 'get') {
    options.params = data
  } else {
    options.data = data
  }
  const headers = {}
  headers['Content-Type'] = options && options.headers ? options.headers : 'application/json;charset=utf8'
  delete options.headers
  const token = store.state.app.user.token
  if (token) {
    headers.Authorization = token;
  }
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 8000,
    headers
  })

  const instance1 = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 8000,
    headers
  })
  //拦截请求
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config
  // }, err => {
  //   console.log(err);
  // })
  //拦截响应
  // instance.interceptors.response.use(res => {
  //   console.log(res);
  //   return res
  // }, err => {
  //   console.log(err);
  // })
  if (options.instanceNum === 1) {
    return instance(options)
  } else {
    return instance1(options)
  }

}

export default {
  $get,
  $post
}
