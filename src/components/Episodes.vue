<template>
  <el-row :gutter="20">
    <el-col :span="12" v-for="ep in episodes">
      <el-card :body-style="{ padding: '10px' }" class="mb-10">
        <img class="h-125 cardImg" :src="ep.imgUrl">
        <div class="pd-8 text-omitted">
          <span>
            <strong>Episode {{ ep.number }}</strong> <span>{{ ep.canonicalTitle }}</span>
          </span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import instance from "../api/axios";
import {onMounted, ref} from "vue";

const route = useRoute()
const id = route.query.id
let episodes = ref([])
const getEpisodes = async (id: any) => {
  let data = await instance
      .get(`/episodes?filter[media_type]=Anime&filter[media_id]=${id}&sort=number&page[limit]=20`)
      .then(res => {
        return res.data.data
      })
  episodes.value = data.map((obj: any) => {
    return Object.assign({}, {
      number: obj.attributes.number,
      canonicalTitle: obj.attributes.canonicalTitle,
      imgUrl: obj.attributes.thumbnail.original
    })
  })
}
onMounted(() => {
  if (id) {
    getEpisodes(id)
  }
})
</script>

<style scoped>
@import "../assets/style/index.scss";
.h-125{
  height: 125px;
}
</style>