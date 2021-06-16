<template>
  <div class="home">
    <div class="qrcode">
      <img src="@/assets/img/m.png">
      <div>手机浏览器扫一扫，手机使用本站</div>
    </div>
    <div class="clearfix">
      <div class="f-left aside clearfix">
        <div class="aside-menu f-left">
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
            头像素材
          </div>
          <div
            :class="{ active: activeMenu === 3 }"
            @click="menuHandle(3, $event)"
            class="menu-item"
          >
            自定义上传
          </div>
          <!-- <div
            :class="{ active: activeMenu === 3 }"
            @click="menuHandle(3, $event)"
            class="menu-item"
          >
            自定义上传
          </div> -->
        </div>
        <div class="active-menu-wrap f-left">
          <div class="active-menu-content" v-show="activeMenu === 0">
            <div class="padding-wrap">
              <div class="shape-wrap" @click="addToArea('输入文字')">
                <div class="inner-area">输入文字</div>
              </div>
            </div>
          </div>
          <div class="active-menu-content" v-show="activeMenu === 1">
            <div class="padding-wrap">
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
          </div>
          <div class="active-menu-content" v-show="activeMenu === 2">
              <!-- <img v-for="n in meititouxiang" :key="n.src" :src="n.src"> -->
            <div class="padding-wrap sucaiku">
              <img @click="selectImg(n)" v-for="(n, i) in meititouxiang" :key="i" v-lazy="n.src">
              <!-- <div v-for="(n, i) in meititouxiang" :key="i">
              <el-image @click="selectImg(n)" :src="n.src" lazy></el-image>
              </div> -->
            </div>
          </div>
          <div v-show="activeMenu === 3">
            <div class="padding-wrap">
            <div class="upload">
              <el-upload
                :limit="3"
                :on-exceed="handleExceed"
                multiple
                class="upload-bg"
                action
                :before-upload="beforeUpload"
              >
                <el-button class="upload-button" size="large" plain type="primary">上传本地素材</el-button>
              </el-upload>
              <div v-if="fileList.length" class="fileList flex1">
                <el-dropdown v-for="(n,i) in fileList" :key="i" class="shape-wrap">
                  <img :src="n" />
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="setBgImg('图片', n)">添加到图区</el-dropdown-item>
                    <el-dropdown-item @click.native="setBgImg('选中背景', n)">设为当前选中背景图</el-dropdown-item>
                    <el-dropdown-item @click.native="setBgImg('底图背景', n)">设为全局背景图</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- <div v-else>暂无上传</div> -->
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-left main">
        <div class="tool-bar">
          <!-- 工具栏 -->
          <div class="tool-bar-left">
            <!-- 画布工具 -->
            <div class="type-wrap type-wrap-huabu">
              <!-- <el-tooltip
              effect="dark"
              content="画布边框"
              placement="bottom"
              v-show="activeElem.name == '画布'"
            > -->
              <el-popover placement="bottom" trigger="click">
                <!-- <div class="flex1 flex1-item">
                  <span class="flex1-item-name">外边框：</span>
                  <el-checkbox v-model="outerBorder"></el-checkbox>
                </div> -->
                <div class="flex1 flex1-item">
                  <span class="flex1-item-name">大小：</span>
                  <el-input-number
                    v-model="huabuObj.borderSize"
                    @change="sizeChange($event, '画布边框')"
                    :min="0"
                    :max="200"
                    size="mini"
                  ></el-input-number>
                </div>
                <div class="flex1 flex1-item">
                  <span class="flex1-item-name">颜色：</span>
                  <el-color-picker
                    show-alpha
                    v-model="huabuObj.borderColor"
                    @active-change="colorChange($event, '画布边框')"
                    @change="colorChange($event, '画布边框')"
                    size="mini"
                    :predefine="preColor"
                  />
                  <!-- <colorPicker
                    class="color-btn"
                    v-model="huabuObj.borderColor"
                  /> -->
                </div>
                <div
                  slot="reference"
                >
                  <div :class="{ 'huabu-isActive': huabuObj.borderSize > 0}" class="huabu-item">
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
                    <div :class="{ 'huabu-isActive': huabuObj.borderRadius > 0}" class="huabu-item">
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
            <div :class="{ 'huabu-isActive': huabuObj.backgroundColor}" class="huabu-item">
              <!-- <colorPicker
                class="color-btn"
                v-model="huabuObj.backgroundColor"
                @change="colorChange($event, '画布颜色')"
              /> -->
              <el-color-picker
                show-alpha
                v-model="huabuObj.backgroundColor"
                @active-change="colorChange($event, '画布颜色')"
                @change="colorChange($event, '画布颜色')"
                size="mini"
                :predefine="preColor"
              />
              <div class="icon-bottom-text">画布颜色</div>
            </div>
            <!-- </el-tooltip> -->
            </div>
            <!-- 文字工具 -->
            <div class="type-wrap type-wrap-wenzi">
              <div class="type-wrap-wenzi-top">
              <el-tooltip
              effect="dark"
              content="输入文字"
              placement="bottom"
            >
              <!-- :disabled="activeElem.type!='输入文字'" -->
              <el-input
                :disabled="activeElem.type!='输入文字'"
                placeholder="输入文字"
                class="txt-input"
                size="mini"
                v-model="activeElem.text"
                clearable
              ></el-input>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="字体大小"
              placement="bottom"
            >
              <!-- :disabled="activeElem.type!='输入文字'" -->
              <el-input-number
                :disabled="activeElem.type!='输入文字'"
                v-model="activeElem.fontSize"
                @change="sizeChange($event, '文字')"
                :min="1"
                :max="500"
                size="mini"
              ></el-input-number>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="文字颜色"
              placement="bottom"
            >
              <!-- :disabled="activeElem.type!='输入文字'" -->
              <el-color-picker
                show-alpha
                v-model="activeElem.color"
                @active-change="colorChange($event, '输入文字')"
                @change="colorChange($event, '输入文字')"
                size="mini"
                :predefine="preColor"
                :disabled="activeElem.type!='输入文字'"
              />
            </el-tooltip>
            </div>
            <!-- 文字样式，加粗/斜体等 -->
            <div class="fontstyle-wrap" :class="{'disabled':activeElem.type!='输入文字'}">
              <el-tooltip
                effect="dark"
                content="加粗"
                placement="bottom"
              >
                <!-- :disabled="activeElem.type!='输入文字'" -->
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
            >
              <!-- :disabled="activeElem.type!='输入文字'" -->
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
            >
              <!-- :disabled="activeElem.type!='输入文字'" -->
              <div
                @click="fontStyleHandle('underline')"
                :class="{ isActive: activeElem.textDecoration === 'underline' }"
              >
                <icon href="Underline"></icon>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除线"
              placement="bottom"
            >
              <!-- :disabled="activeElem.type!='输入文字'" -->
              <div
                @click="fontStyleHandle('line-through')"
                :class="{ isActive: activeElem.textDecoration === 'line-through' }"
              >
                <icon href="shanchuxian"></icon>
              </div>
            </el-tooltip>
            </div>
            <el-tooltip
              effect="dark"
              content="阴影效果"
              placement="bottom"
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
                <div slot="reference" style="font-size:14px;padding:5px 10px;">文字阴影</div>
              </el-popover>
            </el-tooltip>
            <!-- 形状工具 -->
            </div>
            <div class="type-wrap type-wrap-shape">
              <!-- <div> -->
                <el-tooltip
                  effect="dark"
                  content="线条颜色"
                  placement="bottom"
                >
                  <!-- :disabled="!activeElem.hasOwnProperty('borderColor')" -->
                  <el-color-picker
                    show-alpha
                    v-model="activeElem.borderColor"
                    @active-change="colorChange($event, '边框')"
                    @change="colorChange($event, '边框')"
                    size="mini"
                    :predefine="preColor"
                    :disabled="!activeElem.hasOwnProperty('borderColor')"
                  />
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  content="背景颜色"
                  placement="bottom"
                >
                  <!-- :disabled="!activeElem.hasOwnProperty('backgroundColor')" -->
                  <el-color-picker
                    show-alpha
                    v-model="activeElem.backgroundColor"
                    @active-change="colorChange($event, '背景')"
                    @change="colorChange($event, '背景')"
                    size="mini"
                    :predefine="preColor"
                    :disabled="!activeElem.hasOwnProperty('backgroundColor')"
                  />
                </el-tooltip>
              <!-- </div> -->
              <el-tooltip
                effect="dark"
                content="线条宽度"
                placement="bottom"
              >
              <!-- :disabled="!activeElem.hasOwnProperty('borderSize')||
                Object.prototype.toString.call(activeElem.borderSize) ===
                '[object Undefined]'" -->
                <el-input-number
                  v-model="activeElem.borderSize"
                  @change="sizeChange($event, '线条宽度')"
                  :min="1"
                  :max="200"
                  size="mini"
                  :disabled="!activeElem.hasOwnProperty('borderSize')||
                  Object.prototype.toString.call(activeElem.borderSize) ===
                    '[object Undefined]'"
                ></el-input-number>
              </el-tooltip>
            </div>
              <!-- 公共工具，位置调节工具 -->
            <div class="type-wrap type-wrap-common">
            <div class="common-wrap">
              <el-tooltip
                effect="dark"
                content="左对齐"
                placement="bottom"
              >
              <div
                @click="positionHandle('左对齐')"
              >
                <icon href="zuoduiqi"></icon>
              </div>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="左右居中"
                placement="bottom"
              >
                <div
                  @click="positionHandle('左右居中')"
                >
                <icon href="chuizhijuzhongduiqi"></icon>
                </div>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                content="右对齐"
                placement="bottom"
              >
                <div
                  @click="positionHandle('右对齐')"
                >
                  <icon href="youduiqi"></icon>
                </div>
              </el-tooltip>
              </div>
              <div class="common-wrap">
              <el-tooltip
                effect="dark"
                content="顶部对齐"
                placement="bottom"
              >
              <div
                @click="positionHandle('顶部对齐')"
              >
                <icon href="shangduiqi"></icon>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="上下居中"
              placement="bottom"
            >
              <div
                @click="positionHandle('上下居中')"
              >
                <icon href="shuipingjuzhongduiqi"></icon>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="底部对齐"
              placement="bottom"
            >
              <div
                @click="positionHandle('底部对齐')"
              >
                <icon href="xiaduiqi"></icon>
              </div>
            </el-tooltip>
            </div>
            </div>
            <!-- <div class="type-wrap">
            </div> -->
          </div>
          <div class="common-right">
            <!-- <el-tooltip
              effect="dark"
              content="旋转度数"
              placement="bottom"
            > -->
              <!-- 须activeElem.rotate!==undefined, 因为计数器组件会给{}自动加上属性-->
              <el-popover class="common-right-item" placement="bottom" trigger="click">
                <el-input-number
                  v-model="activeElem.rotate"
                  @change="sizeChange($event, '度数')"
                  :min="0"
                  :max="360"
                  size="mini"
                ></el-input-number>
                <div slot="reference">
                  <icon href="xuanzhuan"></icon>
                  <div class="icon-bottom-text">旋转</div>
                </div>
              </el-popover>
            <!-- </el-tooltip>
            <el-tooltip
              effect="dark"
              content="拖拽可调整图层"
              placement="bottom"
            > -->
              <el-popover class="common-right-item" width="100" placement="bottom" trigger="click">
                <vuedraggable
                  v-model="sortList"
                  @change="sortChange"
                  :animation="300"
                >
                  <!-- <transition-group> -->
                  <div
                    class="tuceng-item flex1"
                    v-for="(item, index) in sortList"
                    :key="index + item.name"
                  >
                    <span>{{ item.text || item.name }}</span>
                    <!-- <div class="tuceng-item-wrap"></div> -->
                  </div>
                  <!-- </transition-group> -->
                </vuedraggable>
                <div slot="reference" class="i-text i-font">
                  <!-- 图层 -->
                  <icon href="tuceng"></icon>
                  <div class="icon-bottom-text">图层</div>
                  </div>
              </el-popover>
            <!-- </el-tooltip>
            <el-tooltip
              effect="dark"
              content="复制"
              placement="top"
            > -->
            <div
                @click="copy"
                class="common-right-item"
              >
                <icon href="copy"></icon>
                <div class="icon-bottom-text">复制</div>
            </div>
            <!-- </el-tooltip>
             <el-tooltip
              effect="dark"
              content="重做"
              placement="bottom"
            > -->
              <div
                class="common-right-item"
                @click="restart"
              >
                <icon href="zhongzuo_huaban"></icon>
                <div class="icon-bottom-text">重做</div>
              </div>
            <!-- </el-tooltip> -->
          </div>
        </div>
        <div class="huabu-wrap juzhong">
          <div class="help">
            <icon @click="$Bus.$emit('showHelp',true)" href="help"></icon>
          </div>
          <div class="edit-area">
            <div class="edit-area-header clearfix">
              <span class="f-left">原点{{huabuObj.w}}X{{huabuObj.h}}</span>
              <div class="f-right">
                当前选中元素：<span class="dangqian">{{ activeElem.text || activeElem.name || '无' }}</span>
                <el-tooltip effect="dark" content="删除" placement="right">
                  <!-- <i @click="deleteElem" class="el-icon-delete"></i> -->
                  <icon class="delete" @click="deleteElem" href="delete" />
                </el-tooltip>
              </div>
            </div>
            <div
              class="pre-area juzhong"
              ref="pre_area"
              @click="gHandle($event)"
              @touchstart="gHandle($event)"
              :style="{
                width: huabuObj.w + 'px',
                height: huabuObj.h + 'px',
                borderRadius: huabuObj.borderRadius + 'px',
                border: huabuObj.borderSize + 'px solid ' + huabuObj.borderColor,
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
                    textDecoration: item.textDecoration,
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
    </div>
    <div
      style="margin-top: 30px"
      @mouseover="enter('swiper1')"
      @mouseleave="leave('swiper1')"
    >
      <swiper ref="swiper1" :options="swiperOption">
        <swiper-slide
          class="juzhong"
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
// import domtoimage from 'dom-to-image'
// import Rasterizehtml from 'rasterizehtml'
// import canvg from 'canvg'
// import JSPDF from 'jspdf'
import { chinaNetGongsiLogo, waizijutouqiyeLogo } from '@/utils/data.js'
import { meititouxiang } from '@/utils/touxiang.js'
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
      meititouxiang,
      // imgs: [require('@/assets/1.jpeg'), require('@/assets/2.jpeg'), require('@/assets/1.jpeg'), require('@/assets/2.jpeg'), require('@/assets/5.jpeg'), require('@/assets/6.jpeg'), require('@/assets/7.jpeg'), require('@/assets/8.jpeg')],
      activeMenu: 0,
      elemList: [
      ],
      sortList: [
      ],
      fileList: [],
      activeElem: {},
      huabuObj: {
        name: '画布', type: '画布', w: 400, h: 400, borderColor: '#000', borderSize: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '', borderRadius: 0
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
      // outerBorder: false,
      outerBorderWidth: 5,
      outerBorderColor: '#000',
      gshadow1: 0, // 全局阴影
      gshadow2: 0,
      gshadow3: 0,
      gshadowColor: '',
      imgUrl: '',
      shadowDirection: '',
      preColor: [
        '#fff',
        '#000',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ]
    }
  },
  methods: {
    selectImg (n) {
      this.huabuObj = deepCopy(n.huabuObj)
      this.elemList = deepCopy(n.elemList)
      this.addToArea()
    },
    menuHandle (i, e) {
      this.activeMenu = i
    },
    gHandle (e) {
      // if (e.target.className === 'pre-area juzhong') {
      //   this.activeElem = this.huabuObj
      // }
    },
    colorChange (val, type) {
      console.log(12343, val, type)
      if (type === '输入文字') {
        this.activeElem.color = val || ''
      } else if (type === '画布颜色') {
        this.huabuObj.backgroundColor = val || ''
      } else if (type === '画布边框') {
        this.huabuObj.borderColor = val || ''
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
      console.log(val, 123)
      // if (type === '画布边框') {
      //   this.elemList.forEach(item => {
      //     item.x = item.x - this.huabuObj.borderSize
      //     item.y = item.y - this.huabuObj.borderSize
      //   })
      // }
      // else if (type === '线条宽度') {
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
      if (type === 'fontWeight' && this.activeElem.fontWeight !== undefined) {
        this.activeElem.fontWeight === 'bold' ? this.activeElem.fontWeight = 'normal' : this.activeElem.fontWeight = 'bold'
      } else if (type === 'fontStyle' && this.activeElem.fontStyle !== undefined) {
        this.activeElem.fontStyle === 'italic' ? this.activeElem.fontStyle = '' : this.activeElem.fontStyle = 'italic'
      } else if (type === 'underline' && this.activeElem.textDecoration !== undefined) {
        this.activeElem.textDecoration === 'underline' ? this.activeElem.textDecoration = '' : this.activeElem.textDecoration = 'underline'
      } else if (type === 'line-through' && this.activeElem.textDecoration !== undefined) {
        this.activeElem.textDecoration === 'line-through' ? this.activeElem.textDecoration = '' : this.activeElem.textDecoration = 'line-through'
      }
    },
    positionHandle (type) {
      if (type === '左对齐') {
        this.activeElem.x = 0
      } else if (type === '右对齐') {
        this.activeElem.x = this.huabuObj.w - this.activeElem.w - this.huabuObj.borderSize * 2
      } else if (type === '左右居中') {
        this.activeElem.x = (this.huabuObj.w - this.activeElem.w) / 2 - this.huabuObj.borderSize
      } else if (type === '顶部对齐') {
        this.activeElem.y = 0
      } else if (type === '上下居中') {
        this.activeElem.y = (this.huabuObj.h - this.activeElem.h) / 2 - this.huabuObj.borderSize
      } else if (type === '底部对齐') {
        this.activeElem.y = this.huabuObj.h - this.activeElem.h - this.huabuObj.borderSize * 2
      }
    },
    // 重做
    restart () {
      this.huabuObj = {
        name: '画布', type: '画布', w: 400, h: 400, borderColor: '#000', borderSize: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '', borderRadius: 0
      }
      this.elemList = []
      this.activeElem = {}
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
        const el = { id: Date.now(), name: '图片', isActive: true, type: '图片', parentLimitation: false, w: 150, h: 150, x: 185, y: 185, zIndex: maxIndex, rotate: 0, src: n }
        this.activeElem = el
        this.positionHandle('左右居中')
        this.positionHandle('上下居中')
        this.elemList.push(el)
        // this.sortList = deepCopy(this.elemList)
        this.sortList = this.elemList
        this.sortList.sort(this.compare).reverse()
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
    // createImg1 () {
    //   // const url = 'https://www.baidu.com'
    //   const node = document.getElementsByClassName('pre-area')[0]
    //   const canvas = document.createElement('canvas')
    //   // const opts = {
    //   //   executeJs: true,
    //   //   height: screen.height,
    //   //   width: screen.width
    //   // }
    //   Rasterizehtml.drawHTML(node, canvas).then(res => {
    //     console.log(res, 'res')
    //     // const base64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(res.svg)))
    //     const img = new Image()
    //     img.src = res.toDataURL('image/png', 1.0)
    //     this.imgUrl = img.src
    //     const a = document.createElement('a') // 生成一个a元素
    //     const event = new MouseEvent('click') // 创建一个单击事件
    //     a.download = name || 'photo' // 设置图片名称
    //     a.href = img.src // 将生成的URL设置为a.href属性
    //     a.dispatchEvent(event)
    //     document.body.removeChild(a)
    //   })
    // },
    // createImg2 () {
    //   const node = document.getElementsByClassName('pre-area')[0]
    //   domtoimage.toPng(node, { quality: 1.0 }).then((dataUrl) => {
    //     const a = document.createElement('a') // 生成一个a元素
    //     const event = new MouseEvent('click') // 创建一个单击事件
    //     a.download = name || 'photo' // 设置图片名称
    //     a.href = dataUrl // 将生成的URL设置为a.href属性
    //     a.dispatchEvent(event)
    //     document.body.removeChild(a)
    //   }).catch((error) => {
    //     console.error('oops, something went wrong!', error)
    //   })
    // },
    createImg () {
      document.body.scrollTo(0, 0)
      // const canvas = document.createElement('canvas')
      // const huabuWrap = document.getElementsByClassName('edit-area')[0]
      const dom = document.getElementsByClassName('pre-area')[0]
      // const cloneDom = dom.cloneNode(true)
      // cloneDom.className = 'pre-area juzhong pre-area-clone'
      // cloneDom.style.width = dom.clientWidth + 'px'
      // cloneDom.style.height = dom.clientHeight + 'px'
      // huabuWrap.appendChild(cloneDom)
      // console.log(cloneDom, 'cloneDom')
      // const nodesToRecover = []
      // const nodesToRemove = []
      // // 在临时div上将svg都转换成canvas，并删除原有的svg节点
      // const svgElem = cloneDom.querySelectorAll('svg')
      // console.log(svgElem, 1)
      // svgElem.forEach((node) => {
      //   const parentNode = node.parentNode
      //   console.log(parentNode, 2)
      //   // const svg = node.innerHTML
      //   const svg = node.outerHTML.trim()
      //   const canvas = document.createElement('canvas')
      //   canvas.id = 'can'
      //   console.log(canvas, 12)
      //   // const canvas1 = document.createElement('canvas')
      //   canvg(canvas, svg, {
      //     ignoreAnimation: false,
      //     log: true
      //   })
      //   // const img = document.createElement('img')
      //   // img.src = canvas.toDataURL('image/png')
      //   console.log(canvas, node.clientWidth, 123)
      //   canvas.style.zIndex = node.style.zIndex
      //   canvas.style.width = node.clientWidth + 'px'
      //   canvas.style.height = node.clientHeight + 'px'
      //   if (node.style.position) {
      //     canvas.style.position += node.style.position
      //     canvas.style.left += node.style.left
      //     canvas.style.top += node.style.top
      //   }
      //   nodesToRecover.push({
      //     parent: parentNode,
      //     child: node
      //   })
      //   parentNode.removeChild(node)
      //   nodesToRemove.push({
      //     parent: parentNode,
      //     child: canvas
      //   })
      //   parentNode.appendChild(canvas)
      //   // parentNode.appendChild(img)
      // })
      const canvas = document.createElement('canvas')
      const width = dom.offsetWidth // 获取dom 宽度
      const height = dom.offsetHeight // 获取dom 高度
      const scale = 2 // 定义任意放大倍数 支持小数
      canvas.width = width * 2
      canvas.height = height * 2
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      const context = canvas.getContext('2d')
      context.scale(scale, scale) // 获取context,设置scale
      const rect = dom.getBoundingClientRect() // 获取元素相对于视口的
      context.translate(-rect.left, -rect.top) // 设置context位置，值为相对于视窗的偏移量负值，让图片复位
      // 关闭抗锯齿
      context.mozImageSmoothingEnabled = false
      context.msImageSmoothingEnabled = false
      context.imageSmoothingEnabled = false
      const opts = {
        canvas, // 将放大的canvas作为参数传进去
        // x: rect.left, // 绘制的dom元素相对于视口的位置
        // y: rect.top,
        // scrollX: 0, // 滚动的长度
        // scrollY: 0,
        // scale: scale, // 添加的scale 参数
        // width: width, // dom 原始宽度
        // height: height,
        useCORS: true // 开启跨域
        // dpi: window.devicePixelRatio * 2
      }
      // return
      this.$nextTick(() => {
        (window.html2canvas || html2canvas)(dom, opts).then(canvas => {
          // 转成图片，生成图片地址
          console.log(this.userDevice, 1)
          console.log(this.huabuObj, this.elemList, 'heihei')
          if (this.userDevice === 'mobile') {
            this.imgUrl = canvas.toDataURL('image/png', 1.0)
          } else {
            const img = new Image()
            img.style.width = width + 'px'
            img.style.height = height + 'px'
            img.src = canvas.toDataURL('image/png', 1.0)
            this.imgUrl = img.src
            // 生成pdf
            // const doc = new JSPDF('p', 'mm', [230, 250])
            // doc.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, img.width, img.height)
            // doc.save('photo.pdf')
            const a = document.createElement('a') // 生成一个a元素
            const event = new MouseEvent('click') // 创建一个单击事件
            a.download = name || 'photo' // 设置图片名称
            a.href = img.src // 将生成的URL设置为a.href属性
            a.dispatchEvent(event)
            document.body.removeChild(a)
            // huabuWrap.removeChild(cloneDom)
          }
        }).catch(err => {
          console.log(err, 'err')
        })
      })
    },
    copy () {
      if (!this.activeElem.id || JSON.stringify(this.activeElem) === '{}') return
      console.log(this.activeElem)
      const maxIndex = this.elemList.length
      const copyObj = deepCopy(this.activeElem)
      copyObj.id = Date.now()
      copyObj.zIndex = maxIndex
      copyObj.x = this.activeElem.x + 10
      copyObj.y = this.activeElem.y + 10
      copyObj.isActive = true
      this.activeElem = copyObj
      this.elemList.push(copyObj)
      this.sortList = this.elemList
      this.sortList.sort(this.compare).reverse()
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
        el = { id: Date.now(), name: '输入文字', isActive: true, type: '输入文字', parentLimitation: false, text: '输入文字', w: 80, h: 40, x: 160, y: 180, zIndex: maxIndex, color: '#000', fontSize: 20, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', fontWeight: 'normal', fontStyle: '', textDecoration: '' }
      } else if (type === '点/圆') {
        el = { id: Date.now(), name: '点/圆', isActive: true, type: '点/圆', parentLimitation: false, w: 10, h: 10, x: 195, y: 195, zIndex: maxIndex, backgroundColor: '#000', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '直线') {
        el = { id: Date.now(), name: '直线', isActive: true, type: '直线', parentLimitation: false, w: 50, h: 2, x: 175, y: 199, zIndex: maxIndex, rotate: 0, backgroundColor: '#000', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '圆圈') {
        el = { id: Date.now(), name: '圆圈', isActive: true, type: '圆圈', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, borderColor: '#000', borderSize: 1, backgroundColor: '', backgroundImage: '', rotate: 0, shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '矩形') {
        el = { id: Date.now(), name: '矩形', isActive: true, type: '矩形', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, borderColor: '#000', borderSize: 1, rotate: 0, backgroundColor: '', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '矩形1') {
        el = { id: Date.now(), name: '矩形', isActive: true, type: '矩形1', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, rotate: 0, backgroundColor: '#000', backgroundImage: '', shadow1: 0, shadow2: 0, shadow3: 0, shadowColor: '#000', shadowDirection: '' }
      } else if (type === '图片') {
        el = { id: Date.now(), name: '图片', isActive: true, type: '图片', parentLimitation: false, w: 50, h: 50, x: 175, y: 175, zIndex: maxIndex, rotate: 0, src: '' }
      }
      if (el) {
        this.activeElem = el
        this.positionHandle('左右居中')
        this.positionHandle('上下居中')
        this.elemList.push(el)
      }
      // this.sortList = deepCopy(this.elemList)
      this.sortList = this.elemList
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
      this.sortList = this.elemList
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
    // this.activeElem = this.huabuObj
    // this.chinaNetGongsiLogo = chinaNetGongsiLogo
    // this.waizijutouqiyeLogo = waizijutouqiyeLogo
  }
}

</script>

<style lang="less" scoped>
.home {
  background-color: #f6f6f6;
  width: 1000px;
  margin: 0 auto;
  position: relative;
}
.qrcode{
  position: absolute;
  left: -200px;
  bottom: 200px;
  img{
    width: 200px;
  }
  div{
    font-size: 12px;
    line-height: 12px;
  }
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
    font-size: 16px;
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
  height: 600px;
  box-sizing: border-box;
}
.active-menu-content {
  // padding: 15px;
  // box-sizing: border-box;
  // overflow: auto;
}
.padding-wrap{
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.sucaiku{
  justify-content: space-between;
  overflow: auto;
  padding-top: 0;
  height: 600px;
  img{
    cursor: pointer;
    width: 114px;
    height: 114px;
    object-fit: contain;
    margin-bottom: 5px;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 6px;
    background: #EDEDED;
  }
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
  padding: 6px 0;
  box-sizing: border-box;
  position: relative;
  .el-tooltip {
    cursor: pointer;
  }
  .icon-bottom-text{
    font-size: 12px;
    line-height: 1;
    width: 25px;
  }
  .type-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 0 5px;
    border-right: 1px solid #ebebeb;
    height: 100%;
    &-huabu{
      width: 100px;
      justify-content: space-between;
      .huabu-item{
        padding: 4px 3px;
        border-radius: 5px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover{
          padding: 3px 2px;
          border: 1px solid #a4a4a4;
          background: #eee;
        }
      }
      .huabu-isActive{
        padding: 3px 2px;
        border: 1px solid #a4a4a4;
        background: #eee;
      }
      /deep/ .el-color-picker--mini{
        height: 26px;
      }
      /deep/ .el-color-picker__trigger{
        width: 22px;
        height: 22px;
      }
    }
    &-wenzi{
      width: 240px;
      &-top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    &-common{
      width: 82px;
    }
    .fontstyle-wrap, .common-wrap{
      display: flex;
      border: 1px solid #a4a4a4;
      border-radius: 5px;
      .iconbox{
        padding: 2px;
      }
      .el-tooltip{
        height: 26px;
        &:not(:last-child){
          border-right: 1px solid #a4a4a4;
        }
        &:first-of-type{
          border-radius: 5px 0 0 5px;
          .iconbox{
            border-radius: 5px 0 0 5px;
          }
        }
        &:last-of-type{
          border-radius: 0 5px 5px 0;
          .iconbox{
            border-radius: 0 4px 4px 0;
          }
        }
        :hover{
          background: #d7d7d7;
        }
      }
    }
    &-shape{
      width: 80px;
    }
    &-common{
      .common-wrap{
        display: flex;
      }
    }
    // .common-tools-item{
    //   margin: 0 1px;
    // }
  }
  // 禁用状态
  .disabled{
    .el-tooltip{
      cursor: not-allowed;
    }
    .iconbox{
      color: #ccc;
    }
    &.fontstyle-wrap{
      border: 1px solid #dcdfe6;
      background:#f5f7fa;
      .el-tooltip{
        height: 26px;
        cursor: not-allowed;
        &:not(:last-child){
          border-right: 1px solid #dcdfe6;
        }
      }
    }
  }
  .isActive {
    background: #d7d7d7;
  }
  .shadow-wrap {
    font-size: 12px;
  }
  .common-right {
    display: flex;
    align-items: center;
    padding: 0 15px;
    &-item{
      padding: 2px 3px;
      cursor: pointer;
      border-radius: 3px;
      &:hover{
        background: #eee;
      }
    }
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
  position: relative;
  &-header{
    height: 22px;
    line-height: 22px;
    .f-right{
      display: flex;
      align-items: center;
    }
    .delete{
      width: 22px;
      height: 18px;
      cursor: pointer;
    }
  }
}
.dangqian{
  background: #111;
  color: #fff;
  margin-right: 5px;
  padding: 0 3px;
  max-width: 100px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.huabu-wrap{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  .help{
    position: absolute;
    padding: 5px;
    right: 0;
    top: 0;
    cursor: pointer;
  }
}
.canvas_area {
  width: 400px;
  height: 400px;
}
.pre-area-clone{
  // z-index: -1;
  // position: absolute !important;
  // left: 0;
  // top: 23px;
}
.pre-area {
  background-color: #fff;
  word-break: break-all;
  font-size: 50px;
  line-height: 1;
  position: relative;
  box-sizing: border-box;
  .iconbox{
    position: absolute;
    left:0;
    top: 0;
  }
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
  text-align: left;
  // justify-content: center;
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
