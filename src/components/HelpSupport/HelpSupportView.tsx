import React, { useState } from 'react';
import { ArrowLeft, Send, Mail, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import {SendHelpSupportMessage} from "../../core/HelpSupport Message/api/HelpSupportMessage.ts";

interface HelpSupportViewProps {
  onCancel: () => void;
  sendHelpSupportMessage: SendHelpSupportMessage
}

const HelpSupportView: React.FC<HelpSupportViewProps> = ({ onCancel, sendHelpSupportMessage }) => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    sendHelpSupportMessage({customerEmail: formData.email, subject: formData.subject, message: formData.message})
        .then((res) => {
          if(res.success) {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ email: '', subject: '', message: '' });
            setSubmitStatus('idle');
          }else {
            setSubmitStatus('error');
          }
        })
  };

  const handleGoBack = () => {
    onCancel();
  };

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      available: 'Available 9 AM - 6 PM EST'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll respond within 24 hours',
      action: 'Send Email',
      available: 'Response within 24 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-[#A0A0A8]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#2B2C34] font-['Inter']">Help & Support</h1>
            <p className="text-sm text-[#A0A0A8]">Get help with your Shop-Code account</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-2">Contact Support</h2>
              <p className="text-[#A0A0A8]">Send us a message and we'll get back to you as soon as possible</p>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-700 text-sm">We'll respond to your inquiry within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">Failed to send message. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2B2C34] mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                    validationErrors.email ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
                  }`}
                  placeholder="your.email@example.com"
                  aria-describedby={validationErrors.email ? "email-error" : undefined}
                  aria-invalid={!!validationErrors.email}
                />
                {validationErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#2B2C34] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors ${
                    validationErrors.subject ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
                  }`}
                  placeholder="How can we help you?"
                  aria-describedby={validationErrors.subject ? "subject-error" : undefined}
                  aria-invalid={!!validationErrors.subject}
                />
                {validationErrors.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                    {validationErrors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#2B2C34] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-colors resize-none ${
                    validationErrors.message ? 'border-red-300 bg-red-50' : 'border-[#A0A0A8]'
                  }`}
                  placeholder="Please describe your issue or question in detail..."
                  aria-describedby={validationErrors.message ? "message-error" : undefined}
                  aria-invalid={!!validationErrors.message}
                />
                {validationErrors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                    {validationErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6C63FF] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5845E9] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Support Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-[#2B2C34] font-['Inter'] mb-4">Other Ways to Get Help</h2>
              
              <div className="space-y-4">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#6C63FF]/30 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-[#6C63FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#6C63FF]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#2B2C34] mb-1">{option.title}</h3>
                          <p className="text-[#A0A0A8] text-sm mb-2">{option.description}</p>
                          <p className="text-xs text-[#6C63FF] font-medium">{option.available}</p>
                        </div>
                        <button className="text-[#6C63FF] hover:text-[#5845E9] font-medium text-sm transition-colors">
                          {option.action}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-[#2B2C34] font-['Inter'] mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="font-medium text-[#2B2C34] mb-1">How do I create my first promo?</h4>
                  <p className="text-sm text-[#A0A0A8]">Navigate to the Promos tab and click "Create New Promo" to get started.</p>
                </div>
                
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="font-medium text-[#2B2C34] mb-1">Can I add multiple shops?</h4>
                  <p className="text-sm text-[#A0A0A8]">Yes! You can manage multiple shops depending on your plan. Check your plan limits in Settings.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-[#2B2C34] mb-1">How do customers redeem coupons?</h4>
                  <p className="text-sm text-[#A0A0A8]">Customers scan the QR code with their phone, and cashiers can redeem it using the scanning interface.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupportView;