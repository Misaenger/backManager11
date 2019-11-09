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
      <el-tabs v-model="step" tab-position="left" style="height:800px;">
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
        <el-tab-pane name="1" label="商品参数">

        </el-tab-pane>
        <el-tab-pane name="2" label="商品属性">

        </el-tab-pane>
        <el-tab-pane name="3" label="商品图片">

        </el-tab-pane>
        <el-tab-pane name="4" label="商品内容">
                <el-button type="primary" @click="step='5'">主要按钮</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <!-- <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item> -->

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
