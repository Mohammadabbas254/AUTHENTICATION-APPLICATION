const express = require("express")
const app = express()
const bcrypt = require("bcrypt")//importing bcrpt package
const passport = require("passport")
const initializePassport = require("./passport-config")

const users = []

app.use(express.urlencoded({extended: false}))

app.post("/register",async (req, res)=> {

    try {
         const hashedPassword = await bcrypt.hash(req.body.password, 10)
         users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
         })
         console.log(users);
         res.redirect("/login")
    } catch (e){
        console.log(e);
        res.redirect("/register")
    }
})

//Routes
app.get('/', (request, response) => {
    response.render("index.ejs")
})

app.get('/login',(req,res)=>{
    res.render("login.ejs")
})

app.get('/register', (req, res)=>{
    res.render("register.ejs")
})
//end routes
 
console.log(users); //display registerd users in the console
app.listen(3000)