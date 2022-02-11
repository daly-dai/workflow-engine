/*
 * @Author: your name
 * @Date: 2021-05-06 16:21:30
 * @LastEditTime: 2021-05-08 09:38:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-spa-frame\src\service\api\module\common.js
 */
/**
 * @desc 公共api
 */
export default [
  {
    name: "getAuthTree",
    method: "GET",
    desc: "获取区域列表",
    path: "api/menu/getAuthTree",
    mock: false,
    isWhite: true, // 白名单
  },
];
