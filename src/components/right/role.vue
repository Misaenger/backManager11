<template>
  <el-card>
    <!-- 面包屑全局组件 -->
    <mybread level1="权限管理" level2="角色列表" class="mybread"> </mybread>
    <el-button type="info" plain>添加角色</el-button>

    <!-- 表格 -->
    <el-table :data="roleData" style="width: 100%">
      
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="(item1,i) in props.row.children" :key="i"> <!-- 外围列容器 -->
            <el-col :span="4"> <!-- 第一行 -->
            <el-tag>{{item1.authName}}</el-tag><span> > </span> 
            </el-col :span="20">

              <el-col> <!-- 第二行 -->
                <el-row>  <!-- 第二行列容器内两列 -->
                  <el-col :span="20"> </el-col> 
                  <el-col :span="20"> </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="40">
      </el-table-column>

      <el-table-column prop="roleName" label="角色名" width="160">
      </el-table-column>

      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>

      <el-table-column prop="address" label="操作" width="160">
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
</style>
