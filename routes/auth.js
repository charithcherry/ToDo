const router = require('express').Router();
const passport= require('passport');

router.get("/google",passport.authenticate("google",{scope:['profile','email']}))

router.get("/login/failed",(req,res)=>{
    res.status(400).json({
        success:false,
        message:"failure"
    });
}); 

router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            success:true,
            message:"success",
            user :req.user
        });
    }
    
}); 

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:process.env.CLIENT_URL,
    failureRedirect: "/login/failed"


}))

module.exports= router