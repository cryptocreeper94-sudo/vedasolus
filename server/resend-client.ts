// Resend email client integration
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

export async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail: fromEmail || 'noreply@vedasolus.com'
  };
}

export async function sendVerificationEmail(to: string, code: string, firstName: string) {
  const { client, fromEmail } = await getResendClient();
  
  await client.emails.send({
    from: fromEmail,
    to: [to],
    subject: 'Verify your VedaSolus account',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f1f5f9;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22d3ee; font-size: 28px; margin: 0;">VedaSolus</h1>
          <p style="color: #94a3b8; margin-top: 5px;">Ancient Wisdom. Modern Science.</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.1);">
          <h2 style="color: #f1f5f9; margin-top: 0;">Welcome, ${firstName}!</h2>
          <p style="color: #cbd5e1; line-height: 1.6;">
            Thank you for joining VedaSolus. To complete your registration, please enter this verification code:
          </p>
          
          <div style="background: linear-gradient(135deg, #0891b2 0%, #059669 100%); border-radius: 12px; padding: 20px; text-align: center; margin: 25px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: white;">${code}</span>
          </div>
          
          <p style="color: #94a3b8; font-size: 14px;">
            This code expires in 15 minutes. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 12px;">
          <p>&copy; 2025 VedaSolus by Jason Andrews. All rights reserved.</p>
        </div>
      </div>
    `,
  });
}
