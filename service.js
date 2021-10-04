const data = require("./data.json")
const path = require("path")
const fs = require("fs")

// 中间件函数
// 自动生成图书编号（自增）
let maxBookCode = () => {
    let arr = []
    data.forEach( item => {
        arr.push(item.id)
    })
    return Math.max.apply(null, arr)
}
//把内存数据写入文件
let writeDataToFile = (res) => {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
        if (err) {
            res.json({
                status: 500
            })
        }
        res.json({
            status: 200
        })
    })
}
// 验证图书名称是否存在
exports.checkName = (req, res) => {
    let name = req.params.name

    let flag = data.some(item => {
        if (name == item.name) {
            return true
        } else {
            return false
        }
    })
    console.log(name)
    res.send(flag)
}
// 获取所有图书
exports.getAllBooks = (req, res) => {
    console.log("获取图书")
    res.send(data)
}
// 添加图书
exports.addBook = (req, res) => {
    let book = {}
    book.id = maxBookCode() + 1
    book.name = req.body.name
    book.date = Date.now()
    data.push(book)
    writeDataToFile(res)
}
// 删除指定图书
exports.deleteBook = (req, res) => {
    
    let bookId = req.params.id
    let index = data.findIndex(item => item.id === parseInt(bookId))
    if (index !== -1) {
        data.splice(index, 1)
    }
    writeDataToFile(res)
}
// 编辑指定图书
exports.editBook = (req, res) => {
    let bookId = parseInt(req.params.id)
    data.forEach(item => {
        if (item.id === bookId) {
            item.name = req.body.name
        }
    })
    writeDataToFile(res)
}
