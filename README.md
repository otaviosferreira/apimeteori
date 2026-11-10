# ClimaTempo — consulta meteorológica

Aplicação web responsiva para consultar o clima atual e a previsão de 7 dias por cidade. Desenvolvida em HTML, CSS e JavaScript, com serviços Node.js (ES Modules) publicados como funções serverless na Vercel.

## Arquitetura

- **Frontend:** `index.html`, `style.css` e `script.js`.
- **API Gateway:** valida parâmetros, limita consultas por IP e encaminha as chamadas.
- **City Service:** pesquisa cidades e coordenadas usando o serviço de geocodificação Open-Meteo.
- **Weather Service:** consulta condições atuais e previsão diária, com cache em memória por instância.
- **API serverless:** `/api/cities` e `/api/weather`.

A Vercel executa cada arquivo em `api/` como função independente. Os módulos em `services/` separam as responsabilidades. O cache em memória e o limitador são locais à instância serverless; para produção com alto volume, substitua-os por Redis/KV compartilhado.

## Executar localmente

Requer Node.js 20+ e conta Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

Abra a URL local indicada pela CLI. Não é necessária chave de API para o uso não comercial do Open-Meteo.

## Endpoints

### `GET /api/cities?name=Salvador`

Retorna até cinco resultados de geocodificação.

### `GET /api/weather?city=Salvador`

Retorna localização, condições atuais (temperatura, sensação térmica, umidade, vento) e previsão diária de sete dias.

Respostas de erro usam códigos HTTP `400` (parâmetro inválido), `404` (cidade não encontrada), `405` (método não permitido), `429` (limite excedido) e `502` (provedor indisponível).

## Publicar na Vercel

1. Entre em https://vercel.com e escolha **Add New → Project**.
2. Importe o repositório GitHub `otaviosferreira/apimeteori`.
3. Deixe **Framework Preset: Other** e **Root Directory: ./ **.
4. Não configure Build Command nem Output Directory.
5. Clique em **Deploy**. A Vercel publica o frontend e as funções de API no mesmo domínio.
6. Após o deploy, teste `/api/weather?city=Salvador` e depois a página inicial.

A cada push na branch principal, a Vercel gera uma nova implantação automaticamente (se a integração Git estiver habilitada).

## Fonte dos dados

Previsões fornecidas pela [Open-Meteo](https://open-meteo.com/). O serviço gratuito é destinado a uso não comercial e requer atribuição. Consulte os termos para uso comercial.
