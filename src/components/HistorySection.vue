<template>
  <div class="history-section">
    <div class="search-bar">
      <el-input
        placeholder="输入新闻标题或关键词"
        v-model="searchKeyword"
        class="search-input"
        @keyup.enter.native="$emit('search', searchKeyword)"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="$emit('search', searchKeyword)"
        />
      </el-input>
    </div>

    <el-table :data="filteredRecords" style="width: 100%">
      <el-table-column prop="time" label="检测时间" width="180" />
      <el-table-column prop="title" label="新闻标题" />
      <el-table-column prop="result" label="检测结果" width="120">
        <template slot-scope="{ row }">
          <el-tag :type="row.result === '高风险' ? 'danger' : 'success'">
            {{ row.result }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="收藏" width="80">
        <template slot-scope="{ row }">
          <i
            class="el-icon-star-off star-icon"
            :class="{ active: row.isCollected }"
            @click="toggleCollection(row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="50"
      :page-size="10"
      class="pagination"
    />
  </div>
</template>

<script>
export default {
  props: ['records'],
  data() {
    return {
      searchKeyword: '',
      collectedItems: []
    }
  },
  computed: {
    filteredRecords() {
      return this.records.map(item => ({
        ...item,
        isCollected: this.collectedItems.includes(item.id)
      })).filter(item => 
        item.title.includes(this.searchKeyword)
      )
    }
  },
  methods: {
    toggleCollection(row) {
      const index = this.collectedItems.indexOf(row.id);
      if (index === -1) {
        // 添加收藏
        this.collectedItems.push(row.id);
        this.$message.success('已收藏该新闻');
        // 模拟后端请求
        this.$http.post('/api/collections', { newsId: row.id });
      } else {
        // 取消收藏
        this.collectedItems.splice(index, 1);
        this.$message.info('已取消收藏该新闻');
        // 模拟后端请求
        this.$http.delete(`/api/collections/${row.id}`);
      }
    }
  }
}
</script>

<style scoped>
.search-bar {
  margin-top: 20px;
  margin-bottom: 20px;
  .search-input {
    width: 400px;
  }
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.star-icon {
  cursor: pointer;
  font-size: 18px;
  color: #c0c4cc; /* 灰色 */
}

.star-icon.active {
  color: #e6a23c; /* 黄色 */
}
</style>