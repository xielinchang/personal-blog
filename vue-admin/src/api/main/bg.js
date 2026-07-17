import { request } from "@/utils/request";

// 首页背景
export function homeBgList(data) {
    return request({
        url: "/blog/home/bg",
        method: "post",
        data,
    });
}
export function homeBgCreate(data) {
    return request({
        url: "/blog/home/bg/create",
        method: "post",
        data,
    });
}
export function homeBgDelete(data) {
    return request({
        url: "/blog/home/bg/delete",
        method: "post",
        data,
    });
}
export function homeBgNow(data) {
    return request({
        url: "/blog/home/bg/now",
        method: "post",
        data,
    });
}
export function updateHomeBg(data) {
    return request({
        url: "/blog/home/bg/now/update",
        method: "post",
        data,
    });
}
// 首页背景(晚上)
export function homeBgNightList(data) {
    return request({
        url: "/blog/home/bg/night",
        method: "post",
        data,
    });
}
export function homeBgNightCreate(data) {
    return request({
        url: "/blog/home/bg/night/create",
        method: "post",
        data,
    });
}
export function homeBgNightDelete(data) {
    return request({
        url: "/blog/home/bg/night/delete",
        method: "post",
        data,
    });
}

export function homeBgNowNight(data) {
    return request({
        url: "/blog/home/bg/now/night",
        method: "post",
        data,
    });
}
export function updateHomeBgNight(data) {
    return request({
        url: "/blog/home/bg/now/night/update",
        method: "post",
        data,
    });
}
