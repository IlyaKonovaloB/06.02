import express from 'express'
import router from './routes/todo.routes.js'

// экземпляр Express-приложения
const app = express()

// парсинг JSON, содержащегося в теле запроса
app.use(express.json())
// обработка роутов
app.use('/todos', router)

app.get('*', (req, res) => {
 res.send('Only /todos endpoint is available.')
})

// обработка ошибок
app.use((err, req, res, next) => {
 console.log(err)
 const status = err.status || 500
 const message = err.message || 'Something went wrong. Try again later'
 res.status(status).json({ message })
})

// запуск сервера
app.listen(3000, () => {
 console.log('🚀 Server ready')
})