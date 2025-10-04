const { getAllNotionData } = require('./notion');

module.exports = async function() {
  try {
    console.log('🔄 正在从 Notion 获取数据...');
    const data = await getAllNotionData();
    console.log('✅ Notion 数据获取成功:', {
      ideas: data.ideas.length,
      questions: data.questions.length,
      total: data.totalCount
    });
    return data;
  } catch (error) {
    console.error('❌ Notion 数据获取失败:', error.message);
    console.log('🔄 回退到模拟数据...');
    
    // 回退到模拟数据
    return {
      ideas: [
        {
          id: 'mock-idea-1',
          title: '这是一个示例想法',
          category: '技术',
          content: '这是一个模拟的想法内容，用于测试页面显示效果。',
          tags: ['测试', '开发'],
          created: '2025.01.15 14:30',
          status: '已发布',
          url: '#'
        },
        {
          id: 'mock-idea-2', 
          title: '另一个想法示例',
          category: '设计',
          content: '这是另一个模拟的想法，展示了多行内容的显示效果。',
          tags: ['设计', 'UI'],
          created: '2025.01.14 09:15',
          status: '已发布',
          url: '#'
        }
      ],
      questions: [
        {
          id: 'mock-question-1',
          title: '这是一个示例问题',
          category: '学习',
          content: '这是一个模拟的问题内容，用于测试问题标签的显示效果。',
          tags: ['学习', '疑问'],
          created: '2025.01.13 16:45',
          status: '已发布',
          url: '#'
        }
      ],
      totalCount: 3
    };
  }
};
