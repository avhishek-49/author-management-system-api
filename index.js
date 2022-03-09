const express = require('express')
const bodyParser = require('body-parser')
const { Author, Book } = require('./sequelize')


const app = express()
app.use(bodyParser.json())

// Create a Author
app.post('/demoApi/author', (req, res) => {
    console.log(req.body)
    Author.create(req.body)
        .then(author => res.send(author))
})


// get all authors
app.get('/demoApi/authors', (req, res) => {
    Author.findAll().then(authors =>
        res.json(authors))
})


// get author by id
app.get('/demoApi/author/:id', (req, res) => {
    Author.findOne(
        {
            where: { id: req.params.id, },
        }
    ).then(author => res.json(author))
})



app.delete("/demoApi/authorHasManyBooks/:id",(req,res)=>
{
    let query;
    query=Author.destroy(
        {
            where: { id: req.params.id, },
            include: [{ model: Book }
            ]   
        }
)
return query.then(()=>res.json("deleted sucessfully"))
});







   
           
        



app.put("/update/author", (req, res) => {
    
    let query;
    
    

   query=Author.update(
      {
        authorName: req.body.authorName
      },
      {
        where: { id: req.body.id }
      }
    )
    
    return query.then(()=>res.json("updated sucessfully"))
    
  });




  


  
// create a book
app.post('/demoApi/book', (req, res) => {
    console.log("book==>", req.body)
    Book.create(req.body)
        .then(author => res.json(author))
})














const port = 8080
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
