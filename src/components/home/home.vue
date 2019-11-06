<template>
  <div>
    <el-container class="container">
      <el-header class="container-header" height="80px">
        <h2>后台管理系统</h2>
        <a @click.prevent="signout">退出</a>
      </el-header>
      <el-container>
        <el-aside class="container-aside">

          <el-menu :unique-opened="true" :router="true">
            <!-- 1 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <!-- 1-1 -->
              <el-menu-item index="users">
                <i class="el-icon-edit-outline"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 2 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限管理</span>
              </template>
              <!-- 2-1 -->
              <el-menu-item index="role">
                <i class="el-icon-edit-outline"></i>
                <span>角色列表</span>
              </el-menu-item>
              <!-- 2-2 -->
              <el-menu-item index="right">
                <i class="el-icon-edit-outline"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 3 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>商品管理</span>
              </template>
              <!-- 3-1 -->
              <el-menu-item index="3-1">
                <i class="el-icon-edit-outline"></i>
                <span>商品列表</span>
              </el-menu-item>
              <!-- 3-2 -->
              <el-menu-item index="3-2">
                <i class="el-icon-edit-outline"></i>
                <span>分类参数</span>
              </el-menu-item>
              <!-- 3-3 -->
              <el-menu-item index="3-3">
                <i class="el-icon-edit-outline"></i>
                <span>商品分类</span>
              </el-menu-item>
            </el-submenu>
            <!-- 4 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <!-- 4-1 -->
              <el-menu-item index="4-1">
                <i class="el-icon-edit-outline"></i>
                <span>订单列表</span>
              </el-menu-item>
            </el-submenu>
            <!-- 5 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据统计</span>
              </template>
              <!-- 5-1 -->
              <el-menu-item index="5-1">
                <i class="el-icon-edit-outline"></i>
                <span>数据报表</span>
              </el-menu-item>
            </el-submenu>

          </el-menu>

        </el-aside>
        <el-main class="container-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    signout(){
      this.$message.success('退出成功')
      localStorage.clear()  // 清除缓存中的token
      this.$router.push({name:'login'})  // 跳转回登录页面
    }
  },
  beforeCreate(){  // 在实例创建前验证
    const token = localStorage.getItem('token')  // 获取缓存中的token
    if (!token) {    // 如果没有token跳回登录界面
      this.$router.push({name:'login'})
    }
  },
}
</script>

<style lang="stylus" scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
}

.container-header {
  position: relative;
  background-color: #eee;
  text-align: center;
  padding-top: 1rem;

  h2 {
    line-height 50px;
    font-weight: 600;
    font-size: 26px;
    color: rgb(163, 77, 77);
  }

  a {
    line-height 50px;
    position: absolute;
    right: 1rem;
    top: 1.4rem;
    color: blue;
  }
}

.container-aside {
  background-color: #ddd;
}

.container-main {
  background-color: #fff;
}
</style>
