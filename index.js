const express=require('express')
const path=require('path')
const {v4:uuidv4}=require('uuid')
const methodOverride=require('method-override')

const app=express()

app.set('view engine','ejs') //set express view enginr to ejs
app.set('views',path.join(__dirname,'/views')) // to access all template(.ejs) files from anywhere set path

app.use(express.static(path.join(__dirname,'/public'))) // for attach static files to .ejs files 

app.use(methodOverride('_method')) //override post method with PORT method

app.use(express.json()) // it is middleware fun used to parse data coming to server (use with POST and PUT methods)
app.use(express.urlencoded({extended:true}))// it is middleware fun used to parse data coming to server (use with POST and PUT methods)

let arr=[{id:uuidv4(),user:'sham',topic:'Intoduction to python',post:'Python is a widely used general-purpose, high level programming language. It was created by Guido van Rossum in 1991 and further developed by the Python Software Foundation. It was designed with an emphasis on code readability, and its syntax allows programmers to express their concepts in fewer lines of code.'},
            {id:uuidv4(),user:'rushi',topic:'Apple Inc.',post:'Apple Inc. (formerly Apple Computer, Inc) is an American multinational technology company headquartered in Cupertino, California. '},
            {id:uuidv4(),user:'ram',topic:'NASA',post:'The National Aeronautics and Space Administration (NASA /ˈnæsə/) is an independent agency of the U.S. federal government responsible for the civil space program, aeronautics research, and space research. Established in 1958,'}]

// Home page
app.get('/home',(req,res)=>{
    res.render('home.ejs',{arr})
})

// operation.2(new)-->New post requst then form will open to get new post details 
app.get('/new',(req,res)=>{
    res.render('new.ejs')
})

// operation.2(new)-->when submit form of new post details then to data send to server use .post method
app.post('/new',(req,res)=>{
    let id=uuidv4()
    let {user,topic,post}=req.body
    arr.push({id,user,topic,post})

    res.redirect('/home') // redirect use to link pages when post request complete go to home page
})

// opeartion.3(show perticular post)
app.get('/show/:id',(req,res)=>{
    let id=req.params.id

    const data=arr.find(function(arr){  //find fun take a callback fun as an argument 
        return id===arr.id              //if given id match with any element then find fun return that object from arr
    })

    res.render('show.ejs',{data})
})

//operation.4--> to EDIT perticular post we first handle this server req in .get method and provide form to edit
app.get('/edit/:id',(req,res)=>{
    let id=req.params.id

    const data=arr.find(function(arr){
        return id===arr.id
    })

    res.render('edit.ejs',{data})
})

//operation.4 (EDIT)--> we get data and override post method with PORT to update the data
app.patch('/edit/:id',(req,res)=>{
    let id=req.params.id

    const data=arr.find(function(arr){
        return id===arr.id
    })

    let newData=req.body.post

    data.post=newData;

    res.redirect('/home')
})

// operation.5->delete perticular post
app.delete('/del/:id',(req,res)=>{
    let id=req.params.id
    arr=arr.filter(function(arr){ //to delete perticular post we use filter method it return
        return id!=arr.id         //posts whos id is not equal to our given id and return new array
    })                             // we store this new array in our existing arr variable
    res.redirect('/home')
})

app.listen(3000,()=>{
    console.log('SERVER STARTED')
})