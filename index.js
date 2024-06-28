import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

var AddPost= []; //array of posts

app.get("/", (req,res) =>{ //Home page
    res.render("index.ejs", {
        matri: AddPost,
    }); 
});

app.post("/submit", (req, res) =>{ //Submit post
   var objeto={
    newTitulo: req.body.mititulo,
    newContenido: req.body.micontenido,
   }  
    AddPost.push(objeto);  
    res.redirect("/");
});

app.post("/delete", (req, res)=>{ //delete button
    var posicion=req.body["postId"];
   var borrarPosicion= AddPost[posicion];
      AddPost = AddPost.filter(obj => obj !== borrarPosicion);
    res.redirect("/");
});

app.post("/editar", (req, res)=>{ //edit button
    var itemSelected= req.body.editId;
    res.render("editar.ejs", {
        itemOfArray: itemSelected,
         matri: AddPost,
    });
});

app.post("/guardar", (req, res)=>{ //save changes(edit)
    var posicionEditar= req.body.editId;
    var ediTitulo=req.body.ediTituloejs;
    var ediContenido=req.body.ediContenidoejs;
    AddPost[posicionEditar]={ newTitulo: ediTitulo, newContenido: ediContenido }
    res.redirect("/");
});

//for pages.ejs
app.post("/post1", (req, res)=>{
    res.render("post1.ejs")
});

app.post("/post2", (req, res)=>{
    res.render("post2.ejs")
});

app.post("/post3", (req, res)=>{
    res.render("post3.ejs")
});

app.post("/", (req,res) =>{ //Home button
    res.render("index.ejs", {
        matri: AddPost,
    });
});
app.post("/info", (req,res) =>{ //Page for tools information
    res.render("info.ejs", {
        matri: AddPost,
    });
});

app.listen(port,()=>{
    console.log(`Currently using node in ${port} port.`);
});


