document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const promptInput = document.getElementById('promptInput');
  const optimizeBtn = document.getElementById('optimizeBtn');
  const copyBtn = document.getElementById('copyBtn');
  const saveBtn = document.getElementById('saveBtn');
  const optimizedPrompt = document.getElementById('optimizedPrompt');
  const statusDiv = document.getElementById('status');
  const addRoleCheckbox = document.getElementById('addRole');
  const addFormatCheckbox = document.getElementById('addFormat');
  const addConstraintsCheckbox = document.getElementById('addConstraints');
  const roleTypeSelect = document.getElementById('roleType');
  const formatTypeSelect = document.getElementById('formatType');
  const constraintTypeSelect = document.getElementById('constraintType');

  // 角色模板
  const roleTemplates = [
    // 专家型角色
    "你是一位专业的{domain}专家，拥有丰富的{domain}经验和知识。",
    "作为一位资深的{domain}顾问，你擅长{skill}。",
    "你是一位{domain}领域的权威人士，对{skill}有深入的研究。",
    
    // 教育型角色
    "你是一位{domain}领域的教育专家，擅长将复杂的概念转化为易于理解的内容。",
    "作为{domain}的资深讲师，你有着丰富的教学经验和{skill}的专业知识。",
    
    // 研究型角色
    "你是一位专注于{domain}的研究学者，在{skill}方面有深入的研究成果。",
    "作为{domain}领域的科研人员，你掌握最新的研究进展和{skill}的前沿技术。",
    
    // 实践型角色
    "你是一位{domain}领域的实践专家，拥有丰富的实战经验和{skill}的专业技能。",
    "作为{domain}的资深从业者，你精通{skill}，并能够提供实用的解决方案。",
    
    // 创意型角色
    "你是一位{domain}领域的创意专家，擅长将{skill}转化为创新的解决方案。",
    "作为{domain}的创意总监，你有着独特的视角和丰富的{skill}经验。"
  ];

  // 格式模板
  const formatTemplates = [
    // 分析型格式
    "请按照以下格式提供回答：\n1. 概述\n2. 详细分析\n3. 建议",
    "回答时请遵循以下结构：\n- 背景介绍\n- 核心内容\n- 总结",
    
    // 教程型格式
    "请按照以下步骤进行讲解：\n1. 基础知识\n2. 核心概念\n3. 实践应用\n4. 进阶技巧",
    "请以教程的形式组织内容：\n- 目标说明\n- 前置知识\n- 详细步骤\n- 注意事项",
    
    // 报告型格式
    "请按照以下结构撰写报告：\n1. 执行摘要\n2. 背景分析\n3. 主要发现\n4. 建议方案",
    "请以报告的形式呈现：\n- 摘要\n- 引言\n- 方法论\n- 数据分析\n- 结论建议",
    
    // 对比型格式
    "请按照以下框架进行对比分析：\n1. 概述\n2. 优势对比\n3. 劣势对比\n4. 适用场景",
    "请从以下维度进行比较：\n- 基本特征\n- 性能对比\n- 成本分析\n- 应用建议",
    
    // 决策型格式
    "请按照以下步骤提供决策建议：\n1. 问题分析\n2. 方案对比\n3. 风险评估\n4. 最终建议",
    "请以决策框架组织内容：\n- 现状评估\n- 目标设定\n- 方案设计\n- 实施建议"
  ];

  // 约束模板
  const constraintTemplates = [
    // 专业性约束
    "在回答时，请确保：\n- 使用专业术语\n- 提供具体例子\n- 保持客观中立",
    "回答要求：\n- 简明扼要\n- 重点突出\n- 逻辑清晰",
    
    // 深度约束
    "请注意以下要求：\n- 深入分析问题本质\n- 提供详实的论据\n- 考虑多个维度",
    "回答时请注重：\n- 理论深度\n- 实践价值\n- 创新视角",
    
    // 实用性约束
    "请确保回答：\n- 具有可操作性\n- 提供具体步骤\n- 包含实际案例",
    "回答要求：\n- 实用性强\n- 易于执行\n- 效果可验证",
    
    // 创新性约束
    "请注意：\n- 提供创新思路\n- 突破常规思维\n- 结合最新趋势",
    "回答时请注重：\n- 创新性\n- 前瞻性\n- 可行性",
    
    // 完整性约束
    "请确保：\n- 内容全面完整\n- 逻辑严密\n- 结论明确",
    "回答要求：\n- 结构完整\n- 论述充分\n- 结论可靠"
  ];

  // 内置优质模版库（可根据实际内容扩展）
  const templates = [
    {
      name: '写作-故事创作',
      content: '请帮我写一个关于勇气和成长的短篇故事。',
      category: '写作',
      tags: ['故事', '创作']
    },
    {
      name: '代码-算法优化',
      content: '请优化以下Python代码并解释优化思路：',
      category: '代码',
      tags: ['代码', '优化']
    },
    {
      name: '总结-会议纪要',
      content: '请根据以下内容生成一份简明扼要的会议纪要。',
      category: '总结',
      tags: ['总结', '会议']
    }
  ];

  // 本地存储Key
  const SAVED_PROMPTS_KEY = 'savedPrompts';

  // 工具函数
  function getSavedPrompts() {
    return JSON.parse(localStorage.getItem(SAVED_PROMPTS_KEY) || '[]');
  }
  function setSavedPrompts(list) {
    localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(list));
  }

  // 渲染优质模版库
  function renderTemplateList() {
    const list = document.getElementById('templateList');
    list.innerHTML = '';
    templates.forEach((tpl, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${tpl.name}</strong> <span class="tag">[${tpl.category}]</span> <button data-idx="${idx}" class="use-template">插入</button><br><span class="content">${tpl.content}</span>`;
      list.appendChild(li);
    });
  }

  // 渲染已保存Prompt列表
  function renderSavedPromptList(filterCategory = '', filterTag = '') {
    const list = document.getElementById('savedPromptList');
    list.innerHTML = '';
    let prompts = getSavedPrompts();
    if (filterCategory) {
      prompts = prompts.filter(p => p.category === filterCategory);
    }
    if (filterTag) {
      prompts = prompts.filter(p => p.tags && p.tags.includes(filterTag));
    }
    prompts.forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.content}</span> <span class="tag">[${item.category}]</span> <span class="tag">${item.tags ? item.tags.join(',') : ''}</span> <button data-idx="${idx}" class="copy-saved">复制</button> <button data-idx="${idx}" class="delete-saved">删除</button>`;
      list.appendChild(li);
    });
  }

  // 初始化本地存储
  function initializeStorage() {
    chrome.storage.local.get(['savedPrompts', 'lastSettings'], (result) => {
      if (!result.savedPrompts) {
        chrome.storage.local.set({ savedPrompts: [] });
      }
      if (result.lastSettings) {
        // 恢复上次的设置
        addRoleCheckbox.checked = result.lastSettings.addRole;
        addFormatCheckbox.checked = result.lastSettings.addFormat;
        addConstraintsCheckbox.checked = result.lastSettings.addConstraints;
        roleTypeSelect.value = result.lastSettings.roleType;
        formatTypeSelect.value = result.lastSettings.formatType;
        constraintTypeSelect.value = result.lastSettings.constraintType;
      }
    });
  }

  // 保存当前设置
  function saveSettings() {
    const settings = {
      addRole: addRoleCheckbox.checked,
      addFormat: addFormatCheckbox.checked,
      addConstraints: addConstraintsCheckbox.checked,
      roleType: roleTypeSelect.value,
      formatType: formatTypeSelect.value,
      constraintType: constraintTypeSelect.value
    };
    chrome.storage.local.set({ lastSettings: settings });
  }

  // 保存优化后的提示词
  function savePrompt(prompt, optimized) {
    chrome.storage.local.get(['savedPrompts'], (result) => {
      const savedPrompts = result.savedPrompts || [];
      savedPrompts.push({
        original: prompt,
        optimized: optimized,
        timestamp: new Date().toISOString()
      });
      chrome.storage.local.set({ savedPrompts: savedPrompts });
    });
  }

  // 显示状态消息
  function showStatus(message, type = 'success', duration = 2000) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.classList.add('show');
    setTimeout(() => {
      statusDiv.classList.remove('show');
    }, duration);
  }

  // 优化提示词
  function optimizePrompt(prompt, options) {
    try {
      let optimized = prompt;
      
      // 分析输入提示词，提取领域和技能关键词
      const domainMatch = prompt.match(/(?:关于|涉及|在|的)([\u4e00-\u9fa5a-zA-Z]+)(?:方面|领域|问题|内容)/);
      const domain = domainMatch ? domainMatch[1] : "相关";
      const skillMatch = prompt.match(/(?:擅长|精通|熟悉|了解)([\u4e00-\u9fa5a-zA-Z、]+)/);
      const skill = skillMatch ? skillMatch[1] : "相关领域";

      // 根据提示词内容选择合适的模板
      const isEducational = prompt.match(/(?:讲解|教学|学习|教程)/);
      const isResearch = prompt.match(/(?:研究|分析|调查|报告)/);
      const isCreative = prompt.match(/(?:创意|创新|设计|方案)/);
      const isPractical = prompt.match(/(?:实践|操作|应用|实施)/);
      const isDecision = prompt.match(/(?:决策|选择|比较|对比)/);

      // 添加角色设定
      if (options.addRole) {
        let roleTemplate;
        if (options.roleType !== 'auto') {
          // 使用用户选择的角色类型
          const roleIndex = {
            'expert': 0,
            'educator': 3,
            'researcher': 5,
            'practitioner': 7,
            'creative': 9
          }[options.roleType];
          roleTemplate = roleTemplates[roleIndex];
        } else {
          // 自动选择角色类型
          if (isEducational) {
            roleTemplate = roleTemplates[3];
          } else if (isResearch) {
            roleTemplate = roleTemplates[5];
          } else if (isCreative) {
            roleTemplate = roleTemplates[9];
          } else if (isPractical) {
            roleTemplate = roleTemplates[7];
          } else {
            roleTemplate = roleTemplates[Math.floor(Math.random() * roleTemplates.length)];
          }
        }
        
        roleTemplate = roleTemplate
          .replace('{domain}', domain)
          .replace('{skill}', skill);
        optimized = roleTemplate + "\n\n" + optimized;
      }

      // 添加格式要求
      if (options.addFormat) {
        let formatTemplate;
        if (options.formatType !== 'auto') {
          // 使用用户选择的格式类型
          const formatIndex = {
            'analysis': 0,
            'tutorial': 2,
            'report': 4,
            'comparison': 6,
            'decision': 8
          }[options.formatType];
          formatTemplate = formatTemplates[formatIndex];
        } else {
          // 自动选择格式类型
          if (isEducational) {
            formatTemplate = formatTemplates[2];
          } else if (isResearch) {
            formatTemplate = formatTemplates[4];
          } else if (isCreative) {
            formatTemplate = formatTemplates[8];
          } else if (isPractical) {
            formatTemplate = formatTemplates[2];
          } else if (isDecision) {
            formatTemplate = formatTemplates[6];
          } else {
            formatTemplate = formatTemplates[Math.floor(Math.random() * formatTemplates.length)];
          }
        }
        optimized += "\n\n" + formatTemplate;
      }

      // 添加约束条件
      if (options.addConstraints) {
        let constraintTemplate;
        if (options.constraintType !== 'auto') {
          // 使用用户选择的约束类型
          const constraintIndex = {
            'professional': 0,
            'depth': 2,
            'practical': 4,
            'innovative': 6,
            'complete': 8
          }[options.constraintType];
          constraintTemplate = constraintTemplates[constraintIndex];
        } else {
          // 自动选择约束类型
          if (isEducational) {
            constraintTemplate = constraintTemplates[2];
          } else if (isResearch) {
            constraintTemplate = constraintTemplates[8];
          } else if (isCreative) {
            constraintTemplate = constraintTemplates[6];
          } else if (isPractical) {
            constraintTemplate = constraintTemplates[4];
          } else if (isDecision) {
            constraintTemplate = constraintTemplates[8];
          } else {
            constraintTemplate = constraintTemplates[Math.floor(Math.random() * constraintTemplates.length)];
          }
        }
        optimized += "\n\n" + constraintTemplate;
      }

      return optimized;
    } catch (error) {
      console.error('优化提示词时出错:', error);
      throw new Error('优化提示词时出错，请重试');
    }
  }

  // 优化按钮点击事件
  optimizeBtn.addEventListener('click', async () => {
    try {
      const prompt = promptInput.value.trim();
      if (!prompt) {
        showStatus('请输入提示词内容', 'error');
        return;
      }

      const options = {
        addRole: addRoleCheckbox.checked,
        addFormat: addFormatCheckbox.checked,
        addConstraints: addConstraintsCheckbox.checked,
        roleType: roleTypeSelect.value,
        formatType: formatTypeSelect.value,
        constraintType: constraintTypeSelect.value
      };

      const optimized = optimizePrompt(prompt, options);
      optimizedPrompt.textContent = optimized;
      showStatus('提示词优化完成');
      
      // 保存设置和优化结果
      saveSettings();
      savePrompt(prompt, optimized);
    } catch (error) {
      showStatus(error.message, 'error');
    }
  });

  // 复制按钮点击事件
  copyBtn.addEventListener('click', async () => {
    try {
      const text = optimizedPrompt.textContent;
      if (!text) {
        showStatus('没有可复制的内容', 'error');
        return;
      }

      await navigator.clipboard.writeText(text);
      showStatus('已复制到剪贴板');
    } catch (error) {
      showStatus('复制失败，请手动复制', 'error');
    }
  });

  // 保存按钮点击事件
  saveBtn.addEventListener('click', () => {
    const text = optimizedPrompt.textContent;
    if (!text) {
      showStatus('没有可保存的内容', 'error');
      return;
    }
    showStatus('已保存到历史记录');
  });

  // 事件绑定
  window.onload = function() {
    renderTemplateList();
    renderSavedPromptList();

    // 插入模板到输入框
    document.getElementById('templateList').addEventListener('click', function(e) {
      if (e.target.classList.contains('use-template')) {
        const idx = e.target.getAttribute('data-idx');
        const tpl = templates[idx];
        document.getElementById('promptInput').value = tpl.content;
        document.getElementById('categorySelect').value = tpl.category;
        document.getElementById('tagInput').value = tpl.tags.join(',');
      }
    });

    // 一键复制输入框内容
    document.getElementById('copyBtn').onclick = function() {
      const val = document.getElementById('promptInput').value;
      if (val) {
        navigator.clipboard.writeText(val);
        alert('已复制到剪贴板！');
      }
    };

    // 保存Prompt
    document.getElementById('saveBtn').onclick = function() {
      const content = document.getElementById('promptInput').value.trim();
      const tags = document.getElementById('tagInput').value.split(',').map(t => t.trim()).filter(Boolean);
      const category = document.getElementById('categorySelect').value;
      if (!content) {
        alert('请输入Prompt内容');
        return;
      }
      const prompts = getSavedPrompts();
      prompts.unshift({ content, tags, category });
      setSavedPrompts(prompts);
      renderSavedPromptList();
      alert('已保存！');
    };

    // 复制已保存Prompt
    document.getElementById('savedPromptList').addEventListener('click', function(e) {
      if (e.target.classList.contains('copy-saved')) {
        const idx = e.target.getAttribute('data-idx');
        const prompts = getSavedPrompts();
        navigator.clipboard.writeText(prompts[idx].content);
        alert('已复制到剪贴板！');
      }
      if (e.target.classList.contains('delete-saved')) {
        const idx = e.target.getAttribute('data-idx');
        let prompts = getSavedPrompts();
        prompts.splice(idx, 1);
        setSavedPrompts(prompts);
        renderSavedPromptList();
      }
    });

    // 分类筛选
    document.getElementById('categorySelect').onchange = function() {
      const category = this.value;
      renderSavedPromptList(category);
    };
  };

  // 初始化
  initializeStorage();
}); 