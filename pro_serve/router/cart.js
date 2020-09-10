const express = require('express')
const cart = express.Router()
const user = require('../model/login.js')
const {
  fashions,
  news,
  selects
} = require('../model/home_image_data')

const goodArr = {
  fashion: fashions,
  news: news,
  select: selects
}
cart.post('', (req, res) => {
  const data = []
  const idObj = req.body
  for (const key in idObj) {
    goodArr[key].find({
      _id: {
        "$in": idObj[key]
      }
    }).then(result => {
      data.push(...result)
      if (key == 'select') {
        setTimeout(() => {
          res.send(data)
        }, 5)
      }
    })
  }
})

cart.post('/cartCountUpdate', (req, res) => {
  const {
    userId,
    goodId,
    count
  } = req.body
  user.updateOne({
    _id: userId,
    'cartGoods.goodId': goodId
  }, {
    $set: {
      'cartGoods.$.count': count
    }
  }).then(result => {
    res.send(result)
  })
})

cart.post('/pay', (req, res) => {
  const {
    userId,
    payMoney,
    goodIds
  } = req.body
  user.findOne({
    _id: userId
  }).then(result => {
    if (result.money >= payMoney) {
      user.updateOne({
        _id: userId
      }, {
        $set: {
          "money": result.money - payMoney
        }
      }).then(result1 => {
        user.updateOne({
          _id: userId
        }, {
          "$pull": {
            "cartGoods": {
              "goodId": {
                $in: goodIds
              }
            }
          }
        }).then(result2 => {})
        res.send({
          mes: '支付成功'
        })
      })
    } else {
      res.send({
        err: '余额不足'
      })
    }
  })
})

cart.post('/removeSelect', (req, res) => {
  const {
    goodIdList,
    userId
  } = req.body
  user.updateOne({
    _id: userId
  }, {
    $pull: {
      cartGoods: {
        goodId: {
          $in: goodIdList
        }
      }
    }
  }).then(result => {
    res.send(result)
  })

})

module.exports = cart
