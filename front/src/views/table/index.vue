<template>
  <div class="box">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="created_at" label="创建时间" />
      <el-table-column prop="updated_at" label="更新时间" />
    </el-table>
  </div>
</template>

<script>
import { getUserList } from '@/api/table'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserList().then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>

<style>
.box {
  margin: 20px;
}
</style>
