// 监听插件安装事件
chrome.runtime.onInstalled.addListener(() => {
  console.log('浏览器助手已安装');
});

// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getPageInfo') {
    // 处理页面信息请求
    sendResponse({status: 'success'});
  }
  return true;
}); 