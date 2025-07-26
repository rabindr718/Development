// import React, { useState } from "react";
// import { COMPANY_INFO } from "../../utils/constants";
// import styles from "./Contact.module.css";

// interface ContactFormData {
//   name: string;
//   email: string;
//   company: string;
//   phone: string;
//   service: string;
//   budget: string;
//   message: string;
//   gdprConsent: boolean;
// }

// const Contact: React.FC = () => {
//   const [formData, setFormData] = useState<ContactFormData>({
//     name: "",
//     email: "",
//     company: "",
//     phone: "",
//     service: "",
//     budget: "",
//     message: "",
//     gdprConsent: false,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Handle form submission logic here
//     alert("Thank you for your message! We will get back to you soon.");
//   };

//   return (
//     <section className={styles.contact}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h2>Get In Touch</h2>
//           <p>
//             Ready to start your next project? Let's discuss your requirements
//           </p>
//         </div>

//         <div className={styles.contactContent}>
//           <div className={styles.contactInfo}>
//             <h3>Contact Information</h3>

//             <div className={styles.contactItem}>
//               <span className={styles.icon}>📧</span>
//               <div>
//                 <h4>Email</h4>
//                 <p>{COMPANY_INFO.email}</p>
//               </div>
//             </div>

//             <div className={styles.contactItem}>
//               <span className={styles.icon}>📞</span>
//               <div>
//                 <h4>Phone</h4>
//                 <p>{COMPANY_INFO.phone}</p>
//               </div>
//             </div>

//             <div className={styles.contactItem}>
//               <span className={styles.icon}>📍</span>
//               <div>
//                 <h4>Address</h4>
//                 <p>{COMPANY_INFO.address}</p>
//               </div>
//             </div>

//             <div className={styles.workingHours}>
//               <h4>Working Hours</h4>
//               <p>Monday - Friday: 9:00 AM - 6:00 PM CET</p>
//               <p>Saturday: 10:00 AM - 2:00 PM CET</p>
//               <p>Sunday: Closed</p>
//             </div>
//           </div>

//           <form className={styles.contactForm} onSubmit={handleSubmit}>
//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="name">Name *</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="email">Email *</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="company">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className={styles.formRow}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="service">Service Required *</label>
//                 <select
//                   id="service"
//                   name="service"
//                   value={formData.service}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a service</option>
//                   <option value="web-development">Web Development</option>
//                   <option value="mobile-development">Mobile Development</option>
//                   <option value="enterprise-software">
//                     Enterprise Software
//                   </option>
//                   <option value="cloud-solutions">Cloud Solutions</option>
//                   <option value="ai-ml">AI & Machine Learning</option>
//                   <option value="consulting">IT Consulting</option>
//                 </select>
//               </div>
//               <div className={styles.formGroup}>
//                 <label htmlFor="budget">Budget Range</label>
//                 <select
//                   id="budget"
//                   name="budget"
//                   value={formData.budget}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select budget range</option>
//                   <option value="5k-10k">€5,000 - €10,000</option>
//                   <option value="10k-25k">€10,000 - €25,000</option>
//                   <option value="25k-50k">€25,000 - €50,000</option>
//                   <option value="50k+">€50,000+</option>
//                 </select>
//               </div>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="message">Project Details *</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={5}
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Tell us about your project requirements..."
//                 required
//               ></textarea>
//             </div>

//             <div className={styles.gdprConsent}>
//               <label className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   name="gdprConsent"
//                   checked={formData.gdprConsent}
//                   onChange={handleChange}
//                   required
//                 />
//                 <span className={styles.checkmark}></span>I consent to the
//                 processing of my personal data in accordance with the
//                 <a href="/privacy" target="_blank">
//                   {" "}
//                   Privacy Policy
//                 </a>{" "}
//                 and GDPR regulations. *
//               </label>
//             </div>

//             <button type="submit" className={styles.submitButton}>
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
import React, { useState, useEffect } from "react";
import styles from "./Contact.module.css";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  gdprConsent: boolean;
  marketingConsent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    gdprConsent: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Project details are required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please provide more details (minimum 20 characters)";
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = "GDPR consent is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          country: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
          gdprConsent: false,
          marketingConsent: false,
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const europeanCountries = [
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Poland",
    "Romania",
    "Netherlands",
    "Belgium",
    "Czech Republic",
    "Greece",
    "Portugal",
    "Sweden",
    "Hungary",
    "Austria",
    "Denmark",
    "Finland",
    "Slovakia",
    "Ireland",
    "Croatia",
    "Lithuania",
    "Slovenia",
    "Latvia",
    "Estonia",
    "Malta",
    "Luxembourg",
    "Cyprus",
  ];

  if (isSubmitted) {
    return (
      <section id="contact-section" className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Thank You!</h2>
            <p>
              Your message has been sent successfully. We'll get back to you
              within 24 hours.
            </p>
            <div className={styles.successDetails}>
              <p>🕐 Expected Response Time: Within 24 hours</p>
              <p>📧 Confirmation sent to: {formData.email}</p>
              <p>🔒 Your data is processed in compliance with GDPR</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-section" className={styles.contact}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ""}`}>
          <span className={styles.badge}>Get In Touch</span>
          <h2>Let's Build Something Amazing Together</h2>
          <p>
            Ready to transform your business with cutting-edge software
            solutions? Our team of European experts is here to help you succeed.
          </p>
        </div>

        <div className={styles.contactWrapper}>
          <div
            className={`${styles.contactInfo} ${
              isVisible ? styles.slideInLeft : ""
            }`}
          >
            <div className={styles.infoCard}>
              <h3>Contact Information</h3>
              <p className={styles.infoSubtext}>
                Get in touch with our European team
              </p>

              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg
                      className={styles.icon}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <h4>Email</h4>
                    <p>hello@eurosoftware.dev</p>
                    <span className={styles.response}>Response within 24h</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg
                      className={styles.icon}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <h4>Phone</h4>
                    <p>+49 30 12345678</p>
                    <span className={styles.response}>Mon-Fri 9AM-6PM CET</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <svg
                      className={styles.icon}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <h4>Address</h4>
                    <p>
                      Friedrichstraße 123
                      <br />
                      10117 Berlin, Germany
                    </p>
                    <span className={styles.response}>European Union HQ</span>
                  </div>
                </div>
              </div>

              <div className={styles.workingHours}>
                <h4>Working Hours</h4>
                <div className={styles.hoursGrid}>
                  <div className={styles.hoursItem}>
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM CET</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM CET</span>
                  </div>
                  <div className={styles.hoursItem}>
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className={styles.certifications}>
                <h4>Certifications & Compliance</h4>
                <div className={styles.badges}>
                  <span className={styles.certBadge}>🇪🇺 GDPR Compliant</span>
                  <span className={styles.certBadge}>🔒 ISO 27001</span>
                  <span className={styles.certBadge}>⚡ AGILE Certified</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className={`${styles.contactForm} ${
              isVisible ? styles.slideInRight : ""
            }`}
            onSubmit={handleSubmit}
          >
            <div className={styles.formHeader}>
              <h3>Start Your Project</h3>
              <p>
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? styles.error : ""}
                />
                {errors.firstName && (
                  <span className={styles.errorText}>{errors.firstName}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? styles.error : ""}
                />
                {errors.lastName && (
                  <span className={styles.errorText}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Business Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.error : ""}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Ltd."
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? styles.error : ""}
                  placeholder="+49 30 12345678"
                />
                {errors.phone && (
                  <span className={styles.errorText}>{errors.phone}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  {europeanCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="service">Service Required *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={errors.service ? styles.error : ""}
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-development">
                    Mobile App Development
                  </option>
                  <option value="enterprise-software">
                    Enterprise Software Solutions
                  </option>
                  <option value="cloud-solutions">
                    Cloud Migration & Solutions
                  </option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="devops">DevOps & Infrastructure</option>
                  <option value="consulting">IT Strategy Consulting</option>
                  <option value="maintenance">
                    Software Maintenance & Support
                  </option>
                </select>
                {errors.service && (
                  <span className={styles.errorText}>{errors.service}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="budget">Project Budget</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select budget range</option>
                  <option value="5k-15k">€5,000 - €15,000</option>
                  <option value="15k-30k">€15,000 - €30,000</option>
                  <option value="30k-50k">€30,000 - €50,000</option>
                  <option value="50k-100k">€50,000 - €100,000</option>
                  <option value="100k+">€100,000+</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="timeline">Project Timeline</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-3months">1-3 months</option>
                <option value="3-6months">3-6 months</option>
                <option value="6months+">6+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Project Details *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? styles.error : ""}
                placeholder="Tell us about your project requirements, goals, and any specific technologies you have in mind..."
              ></textarea>
              {errors.message && (
                <span className={styles.errorText}>{errors.message}</span>
              )}
              <small className={styles.charCount}>
                {formData.message.length} characters (minimum 20 required)
              </small>
            </div>

            <div className={styles.consentSection}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleChange}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checkboxText}>
                    I consent to the processing of my personal data in
                    accordance with the{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>{" "}
                    and GDPR regulations. This data will be used solely to
                    respond to your inquiry and provide relevant information
                    about our services. *
                  </span>
                </label>
                {errors.gdprConsent && (
                  <span className={styles.errorText}>{errors.gdprConsent}</span>
                )}
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleChange}
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checkboxText}>
                    I would like to receive marketing communications about new
                    services, industry insights, and special offers. You can
                    unsubscribe at any time.
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.submitButton} ${
                isSubmitting ? styles.loading : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <svg
                    className={styles.buttonIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send Message
                </>
              )}
            </button>

            <div className={styles.formFooter}>
              <p>
                🔒 Your information is secure and will never be shared with
                third parties.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
