<template>
    <el-col>
      <h1>{{ title }}角色</h1>
    </el-col>
    <el-col>
      <p class="text-left">The following is a full list of characters and their Japanese voice actors for the anime {{ title }}</p>
    </el-col>
  <el-row :gutter="20">
    <el-col :span="8" v-for="item in characters">
      <el-card :body-style="{ padding: '0px'}" class="mb-10">
        <img class="cardImg" :src="item.imgUrl">
        <div class="pd-8">
          <span>{{item.name}}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
const title = JSON.parse(sessionStorage.getItem('details') as string).canonicalTitle;
const characters = JSON.parse(sessionStorage.getItem('characters') as string)
</script>

<style scoped>
@import "../assets/style/index.scss";

</style>