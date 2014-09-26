var mongoose = require('mongoose')
var cp=require('child_process')
var MovieSchema = mongoose.Schema({
    poster:String,
    title:String,
    author:String, 
    language:String,
    country:String,
    comment:String,
    flash:String,    
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})
//Todo 这段代码有问题
MovieSchema.statics={
    fetch:function(cb){
      return this
            .find()
           .sort('meta.updateAt')
           cp.exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            exec(cb)
    }
}
module.exports=MovieSchema