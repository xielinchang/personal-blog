import request from '../../network/request'

export function queryProject(data) {
  return request({
    url: '/project/query',
    method: 'post',
    data
  })
}
export function createProject(data) {
  return request({
    url: '/project/create',
    method: 'post',
    data
  })
}
export function updateProject(data) {
  return request({
    url: '/project/update',
    method: 'post',
    data
  })
}
export function deleteProject(data) {
  return request({
    url: '/project/delete',
    method: 'post',
    data
  })
}
export function saveProject(data) {
  return request({
    url: '/project/save',
    method: 'post',
    data
  })
}
export function queryProjectSave(data) {
  return request({
    url: '/project/query/save',
    method: 'post',
    data
  })
}

