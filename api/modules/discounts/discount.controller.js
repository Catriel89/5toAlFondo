var mongoose = require('mongoose'),
    discountSchema = require('./discount.model'),    
    Discount = mongoose.model('Discount'),
    nextDiscountSchema = require('./nextDiscount.model'),
    NextDiscount = mongoose.model('NextDiscount'),
    userSchema = require('../user/user.model'),
    User = mongoose.model('User'),
    categorySchema = require('../categories/category.model'),
    Category = mongoose.model('Category'),
    lodash = require('lodash');

/*
 |--------------------------------------------------------------------------
 | Retrieve all historical discounts of the logged user
 |--------------------------------------------------------------------------
 */
exports.active = function (req, res) {
    var dni = req.user.dni;
    
    User.findOne({dni: dni}, function(err, user) {
  
        if(err) res.status(500).send({ message: err.message });

        //Get the active discounts of the user
        res.send(lodash.filter(user.descuentos[0], { 'estado': 'Activo'} ));

    });
}

/*
 |--------------------------------------------------------------------------
 | Retrieve all online discounts of the logged user
 |--------------------------------------------------------------------------
 */
exports.proximos = function (req, res) {
    var dni = req.user.dni;
    
    User.findOne({dni: dni}, function(err, user) {
  
        if(err) res.status(500).send({ message: err.message });

        //Get the next discounts of the user
        res.send(user.proximosDescuentos[0]);

    });
}

/*
 |--------------------------------------------------------------------------
 | Create a new discount
 |--------------------------------------------------------------------------
 */
exports.create = function (req, res) {
    var discount = req.swagger.params.discount.value;

    User.findById(req.user, function(err, user) {
        if(err) res.status(500).send({ message: err.message });
        else{
            user.descuentos.push(discount);
            user.update();
            res.status(200);   
        }
    });
  
}

exports.determinateDiscount = function (movement, user){

    //Get the active discounts of the user
    var result = lodash.filter(user.proximosDescuentos[0], { 'categoria': movement.categoria});

    console.log('Result' + JSON.stringify(result));
   
    /*TODO: Tengo que traer la categoria del descuento de la base. 
    Tengo que obneter el próximo descuento del usuario de la misma categoria y sumar 
    el monto del nuevo movimiento. Si pasó el proximo rango, creo un descuento y lo agrego al usuario.

    Tengo que buscar los rubros relacionados al movimiento y si aplica, crear un nuevo descuento y 
    agregarlo al usuario

   */
}