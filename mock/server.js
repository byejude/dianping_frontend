var app = require('koa')();
var router = require('koa-router')();

//home -- AD
var homeAdData = require('./home/ad.js')
router.get('/api/homead',function *(next){
  console.log("首页——广告请求数据")
  this.body = homeAdData
});

//home -- homelist
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page',function *(next){
  console.log("首页--猜你喜欢")

  const params = this.params
  const paramsCity = params.city
  const paramsPage = params.page

  console.log('当前城市：' + paramsCity)
  console.log('当前页数：' + paramsPage)

  this.body = homeListData
});


// search-- 3 params
var searchListData = require('./search/list.js')
router.get('/api/search/:page/:city/:category/:keyword', function *(next) {
    console.log('搜索结果页 - 搜索结果')


    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category
    const paramsKeyword = params.keyword

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)
    console.log('关键字：' + paramsKeyword)

    this.body = searchListData
})
// search-- 2 params
router.get('/api/search/:page/:city/:category', function *(next) {
    console.log('搜索结果页 - 搜索结果')


    const params = this.params
    const paramsPage = params.page
    const paramsCity = params.city
    const paramsCategory = params.category

    console.log('当前页数：' + paramsPage)
    console.log('当前城市：' + paramsCity)
    console.log('当前类别：' + paramsCategory)

    this.body = searchListData
})

// detail
const detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', function *(next) {
    console.log('详情页 - 商户信息')

    const params = this.params
    const id = params.id

    console.log('商户id: ' + id)

    this.body = detailInfo
})

// comment
const detailComment = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id', function *(next) {
    console.log('详情页 - 用户点评')

    const params = this.params
    const page = params.page
    const id = params.id

    console.log('商户id: ' + id)
    console.log('当前页数: ' + page)

    this.body = detailComment
})

// orderlist
const orderList = require('./orderlist/orderList.js')
router.get('/api/orderlist/:username', function *(next) {
    console.log('订单列表')

    const params = this.params
    const username = params.username
    console.log('用户名：' + username)

    this.body = orderList
})


// buy
router.post('/api/order', function *(next) {

    console.log('buy')

    /*
     this.body = {
     errno: 1,
     msg: 'buy not ok'
     }
     */


    this.body = {
        errno: 0,
        msg: 'buy ok',
    }


});

// login
router.post('/api/login', function *(next) {

    console.log('login')

    /*
    this.body = {
        errno: 1,
        msg: 'loing not ok'
    }
    */


    this.body = {
        errno: 0,
        msg: 'loing ok',
        token: 'aaaaaaaaaaaa'
    }


});

// sms
router.post('/api/sms', function *(next) {

    console.log('获取短信验证码')

    this.body = {
        errno: 0,
        msg: 'ok',
        code: 'md5(123456)'
    }
});


// comment push
router.post('/api/submitComment', function *(next) {
    console.log('提交评论')



    this.body = {
        errno: 0,
        msg: 'ok'
    }
})

// start server
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3001);
