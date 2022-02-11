/*
 * @Author: qianye
 * @Date: 2021-05-06 16:21:30
 * @LastEditTime: 2021-05-08 09:38:35
 * @LastEditors: qianye
 * @Description: In User Settings Edit
 * @FilePath: \vue-spa-frame\src\service\api\module\common.js
 */
/**
 * @desc 公共api
 */
export default [
  {
    name: "login",
    method: "POST",
    desc: "登录接口",
    path: "api/users/login",
    mock: false,
    data: {
      email: "",
      password: "",
    },
    isWhite: true, // 白名单
  },
  {
    name: "register",
    method: "POST",
    desc: "注册接口",
    path: "api/users/login",
    mockPath: "/mock/index/getAreaInfo",
    mock: false,
    data: {
      email: "",
      password: "",
    },
    isWhite: true, // 白名单
  },
];
