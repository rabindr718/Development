// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  TrendingUp,
  Code,
  Smartphone,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  Play,
  ChevronDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import styles from "./Home.module.css";

interface SlideData {
  title: string;
  highlightText: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  primaryLink: string;
  secondaryLink: string;
  backgroundType: "gradient" | "particles" | "geometric" | "waves" | "neural";
  stats?: { value: string; label: string }[];
}

interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
}

interface TestimonialData {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const heroRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const slides: SlideData[] = [
    {
      title: "Transform Your",
      highlightText: " Digital Future",
      subtitle:
        "Leading European software development company delivering cutting-edge solutions across the EU. From AI-powered applications to enterprise systems, we bring innovation to life with GDPR-compliant, scalable technology.",
      primaryButton: "Start Your Project",
      secondaryButton: "View Portfolio",
      primaryLink: "/contact",
      secondaryLink: "/portfolio",
      backgroundType: "neural",
      stats: [
        { value: "500+", label: "EU Clients" },
        { value: "98%", label: "Success Rate" },
        { value: "24/7", label: "Support" },
      ],
    },
    {
      title: "AI-Powered",
      highlightText: " Solutions",
      subtitle:
        "Harness the power of artificial intelligence and machine learning. We develop intelligent systems that automate processes, enhance decision-making, and drive business growth across European markets.",
      primaryButton: "Explore AI Services",
      secondaryButton: "Learn More",
      primaryLink: "/services",
      secondaryLink: "/about",
      backgroundType: "particles",
      stats: [
        { value: "50+", label: "AI Projects" },
        { value: "15+", label: "EU Countries" },
        { value: "99.9%", label: "Uptime" },
      ],
    },
    {
      title: "Enterprise",
      highlightText: " Excellence",
      subtitle:
        "Robust, scalable enterprise solutions built for European businesses. From digital transformation to cloud migration, we ensure your technology infrastructure meets the highest standards of security and performance.",
      primaryButton: "Enterprise Solutions",
      secondaryButton: "Schedule Demo",
      primaryLink: "/services",
      secondaryLink: "/contact",
      backgroundType: "geometric",
      stats: [
        { value: "100+", label: "Enterprise Clients" },
        { value: "ISO", label: "Certified" },
        { value: "GDPR", label: "Compliant" },
      ],
    },
    {
      title: "Innovation",
      highlightText: " & Growth",
      subtitle:
        "Stay ahead with emerging technologies like blockchain, IoT, and cloud-native architectures. We help European companies embrace digital transformation and achieve sustainable growth.",
      primaryButton: "Innovation Lab",
      secondaryButton: "Get Consultation",
      primaryLink: "/technologies",
      secondaryLink: "/contact",
      backgroundType: "waves",
      stats: [
        { value: "200%", label: "ROI Average" },
        { value: "6M+", label: "Users Served" },
        { value: "99%", label: "Client Retention" },
      ],
    },
  ];

  const services: ServiceData[] = [
    {
      icon: <Code className={styles.serviceIcon} />,
      title: "Custom Software",
      description:
        "Tailor-made software solutions designed specifically for your business needs and European market requirements.",
      features: [
        "Full-stack Development",
        "Microservices Architecture",
        "API Integration",
        "Legacy System Modernization",
      ],
      colorClass: styles.colorBlue,
    },
    {
      icon: <Smartphone className={styles.serviceIcon} />,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications that engage users and drive business growth across EU markets.",
      features: [
        "iOS & Android Apps",
        "React Native",
        "Flutter",
        "Progressive Web Apps",
      ],
      colorClass: styles.colorPurple,
    },
    {
      icon: <Globe className={styles.serviceIcon} />,
      title: "Web Development",
      description:
        "Modern, responsive websites and web applications optimized for performance and user experience.",
      features: [
        "React/Vue.js",
        "Node.js Backend",
        "E-commerce Solutions",
        "CMS Development",
      ],
      colorClass: styles.colorGreen,
    },
    {
      icon: <Shield className={styles.serviceIcon} />,
      title: "Cybersecurity Solutions",
      description:
        "Comprehensive security services to protect your digital assets and ensure GDPR compliance.",
      features: [
        "Security Audits",
        "Penetration Testing",
        "GDPR Compliance",
        "Data Protection",
      ],
      colorClass: styles.colorRed,
    },
    {
      icon: <Zap className={styles.serviceIcon} />,
      title: "Cloud & DevOps",
      description:
        "Scalable cloud infrastructure and DevOps practices for efficient, reliable software delivery.",
      features: [
        "AWS/Azure/GCP",
        "CI/CD Pipelines",
        "Infrastructure as Code",
        "Monitoring & Analytics",
      ],
      colorClass: styles.colorOrange,
    },
    {
      icon: <Users className={styles.serviceIcon} />,
      title: "Digital Transformation",
      description:
        "End-to-end digital transformation services to modernize your business processes and technology stack.",
      features: [
        "Process Automation",
        "Digital Strategy",
        "Change Management",
        "Training & Support",
      ],
      colorClass: styles.colorTeal,
    },
  ];

  const testimonials: TestimonialData[] = [
    {
      name: "Maria Schmidt",
      position: "CTO",
      company: "TechVision GmbH",
      content:
        "Exceptional software development services. They delivered our enterprise solution on time and exceeded all expectations. Their expertise in GDPR compliance was crucial for our EU operations.",
      rating: 5,
      avatar: "MS",
    },
    {
      name: "Jean-Pierre Dubois",
      position: "CEO",
      company: "Innovation Labs Paris",
      content:
        "Outstanding AI solutions that transformed our business processes. The team's technical expertise and understanding of European market needs is unmatched.",
      rating: 5,
      avatar: "JD",
    },
    {
      name: "Alessandro Rossi",
      position: "Digital Director",
      company: "Milano Tech Solutions",
      content:
        "Professional, reliable, and innovative. They built our mobile application from scratch and provided excellent ongoing support. Highly recommended for any European business.",
      rating: 5,
      avatar: "AR",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className={styles.home}>
      {/* Advanced Hero Slider */}
      <section
        ref={heroRef}
        className={`${styles.hero} ${
          isDarkMode ? styles.heroDark : styles.heroLight
        }`}
      >
        <div className={styles.heroContainer}>
          <div className={styles.heroSliderContainer}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === currentSlide ? styles.active : ""
                } ${styles[`slide${index + 1}`]}`}
                style={{ backgroundType: slide.backgroundType } as any}
              >
                <div className={styles.slideContent}>
                  <div className={styles.heroText}>
                    <h1
                      className={`${styles.heroTitle} ${
                        isDarkMode ? styles.textWhite : styles.textDark
                      }`}
                    >
                      {slide.title}
                      <span
                        className={`${styles.gradientText} ${styles.highlightText}`}
                      >
                        {slide.highlightText}
                      </span>
                    </h1>
                    <p
                      className={`${styles.heroSubtitle} ${
                        isDarkMode ? styles.textGrayLight : styles.textGray
                      }`}
                    >
                      {slide.subtitle}
                    </p>

                    {/* Hero Stats */}
                    {slide.stats && (
                      <div className={styles.heroStats}>
                        {slide.stats.map((stat, statIndex) => (
                          <div key={statIndex} className={styles.heroStat}>
                            <h3 className={styles.statValue}>{stat.value}</h3>
                            <p className={styles.statLabel}>{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={styles.heroButtons}>
                      <Link
                        to={slide.primaryLink}
                        className={`${styles.primaryButton} ${styles.enhancedButton}`}
                      >
                        {slide.primaryButton}{" "}
                        <ArrowRight className={styles.icon} />
                      </Link>
                      <Link
                        to={slide.secondaryLink}
                        className={`${styles.secondaryButton} ${
                          styles.glassMorphButton
                        } ${
                          isDarkMode
                            ? styles.secondaryButtonDark
                            : styles.secondaryButtonLight
                        }`}
                      >
                        {slide.secondaryButton}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Dynamic Background Elements */}
                <div className={styles.dynamicBackground}>
                  {slide.backgroundType === "neural" && (
                    <div className={styles.neuralNetwork}>
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`${styles.neuralNode} ${
                            styles[`node${(i % 5) + 1}`]
                          }`}
                        >
                          <div className={styles.nodeCore}></div>
                          {[...Array(3)].map((_, j) => (
                            <div
                              key={j}
                              className={`${styles.connection} ${
                                styles[`connection${j + 1}`]
                              }`}
                            ></div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.backgroundType === "particles" && (
                    <div className={styles.particleContainer}>
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className={`${styles.particle} ${
                            styles[`particle${(i % 6) + 1}`]
                          }`}
                        ></div>
                      ))}
                    </div>
                  )}

                  {slide.backgroundType === "geometric" && (
                    <div className={styles.geometricContainer}>
                      <div
                        className={`${styles.geometric} ${styles.hexagon1}`}
                      ></div>
                      <div
                        className={`${styles.geometric} ${styles.hexagon2}`}
                      ></div>
                      <div
                        className={`${styles.geometric} ${styles.triangle1}`}
                      ></div>
                      <div
                        className={`${styles.geometric} ${styles.triangle2}`}
                      ></div>
                      <div
                        className={`${styles.geometric} ${styles.circle1}`}
                      ></div>
                      <div
                        className={`${styles.geometric} ${styles.square1}`}
                      ></div>
                    </div>
                  )}

                  {slide.backgroundType === "waves" && (
                    <div className={styles.waveContainer}>
                      <svg className={styles.wave} viewBox="0 0 1200 300">
                        <path d="M0,100 C300,200 400,0 800,100 C1000,200 1100,50 1200,100 L1200,300 L0,300 Z" />
                      </svg>
                      <svg
                        className={`${styles.wave} ${styles.wave2}`}
                        viewBox="0 0 1200 300"
                      >
                        <path d="M0,150 C300,50 400,250 800,150 C1000,50 1100,200 1200,150 L1200,300 L0,300 Z" />
                      </svg>
                      <svg
                        className={`${styles.wave} ${styles.wave3}`}
                        viewBox="0 0 1200 300"
                      >
                        <path d="M0,200 C300,100 400,300 800,200 C1000,100 1100,250 1200,200 L1200,300 L0,300 Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Floating Elements */}
                <div className={styles.floatingElements}>
                  <div className={`${styles.floatingElement} ${styles.float1}`}>
                    <Code size={24} />
                  </div>
                  <div className={`${styles.floatingElement} ${styles.float2}`}>
                    <Globe size={20} />
                  </div>
                  <div className={`${styles.floatingElement} ${styles.float3}`}>
                    <Zap size={18} />
                  </div>
                  <div className={`${styles.floatingElement} ${styles.float4}`}>
                    <Shield size={22} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advanced Slider Navigation */}
          <div className={styles.sliderNavigation}>
            <button
              onClick={prevSlide}
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous slide"
            >
              ←
            </button>

            <div className={styles.sliderDots}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.dot} ${
                    index === currentSlide ? styles.activeDot : ""
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next slide"
            >
              →
            </button>
          </div>

          {/* Slider Progress */}
          <div className={styles.sliderProgress}>
            <div
              className={styles.progressBar}
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Scroll Indicator */}
          <div className={styles.scrollIndicator}>
            <ChevronDown className={styles.scrollIcon} />
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section
        id="services"
        data-animate
        className={`${styles.servicesSection} ${
          isDarkMode ? styles.servicesSectionDark : styles.servicesSectionLight
        } ${visibleSections.has("services") ? styles.animate : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Our Services</span>
            <h2
              className={`${styles.sectionTitle} ${
                isDarkMode ? styles.textWhite : styles.textDark
              }`}
            >
              Comprehensive Software Solutions for European Businesses
            </h2>
            <p
              className={`${styles.sectionSubtitle} ${
                isDarkMode ? styles.textGrayLight : styles.textGray
              }`}
            >
              From AI-powered applications to enterprise systems, we deliver
              cutting-edge technology solutions that drive growth and innovation
              across the European Union.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                className={`${styles.serviceCard} ${
                  isDarkMode ? styles.serviceCardDark : styles.serviceCardLight
                } ${styles[`delay${index + 1}`]}`}
              >
                <div
                  className={`${styles.serviceIconContainer} ${service.colorClass}`}
                >
                  {service.icon}
                </div>
                <h3
                  className={`${styles.serviceTitle} ${
                    isDarkMode ? styles.textWhite : styles.textDark
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`${styles.serviceDescription} ${
                    isDarkMode ? styles.textGrayLight : styles.textGray
                  }`}
                >
                  {service.description}
                </p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.featureItem}>
                      <CheckCircle className={styles.checkIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className={styles.serviceLink}>
                  Learn More <ArrowRight className={styles.linkIcon} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Achievements Section */}
      <section
        id="stats"
        data-animate
        className={`${styles.statsSection} ${
          isDarkMode ? styles.statsSectionDark : styles.statsSectionLight
        } ${visibleSections.has("stats") ? styles.animate : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {[
              {
                icon: <Users className={styles.statsIcon} />,
                number: "500+",
                label: "European Clients",
                suffix: "",
              },
              {
                icon: <Award className={styles.statsIcon} />,
                number: "1000+",
                label: "Projects Delivered",
                suffix: "",
              },
              {
                icon: <Star className={styles.statsIcon} />,
                number: "4.9",
                label: "Client Satisfaction",
                suffix: "/5",
              },
              {
                icon: <TrendingUp className={styles.statsIcon} />,
                number: "99.8%",
                label: "Uptime Guarantee",
                suffix: "",
              },
              {
                icon: <Globe className={styles.statsIcon} />,
                number: "27",
                label: "EU Countries Served",
                suffix: "",
              },
              {
                icon: <Shield className={styles.statsIcon} />,
                number: "100%",
                label: "GDPR Compliant",
                suffix: "",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${styles.statItem} ${
                  styles[`statDelay${index + 1}`]
                }`}
              >
                <div
                  className={`${styles.statIconContainer} ${
                    isDarkMode
                      ? styles.statIconContainerDark
                      : styles.statIconContainerLight
                  }`}
                >
                  {stat.icon}
                </div>
                <h3
                  className={`${styles.statNumber} ${
                    isDarkMode ? styles.textWhite : styles.textDark
                  }`}
                >
                  {stat.number}
                  {stat.suffix}
                </h3>
                <p
                  className={`${styles.statLabel} ${
                    isDarkMode ? styles.textGrayLight : styles.textGray
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section
        id="testimonials"
        data-animate
        className={`${styles.testimonialsSection} ${
          isDarkMode
            ? styles.testimonialsSectionDark
            : styles.testimonialsSectionLight
        } ${visibleSections.has("testimonials") ? styles.animate : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Testimonials</span>
            <h2
              className={`${styles.sectionTitle} ${
                isDarkMode ? styles.textWhite : styles.textDark
              }`}
            >
              What Our European Clients Say
            </h2>
            <p
              className={`${styles.sectionSubtitle} ${
                isDarkMode ? styles.textGrayLight : styles.textGray
              }`}
            >
              Trusted by leading companies across the European Union for
              innovative software solutions.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${styles.testimonialCard} ${
                  isDarkMode
                    ? styles.testimonialCardDark
                    : styles.testimonialCardLight
                } ${styles[`testimonialDelay${index + 1}`]}`}
              >
                <div className={styles.testimonialHeader}>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>{testimonial.avatar}</div>
                  </div>
                  <div className={styles.testimonialMeta}>
                    <h4
                      className={`${styles.testimonialName} ${
                        isDarkMode ? styles.textWhite : styles.textDark
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`${styles.testimonialPosition} ${
                        isDarkMode ? styles.textGrayLight : styles.textGray
                      }`}
                    >
                      {testimonial.position} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className={styles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={styles.ratingStar}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p
                  className={`${styles.testimonialContent} ${
                    isDarkMode ? styles.textGrayLight : styles.textGray
                  }`}
                >
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`${styles.ctaSection} ${
          isDarkMode ? styles.ctaSectionDark : styles.ctaSectionLight
        }`}
      >
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Business?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join 500+ European companies that trust us with their digital
              transformation. Let's build something extraordinary together.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaButton}>
                Start Your Project <ArrowRight className={styles.icon} />
              </Link>
              <Link to="/portfolio" className={styles.ctaSecondaryButton}>
                <Play className={styles.icon} />
                View Our Work
              </Link>
            </div>
            <div className={styles.ctaContact}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span>+49 (0) 30 1234 5678</span>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>hello@yourcompany.eu</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span>Berlin, Germany • EU</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
