var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createItem();
});

function createItem() {
  console.log("Inserting a new item...\n");
  var query = connection.query(
    "INSERT INTO items SET ?",
    {
      name: "whiskey",
      price: "21",
      department: "drunk-store",
      stock: "88"
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }

  );

  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE items SET ? WHERE ?",
    [
      {
        price: ""
      },
      {
        name: ""
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " items updated!\n");

      deleteProduct();
    }
  );

  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting items...\n");
  connection.query(
    "DELETE FROM items WHERE ?",
    {
      name: "shirts"
    },
    function(err, res) {
      console.log(res.affectedRows + " items deleted!\n");
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all items...\n");
  connection.query("SELECT * FROM items", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}