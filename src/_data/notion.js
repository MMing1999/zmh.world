const { Client } = require('@notionhq/client');

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  timeoutMs: 10000, // 10秒超时
});

// 数据库 ID
const IDEA_DATABASE_ID = '28199b0e-1a81-8073-9633-d177c1bbff6b';
const QUESTION_DATABASE_ID = '28199b0e-1a81-8053-9ada-f3fa23a4bdce';

// 格式化日期为 YYYY.MM.DD HH:mm
function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    return dateString;
  }
}

// 获取 Ideas 数据
async function getIdeas() {
  try {
    // 在 Notion API 5.x 中，使用 search 方法查询数据库
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page'
      }
    });
    
    // 过滤出属于 Ideas 数据库的页面
    const ideasPages = response.results.filter(page => 
      page.parent && page.parent.database_id === IDEA_DATABASE_ID
    );

    return ideasPages.map(page => {
      const properties = page.properties;
      const createdTime = properties.createTime?.created_time || page.created_time;
      
      return {
        id: page.id,
        title: properties.name?.title?.[0]?.plain_text || '无标题',
        category: properties.Category?.select?.name || '未分类',
        content: properties.Content?.rich_text?.[0]?.plain_text || '',
        tags: properties.Tags?.multi_select?.map(tag => tag.name) || [],
        created: formatDate(createdTime),
        status: properties.Status?.select?.name || '草稿',
        url: page.url
      };
    });
  } catch (error) {
    console.error('获取 Ideas 数据失败:', error);
    return [];
  }
}

// 获取 Questions 数据
async function getQuestions() {
  try {
    // 在 Notion API 5.x 中，使用 search 方法查询数据库
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page'
      }
    });
    
    // 过滤出属于 Questions 数据库的页面
    const questionsPages = response.results.filter(page => 
      page.parent && page.parent.database_id === QUESTION_DATABASE_ID
    );

    return questionsPages.map(page => {
      const properties = page.properties;
      const createdTime = properties.createTime?.created_time || page.created_time;
      
      return {
        id: page.id,
        title: properties.name?.title?.[0]?.plain_text || '无标题',
        category: properties.Category?.select?.name || '未分类',
        content: properties.Content?.rich_text?.[0]?.plain_text || '',
        tags: properties.Tags?.multi_select?.map(tag => tag.name) || [],
        created: formatDate(createdTime),
        status: properties.Status?.select?.name || '草稿',
        url: page.url
      };
    });
  } catch (error) {
    console.error('获取 Questions 数据失败:', error);
    return [];
  }
}

// 获取所有数据
async function getAllNotionData() {
  try {
    const [ideas, questions] = await Promise.all([
      getIdeas(),
      getQuestions()
    ]);

    return {
      ideas,
      questions,
      totalCount: ideas.length + questions.length
    };
  } catch (error) {
    console.error('获取 Notion 数据失败:', error);
    return {
      ideas: [],
      questions: [],
      totalCount: 0
    };
  }
}

module.exports = {
  getIdeas,
  getQuestions,
  getAllNotionData
};
