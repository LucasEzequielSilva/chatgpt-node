import mongoose from 'mongoose';

const ayudaAlarmaSchema = new mongoose.Schema({
  alarma: { type: String, required: true },
  mensaje: { type: String, required: true },
  creado: { type: Date, default: Date.now }
});

const Consulta = mongoose.model('ayudaalarmas', ayudaAlarmaSchema);
export default Consulta
