import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY");

export const sendEmail = async (templateParams: any) => {
  try {
    const result = await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      templateParams
    );
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};