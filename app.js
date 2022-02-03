const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const errorController = require('./controllers/errorsController');
const sequelize = require('./utility/database');

const Category = require('./models/category');
const Product = require('./models/product');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/admin', adminRoutes);
app.use(userRoutes);


app.use(errorController.get404Page);

//Product.hasOne(Category);
Product.belongsTo(Category, {foreignKey: {allowNull : false}});
Category.hasMany(Product);

sequelize.sync() //{force : true}
.then(() => {
    Category.count()
        .then((count) => {
            if(count === 0){
                Category.bulkCreate([
                    {name: 'Telefon', description: 'Telefon Kategorisi'},
                    {name: 'Bilgisayar', description: 'Bilgisayar Kategorisi'},
                    {name: 'Elektronik', description: 'Elektronik Kategorisi'},
                ]);
            }
        })

}).catch((err) => {
    console.log(err);
})


app.listen(3000, () => {
    console.log('listening on port 3000');
});
