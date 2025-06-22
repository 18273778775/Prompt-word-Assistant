# 提示词优化助手 MVP 工程结构与数据结构设计文档（ERD）

## 一、工程目录结构

```
├── manifest.json      // 插件配置文件
├── popup.html         // 弹窗主界面
├── popup.js           // 主要逻辑脚本
├── styles.css         // 样式文件
├── README.md          // 说明文档
├── prd.md             // 产品需求文档
├── erd.md             // 工程结构与数据结构设计文档
├── todolist.md        // 开发任务清单
```

## 二、主要文件说明
- manifest.json：Chrome插件配置，声明入口、权限等
- popup.html：弹窗UI结构
- popup.js：核心功能逻辑（模板库、Prompt管理、标签分类等）
- styles.css：样式文件
- README.md：项目说明
- prd.md：产品需求文档
- erd.md：工程结构与数据结构设计文档
- todolist.md：开发任务清单

## 三、数据结构设计

### 1. Prompt 数据结构
```js
{
  content: String,      // Prompt内容
  tags: [String],       // 标签数组
  category: String,     // 分类（如写作/代码/总结）
  timestamp: String     // 保存时间（可选）
}
```

### 2. 模板（Template）数据结构
```js
{
  name: String,         // 模板名称
  content: String,      // 模板内容
  category: String,     // 分类
  tags: [String]        // 标签
}
```

### 3. localStorage 结构
```js
{
  savedPrompts: [Prompt],    // 已保存Prompt列表
  // 模板库可直接写在js文件中，或后续支持自定义扩展
}
```

### 4. 分类与标签
- 分类为固定枚举（如写作、代码、总结），可后续扩展
- 标签为用户自定义字符串数组

### 5. 主要UI模块与功能映射
| 模块         | 主要功能描述                   |
|--------------|-------------------------------|
| 输入区       | 输入Prompt、选择分类、标签     |
| 按钮区       | 一键复制、保存                 |
| 模板库区     | 展示内置模板、插入到输入框     |
| 已保存区     | 展示/筛选/复制/删除已保存Prompt| 