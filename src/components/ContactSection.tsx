'use client';

import { useRef, useEffect, useState } from 'react';

const projectTypes = [
  'SaaS Product',
  'Web Application',
  'Mobile App',
  'Business Automation',
  'CRM System',
  'AI Integration',
  'Digital Transformation',
  'Consulting',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    [titleRef.current, formRef.current].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setTimeout(() => {
              el.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, 50);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your project';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call — replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding"
      style={{ background: '#F7F7F5' }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div ref={titleRef}>
            <div className="flex items-center gap-4 mb-8">
              <span style={{ opacity: 0.4, fontSize: '0.65rem', letterSpacing: '0.15em', fontWeight: 500, textTransform: 'uppercase', color: '#080B72' }}>
                06 / Contact
              </span>
              <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'rgba(8,11,114,0.15)' }} />
            </div>

            <h2 className="text-headline" style={{ color: '#080B72', marginBottom: '32px' }}>
              HAVE AN IDEA?
              <br />
              LET&apos;S MAKE
              <br />
              IT REAL.
            </h2>

            <p className="text-body" style={{ color: '#05062F', opacity: 0.55, marginBottom: '48px', maxWidth: '380px' }}>
              Whether you have a fully formed concept or just a kernel of an idea —
              we would love to hear it. Tell us what you&apos;re working on and
              let&apos;s figure out if we can build it together.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <div>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#080B72', opacity: 0.4, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Email
                </p>
                <a
                  href="mailto:tatakaelabs@gmail.com"
                  className="hover-underline"
                  style={{ fontSize: '1rem', fontWeight: 500, color: '#080B72', textDecoration: 'none' }}
                >
                  tatakaelabs@gmail.com
                </a>
              </div>

              {/* Social links */}
              <div className="flex gap-6 mt-4">
                {[
                  { label: 'LinkedIn', href: '#' },
                  { label: 'Twitter / X', href: '#' },
                  { label: 'GitHub', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="hover-underline"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      color: '#080B72',
                      opacity: 0.5,
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={formRef}>
            {submitted ? (
              <div
                className="flex flex-col items-start justify-center h-full"
                style={{ minHeight: '400px' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '24px' }}>◈</div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color: '#080B72', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                  Message Received.
                </h3>
                <p style={{ fontSize: '1rem', color: '#05062F', opacity: 0.55, lineHeight: 1.7, maxWidth: '360px' }}>
                  Thank you for reaching out. We&apos;ll review your message and get back
                  to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-2">
                  {/* Name */}
                  <FormField label="Your Name *" error={errors.name}>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      autoComplete="name"
                    />
                  </FormField>

                  {/* Email */}
                  <FormField label="Email Address *" error={errors.email}>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      autoComplete="email"
                    />
                  </FormField>

                  {/* Company */}
                  <FormField label="Company / Organisation">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      autoComplete="organization"
                    />
                  </FormField>

                  {/* Project Type */}
                  <FormField label="Project Type">
                    <select
                      className="form-input"
                      value={formData.projectType}
                      onChange={(e) => handleChange('projectType', e.target.value)}
                      style={{ cursor: 'pointer', appearance: 'none' }}
                    >
                      <option value="">Select a project type...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </FormField>

                  {/* Description */}
                  <FormField label="Tell Us About Your Project *" error={errors.description}>
                    <textarea
                      className="form-input"
                      placeholder="Describe your idea, challenge or what you want to build..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      style={{ resize: 'vertical', minHeight: '100px' }}
                    />
                  </FormField>

                  {/* Submit */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={submitting}
                      style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      {!submitting && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingBottom: '4px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.65rem',
        fontWeight: 500,
        letterSpacing: '0.12em',
        color: '#080B72',
        opacity: 0.5,
        textTransform: 'uppercase',
        marginBottom: '2px',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: '0.72rem', color: '#cc3333', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

