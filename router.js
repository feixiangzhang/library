const express = require('express')
const router = express.Router();
const service = require("./service.js")

// RestFull Request
// 查询图书列表
router.get('/books', service.getAllBooks)
// 添加图书（提交表单）
router.post('/books', service.addBook)
// // 跳转到编辑图书信息页面
// router.get('/books/:id', service.toEditBook)
// 编辑图书提交表单
router.put('/books/:id', service.editBook)
// 删除图书信息
router.delete('/books/:id', service.deleteBook)
//验证图书名称是否存在
router.get('/books/book/:name', service.checkName)

module.exports = router