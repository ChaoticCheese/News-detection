<!-- src/components/NavBar.vue -->
<template>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="nav-container"
      background-color="#00152A"
      text-color="#fff"
      active-text-color="#409EFF"
    >
      <div class="nav-content">
        <!-- 左侧Logo -->
        <router-link to="/" class="logo-wrapper">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
          <span class="title">智见真章</span>
        </router-link>
  
        <!-- 右侧导航项 -->
        <div class="menu-items">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">产品功能</el-menu-item>
          <el-menu-item index="3">算法介绍</el-menu-item>
          <el-menu-item index="4">
            <el-dropdown>
              <span class="user-center">
                <el-avatar :size="32" :src="userAvatar" class="avatar"></el-avatar>
                <span>个人中心</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/profile')">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/history')">检测记录</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: '1',
        userAvatar: require('@/assets/default-avatar.png')
      }
    },
    methods: {
      logout() {
        // 退出登录逻辑
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .nav-container {
    height: 64px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  
    .nav-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      .logo-wrapper {
        display: flex;
        align-items: center;
        text-decoration: none;
  
        .logo {
          height: 40px;
          margin-right: 12px;
        }
  
        .title {
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(90deg, #00F2FE 0%, #4FACFE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
  
      .menu-items {
        display: flex;
        align-items: center;
  
        .user-center {
          display: flex;
          align-items: center;
          color: #fff;
  
          .avatar {
            margin-right: 8px;
          }
        }
      }
  
      ::v-deep .el-menu-item {
        height: 64px;
        line-height: 64px;
        font-size: 16px;
        transition: all 0.3s;
  
        &:hover {
          background: rgba(64,158,255,0.1) !important;
        }
      }
    }
  }
  </style>