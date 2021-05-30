<template>
    <van-dialog v-model="helpShow" title="帮助" @confirm="helpShow=false" >
        <p>1. 我们旨在帮助用户免费设计简单或者稍微复杂的头像、logo、商标和其他类型图片。</p>
        <p>2. 你可以参考借鉴其他用户优秀头像/知名企业logo进行设计。</p>
        <p>3. 如果本站图片/图标素材不够或者不符合你的需要，你可以自行搜索第三方网站（如百度）素材/图标下载到本地，再上传到本站进行组合设计。</p>
        <p>4. 本站可能做不出太过专业的设计，毕竟专业的设计都是花费一定的成本。</p>
        <p>5. 本站会不断完善优化功能体验。</p>
    </van-dialog>
</template>

<script>
import { Dialog } from 'vant'
import Vue from 'vue'
import 'vant/lib/dialog/style'
Vue.use(Dialog)
export default {
  name: 'Help',
  components: {
  },
  data () {
    return {
      helpShow: false
    }
  },
  methods: {
  },
  mounted () {
    this.$Bus.$on('showHelp', res => {
      console.log(res, 123, this.helpShow)
      this.helpShow = res
    })
  }
}
</script>

<style lang="less" scoped>
.van-dialog{
    padding: 0 15px;
    box-sizing: border-box;
}
p{
    font-size: 16px;
    text-align: left;
}
</style>
