<template>
  <div class="app-container">
    <!-- 左侧边栏 -->
    <div :class="['sidebar', { 'sidebar-collapsed': isSidebarCollapsed }]">
      <div class="sidebar-header">
        <h2 v-if="!isSidebarCollapsed">{{ platformName }}</h2>
        <button @click="toggleSidebar" class="collapse-button">
          {{ isSidebarCollapsed ? '打开' : '收起' }}
          <span v-if="isSidebarCollapsed" class="icon">&#9776;</span> <!-- 展开图标 -->
        </button>
      </div>
      <div v-if="!isSidebarCollapsed" class="sidebar-content">
        <h3>检测记录</h3>
        <ul>
          <li v-for="(record, index) in detectionRecords" :key="index" @click="viewRecord(record)">
            <span>{{ record.text }}</span>
            <span class="record-verdict" :class="record.verdict === '真' ? 'true-result' : 'false-result'">
              {{ record.verdict }}
            </span>
          </li>
        </ul>
        <div class="sidebar-footer">
          <ul>
            <li @click="goToPersonalCenter">
              <span>个人中心</span>
            </li>
            <li @click="downloadApp">
              <span>下载 APP</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <div class="text-detection-container">
        <!-- 返回首页按钮 -->
        <button class="back-home-button" @click="goToHome">返回</button>
        <div class="text-detection">
          <h1>文本生成检测</h1>
          <div class="input-section">
            <h3>输入或粘贴文本</h3>
            <textarea v-model="inputText" placeholder="请输入文本内容..." />
          </div>
          <div class="button-section">
            <button @click="handleDetectText" :disabled="isDetecting">生成检测报告</button>
          </div>
          <div v-if="isDetecting" class="progress-section">
            <vue-progress-bar />
          </div>
          <div v-if="detectionResult" class="result-section">
            <h3>检测结果</h3>
            <p>伪造概率：<span>{{ detectionResult.probability }}%</span></p>
            <p>检测结论：<span :class="resultClass">{{ detectionResult.verdict }}</span></p>
            <div :class="['stamp', stampClass]">
              {{ detectionResult.verdict === '真' ? '真' : '假' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: '#6c5ce7',
  failedColor: '#ff0000',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

export default {
  name: 'TextDetection',
  data () {
    return {
      inputText: '',
      isDetecting: false,
      detectionResult: null,
      isSidebarCollapsed: false, // 边栏是否收起
      platformName: '检测平台', // 平台名称
      detectionRecords: [ // 检测记录
        { text: '近日，国家统计局发布了最新的经济数据......', verdict: '真' },
        { text: '据不可靠消息称，科学家已经发明了一种......', verdict: '假' },
        { text: '苹果公司近日发布了iPhone 15系列手机。', verdict: '真' },
        { text: '最新研究表明，人类可以通过意念控制......', verdict: '假' },
        { text: '美国宇航员尼尔·阿姆斯特朗成为第一......', verdict: '真' },
        { text: '在第二次世界大战期间，德国科学家发......', verdict: '假' }
      ]
    }
  },
  computed: {
    resultClass () {
      return this.detectionResult?.verdict === '真' ? 'true-result' : 'false-result'
    },
    stampClass () {
      return this.detectionResult?.verdict === '真' ? 'true-stamp' : 'false-stamp'
    }
  },
  methods: {
    async handleDetectText () {
      if (!this.inputText.trim()) {
        alert('请输入文本内容！')
        return
      }
      this.isDetecting = true
      this.detectionResult = null
      this.$Progress.start()
      try {
        // 模拟 API 请求
        const response = await axios.post('/api/detect-text', {
          text: this.inputText
        })
        // 假设返回的数据结构为 { probability: number, verdict: string }
        this.detectionResult = response.data
        this.$Progress.finish()
      } catch (error) {
        console.error('检测失败:', error)
        alert('检测失败，请稍后再试！')
        this.$Progress.fail()
      } finally {
        this.isDetecting = false
      }
    },
    // 切换边栏收起/展开
    toggleSidebar () {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    },
    // 跳转到个人中心
    goToPersonalCenter () {
      alert('跳转到个人中心')
    },
    // 下载 APP
    downloadApp () {
      alert('下载 APP')
    },
    // 查看检测记录
    viewRecord (record) {
      alert(`查看记录：${record.text}`)
    },
    // 返回首页
    goToHome () {
      this.$router.push({ name: 'homeview' }) // 假设首页的路由名称为 'home'
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px; /* 边栏宽度 */
  background: #2c3e50; /* 深色背景 */
  color: white;
  transition: width 0.3s ease;
  overflow-y: auto; /* 允许滚动 */
}

.sidebar-collapsed {
  width: 60px; /* 收起后的宽度 */
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.collapse-button {
  margin-top: 10px;
  padding: 5px 10px;
  background: #38506a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-button .icon {
  font-size: 1.2rem;
  margin-left: 5px;
}

.sidebar-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px); /* 调整高度以适应内容 */
}

.sidebar-content ul {
  list-style: none;
  padding: 0;
}

.sidebar-content li {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.sidebar-content li:hover {
  background: #34495e;
}

.record-verdict {
  float: right;
  font-weight: bold;
}

.sidebar-footer {
  margin-top: 20px; /* 调整间距 */
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec); /* 淡蓝色渐变背景 */
  padding: 20px;
}

.text-detection-container {
  width: 100%;
  max-width: 800px;
  position: relative; /* 为返回首页按钮定位 */
}

.back-home-button {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距离顶部 10px */
  left: 10px; /* 距离左侧 10px */
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background: linear-gradient(135deg, #6c5ce7, #8e7cff); /* 紫色渐变 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.back-home-button:hover {
  background: linear-gradient(135deg, #5a4dbf, #7b6cf5); /* 悬停时渐变变深 */
}

.text-detection {
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Lora', serif;
}

h1 {
  font-size: 2.4rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.input-section {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  background-color: #f9f9f9; /* 浅灰色背景 */
}

.button-section {
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background: linear-gradient(135deg, #6c5ce7, #8e7cff); /* 紫色渐变 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(135deg, #5a4dbf, #7b6cf5); /* 悬停时渐变变深 */
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.progress-section {
  text-align: center;
  margin-bottom: 20px;
}

.result-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.result-section p {
  font-size: 1.2rem;
  margin: 10px 0;
}

.result-section span {
  font-weight: bold;
}

.true-result {
  color: green;
}

.false-result {
  color: red;
}

.stamp {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  border-radius: 50%;
  background-color: white;
  border: 4px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.true-stamp {
  border-color: green;
  color: green;
}

.false-stamp {
  border-color: red;
  color: red;
}
</style>
