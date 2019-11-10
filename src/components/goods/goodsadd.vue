<template>
  <el-card>

    <!-- 面包屑全局组件 -->
    <mybread level1="商品列表" level2="添加商品"> </mybread>
    <!-- 警告条 -->
    <el-alert title="添加商品信息" show-icon type="success" center class="mybread"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="parseInt(step)" finish-status="success" simple style="margin-bottom: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 表单包裹提交  -->
    <el-form label-position="top" :model="form">

      <!-- tab栏 -->
      <el-tabs v-model="step" tab-position="left" height="300px" @tab-click="tabChange()">
        <el-tab-pane name="0" label="基本信息">

          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader :options="options" :show-all-levels="false" v-model="selectedOptions" @change="handleChange" :props="defaultprops"></el-cascader>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane name="1" label="商品参数" max-height="250">

          <el-form-item :label="item.attr_name" v-for="(item,i) in arrDyparams" :key="i">
            <el-checkbox-group v-model="checkboxGroup">
              <el-checkbox-button :label="item1" v-for="(item1,i) in item.attr_vals.trim().split(',')" :key="i" style="margin:10px 6px"> </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <div v-if="show" style="margin:10px 6px">此分类暂时无参数</div>

        </el-tab-pane>
        <el-tab-pane name="2" label="商品属性" style="overflow:auto;height:900px">

          <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
          <div v-if="arrStaticparams.length<1" style="margin:10px 6px">此分类暂时无属性</div>

        </el-tab-pane>
        <el-tab-pane name="3" label="商品图片">

          <el-form-item>
            <el-upload class="upload-demo" action="http://39.108.193.251:8811/api/private/v1/upload" :headers="headers"
            :on-preview="handlePreview" 
            :on-remove="handleRemove" 
            :on-success="handleSuccess" 
            list-type="picture" 
            style="width:600px">
              <el-button size="small" type="primary">点击上传</el-button>
              <span slot="tip" style="margin-left:12px">只能上传jpg/png文件，且不超过500kb</span>
            </el-upload>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane name="4" label="商品内容">
          <el-button type="primary" @click="step='5'">主要按钮</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>

  </el-card>
</template>

<script>
export default {
	data() {
		return {
			step: 0,
			form: {
				goods_name: '',
				goods_cat: '',
				goods_price: '',
				goods_number: '',
				goods_weight: '',
				goods_introduce: '',
				pics: '',
				attrs: ''
			},
			//级联选择器
			options: [],
			selectedOptions: [],
			defaultprops: {
				value: 'cat_id',
				label: 'cat_name',
				children: 'children'
			},
			// 商品参数
			arrDyparams: [],
			checkboxGroup: [],
			show: false,
			//商品属性
			arrStaticparams: [],
			//上传图片
      headers:{
        Authorization:localStorage.getItem('token')
      }
		}
	},
	methods: {
		handleChange() {
			this.form.goods_cat = this.selectedOptions.join(',') // 请求参数goods_cat 有格式要求
		},
		async getgoodcate() {
			const res = await this.$axios.get('categories', { type: [1, 2, 3] })
			this.options = res.data.data
		},
		//参数块
		async tabChange() {
			// 切换tab时触发
			if (this.step === '1') {
				// 点击tab2时触发
				if (!this.form.goods_cat) {
					this.$notify({
						title: '基本信息',
						message: '请先选择商品分类',
						type: 'error'
          })
          return
				}
				// 发送商品分类参数，获取信息
				const res = await this.$axios.get(
					`categories/${this.selectedOptions[2]}/attributes?sel=many`
				)
				this.arrDyparams = res.data.data
				if (res.data.data.length===0) {
					this.show = true
				} else {
					this.show = false
				}
			} else if (this.step === '2') {
				if (!this.form.goods_cat) {
					this.$notify({
						title: '基本信息',
						message: '请先选择商品分类',
						type: 'error'
          })
          return
				}
				// 获取商品参数
				const res = await this.$axios.get(
					`categories/${this.selectedOptions[2]}/attributes?sel=only`
				)
				this.arrStaticparams = res.data.data
			}else if (this.step === '3') {
				// 获取图片上传路径
			}
		},
		// 上传图片
    handleRemove(file) { // 移除图片
    // file.response.tmp_path 是图片临时移除的路径
		},
		handlePreview(file) { // 预览
    },
    handleSuccess(file){ // 上传成功
      // file.data.tmp_path是图片临时上传的路径
    }
	},
	created() {
		this.getgoodcate()
	}
}
</script>

<style>
.mybread {
	margin: 12px 0;
	font-size: 12px;
}
</style>
