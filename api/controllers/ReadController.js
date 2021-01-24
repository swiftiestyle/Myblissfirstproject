const fs = require('fs');
let converter = require('json-2-csv');
const path = require('path');
const filepath=path.resolve(__dirname, "../../assets/employee.json");
module.exports = {

    read:(req,res)=>{ 
         fs.readFile(filepath, (err, data) => {
        if (err) throw err;
        let employee = JSON.parse(data);
        sails.log(employee);
     //   res.send(employee);
       res.view('readpage', {employee: employee});
        
    })},
    download:(req,res)=>{
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            let employee = JSON.parse(data);
            converter.json2csv(employee,(err,csv)=>{
                if(err) throw err;
                res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);

            })

    })}
  

};