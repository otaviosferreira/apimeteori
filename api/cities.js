import { resolveCities } from "../services/city-service.js";
import { allowRequest } from "../services/api-gateway.js";
export default async function handler(req,res){
  res.setHeader("Access-Control-Allow-Origin","*");res.setHeader("Cache-Control","s-maxage=3600, stale-while-revalidate=600");
  if(req.method!=="GET")return res.status(405).json({error:"Método não permitido."});
  if(!allowRequest(req))return res.status(429).json({error:"Limite de consultas atingido."});
  const name=String(req.query.name||"").trim();if(name.length<2||name.length>90)return res.status(400).json({error:"Informe um nome de cidade válido."});
  try{return res.status(200).json({results:await resolveCities(name)});}catch(error){console.error("cities endpoint:",error);return res.status(502).json({error:"Não foi possível pesquisar cidades agora."});}
}