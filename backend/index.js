const express = require("express");
const cors = require("cors");

require("./db/config");
const Form = require("./db/Form");
const email = require("./db/Sendmail");
const Mail = require("nodemailer/lib/mailer");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.post("/form_submit", async (req, resp) => {
  try {
    console.log(req.body);
    let form = new Form(req.body);
    var result = await form.save().then(t=>{
        
        resp.send(t._id);
       console.log(t["email"])
    let url = `http://localhost:4000/emil_verified/${t._id}`;
    let msg = `Please click below link to vrify email address: ${url}`;
    email.mail("1516510083@kit.ac.in",t.email,"emial varification",msg);
    // end - verify email
    });
    
  } catch (e) {
    if (e.code == 11000){
      // Duplicate error
      resp.send({ error: "Email is lready exists"});
    } else {
        // othr error
        console.log(e);
      resp.send({ error: "other error" });
    }
  }
});

app.get("/emil_verified/:id", async (req, resp) => {
    Form.findByIdAndUpdate({ _id: req.params.id },
        {"verify_email":true})
    .then((data) =>
    resp.end('successful')
    // resp.json({"status":"successful"})
  );

  });

app.listen(4000);
