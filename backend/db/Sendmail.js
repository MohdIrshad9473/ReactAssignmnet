var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTls:true,
    auth:{
        user:'1516510083@kit.ac.in',
        pass:'************',

    }
});



function mail(from, to , subject, text){

    var mailOption = {
        from :from,
        to:to,
        subject:subject,
        text:text
    }

    transporter.sendMail(mailOption, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log('email has been send',info.response);
        }
    })
}

module.exports ={
    mail: mail,
  };
