import express, { json } from 'express'
import connectDB from './config/dbConfig.js'
import User from './models/userModel.js'
const app = express()

app.use(json())

connectDB()

app.get("/", (req, res) => {
    res.send("hello")
})

app.post('/register', async function (req, res) {
    const { name, email, password } = await req.body;

    const userExist = await User.findOne({ email })
    if (userExist) {
        req.statusCode(400)
        throw new Error(" user already exists")
    }

    const india = Math.floor(Math.random() * (300 - 1) + 1)
    const omen = Math.floor(Math.random() * (300 - 1) + 1)
    const us = Math.floor(Math.random() * (300 - 1) + 1)
    const growth = Math.floor(Math.random() * (100 - 1) + 1)
    const loss = Math.floor(Math.random() * (100 - 1) + 1)
    const id = new Date().getTime()

    const user = await User.create({
        id, name, email, password, india, omen, us, growth, loss
    })

    if (user) {
        res.json({ userId: id })

    } {
        throw new Error("user no created")
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = await req.body
    const user = await User.findOne({ email })
    console.log(user)
    const isAuth = await user.password == password
    console.log(isAuth)
    if (user && isAuth) {
        res.json(user)
    } else {
        res.json(404)
        throw new Error('User not found')
    }
})

app.get('/profile/:id', async (req, res) => {
    const  id  =  req.params.id
    const user = await User.findOne({ id })
    console.log(user)
    if (user) {
        res.json(user)
    } else {
        res.json(404)
        throw new Error('User not found')
    }
})

app.listen(5000, () => {
    console.log('app is running at http://localhost5000')
})