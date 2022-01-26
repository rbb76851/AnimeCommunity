<template>
  <div class="text-left mb-20">
    <span class="font-16 dark-gray">
      <strong>反应</strong> · <span class="gray">受欢迎程度</span>
    </span>
  </div>
  <el-card class="exclude-line">
    <div class="split-line pd-10" v-for="item in reactions">
      <el-row :gutter="10" align="middle">
        <el-col :span="3" class="gray weight-700">
          <svg width="9" height="6" viewBox="432 279 225 150" fill="#999">
            <path fill-rule="evenodd" d="M544.5 279L657 429H432z"/>
          </svg>
          <br>
          {{item.vote}}
        </el-col>
        <el-col :span="21" class="line-30">
          <el-row class="gray weight-700 font-8">{{item.name}}</el-row>
          <el-row><strong class="text-left dark-gray">{{item.text}}</strong></el-row>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import instance from "../api/axios";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const reactions = ref([])
const getReactions = ()=>{
  reactions.value=JSON.parse(sessionStorage.getItem('reactions') as string)
}
onMounted(()=>{
    getReactions()
})
</script>

<style scoped>
@import "../assets/style/index.scss";
.exclude-line div:first-child{
  border-top: none;
}
.line-30{
  line-height: 20px;
}
</style>