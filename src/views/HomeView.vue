<template>
  <div class="home">
    <h1>墓改生成内容检测平台</h1>
    <h2>深度伪造检测领域的引领者</h2>
    <p class="description">我们的平台提供先进的技术，帮助您检测文本、图像和视频中的AI生成和伪造痕迹。</p>
    <div class="detection-options">
      <div class="option" @click="goToTextDetection">
        <div class="icon">📄</div>
        <h3>文本生成检测</h3>
        <p>检测文本是否存在AI生成痕迹</p>
        <div class="option-image"></div>
        <div class="example">
          <p>示例：这是一段疑似AI生成的文本...</p>
          <p>检测结果：AI生成概率 85%</p>
        </div>
      </div>
      <div class="option" @click="goToImageDetection">
        <div class="icon">📷</div>
        <h3>图像伪造检测</h3>
        <p>检测图像是否存在AI生成、图像篡改、人脸伪造痕迹</p>
        <div class="option-image"></div>
        <div class="example">
          <p>示例：这是一张可能被伪造的图像...</p>
          <p>检测结果：伪造概率 90%</p>
        </div>
      </div>
      <div class="option" @click="goToVideoDetection">
        <div class="icon">🎥</div>
        <h3>视频伪造检测</h3>
        <p>检测视频是否存在AI生成、人脸伪造痕迹</p>
        <div class="option-image"></div>
        <div class="example">
          <p>示例：这是一段有伪造痕迹的视频...</p>
          <p>检测结果：伪造概率 75%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToTextDetection () {
      this.$router.push('/text-detection')
    },
    goToImageDetection () {
      this.$router.push('/image-detection')
    },
    goToVideoDetection () {
      this.$router.push('/video-detection')
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  font-family: 'Lora', serif;
}

h1 {
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
}

h2 {
  font-size: 1.8rem;
  color: #555;
  margin-bottom: 40px;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
}

.description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.8;
  font-family: 'Lora', serif;
}

.detection-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.option {
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.option:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.option-image {
  width: 100%;
  height: 150px;
  background: url('@/assets/text-detection-image.jpg') no-repeat center center / cover;
  margin-top: 20px;
  border-radius: 8px;
  opacity: 1; /* 修改为1，使图片一开始就显示 */
  transition: opacity 0.3s ease;
}

.option:hover .option-image {
  opacity: 1;
}

.icon {
  font-size: 3rem;
  color: #6c5ce7;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
}

p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  font-family: 'Lora', serif;
}

.example {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #888;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detection-options {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 2.2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  .description {
    font-size: 1.1rem;
  }
}
</style>
