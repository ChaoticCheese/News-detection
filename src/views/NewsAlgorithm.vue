<template>
    <div class="algorithm-container">
      <!-- 共享导航栏 -->
      <NavBar />
  
      <!-- 算法内容区 -->
      <div class="main-content">
        <!-- 标题 -->
        <h1 class="page-title">核心技术解析</h1>
        <p class="page-subtitle">多模态融合的新闻伪造检测技术体系</p>
  
        <!-- 算法时间轴 -->
        <el-timeline>
          <!-- 自然语言处理 -->
          <el-timeline-item
            v-for="category in categories"
            :key="category.title"
            :timestamp="category.title"
            placement="top"
          >
            <el-card class="algorithm-card">
              <el-row :gutter="30">
                <el-col :md="12">
                  <div class="algorithm-desc">
                    <h3>{{ category.subtitle }}</h3>
                    <ul class="algorithm-list">
                      <li v-for="(item, index) in category.algorithms" :key="index">
                        <i class="el-icon-caret-right"></i>
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :md="12">
                  <div class="algorithm-image">
                    <img :src="category.image" :alt="category.title">
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar'
  
  export default {
    components: {
      NavBar
    },
    data() {
      return {
        categories: [
          {
            title: "基于大模型的文本分析",
            subtitle: "文本语义分析与矛盾检测",
            image: require('@/assets/case1.jpg'),
            algorithms: [
              'BERT 文本嵌入（文本语义向量化）',
              'BiLSTM 双向长短期记忆网络（上下文建模）',
              'TextCNN 文本卷积神经网络（局部特征提取）',
              'Transformer 自注意力机制（关键信息捕获）'
            ]
          },
          {
            title: "计算机视觉",
            subtitle: "图像/视频伪造特征提取",
            image: require('@/assets/case2.jpg'),
            algorithms: [
              'ResNet-50 图像特征提取',
              '3D-CNN 视频时空特征分析',
              'SIFT 关键点检测（传统方法）',
              '光流法（视频帧间运动分析）'
            ]
          },
          {
            title: "多模态融合",
            subtitle: "跨媒体特征联合分析",
            image: require('@/assets/case3.jpg'),
            algorithms: [
              '早期特征拼接融合（Early Fusion）',
              '晚期决策加权融合（Late Fusion）',
              '跨模态注意力机制',
              '图神经网络多模态关联'
            ]
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .algorithm-container {
    background: linear-gradient(180deg, #00152A 0%, #003366 100%);
    min-height: 100vh;
  }
  
  .algorithm-container .main-content {
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
    color: white;
  }
  
  .algorithm-container .main-content .page-title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .algorithm-container .main-content .page-subtitle {
    font-size: 18px;
    color: #B0D7FF;
    text-align: center;
    margin-bottom: 60px;
  }
  
  .algorithm-container .main-content ::v-deep .el-timeline {
    padding-left: 0;
    min-height: 100px;
  }

  .algorithm-container .main-content ::v-deep .el-timeline-item {
  display: flex;
  justify-content: center;
}

.algorithm-container .main-content ::v-deep .el-timeline-item__wrapper {
  width: 80%; /* 控制卡片容器宽度 */
  max-width: 900px; /* 最大宽度限制 */
  margin: 0 auto; /* 水平居中 */
}
  
  .algorithm-container .main-content ::v-deep .el-timeline-item__timestamp {
    color: #409EFF;
    font-size: 24px;
    position: absolute;
    left: -126px; /* 调整时间戳位置 */
    width: 150px;
    text-align: right;
    top: -8px;
    margin-bottom: 30px;
    margin-right: 199px;
  }
  
  .algorithm-container .main-content .algorithm-card {
    background: rgba(201, 210, 219, 0.05);
    border: 1px solid rgba(64,158,255,0.2);
    margin-bottom: 40px;
    transition: transform 0.3s;
    border-radius: 10px; /* 圆角程度 */
    box-shadow: 1px 2px 29px rgba(255, 255, 255, 0.3); /* 白色投影 */
    width: 100%; /* 占满容器 */
  }
  
  .algorithm-container .main-content .algorithm-card:hover {
    transform: translateX(10px);
  }
  
  .algorithm-container .main-content .algorithm-card ::v-deep .el-card__body {
    padding: 30px;
  }
  
  .algorithm-container .main-content .algorithm-card h3 {
    font-size: 20px;
    color: #409EFF;
    margin-bottom: 20px;
  }
  
  .algorithm-container .main-content .algorithm-card .algorithm-list li {
    padding: 10px 5px;
    font-size: 16px;
    color: #f0f2f3;
    border-bottom: 1px dashed rgba(64,158,255,0.2);
  }
  
  .algorithm-container .main-content .algorithm-card .algorithm-list li i {
    color: #409EFF;
    margin-right: 10px;
  }
  
  .algorithm-container .main-content .algorithm-card .algorithm-image {
    padding: 20px;
    background: rgba(0,0,0,0.3);
    border-radius: 4px;
  }
  
  .algorithm-container .main-content .algorithm-card .algorithm-image img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    .algorithm-container .main-content {
      width: 100%;
      padding: 20px;
    }
    
    @media (max-width: 992px) {
  .el-timeline-item__timestamp {
    position: static;
    text-align: left;
  }
}

    .algorithm-container .main-content ::v-deep .el-timeline {
      padding-left: 0;
    }
    
    /* 时间轴项容器 */
.algorithm-container .main-content ::v-deep .el-timeline-item {
  position: relative;
  padding-bottom: 60px; /* 为标题留出空间 */
}

    .algorithm-container .main-content ::v-deep .el-timeline-item__timestamp {
      font-size: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      background: rgba(0, 33, 66, 0.9);
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 20px;
      border: 1px solid rgba(64,158,255,0.5);
      box-shadow: 0 0 10px rgba(64,158,255,0.2);
      white-space: nowrap;
    }
    
    .algorithm-container .main-content .algorithm-card {
      margin-bottom: 20px;
    }
    
    .algorithm-container .main-content .algorithm-card .el-col {
      width: 100%;
    }
    
    .algorithm-container .main-content .algorithm-card .algorithm-image {
      margin-top: 20px;
    }
  }
  </style>