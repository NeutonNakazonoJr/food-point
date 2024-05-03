const { createToken } = require("../utils/jwt.js");
const emailSender = require("./sendEmail.js");

const createEmailToRecoverPassword = async (userID, userEmail) => {
    const token = createToken({ userID, userEmail } , process.env.SECRET_KEY_JWT, { expiresIn: '4h' });

    const html = `<!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redefinição de Senha</title>
    </head>
    <body>
      <table bgcolor="#ffffff" width="600" cellspacing="0" cellpadding="0" style="margin: auto;">
        <thead bgcolor="#dfe4ea">
          <tr>
            <th style="padding: 40px 0 24px; text-align: center;"><h1 style="margin: 0; color: #30336b;">Redefinição de Senha</h1></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-family: sans-serif; text-align: center; padding: 24px;">
              <p style="line-height: 1.5; margin-bottom: 24px; color: #30336b; font-size: 16px; letter-spacing: 1px;">Código de acesso: <strong>${token}</strong></p>
              <a href="${process.env.SERVER_URL}/forget-password" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Acessar Página</a>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>`

    const subject = 'Redefinição de senha';
    await emailSender(userEmail, subject, html);
}

module.exports = createEmailToRecoverPassword;