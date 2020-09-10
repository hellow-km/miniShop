const fs = require('fs')
const path = require('path')

const shopName = ['苏菲小店MM小店衣秀', '型女', '、珍秀', '百衣百顺', '秋水衣人', '风袖薇香朴坊', '锦衣堂', '衣锦衣舍', '，锦瑟丽人坊转角', '卡卡', '简单', '青苹果', '加衣站', '秋水丽人', '特别特', '女子百合', '四季美人', '蝶幻', '歪酷', '衣炫传说', '一房公社', '迷妮服饰左岸', '港角', 'NANA', '倩影', '衣加一', '时尚秀', '红雨亭', '流行坊']

const files = fs.readdirSync(path.join(__dirname, '../public/images', 'logo/logos'))
const arr = []
shopName.map(function (item, index) {
  arr.push({
    shopLogo: 'http://localhost:3000/images/logo/logos/' + files[index],
    shopName: item
  })
})

module.exports = arr
