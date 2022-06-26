const bodyParser = require("body-parser");
const session = require("express-session")
const express = require("express");
const {v4: uuid4 } = require("uuid");


app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

items = [
    {
    enq_no:123, task:"kaam", assign_date: 12_02-03, assign_dpt: "marketing", assign_by:"Mr. Y", completion_date:12-03-22, status: "REV", remarks:"nan"
    },
    {
    enq_no:456, task:"kaaam", assign_date: 12_02-03, assign_dpt: "marketing", assign_by:"Mr. Y", completion_date:12-03-22, status: "REV", remarks:"nan"
    },
    {
    enq_no:673, task:"kaaam", assign_date: 12_02-03, assign_dpt: "marketing", assign_by:"Mr. Y", completion_date:12-03-22, status: "REV", remarks:"nan"
    },
  ];

app.use(session({
    secret:uuid4(),
    resave:false,
    saveUninitialized:true
}))

const credentials = {
    username : "admin",
    password : "admin@123"
}

app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {

    res.render("list", { listTitle: "Work List", listitemejs: items });

});

app.get("/admin_login", (req, res) => {

    res.render("login");

});

app.get("/form", (req, res) => {

    res.render("form");

});

app.post("/", (req, res) => {

    ienq_no=req.body.enq_no;
    itask=req.body.task;
    iassign_by=req.body.assign_by;
    iassign_date=req.body.assign_date;
    iassign_dpt=req.body.assign_dpt;
    iassign_dpt=req.body.assign_dpt;
    icompletion_date=req.body.completion_date;
    istatus=req.body.status;
    iremarks=req.body.remarks;

        if (ienq_no == "" || ienq_no == " ") {}
        else {items.push({
            enq_no:ienq_no, task:itask, assign_date: iassign_date, assign_dpt: iassign_dpt, assign_by:iassign_by, completion_date:icompletion_date, status: istatus, remarks:iremarks
        });}

        res.redirect("/");
});

app.post('/login', (req,res)=>{

    if(req.body.username == credentials.username && req.body.password == credentials.password){
        req.session.user = req.body.username;
        res.redirect("/")
    }else{
        res.redirect("/admin_login")
    }
})




app.listen(3000, () => {

    console.log("listning on port 3000");


});