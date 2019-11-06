<template>
  <el-card>
    <!-- 面包屑全局组件 -->
    <mybread level1="权限管理" level2="权限列表" class="mybread"> </mybread>
    <!-- 表格 -->
      <el-table :data="tableData" height="1100" border style="width: 100%">
        <el-table-column type="index" label="#" width="40">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column prop="level" label="层级">
          
          <template slot-scope="scope">   <!-- scope值对应表格组件的 :data 值 -->
            <span v-if="scope.row.level==='0'">一级</span>  <!-- 后台的level数据是字符串所以必须将结果转为字符串/parseInt(scope.row.level) -->
            <span v-if="scope.row.level==='1'">二级</span>
            <span v-if="scope.row.level==='2'">三级</span>
          </template>

        </el-table-column>
      </el-table>

  </el-card>
</template>

<script>
export default {
	name: 'right',
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		async getRightList() {
			const res = await this.$axios.get('rights/list')
			this.tableData = res.data.data
		}
	},
	created() {
		this.getRightList()
	}
}
</script>

<style>
.mybread {
	padding-bottom: 10px;
}
</style>
