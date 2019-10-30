<template>
  <div class="login-wrap">
    <el-form label-width="100px" label-position="top" :model="formData" class="login-form">
      <h2>后台管理系统</h2>
      <el-form-item label="用户">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" @click="handleLogin()">登录</el-button>
      </el-form-item>
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		handleLogin() {
			this.$axios.post('login', this.formData).then(res => {

				const { data, meta: { msg, status } } = res.data

				if (status === 200) {  // res.data.meta.status = 200
					this.$router.push({name:'home'})
					this.$notify.success({
            title:'good',
						message: msg,
						position: 'top-left',
            duration: 1200
					})
				} else {  // res.data.meta.status = 400
          this.$message.error(msg)
				}
			})
		}
	}
}
</script>

<style>
.login-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #eee;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login-form {
	width: 50%;
	height: 18rem;
	padding: 2rem;
	margin: 0 auto;
	background-color: #fff;
	border-radius: 20px;
}
h2 {
	text-align: center;
	margin-bottom: 1rem;
	font-size: 20px;
}
.login-btn {
	width: 100%;
	background: #ccc;
	border: none;
}
</style>
