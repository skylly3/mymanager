var express = require('express');
var router = express.Router();
var usr=require('dao/dbConnect');

/* GET home page. */
router.get('/', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
}
  res.render('index', { title: '打标管理系统',test:res.locals.islogin});
});

router.get('/myhome', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('myhome', { title: 'Home', user: res.locals.islogin });
});
router.get('/userman', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('sub/userman', { title: 'userman', user: res.locals.islogin });
});
router.get('/welcome', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('welcome', { title: 'welcome', user: res.locals.islogin });
});
router.get('/login',function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
			//已经登录,直接跳转
			res.redirect('/myhome');
        }
	     res.locals.message = "";   
		 var err = req.session.error; //获取错误信息
	    if(err){ 
				res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
		    }
        res.render('login', { title: '用户登录', message:res.locals.message, test:res.locals.islogin});
});
router.route('/getuser.do')
	.post(function(req, res){
		
		 
   				var data ={  "total": 35,
				"rows": [{
			    Addr: "湖南",
				Name: '张三', 
				Mobile: '13507331245',
				Id: 'aadd33'
				},{
			    Addr: "北京",
				Name: '李四', 
				Mobile: '18507335805',
				Id: 'dsds3'
				}]
				};
				 res.send(JSON.stringify(data));
});
router.route('/addPerson.do')
	.post(function(req, res){
   				var data = {
				status: '100', 
				msg: '没有该用户:',
				};
				 res.send(JSON.stringify(data));
});
router.route('/delPerson.do')
	.post(function(req, res){
   				var data = {
				status: '101', 
				msg: '没有该用户:',
				};
				 res.send(JSON.stringify(data));
});
router.route('/login.do')
   .post(function(req, res) {
        client=usr.connect();
        result=null;
		
        usr.selectFun(client, req.body.uname, function (result) {
            if(result[0]===undefined){
		
				var data = {
				status: '101', 
				msg: '没有该用户:'+req.body.uname,
		 
				};
				res.send(JSON.stringify(data));
            }else{
                if(result[0].password===req.body.upwd){
					
                    req.session.islogin=req.body.uname;
                    res.locals.islogin=req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:3600000});  //有效期一小时
					
					var data = {
					status: '100', 
					msg: '操作成功',
					data: {
						userId: '123456',
						userName: req.body.uname,
						blog: 'http://www.baidu.com'
					}
					};
				 
				   res.send(JSON.stringify(data));
                   // res.redirect('/home');
                }else
                {

					var data = {
					status: '101', 
					msg: '操作失败',
			 
					};
				   res.send(JSON.stringify(data));
					
                  //  res.redirect('/login');
                }
               }
        });
		
    });

router.get('/logout.do', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});



// router.route('/reg')
    // .get(function(req,res){
        // res.render('reg',{title:'注册'});
    // })
    // .post(function(req,res) {
        // client = usr.connect();

        // usr.insertFun(client,req.body.username ,req.body.password2, function (err) {
              // if(err) throw err;
              // res.send('注册成功');
        // });
    // });

module.exports = router;

