

export default {
    afterCreate: async (data) => {
        const { firstname, lastname, email, phone, subject, message , createdAt} = data.result;
        const ip = "127.0.0.1";
        try {
            const emailOptions = {
              to: "leads@webbing-agency.com",
              subject: `Leads to Webbing Agency | ${firstname}`,
              html: generateEmailTemplate({ firstname, lastname, email, phone, subject, 
                date: new Date(createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
              , message, ip }),
            //   attachments: [
            //     {
            //       filename: file.name,
            //       path: file.path,
            //     },
            //   ],
            };
            
            await strapi.plugins['email'].services.email.send(emailOptions);
            strapi.log.debug(`Email sent`);
          } catch (err) {
            strapi.log.error(`Error sending email`, err);
          }
    },
}



function generateEmailTemplate({ firstname, lastname, email, phone, subject,date, message,ip }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2BB2E9;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            position: relative;
        }
        .logo {
            position: absolute;
            top: 10px;
            left: 20px;
            height: 50px;
        }
        .content {
            padding: 30px;
            line-height: 1.6;
            color: #333333;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            border-top: 1px solid #eeeeee;
        }
        .ip-info {
            margin-top: 20px;
            padding: 15px;
            background-color: #f1f1f1;
            border-radius: 5px;
            font-size: 16px;
            color: #555;
        }
        @media (max-width: 600px) {
            .content {
                padding: 20px;
            }
            .header {
                font-size: 20px;
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div>Webbing Agency</div>
        </div>
        <div class="content">
            <p><strong>First Name:</strong> ${firstname}</p>
            <p><strong>Last Name:</strong> ${lastname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            ${
            //     `<div class="ip-info">
            //     <p><strong>IP Address:</strong> ${ip}</p>
            // </div>` 
            ""
            }
        </div>
        <div class="footer">
            &copy; 2024 - All Rights Reserved
        </div>
    </div>
</body>
</html>`;
}
