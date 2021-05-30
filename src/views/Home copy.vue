<template>
  <div class="home clearfix">
    <div class="f-left">
      <div class="edit-wrap-left edit-wrap block">
        <div class="edit-title">工具栏</div>

        <Tools class="edit-content" @addTool="addTool" />
      </div>
    </div>

    <div class="middle f-left">
      <div class="clearfix">
        <span class="f-left">400X400</span>

        <div class="f-right">
          当前选中元素：{{ activeElem.name }}

          <el-button type="danger" size="mini" @click="deleteElem"
            >撤销</el-button
          >
        </div>
      </div>

      <div class="pre-area" ref="pre_area">
        <VueDragResize
          v-for="(item, i) in elemList"
          :w="item.w"
          :h="item.h"
          :x="item.x"
          :y="item.y"
          :z="item.zIndex"
          :isActive="item.isActive"
          :minw="1"
          :minh="1"
          :key="i + item.type"
          :parentLimitation="item.parentLimitation"
          @dragging="onDragging($event, item, i)"
          @deactivated="onDeactivated($event, item)"
          @resizing="changeSize($event, item, i)"
          @activated="onActivated($event, item, i)"
          @mousedown.native="mouthDown($event, item, i)"
          @touchstart.native="mouthDown($event, item, i)"
          @mouseup.native="mouthUp($event, item, i)"
        >
          <div
            :style="{
              boxShadow:
                item.shadow1 +
                'px ' +
                item.shadow2 +
                'px ' +
                item.shadow3 +
                'px ' +
                item.shadowColor +
                ' ' +
                item.shadowDirection,
              transform: 'rotate(' + item.rotate + 'deg)',
              backgroundColor: item.backgroundColor,
              backgroundImage: 'url(' + item.backgroundImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
            class="dian"
            v-if="item.type == '点/圆'"
          ></div>

          <div
            :style="{
              boxShadow:
                item.shadow1 +
                'px ' +
                item.shadow2 +
                'px ' +
                item.shadow3 +
                'px ' +
                item.shadowColor +
                ' ' +
                item.shadowDirection,
              transform: 'rotate(' + item.rotate + 'deg)',
              backgroundColor: item.backgroundColor,
              backgroundImage: 'url(' + item.backgroundImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
            class="zhixian"
            v-if="item.type == '直线'"
          ></div>

          <div
            class="inner-area"
            v-if="item.type == '文字输入区'"
            :style="{
              textShadow:
                item.shadow1 +
                'px ' +
                item.shadow2 +
                'px ' +
                item.shadow3 +
                'px ' +
                item.shadowColor,
              transform: 'rotate(' + item.rotate + 'deg)',
              color: item.color,
              fontSize: item.fontSize + 'px',
              backgroundColor: item.backgroundColor,
              backgroundImage: 'url(' + item.backgroundImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
            {{ item.text }}
          </div>

          <div
            :style="{
              boxShadow:
                item.shadow1 +
                'px ' +
                item.shadow2 +
                'px ' +
                item.shadow3 +
                'px ' +
                item.shadowColor +
                ' ' +
                item.shadowDirection,
              transform: 'rotate(' + item.rotate + 'deg)',
              border: item.borderSize + 'px solid ' + item.borderColor,
              backgroundColor: item.backgroundColor,
              backgroundImage: 'url(' + item.backgroundImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
            class="yuanquan"
            v-if="item.type == '圆圈'"
          ></div>

          <div
            :style="{
              boxShadow:
                item.shadow1 +
                'px ' +
                item.shadow2 +
                'px ' +
                item.shadow3 +
                'px ' +
                item.shadowColor +
                ' ' +
                item.shadowDirection,
              border: item.borderSize + 'px solid ' + item.borderColor,
              transform: 'rotate(' + item.rotate + 'deg)',
              backgroundColor: item.backgroundColor,
              backgroundImage: 'url(' + item.backgroundImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
            class="zhengfangxing"
            v-if="item.type == '正方形'"
          ></div>
        </VueDragResize>
      </div>

      <div class="nowelem">
        <span class="f-left">X:{{ activeElem.x }},Y:{{ activeElem.y }}</span>

        <span class="f-right">宽:{{ activeElem.w }},高:{{ activeElem.h }}</span>
      </div>

      <div></div>

      <el-button
        class="createImg"
        type="primary"
        size="mini"
        plain
        @click="createImg"
        >免费下载图片</el-button
      >

      <div class="edit-area-bottom block">
        <div class="edit-title">全局处理区</div>

        <div class="edit-content">
          <div class="item">
            <div class="item-name">形状：</div>

            <el-select
              v-model="outerShape"
              @change="shapeChange($event, 'outerBorder')"
              placeholder="选择形状"
              size="mini"
            >
              <el-option
                v-for="item in shapeOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="item">
            <div class="item-name">背景颜色：</div>

            <el-color-picker
              v-model="color"
              @change="colorChange($event, '全局背景颜色')"
              size="mini"
            />

            <!-- <div class="item-name">背景图：</div> -->

            <!-- <el-button size="mini" @click="colorChange($event, '全局背景图片')" plain type="primary">使用</el-button> -->
          </div>

          <div class="item">
            <div class="item-name">
              外边框：

              <el-checkbox
                v-model="outerBorder"
                @change="borderChange($event, '外边框')"
              ></el-checkbox>
            </div>

            <div class="item-name">大小：</div>

            <el-input-number
              v-model="outerBorderWidth"
              @change="sizeChange($event, '外边框')"
              :min="1"
              :max="200"
              size="mini"
            ></el-input-number>

            <div class="item-name">颜色：</div>

            <el-color-picker
              v-model="outerBorderColor"
              @change="colorChange($event, '全局边框')"
              size="mini"
            />
          </div>

          <!-- <el-form-item label="阴影效果："> -->

          <div class="item">
            <div class="item-name">阴影（模糊程度）：</div>

            <el-slider
              :min="0"
              :max="400"
              v-model="gshadow3"
              @change="gshadowChange"
            ></el-slider>
          </div>

          <div class="item">
            <div class="item-name">阴影（左右方向）：</div>

            <el-slider
              :min="-100"
              :max="100"
              v-model="gshadow2"
              @change="gshadowChange"
            ></el-slider>
          </div>

          <div class="item">
            <div class="item-name">阴影（上下方向）：</div>

            <el-slider
              :min="-100"
              :max="100"
              v-model="gshadow1"
              @change="gshadowChange"
            ></el-slider>
          </div>

          <div class="item">
            <div class="item-name">阴影颜色：</div>

            <el-color-picker
              v-model="gshadowColor"
              @change="colorChange($event, '全局阴影')"
              size="mini"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="edit-wrap-right f-left">
      <div class="edit-wrap block">
        <div class="edit-title">操作栏</div>

        <el-form
          class="edit-content clearfix"
          :label-position="'right'"
          label-width="85px"
        >
          <el-form-item
            v-if="activeElem.type == '文字输入区'"
            label="输入文字："
          >
            <el-input
              placeholder="输入文字"
              class="txt-input"
              size="mini"
              v-model="activeElem.text"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item
            label="字体颜色："
            v-if="activeElem.type == '文字输入区'"
          >
            <el-color-picker
              v-model="activeElem.color"
              @change="colorChange($event, '文字')"
              size="mini"
            />
          </el-form-item>

          <el-form-item
            label="颜色："
            v-if="activeElem.hasOwnProperty('borderColor')"
          >
            <el-color-picker
              v-model="activeElem.borderColor"
              @change="colorChange($event, '边框')"
              size="mini"
            />
          </el-form-item>

          <el-form-item
            label="背景颜色："
            v-if="activeElem.hasOwnProperty('backgroundColor')"
          >
            <el-color-picker
              v-model="activeElem.backgroundColor"
              @change="colorChange($event, '背景')"
              size="mini"
            />
          </el-form-item>

          <el-form-item
            label="线条宽度："
            v-if="activeElem.hasOwnProperty('borderSize')"
          >
            <el-input-number
              v-model="activeElem.borderSize"
              @change="sizeChange($event, '线条宽度')"
              :min="1"
              :max="200"
              size="mini"
            ></el-input-number>
          </el-form-item>

          <el-form-item
            label="字体大小："
            v-if="activeElem.hasOwnProperty('fontSize')"
          >
            <el-input-number
              v-model="activeElem.fontSize"
              @change="sizeChange($event, '文字')"
              :min="1"
              :max="500"
              size="mini"
            ></el-input-number>
          </el-form-item>

          <!-- <el-form-item label="文字类型：" v-if="activeElem.type=='文字输入区'">

            <el-select

              v-model="fontBorderShape"

              @change="fontChange"

              placeholder="选择形状"

              size="mini"

            >

              <el-option

                v-for="item in fontOpts"

                :key="item.value"

                :label="item.label"

                :value="item.value"

              ></el-option>

            </el-select>

          </el-form-item>-->

          <el-form-item
            label="旋转度数："
            v-if="activeElem.hasOwnProperty('rotate')"
          >
            <el-input-number
              v-model="activeElem.rotate"
              @change="sizeChange($event, '度数')"
              :min="0"
              :max="360"
              size="mini"
            ></el-input-number>
          </el-form-item>

          <el-form-item
            label="阴影效果："
            v-if="activeElem.hasOwnProperty('shadowColor')"
          >
            <el-slider
              :min="0"
              :max="200"
              v-model="activeElem.shadow3"
              @change="shadowChange($event, '3')"
            ></el-slider>

            <el-slider
              :min="-100"
              :max="100"
              v-model="activeElem.shadow1"
              @change="shadowChange($event, '1')"
            ></el-slider>

            <el-slider
              :min="-100"
              :max="100"
              v-model="activeElem.shadow2"
              @change="shadowChange($event, '2')"
            ></el-slider>

            <el-switch
              v-if="activeElem.hasOwnProperty('shadowDirection')"
              v-model="activeElem.shadowDirection"
              active-value
              inactive-value="inset"
              active-text="外阴影"
              inactive-text="内阴影"
              @change="shadowDirectionChange"
            ></el-switch>

            <el-form-item label="阴影颜色：">
              <el-color-picker
                v-model="activeElem.shadowColor"
                @change="colorChange($event, '阴影')"
                size="mini"
              />
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>

      <div class="upload-area block">
        <div class="edit-title">
          <span>图片上传/设为全局或者选中背景图</span>
        </div>

        <el-upload
          :limit="3"
          :on-exceed="handleExceed"
          multiple
          class="upload-bg"
          action
          :before-upload="beforeUpload"
        >
          <el-button size="mini" plain type="primary">点击上传</el-button>
        </el-upload>
        <div v-if="fileList.length" class="fileList">
          <el-dropdown v-for="(n, i) in fileList" :key="i" class="fileList">
            <img :src="n" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="setBgImg('选中', n)"
                >设为当前选中背景图</el-dropdown-item
              >
              <el-dropdown-item @click.native="setBgImg('全局', n)"
                >设为全局背景图</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div v-else>暂无上传</div> -->
      </div>
    </div>
    <div class="footer">
      <a href="https://touxianglogo.com" target="_blank">头像logo网</a
      ><a href="https://beian.miit.gov.cn/" target="_blank">
        豫ICP备2021007008号</a
      >
      Copyright © 2021 touxianglogo.com, 版权所有
    </div>
  </div>
</template>

<script>

import VueDragResize from 'vue-drag-resize'
import html2canvas from 'html2canvas'
import Tools from '../components/Tools'
export default {
  name: 'Home',
  components: {
    VueDragResize, Tools
  },
  data () {
    return {
      elemList: [
        { name: '文字输入区', isActive: true, type: '文字输入区', parentLimitation: true, text: '文字输入区', w: 80, h: 40, x: 150, y: 150, zIndex: 1, color: '#000', fontSize: 20, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000' },
        { name: '文字输入区', isActive: false, type: '文字输入区', area: 'tool-area', text: '文字输入区', parentLimitation: true, w: 80, h: 40, x: -130, y: 39, zIndex: 1, color: '#000', fontSize: 20, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000' },
        { name: '点/圆', isActive: false, type: '点/圆', area: 'tool-area', parentLimitation: false, w: 10, h: 10, x: -100, y: 98, zIndex: 1, backgroundColor: '#000', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' },
        { name: '直线', isActive: false, type: '直线', area: 'tool-area', parentLimitation: false, w: 50, h: 2, x: -110, y: 141, zIndex: 1, rotate: 0, backgroundColor: '#000', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' },
        { name: '圆圈', isActive: false, type: '圆圈', area: 'tool-area', parentLimitation: false, w: 30, h: 30, x: -110, y: 168, zIndex: 1, borderColor: '#000', borderSize: 1, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' },
        { name: '正方形', isActive: false, type: '正方形', area: 'tool-area', parentLimitation: false, w: 30, h: 30, x: -110, y: 205, zIndex: 1, borderColor: '#000', borderSize: 1, rotate: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      ],
      fileList: [],
      maxIndex: 1,
      activeElem: {},
      outerShape: '正方形',
      fontBorderShape: '',
      shapeOpts: [
        {
          value: '正方形',
          div: '正方形'
        },
        {
          value: '圆形',
          div: '圆形'
        }
      ],
      fontBorderShapeOpts: [
        {
          value: '圆形',
          div: '圆形'
        }, {
          value: '方形',
          div: '方形'
        }
      ],
      fontOpts: [
        {
          value: '常规',
          div: '常规'
        }, {
          value: '微软雅黑',
          div: '微软雅黑'
        }, {
          value: '宋体',
          div: '宋体'
        }, {
          value: '楷体',
          div: '楷体'
        }, {
          value: '隶书',
          div: '隶书'
        }
      ],
      color: '#fff',
      outerBorder: false,
      outerBorderWidth: 5,
      outerBorderColor: '#000',
      gshadow1: 0, // 全局阴影
      gshadow2: 0,
      gshadow3: 0,
      gshadowColor: ''
    }
  },
  methods: {
    colorChange (val, type) {
      if (type === '文字输入区') {
        this.activeElem.color = val
      } else if (type === '边框') {
        this.activeElem.borderColor = val
      } else if (type === '背景') {
        this.activeElem.backgroundImage = ''
        this.activeElem.backgroundColor = val
      } else if (type === '阴影') {
        this.activeElem.shadowColor = val
      } else if (type === '全局背景颜色') {
        const dom = document.getElementsByClassName('pre-area')[0]
        dom.style.backgroundImage = ''
        dom.style.backgroundColor = val
      } else if (type === '全局边框') {
        const dom = document.getElementsByClassName('pre-area')[0]
        dom.style.border = this.outerBorderWidth + 'px solid ' + this.outerBorderColor
      } else if (type === '全局阴影') {
        const dom = document.getElementsByClassName('pre-area')[0]
        dom.style.boxShadow = this.gshadow1 + 'px ' + this.gshadow2 + 'px ' + this.gshadow3 + 'px ' + this.gshadowColor + ' inset'
      }
    },
    rotateRadusChange (val) {
      this.activeElem.rotate = val
    },
    sizeChange (val, type) {
      if (type === '文字') {
        this.activeElem.fontSize = val
      } else if (type === '线条宽度') {
        this.activeElem.borderSize = val
      } else if (type === '度数') {
        this.activeElem.rotate = val
      } else if (type === '外边框') {
        const dom = document.getElementsByClassName('pre-area')[0]
        dom.style.border = this.outerBorderWidth + 'px solid ' + this.outerBorderColor
      }
    },
    shapeChange (val, type) {
      console.log(val)
      if (type === 'outerBorder') {
        const dom = document.getElementsByClassName('pre-area')[0]
        if (val === '圆形') {
          dom.style.width = '400px'
          dom.style.height = '400px'
          dom.style.borderRadius = '50%'
        } else if (val === '正方形') {
          dom.style.width = '400px'
          dom.style.height = '400px'
          dom.style.borderRadius = ''
        }
      } else if (type === 'fontBorder') {
        const dom = document.getElementsByClassName('inner-area')[0]
        if (val === '圆形') {
          dom.style.borderRadius = '50%'
        } else if (val === '方形') {
          dom.style.borderRadius = ''
        }
      }
    },
    fontChange (val) {
      const dom = document.getElementsByClassName('pre-area')[0]
      if (val === '常规') {
        dom.style.fontFamily = ''
      } else if (val === '微软雅黑') {
        dom.style.fontFamily = 'Microsoft YaHei'
      } else if (val === '宋体') {
        dom.style.fontFamily = 'SimSun'
      } else if (val === '楷体') {
        dom.style.fontFamily = 'KaiTi'
      } else if (val === '隶书') {
        dom.style.fontFamily = 'LiSu'
      }
    },
    borderChange (bool, type) {
      if (type === '外边框') {
        const dom = document.getElementsByClassName('pre-area')[0]
        if (bool) {
          dom.style.border = this.outerBorderWidth + 'px solid ' + this.outerBorderColor
        } else {
          dom.style.border = ''
        }
      }
    },
    shadowChange (val, i) {
      this.activeElem['shadow' + i] = val
    },
    gshadowChange () {
      const dom = document.getElementsByClassName('pre-area')[0]
      dom.style.boxShadow = this.gshadow1 + 'px ' + this.gshadow2 + 'px ' + this.gshadow3 + 'px ' + this.gshadowColor + ' inset'
    },
    shadowDirectionChange (val) {
      console.log(val)
      this.activeElem.shadowDirection = val
      console.log(this.activeElem)
    },
    beforeUpload (file) {
      console.log(file, 'file')
      if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg') {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.fileList.push(e.target.result)
      }
      console.log(this.fileList, 'fileList')
    },
    setBgImg (type, n) {
      console.log(type, n)
      if (type === '选中') {
        this.activeElem.backgroundColor = ''
        this.activeElem.backgroundImage = n
      } else if (type === '全局') {
        const dom = document.getElementsByClassName('pre-area')[0]
        dom.style.backgroundImage = 'url(' + n + ')'
        dom.style.backgroundSize = '100% 100%'
        dom.style.backgroundRepeat = 'no-repeat'
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`每次限制选择 3 个文件，本次选择了 ${files.length} 个文件`)
    },
    createImg () {
      window.scrollTo(0, 0)
      //   console.log(window.scrollX)
      const dom = document.getElementsByClassName('pre-area')[0]
      const opts = {
        useCORS: true // 【重要】开启跨域配置
        // scrollX: -7.5,
        // width: dom.clientWidth, // dom 原始宽度
        // height: dom.clientHeight,
        // scrollY: -window.scrollY,
        // scrollX: 0
      }
      this.$nextTick(() => {
        (window.html2canvas || html2canvas)(dom, opts).then(canvas => {
          // 转成图片，生成图片地址
          this.imgUrl = canvas.toDataURL('image/png')
          const a = document.createElement('a') // 生成一个a元素
          const event = new MouseEvent('click') // 创建一个单击事件
          a.download = name || 'photo' // 设置图片名称
          a.href = this.imgUrl // 将生成的URL设置为a.href属性
          a.dispatchEvent(event)
        }).catch(err => {
          console.log(err, 'err')
        })
      })
    },
    addTool (type) {
      let el
      if (type === '文字输入区') {
        el = { name: '文字输入区', isActive: true, type: '文字输入区', area: 'tool-area', text: '文字输入区', parentLimitation: true, w: 80, h: 40, x: -130, y: 39, zIndex: 1, color: '#000', fontSize: 20, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000' }
      } else if (type === '点/圆') {
        el = { name: '点/圆', isActive: true, type: '点/圆', area: 'tool-area', parentLimitation: false, w: 10, h: 10, x: -100, y: 98, zIndex: 1, backgroundColor: '#000', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '直线') {
        el = { name: '直线', isActive: true, type: '直线', area: 'tool-area', parentLimitation: false, w: 50, h: 2, x: -110, y: 141, zIndex: 1, rotate: 0, backgroundColor: '#000', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '圆圈') {
        el = { name: '圆圈', isActive: true, type: '圆圈', area: 'tool-area', parentLimitation: false, w: 30, h: 30, x: -110, y: 168, zIndex: 1, borderColor: '#000', borderSize: 1, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '正方形') {
        el = { name: '正方形', isActive: true, type: '正方形', area: 'tool-area', parentLimitation: false, w: 30, h: 30, x: -110, y: 205, zIndex: 1, borderColor: '#000', borderSize: 1, rotate: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      }
      this.elemList.push(el)
    },
    deleteElem () {
      console.log(this.elemList, 1)
      this.elemList.splice(this.activeIndex, 1)
      console.log(this.elemList, 2)
    },
    onActivated (e, item, i) {
    },
    mouthDown (e, item, i) {
      console.log('mouthDown', item.name, this.elemList)
      this.elemList.forEach(el => {
        el.isActive = false
      })
      item.isActive = true
      this.maxIndex += 1
      item.zIndex = this.maxIndex
      this.activeIndex = i
      console.log('onActivated')
      this.activeElem = item
      //  if (item.area === 'tool-area' && e.left >= 0 && e.left <= 400 && e.top >= 0 && e.top <= 400) {
      //    item.parentLimitation = true
      //  }
    },
    mouthUp (e, item, i) {
    },
    onDragging (e, item) {
      console.log('onDragging', item.name, e, this.elemList)
      item.x = e.left
      item.y = e.top
      item.w = e.width
      item.h = e.height
      if (item.area === 'tool-area' && e.left >= 0 && e.left <= 400 && e.top >= 0 && e.top <= 400) {
        item.parentLimitation = true
      }
    },
    onDeactivated (e, item) {
      // console.log(e, item, 'onDeactivated')
      item.isActive = false
      //  if (item.area === 'tool-area' && e.left >= 0 && e.left <= 400 && e.top >= 0 && e.top <= 400) {
      //    item.parentLimitation = true
      //    this.elemList.push(Object.assign(item))
      //  }
    },
    changeSize (e, item) {
      // 当内容超出轮廓线时会无法缩放，此时出发一次点击即可缩放，原因不知
      console.log('changeSize', item.name, e, this.elemList)
      item.x = e.left
      item.y = e.top
      item.w = e.width
      item.h = e.height
    }
  }
}
</script>

<style lang="less">
.home {
  background-color: #f6f6f6;
  width: 960px;
  margin: 0 auto;
}
.pre-area {
  width: 400px;
  height: 400px;
  background-color: #fff;
  word-break: break-all;
  // margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  line-height: 1;
  position: relative;
  box-sizing: border-box;
  .area {
    position: absolute;
  }
  .area1 {
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
  }
}
.vdr {
  div {
    width: 100%;
    height: 100%;
  }
}
.createImg {
  margin-top: 20px;
}
.nowelem {
  text-align: left;
}
.edit-wrap-left {
  margin: 23px 10px 0 0;
}
.edit-wrap-right {
  margin: 23px 0 0 10px;
}
.block {
  background-color: #fff;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
}
.edit-wrap {
  width: 270px;
  min-height: 400px;
}
.edit-title {
  font-size: 16px;
  padding: 5px;
  border-bottom: 1px solid #ebebeb;
}
.edit-content {
  padding: 10px;
}
.item {
  min-height: 30px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  .el-slider {
    width: 200px;
  }
}
.item-name {
  font-size: 14px;
  // width: 80px;
  text-align: right;
  margin-left: 10px;
}
.txt-input {
  width: 100px !important;
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
}
.zhengfangxing {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
}
.upload-area {
  width: 270px;
  margin-top: 23px;
  min-height: 170px;
  img {
    max-width: 250px;
    height: 50px;
    margin: 5px;
  }
  .fileList {
    display: flex;
    flex-wrap: wrap;
  }
}
.el-form-item {
  margin-bottom: 0 !important;
}
.el-form-item__content {
  text-align: left;
  line-height: 30px !important;
}
.el-upload-list {
  display: none;
}
</style>
