const app = require('./app.js')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})