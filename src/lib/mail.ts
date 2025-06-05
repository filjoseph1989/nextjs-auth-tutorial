import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const emailFrom = process.env.RESEND_EMAIL_FROM || '';

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

    if (emailFrom === '') {
        console.error('RESEND_EMAIL_FROM is not set in environment variables.');
        return false;
    }

    const { data, error } = await resend.emails.send({
        from: `Acme <${emailFrom}>`,
        to: [email],
        subject: 'Verify your email address',
        html: `<p>Click the link below to verify your email address:</p>
               <p><a href="${confirmLink}">Verify Email</a></p>
               <p>If you did not request this, please ignore this email.</p>`,
    });

    if (error) {
        console.error('Error sending verification email:', JSON.stringify(error, null, 2));
        return false;
    }

    console.log(`Verification email sent to ${email}`);

    return true;
}