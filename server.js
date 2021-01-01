const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
app.use(express.static("public"));
// mongoose.connect('mongodb://localhost:27017/blog', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })
// mongo "mongodb+srv://cluster0.qaq8r.mongodb.net/<dbname>" --username Atharva0906
//mongo "mongodb+srv://cluster0.qaq8r.mongodb.net/<dbname>" --username Atharva0906
//mongodb+srv://admin-atharva:Test123@cluster0.idm6o.mongodb.net/blog
//mongodb+srv://Atharva0906:Test123@cluster0.qaq8r.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://admin-atharva:Test123@cluster0.idm6o.mongodb.net/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter);
let port = process.env.PORT;
if(port ==null || port==""){
  port=3000;
}

// app.listen(port);
app.listen(port,function(req,res){
  console.log("Server started successfull");
})
