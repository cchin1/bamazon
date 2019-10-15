//Setting up the Dependencies for mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

//Creating connection for the mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "JS123$$$",
    database: "Bamazon"
})

//Connecting to the mysql server and sql database, testing connection, declaring makeTable function
connection.connect(function(err){
    if (err) throw err;
    console.log("connection successful");
    makeTable();
})

//Function to show the list of products available for purchase
var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].id + " || " +res[i].product_name + " || " +
            res[i].department_name + " || " +res[i].price + " || " +res[i].stock_quantity+"\n");
        }
    promptCustomer(res);
    })
}

//Function to ask user what product and quantity they want to purchase
var promptCustomer = function(res){
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "What would you like to purchase? [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for(var i=0; i<res.length; i++){
            if(res[i].product_name==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity - answer.quant)>0){
                        connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity - answer.quant)+
                        "'WHERE product_name='"+product+"'", function(err,res2){
                            console.log("Product Bought!");
                            makeTable();
                        })
                    } else {
                        console.log("not a valid selection!");
                        promptCustomer(res);
                    }
                })
            }
        }
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    })
}
