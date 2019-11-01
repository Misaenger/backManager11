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
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <template slot-scope="tableData">
          {{tableData.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="tableData">
          <el-switch v-model="tableData.row.mg_state" active-color="#13ce66" inactive-color="#ddd">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        </template>
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
			total: -1,
			tableData: []
		}
	},
	methods: {
		async getUserList() {
			const res = await this.$axios.get('users', {
				params: {
					query: this.query,
					pagenum: this.pagenum,
					pagesize: this.pagesize
				}
			})
			console.log(res)
			const { data: { total, users }, meta: { msg, status } } = res.data
			if (status === 200) {
				this.tableData = users
				this.total = total
				this.value = users.mg_state
			} else {
				this.$message.warning('数据获取错误')
			}
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
