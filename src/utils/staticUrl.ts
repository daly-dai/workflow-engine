/**
 * @description 处理静态资源地址
 * @param {*} src 路由地址
 * @returns
 */
export default function baseStaticUrl(src = "") {
  const { VITE_APP_STATIC_URL } = (import.meta as any).env;
  if (src) {
    return `${VITE_APP_STATIC_URL}${src}`;
  }
  return VITE_APP_STATIC_URL as string;
}
