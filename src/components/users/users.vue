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
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="40">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="address" label="邮箱">
      </el-table-column>
      <el-table-column prop="date" label="创建日期">
      </el-table-column>
      <el-table-column prop="address" label="用户状态">
      </el-table-column>
      <el-table-column prop="address" label="操作">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
	namme: 'users',
	data() {
		return {
			query: '',
			pagenum: 1,
			pagesize: 5,
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: 'xuyujun_by@163.com'
				},
				{
					date: '2016-05-04',
					name: '刘晓萌',
					address: 'xiaomen_by@163.com'
				},
				{
					date: '2016-05-01',
					name: '李大锤',
					address: 'dachui_by@163.com'
				}
			]
		}
	},
	methods: {
		async getUserList() {
			const { data: res } = await this.$axios.get('users', {
				params: {
					query: this.query,
					pagenum: this.pagenum,
					pagesize: this.pagesize
				}
			})
			console.log(res)
		}
	},
	created() {
		this.getUserList()
	}
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
.breadcrumb {
	margin-bottom: 1rem;
}
.input {
	width: 60%;
}
</style>
