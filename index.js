const express = require('express');

const bcrypt = require('bcrypt')

require('dotenv').config();
const hotelsRoute = require('./routes/hotels');
const usersRoute = require('./routes/users');
const db = require('./database/db');

const users = require('./models/users');

const port = 5050
const app = express();
db.connectToMongoDB();

app.use(express.static('public'));
app.use(express.json());

app.use('/homepage', authenticate )
app.use('/hotels', hotelsRoute);
app.use('/users', authenticate, usersRoute);

app.get("/homepage", (req, res) => {
    res.status(200).json({message:"Welcome To Hotels_Lag | Homepage"})
})

app.post('/login', async (req,res) => {
    const {userName, password} = req.body;

    const user = await users.findOne({userName})
        if(!user) {
            return res.status(401).json({ 
                message: "Username or password is incorrect"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatch) {
            res.status(401).json({message: "Username or password is not correct"});
        }

        const token = Buffer.from(`${userName};${password}`).toString("base64");

        return res.status(200).json({
            message: "Authorisation successful", 
            token:token
        });
    })


async function authenticate(req, res, next) {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization.split(' ');
        const authType = authHeader[0];
        const authValue = authHeader[1];
        if (authType === 'Basic') {
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');
            const user = await users.findOne({username});
            if (!user) {
                return res.status(401).json({
                    message: '"Failed'
                });
            }

            const isPasswordMatch = await bcrypt.compare(password,user.password);
            if(isPasswordMatch) {
                req.users = user.username;
                next();
            } else {
                return res.status(401).json({
                    message: 'Password or Username incorrect'
                })
            }
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Header not present'
        });
    }
};

app.use((req, res) => {
    res.status(404).json({message:'Page not found'});
});


app.listen(port, () => {
    console.log(`hotels_Lag is running at http://localhost:${port}`);
});

