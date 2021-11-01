'use-strict';
const nodemailer = require('nodemailer');

var Utils = {

    enviarEmail: (titulo, text) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "gamewriter.noreply@gmail.com",
                pass: "maximuss100"
            },
            tls: { rejectUnauthorized: false }
        });
        const mailOptions = {
            from: 'gamewriter.noreply@gmail.com',
            to: 'alesonmorais@gmail.com',
            subject: titulo,
            html: text
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

    },

    enviarEmailCliente: (titulo, text, email) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "noreplywpinovacoes@gmail.com",
                pass: "WPavisados"
            },
            tls: { rejectUnauthorized: false }
        });
        const mailOptions = {
            from: 'noreplywpinovacoes@gmail.com',
            to: email,
            subject: titulo,
            html: text,
            attachments: [{
                filename: 'WP.png',
                path: __dirname + '/WP.png',
                cid: 'logo'
            }]
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

    },

    enviaConfirmacao: (email) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "noreplytribunaldoconsumidor@gmail.com",
                pass: "tribunaldoconsumidor@13"
            },
            tls: { rejectUnauthorized: false }
        });
        const mailOptions = {
            from: 'noreplytribunaldoconsumidor@gmail.com',
            to: email,
            subject: "TDC - Tribunal do Consumidor",
            text: "Seja muito bem vindo(a),\n\n\nSua conta foi criada com sucesso no aplicativo TDC - Tribunal do Consumidor!"
                + " \n"
                + ""
                + " \n\n\n Atenciosamente, "
                + "\n\n Equipe TDC",
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

    }

}

module.exports = Utils;
