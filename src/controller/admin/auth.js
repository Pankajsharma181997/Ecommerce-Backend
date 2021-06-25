const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.signup = (req,res) => {

    User.findOne({email : req.body.email})
    .exec((error,user) => {
        if(user) 
            return res.status(400).json({message : " User Already Registered"})

        const {firstName,lastName,userName,email,password} = req.body;

        //Hashing the passwords

        const hashed_password = bcrypt.hashSync(password,10);
        
        const _user = new User({
            firstName:firstName,
            lastName:lastName,
            userName:userName,
            email:email,
            hash_password:hashed_password,
            role:'admin'
        });



        _user.save((error,data) => {
            if(error){
                return res.status(400).json({
                    message : "Something went wrong"
                })
            }

            return res.status(201).json({message:"Admin created successfully"})

        });


    });
}



exports.signin = (req,res) => {

    User.findOne({email : req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error})

        if(user){

            const {_id,firstName,lastName,fullName,hash_password,email,role} =user;
            
            if(bcrypt.compareSync(req.body.password,hash_password) && user.role === 'admin'){

                const token = jwt.sign({_id:user._id} , process.env.JWT_SECRET , {expiresIn : '1h'});   

                res.status(200).json({
                    token,
                    user : {
                        _id,firstName,lastName,fullName,email,role
                    }

                })

            }
            else{
                return res.status(400).json({message : "Invalid Username or Password"})
            }
        }
            else{
                res.status(400).json({message:"Invalid Username or Password"})
            }
        })
}


exports.requireSignin = (req,res,next) => {
    const token = req.headers.autherization.split(" ")[1];
    const user = jwt.verify(token,process.env.JWT_SECRET);
    req.user = user;
    next();
}