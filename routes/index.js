import express from 'express';
import axios from 'axios';
import Consulta from '../models/Consulta.js';
const router = express.Router();
/* GET home page. */
async function consulta2 (req, res, next) {
  try {
    let {tema, pregunta} = req.body;
    console.log(tema, pregunta)
    let consulta = await Consulta.findOne({alarma: tema})
    if(consulta){
      return res.status(201).json({consulta})
    }
    let training =  `you are going to be a support for questions users give you what the user needs to know and a question. You need to explain with an answer in a short sentence no more than 10 words. el tema es ${tema} `
    let url = "https://api.openai.com/v1/chat/completions"
    let data =
    {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": training

            },
            {
                "role": "user",
                "content": pregunta
            }
        ]
    }
    let headers = {
      headers: {
          'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`,
          'Content-Type': 'application/json'
      }
  };
  let response = await axios.post(url, data, headers)
  let AIResponse = response.data.choices[0].message.content
  let resp = await Consulta.create({
    alarma: tema,
    mensaje:AIResponse
  })
  return res.status(201).json({message:AIResponse})
  } catch (error) {
    console.log(error)    
  }
}
router.post('/', consulta2);

export default router;
