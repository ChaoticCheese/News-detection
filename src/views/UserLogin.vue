<template>
  <div class="login-container">
    <vue-particles class="particles" color="#409EFF"/>
    
    <div class="login-box">
      <div class="mode-tabs">
        <div 
          :class="['tab-item', { 'active': isLogin }]"
          @click="switchMode(true)"
        >登录</div>
        <div 
          :class="['tab-item', { 'active': !isLogin }]"
          @click="switchMode(false)"
        >注册</div>
      </div>

      <!-- 登录表单 -->
      <div v-if="isLogin" class="form-wrapper">
        <h1 class="title">智见真章</h1>
        <h3 class="subtitle">面向新闻场景的伪造检测平台</h3>

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item prop="type">
            <el-radio-group v-model="loginForm.type">
              <el-radio label="user">普通用户</el-radio>
              <el-radio label="enterprise">企业用户</el-radio>
              <el-radio label="supervisor">监管机构</el-radio>
              <el-radio label="admin">管理员</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>

          <el-button type="primary" class="submit-btn" @click="handleLogin">立即登录</el-button>
        </el-form>
      </div>

      <!-- 注册表单 -->
      <div v-else class="form-wrapper">
        <h2 class="title">新用户注册</h2>
        
        <el-form ref="regForm" :model="regForm" :rules="regRules">
          <el-form-item prop="type">
            <el-radio-group v-model="regForm.type">
              <el-radio label="user">普通用户</el-radio>
              <el-radio label="enterprise">企业用户</el-radio>
              <el-radio label="supervisor">监管机构</el-radio>
              <el-radio label="admin">管理员</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 公共字段 -->
          <el-form-item prop="username">
            <el-input
              v-model="regForm.username"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-message"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="regForm.password"
              type="password"
              placeholder="请输入密码（至少8位）"
              show-password
            ></el-input>
          </el-form-item>

          <!-- 企业用户字段 -->
          <template v-if="regForm.type === 'enterprise'">
            <el-form-item prop="companyType">
              <el-select v-model="regForm.companyType" placeholder="企业类型">
                <el-option label="新闻媒体" value="news"></el-option>
                <el-option label="社交平台" value="social"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="companyName">
              <el-input
                v-model="regForm.companyName"
                placeholder="企业名称"
              ></el-input>
            </el-form-item>

            <el-form-item prop="creditCode">
              <el-input
                v-model="regForm.creditCode"
                placeholder="统一社会信用代码"
              ></el-input>
            </el-form-item>

            <el-form-item prop="licenseFile">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handleEnterpriseUpload"
                :file-list="regForm.enterpriseFiles"
                list-type="picture"
                :before-upload="beforeLicenseUpload"
              >
                <el-button size="small" type="primary">上传营业执照</el-button>
                <div slot="tip" class="el-upload__tip">支持JPG/PNG/PDF格式，大小不超过5MB</div>
              </el-upload>
            </el-form-item>
          </template>

          <!-- 监管机构字段 -->
          <template v-if="regForm.type === 'supervisor'">
            <el-form-item prop="orgType">
              <el-select v-model="regForm.orgType" placeholder="机构类型">
                <el-option label="政府监管" value="gov"></el-option>
                <el-option label="行业协会" value="association"></el-option>
                <el-option label="其他" value="other"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="orgName">
              <el-input
                v-model="regForm.orgName"
                placeholder="机构名称"
              ></el-input>
            </el-form-item>

            <el-form-item prop="authFile">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handleSupervisorUpload"
                :file-list="regForm.supervisorFiles"
                list-type="picture"
                :before-upload="beforeAuthUpload"
              >
                <el-button size="small" type="primary">上传授权证明</el-button>
                <div slot="tip" class="el-upload__tip">支持PDF格式，大小不超过5MB</div>
              </el-upload>
            </el-form-item>
          </template>

          <!-- 管理员字段 -->
          <el-form-item v-if="regForm.type === 'admin'" prop="code">
            <el-input
              v-model="regForm.code"
              placeholder="管理员邀请码"
            ></el-input>
          </el-form-item>

          <el-button type="success" class="submit-btn" @click="handleRegister">立即注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      loginForm: {
        type: 'user',
        username: '',
        password: ''
      },
      regForm: {
        type: 'user',
        username: '',
        password: '',
        // 企业用户字段
        companyType: '',
        companyName: '',
        creditCode: '',
        enterpriseFiles: [],
        licenseFile: '',
        // 监管机构字段
        orgType: '',
        orgName: '',
        supervisorFiles: [],
        authFile: '',
        // 管理员字段
        code: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    regRules() {
      return {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '密码长度至少8位', trigger: 'blur' }
        ],
        companyType: [
          { required: this.regForm.type === 'enterprise', message: '请选择企业类型', trigger: 'change' }
        ],
        companyName: [
          { required: this.regForm.type === 'enterprise', message: '请输入企业名称', trigger: 'blur' }
        ],
        creditCode: [
          { required: this.regForm.type === 'enterprise', message: '请输入信用代码', trigger: 'blur' }
        ],
        licenseFile: [
          { required: this.regForm.type === 'enterprise', message: '请上传营业执照', trigger: 'change' }
        ],
        orgType: [
          { required: this.regForm.type === 'supervisor', message: '请选择机构类型', trigger: 'change' }
        ],
        orgName: [
          { required: this.regForm.type === 'supervisor', message: '请输入机构名称', trigger: 'blur' }
        ],
        authFile: [
          { required: this.regForm.type === 'supervisor', message: '请上传授权文件', trigger: 'change' }
        ],
        code: [
          { required: this.regForm.type === 'admin', message: '请输入邀请码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    switchMode(isLogin) {
      this.isLogin = isLogin
      this.$nextTick(() => {
        this.$refs.loginForm?.clearValidate()
        this.$refs.regForm?.clearValidate()
      })
    },

    // 文件上传处理
    handleEnterpriseUpload(res, file) {
      if (!file?.raw) {
    this.$message.error('文件上传失败')
    return
    }
      this.regForm.licenseFile = URL.createObjectURL(file.raw)
      this.regForm.enterpriseFiles = [file]
    },

    handleSupervisorUpload(res, file) {
      this.regForm.authFile = URL.createObjectURL(file.raw)
      this.regForm.supervisorFiles = [file]
    },

    beforeLicenseUpload(file) {
      const isAllowed = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      
      if (!isAllowed) {
        this.$message.error('只支持JPG/PNG/PDF格式!')
      }
      if (!isLt5M) {
        this.$message.error('文件大小不能超过5MB!')
      }
      return isAllowed && isLt5M
    },

    beforeAuthUpload(file) {
      const isPDF = file.type === 'application/pdf'
      const isLt5M = file.size / 1024 / 1024 < 5
      
      if (!isPDF) this.$message.error('只能上传PDF文件!')
      if (!isLt5M) this.$message.error('文件大小不能超过5MB!')
      return isPDF && isLt5M
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log('登录数据:', this.loginForm)
          // 实际登录逻辑
        }
      })
    },

    handleRegister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          const formData = new FormData()
          // 组装表单数据
          Object.keys(this.regForm).forEach(key => {
            if (key === 'enterpriseFiles' || key === 'supervisorFiles') return
            formData.append(key, this.regForm[key])
          })
          
          if (this.regForm.enterpriseFiles.length) {
            formData.append('license', this.regForm.enterpriseFiles[0].raw)
          }
          if (this.regForm.supervisorFiles.length) {
            formData.append('authFile', this.regForm.supervisorFiles[0].raw)
          }

          console.log('注册数据:', formData)
          if (this.isDemoMode()) {
            this.$message.success('人工审核中，预计24小时')
            this.switchMode(true)
          }
        }
      })
    },

    isDemoMode() {
      return process.env.NODE_ENV === 'development'
    },

    handleRemove(file, fileList) {
      if (this.regForm.type === 'enterprise') {
        this.regForm.enterpriseFiles = fileList
      } else if (this.regForm.type === 'supervisor') {
        this.regForm.supervisorFiles = fileList
      }
    },

    handlePreview(file) {
      window.open(file.url)
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(45deg, #f7fbff, #e3f2fd);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.5);
  z-index: 0;
}

.login-box {
  width: 450px;
  background: rgba(255,255,255,0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(64,158,255,0.1);
  padding: 40px;
  position: relative;
  z-index: 1;
}

.mode-tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 15px;
  cursor: pointer;
  color: #909399;
  transition: all 0.3s;
}

.tab-item.active {
  color: #409EFF;
  border-bottom: 2px solid #409EFF;
  font-weight: bold;
}

.title {
  text-align: center;
  color: #1a2f4b;
  margin-bottom: 10px;
  font-size: 28px;
}

.subtitle {
  text-align: center;
  color: #409EFF;
  margin-bottom: 30px;
  font-weight: normal;
}

.submit-btn {
  width: 100%;
  height: 45px;
  margin-top: 20px;
  font-size: 16px;
  letter-spacing: 2px;
  background: linear-gradient(45deg, #409EFF, #66b1ff);
  border: none;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(64,158,255,0.3);
}

.el-form-item {
  margin-bottom: 25px;
}

.el-input__inner {
  border-radius: 25px;
  padding-left: 40px;
}

.el-input__prefix {
  left: 15px;
}
</style>



