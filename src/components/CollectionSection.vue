<template>
  <div class="collection-section">
    <!-- 操作栏 -->
    <div class="operation-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="输入标题或备注搜索"
        clearable
        class="search-input"
        @clear="handleSearchClear"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
      </el-input>

      <el-select
        v-model="selectedCategory"
        placeholder="按分类筛选"
        clearable
        class="category-select"
      >
        <el-option
          v-for="category in categories"
          :key="category.value"
          :label="category.label"
          :value="category.value"
        />
      </el-select>
    </div>

    <!-- 收藏列表 -->
    <el-table
      :data="filteredCollections"
      style="width: 100%"
      :header-cell-style="{ background: '#f5f7fa' }"
      stripe
    >
      <el-table-column prop="title" label="新闻标题" width="300">
        <template slot-scope="{ row }">
          <div class="title-wrapper">
            <el-link
              type="primary"
              :href="row.url"
              target="_blank"
              class="news-title"
            >
              {{ row.title }}
            </el-link>
            <el-tag
              v-for="tag in row.tags"
              :key="tag"
              size="mini"
              class="tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="category" label="分类" width="120">
        <template slot-scope="{ row }">
          <el-tag :type="getCategoryType(row.category)">
            {{ row.category }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="collectedAt" label="收藏时间" width="180" />

      <el-table-column prop="analysis" label="分析备注">
        <template slot-scope="{ row }">
          <div class="analysis-content">
            <span v-if="row.analysis">{{ row.analysis }}</span>
            <span v-else class="empty-text">暂无备注</span>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="openEditDialog(row)"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="{ row }">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      class="pagination"
    />

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑分析备注"
      :visible.sync="showEditDialog"
      width="600px"
    >
      <el-input
        v-model="editingAnalysis"
        type="textarea"
        :rows="4"
        placeholder="请输入您的分析备注..."
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAnalysis">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CollectionSection',
  props: {
    collections: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchKeyword: '',
      selectedCategory: '',
      currentPage: 1,
      pageSize: 10,
      showEditDialog: false,
      editingItem: {},
      editingAnalysis: '',
      categories: [
        { label: '政治新闻', value: 'politics' },
        { label: '经济新闻', value: 'economy' },
        { label: '科技新闻', value: 'technology' },
        { label: '社会新闻', value: 'society' }
      ]
    }
  },
  computed: {
    filteredCollections() {
      return this.collections
        .filter(item => {
          const matchKeyword = this.searchKeyword
            ? item.title.includes(this.searchKeyword) ||
              (item.analysis && item.analysis.includes(this.searchKeyword))
            : true

          const matchCategory = this.selectedCategory
            ? item.category === this.selectedCategory
            : true

          return matchKeyword && matchCategory
        })
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    total() {
      return this.collections.length
    }
  },
  methods: {
    getCategoryType(category) {
      const types = {
        politics: 'danger',
        economy: 'warning',
        technology: 'success',
        society: 'info'
      }
      return types[category] || ''
    },
    openEditDialog(item) {
      // 先检查 item 是否存在
      if (item) {
        this.editingItem = { ...item }; // 避免直接修改 prop
        this.editingAnalysis = this.editingItem.analysis || '';
        this.showEditDialog = true;
      } else {
        console.warn("传入的 item 为 null 或 undefined，无法打开编辑对话框");
      }
    },
    saveAnalysis() {
      // 检查 editingItem 是否存在
      if (this.editingItem) {
        this.$emit('update:analysis', {
          id: this.editingItem.id,
          analysis: this.editingAnalysis
        });
        this.showEditDialog = false;
        this.$message.success('备注已保存');
      } else {
        console.warn("editingItem 为 null 或 undefined，无法保存备注");
      }
    },
    handleDelete(item) {
      this.$confirm('确定要删除该收藏吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete-collection', item.id);
        this.$message.success('删除成功');
      });
    },
    handleSearch() {
      // 可以添加搜索相关逻辑
    },
    handleSearchClear() {
      this.searchKeyword = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.collection-section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

  .operation-bar {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .search-input {
      width: 300px;
    }

    .category-select {
      width: 200px;
    }
  }

  .title-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .news-title {
      font-size: 16px;
      font-weight: bold;
      color: #409EFF;
    }

    .tag {
      margin-right: 5px;
    }
  }

  .analysis-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .empty-text {
      color: #909399;
      font-style: italic;
    }
  }

  .pagination {
    margin-top: 20px;
    text-align: right;
  }

  .dialog-footer {
    text-align: right;
  }
}
</style>
