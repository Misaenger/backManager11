<template>
  <div>
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
          <el-input placeholder="请输入内容" v-model="query" class="input" clearable @clear='clear'>
            <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
          </el-input>
          <el-button type="success" @click="upPop">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="40">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="160">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="160">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="160">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="100">
          <template slot-scope="tableData">
            {{tableData.row.create_time | fmtdate}}
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="用户状态" width="80">
          <template slot-scope="tableData">
            <el-switch v-model="tableData.row.mg_state" active-color="#13ce66" inactive-color="#ddd">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
            <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[2, 4, 6, 8, 10]">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogformVisibleAdd" :modal-append-to-body=false>
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogformVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
	namme: 'users',
	data() {
		return {
			query: '',
			pagenum: 1, // 当前页
			pagesize: 4, // 每页多少项
			total: -1, // 总项
			tableData: [],
			// 添加用户对话框
			dialogformVisibleAdd: false,
			form: {
				username: '',
				password: '',
				email: '',
				mobile: ''
			},
			formLabelWidth: '60px'
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
			const { data: { total, users }, meta: { msg, status } } = res.data
			if (status === 200) {
				this.tableData = users
				this.total = total
				this.value = users.mg_state
			} else {
				this.$message.warning('数据获取错误')
			}
		},

		handleSizeChange(val) {
			// val即每页显示条数
			this.pagesize = val // 改变初始每页多少项值
			this.pagenum = 1
			this.getUserList() // 重新获取数据
		},
		handleCurrentChange(val) {
			// va即当前页码
			this.pagenum = val // 改变初始设置的当前页项
			this.getUserList() // 重新获取数据
		},
		searchUsers() {
			// this.query 已经双向绑定
			this.getUserList() // 重新获取数据
		},
		clear() {
			this.getUserList() // 重新获取数据
		},

		upPop() {
			this.dialogformVisibleAdd = true
		},
		async addUser() {
			// 在后台添加用户
			const res = await this.$axios.post('users', this.form) // 直接将form对象传过去里面包含4个请求参数
      console.log(res)
      const { data,meta:{ msg,status } } = res.data
      if(status===201){
        this.dialogformVisibleAdd = false
        this.$message.success(msg)
        this.getUserList() // 重新获取数据
        this.form = {}
      }else{
        this.$message.warning(msg)
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
