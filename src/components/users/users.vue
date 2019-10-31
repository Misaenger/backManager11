<template>
  <el-card class="box-card">

    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row>
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
export default {
  namme: 'users',
  data() {
    return {
      query:'',
    }
  },
}
</script>

<style>
.text {
	font-size: 14px;
}

.item {
	padding: 18px 0;
}

.box-card {
	width: 100%;
	height: 100%;
}
.breadcrumb{
  margin-bottom: 1rem;
}
.input{
  width: 60%;
}
</style>
