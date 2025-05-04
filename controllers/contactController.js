import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
      action: 'submit',
    });

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        ...formData,
        token,
      });

      alert('Form submitted successfully!');
    } catch (err) {
      alert('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form inputs here */}
      <div className="g-recaptcha" data-sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} data-size="invisible"></div>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
