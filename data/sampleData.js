// 這個文件包含範例數據，幫助用戶快速體驗系統功能
export const sampleGoals = [
  {
    id: "sample-1",
    title: "提升英語能力",
    description: "從基礎英語水平提升到能夠流利溝通的程度",
    currentSelfDescription: "目前只能進行簡單的英語對話，閱讀英文資料時需要查字典",
    futureSelfDescription: "能夠自信地進行英語簡報，閱讀英文技術文件無障礙，能與國外同事順暢溝通",
    subGoals: [
      {
        id: "sub-1-1",
        title: "建立每日英語學習習慣",
        description: "每天至少學習30分鐘英語",
        isCompleted: true,
        completedAt: "2024-12-01T10:00:00.000Z"
      },
      {
        id: "sub-1-2", 
        title: "通過多益750分",
        description: "報名多益考試並達到750分以上",
        isCompleted: true,
        completedAt: "2024-12-15T10:00:00.000Z"
      },
      {
        id: "sub-1-3",
        title: "參加英語會話課程",
        description: "報名3個月的英語會話班",
        isCompleted: false,
        completedAt: null
      },
      {
        id: "sub-1-4",
        title: "完成一次英語簡報",
        description: "在工作場合進行一次完整的英語簡報",
        isCompleted: false,
        completedAt: null
      }
    ],
    createdAt: "2024-11-01T10:00:00.000Z",
    updatedAt: "2024-12-20T10:00:00.000Z"
  },
  {
    id: "sample-2",
    title: "建立健康生活型態",
    description: "養成規律運動和健康飲食的習慣",
    currentSelfDescription: "經常熬夜，很少運動，常吃外食，體重超標",
    futureSelfDescription: "每週固定運動3次，早睡早起，體重維持在標準範圍，精神飽滿",
    subGoals: [
      {
        id: "sub-2-1",
        title: "制定運動計畫",
        description: "規劃每週3次的運動時間表",
        isCompleted: true,
        completedAt: "2024-12-01T10:00:00.000Z"
      },
      {
        id: "sub-2-2",
        title: "調整作息時間",
        description: "11點前上床睡覺，7點起床",
        isCompleted: false,
        completedAt: null
      },
      {
        id: "sub-2-3",
        title: "改善飲食習慣",
        description: "減少外食，增加蔬果攝取",
        isCompleted: false,
        completedAt: null
      }
    ],
    createdAt: "2024-11-15T10:00:00.000Z",
    updatedAt: "2024-12-20T10:00:00.000Z"
  },
  {
    id: "sample-3", 
    title: "學習程式設計",
    description: "從零基礎學會Python程式設計",
    currentSelfDescription: "完全沒有程式設計經驗，對程式語言感到陌生",
    futureSelfDescription: "能夠獨立開發簡單的Python應用程式，理解基本的程式設計概念",
    subGoals: [
      {
        id: "sub-3-1",
        title: "完成Python基礎課程",
        description: "線上學習Python語法基礎", 
        isCompleted: true,
        completedAt: "2024-12-10T10:00:00.000Z"
      },
      {
        id: "sub-3-2",
        title: "完成10個練習專案",
        description: "實作10個小型Python專案",
        isCompleted: true,
        completedAt: "2024-12-18T10:00:00.000Z"
      },
      {
        id: "sub-3-3",  
        title: "開發個人專案",
        description: "獨立開發一個完整的Python應用",
        isCompleted: true,
        completedAt: "2024-12-25T10:00:00.000Z"
      },
      {
        id: "sub-3-4",
        title: "學習進階主題",
        description: "學習資料庫操作和網頁框架",
        isCompleted: true,
        completedAt: "2024-12-28T10:00:00.000Z"
      },
      {
        id: "sub-3-5",
        title: "找到程式相關工作",
        description: "運用所學技能找到程式開發工作",
        isCompleted: true,
        completedAt: "2024-12-30T10:00:00.000Z"
      }
    ],
    createdAt: "2024-10-01T10:00:00.000Z", 
    updatedAt: "2024-12-30T10:00:00.000Z"
  }
];

// 載入範例數據的函數
export const loadSampleData = () => {
  if (typeof window !== 'undefined') {
    const existingData = localStorage.getItem('personal-goals-cms');
    if (!existingData) {
      localStorage.setItem('personal-goals-cms', JSON.stringify(sampleGoals));
      return sampleGoals;
    }
  }
  return null;
};
