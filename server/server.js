const express = require('express')
const app = express()
const port = 3000



app.get('/server', (req, res) => {

    res.json('Hello World!')
})



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})