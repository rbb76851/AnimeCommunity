<template>
  <div class="login white-gray pd-30 br-4">
    <el-form label-width="100px">
      <h3>Welcome!</h3>
      <p>Login to your Kitsu account below. If you need an account,<a herf="#">create one</a>.</p>
      <el-form-item label="Email">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input></el-input>
      </el-form-item>
      <el-link type="danger">forgot password?</el-link>
      <el-form-item>
        <el-button></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const cancelLogin = ()=>{

}
</script>

<style scoped>
@import "../assets/style/index.scss";
.login{
  width: 30%;
  min-width: 400px;
  margin:0 auto
}
a{
  color: #f75239;
}
</style>