let  nodemailer = require('nodemailer');

let mailService={
    sendMail(params){
        var mailOptions = {
            from: 'APrince.1727@gmail.com',
            to: params.email,
            subject: 'Greetings From FB service Your account has been created...!',
            text: 'Congratulations Please Login with Your registered Email ID.'
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
    }
}
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'APrince.1727@gmail.com',
      pass: '14081999a'
    }
  });


 ;

  module.exports=mailService;