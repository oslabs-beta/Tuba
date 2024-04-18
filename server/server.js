const express = require('express')
const app = express()
const port = 3000
const errorDataRouter = require('./routes/errorDataRoute')

app.use(express.json());


app.get('/server', (req, res) => {

    res.json({message: 'Hello World!'})
})

app.use('/errorData', errorDataRouter)


app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
  
    
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  });


// app.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })

module.exports = app;