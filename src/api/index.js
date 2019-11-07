import qs from 'qs'
import url from './url'
import api from './config'

// 请求接口
export const fetchData = (name, params) => {
  return api.post("/index.php?s=" + name, qs.stringify(params)).then(data => data)
}

export const getData = (name, params) => {
  return api.get(url[name], {
    params: params
  }).then(data => data)
}

export const fileUpload = (name, fileobj) => {
  let param = new FormData()
  param.append('iFile', fileobj.file)
  return api.post(name, param).then(data => data)

}