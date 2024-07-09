const Authentication = require('../model/Authentication');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
require('dotenv').config()


exports.SignUp = async(req,res) => {
    try{
        const email = req.body.email
        console.log(email);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Authentication({
            UserName: req.body.name,
            Email: req.body.email,
            Password: hashedPassword
        });

        console.log(user)
        const response = await user.save();
        console.log(response)
        const payload = {
            user_id: response._id,
            UserName: response.UserName,
            Email: response.Email,
        }
        const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_TOKEN, {expiresIn:'15min'})
        const refreshToken = JWT.sign(payload,process.env.JWT_REFRESH_TOKEN, {expiresIn:'1day'})

        res.cookie("AccessToken", accessToken, {maxAge: 15 * 60000, httpOnly:true, secure:true, sameSite:'lax'})
        res.cookie('RefreshToken', refreshToken, {maxAge: 24 * 60 * 60000, httpOnly:true, secure:true, sameSite:'lax'})
        res.status(201).json(payload)
    }
    catch(error) {
        console.log(error)
        res.status(402).json({message: "Could not save user for some reason"});
    }
}

exports.SignIn = async (req,res) => {
    const user = await Authentication.findOne({Email: req.body.email})
    console.log(user)
    const passwordValidation = await bcrypt.compare(req.body.password, user.Password );
    if (!passwordValidation) {
        return res.json({success:false, message: "Password do not Match"})
    }
    const payload = {
        user_id: user._id,
        UserName: user.UserName,
        Email:user.Email,
    }

    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_TOKEN, {expiresIn:'15min'})
    const refreshToken = JWT.sign(payload,process.env.JWT_REFRESH_TOKEN, {expiresIn:'1day'})

    res.cookie("AccessToken", accessToken, {maxAge: 15 * 60000, httpOnly:true, secure:true, sameSite:'lax'})
    res.cookie('RefreshToken', refreshToken, {maxAge: 24 * 60 *  60000, httpOnly:true, secure:true, sameSite:'lax'})
    res.json({success:true, user:payload, message:"User Found"})

}

exports.refreshToken = async (req,res) => {
    const refreshToken = req.cookies.RefreshToken;
    const accessToken = req.cookies.AccessToken;
   
    if (accessToken) {
        const user = JWT.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        const payload = {
            user_id: user.user_id,
            UserName: user.UserName,
            Email: user.Email
        }
        return res.json({user:payload, message:"token already exists", success:true});
    }
    if (!refreshToken && !accessToken) {
        return res.status(402).json({message:'no refresh token and access token found'});
    }
    
    const decoded = JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    const user = await Authentication.findOne(decoded._id);
    const payload = {
        user_id: user._id,
        UserName: user.UserName,
        Email: user.Email
    }

    const newAccessToken = JWT.sign(payload, process.env.JWT_ACCESS_TOKEN , {expiresIn:'15min'});

    res.cookie('AccessToken',newAccessToken,{maxAge: 15 * 60 * 1000, httpOnly:true, secure:true, sameSite:'lax'});
    res.status(200).json({ user:payload, success:true ,message:"updated Token successfully" });
}

exports.currentUserDetail = async (req,res) => {
    try {
        const id = req.query.id
        const user = await Authentication.findOne({
            _id: id 
        })
        res.status(201).json(user);
    } catch (err) {
        res.status(402).json(err);
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('AccessToken', {httpOnly:true, secure:true, sameSite:'lax'});
    res.clearCookie('RefreshToken', {httpOnly:true, secure:true, sameSite:'lax'});
    res.json({success:true, message:'Successfully Signed Out'})
}

