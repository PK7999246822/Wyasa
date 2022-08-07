const UserSchema = require("../Models/userModel")
const jwt = require("jsonwebtoken")

const validator = require('../Middleware/validator')
const userModel = require("../Models/userModel")

const CreatSleep = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like tile,fullname etc" })
        }
        const { nickName, password } = data


        if (!validator.isvalid(nickName)) {
            return res.status(400).send({ status: false, massage: "please enter name" })
        }
        let user = await userModel.findOne({ nickName: nickName })
        if (user) {
            return res.status(400).send({ status: false, massage: "please enter unique nickname" })
        }


        if (!validator.isvalid(password)) {
            return res.status(400).send({ status: false, massage: "please enter password" })
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }


        let CreatSleep = await UserSchema.create(data)
        return res.status(201).send({ status: true, message: "successful", data: CreatSleep })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const loginUser = async (req, res) => {
    try {
        //Checking if no data is present in our request
        let data = req.body
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, message: "Please enter your details to login" })
        }

        //Checking if user has entered these mandatory fields or not
        const { nickName, password } = data

        if (!validator.isvalid(nickName)) {
            return res.status(400).send({ status: false, message: "nickname is required" })
        }
        if (!validator.isvalid(password)) {
            return res.status(400).send({ status: false, message: "Password is required" })
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }
        //Matching that email and password with a user document in our UserModel
        const userMatch = await userModel.findOne({ nickName: nickName, password: password })
        //If no such user found 
        if (!userMatch) {
            return res.status(401).send({ status: false, message: "Invalid login credentials" })
        }

        //Creating a token if email and password matches
        const token = jwt.sign({
            userId: userMatch._id,
        }, "Secret-Key-given-by-us-to-secure-our-token")

        //Setting back that token in header of response
        res.setHeader("x-api-key", token);

        //Sending response on successfull login
        return res.status(200).send({ status: true, message: "You are successfully logged in", data: token })

    }
    //Exceptional error handling
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}
const Question = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, message: "Please enter your details to login" })
        }

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid object ID" })

        }

        const { struggleTime, bedTime, wakeupTime, sleepHours } = data

        if (!validator.isvalid(struggleTime)) {
            return res.status(400).send({ status: false, massage: "please enter struggle time" })

        }
        let struggle = ['Less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks']
        if (!struggle.includes(struggleTime)) {
            return res.status(400).send({ status: false, massage: "please enter" })
        }

        if (!validator.isvalid(bedTime)) {
            return res.status(400).send({ status: false, massage: "please enter sleep time" })
        }
        if (!validator.isvalidTime(bedTime)) {
            return res.status(400).send({ status: false, massage: "please enter valid Time Like HH:MM  AM or PM" })
        }

        if (!validator.isvalid(wakeupTime)) {
            return res.status(400).send({ status: false, massage: "please enter wakeuptime" })
        }
        if (!validator.isvalidTime(wakeupTime)) {
            return res.status(400).send({ status: false, massage: "please enter valid Time Like HH:MM  AM or PM" })
        }

        if (!validator.isvalid(sleepHours)) {
            return res.status(400).send({ status: false, massage: "please enter sleepHours" })
        }
        if (isNaN(sleepHours)) {
            return res.status(400).send({ status: false, massage: "please enter number" })
        }
        if (req.decodedToken.userId == userId) {

            let updated = await userModel.findOneAndUpdate({ _id: userId }, { $set: { struggleTime: struggleTime, bedTime: bedTime, wakeupTime: wakeupTime, sleepHours: sleepHours } }, { new: true })
            return res.status(200).send({ status: false, massage: "sucessfull", data: updated })


        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.Question = Question
module.exports.CreatSleep = CreatSleep
module.exports.loginUser = loginUser

