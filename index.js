const express = require('express');
const logger = require('morgan');
const userController= require('./controllers/usersController');
const bookController= require('./controllers/bookController');
const {users,books} = require('./DATA/data');




const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logger('dev'));



app.get('/', (req,res)=>{


    return res.json({
        code: 200,
        message: 'success'
    });
})


app.get('/students', (req,res)=>{

    return res.json({
        message:" this is students route"
    })
})

app.get('/dean', (req,res)=>{

    return res.json({
        message:" this is deans route"
    })
})

app.get('/hod', (req,res)=>{

    return res.json({
        message:" this is hods route"
    })
})

app.get('/lecturers', (req,res)=>{

    return res.json({
        message:" this is lecturers route"
    })
})

app.get('/faculty', (req,res)=>{

    return res.json({
        message:" this is faculty route"
    })
})
app.get('/department',(req,res)=>{
    return res.json({
        message:"this is department route"
    })
})

// app.get("/get-users", userController.getAllUsers);
// app.get("/get-user/:id",userController.getUserById);
// app.post("/create-user",userController.createUser);
// app.put("/update-user/:id",userController.updateUser);
// app.delete("/delete-user/:id",userController.deleteUser);

app.get("/get-books", bookController.getAllBooks);
app.get("/get-books/:id",bookController.getBooksById);
app.post("/create-books",bookController.createBooks);
app.put("/update-books/:id",bookController.updateBook);
app.delete("/delete-books/:id",bookController.deleteBook);

app.get('/get-users',userController.getAllUsers);
app.post('/create-user',userController.createUser);
app.get('/get-user/:id',userController.getUserById);
app.delete('/delete-user/:id',userController.deleteUser);
app.put("/update-user/:id",userController.updateUser);


app.listen(8000,()=>{
    console.log('Server up and running on port 8000')
})
//npm install @prisma/client
// npm install @prisma/adapter-mariadb
//npx prisma generate