<template>
  <el-row align="bottom" gutter="10" class="line-height">
    <el-col span="12">
      <h3 class="dark-gray">{{ synopsis.title }}</h3>
    </el-col>
    <el-col span="12">
      <h5 class="gray">{{ synopsis.year }}</h5>
    </el-col>
  </el-row>
  <el-row>
    <span class="rate">{{ synopsis.score }}% Community Approval</span>
  </el-row>
  <el-row>
    <el-col>
      <div class="hidden media-preview br-4" @click="playVideo">
        <img :src="synopsis.ytbImg" class="w-100 media-preview-img">
        <div class="media-preview-overlay w-100 h-100 flex justify-center align-center">
          <svg width="32" height="32" viewBox="0 0 27 20">
            <path fill="#fff"
                  d="M26.443 4.968s.262 2.205.262 4.41v2.068c0 2.205-.262 4.41-.262 4.41s-.257 1.878-1.043
                    2.705c-.998 1.086-2.116 1.09-2.628 1.155-3.67.275-9.182.284-9.182.284s-6.82-.065-8.918-.274c-.583-.113-1.894-.08-2.892-1.165-.787-.827-1.042-2.705-1.042-2.705s-.263-2.205-.263-4.41V9.378c0-2.205.263-4.41.263-4.41S.993
                    3.09 1.78 2.263c.998-1.086 2.115-1.09 2.628-1.154 3.67-.276 9.176-.276 9.176-.276h.012s5.506
                    0 9.176.276c.512.063 1.63.068 2.628 1.154.786.827 1.043 2.705 1.043 2.705zM10.882
                    13.95l7.086-3.815-7.087-3.841.001 7.656z" fill-rule="evenodd"/>
          </svg>
          <h3 class="white pd-5">播放预告片</h3>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <p class="description text-left font-16 dark-gray weight-500"
         :style="{'-webkit-line-clamp': synopsis.showMore ? 9 : 'unset'}">
        {{ synopsis.description }}
      </p>
    </el-col>
    <el-col @click="exchangeText" span="4">
      <el-link type="danger" :underline="false" class="font-16">{{ synopsis.showMore ? '更多' : '收起' }}</el-link>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <ul class="flex flex-wrap pd-start">
      <li v-for="item in tabs" class="tab weight-500">
        <div class="media-tag dark-gray gray-border br-4 mr-5">{{item}}</div>
      </li>
    </ul>
  </el-row>
  <el-row class="rank weight-500 mb-20 split-line" justify="space-between">
    <el-col span="12">
      <svg class="icon" width="12" height="12" viewBox="0 0 1792 1792" color="#E74C3C">
        <path fill="currentColor" d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26T145 952.5 77 855 23.5 734 0 596q0-220
        127-344t351-124q62 0 126.5 21.5t120 58T820 276t76 68q36-36 76-68t95.5-68.5 120-58T1314 128q224 0 351 124t127
        344q0 221-229 450l-623 600q-18 18-44 18z"/>
      </svg>
      Rank #{{ synopsis.popularityRank }} (Most Popular Anime)
    </el-col>
    <el-col span="12">
      <svg width="12" height="12" viewBox="0 0 26 26" color="#F39C12">
        <path fill="currentColor" d="M25.326 10.137a1.001 1.001 0 00-.807-.68l-7.34-1.066-3.283-6.651c-.337-.683-1.456
        -.683-1.793 0L8.82 8.391 1.48 9.457a1 1 0 00-.554 1.705l5.312 5.178-1.254 7.31a1.001 1.001 0 001.451 1.054L13
        21.252l6.564 3.451a1 1 0 001.451-1.054l-1.254-7.31 5.312-5.178a.998.998 0 00.253-1.024z"/>
      </svg>
      Rank #{{ synopsis.ratingRank }} (Highest Rated Anime)
    </el-col>
  </el-row>
  <div :style="{display:synopsis.display ? 'block':'none'}"
       @click="playVideo"
       class="ember-view">
    <div>
      <iframe width="600" height="338" :src="synopsis.ytbVideo" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen/>
    </div>
  </div>
  <el-card class="mb-20 pd-30">
    <div class="title-height"><h5>详情</h5></div>
    <ul class="flex flex-wrap font-14">
      <li v-for="item in info" class="basicInfo flex flex-wrap text-left">
        <strong>{{ item.label }}</strong>
        <span>{{ item.value }}</span>
      </li>
    </ul>
    <div class="mt-30 split-line">
      <h5>角色</h5>
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in charImages">
          <img class="cardImg" :src="item">
        </el-col>
      </el-row>
      <br>
      <el-link
          type="info"
          :underline="false"
          class="float-left"
          @click="moreChar"
      >
        所有角色
      </el-link>
    </div>
    <div class="mt-50 split-line">
      <h5>更多来自此系列的内容</h5>
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in fchImages">
          <img class="cardImg" :src="item">
        </el-col>
      </el-row>
      <br>
      <el-link
          type="info"
          :underline="false"
          class="float-left"
          @click="moreFch"
      >
        查看全部内容
      </el-link>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import instance from "../api/axios";

let route = useRoute()
let router = useRouter()
let id = route.query.id
let details = JSON.parse(sessionStorage.getItem('details') as string)
const charImages = ref([])
const fchImages = ref([])
const tabs = ref([])
const synopsis = reactive({
  title: details.canonicalTitle,
  year: details.startDate.slice(0, 4),
  score: details.averageRating,
  description: details.synopsis,
  showMore: true,
  display: false,
  popularityRank: details.popularityRank,
  ratingRank: details.ratingRank,
  ytbImg: `https://img.youtube.com/vi/${details.youtubeVideoId}/mqdefault.jpg`,
  ytbVideo: `https://www.youtube.com/embed/${details.youtubeVideoId}`,
})

const info = [
  {
    label: '日语',
    value: details.titles.ja_jp,
  },
  {
    label: '罗马音',
    value: details.titles.en_jp,
  },
  {
    label: '英语',
    value: details.titles.en,
  },
  {
    label: '缩写',
    value: details.abbreviatedTitles[0],
  },
  {
    label: '类型',
    value: details.subtype,
  },
  {
    label: '状态',
    value: details.status,
  },
  {
    label: '首播日期',
    value: details.startDate,
  },
  {
    label: '每集时长',
    value: details.episodeLength + ' minutes',
  },
  {
    label: '适宜人群',
    value: details.ageRating + '-' + details.ageRatingGuide,
  }
]

const getCharacters = async (id: string) => {
  let data = await instance
      .get(`/castings?filter[media_type]=Anime&filter[media_id]=${id}&filter[is_character]=true&filter[language]=Japanese&include=character&page[limit]=20`)
      .then(res => {
        if (Object.keys(res.data.included).length !== 0) {
          return res.data.included
        } else {
          console.log('未获取到角色信息')
        }
      })
  let characters = data.map((obj: any) => {
    return Object.assign({}, {id: obj.id, name: obj.attributes.name, imgUrl: obj.attributes.image.original})
  })
  sessionStorage.setItem('characters', JSON.stringify(characters))
  charImages.value = characters.slice(0, 4).map((item: { imgUrl: any; }) => item.imgUrl)
}
const getFranchise = async (id: string) => {
  let data = await instance
      .get(`/media-relationships?filter[source_type]=Anime&filter[source_id]=${id}&sort=role&include=destination&page[limit]=20`)
      .then(res => {
        if (Object.keys(res.data.included).length !== 0) {
          return res.data.included
        } else {
          console.log('未获取到特许经销权')
        }
      })
  let franchise = data.map((obj: any) => {
    return Object.assign({}, {
      id:obj.id,
      canonicalTitle: obj.attributes.canonicalTitle,
      showType: obj.attributes.showType,
      year: obj.attributes.startDate.slice(0, 4),
      imgUrl: obj.attributes.posterImage.medium
    })
  })
  sessionStorage.setItem('franchise', JSON.stringify(franchise))
  fchImages.value = franchise.slice(0, 4).map((item: { imgUrl: any; }) => item.imgUrl)
}
const getTabs= async (id: string) => {
  let data = await instance
      .get(`/anime/${id}/categories?page[limit]=20`)
      .then(res => {
        if (Object.keys(res.data.data).length !== 0) {
          return res.data.data
        } else {
          console.log('未获取到标签信息')
        }
      })
  tabs.value = data.map((obj:any)=>obj.attributes.title)
}

const exchangeText = () => {
  synopsis.showMore = !synopsis.showMore
}

const playVideo = () => {
  synopsis.display = !synopsis.display
}
const emit = defineEmits(['getLabel'])
const moreChar = () => {
  router.push({name: 'characters', query: {id: id}})
  emit('getLabel', 'characters')
}
const moreFch = () => {
  router.push({name: 'franchise', query: {id: id}})
  emit('getLabel', 'franchise')
}

onMounted(() => {
  if (id) {
    getCharacters(id as string)
    getFranchise(id as string)
    getTabs(id as string)
  }
})
</script>

<style scoped>
@import "../assets/style/index.scss";

h3 {
  font-size: 1.75rem;
}

h5 {
  font-size: 17px;
}


strong {
  width: 70px;
}

.line-height {
  margin-top: -30px;
  height: 70px;
}

.rate {
  color: #1abc9c;
  font-size: 16px;
  font-weight: 900;
  margin: 5px 0;
}


.description {
  font-family: "Open Sans", sans-serif;
  text-overflow: ellipsis;
  overflow-y: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.basicInfo {
  min-width: 50%;
  margin-bottom: 5px;
}
.media-preview {
  height: 70px;
  position: relative;
}

.media-preview-img {
  position: absolute;
  z-index: 0;
  left: 0px;
}

.rank {
  border-bottom: 1px solid #eaeaea;
  padding: 15px 0;
  margin-top: 10px;
  font-size: 12px;
}

.media-preview-overlay {
  position: absolute;
  background-image: linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6) 50%, rgba(0, 0, 0, .6) 100%);
  z-index: 1;
}
.media-tag{
  background: #FFF;
  padding: 4px 8px;
}

.title-height {
  line-height: 0px;
}
.tab{
  display: inline-block;
  font-size: 12px;
  margin-bottom: 5px;
}
.pd-start{
  padding-inline-start: 0px;
}
</style>