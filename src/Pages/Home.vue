<template>
  <el-row>
    <el-col :span="12" :offset="4">
      <el-row>
        <h1 class="ml-3 w-35 text-gray-600 inline-flex items-center">探索动漫</h1>
      </el-row>
      <el-row>
        <el-autocomplete
            v-model="searchInput"
            class="searchBar"
            placeholder="您正在搜索什么"
            :prefix-icon="Search"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            @keyup.enter.native="handleSelect"
        >
          <template #default="{item}">
            <div class="value">{{item.canonicalTitle}}</div>
            <span class="link">{{item.posterImage}}</span>
            <img :src="item">
          </template>
        </el-autocomplete>
      </el-row>
    </el-col>
    <br>
    <el-col :span="12" :offset="4" v-for="(catItem,catIndex) in categories" :key="catIndex">
      <h3 class="text-left">{{ catItem.title }}</h3>
      <el-row>
        <el-col
            v-for="(numItem, numIndex) in catItem.posterUrls"
            :key="numItem"
            :span="4"
            :offset="numIndex % 5 !== 0 ? 1 : 0"
            class="flex space-evenly"
        >
          <div class="relative card br-4 w-100">
            <div class="absolute wh-inherit">
              <img
                  :src="numItem"
                  class="image wh-inherit img-fill"
              />
            </div>
            <div class="op-0 op absolute flex justify-center wh-inherit flex-column ">
              <router-link :to="{path: '/details',query:{id:catItem.ids[numIndex]}}" class="height">
              </router-link>
              <div class="pd-5">
                <el-button type="text" class="white bg-green pd-8">加入资源库</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="float-right">
            <a herf="#" class="red font-14">查看更多</a>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {Search} from '@element-plus/icons-vue'
import endPoints from "../api";
import instance from "../api/axios";
import axios from "axios";

const searchInput = ref<string>('')
const categories = ref<any[]>([
  {
    title: '热门 本周',
    url: endPoints.weekTrend.url,
  }, {
    title: '热门 正在播出',
    url: endPoints.onAir.url
  }, {
    title: '热门 即将推出',
    url: endPoints.upcoming.url
  }, {
    title: '最高评级',
    url: endPoints.rating.url
  }, {
    title: '最受欢迎',
    url: endPoints.popular.url
  }
])

const base = 'https://media.kitsu.io/anime/poster_images/'
const getPoster = () => {
  axios.all(categories.value.map(category => {
    instance.get(`${category.url}`)
        .then(res => {
          category.ids = res.data.data.map((item: { id: string }) => item.id)
          category.posterUrls = category.ids.map((id: string) => `${base}${id}/medium.jpg`)
        })
  })).then()
}

interface LinkItem {
  canonicalTitle: string
  id: number
  posterImage: string
}

const links = ref<LinkItem[]>([])
const getHint = () => {
  instance.post('https://awqo5j657s-dsn.algolia.net/1/indexes/production_media/query?x-algolia-agent=Algolia for vanilla JavaScript (lite) 3.24.12&x-algolia-application-id=AWQO5J657S&x-algolia-api-key=NzYxODA5NmY0ODRjYTRmMzQ2YjMzNzNmZmFhNjY5ZGRmYjZlMzViN2VkZDIzMGUwYjM5ZjQ5NjAwZGI4ZTc5MHJlc3RyaWN0SW5kaWNlcz1wcm9kdWN0aW9uX21lZGlhJmZpbHRlcnM9Tk9UK2FnZVJhdGluZyUzQVIxOA==', {
    query: searchInput.value,
    attributesToRetrieve: ["id", "canonicalTitle", "posterImage"],
  }).then((res) => {
    let data = res.data?.hits
    links.value = data.map((obj: any) => {
      return Object.assign({}, {
        canonicalTitle: obj.canonicalTitle,
        id: obj.id,
        posterImage: obj.posterImage.small
      })
    })
  })
}
let timeout=1000
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value
  console.log(results)
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (anime: LinkItem) => {
    return (
        anime.canonicalTitle.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
  const handleSelect = (item: LinkItem) => {
    console.log(item)
  }
  onMounted(() => {
    getPoster()
    getHint()
  })
</script>

<style scoped>
@import '../assets/style/index.scss';

.card {
  height: 173px;
}

.searchBar li {
  width: 500px;
}

.image {
  z-index: 1;
  object-fit: fill;
  transition: opacity .4s linear;
}

.op {
  opacity: 0;
}

.op:hover {
  opacity: 1;
  background-image: linear-gradient(rgba(150, 150, 150, 0), rgba(33, 33, 33, 1));
}

.height {
  height: 131px;
}


</style>