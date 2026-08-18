
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

        ;

        // Get form values
        const name = req.body.dzName;
        const email = req.body.dzEmail;
        const phone = req.body.dzOther?.Phone;
        const subject = req.body.dzOther?.Subject;
        const message = req.body.dzMessage;




        // ===============================
        // VALIDATION
        // ===============================

        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Phone validation - exactly 10 digits
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must contain exactly 10 digits."
            });
        }




        // ===============================
        // GMAIL TRANSPORTER
        // ===============================

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: "pm7244875@gmail.com",
                pass: "imdvvhhckyvaxkbe"
            }

        });


        // ===============================
        // SEND EMAIL
        // ===============================

        await transporter.sendMail({

            from: "pm7244875@gmail.com",

            to: "pm7244875@gmail.com",

            replyTo: email,

            subject: subject,

            html: `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5; font-family:Arial, Helvetica, sans-serif; color:#333333;">
        <tr>
            <td align="center" style="padding:30px 15px;">

                <table width="650" cellpadding="0" cellspacing="0" border="0" style="max-width:650px; width:100%; background:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #e5e5e5; box-shadow:0 4px 15px rgba(0,0,0,0.08);">
                    
                    <!-- HEADER -->
                    <tr>
                        <td style="background:#d71920; padding:20px 30px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:0.5px;">
                                New Contact Enquiry
                            </h1>
                            <p style="margin:6px 0 0; color:#ffffff; font-size:14px;">
                                New enquiry received from your website
                            </p>
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style="padding:30px;">

                            <!-- Heading with red border -->
                            <h2 style="
                                margin:0 0 20px;
                                font-size:18px;
                                color:#222222;
                                border-left:4px solid #d71920;
                                padding-left:12px;
                            ">
                                Enquiry Details
                            </h2>

                            <!-- Name -->
                            <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                <strong style="color:#d71920;">Name</strong>
                                <div style="margin-top:5px; font-size:15px; color:#333;">${name}</div>
                            </div>

                            <!-- Email -->
                            <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                <strong style="color:#d71920;">Email</strong>
                                <div style="margin-top:5px; font-size:15px; color:#333;">${email}</div>
                            </div>

                            <!-- Phone -->
                            <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                <strong style="color:#d71920;">Phone</strong>
                                <div style="margin-top:5px; font-size:15px; color:#333;">${phone}</div>
                            </div>

                            <!-- Subject -->
                            <div style="padding:14px 16px; margin-bottom:10px; background:#fafafa; border-left:4px solid #d71920; border-radius:4px;">
                                <strong style="color:#d71920;">Subject</strong>
                                <div style="margin-top:5px; font-size:15px; color:#333;">${subject}</div>
                            </div>

                            <!-- Message -->
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

                    <!-- FOOTER -->
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


        console.log("EMAIL SENT SUCCESSFULLY");


        // ===============================
        // AJAX RESPONSE
        // ===============================

        return res.status(200).json({

            success: true,

            message: "Your form submitted successfully."

        });


    } catch (error) {

        console.error("MAIL ERROR:", error);

        return res.status(500).json({

            success: false,

            message: error.message || "Mail failed. Please try again."

        });

    }

};


// ===============================
// EXPORT
// ===============================

module.exports = {
    getAllContact,
    sendContactMail
};

