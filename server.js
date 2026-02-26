const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// POST endpoint for taxi booking
app.post('/api/book-taxi', async (req, res) => {
    try {
        const {
            name,
            email,
            flight,
            pickupDate,
            pickupTime,
            adults,
            children,
            vehicleType,
            pickupLocation,
            dropoffLocation,
            message
        } = req.body;

        // Validate required fields
        if (!name || !email || !pickupDate || !pickupTime || !adults || !vehicleType || !pickupLocation || !dropoffLocation) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Create email HTML template
        const emailHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    .header {
                        background: linear-gradient(135deg, #000000 0%, #434343 100%);
                        color: white;
                        padding: 30px;
                        text-align: left;
                        border-radius: 10px 10px 0 0;
                        display: flex;
                        align-items: center;
                    }
                    .content {
                        background: white;
                        padding: 30px;
                        border-radius: 0 0 10px 10px;
                    }
                    .field {
                        margin-bottom: 15px;
                        padding: 10px;
                        background: #f5f7fa;
                        border-radius: 5px;
                    }
                    .label {
                        font-weight: bold;
                        color: #0891b2;
                        display: block;
                        margin-bottom: 5px;
                    }
                    .value {
                        color: #333;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 2px solid #e5e7eb;
                        color: #6b7280;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="cid:mahiLogo" alt="Mahi Maps" style="height: 50px; margin-right: 15px;">
                        <h1 style="margin: 0; font-size: 24px;">New Taxi Booking Request</h1>
                    </div>
                    <div class="content">
                        <h2>Customer Information</h2>
                        <div class="field">
                            <span class="label">Name:</span>
                            <span class="value">${name}</span>
                        </div>
                        <div class="field">
                            <span class="label">Email:</span>
                            <span class="value">${email}</span>
                        </div>
                        ${flight ? `
                        <div class="field">
                            <span class="label">Flight Number:</span>
                            <span class="value">${flight}</span>
                        </div>
                        ` : ''}

                        <h2>Trip Details</h2>
                        <div class="field">
                            <span class="label">Pickup Date:</span>
                            <span class="value">${pickupDate}</span>
                        </div>
                        <div class="field">
                            <span class="label">Pickup Time:</span>
                            <span class="value">${pickupTime}</span>
                        </div>
                        <div class="field">
                            <span class="label">Number of Adults:</span>
                            <span class="value">${adults}</span>
                        </div>
                        <div class="field">
                            <span class="label">Number of Children:</span>
                            <span class="value">${children || '0'}</span>
                        </div>
                        <div class="field">
                            <span class="label">Vehicle Type:</span>
                            <span class="value">${vehicleType}</span>
                        </div>

                        <h2>Location Details</h2>
                        <div class="field">
                            <span class="label">Pickup Location:</span>
                            <span class="value">${pickupLocation}</span>
                        </div>
                        <div class="field">
                            <span class="label">Drop-off Location:</span>
                            <span class="value">${dropoffLocation}</span>
                        </div>

                        ${message ? `
                        <h2>Special Requests</h2>
                        <div class="field">
                            <span class="value">${message}</span>
                        </div>
                        ` : ''}

                        <div class="footer">
                            <p>This booking request was submitted via Mahi Maps website</p>
                            <p>Please respond to the customer at: ${email}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Taxi Booking - ${name} (${pickupDate})`,
            html: emailHTML,
            text: `
New Taxi Booking Request

Customer Information:
- Name: ${name}
- Email: ${email}
${flight ? `- Flight Number: ${flight}` : ''}

Trip Details:
- Pickup Date: ${pickupDate}
- Pickup Time: ${pickupTime}
- Adults: ${adults}
- Children: ${children || '0'}
- Vehicle Type: ${vehicleType}

Locations:
- Pickup: ${pickupLocation}
- Drop-off: ${dropoffLocation}

            ${message ? `Special Requests:\n${message}` : ''}
            `,
            attachments: [
                {
                    filename: 'mahi-logo.png',
                    path: 'assets/images/mahi-logo.png',
                    cid: 'mahiLogo'
                }
            ]
        };

        // Send email asynchronously (Fire-and-Forget)
        transporter.sendMail(mailOptions).then(info => {
            console.log('✅ Email sent successfully:', info.messageId);
        }).catch(error => {
            console.error('❌ Error sending email:', error);
        });

        // Return success immediately to client
        res.status(200).json({
            success: true,
            message: 'Booking request sent successfully! We will contact you soon.',
            messageId: 'pending'
        });

    } catch (error) {
        console.error('❌ Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send booking request. Please try again or contact us directly.',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📧 Email service configured for: ${process.env.EMAIL_USER || 'Not configured'}`);
});
