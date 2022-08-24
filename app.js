const express = require('express')
const TransacoesRepositorio = require('./transacoes-repositorio.js')
const app = express()
const port = 3000

app.use(express.static(`${__dirname}/public`))

app.get('/transacoes', (req, res) => {
    const repositorio = new TransacoesRepositorio()
    const transacoes = repositorio.listarTransacoes()
    res.send(transacoes)
})

app.get('/criar-transacao', (req, res) => {
    const repositorio = new TransacoesRepositorio()
    const transacao = {
      valor: 10,
      descricao: 'Pastel'
    }
    repositorio.criarTransacao(transacao)
    res.status(201).send(transacao)
  })

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`)
})