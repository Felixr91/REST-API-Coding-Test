/**
 * REST API Coding Test
 *
 * Directions:
 * Take the sample code below and add new API endpoints for products.
 * This challenge should take approximately 2 hrs.
 * Feel free to ask questions, comments within code are appreciated. 
 *
 * Each product has, at minimum, the following properties:
 * - id
 * - name
 * - cost
 * - three additional properties of your choice
 *
 * Requirements:
 * Should handle all basic CRUD functions.
 * Should include some sort of data source, be it in-memory or a database.
 * - Include the SQL statements you would use for each function if the data source were an MSSQL database, but again, a database is not required.
 * Should include code comments as appropriate.
 * Should include a README.md explaining the following:
 * - Explain any app architecture/design choices you made.
 * - Explain any weaknesses or possible bugs you see in your code.
 * - Explain how this sample API could be extended, modified, or maintained.
 *
 * Note:
 * There's no need to implement any login or security for this example, but feel free to explain how you would add security in your README.md (optional)
 *
 * The directions are purposefully vague. Please feel free to describe any additional features or weaknesses in the sample code
 * that you feel would improve the final API. You don't need to implement these.
 *
 */

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(
  PORT,
  () => console.log(`LIVE at http://localhost:${PORT}`)
)

app.get('/products', (req, res) => {
  res.status(200).send(
    [
      {
        id: 1,
        name: 'uniball pen',
        cost: 6.50,
        ink_color: 'black',
        units_per_pack: 3,
        weight: 6
      },
      {
        id: 2,
        name: 'pilot pen',
        cost: 10.50,
        ink_color: 'red',
        units_per_pack: 4,
        weight: 7.2
      },
      {
        id: 3,
        name: 'zebra pen',
        cost: 2.50,
        ink_color: 'black',
        units_per_pack: 2,
        weight: 4
      },
    ]
  )
});

app.post('/product/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { cost } = req.body;
  const { ink_color } = req.body;
  const { units_per_pack } = req.body;
  const { weigth } = req.body;

  // if (!name) {
  //   res.status(418).send({message: 'Please provide a name'})
  // }

  res.send({
    product: `We've added your product: ${name}`
  })

})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(p => p.id == id);

  products.splice(productIndex, 1);

  return res.send();

})

app.put('/products/:id', (req, res){
  // something that only allows only product author to modify.
  // then something like...

  // product.update(req.body, (err) => {
  //   if (err) {
  //     console.log(err)
  //     next()
  //     return
  //   }
  //   res.send("Successfully Updated product!")
  // });
})


// MSSQL EXAMPLE - just a starting point...
app.get('/products', (req, res) => {

  var sql = require("mssql");

  // config for your database
  var config = [
    {
      id: 1,
      name: 'uniball pen',
      cost: 6.50,
      ink_color: 'black',
      units_per_pack: 3,
      weight: 6
    },
    {
      id: 2,
      name: 'pilot pen',
      cost: 10.50,
      ink_color: 'red',
      units_per_pack: 4,
      weight: 7.2
    },
    {
      id: 3,
      name: 'zebra pen',
      cost: 2.50,
      ink_color: 'black',
      units_per_pack: 2,
      weight: 4
    },
  ];

  // connect to database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from Products', function (err, productset) {

      if (err) console.log(err)

      // send records as a response
      res.send(productset);

    });
  });
});