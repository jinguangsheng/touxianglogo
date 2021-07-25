import './assets/css/index.less'
// import 'lib-flexible/flexible.js'
import Vue from 'vue'
import router from './router'
// import ElementUI from 'element-ui'
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Switch,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Slider,
  Icon,
  Upload,
  ColorPicker,
  Checkbox,
  Tooltip,
  Popover,
  Badge,
  Image
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import icon from '@/components/icon' // svg组件
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
Vue.use(VueLazyload, { loading: require('@/assets/img/zhanwei.png') })
// import vcolorpicker from 'vcolorpicker'

// 自动引入 @/src/icons
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/svg', true, /\.svg$/)
requireAll(req)
Vue.component('icon', icon)
// Vue.use(vcolorpicker)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Slider)
Vue.use(Upload)
Vue.use(ColorPicker)
Vue.use(Switch)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Image)
Vue.config.productionTip = false
Vue.prototype.$Bus = new Vue()
// Vue.use(ElementUI)
// 获取百度token
// const instance = axios.create({
//   baseURL: 'https://aip.baidubce.com'
// })
// axios.interceptors.request.use( // 请求拦截
//   config => {
//     const token = localStorage.getItem('baidu_token')
//     if (token) {
//       config.access_token = token
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
Vue.prototype.$api = axios
const str = '?grant_type=client_credentials&client_id=ItVXnFiBfOYmL7GWYpXcXRL6&client_secret=5Mx4AC2YiHro5Zn1dMpXdo72IRFhEPCL'
Vue.prototype.$api.post('/oauth/2.0/token' + str).then(res => {
  console.log(res, 'token')
  localStorage.setItem('baidu_token', res.data.access_token)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
