/**
 * 已经挂到全局,可以直接用
 * <icon href="xx" :to="xxx" size="89" replace></icon>
 * 属性:(icon默认是20px)
 * href: svg用于区别其它icon的id值，eg: 'warning' / '#warning'
 * size: Number/string,显示icon大小，宽=高=size
 * replace: 跳转路由时，是否替换的方式
 * to: 跳转路由, 调用myMixin加的共用goRouter函数,支持以下几条格式
 *  1. <icon to="routerName"></icon>
 *  2. <icon to="/path"></icon>
 *  3. <icon :to="{}"></icon>
 * fill: 给icon着色
 *  事件:
 *  click: 点icon会$emit一个"click"事件
 */
<template>
  <svg @click="clickMe($event)" class="iconbox" :style="styleStr" aria-hidden="true">
    <use :xlink:href="userName"></use>
  </svg>
</template>

<script>
export default {
  // 自定义标签名字
  name: 'icon',
  props: {
    href: {
      type: String,
      required: true
    },
    // 按钮大小
    size: [Number, String],
    // 填充颜色
    fill: String,
    // 跳转路由
    to: [String, Object],
    // 路由是否替换
    replace: Boolean
  },
  computed: {
    // svg名字
    userName () {
      return /^#/.test(this.href) ? this.href : ('#icon-' + this.href)
    },
    // 设置大小
    styleStr () {
      const size = parseInt(this.size, 0)
      const ref = {
        fill: this.fill
      }
      if (size) {
        ref.width = ref.height = size + 'px'
      }
      return ref
    }
  },
  methods: {
    clickMe (event) {
      if (this.to) {
        this.goRouter(this.to, this.replace ? 'replace' : '')
      }
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
  .iconbox{
    // width: .19rem;
    // height: .19rem;
    width: 22px;
    height: 22px;
    fill: currentColor;
    vertical-align: baseline
  }
</style>
