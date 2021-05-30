<template>
  <div class="tools">
      <Tabs v-model="activeTab">
        <Tab title="输入文字">
            <div class="tab-wrap">
                <div class="shape-wrap" @click="addToArea('输入文字')">
                <div class="inner-area">输入文字</div>
                </div>
            </div>
        </Tab>
        <Tab title="图形工具">
            <div class="tab-wrap">
                <div class="shape-wrap" @click="addToArea('点/圆')">
                <div class="dian"></div>
                </div>
                <div class="shape-wrap" @click="addToArea('直线')">
                <div class="zhixian"></div>
                </div>
                <div class="shape-wrap" @click="addToArea('圆圈')">
                <div class="yuanquan"></div>
                </div>
                <div class="shape-wrap" @click="addToArea('矩形')">
                <div class="jvxing"></div>
                </div>
                <div class="shape-wrap" @click="addToArea('矩形1')">
                <div class="jvxing1"></div>
                </div>
            </div>
        </Tab>
        <Tab title="头像素材">
            <Tabs v-model="activeTouxiang">
                <Tab title="天空">
                  <div class="fileList flex1 tab-wrap img-wrap">
                    <img class="img-item" @click="selectImg(n)" v-for="(n, i) in meititouxiang" :key="i" v-lazy="n.src">
                  </div>
                </Tab>
            </Tabs>
        </Tab>
        <Tab title="图片素材">
            <Tabs v-model="activeTupian">
                <Tab title="天空">
                    <div v-if="tiankong.length" class="fileList flex1 tab-wrap">
                    <el-dropdown v-for="(n,i) in tiankong" :key="i" class="img-wrap">
                        <!-- <el-image class="img-item juzhong" :src="n" lazy></el-image> -->
                        <img class="img-item" :key="i" v-lazy="n">
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setBgImg('图片', n)">添加到画布</el-dropdown-item>
                        <el-dropdown-item @click.native="setBgImg('选中背景', n)">设为当前选中背景图</el-dropdown-item>
                        <el-dropdown-item @click.native="setBgImg('画布背景', n)">设为画布背景图</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    </div>
                </Tab>
                <Tab title="大海">
                  <div v-if="dahai.length" class="fileList flex1 tab-wrap">
                    <el-dropdown v-for="(n,i) in dahai" :key="i" class="img-wrap">
                        <el-image class="img-item juzhong" :src="n" lazy></el-image>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setBgImg('图片', n)">添加到画布</el-dropdown-item>
                        <el-dropdown-item @click.native="setBgImg('选中背景', n)">设为当前选中背景图</el-dropdown-item>
                        <el-dropdown-item @click.native="setBgImg('画布背景', n)">设为画布背景图</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    </div>
                </Tab>
                <Tab title="地球">
                  <div v-if="diqiu.length" class="fileList flex1 tab-wrap">
                    <el-dropdown v-for="(n,i) in diqiu" :key="i" class="img-wrap">
                        <el-image class="img-item juzhong" :src="n" lazy></el-image>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="setBgImg('图片', n)">添加到画布</el-dropdown-item>
                        <el-dropdown-item @click.native="setBgImg('选中背景', n)">设为当前选中背景图</el-dropdown-item>
                        <el-dropdown-item @click.native="setBgImg('画布背景', n)">设为画布背景图</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    </div>
                </Tab>
            </Tabs>
        </Tab>
        <Tab title="本地上传">
            <div class="tab-wrap">
            <div class="upload">
              <el-upload
                :limit="3"
                :on-exceed="handleExceed"
                multiple
                class="upload-bg"
                action
                :before-upload="beforeUpload"
              >
                <div class="btn-wrap">
                    <el-button class="upload-button" size="large" plain type="primary">上传本地素材</el-button>
                </div>
              </el-upload>
              <div v-if="fileList.length" class="upload-list flex1">
                <el-dropdown v-for="(n,i) in fileList" :key="i" class="img-wrap">
                  <div class="img-item juzhong"><img :src="n" /></div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="setBgImg('图片', n)">添加到画布</el-dropdown-item>
                    <el-dropdown-item @click.native="setBgImg('选中背景', n)">设为当前选中背景图</el-dropdown-item>
                    <el-dropdown-item @click.native="setBgImg('画布背景', n)">设为画布背景图</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            </div>
        </Tab>
        <!-- <Tab title="标签 4">
            <div class="tab-wrap">
            </div>
        </Tab> -->
      </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'
import { tiankong, dahai, diqiu } from '@/utils/data.js'
import { meititouxiang } from '@/utils/touxiang.js'

export default {
  name: 'tools',
  components: {
    Tab, Tabs
  },
  props: {
    msg: String
  },
  data () {
    return {
      activeTab: 0,
      activeTouxiang: 0,
      activeTupian: 0,
      fileList: [],
      meititouxiang,
      tiankong,
      dahai,
      diqiu
      // imgs1: [require('@/assets/bgImg/bg1.jpeg'), require('@/assets/bgImg/bg2.jpeg'), require('@/assets/bgImg/bg3.jpeg'), require('@/assets/bgImg/bg4.jpg'), require('@/assets/bgImg/bg5.jpeg'), require('@/assets/bgImg/bg6.jpeg')]
    }
  },
  methods: {
    addToArea (type) {
      this.$emit('addToArea', type)
    },
    selectImg (n) {
      this.$emit('selectImg', n)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`每次限制选择 3 个文件，本次选择了 ${files.length} 个文件`)
    },
    beforeUpload (file) {
      console.log(file, 'file')
      if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg') {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      }
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传图片大小不能超过 10MB!')
        return false
      }
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.fileList.push(e.target.result)
      }
    },
    setBgImg (type, n) {
      this.$emit('setBgImg', type, n)
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.tools{
    .tab-wrap{
        max-height: 400px;
        overflow: auto;
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .fileList{
      height: 200px;
      flex-wrap: wrap;
      overflow: auto;
      .el-dropdown{
        display: flex !important;
      }
    }
    .upload-list{
      flex-wrap: wrap;
      overflow: auto;
      justify-content: space-around;
      margin-top: 10px;
      .el-dropdown{
        display: flex !important;
        margin-bottom: 5px;
      }
    }
    .shape-wrap{
        margin: 6px;
        width: 64px;
        height: 64px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            background: rgba(239, 238, 238, 1);
        }
    }
    .img-wrap{
        .img-item{
            margin-bottom: 5px;
            width: 110px;
            height: 110px;
        }
        /deep/ .el-image__inner{
          max-width: 110px;
          max-height: 110px;
          object-fit: contain;
        }
        img {
            max-width: 110px;
            max-height: 110px;
            object-fit: contain;
        }
    }
    .inner-area {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dian {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #000;
    }
    .zhixian {
        width: 1px;
        height: 50px;
        background-color: #000;
    }
    .yuanquan {
        width: 50px;
        height: 50px;
        border: 1px solid #000;
        border-radius: 50%;
        box-sizing: border-box;
    }
    .jvxing {
        width: 50px;
        height: 50px;
        border: 1px solid #000;
        box-sizing: border-box;
    }
    .jvxing1 {
        width: 50px;
        height: 50px;
        background: #000;
        box-sizing: border-box;
    }
}
</style>
