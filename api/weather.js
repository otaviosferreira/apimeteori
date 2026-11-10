import { resolveCity } from "../services/city-service.js";
import { getWeather } from "../services/weather-service.js";
import { allowRequest } from "../services/api-gateway.js";
export default async function handler(req,res){
  res.setHeader("Access-Control-Allow-Origin","*");res.setHeader("Cache-Control","s-maxage=600, stale-while-revalidate=300");
  if(req.method!=="GET")return res.status(405).json({error:"Método não permitido."});
  if(!allowRequest(req))return res.status(429).json({error:"Muitas consultas. Aguarde um minuto e tente novamente."});
  const city=String(req.query.city||"").trim();if(city.length<2||city.length>90)return res.status(400).json({error:"Informe uma cidade válida (2 a 90 caracteres)."});
  try{const location=await resolveCity(city);if(!location)return res.status(404).json({error:"Cidade não encontrada. Confira o nome e tente novamente."});const weather=await getWeather(location);return res.status(200).json({location,...weather});}
  catch(error){console.error("weather endpoint:",error);return res.status(502).json({error:"Serviço meteorológico indisponível no momento. Tente novamente."});}
}