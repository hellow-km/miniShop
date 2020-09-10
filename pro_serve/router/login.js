const express = require('express')
const login = express.Router()
const user = require('../model/login.js')
const headImage = require('../model/headImg.js')
login.post('', (req, res) => {
  user.findOne({
    userName: req.body.userName
  }).then(result => {
    if (result.passWord == req.body.passWord) {
      result.token = 'I am token'
      res.send(result)
    } else {
      // res.writeHead(503, 'Current password does not match', {
      //   'content-type': 'text/plain'
      // });
      // res.end('用户名或密码错误')
      res.send('用户名或密码错误')
    }
  }).catch(err => {
    // res.writeHead(503, 'Current password does not match', {
    //   'content-type': 'text/plain'
    // });
    // res.end('用户名或密码错误')
    res.send('用户名或密码错误')
  })

})

login.post('/register', (req, res) => {
  user.findOne({
    userName: req.body.userName
  }).then(result => {
    if (result) {
      res.send({
        warn: '用户名已存在'
      })
    } else {
      user.create({
        userName: req.body.userName,
        passWord: req.body.passWord,
        name: req.body.name,
        headImage: headImage[0],
        money: 0
      }).then(result1 => {
        res.send({
          success: '注册成功，可以登录了'
        })
      })
    }
  })
})

module.exports = login
