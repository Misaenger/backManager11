<template>
  <el-card>
    <!-- 面包屑全局组件 -->
    <mybread level1="权限管理" level2="角色列表" class="mybread"> </mybread>
    <el-button type="info" plain>添加角色</el-button>

    <!-- 表格 -->
    <el-table :data="roleData" style="width:100%">

      <!-- 展开行 -->
      <el-table-column type="expand" width="100%">
        <template slot-scope="props">
          <el-row v-for="(item1,i) in props.row.children" :key="i">
            <!-- 外围列容器 -->
            <el-col :span="3"  class="padding">
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
                  <el-col :span="5" v-for="(item3,i) in item2.children" :key="i" class="padding">
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

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="ShowDeleteUser(scope.row.id)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetUserRoleDia(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>

  </el-card>
</template>

<script>
export default {
	data() {
		return {
			roleData: []
		}
	},
	methods: {
		async getRoleList() {
			const res = await this.$axios.get('roles')
			this.roleData = res.data.data
			console.log(this.roleData)
		},
		// 取消用户权限
		async deleRight(roleId, rightId,role) {
			const res = await this.$axios.delete(`roles/${roleId}/rights/${rightId}`)
			if (res.data.meta.status === 200) {
				this.$message.success(res.data.meta.msg)
        role.children = res.data.data // 返回数据res.data.data是该用户的剩余权限
			}
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
