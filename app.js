var express=require('express')
var bodyParser=require('body-parser')
var path=require('path')
var mongoose = require('mongoose')
var _=require('underscore')

var Movie=require('./models/movie.js')
var port= process.env.PORT || 3000
var app=express()

mongoose.connect('mongodb://localhost/ibaby')
app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/*app.use(bodyParser.json({type:'application/vnd.api+json'}))
app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
})*/

app.use(express.static(path.join(__dirname,'public')))
app.locals.moment=require('moment')
app.listen(port)

console.log('ibaby start on port'+port)

//Mongodb Example 
/*var db=mongoose.connection;
db.on('error',console.error.bind(console,'connecction error:'));
db.once('open',function callback(){
    console.log('db is open ')
})
var kittySchema=mongoose.Schema({
    name:String
})
kittySchema.methods.speak=function(){
    var greeting=this.name?"Meow name is "+this.name:"I don't have a name"
    console.log(greeting)
}
var Kitten=mongoose.model('Kitten',kittySchema)

var silence=new Kitten({name:'Silence'})

silence.save(function(err,silence){
    if(err)
        return console.error(err)
    silence.speak()
})
Kitten.find(function(err,kittens){
    if(err) return console.error(err);
    console.log(kittens)
})*/
/*silence.speak()
console.log(silence.name)*/
//end Mongodb example

//index page
//<embed src="http://player.youku.com/player.php/sid/XNzgxNTM5ODg0/v.swf" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
app.get('/',function(req,res){
    Movie.find(function(err,movies){
            if(err){
                console.log(err)
            }
            res.render('index',{
                title:'iBaby 首页12333553',
                movies:movies
            })
        })
})

//detail page
app.get('/movie/:id',function(req,res){
    var id=req.params.id
    Movie.findOne({_id:id},function(err,movie){
        res.render('detail',{
            title:'iBaby '+movie.title,
            movie:movie
        })
    })
   
})

//admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'iBaby 后台录入',
        movie:{
            _id:'',
            title:'',
            author:'',
            country:'',
            language:'',
            poster:'',
            flash:'',
            year:'',
            comment:''
        }
    })
})

app.get('/admin/del/:id',function(req,res){
    var id = req.params.id
    if(id){
        Movie.remove({_id:id},function(err,m){
            if(err){
                console.log(err)
            }
            res.redirect('/admin/list')
        })
    }

})

app.get('/admin/update/:id',function(req,res){
    var id = req.params.id
    if(id){
        Movie.findOne({_id:id},function(err,movie){
            res.render('admin',{
                title:'imooc 后台更新页面',
                movie:movie
            })
        })
    }
})
//admin post movie
app.post('/admin/movie/new',function(req,res){
    //console.log(req.body)
    var id=req.body.movie._id
    var movieObj=req.body.movie
    var _movie
    if(id!=='undefined'&&id!==""){
        Movie.findOne({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            _movie=_.extend(movie,movieObj)
            _movie.save(function (err,movie){
                 if(err){
                    console.log(err)
                 }
                 res.redirect('/movie/'+movie._id)
            })
        })
    }else{
        _movie=new Movie({
            author:movieObj.author,
            title:movieObj.title,
            language:movieObj.language,
            country:movieObj.country,
            flash:movieObj.flash,
            poster: movieObj.poster,
            year:movieObj.year,
            comment:movieObj.comment
        })
        _movie.save(function (err,movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movie._id)
        })
    }
})

//list page
app.get('/admin/list',function(req,res){
    Movie.find(function(err,moives){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title:'iBaby 列表页',
            movies:moives
        })
    })
    
})
app.delete('/admin/list',function(req,res){
    var id=req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }else{
        console.log('erro!!')        
    }
})