const express = require('express');
const path = require('path');
const express_handlebars = require('express-handlebars');
const app = express();
const logger = require('./middleware/logger');
const members = require('./Members');
//app.use(logger);

/* set dynamic folder
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});
*/
//Handlebars Middleware
app.engine('handlebars', express_handlebars());
app.set('view engine', 'handlebars');
//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Home page route
app.get('/',(req,res)=>res.render('index',{
    title:'Member app',
    members
}));
//set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Members API Routes
app. use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('server started on port ${PORT}'));