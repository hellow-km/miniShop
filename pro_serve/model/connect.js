const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/miniShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('连接成功');
}).catch(() => {
  console.log('连接失败');
})
