const express = require('express') // ### Q1 ### get the "express" module
const cors = require('cors') // ### Q2 ### get the "cors" module
const port = 3000
const app = express()

// for parsing application/json requests
app.use(express.json())
// for parsing application/x-www-form-urlencoded requests
app.use(express.urlencoded({ extended: true }))
// for allowing different domain origins to make requests to this API
app.use(cors())

const inventory = {
  items: [
    {
      name: 'socks',
      count: 10
    },
    {
      name: 'pants',
      count: 10
    },
    // ### Q3 ### Add inventory entry for "shirt" with a stock of 10
    {
      name: 'shirt',
      count: 10
    },
  ],
}

// Retrieve all stock route
app.get('/inventory/retrieve-all', (req, res) => {
  res.json(inventory.items)
})

// Retrieve stock route
// ### Q4 ### Uncomment the code below and Fix the function call which listens for GET HTTP requests
app.get('/inventory/retrieve/:itemname', (req, res) => {
  const item = inventory.items.find(item => item.name === req.params.itemname.trim().toLowerCase())

  if (typeof item === 'undefined') {
    res.status(404).json({
      itemname: req.params.itemname,
      error: 'Could not find the item in inventory'
    })
  }
  else {
    res.json(item)
  }
})

// Add stock route
// ### Q5 ### Uncomment the code below and Fix the function call which listens for POST HTTP requests
app.post('/inventory/add', (req, res) => {
  const item = inventory.items.find(item => item.name === req.body.name.trim().toLowerCase())

  if (typeof item !== 'undefined') {
    res.status(409).json({
      itemname: req.body.name,
      error: 'Item already exists in inventory'
    })
  }
  else {
    inventory.items.push({
      name: req.body.name,
      count: req.body.count
    })

    res.status(201).json(inventory)
  }
})

// Change stock route
// ### Q6 ### Uncomment the code below and Fix the function call which listens for PUT HTTP requests
// ### Q7 ### Also Fix the HTTP status numbers (listed as 0s) to match the type of response being sent, the first being a Not Found response, and the second being a Success response
app.put('/inventory/change', (req, res) => {
  const itemIndex = inventory.items.findIndex(item => item.name === req.body.name.trim().toLowerCase())

  if (itemIndex === -1) {
    res.status(404).json({
      itemname: req.body.name,
      error: 'Could not find the item in inventory'
    })
  }
  else {
    inventory.items[itemIndex].count += req.body.change

    res.status(200).json(inventory)
  }
})

// Remove stock route
// ### Q8 ### Uncomment the code below and Fix the function call which listens for DELETE HTTP requests
// ### Q9 ### Also Fix the parameter route, so the item's name can be retrieved correctly
app.delete('/inventory/remove/:itemname', (req, res) => {
  const itemIndex = inventory.items.findIndex(item => item.name === req.params.itemname.trim().toLowerCase())

  if (itemIndex === -1) {
    res.status(404).json({
      itemname: req.params.itemname,
      error: 'Could not find the item in inventory'
    })
  }
  else {
    inventory.items.splice(itemIndex, 1)
    res.status(200).json(inventory)
  }
})

// Start Express server to listen for API connections
app.listen(port, () => console.log(`API listening at http://localhost:${port}/`))