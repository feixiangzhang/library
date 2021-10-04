const express = require('express')
const data = require("./data.json")
const path = require("path")
const router = require('./router.js')

const app = express()

//静态资源托管
app.use(express.static('public'))

//处理请求参数
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//配置路由
app.use(router)
app.listen(3000, () => {
    console.log('server is running on port:3000')
})