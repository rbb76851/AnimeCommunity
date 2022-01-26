<template>
  <el-row>
    <h1>{{ title }} Franchise</h1>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="6" v-for="item in franchise" class="mb-20">
      <div class="relative card br-4 w-100">
        <div class="absolute wh-inherit">
          <img
              :src="item.imgUrl"
              class="image wh-inherit img-fill"
          />
        </div>
        <div class="op-0 op absolute flex justify-center wh-inherit flex-column ">
          <router-link :to="{path: '/details',query:{id:item.id}}" class="height">
          </router-link>
          <div class="pd-5">
            <el-button type="text" class="white bg-green pd-8">加入资源库</el-button>
          </div>
        </div>
      </div>
      <div class="text-omitted">
        <strong class="font-14 dark-gray">{{ item.canonicalTitle }}</strong>
      </div>
      <span class="font-12 dark-gray">
        <strong>{{ item.showType }}</strong> · <span class="gray">{{ item.year }}</span>
      </span>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
const title = JSON.parse(sessionStorage.getItem('details') as string).canonicalTitle;
const franchise = JSON.parse(sessionStorage.getItem('franchise') as string)
</script>

<style scoped>
@import "../assets/style/index.scss";

.card {
  height: 173px;
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