<template>
  <div class="logos">
    <!-- 中国巨头公司 -->
    <div @mouseover="enter('swiper1')" @mouseleave="leave('swiper1')">
      <span>中国巨头公司</span>
      <swiper ref="swiper1" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of chinaJutouGongsiLogo"
          :key="index"
        >
          <el-image
            :src="item"
            fit="contain"
            :preview-src-list="chinaJutouGongsiLogo"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 中国互联网企业 -->
    <div @mouseover="enter('swiper2')" @mouseleave="leave('swiper2')">
      <span>中国互联网/科技企业</span>
      <swiper ref="swiper2" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of chinaNetGongsiLogo"
          :key="index"
        >
          <el-image
            :src="item"
            fit="contain"
            :preview-src-list="chinaNetGongsiLogo"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 外资巨头企业 -->
    <div @mouseover="enter('swiper3')" @mouseleave="leave('swiper3')">
      <span>外资巨头企业</span>
      <swiper ref="swiper3" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of waizijutouqiyeLogo"
          :key="index"
        >
          <el-image
            :src="item"
            fit="contain"
            :preview-src-list="waizijutouqiyeLogo"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 国产汽车 -->
    <div @mouseover="enter('swiper4')" @mouseleave="leave('swiper4')">
      <span>国产汽车</span>
      <swiper ref="swiper4" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of guochanqicheLogo"
          :key="index"
        >
          <el-image
            :src="item"
            fit="contain"
            :preview-src-list="guochanqicheLogo"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 外资汽车 -->
    <div @mouseover="enter('swiper5')" @mouseleave="leave('swiper5')">
      <span>外资汽车</span>
      <swiper ref="swiper5" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of waiziqicheLogo"
          :key="index"
        >
          <el-image :src="item" fit="contain" :preview-src-list="waiziqicheLogo"
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 运动品牌 -->
    <div @mouseover="enter('swiper6')" @mouseleave="leave('swiper6')">
      <span>运动品牌</span>
      <swiper ref="swiper6" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of yundongLogo"
          :key="index"
        >
          <el-image :src="item" fit="contain" :preview-src-list="yundongLogo"
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 服装品牌 -->
    <div @mouseover="enter('swiper7')" @mouseleave="leave('swiper7')">
      <span>服装品牌</span>
      <swiper ref="swiper7" :options="swiperOption">
        <swiper-slide
          class="juzhong"
          v-for="(item, index) of fuzhuangLogo"
          :key="index"
        >
          <el-image :src="item" fit="contain" :preview-src-list="fuzhuangLogo"
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { chinaJutouGongsiLogo, chinaNetGongsiLogo, guochanqicheLogo, waizijutouqiyeLogo, waiziqicheLogo, yundongLogo, fuzhuangLogo } from '../utils/data.js'
export default {
  name: 'logos',
  components: {
    swiper, swiperSlide
  },
  data () {
    return {
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
      chinaJutouGongsiLogo,
      chinaNetGongsiLogo,
      waizijutouqiyeLogo,
      guochanqicheLogo,
      waiziqicheLogo,
      yundongLogo,
      fuzhuangLogo
    }
  },
  methods: {
    enter (str) {
      this.$refs[str].swiper.autoplay.stop()
    },
    leave (str) {
      this.$refs[str].swiper.autoplay.start()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.logos {
  width: 1000px;
  margin: 10px auto 80px;
}
.swiper-slide {
  height: 116.5px;
  background: #fff;
}
</style>
