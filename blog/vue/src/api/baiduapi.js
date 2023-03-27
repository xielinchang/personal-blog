import request from '../network/baiduapi'

export function baiduLocation(data) {
  return request({
    url: '/location/ip?ak=aozWMkUTI7s99gVCajcGGjKf7DG4fArh&ip=' + data,
    method: 'get',
    data
  })
}
export function baiduWhether(data) {
  return request({
    url: '/weather/v1/?district_id=' + data + '&data_type=all&ak=aozWMkUTI7s99gVCajcGGjKf7DG4fArh',
    method: 'get',
    data
  })
}
