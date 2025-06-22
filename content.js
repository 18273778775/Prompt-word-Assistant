// 向页面注入自定义样式
const style = document.createElement('style');
style.textContent = `
  .browser-helper-highlight {
    background-color: yellow !important;
    transition: background-color 0.3s;
  }
`;
document.head.appendChild(style);

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlight') {
    // 高亮显示页面上的特定元素
    const elements = document.querySelectorAll(request.selector);
    elements.forEach(element => {
      element.classList.add('browser-helper-highlight');
    });
    sendResponse({count: elements.length});
  }
  return true;
}); 