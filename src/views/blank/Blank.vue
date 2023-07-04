<template>
  <div class="content">
    <h5>答谢暨公益慈善晚会</h5>
    <el-button type="primary">组件UI按钮</el-button>
    <i class="el-icon-edit icon"></i>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Select, Option } from 'element-ui';
Vue.use(Button).use(Select).use(Option);

export default {
  name: 'Service',
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
    }
  },

  mounted() {

  },
  components: {
  },
  methods: {

  },

}
</script>

<style scoped lang="less">
.content {
  background: red;
}
.icon{
  font-size: 20px;
}
</style>