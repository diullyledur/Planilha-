require('dotenv/config')
const express = require('express')
const TransacoesRepositorio = require('./infra/sql-transacoes-repositorio')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
function mostraReq(req) {
  console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`)
}

app.get('/transacoes', async (req, res) => {
  const repositorio = new TransacoesRepositorio()
  const transacoes = await repositorio.listarTransacoes()

  let saldo = 0
  transacoes.transacoes.forEach((transacao) => {
    if (transacao.categoria === 'Despesa') {
      saldo = saldo - transacao.valor
    }
    if (transacao.categoria === 'Receita') {
      saldo = saldo + transacao.valor
    }
  })

  transacoes.saldo = saldo
  res.send(transacoes)
  mostraReq(req)
})


app.post('/transacoes', async (req, res) => {
  mostraReq(req)
  const repositorio = new TransacoesRepositorio()
  console.log("corpo " + req.body)
  const transacao = req.body
  await repositorio.criarTransacao(transacao)
  res.status(201).send(transacao)
})


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})

 