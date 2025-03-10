<template>
    <div class="profile-container">
      <!-- 个人信息模块 -->
      <el-card class="profile-card">
        <div class="profile-header">
          <el-avatar :size="80" :src="userInfo.avatar" class="user-avatar"></el-avatar>
          <div class="user-info">
            <h2>{{ userInfo.name }}</h2>
            <p>{{ userInfo.email }}</p>
          </div>
          <el-button type="primary" icon="el-icon-edit" @click="showEditDialog">编辑资料</el-button>
          
        </div>
  
        <!-- 导航选项卡 -->
        <el-tabs v-model="activeTab" class="nav-tabs">
          <el-tab-pane label="检测记录" name="history">
            <history-section :records="historyData" @search="handleSearch" />
          </el-tab-pane>
          <el-tab-pane label="我的收藏" name="collection">
            <collection-section :collections="collectionData" />
          </el-tab-pane>
          <el-tab-pane label="数据分析" name="data">
            <data-analysis-section />
          </el-tab-pane>
          <el-tab-pane label="反馈帮助" name="feedback">
            <feedback-section />
          </el-tab-pane>
        </el-tabs>
      </el-card>
  
      <!-- 编辑资料对话框 -->
      <el-dialog title="编辑资料" :visible.sync="editDialogVisible">
        <el-form :model="userInfo" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <!-- 新增密码修改 -->
        <el-form-item label="当前密码" prop="oldPassword">
          <el-input 
            type="password"
            v-model="passwordForm.oldPassword"
            placeholder="请输入当前密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            type="password"
            v-model="passwordForm.newPassword"
            placeholder="6-20位字母/数字组合"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="passwordForm.confirmPassword"
            placeholder="请再次输入新密码"
            show-password
          ></el-input>
        </el-form-item>
          <el-form-item label="头像">
            <el-upload
              action="#"
              :show-file-list="false"
              :before-upload="handleAvatarUpload"
            >
              <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar-preview">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import HistorySection from '@/components/HistorySection.vue'
  import CollectionSection from '@/components/CollectionSection.vue'
  import DataAnalysisSection from '@/components/DataAnalysisSection.vue'
  import FeedbackSection from '@/components/FeedbackSection.vue'
  
  export default {
    components: {
      HistorySection,
      CollectionSection,
      FeedbackSection,
      DataAnalysisSection
    },
    data() {
           // 密码验证规则
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度在 6 到 20 个字符'));
      } else if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(value)) {
        callback(new Error('必须包含字母和数字'));
      } else {
        if (this.passwordForm.confirmPassword !== '') {
          this.$refs.editForm.validateField('confirmPassword');
        }
        callback();
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
      return {
        activeTab: 'history',
        editDialogVisible: false,
        userInfo: {
          name: '科技守护者',
          email: 'guardian@news.com',
          avatar: require('@/assets/default-avatar.png')
        },
        historyData: [
          // 示例数据
          {
            id: 1,
            time: '2023-09-20 14:30',
            title: '关于宿舍搬迁的紧急通知',
            result: '高风险',
            content: '检测到与历史谣言相似度达92%'
          }
        ],
        collectionData: [
          // 示例数据
          {
            id: 1,
            title: '重大科技突破报道',
            category: '科技新闻',
            tags: ['可信来源', '权威发布'],
            note: '需持续跟进后续发展'
          }
        ],
             // 新增密码表单数据
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 扩展验证规则
      formRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        oldPassword: [
          { required: true, message: '当前密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPass, trigger: 'blur' }
        ]
      },
      }
    },
    methods: {
           // 修改提交方法
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 组装提交数据
          const submitData = {
            ...this.userInfo,
            ...this.passwordForm
          }

          // 这里调用修改接口
          console.log('提交数据:', submitData)
          
          // 模拟请求成功
          this.$message.success('修改成功')
          this.editDialogVisible = false
          
          // 清空密码相关字段
          this.passwordForm = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
        }
      })
    },
      showEditDialog() {
        this.editDialogVisible = true
      },
      handleAvatarUpload(file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.userInfo.avatar = e.target.result
        }
        reader.readAsDataURL(file)
        return false
      },
      handleSearch(keyword) {
        console.log('搜索关键词:', keyword)
        // 实际应调用API
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .profile-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
  
    .profile-card {
      background: rgba(255,255,255,0.95);
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  
    .profile-header {
      display: flex;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #eee;
  
      .user-avatar {
        margin-right: 20px;
        border: 2px solid #409EFF;
      }
  
      .user-info {
        flex: 1;
        h2 {
          color: #303133;
          margin-bottom: 8px;
        }
        p {
          color: #909399;
        }
      }
    }
  
    .nav-tabs {
      margin-top: 20px;
      ::v-deep .el-tabs__header {
        margin: 0;
      }
    }
  
    .avatar-preview {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  </style>