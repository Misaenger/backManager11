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
            <!-- 外层 -->
            <el-submenu :index="item.order.toString()" v-for="(item,i) in menus" :key="item.id">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 内层 -->
              <el-menu-item :index="item1.path" v-for="(item1,i) in item.children" :key="item1.id">
                <i class="el-icon-edit-outline"></i>
                <span>{{item1.authName}}</span>
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
  data() {
    return {
      menus:[],
    }
  },
	methods: {
		signout() {
			this.$message.success('退出成功')
			localStorage.clear() // 清除缓存中的token
			this.$router.push({ name: 'login' }) // 跳转回登录页面
		},
		// 获取导航数据
		async getMenus() {
      const res = await this.$axios.get(`menus`)
      this.menus = res.data.data
		}
	},
	created() {
		this.getMenus()
	}
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
    line-height: 50px;
    font-weight: 600;
    font-size: 26px;
    color: rgb(163, 77, 77);
  }

  a {
    line-height: 50px;
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
