var mongoose = require('mongoose');
var Pasos = mongoose.model('Pasos');

  //GET - Return all Pasos in the DB
  exports.findAllPasos = function(req, res) {
  	console.log(Pasos);
  	Pasos.find(function(err, pasos) {
  		console.log(pasos);
  		if(!err) {
  			res.send(pasos);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  exports.findPasoById = function(req, res) {
      Pasos.findById(req.params.id,function(err, paso) {
      if(!err) {
        res.send(paso);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified UserName
  exports.findUserByIdentificacion = function(req, res) {
    //Pasos.findById(req.param.id, function(err, guia) {
      Pasos.find({Identificacion:req.params.Identificacion},function(err, paso) {
      console.log(req.params);
      if(!err) {
        res.send(paso);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new User in the DB
  exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
        var paso = new Pasos({
            Identificacion: req.body.Identificacion,
            Clave: req.body.Clave,
            Sede: req.body.Sede,
            Plan: req.body.Plan,
            Dia_Plan: req.body.Dia_Plan,
            Mes_Plan: req.body.Mes_Plan,
            Ano_Plan: req.body.Ano_Plan,
            Paso: req.body.Paso
      });

      paso.save(function(err) {
        if(!err) {
          console.log('User "'+ req.body.BasicInfo.Name +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(paso);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateUser = function(req, res)
  {
      Pasos.findById(req.params.id, function (err, paso) {
          console.log("ingreso: ", paso)

          paso.Identificacion = req.body.Identificacion,
          paso.Clave = req.body.Clave,
          paso.Sede = req.body.Sede,
          paso.Plan = req.body.Plan,
          paso.Dia_Plan = req.body.Dia_Plan,
          paso.Mes_Plan = req.body.Mes_Plan,
          paso.Ano_Plan = req.body.Ano_Plan,
          paso.Paso = req.body.Paso

      paso.save(function(err) {
        if(!err) 
        {
            console.log('User "' + req.body.Identificacion + '" Updated Succefull');
            res.send(paso);
        }
        else
        {
          console.log('ERROR: ' + err);
        }
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteUser = function(req, res) {
      Pasos.findById(req.params.id, function (err, paso) {
          console.log(JSON.stringify(paso));
      paso.remove(function(err) {
        if(!err) {
            console.log('User with Id "' + req.params.id + '" Removed Succefull');
            res.send(paso);
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  }