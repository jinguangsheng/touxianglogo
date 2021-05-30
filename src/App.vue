<template>
  <div id="app">
    <div class="top" v-if="userDevice=='pc'">
      <div class="header">
        <div class="logo-wrap">
          <img class="logo" src="./assets/logo.png" alt="logo" />
        </div>
        <div
          @click="goNav('home')"
          :class="{ active: active === 'home' }"
          class="nav-item"
        >
          头像/logo设计
        </div>
        <div
          @click="goNav('logos')"
          :class="{ active: active === 'logos' }"
          class="nav-item"
        >
          大厂赏析
        </div>
        <div
          @click="goNav('about')"
          :class="{ active: active === 'about' }"
          class="nav-item"
        >
          关于我们
        </div>
      </div>
    </div>
    <router-view v-if="userDevice=='pc'" name="pc" />
    <Headerbar v-if="userDevice=='mobile'" @showLeftmenu="showLeftmenu"/>
    <router-view v-if="userDevice=='mobile'" name="mobile" />
    <Leftmenu v-if="userDevice=='mobile'" :leftmenuShow="leftmenuShow"/>
    <div class="footer" v-if="active === 'home' && userDevice == 'pc'">
      <a href="https://touxianglogo.com" target="_blank">头像logo网</a
      ><a href="https://beian.miit.gov.cn" target="_blank">
        豫ICP备2021007008号</a
      >
      Copyright © 2021
      <a href="https://touxianglogo.com" target="_blank">touxianglogo.com</a>,
      版权所有
    </div>
    <Help/>
  </div>
</template>

<script>
import Headerbar from '@/components/mobile/Headerbar'
import Leftmenu from '@/components/mobile/Leftmenu'
import Help from '@/components/mobile/Help'
import { userDevice } from '@/utils/fun'
export default {
  name: 'touxianglogo',
  props: {
    msg: String
  },
  components: {
    Leftmenu, Headerbar, Help
  },
  data () {
    return {
      active: 'home',
      userDevice: userDevice(),
      leftmenuShow: false
    }
  },
  watch: {
    $route (n) {
      this.active = n.name
    }
  },
  methods: {
    goNav (n) {
      if (n === this.active) return
      this.active = n
      this.$router.push({
        name: n
      })
    },
    showLeftmenu () {
      this.leftmenuShow = !this.leftmenuShow
    }
  },
  mounted () {
    const loading = document.getElementsByClassName('loading-mask')[0]
    if (loading) loading.remove()
  }
}
</script>

<style lang="less">
html {
  overflow: auto;
}
body {
  margin: 0;
  background: #dbdbdb;
  overflow: auto;
}
.loading-mask {
  position: fixed;
  background-color: hsla(0, 0%, 100%, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  z-index: 9999;
  .loading-bg {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    background: url(./assets/img/loading1.gif) no-repeat;
    background-size: 100% 100%;
  }
}
.top {
  background: #34495E;
  min-width: 1000px;
  display: block;
  height: 48px;
}
.header {
  width: 1000px;
  margin: 0 auto;
  zoom: 1;
  &::after {
    content: "";
    clear: both;
  }
  & > div {
    float: left;
  }
}
.nav-item {
  line-height: 50px;
  height: 48px;
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  width: 120px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: #409eff;
    color: #000;
  }
  &.active {
    border-bottom: 3px solid #409eff;
  }
}
.logo-wrap {
  height: 48px;
}

.logo {
  width: 48px;
  height: 48px;
}
.footer {
  width: 1000px;
  padding: 10px 0px 10px;
  font-size: 12px;
  margin: 10px auto 0;
  clear: both;
  line-height: 30px;
  color: #666;
  text-align: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
