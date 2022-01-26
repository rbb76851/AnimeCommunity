<template>
  <el-menu :default-active="activeIndex"
           class="el-menu-demo bg-purple h-10"
           mode="horizontal"
           background-color="#40303F"
           text-color="#fff"
           active-text-color="#fff"
           @select="handleSelect">
    <el-sub-menu index="check">
      <template #title>查看</template>
      <el-menu-item>动漫</el-menu-item>
      <el-menu-item>漫画</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="register" @click="getLogin">注册</el-menu-item>
    <el-menu-item index="login" @click="getLogin">登陆</el-menu-item>
  </el-menu>
  <div :style="{display:display ? 'block':'none'}"
       class="ember-view text-center"
       @click="getLogin">
    <Login />
  </div>
</template>
<script setup lang="ts">
import Login from './Login.vue'
import {ref} from 'vue'

const activeIndex = ref('1')
const display = ref(false)
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const getLogin =()=>{
  display.value=!display.value
}
</script>
<style scoped>
@import '../assets/style/index.scss';

</style>
