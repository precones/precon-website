# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to receive form submissions from your website.

## Step 1: Prepare Your Google Sheet

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/16PmxrU1cd_UpBeIy_uOoJFXxHxQ8MWtDXs7PAipgnVU/edit
2. Add column headers in the first row:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Phone`
   - Column E: `Project Type`
   - Column F: `Message`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Tools** → **Script Editor**
2. Delete all code in the editor
3. Copy and paste this code:

```javascript
// Google Apps Script for receiving form submissions

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    const newRow = [
      data.timestamp || new Date().toLocaleString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.projectType || '',
      data.message || ''
    ];
    
    // Add a new row to the sheet
    sheet.appendRow(newRow);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. In the dropdown, select **Type** → **Web app**
4. Set the following:
   - Execute as: Your Google Account
   - Who has access: **Anyone**
5. Click **Deploy**
6. You'll get a deployment ID and a URL that looks like:
   ```
   https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb
   ```
7. **Copy this entire URL**

## Step 4: Update Your Website

1. Open `/home/preconadmin/Downloads/Precon Website/contact.html`
2. Find this line (around line 180):
   ```javascript
   const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE', {
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your deployment URL
   
   Example:
   ```javascript
   const response = await fetch('https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb', {
   ```

## Step 5: Test the Form

1. Go to your website's contact page
2. Fill out the "Get a Quote" form
3. Click "Send Message"
4. You should see a success message
5. Check your Google Sheet - the data should appear in a new row

## Troubleshooting

- **Nothing appears in the sheet?**
  - Check that the Apps Script deployment URL is correct in contact.html
  - Open browser Developer Tools (F12) and check the Console for errors
  - Make sure the Apps Script has the correct column headers

- **Error message appears?**
  - Check that your deployment is set to "Anyone" access
  - Verify the script code was copied correctly
  - Try redeploying the script

## Additional Notes

- The form will automatically add a timestamp
- All submissions appear in your Google Sheet in real-time
- You can create a Google Form from this data if needed (Form → Create new form)
- Set up email notifications: Sheet → Notifications → Notify me when changes are made

## Optional: Set Up Automatic Email Notifications

To get email alerts when new submissions arrive:

1. Go to your Google Sheet
2. Click on **Notification rules** (bell icon)
3. Choose your preferred notification settings

## Optional: Create a Google Form (Alternative)

If you prefer to use Google Forms instead of the custom form:

1. In your Google Sheet, go to **Tools** → **Create a new form**
2. Set up form fields matching your quote request form
3. Google Forms will automatically populate your sheet
4. You can embed the form on your website if desired
