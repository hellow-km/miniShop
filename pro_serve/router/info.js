const express = require('express')
const info = express.Router()
const goodParams = require('../model/goodParams.js')
const reviews = require('../model/goodReviews.js')
const user = require('../model/login.js')
const headImg = require('../model/headImg.js')
//const request = require('request')
const {
  fashions,
  news,
  selects
} = require('../model/home_image_data')

info.get('', (req, res) => {
  const obj = {
    'fashion': fashions,
    'news': news,
    'select': selects
  }
  const {
    id,
    type
  } = req.query
  obj[type].find({
    _id: id
  }).then(result => {
    res.send(result)
  })
})

info.get('/params', (req, res) => {
  goodParams.findOne({
    id: req.query.id
  }).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

info.get('/reviews', (req, res) => {
  console.log(req.query);

  reviews.find({
    id: req.query.id
  }).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

info.post('/reviews/say', (req, res) => {
  user.findOne({
    _id: req.body.userId
  }, 'name -_id').then(result => {
    if (result) {
      reviews.create({
        id: req.body.paramsId,
        userId: req.body.userId,
        name: result.name,
        headImg: headImg[Math.floor(Math.random() * headImg.length)],
        say: req.body.say,
        time: new Date().getTime()
      }).then(res1 => {
        res.send(res1)
      }).catch(err => {
        res.send(err)
      })
    }
  })
})

info.post('/delete', (req, res) => {
  reviews.deleteOne({
    _id: req.body.id
  }).then(result => {
    res.send(result)
  })
})

info.post('/starGood', (req, res) => {
  user.findOne({
    starGoods: {
      $elemMatch: {
        goodId: req.body.infoId
      }
    }
  }).then(result => {
    if (result) {
      user.updateOne({
        _id: req.body.userId
      }, {
        "$pull": {
          "starGoods": {
            "goodId": req.body.infoId,
          }
        }
      }).then(result => {
        res.send(result)
      })
    } else {
      user.updateOne({
        _id: req.body.userId
      }, {
        $push: {
          starGoods: {
            goodId: req.body.infoId,
            type: req.body.type
          }
        }
      }).then(result => {
        res.send(result)
      })
    }
  })
})

info.post('/cartGood', (req, res) => {
  user.findOne({
    cartGoods: {
      $elemMatch: {
        goodId: req.body.infoId
      }
    }
  }).then(result => {
    if (result) {
      user.updateOne({
        _id: req.body.userId
      }, {
        "$pull": {
          "cartGoods": {
            "goodId": req.body.infoId,
          }
        }
      }).then(result => {
        res.send(result)
      })
    } else {
      user.updateOne({
        _id: req.body.userId
      }, {
        $push: {
          cartGoods: {
            goodId: req.body.infoId,
            type: req.body.type,
            count: 1
          }
        }
      }).then(result => {
        res.send(result)
      })
    }
  })
})


module.exports = info
