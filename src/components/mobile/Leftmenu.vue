<template>
    <Popup :overlay-class="'leftmenu-overlay'" v-model="popShow" position="left" @close="close">
       <ul>
          <li @click="goPage('home')" :class="{'active': active==='home'}" >首页</li>
          <li @click="goPage('logos')" :class="{'active': active==='logos'}" >大厂赏析</li>
          <!-- <li @click="goPage('home')" :class="{'active': active==='home1'}" >头像</li>
          <li @click="goPage('home')" :class="{'active': active==='home1'}" >互联网素材</li> -->
          <li @click="goPage('about')" :class="{'active': active==='about'}" >关于我们</li>
      </ul>
    </Popup>
</template>

<script>
import { Popup } from 'vant'
import 'vant/lib/popup/style'
export default {
  name: 'Leftmenu',
  components: {
    Popup
  },
  props: {
    leftmenuShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route (n) {
      this.active = n.name
    },
    leftmenuShow (newVal) {
      this.popShow = newVal
    }
  },
  data () {
    return {
      popShow: false,
      active: 'home'
    }
  },
  methods: {
    goPage (n) {
      console.log(n)
      if (this.active === n) return
      this.active = n
      this.$router.push({
        name: n
      })
    },
    close () {
      this.$parent.leftmenuShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup{
    height: 100%;
}
ul{
  height: 100%;
  background: #111;
  padding: 50px 20px;
  box-sizing: border-box;
  color: rgba(255,255,255,0.5);
  li{
    line-height: 35px;
    &.active{
      color: #fff;
    }
  }
}
</style>
<style lang="less">
.leftmenu-overlay{
  background: rgba(0,0,0,0.3) !important;
}
</style>
