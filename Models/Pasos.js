exports = module.exports = function(app, mongoose) {
  var PasosSchema = new mongoose.Schema({
    Identificacion: String,
    Clave: String,
    Plan: String,
    Dia_Plan: String,
    Mes_Plan: String,
    Ano_Plan: String,
    Paso: Number
  });

  mongoose.model('Pasos', PasosSchema);
};