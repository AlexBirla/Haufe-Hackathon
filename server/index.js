const express = require('express')
const axios = require('axios')
const { response } = require('express')
const app = express()
const port = 5000
let collectors=[]
app.get('/', async (req, res) => {
  await axios.get('https://data.primariatm.ro/api/3/action/datastore_search?resource_id=d0134630-84d9-40b8-9bcb-dfdc926d66ab&limit=5').then((response) =>{
    collectors=response.data.result.records
    res.send(collectors)
})
.catch((error) => {
    res.json({result: "please try again"})
})
    
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})