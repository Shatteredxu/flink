// 左侧界面数据
module.exports = {
  'GET /api/leftPageData': {
    accessFrequency: 1500,
    peakFlow: 300,
    trafficSitua: {
      timeList: ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
      outData: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
      inData: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
    },
    userSitua: {
      header: ['用户', '时间', '状态'],
      data: [
        ['行1列1', '行1列2', '行1列3'],
        ['行2列1', '行2列2', '行2列3'],
        ['行3列1', '行3列2', '行3列3'],
        ['行4列1', '行4列2', '行4列3'],
        ['行5列1', '行5列2', '行5列3'],
        ['行6列1', '行6列2', '行6列3'],
        ['行7列1', '行7列2', '行7列3'],
        ['行8列1', '行8列2', '行8列3'],
        ['行9列1', '行9列2', '行9列3'],
        ['行10列1', '行10列2', '行10列3']
      ],
    },
  },
};
