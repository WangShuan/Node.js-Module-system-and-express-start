var express = require('express')

var app = express()

// 若有靜態資源 可通過 app.use() 方法公開 如下：
// app.use('/public/', express.static('./public/'))

app
    .get('/', function (req, res) {
        res.send('hello express')
    })
    .get('/about',function(req,res){
        res.send('關於我')
    })
    .listen(3000, function () {
        console.log('3000 is running ....')
    })