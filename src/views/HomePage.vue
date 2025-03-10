<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <NavBar />

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 头图区 -->
      <div class="hero-section">
        <div class="hero-text">
          <h1>面向新闻场景的伪造检测平台</h1>
          <p class="subtitle">基于AI技术的多维度新闻可信度评估系统</p>
          <div class="search-box">
            <el-input
              placeholder="输入新闻内容或URL进行检测"
              v-model="searchText"
              class="search-input"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                type="primary"
                @click="handleSearch"
              >立即检测</el-button>
            </el-input>
          </div>
        </div>
        <div class="hero-image">
          <img src="@/assets/科技插画.webp" alt="科技背景">
        </div>
      </div>

      <!-- 功能亮点 -->
      <div class="features-section">
        <h2 class="section-title">核心功能</h2>
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="8" v-for="(feature, index) in features" :key="index">
            <div class="feature-card">
              <div class="icon-wrapper">
                <i :class="feature.icon" class="feature-icon"></i>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 统计看板 -->
      <div class="stats-section">
        <h2 class="section-title">平台数据监测</h2>
        <el-row :gutter="30">
          <el-col :xs="24" :md="8">
            <div class="stats-grid">
              <div class="stat-item" v-for="(stat, index) in stats" :key="index">
                <div class="stat-content">
                  <div class="stat-icon">
                    <i :class="stat.icon"></i>
                  </div>
                  <div class="stat-text">
                    <h3>{{ stat.title }}</h3>
                    <div class="stat-value">
                      <count-to 
                        :start-val="0"
                        :end-val="stat.value"
                        :duration="2000"
                        :autoplay="true"
                      />
                      <span v-if="stat.unit">{{ stat.unit }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :md="16">
            <div class="chart-container">
              <div ref="trendChart" style="width: 100%; height: 300px;"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import CountTo from 'vue-count-to'
import * as echarts from 'echarts'

export default {
  components: {
    NavBar,
    CountTo,
  },
  data() {
    return {
      searchText: '',
      features: [
        {
          icon: 'el-icon-document-checked',
          title: '多模态检测',
          desc: '支持文本、图片、视频的深度伪造识别'
        },
        {
          icon: 'el-icon-cpu',
          title: 'AI分析',
          desc: '基于大语言模型的语义矛盾检测'
        },
        {
          icon: 'el-icon-data-line',
          title: '实时监控',
          desc: '全网热点新闻实时追踪分析'
        }
      ],
      stats: [
        { 
          icon: 'el-icon-collection',
          title: '累计检测新闻',
          value: 125432,
          unit: '篇'
        },
        {
          icon: 'el-icon-alarm-clock',
          title: '当日检测量',
          value: 1845,
          unit: '篇'
        },
        {
          icon: 'el-icon-success',
          title: '平均准确率',
          value: 82.3,
          unit: '%'
        }
      ],
      trendData: [
        { date: '10/01', count: 1420 },
        { date: '10/02', count: 1560 },
        { date: '10/03', count: 1893 },
        { date: '10/04', count: 1782 },
        { date: '10/05', count: 1645 },
        { date: '10/06', count: 1920 }
      ]
    }
  },
  mounted() {
    this.initTrendChart()
  },
  methods: {
    handleSearch() {
      // 检测逻辑
    },
    initTrendChart() {
      const chart = echarts.init(this.$refs.trendChart)
      
      // 创建渐变颜色函数
      const generateGradient = () => new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#40c9ff' },
          { offset: 0.5, color: '#36a5ff' },
          { offset: 1, color: '#2d8cf0' }
        ]
      )

      const option = {
        color: [generateGradient()],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,33,64,0.9)',
          borderColor: '#409EFF',
          textStyle: {
            color: '#fff'
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(64,158,255,0.1)'
            }
          }
        },
        xAxis: {
          type: 'category',
       data: (this.trendData || []).map(d => d?.date || ''),
          axisLabel: {
            color: '#8EC0F4'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(142, 192, 244, 0.2)'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#8EC0F4'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(142, 192, 244, 0.2)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(142, 192, 244, 0.05)'
            }
          }
        },
        series: [{
          data: this.trendData.map(d => d.count),
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            borderRadius: [12, 12, 0, 0],
            color: generateGradient()
          },
          emphasis: {
            itemStyle: {
              shadowColor: 'rgba(64,158,255,0.5)',
              shadowBlur: 12
            }
          }
        }],
        grid: {
          left: '3%',
          right: '3%',
          bottom: '10%',
          containLabel: true
        }
      }
      
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background: linear-gradient(180deg, #00152A 0%, #003366 100%);
  min-height: 100vh;

  .main-content {
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;

    // Hero 区块
    .hero-section {
      display: flex;
      align-items: center;
      padding: 80px 0;
      color: white;

      .hero-text {
        flex: 1;
        h1 {
          font-size: 46px;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .subtitle {
          font-size: 18px;
          color: #B0D7FF;
          margin-bottom: 40px;
        }
        .search-input {
          width: 80%;
          ::v-deep .el-input__inner {
            height: 50px;
            border-radius: 25px;
            padding: 0 25px;
            font-size: 16px;
          }
          ::v-deep .el-input-group__append {
            border-radius: 0 25px 25px 0;
            background: #409EFF;
            border: none;
            .el-button {
              font-size: 16px;
              padding: 0 30px;
            }
          }
        }
      }

      .hero-image {
        flex: 1;
        text-align: right;
        img {
          max-width: 100%;
          height: 400px;
        }
      }
    }

    // 统计区块
    .stats-section {
      margin-top: 80px;
      padding: 60px 0;
      background: rgba(0, 21, 42, 0.8);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #409EFF 50%, transparent);
      }

      .section-title {
        color: white;
        font-size: 32px;
        text-align: center;
        margin-bottom: 40px;
        position: relative;
        padding-bottom: 15px;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, #409EFF, #2d8cf0);
        }
      }

      .stats-grid {
        display: grid;
        gap: 25px;
        padding: 15px;

        .stat-item {
          background: rgba(64, 158, 255, 0.1);
          border-radius: 8px;
          padding: 20px;
          border: 1px solid rgba(64, 158, 255, 0.2);
          transition: transform 0.3s ease, background 0.3s;

          &:hover {
            transform: translateY(-5px);
            background: rgba(64, 158, 255, 0.15);
            box-shadow: 0 8px 20px rgba(64, 158, 255, 0.1);
          }

          .stat-content {
            display: flex;
            align-items: center;

            .stat-icon {
              width: 50px;
              height: 50px;
              background: rgba(64, 158, 255, 0.2);
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 15px;
              transition: transform 0.3s;

              i {
                font-size: 24px;
                color: #409EFF;
                transition: color 0.3s;
              }
            }

            .stat-text {
              h3 {
                color: #B0D7FF;
                font-size: 14px;
                margin-bottom: 5px;
              }

              .stat-value {
                font-size: 26px;
                font-weight: bold;
                color: #fff;

                span {
                  font-size: 14px;
                  margin-left: 4px;
                  color: #409EFF;
                }
              }
            }
          }
        }
      }

      .chart-container {
        background: rgba(0, 33, 64, 0.5);
        border-radius: 8px;
        padding: 20px;
        border: 1px solid rgba(64, 158, 255, 0.2);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(64, 158, 255, 0.1),
            transparent
          );
          animation: chartGlow 3s infinite;
        }

        ::v-deep .echarts-bar {
          transition: transform 0.3s;
          
          &:hover {
            transform: scale(1.02);
          }
        }
      }
    }

    // 特性区块
    .features-section {
      margin-top: 100px;
      .section-title {
        color: white;
        font-size: 36px;
        text-align: center;
        margin-bottom: 60px;
        position: relative;
        &::after {
          content: '';
          width: 60px;
          height: 3px;
          background: #409EFF;
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .feature-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(64,158,255,0.2);
        border-radius: 10px;
        padding: 30px;
        text-align: center;
        transition: all 0.3s;
        margin-bottom: 30px;

        &:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(64,158,255,0.1);
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          background: rgba(64,158,255,0.1);
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          .feature-icon {
            font-size: 36px;
            color: #409EFF;
          }
        }

        h3 {
          color: white;
          font-size: 20px;
          margin: 15px 0;
        }
        p {
          color: #B0D7FF;
          font-size: 14px;
          line-height: 1.6;
        }
      }
    }
  }
}

@keyframes chartGlow {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>