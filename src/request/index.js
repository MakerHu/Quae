import axios from 'axios'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '网络请求异常，请稍后重试！'
// 创建axios实例对象
const service = axios.create({
  baseURL: '/api',
});

// 在请求之前
service.interceptors.request.use((req) => {
  // 可以自定义header
  // jwt-token认证时候用到
  return req;
});

// 在请求之后
service.interceptors.response.use((res) => {
  // 对文件传输进行特殊处理
  if(res.headers['content-type'] != 'application/json;charset=UTF-8') {
    const { status, data, statusText } = res;
    //   根据后端协商 视情况而定
    if (status == 200) {
      return data;
    } else {
      // 网络请求错误提示
      ElMessage.error(statusText || NETWORK_ERROR);
      return Promise.reject(statusText || NETWORK_ERROR);
    }
  } else {
    const { code, data, msg } = res.data;
    //   根据后端协商 视情况而定
    if (code == 200) {
      return data;
    } else {
      ElMessage.error(msg || NETWORK_ERROR);
      return Promise.reject(msg || NETWORK_ERROR);
    }
  }
});

// 封装的核心函数
function request(options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data;
  }
  // 对线上环境做处理
  service.defaults.baseURL = '/api';
  return service(options);
}

export default request;