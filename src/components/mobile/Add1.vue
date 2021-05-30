<template>
  <div class="add"
    @click="toIndex"
    id="floatNav"
    ref="floatNav"
    :style="{'left': left + 'px', 'top': top + 'px'}">
    +
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      itemWidth: 66,
      itemHeight: 66,
      gapWidth: 10,
      coefficientHeight: 0.55,
      clientWidth: 0,
      clientHeight: 0,
      timer: null,
      currentTop: 0,
      left: 10,
      top: 40
    }
  },
  methods: {
    toIndex () {
      this.$parent.popupShow = true
    },
    handleScrollStart () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.handleScrollEnd()
      }, 300)
      this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
      if (this.left > this.clientWidth / 2) {
        this.left = this.clientWidth - this.itemWidth / 2
      } else {
        this.left = -this.itemWidth / 2
      }
    },
    handleScrollEnd () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop === this.currentTop) {
        if (this.left > this.clientWidth / 2) {
          this.left = this.clientWidth - this.itemWidth
        } else {
          this.left = 10
        }
        clearTimeout(this.timer)
      }
    }
  },
  created () {
    this.clientWidth = document.documentElement.clientWidth
    this.clientHeight = document.documentElement.clientHeight
    this.left = 10
    this.top = this.clientHeight - 126
    // console.info('top - ', this.clientHeight, this.top)
  },
  mounted () {
    this.$nextTick(() => {
      const floatNav = this.$refs.floatNav
      document.addEventListener('touchmove', (r) => {
        if (r.target && r.target.id && r.target.id === 'floatNav') {
          // 阻止默认的处理方式(阻止下拉滑动的效果)
          r.preventDefault()
        }
      }, { passive: false })
      // 按钮的移动
      floatNav.addEventListener('touchstart', () => {
        floatNav.style.transition = 'none'
      })
      // 在拖拽的过程中，组件应该跟随手指的移动而移动。
      floatNav.addEventListener('touchmove', (e) => {
        if (e.targetTouches.length === 1) {
          // 一根手指
          const touch = e.targetTouches[0]
          this.left = touch.clientX - 46
          this.top = touch.clientY - 76
        }
      })
      // 拖拽结束以后，重新调整组件的位置并重新设置过度动画。
      floatNav.addEventListener('touchend', () => {
        floatNav.style.transition = 'all 0.3s'
        if (this.left > document.documentElement.clientWidth / 2) {
          this.left = document.documentElement.clientWidth - 76
        } else {
          this.left = 10
        }
        // if (this.left > document.documentElement.clientWidth - 60) {
        //   this.left = document.documentElement.clientWidth - 60
        // }
        // if (this.left < 0) {
        //   this.left = 0
        // }
        if (this.top > document.documentElement.clientHeight - 126) {
          this.top = document.documentElement.clientHeight - 126
        }
        if (this.top < 30) {
          this.top = 30
        }
      })
    })
  },
  beforeDestroy () {
    // 添加监听页面滚动
    window.removeEventListener('scroll', this.handleScrollStart)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScrollStart, true)
  }

}
</script>
<style lang="less" scoped>
.add {
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 30px;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  position: fixed;
  left: 15px;
  bottom: 45px;
  background: #409eff;
  transition: all 0.3s;
  z-index: 990;
}
</style>
