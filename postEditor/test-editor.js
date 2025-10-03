// 测试tui-editor是否能正确加载
const fs = require('fs');
const path = require('path');

console.log('检查tui-editor文件是否存在...');

const editorPath = path.join(__dirname, 'node_modules/@toast-ui/editor/dist');
const files = [
  'toastui-editor.css',
  'toastui-editor.js'
];

files.forEach(file => {
  const filePath = path.join(editorPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} 存在`);
  } else {
    console.log(`❌ ${file} 不存在`);
  }
});

console.log('\n如果文件不存在，请运行: npm install @toast-ui/editor');
