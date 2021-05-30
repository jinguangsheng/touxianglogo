<template>
  <div class="headerbar">
    <div class="item" @click="showLeftmenu">
      <icon href="menu"></icon>
    </div>
    <div class="item">
      <span class="title">头像logo网</span>
    </div>
    <div class="item" @click="showHelp">
      <icon href="help"></icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerbar',
  props: {
    msg: String
  },
  data () {
    return {
    }
  },
  methods: {
    addTool (type) {
      this.$emit('addTool', type)
    },
    showLeftmenu () {
      this.$emit('showLeftmenu')
    },
    showHelp () {
      this.$Bus.$emit('showHelp', true)
    }
  }
}
</script>

<style scoped lang="less">
.headerbar{
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #34495E;
  color: #fff;
  height: 40px;
  border-bottom: 1px solid #ebedf0;
  z-index: 999;
  .item{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    span{
      font-size: 16px;
      line-height: 20px;
    }
  }
}
// .title{
//   font-size: 20px;
// }
</style>
