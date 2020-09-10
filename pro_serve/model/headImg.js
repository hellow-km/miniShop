const fs = require('fs')
const path = require('path')

module.exports = fs.readdirSync(path.join(__dirname, '../public/images/headImg')).map(item => {
  return 'http://localhost:3000/images/headImg/' + item
})
