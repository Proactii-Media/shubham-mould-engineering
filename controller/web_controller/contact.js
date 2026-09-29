const nodemailer = require("nodemailer");
const { applications } = require("../../constants/data");

// ===============================
// GET CONTACT PAGE
// ===============================
const getAllContact = async (req, res) => {
    try {
        res.render("contact", {
            applications,
            success: req.query.success === "1"
        });
    } catch (error) {
        console.error("GET CONTACT ERROR:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// ===============================
// SEND CONTACT EMAIL
// ===============================
const sendContactMail = async (req, res) => {
    try {

        // ===============================
        // GET FORM VALUES
        // ===============================

        const name = req.body.dzName?.trim();
        const email = req.body.dzEmail?.trim();
        const phone = req.body.dzOther?.Phone?.trim();
        const subject = req.body.dzOther?.Subject?.trim();
        const message = req.body.dzMessage?.trim();

        // ===============================
        // REQUIRED FIELD VALIDATION
        // ===============================

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields correctly."
            });
        }

        // ===============================
        // EMAIL VALIDATION
        // ===============================

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // ===============================
        // PHONE VALIDATION
        // ===============================

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit phone number."
            });
        }
        const captchaToken = req.body["g-recaptcha-response"];

        if (!captchaToken) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields correctly."
            });
        }
        
        const googleResponse = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },

                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: captchaToken
                })
            }
        );

        // const captchaResult = await googleResponse.json();

       

        // if (!captchaResult.success) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please fill in all fields correctly."
        //     });
        // }


        const transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });


        await transporter.sendMail({
            from: process.env.GMAIL_USER,

            to: [
                process.env.GMAIL_USER
            ],

            replyTo: email,

            subject: subject,

            html: `
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background:#f5f5f5; font-family:Arial, Helvetica, sans-serif; color:#333333;">

                    <tr>
                        <td align="center" style="padding:30px 15px;">

                            <table width="650" cellpadding="0" cellspacing="0" border="0"
                                style="max-width:650px; width:100%; background:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e5e5e5;">

                                <tr>
                                    <td style="background:#d71920; padding:20px 30px; text-align:center;">

                                        <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700;">
                                            New Contact Enquiry
                                        </h1>

                                        <p style="margin:6px 0 0; color:#ffffff; font-size:14px;">
                                            New enquiry received from your website
                                        </p>

                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:30px;">

                                        <h2 style="
                                            margin:0 0 20px;
                                            font-size:18px;
                                            color:#222222;
                                            border-left:4px solid #d71920;
                                            padding-left:12px;
                                        ">
                                            Enquiry Details
                                        </h2>

                                        <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                            <strong style="color:#d71920;">Name</strong>
                                            <div style="margin-top:5px; font-size:15px; color:#333;">
                                                ${name}
                                            </div>
                                        </div>

                                        <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                            <strong style="color:#d71920;">Email</strong>
                                            <div style="margin-top:5px; font-size:15px; color:#333;">
                                                ${email}
                                            </div>
                                        </div>

                                        <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                            <strong style="color:#d71920;">Phone</strong>
                                            <div style="margin-top:5px; font-size:15px; color:#333;">
                                                ${phone}
                                            </div>
                                        </div>

                                        <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                            <strong style="color:#d71920;">Subject</strong>
                                            <div style="margin-top:5px; font-size:15px; color:#333;">
                                                ${subject}
                                            </div>
                                        </div>

                                        <div style="padding:18px; margin-top:20px; background:#fff5f5; border:1px solid #f1c1c1; border-radius:6px;">
                                            <div style="color:#d71920; font-weight:700; margin-bottom:10px;">
                                                Message
                                            </div>

                                            <div style="font-size:15px; line-height:1.7; color:#444444; white-space:pre-line;">
                                                ${message}
                                            </div>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#222222; padding:18px 25px; text-align:center;">

                                        <p style="margin:0; color:#ffffff; font-size:13px;">
                                            This enquiry was submitted from your company website.
                                        </p>

                                        <p style="margin:7px 0 0; color:#d71920; font-size:13px; font-weight:600;">
                                            Subham Moulds & Engineering
                                        </p>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>

                </table>
            `
        });

       

        return res.status(200).json({
            success: true,
            message: "Your form submitted successfully."
        });

    } catch (error) {

        console.error("MAIL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
};

module.exports = {
    getAllContact,
    sendContactMail
};