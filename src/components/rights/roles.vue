<template>
  <el-card>
    <!-- 面包屑全局组件 -->
    <mybread level1="权限管理" level2="角色列表" class="mybread"> </mybread>

    <!-- 表格 -->
    <el-table :data="roleData" style="width:100%">

      <!-- 展开行 -->
      <el-table-column type="expand" width="100%">
        <template slot-scope="props">
          <el-row v-for="(item1,i) in props.row.children" :key="i">
            <!-- 外围列容器 -->
            <el-col :span="4" class="padding">
              <!-- 第一行 -->
              <el-tag @close="deleRight(props.row.id,item1.id,props.row)" type="success" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 第二行 -->
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag @close="deleRight(props.row.id,item2.id,props.row)" type="info" closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-col :span="4" v-for="(item3,i) in item2.children" :key="i" class="padding">
                    <el-tag @close="deleRight(props.row.id,item3.id,props.row)" type="warning" closable>{{item3.authName}}</el-tag>
                  </el-col>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          </el-row>

          <span v-if="props.row.children.length===0">未分配权限</span>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="40">
      </el-table-column>

      <el-table-column prop="roleName" label="角色名" width="160">
      </el-table-column>

      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>

      <el-table-column prop="address" label="修改 / 添加权限">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetRightDia(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 修改角色权限 -->
    <el-dialog title="添加角色权限" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <!-- ...这里插入表单组件 -->
      <el-tree :data="treeList" show-checkbox node-key="id" default-expand-all :default-checked-keys="arrCheck" :props="defaultProps" ref="tree">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDia()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogformVisibleAEdit" :modal-append-to-body=false>
      <el-form :model="form">
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogformVisibleAEdit = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
	data() {
		return {
			roleData: [],
			dialogFormVisible: false,
			treeList: [],
			defaultProps: {
				children: 'children',
				label: 'authName'
			},
			arrCheck: [],
			currRoleId: [],

			dialogformVisibleAEdit: false,
			form: {
				roleDesc: '',
				roleName: ''
			},
			formLabelWidth: '60px',
			edicurrRole: []
		}
	},
	methods: {
		async getRoleList() {
			const res = await this.$axios.get('roles')
			this.roleData = res.data.data
		},
		// 取消用户权限
		async deleRight(roleId, rightId, role) {
			const res = await this.$axios.delete(`roles/${roleId}/rights/${rightId}`)
			if (res.data.meta.status === 200) {
				this.$message.success(res.data.meta.msg)
				role.children = res.data.data // 返回数据res.data.data是该用户的剩余权限
			}
		},

		// 获取所有的用户权限并展开
		async showSetRightDia(role) {
			// 获取树形结构权限数据
			const res = await this.$axios.get(`rights/tree`)
			this.treeList = res.data.data
			// 将当前用户权限打勾
			var tempArr = []
			role.children.forEach(item1 => {
				// tempArr.push(item1.id)
				item1.children.forEach(item2 => {
					// tempArr.push(item2.id)npm
					item2.children.forEach(item3 => {
						tempArr.push(item3.id)
					})
				})
			})
			this.arrCheck = tempArr
			this.dialogFormVisible = true
			this.currRoleId = role.id
		},
		// 修改用户角色权限
		async setRightDia() {
			// 获取rid （即树形上全选与半选的id的数组）
			let arr1 = this.$refs.tree.getCheckedKeys()
			let arr2 = this.$refs.tree.getHalfCheckedKeys()
			let arr = [...arr1, ...arr2] // ES6展开运算符，自动将数组展开
			//或者用 let arr = arr1.concat(arr2) 数组拼接方法
			const res = await this.$axios.post(`roles/${this.currRoleId}/rights`, {
				rids: arr.join(',') // 后台规定，rid值必须以逗号分隔
			})
			this.getRoleList()
			this.dialogFormVisible = false
		},
		// 修改角色描述
		showEditUserDia(role) {
			this.dialogformVisibleAEdit = true
			this.edicurrRole = role
			this.form = role
		},
		async editRole() {
			const res = await this.$axios.put(`roles/${this.edicurrRole.id}`, {
				roleName: this.form.roleName,
        roleDesc: this.form.roleDesc,
			})
       this.dialogformVisibleAEdit = false
		}
	},
	created() {
		this.getRoleList()
	}
}
</script>

<style>
.mybread {
	padding-bottom: 16px;
}
.padding {
	padding-bottom: 10px;
}
</style>
