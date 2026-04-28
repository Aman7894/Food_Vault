import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import API_URL from '../api/apiConfig';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/contact`, form);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'ap7164772@gmail.com',
      sub: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 71647 72000',
      sub: 'Mon–Sat, 9am – 8pm IST',
    },
    {
      icon: MapPin,
      label: 'Find Us',
      value: 'India',
      sub: 'Serving across the country',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: '9:00 AM – 10:00 PM',
      sub: 'All 7 days a week',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section */}
      <div className="relative bg-secondary/30 border-b py-20 mb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-rose-400">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question, feedback, or a partnership idea? We'd love to hear from you. 
            Drop us a message and we'll get back to you shortly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {contactInfo.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-4 bg-primary/10 text-primary rounded-xl mb-4">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-lg mb-1">{label}</h3>
              <p className="text-foreground font-medium text-sm">{value}</p>
              <p className="text-muted-foreground text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          {success ? (
            <div className="glass p-12 rounded-3xl text-center">
              <div className="inline-flex items-center justify-center p-5 bg-green-500/10 text-green-500 rounded-full mb-6">
                <CheckCircle2 className="h-14 w-14" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Message Sent!</h2>
              <p className="text-muted-foreground text-lg mb-2">
                Thank you for reaching out. We've received your message.
              </p>
              <p className="text-muted-foreground">
                A confirmation has been sent to your email, and we'll reply within 24 hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-8 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="glass p-8 md:p-10 rounded-3xl">
              <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {error && (
                <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-xl mb-6 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
