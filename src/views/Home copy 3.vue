<template>
  <div class="home">
    <div class="clearfix">
      <div class="f-left aside clearfix">
        <div class="aside-menu f-left">
          <div class="active-menu-line"></div>
          <div
            :class="{ active: activeMenu === 0 }"
            @click="menuHandle(0, $event)"
            class="menu-item"
          >
            输入文字
          </div>
          <div
            :class="{ active: activeMenu === 1 }"
            @click="menuHandle(1, $event)"
            class="menu-item"
          >
            图形工具
          </div>
          <div
            :class="{ active: activeMenu === 2 }"
            @click="menuHandle(2, $event)"
            class="menu-item"
          >
            自定义上传
          </div>
          <div
            :class="{ active: activeMenu === 2 }"
            @click="menuHandle(2, $event)"
            class="menu-item"
          >
            自定义上传
          </div>
          <div
            :class="{ active: activeMenu === 2 }"
            @click="menuHandle(2, $event)"
            class="menu-item"
          >
            自定义上传
          </div>
        </div>
        <div class="active-menu-wrap f-left">
          <div class="active-menu-content f-left" v-show="activeMenu === 0">
            <div class="shape-wrap" @click="addToArea('输入文字')">
              <div class="inner-area">输入文字</div>
            </div>
          </div>
          <div class="active-menu-content f-left" v-show="activeMenu === 1">
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
          </div>
          <div v-show="activeMenu === 2">
            <div class="upload">
              <el-upload
                :limit="3"
                :on-exceed="handleExceed"
                multiple
                class="upload-bg"
                action
                :before-upload="beforeUpload"
              >
                <el-button
                  class="upload-button"
                  size="large"
                  plain
                  type="primary"
                  >上传本地素材</el-button
                >
              </el-upload>
              <div v-if="fileList.length" class="fileList flex1">
                <el-dropdown
                  v-for="(n, i) in fileList"
                  :key="i"
                  class="shape-wrap"
                >
                  <img :src="n" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="setBgImg('图片', n)"
                      >添加到图区</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="setBgImg('选中背景', n)"
                      >设为当前选中背景图</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="setBgImg('画布背景', n)"
                      >设为全局背景图</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- <div v-else>暂无上传</div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="f-left main">
        <div class="tool-bar">
          <div class="tool-bar-left">
            <div class="type-wrap type-wrap-huabu">
              <!-- <el-tooltip
              effect="dark"
              content="画布边框"
              placement="bottom"
              v-show="activeElem.name == '画布'"
            > -->
              <el-popover placement="bottom" trigger="click">
                <div class="flex1 flex1-item">
                  <span class="flex1-item-name">外边框：</span>
                  <el-checkbox v-model="outerBorder"></el-checkbox>
                </div>
                <div class="flex1 flex1-item">
                  <span class="flex1-item-name">大小：</span>
                  <el-input-number
                    v-model="huabuObj.borderSize"
                    @change="sizeChange($event, '外边框')"
                    :min="1"
                    :max="200"
                    size="mini"
                  ></el-input-number>
                </div>
                <div class="flex1 flex1-item">
                  <span class="flex1-item-name">颜色：</span>
                  <colorPicker
                    class="color-btn"
                    v-model="huabuObj.borderColor"
                  />
                </div>
                <div
                  slot="reference"
                  :class="{ isActive: activeElem.fontWeight === 'bold' }"
                >
                  <div>
                    <icon href="waibiankuang" />
                    <div class="icon-bottom-text">画布边框</div>
                  </div>
                </div>
              </el-popover>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip
              effect="dark"
              content="圆角"
              placement="bottom"
              v-show="
                activeElem.hasOwnProperty('borderRadius') &&
                Object.prototype.toString.call(activeElem.borderRadius) !=
                  '[object Undefined]'
              "
            > -->
              <!-- 须activeElem.rotate!==undefined, 因为计数器组件会给{}自动加上属性-->
              <el-popover placement="bottom" trigger="click">
                <el-input-number
                  v-model="huabuObj.borderRadius"
                  @change="sizeChange($event, '圆角')"
                  :min="0"
                  :max="200"
                  size="mini"
                ></el-input-number>
                <div slot="reference" class="i-text i-font">
                  <el-badge
                    :value="huabuObj.borderRadius || ''"
                    type="primary"
                    >
                    <div>
                      <icon href="yuanjiao" />
                      <div class="icon-bottom-text">画布圆角</div>
                    </div>
                    </el-badge
                  >
                </div>
              </el-popover>
            <!-- </el-tooltip> -->
            <!-- <el-tooltip
              effect="dark"
              content="画布颜色"
              placement="bottom"
              v-show="activeElem.name == '画布'"
            > -->
            <div>
              <colorPicker
                class="color-btn"
                v-model="huabuObj.backgroundColor"
                @change="colorChange($event, '画布颜色')"
              />
                <div class="icon-bottom-text">画布颜色</div>
            </div>
            <!-- </el-tooltip> -->
            </div>
            <div class="type-wrap type-wrap-wenzi">
              <el-tooltip
              v-show="activeElem.type == '输入文字'"
              effect="dark"
              content="输入文字"
              placement="bottom"
            >
              <el-input
                placeholder="输入文字"
                class="txt-input"
                size="mini"
                v-model="activeElem.text"
                clearable
              ></el-input>
            </el-tooltip>
            <el-tooltip
              v-show="
                activeElem.hasOwnProperty('fontSize') &&
                Object.prototype.toString.call(activeElem.fontSize) !=
                  '[object Undefined]'
              "
              effect="dark"
              content="字体大小"
              placement="bottom"
            >
              <el-input-number
                v-model="activeElem.fontSize"
                @change="sizeChange($event, '文字')"
                :min="1"
                :max="500"
                size="mini"
              ></el-input-number>
            </el-tooltip>
            <el-tooltip
              v-show="activeElem.type == '输入文字'"
              effect="dark"
              content="文字颜色"
              placement="bottom"
            >
              <colorPicker
                class="color-btn"
                v-model="activeElem.color"
                @change="colorChange($event, '输入文字')"
              />
            </el-tooltip>
            </div>
            <div class="fontstyle-wrap">
              <el-tooltip
              effect="dark"
              content="加粗"
              placement="bottom"
              v-show="activeElem.hasOwnProperty('fontWeight')"
            >
              <div
                @click="fontStyleHandle('fontWeight')"
                :class="{ isActive: activeElem.fontWeight === 'bold' }"
              >
                <icon href="jiacu"></icon>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="斜体"
              placement="bottom"
              v-show="activeElem.hasOwnProperty('fontStyle')"
            >
              <div
                @click="fontStyleHandle('fontStyle')"
                :class="{ isActive: activeElem.fontStyle === 'italic' }"
              >
                <icon href="xieti"></icon>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="下划线"
              placement="bottom"
              v-show="activeElem.hasOwnProperty('fontStyle')"
            >
              <div
                @click="fontStyleHandle('fontStyle')"
                :class="{ isActive: activeElem.fontStyle === 'italic' }"
              >
                <icon href="Underline"></icon>
              </div>
            </el-tooltip>
            </div>
            <div class="type-wrap type-wrap-color">
            <el-tooltip
              v-show="
                activeElem.hasOwnProperty('borderColor') &&
                activeElem.name != '画布'
              "
              effect="dark"
              content="线条颜色"
              placement="bottom"
            >
              <colorPicker
                class="color-btn"
                v-model="activeElem.borderColor"
                @change="colorChange($event, '边框')"
              />
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="背景颜色"
              placement="bottom"
              v-show="
                activeElem.hasOwnProperty('backgroundColor') &&
                activeElem.name != '画布'
              "
            >
              <el-color-picker
                show-alpha
                v-model="activeElem.backgroundColor"
                @active-change="colorChange($event, '背景')"
                @change="colorChange($event, '背景')"
                size="mini"
              />
            </el-tooltip>
            </div>
            <el-tooltip
              effect="dark"
              content="线条宽度"
              placement="bottom"
              v-show="
                activeElem.hasOwnProperty('borderSize') &&
                activeElem.name != '画布' &&
                Object.prototype.toString.call(activeElem.borderSize) !=
                  '[object Undefined]'
              "
            >
              <el-input-number
                v-model="activeElem.borderSize"
                @change="sizeChange($event, '线条宽度')"
                :min="1"
                :max="200"
                size="mini"
              ></el-input-number>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="旋转度数"
              placement="bottom"
              v-show="
                activeElem.hasOwnProperty('rotate') &&
                Object.prototype.toString.call(activeElem.rotate) !=
                  '[object Undefined]'
              "
            >
              <!-- 须activeElem.rotate!==undefined, 因为计数器组件会给{}自动加上属性-->
              <el-popover placement="bottom" trigger="click">
                <el-input-number
                  v-model="activeElem.rotate"
                  @change="sizeChange($event, '度数')"
                  :min="0"
                  :max="360"
                  size="mini"
                ></el-input-number>
                <i slot="reference" class="el-icon-refresh-right i-font"></i>
              </el-popover>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="阴影效果"
              placement="bottom"
              v-show="
                (activeElem.hasOwnProperty('shadowDirection') ||
                  activeElem.name == '输入文字') &&
                activeElem.name != '画布'
              "
            >
              <el-popover
                class="shadow-wrap"
                width="150"
                placement="right"
                trigger="click"
              >
                <!-- <div class="flex1 flex1-item"> -->
                <span>模糊程度：</span>
                <el-slider
                  width="50"
                  :min="0"
                  :max="400"
                  v-model="activeElem.shadow3"
                  @change="shadowChange($event, '3')"
                ></el-slider>
                <!-- </div>
                <div class="flex1 flex1-item">-->
                <span>左右方向：</span>
                <el-slider
                  :min="-100"
                  :max="100"
                  v-model="activeElem.shadow1"
                  @change="shadowChange($event, '1')"
                ></el-slider>
                <!-- </div>
                <div class="flex1 flex1-item">-->
                <span>上下方向：</span>
                <el-slider
                  :min="-100"
                  :max="100"
                  v-model="activeElem.shadow2"
                  @change="shadowChange($event, '2')"
                ></el-slider>
                <!-- </div> -->
                <el-switch
                  v-model="shadowDirection"
                  v-show="activeElem.hasOwnProperty('shadowDirection')"
                  active-value
                  inactive-value="inset"
                  active-text="外阴影"
                  inactive-text="内阴影"
                  @change="shadowDirectionChange"
                ></el-switch>
                <div class="flex1 flex1-item">
                  <span>阴影颜色：</span>
                  <el-color-picker
                    show-alpha
                    v-model="activeElem.shadowColor"
                    @active-change="colorChange($event, '阴影')"
                    @change="colorChange($event, '阴影')"
                    size="mini"
                  />
                </div>
                <div slot="reference" class="i-text i-font">阴影</div>
              </el-popover>
            </el-tooltip>
          </div>
          <div class="activeElem">
            <el-tooltip
              effect="dark"
              content="拖拽可调整图层"
              placement="bottom"
            >
              <el-popover width="100" placement="bottom" trigger="click">
                <vuedraggable
                  v-model="sortList"
                  @change="sortChange"
                  :options="{ animation: 300 }"
                >
                  <!-- <transition-group> -->
                  <div
                    class="tuceng-item flex1"
                    v-for="(item, index) in sortList"
                    :key="index + item.name"
                  >
                    <span>{{ item.name }}</span>
                    <div class="tuceng-item-wrap"></div>
                  </div>
                  <!-- </transition-group> -->
                </vuedraggable>
                <div slot="reference" class="i-text i-font">
                  <!-- 图层 -->
                  <icon href="tuceng"></icon>
                  </div>
              </el-popover>
            </el-tooltip>
          </div>
        </div>
        <div class="edit-area">
          <div class="clearfix">
            <span class="f-left">原点400X400</span>

            <div class="f-right">
              当前选中元素：{{ activeElem.name }}

              <el-tooltip effect="dark" content="删除" placement="right">
                <i @click="deleteElem" class="el-icon-delete"></i>
              </el-tooltip>
            </div>
          </div>
          <div
            class="pre-area juzhong"
            ref="pre_area"
            @click="gHandle($event)"
            @touchstart="gHandle($event)"
            :style="{
              borderRadius: huabuObj.borderRadius + 'px',
              border: outerBorder
                ? huabuObj.borderSize + 'px solid ' + huabuObj.borderColor
                : 0,
              boxShadow:
                huabuObj.shadow1 +
                'px ' +
                huabuObj.shadow2 +
                'px ' +
                huabuObj.shadow3 +
                'px ' +
                huabuObj.shadowColor +
                ' ' +
                huabuObj.shadowDirection,
              backgroundColor: huabuObj.backgroundColor,
              backgroundImage: 'url(' + huabuObj.backgroundImage + ')',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }"
          >
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
              @mouseup.native="mouthUp($event, item, i)"
              @touchstart.native="mouthDown($event, item, i)"
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
                v-if="item.type == '输入文字'"
                :style="{
                  fontStyle: item.fontStyle,
                  fontWeight: item.fontWeight,
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
                  transform: 'rotate(' + item.rotate + 'deg)',
                  border: item.borderSize + 'px solid ' + item.borderColor,
                  backgroundColor: item.backgroundColor,
                  backgroundImage: 'url(' + item.backgroundImage + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
                class="jvxing"
                v-if="item.type == '矩形'"
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
                  border: item.borderSize + 'px solid ' + item.borderColor,
                  backgroundColor: item.backgroundColor,
                  backgroundImage: 'url(' + item.backgroundImage + ')',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                }"
                class="jvxing1"
                v-if="item.type == '矩形1'"
              ></div>
              <img
                :style="{ transform: 'rotate(' + item.rotate + 'deg)' }"
                :src="item.src"
                v-if="item.type == '图片'"
              />
            </VueDragResize>
          </div>
          <!-- </canvas> -->
          <div class="nowelem">
            <span class="f-left"
              >X:{{ activeElem.x }},Y:{{ activeElem.y }}</span
            >
            <span class="f-right"
              >宽:{{ activeElem.w }},高:{{ activeElem.h }}</span
            >
          </div>
          <el-button
            class="createImg"
            type="primary"
            size="mini"
            plain
            @click="createImg"
            >免费下载图片</el-button
          >
        </div>
      </div>
    </div>
    <div
      style="margin-top: 30px"
      @mouseover="enter('swiper1')"
      @mouseleave="leave('swiper1')"
    >
      <swiper ref="swiper1" :options="swiperOption">
        <swiper-slide
          class="item"
          v-for="(item, index) of chinaNetGongsiLogo"
          :key="index"
        >
          <el-image
            :src="item"
            fit="contain"
            :preview-src-list="chinaNetGongsiLogo"
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <div @mouseover="enter('swiper2')" @mouseleave="leave('swiper2')">
      <swiper ref="swiper2" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of waizijutouqiyeLogo"
          :key="index"
        >
          <el-image
            :src="item"
            fit="contain"
            :preview-src-list="waizijutouqiyeLogo"
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- <div v-if="loadSuccess">
        <el-image :src="item" fit="contain" :preview-src-list="qicheLogo">
          </el-image>
    </div> -->
    <div class="img-mask" v-if="imgUrl && userDevice === 'mobile'">
      <div class="el-image-viewer__mask"></div>
      <div class="img-wrap">
        <div class="tip">长按选择保存图片到相册</div>
        <img :src="imgUrl" />
        <span @click="imgUrl = ''" class="close-btn juzhong"
          ><i class="el-icon-close"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueDragResize from 'vue-drag-resize'
import vuedraggable from 'vuedraggable'
import html2canvas from 'html2canvas'
import { chinaNetGongsiLogo, waizijutouqiyeLogo } from '../utils/data.js'
// import Tools from '../components/Tools'
import { userDevice, deepCopy } from '../utils/fun.js'

export default {
  name: 'Home',
  components: {
    VueDragResize, vuedraggable, swiper, swiperSlide
  },
  data () {
    return {
      userDevice: userDevice(),
      swiperOption: {
        loop: false,
        grabCursor: true,
        slidesPerView: 8, // 一行显示3个
        spaceBetween: 10, // 间隔30
        freeMode: true,
        speed: 1000, // 滑动速度
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        navigation: {
          nextEl: '.next',
          prevEl: '.prev'
        }
      },
      chinaNetGongsiLogo,
      waizijutouqiyeLogo,
      activeMenu: 0,
      elemList: [
      ],
      sortList: [
      ],
      fileList: [],
      activeElem: {},
      huabuObj: {
        name: '画布', type: '画布', borderColor: '#000', borderSize: 5, backgroundColor: '#fff', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '', borderRadius: 0
      },
      outerShape: '矩形',
      fontBorderShape: '',
      shapeOpts: [
        {
          value: '矩形',
          div: '矩形'
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
      gshadowColor: '',
      imgUrl: '',
      shadowDirection: ''
    }
  },
  methods: {
    menuHandle (i, e) {
      this.activeMenu = i
    },
    gHandle (e) {
      if (e.target.className === 'pre-area juzhong') {
        this.activeElem = this.huabuObj
      }
    },
    colorChange (val, type) {
      console.log(12343, val, type)
      if (type === '输入文字') {
        this.activeElem.color = val || ''
      } else if (type === '边框') {
        this.activeElem.borderColor = val || ''
      } else if (type === '背景') {
        this.activeElem.backgroundImage = ''
        this.activeElem.backgroundColor = val || ''
      } else if (type === '阴影') {
        this.activeElem.shadowColor = val || '#fff'
      }
    },
    rotateRadusChange (val) {
      this.activeElem.rotate = val
    },
    sizeChange (val, type) {
      console.log(123)
      // if (type === '文字') {
      //  this.activeElem.fontSize = val
      // } else if (type === '线条宽度') {
      //  this.activeElem.borderSize = val
      // } else if (type === '度数') {
      //  this.activeElem.rotate = val
      // }
      // else if (type === '外边框' && this.outerBorder) {
      //  const dom = document.getElementsByClassName('pre-area')[0]
      //  dom.style.border = this.outerBorderWidth + 'px solid ' + this.outerBorderColor
      // }
    },
    fontStyleHandle (type) {
      if (type === 'fontWeight') {
        this.activeElem.fontWeight === 'bold' ? this.activeElem.fontWeight = 'normal' : this.activeElem.fontWeight = 'bold'
      } else {
        this.activeElem.fontStyle === 'italic' ? this.activeElem.fontStyle = '' : this.activeElem.fontStyle = 'italic'
      }
    },
    shadowChange (val, i) {
      this.activeElem['shadow' + i] = val
    },
    shadowDirectionChange (val) {
      if (val === 'inset') {
        this.activeElem.shadowDirection = val
      } else {
        this.activeElem.shadowDirection = ''
      }
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
    },
    setBgImg (type, n) {
      console.log(type, n)
      if (type === '图片') {
        const maxIndex = this.elemList.length
        const el = { name: '图片', isActive: true, type: '图片', parentLimitation: false, w: 30, h: 30, x: 185, y: 185, zIndex: maxIndex, rotate: 0, src: n }
        this.activeElem = el
        this.elemList.push(el)
      } else if (type === '选中背景') {
        this.activeElem.backgroundColor = ''
        this.activeElem.backgroundImage = n
      } else if (type === '画布背景') {
        this.huabuObj.backgroundColor = ''
        this.huabuObj.backgroundImage = n
      }
    },
    handleExceed (files, fileList) {
      this.$message.warning(`每次限制选择 3 个文件，本次选择了 ${files.length} 个文件`)
    },
    createImg () {
      console.log(window, window.screenTop, window.screenLeft, 1)
      //   window.screenTop = 0
      //   window.screenLeft = 0
      //   window.scrollTo(0, 0)
      console.log(window.scrollX)
      const canvas = document.createElement('canvas')
      // const canva = document.getElementsByClassName('canvas_area')[0]
      const dom = document.getElementsByClassName('pre-area')[0]
      const width = dom.offsetWidth // 获取dom 宽度
      const height = dom.offsetHeight // 获取dom 高度
      const scale = 2 // 定义任意放大倍数 支持小数
      canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
      const rect = dom.getBoundingClientRect() // 获取元素相对于视口的
      console.log(rect, 'rect')
      // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取滚动轴滚动的长度
      const opts = {
        // canvas: canva,
        x: rect.left, // 绘制的dom元素相对于视口的位置
        y: rect.top,
        // scrollX: 0, // 滚动的长度
        // scrollY: 0,
        scale: scale, // 添加的scale 参数
        width: width, // dom 原始宽度
        height: height,
        useCORS: true, // 开启跨域
        dpi: window.devicePixelRatio * 2
      }
      // return
      this.$nextTick(() => {
        (window.html2canvas || html2canvas)(dom, opts).then(canvas => {
          const context = canvas.getContext('2d')
          // 关闭抗锯齿
          context.mozImageSmoothingEnabled = false
          context.msImageSmoothingEnabled = false
          context.imageSmoothingEnabled = false
          // 转成图片，生成图片地址
          console.log(this.userDevice, 1)
          if (this.userDevice === 'mobile') {
            this.imgUrl = canvas.toDataURL('image/png')
          } else {
            this.imgUrl = canvas.toDataURL('image/png')
            const a = document.createElement('a') // 生成一个a元素
            const event = new MouseEvent('click') // 创建一个单击事件
            a.download = name || 'photo' // 设置图片名称
            a.href = this.imgUrl // 将生成的URL设置为a.href属性
            a.dispatchEvent(event)
          }
        }).catch(err => {
          console.log(err, 'err')
        })
      })
    },
    sortChange () {
      this.elemList.forEach(el => {
        this.sortList.forEach((ele, i) => {
          if (el.id === ele.id) {
            el.zIndex = this.sortList.length - i - 1
          }
        })
      })
    },
    addToArea (type) {
      const maxIndex = this.elemList.length
      let el
      if (type === '输入文字') {
        el = { id: Date.now(), name: '输入文字', isActive: true, type: '输入文字', parentLimitation: false, text: '输入文字', w: 80, h: 40, x: 160, y: 180, zIndex: maxIndex, color: '#000', fontSize: 20, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', fontWeight: 'normal', fontStyle: '' }
      } else if (type === '点/圆') {
        el = { id: Date.now(), name: '点/圆', isActive: true, type: '点/圆', parentLimitation: false, w: 10, h: 10, x: 195, y: 195, zIndex: maxIndex, backgroundColor: '#000', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '直线') {
        el = { id: Date.now(), name: '直线', isActive: true, type: '直线', parentLimitation: false, w: 50, h: 2, x: 175, y: 199, zIndex: maxIndex, rotate: 0, backgroundColor: '#000', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '圆圈') {
        el = { id: Date.now(), name: '圆圈', isActive: true, type: '圆圈', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, borderColor: '#000', borderSize: 1, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '矩形') {
        el = { id: Date.now(), name: '矩形', isActive: true, type: '矩形', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, borderColor: '#000', borderSize: 1, rotate: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '矩形1') {
        el = { id: Date.now(), name: '矩形', isActive: true, type: '矩形1', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, borderColor: '#000', borderSize: 1, rotate: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '图片') {
        el = { id: Date.now(), name: '图片', isActive: true, type: '图片', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, rotate: 0, src: '' }
      }
      this.activeElem = el
      this.elemList.push(el)
      this.sortList = deepCopy(this.elemList)
      this.sortList.sort(this.compare).reverse()
    },
    compare (a, b) {
      return a.zIndex - b.zIndex
    },
    deleteElem () {
      this.elemList = this.elemList.filter(item => { return item.id !== this.activeElem.id })
      // 如果删除一个元素会造成length减一。
      this.elemList.forEach(el => {
        if (el.zIndex > this.activeElem.zIndex) {
          el.zIndex -= 1
        }
      })
      this.activeElem = {}
      this.sortList = deepCopy(this.elemList)
      this.sortList.sort(this.compare).reverse()
    },
    onActivated (e, item, i) {
    },
    mouthDown (e, item, i) {
      console.log('mouthDown', item.name, this.elemList)
      this.elemList.forEach(el => {
        el.isActive = false
      })
      item.isActive = true
      console.log('onActivated')
      this.activeElem = item
      //  if (item.area === 'tool-area' && e.left >= 0 && e.left <= 400 && e.top >= 0 && e.top <= 400) {
      //    item.parentLimitation = true
      //  }
    },
    mouthUp (e, item, i) {
    },
    onDragging (e, item) {
      //   console.log('onDragging', item.name, e, this.elemList)
      item.x = e.left
      item.y = e.top
      item.w = e.width
      item.h = e.height
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
      //   console.log('changeSize', item.name, e, this.elemList)
      item.x = e.left
      item.y = e.top
      item.w = e.width
      item.h = e.height
    },
    enter (str) {
      this.$refs[str].swiper.autoplay.stop()
    },
    leave (str) {
      this.$refs[str].swiper.autoplay.start()
    }
  },
  mounted () {
    this.activeElem = this.huabuObj
  }
}

</script>

<style lang="less" scoped>
.home {
  background-color: #f6f6f6;
  width: 1000px;
  margin: 0 auto;
}
.img-mask {
  position: fixed;
  margin: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1999;
  .el-image-viewer__mask {
    z-index: -1;
  }
  .img-wrap {
    position: absolute;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    .tip {
      font-size: 14px;
      line-height: 28px;
      color: #000;
    }
    img {
      width: 80%;
    }
    .close-btn {
      width: 40px;
      height: 40px;
      font-size: 24px;
      color: #fff;
      background-color: #606266;
      border-radius: 50%;
      position: absolute;
      bottom: -40px !important;
      left: 50% !important;
      transform: translateX(-50%);
    }
  }
}
.aside {
  width: 310px;
  overflow: auto;
  border-right: 1px solid #ebebeb;
  box-sizing: border-box;
  background: #fff;
}
.aside-menu {
  width: 40px;
  color: #323233;
  background-color: #f7f8fa;
  cursor: pointer;
  .menu-item {
    padding: 5px;
    &.active {
      position: relative;
      background: #fff;
    }
    &.active::after {
      content: "";
      width: 4px;
      height: 50px;
      background: #409eff;
      position: absolute;
      left: 0;
      top: 50%;
      border-radius: 2px;
      transform: translateY(-50%);
    }
  }
}
.active-menu-wrap {
  width: 269px;
  padding: 15px;
  box-sizing: border-box;
}
.active-menu-content {
  display: flex;
  flex-wrap: wrap;
}
.shape-wrap {
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
  img {
    max-width: 64px;
    max-height: 64px;
  }
}
.el-upload,
.upload-button {
  width: 100% !important;
}
.fileList {
  flex-wrap: wrap;
  .el-dropdown {
    display: flex !important;
  }
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  width: 690px;
}
.tool-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
  // height: 48px;
  padding: 10px 0;
  box-sizing: border-box;
  position: relative;
  .el-tooltip {
    // margin-left: 10px;
    cursor: pointer;
  }
  .type-wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    border-right: 1px solid #ebebeb;
    &-huabu{
      width: 100px;
      justify-content: space-between;
    }
    &-wenzi{
      width: 240px;
    }
    .fontstyle-wrap{
      display: flex;
      border: 1px solid #ebebeb;
      .iconbox{
        padding: 3px;
      }
    }
    &-color{
      width: 100px;
    }
  }
  .icon-bottom-text{
    font-size: 12px;
    line-height: 1;
  }
  .isActive {
    border: 1px solid #e6e6e6;
  }
  .shadow-wrap {
    font-size: 12px;
  }
  .activeElem {
    display: flex;
    align-items: center;
  }
}
.color-btn /deep/ .colorBtn{
  width: 21px !important;
  height: 21px !important;
  border: 1px solid #ccc;
  z-index: 99 !important;
}
.color-btn /deep/ .box{
    z-index: 99 !important;
}
.tuceng-item {
  cursor: pointer;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  &:hover {
    color: #409eff;
  }
  &-wrap {
    max-height: 30px;
    max-width: 50px;
  }
}
.flex1-item {
  margin: 5px 0;
  // justify-content: space-between;
  align-items: center;
}
.flex1-item-name {
  min-width: 60px;
  text-align: right;
}
.tool-bar-left {
  display: flex;
  align-items: center;
}
.edit-area {
  margin-top: 30px;
}
.canvas_area {
  width: 400px;
  height: 400px;
}
.pre-area {
  width: 400px;
  height: 400px;
  background-color: #fff;
  word-break: break-all;
  font-size: 50px;
  line-height: 1;
  position: relative;
  box-sizing: border-box;
}
.vdr {
  div {
    display: flex;
    width: 100%;
    height: 100%;
  }
  img {
    display: block;
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
.item {
  min-height: 30px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  .el-slider {
    width: 200px;
  }
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
.jvxing {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
}
.jvxing1 {
  width: 50px;
  height: 50px;
  background: #000;
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
.swiper-slide {
  height: 116.5px;
  background: #fff;
}
</style>
