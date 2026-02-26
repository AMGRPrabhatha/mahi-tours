# 🚀 Quick Setup Instructions

## Step 1: Fix npm Permission Issue

The npm install is failing due to cache permissions. Try one of these solutions:

### Option A: Clear npm cache and retry
```bash
npm cache clean --force
npm install express nodemailer cors dotenv body-parser
```

### Option B: Use sudo (if Option A fails)
```bash
sudo npm install express nodemailer cors dotenv body-parser
```

### Option C: Fix npm permissions permanently
```bash
sudo chown -R $USER ~/.npm
npm install express nodemailer cors dotenv body-parser
```

---

## Step 2: Configure Email Credentials

I've created a `.env` file for you. You need to:

1. **Open `.env` file** (already created in your project)

2. **Replace these values:**
   - `EMAIL_USER` → Your Gmail address
   - `EMAIL_PASS` → Your Gmail App Password (see below)
   - `RECIPIENT_EMAIL` → Where you want to receive bookings

3. **Generate Gmail App Password:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification (if not enabled)
   - Search for "App passwords"
   - Create new app password for "Mail" → "Other (Ceylon Cabs)"
   - Copy the 16-character password
   - Paste it in `.env` as `EMAIL_PASS`

---

## Step 3: Start the Server

Once dependencies are installed and `.env` is configured:

```bash
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
✅ Email server is ready to send messages
📧 Email service configured for: your-email@gmail.com
```

---

## Step 4: Test the Form

1. Open `vehicles.html` in your browser
2. Scroll to "Book Your Taxi" form
3. Fill in the details
4. Click "Book Now"
5. Check for success message
6. Verify email received

---

## Troubleshooting

**If npm install still fails:**
- Try running Terminal as administrator
- Or manually install each package:
  ```bash
  npm install express
  npm install nodemailer
  npm install cors
  npm install dotenv
  npm install body-parser
  ```

**If server won't start:**
- Make sure `.env` file has correct credentials
- Check if port 3000 is available
- Verify all dependencies installed successfully

**Need help?**
- Check the full SETUP_GUIDE.md for detailed instructions
- Review server.js for configuration details
