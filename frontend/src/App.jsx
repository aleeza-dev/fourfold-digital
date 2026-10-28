import { useState } from "react";
import { flushSync } from "react-dom";
import "./App.css";
import logo from "../public/logo.png";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const services = [
  {
    number: "01",
    icon: "⌘",
    title: "Web Development",
    description:
      "High-performance websites and digital experiences built around your business goals.",
    tags: ["React", "MERN Stack", "E-commerce"],
  },
  {
    number: "02",
    icon: "↗",
    title: "SEO & Digital Marketing",
    description:
      "Get discovered, reach the right audience and build a stronger online presence.",
    tags: ["SEO", "Content", "Social Media"],
  },
  {
    number: "03",
    icon: "✳",
    title: "Graphic Design",
    description:
      "Distinctive visuals and memorable brand identities that set your business apart.",
    tags: ["Branding", "Creative Design", "UI Design"],
  },
  {
    number: "04",
    icon: "◎",
    title: "Digital Strategy",
    description:
      "Turn business ambitions into a focused digital roadmap built for growth.",
    tags: ["Planning", "Consulting", "Growth"],
  },
];

const process = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your business, audience and goals.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "We plan the right approach for your project.",
  },
  {
    number: "03",
    title: "Create",
    description: "We design, develop and refine your solution.",
  },
  {
    number: "04",
    title: "Launch",
    description: "We deliver your project and plan what's next.",
  },
];

const internships = [
  {
    id: "web-development",
    title: "Web Development Intern",
    category: "Web Development",
    icon: "⌘",
    description:
      "Help build responsive websites and web applications while gaining hands-on development experience.",
    responsibilities: [
      "Build and improve responsive website interfaces.",
      "Work with React, JavaScript and APIs.",
      "Collaborate with the team to test and improve features.",
    ],
    skills: ["HTML/CSS", "JavaScript", "React basics"],
  },
  {
    id: "seo",
    title: "SEO Intern",
    category: "SEO & Digital Marketing",
    icon: "↗",
    description:
      "Learn how to improve website visibility through keyword research, on-page SEO and content optimization.",
    responsibilities: [
      "Conduct keyword and competitor research.",
      "Assist with on-page SEO and website audits.",
      "Prepare reports and content optimization suggestions.",
    ],
    skills: ["Keyword research", "SEO basics", "Research"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Intern",
    category: "SEO & Digital Marketing",
    icon: "◉",
    description:
      "Support digital campaigns, social media planning and content activities for agency projects.",
    responsibilities: [
      "Help prepare social media content calendars.",
      "Research audiences and campaign ideas.",
      "Track basic engagement and campaign performance.",
    ],
    skills: ["Social media", "Content writing", "Communication"],
  },
  {
    id: "graphic-design",
    title: "Graphic Design Intern",
    category: "Graphic Design",
    icon: "✳",
    description:
      "Create visual assets for digital campaigns, social media and brand identity projects.",
    responsibilities: [
      "Design social media posts and marketing creatives.",
      "Assist with brand identity and layout concepts.",
      "Prepare visual assets according to project briefs.",
    ],
    skills: ["Canva or design tools", "Typography", "Creativity"],
  },
  {
    id: "digital-strategy",
    title: "Digital Strategy Intern",
    category: "Digital Strategy",
    icon: "◎",
    description:
      "Support digital research and planning that helps businesses strengthen their online presence.",
    responsibilities: [
      "Research markets, audiences and competitors.",
      "Help prepare digital growth recommendations.",
      "Organize project ideas and planning documents.",
    ],
    skills: ["Research", "Problem-solving", "Communication"],
  },
  {
    id: "sales-development",
    title: "Sales Development Intern",
    category: "Sales & Outreach",
    icon: "↗",
    description:
      "Help identify potential clients and introduce Fourfold Digital's services to suitable businesses.",
    responsibilities: [
      "Research businesses that may need digital services.",
      "Organize potential client information.",
      "Support professional sales conversations and follow-ups.",
    ],
    skills: ["Communication", "Research", "Confidence"],
  },
  {
    id: "lead-generation",
    title: "Lead Generation Intern",
    category: "Sales & Outreach",
    icon: "⌕",
    description:
      "Build relevant prospect lists and learn how to identify businesses that match our ideal client profile.",
    responsibilities: [
      "Research companies and potential decision-makers.",
      "Collect and organize publicly available business details.",
      "Maintain accurate lead lists and research notes.",
    ],
    skills: ["Online research", "Organization", "Attention to detail"],
  },
  {
    id: "linkedin-outreach",
    title: "LinkedIn Outreach Intern",
    category: "Sales & Outreach",
    icon: "in",
    description:
      "Learn professional networking and thoughtful outreach to businesses that may benefit from our services.",
    responsibilities: [
      "Research relevant companies and professionals.",
      "Draft personalized LinkedIn outreach messages.",
      "Track conversations and follow-up tasks.",
    ],
    skills: ["LinkedIn", "Writing", "Professional communication"],
  },
  {
    id: "email-outreach",
    title: "Email Outreach Intern",
    category: "Sales & Outreach",
    icon: "✉",
    description:
      "Help create clear, personalized outreach emails and organize client communication workflows.",
    responsibilities: [
      "Research prospects before contacting them.",
      "Draft personalized business emails.",
      "Maintain outreach records and follow-up schedules.",
    ],
    skills: ["Email writing", "Research", "Communication"],
  },
  {
    id: "business-development",
    title: "Business Development Intern",
    category: "Sales & Outreach",
    icon: "◇",
    description:
      "Assist with business research, service proposals and activities that support agency growth.",
    responsibilities: [
      "Research potential partnerships and opportunities.",
      "Help prepare introductory proposals and presentations.",
      "Support client coordination and business research.",
    ],
    skills: ["Communication", "Business research", "Organization"],
  },
];

function BrandLogo({ onHome }) {
  return (
    <a
      className="brand"
      href="#home"
      aria-label="Fourfold Digital home"
      onClick={onHome}
    >
      <img
        className="brand-symbol"
        src={logo}
        alt="Fourfold Digital logo"
      />

      <span className="brand-name">
        FOURFOLD
        <small>DIGITAL STUDIO</small>
      </span>
    </a>
  );
}

function CareersPage({ onBack, onApply }) {
  return (
    <main className="careers-page">
      <div className="section-wrap">
        <button className="careers-back" onClick={onBack}>
          ← Back to Fourfold Digital
        </button>

        <header className="careers-page-hero">
          <span className="section-kicker">
            CAREERS / INTERNSHIP PROGRAM
          </span>

          <h1>
            Your next chapter.
            <br />
            <span>Your opportunity to grow.</span>
          </h1>

          <p>
            Build practical skills, contribute to meaningful digital work
            and learn alongside a team working across development, design,
            marketing and business growth.
          </p>

          <div className="careers-highlights">
            <span>✳ Remote opportunities</span>
            <span>✳ Practical experience</span>
            <span>✳ Completion certificate*</span>
          </div>
        </header>

        <section className="internship-benefits">
          <div>
            <span className="section-kicker">WHY FOURFOLD DIGITAL?</span>
            <h2>
              Learn by doing.
              <br />
              <span>Grow with purpose.</span>
            </h2>
          </div>

          <div className="benefits-grid">
            <article>
              <span>01</span>
              <h3>Practical experience</h3>
              <p>
                Develop skills through relevant assignments and
                supervised project work.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Portfolio development</h3>
              <p>
                Build experience and showcase eligible work in your
                professional portfolio.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Professional growth</h3>
              <p>
                Improve teamwork, communication, research and
                problem-solving skills.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Completion certificate</h3>
              <p>
                Eligible interns can receive a certificate after
                meeting the program's completion requirements.
              </p>
            </article>
          </div>
        </section>

        <section className="internship-list-section">
          <div className="internship-list-heading">
            <div>
              <span className="section-kicker">
                OPEN INTERNSHIP TRACKS
              </span>
              <h2>
                Find your <span>opportunity.</span>
              </h2>
            </div>

            <p>
              Choose the role that best matches your interests and
              current skills. Beginners may apply where the listed
              requirements match their experience.
            </p>
          </div>

          <div className="internship-grid">
            {internships.map((internship, index) => (
              <article className="internship-card" key={internship.id}>
                <div className="internship-card-top">
                  <span className="internship-icon">
                    {internship.icon}
                  </span>
                  <span className="internship-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <span className="internship-category">
                  {internship.category}
                </span>

                <h3>{internship.title}</h3>

                <p className="internship-description">
                  {internship.description}
                </p>

                <div className="internship-meta">
                  <span>Remote</span>
                  <span>Unpaid</span>
                </div>

                <div className="internship-skills">
                  {internship.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <details className="internship-details">
                  <summary>View responsibilities</summary>
                  <ul>
                    {internship.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>

                <button
                  className="internship-apply-button"
                  onClick={() => onApply(internship.title)}
                >
                  Apply Now <span>↗</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="unpaid-notice">
          <span className="unpaid-notice-icon">ⓘ</span>
          <div>
            <h3>Please read before applying</h3>
            <p>
              These internship opportunities are unpaid; no salary or
              stipend is offered. They are intended for learning and
              supervised experience. The duration, expected weekly
              commitment, supervision and completion criteria should be
              confirmed with selected applicants before the internship
              begins. Certificates are subject to successful completion
              of the agreed requirements. Please apply only if these
              terms suit you.
            </p>
          </div>
        </section>

        <div className="careers-page-footer">
          <p>Ready to take the next step?</p>
          <button
            className="button-primary"
            onClick={() => onApply("Web Development Intern")}
          >
            Start your application <span>↗</span>
          </button>
        </div>
      </div>
    </main>
  );
}

function ApplicationPage({ selectedRole, onBack }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    internship: selectedRole || "",
    linkedin: "",
    portfolio: "",
    motivation: "",
  });

  const [unpaidConsent, setUnpaidConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!unpaidConsent) {
      setMessage("Please acknowledge the unpaid internship terms.");
      setMessageType("error");
      return;
    }

    setSubmitting(true);

    try {
      const applicationResponse = await fetch(
        `${API_URL}/api/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            internship: selectedRole || form.internship,
            unpaidInternshipConsent: unpaidConsent,
          }),
        }
      );

      const applicationResult = await applicationResponse.json();

      if (!applicationResponse.ok || !applicationResult.success) {
        throw new Error(
          applicationResult.message ||
            "Application submission failed. Please try again."
        );
      }

      setMessage(
        "Your application has been submitted successfully!"
      );
      setMessageType("success");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        education: "",
        internship: selectedRole || "",
        linkedin: "",
        portfolio: "",
        motivation: "",
      });

      setUnpaidConsent(false);
      e.target.reset();
    } catch (error) {
      setMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="application-page">
      <button
        type="button"
        className="careers-back"
        onClick={onBack}
      >
        ← Back to Careers
      </button>

      <div className="application-layout">
        <div className="application-intro">
          <span className="section-kicker">
            CAREERS / APPLICATION
          </span>

          <h1>
            Your next chapter.
            <br />
            <span>Starts here.</span>
          </h1>

          <p>
            Tell us about yourself, share your interests, and
            take the next step towards gaining practical
            experience with Fourfold Digital.
          </p>

          <div className="application-role-summary">
            <small>Selected internship</small>
            <h3>{selectedRole || "Internship Application"}</h3>
            <p>Remote opportunity · Unpaid internship</p>
          </div>

          <p className="application-privacy">
            Please provide accurate information. Your details
            will be used to review your internship application.
            You can include your LinkedIn profile or portfolio
            to help us understand your experience.
          </p>
        </div>

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >
          <div className="application-form-heading">
            <h2>Application details</h2>
            <p>
              Complete the fields below. Fields marked with *
              are required.
            </p>
          </div>

          <div className="application-fields">
            <label>
              Full Name *
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                maxLength={100}
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email Address *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Phone Number *
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 3XX XXXXXXX"
                maxLength={30}
                autoComplete="tel"
                required
              />
            </label>

            <label>
              Education *
              <input
                type="text"
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="Your degree or current studies"
                maxLength={200}
                required
              />
            </label>

            <label className="application-full-width">
              Internship Role *
              <input
                type="text"
                name="internship"
                value={selectedRole || form.internship}
                onChange={handleChange}
                placeholder="Preferred internship role"
                maxLength={100}
                required
                readOnly={Boolean(selectedRole)}
              />
            </label>

            <label className="application-full-width">
              LinkedIn Profile
              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile"
              />
            </label>

            <label className="application-full-width">
              Portfolio / GitHub URL
              <input
                type="url"
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="https://your-portfolio.com"
              />
            </label>

            <label className="application-full-width">
              Why do you want to join us? *
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                placeholder="Tell us about your skills, interests, and goals..."
                rows={5}
                maxLength={3000}
                required
              />
            </label>
          </div>

          <label className="application-consent">
            <input
              type="checkbox"
              checked={unpaidConsent}
              onChange={(e) =>
                setUnpaidConsent(e.target.checked)
              }
              required
            />

            <span>
              I understand that this is an unpaid internship
              and that no salary or stipend is offered.
            </span>
          </label>

          {message && (
            <p
              className={`application-message ${
                messageType === "error"
                  ? "is-error"
                  : "is-success"
              }`}
              role={messageType === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="application-submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting Application..."
              : "Submit Application →"}
          </button>

          <p className="application-form-footnote">
            Please check your details before submitting your
            application.
          </p>
        </form>
      </div>
    </main>
  );
}

function NavigationDrawer({ menuOpen, closeMenu, openCareers }) {
  if (!menuOpen) return null;

  return (
    <>
      <button
        type="button"
        className="menu-overlay"
        aria-label="Close navigation menu"
        onClick={closeMenu}
      />

      <aside className="nav-drawer" aria-label="Main navigation">
        <div className="drawer-heading">
          <span>EXPLORE FOURFOLD</span>

          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            ×
          </button>
        </div>

        <a
          className="nav-cta drawer-moving-cta"
          style={{ viewTransitionName: "lets-talk-cta" }}
          href="#contact"
          onClick={closeMenu}
        >
          Let's talk <span>↗</span>
        </a>

        <a href="#home" onClick={closeMenu}>
          <span>01</span> Home
        </a>

        <a href="#services" onClick={closeMenu}>
          <span>02</span> Services
        </a>

        <a href="#about" onClick={closeMenu}>
          <span>03</span> About
        </a>

        <a href="#work" onClick={closeMenu}>
          <span>04</span> Our Process
        </a>

        <a
          href="#careers"
          onClick={(event) => {
            closeMenu();
            openCareers(event);
          }}
        >
          <span>05</span> Careers
        </a>

        <a href="#contact" onClick={closeMenu}>
          <span>06</span> Contact
        </a>
      </aside>
    </>
  );
}

function AddedGrowthSections() {
  const [openFaq, setOpenFaq] = useState(0);

  const strengths = [
    {
      number: "01",
      title: "One connected team",
      description:
        "Development, design and digital marketing work together instead of in separate silos.",
    },
    {
      number: "02",
      title: "Clear communication",
      description:
        "Agree on the scope, priorities and next steps before work begins, with updates as the project moves forward.",
    },
    {
      number: "03",
      title: "Built around your goals",
      description:
        "Every recommendation starts with your audience, business needs and the outcome you want to achieve.",
    },
  ];

  const projectTypes = [
    { number: "01", title: "Business websites", tags: "Responsive design · Clear messaging · Contact flows" },
    { number: "02", title: "E-commerce stores", tags: "Product pages · Shopping experience · Store setup" },
    { number: "03", title: "Web applications", tags: "React · APIs · Dashboards and workflows" },
    { number: "04", title: "Digital growth", tags: "SEO · Content strategy · Social media" },
  ];

  const stack = [
    "React", "JavaScript", "Node.js", "Express", "MongoDB", "REST APIs",
    "WordPress", "E-commerce", "SEO", "Content Strategy", "Social Media", "UI Design",
  ];

  const faqs = [
    {
      question: "What services does Fourfold Digital provide?",
      answer:
        "We bring web development, e-commerce, SEO and digital marketing, graphic design, and digital strategy together. We can discuss a single service or a wider project that combines several of them.",
    },
    {
      question: "Do you work with businesses outside Pakistan?",
      answer:
        "Yes. Fourfold Digital is based in Pakistan and can collaborate remotely with businesses in the UK and other locations. Project scope, communication and timelines are agreed before work begins.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "Pricing depends on the scope, features, integrations and timeline. Share your requirements through the contact section and we can discuss a suitable proposal before work starts.",
    },
    {
      question: "What happens after I contact you?",
      answer:
        "We review your brief, clarify your goals and requirements, and discuss the recommended approach, deliverables and timeline with you.",
    },
  ];

  return (
    <>
      <section className="added-growth-section added-why-section" id="why-fourfold">
        <div className="section-wrap">
          <div className="added-section-heading">
            <span className="section-kicker">06 / WHY FOURFOLD</span>
            <h2>Good work starts with <span>a clear plan.</span></h2>
            <p>Thoughtful collaboration, practical decisions and digital work shaped around your business.</p>
          </div>
          <div className="added-strength-grid">
            {strengths.map((item) => (
              <article className="added-strength-card" key={item.number}>
                <span className="added-card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="added-growth-section added-work-section" id="project-types">
        <div className="section-wrap">
          <div className="added-section-heading added-heading-row">
            <div>
              <span className="section-kicker">07 / WHAT WE CAN BUILD</span>
              <h2>Different needs. <span>One team.</span></h2>
            </div>
            <p>Explore the kinds of projects we can plan and deliver together.</p>
          </div>
          <div className="added-project-grid">
            {projectTypes.map((project) => (
              <article className="added-project-card" key={project.number}>
                <div className="added-project-top"><span>{project.number}</span><span>↗</span></div>
                <h3>{project.title}</h3>
                <p>{project.tags}</p>
                <a href="#contact">Discuss a project <span>↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="added-growth-section added-stack-section" id="technology">
        <div className="section-wrap">
          <div className="added-section-heading">
            <span className="section-kicker">08 / TOOLS & EXPERTISE</span>
            <h2>The right tools for <span>the right job.</span></h2>
            <p>Our working toolkit spans modern web development and digital growth.</p>
          </div>
          <div className="added-stack-list">
            {stack.map((item) => <span key={item}>{item}<b>✧</b></span>)}
          </div>
        </div>
      </section>

      <section className="added-growth-section added-faq-section" id="faq">
        <div className="section-wrap added-faq-layout">
          <div className="added-section-heading">
            <span className="section-kicker">09 / FAQ</span>
            <h2>Before we <span>get started.</span></h2>
            <a className="added-faq-cta" href="#contact">Still have a question? Contact us ↗</a>
          </div>
          <div className="added-faq-list">
            {faqs.map((faq, index) => (
              <article className={`added-faq-item ${openFaq === index ? "is-open" : ""}`} key={faq.question}>
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span>{faq.question}</span><span className="added-faq-icon">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index && <p>{faq.answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedRole, setSelectedRole] = useState(
    "Web Development Intern"
  );
  const [menuOpen, setMenuOpen] = useState(false);
const [projectForm, setProjectForm] = useState({
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  details: "",
});

const [projectSending, setProjectSending] = useState(false);
const [projectStatus, setProjectStatus] = useState("");
const [projectError, setProjectError] = useState("");
const [showProjectForm, setShowProjectForm] = useState(false);


const handleProjectField = (e) => {
  const { name, value } = e.target;

  setProjectForm((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const handleProjectSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (projectSending) return;

  setProjectSending(true);
  setProjectStatus("");
  setProjectError("");

  try {
   

    const response = await fetch(
  `${API_URL}/api/project-inquiries`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectForm),
    signal: AbortSignal.timeout(25000),
  }
);

const result = await response.json();

if (!response.ok || result.success !== true) {
  throw new Error(
    result.message || "Your inquiry could not be confirmed."
  );
}

    setProjectForm({
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      details: "",
    });

    setShowProjectForm(false);
    setProjectStatus("success");
  } catch (error) {
    console.error("Inquiry submission failed:", error);
    setProjectError(
      error.message ||
        "Network error. Please check your internet connection and try again."
    );
    setProjectStatus("error");
  } finally {
    setProjectSending(false);
  }
};


  const goTo = (nextPage) => {
    setMenuOpen(false);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCareers = (event) => {
    event?.preventDefault();
    goTo("careers");
  };

  const openApplication = (role) => {
    setSelectedRole(role);
    goTo("apply");
  };

  const goHome = (event) => {
    event?.preventDefault();
    goTo("home");
  };

  const updateMenuWithTransition = (nextOpen) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => setMenuOpen(nextOpen));
      });
    } else {
      setMenuOpen(nextOpen);
    }
  };

  const closeMenu = () => {
    updateMenuWithTransition(false);
  };

  const toggleMenu = () => {
    updateMenuWithTransition(!menuOpen);
  };

  const sharedNavbar = (buttonLabel, buttonAction) => (
    <>
      <nav className="navbar">
        <BrandLogo onHome={goHome} />

        <div className="nav-actions">
          {buttonAction === "contact" ? (
            !menuOpen && (
              <a
                className="nav-cta"
                style={{ viewTransitionName: "lets-talk-cta" }}
                href="#contact"
              >
                {buttonLabel} <span>↗</span>
              </a>
            )
          ) : (
            <button
              type="button"
              className="nav-cta"
              onClick={buttonAction}
            >
              {buttonLabel} <span>↗</span>
            </button>
          )}


          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? "×" : "☰"}
          </button>

         
        </div>
      </nav>

      <NavigationDrawer
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        openCareers={openCareers}
      />
    </>
  );

  if (page === "careers") {
    return (
      <div className="website">
        {sharedNavbar("Agency home", goHome)}

        <CareersPage
          onBack={goHome}
          onApply={openApplication}
        />

        <footer className="footer section-wrap">
          <BrandLogo onHome={goHome} />
          <p>Good ideas deserve great execution.</p>

          <div className="footer-right">
            <button className="footer-back-button" onClick={goHome}>
              AGENCY HOME ↑
            </button>
            <span>© {new Date().getFullYear()} FOURFOLD DIGITAL</span>
          </div>
        </footer>
      </div>
    );
  }

  if (page === "apply") {
    return (
      <div className="website">
        {sharedNavbar("All internships", () => goTo("careers"))}

        <ApplicationPage
          key={selectedRole}
          selectedRole={selectedRole}
          onBack={() => goTo("careers")}
        />

        <footer className="footer section-wrap">
          <BrandLogo onHome={goHome} />
          <p>Good ideas deserve great execution.</p>

          <div className="footer-right">
            <span>© {new Date().getFullYear()} FOURFOLD DIGITAL</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="website">
      {sharedNavbar("Let's talk", "contact")}

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-content">
            <h1>
              We turn ideas
              <br />
              into <span>impact.</span>
            </h1>

            <p className="hero-description">
              Development, design and digital marketing — brought together
              to help ambitious businesses stand out and grow.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#contact">
                Start a project <span>↗</span>
              </a>

              <a className="button-text" href="#services">
                Discover what we do <span>↓</span>
              </a>
            </div>

            <div className="hero-bottom">
              <div className="hero-mini-logo">
                <BrandLogo onHome={goHome} />
              </div>

              <div>
                <strong>Built on collaboration.</strong>
                <p>Driven by ideas. Focused on results.</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-stage">
              <div className="stage-grid" />
              <div className="stage-ring ring-one" />
              <div className="stage-ring ring-two" />
              <div className="stage-ring ring-three" />
              <div className="stage-cross cross-one" />
              <div className="stage-cross cross-two" />

              <img
                className="stage-logo"
                src={logo}
                alt="Fourfold Digital logo"
              />
            </div>

            <div className="floating-note note-one">
              <span className="note-icon">✳</span>
              <div>
                <strong>Think creatively.</strong>
                <p>Challenge the ordinary.</p>
              </div>
            </div>

            <div className="floating-note note-two">
              <span className="note-icon">↗</span>
              <div>
                <strong>Build intentionally.</strong>
                <p>Make every detail count.</p>
              </div>
            </div>
          </div>

          <div className="hero-scroll">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-line" />
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-wrap">
            <div className="section-heading">
              <div>
                <span className="section-kicker">01 / WHAT WE DO</span>
                <h2>
                  Everything digital.
                  <br />
                  <span>One connected team.</span>
                </h2>
              </div>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-top">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-number">{service.number}</span>
                  </div>

                  <h3>{service.title}</h3>

                  <p className="service-description">
                    {service.description}
                  </p>

                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <a className="service-link" href="#contact">
                    Explore service <span>↗</span>
                  </a>
                </article>
              ))}
            </div>

            <div className="services-footer">
              <span>NOT JUST DIGITAL WORK. DIGITAL WORK THAT WORKS.</span>
              <span className="purple-text">
                FOUR DISCIPLINES. ONE VISION. ⊹ 
              </span>
            </div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
         

          <div className="about-content">
            <span className="section-kicker">02 / WHO WE ARE</span>

            <h2>
              Four people.
              <br />
              <span>One bigger vision.</span>
            </h2>

            <p>
              Fourfold Digital brings together development, design and
              marketing to help businesses make a stronger impression
              online. We believe good digital work should look great,
              work smoothly and serve a real purpose.
            </p>

            <div className="values-list">
              <div>
                <span>01</span>
                <strong>Think beyond the obvious</strong>
                <span className="value-arrow">↗</span>
              </div>

              <div>
                <span>02</span>
                <strong>Make creativity count</strong>
                <span className="value-arrow">↗</span>
              </div>

              <div>
                <span>03</span>
                <strong>Build for real goals</strong>
                <span className="value-arrow">↗</span>
              </div>
            </div>

            <a className="button-primary" href="#contact">
              Let's work together <span>↗</span>
            </a>
          </div>
        </section>

        <section className="process-section" id="work">
          <div className="section-wrap">
            <div className="section-heading process-heading">
              <div>
                <span className="section-kicker">03 / OUR APPROACH</span>
                <h2>
                  Clear thinking.
                  <br />
                  <span>Considered execution.</span>
                </h2>
              </div>

              <p>
                From the first conversation to launch day, every step has
                a purpose and every decision moves the project forward.
              </p>
            </div>

            <div className="process-grid">
              {process.map((step) => (
                <article className="process-card" key={step.number}>
                  <div className="process-card-top">
                    <span>{step.number}</span>
                    <span>↗</span>
                  </div>

                  <div className="process-rule" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="careers-section" id="careers">
          <div className="section-wrap">
            <div className="careers-header">
              <div>
                <span className="section-kicker">
                  04 / CAREER OPPORTUNITIES
                </span>

                <h2>
                  Do great work.
                  <br />
                  <span>Grow with us.</span>
                </h2>
              </div>

              <p>
                We're building a team of creative thinkers, problem-solvers
                and digital talent. Explore our internship opportunities
                and take the next step in your professional journey.
              </p>
            </div>

            <div className="careers-banner">
              <div className="careers-banner-icon">⟢</div>

              <div className="careers-banner-copy">
                <span>YOUR NEXT CHAPTER STARTS HERE</span>
                <h3>Let's build something meaningful together.</h3>

                <p>
                  Explore ten internship tracks across digital services
                  and sales outreach. Learn new skills and gain practical
                  experience with Fourfold Digital.
                </p>
              </div>

              <button
                className="careers-button"
                onClick={() => goTo("careers")}
              >
                Explore opportunities <span>↗</span>
              </button>
            </div>

            <div className="careers-note">
              <span className="live-dot" />
              <p>
                Internship positions are unpaid. Review the terms,
                responsibilities and requirements before applying.
              </p>
            </div>
          </div>
        </section>

        <AddedGrowthSections />

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <span className="section-kicker">05 / YOUR NEXT MOVE</span>

              <h2>
                Have a big idea?
                <br />
                <span>Let's make it real.</span>
              </h2>

              <p>
                Tell us what you're building, what you want to improve
                or where you want your business to go next.
              </p>

             
<button
  type="button"
  className="contact-button"
  onClick={() => setShowProjectForm((previous) => !previous)}
>
  {showProjectForm ? "Close form" : "Start a conversation"}
  <span>{showProjectForm ? "−" : "↗"}</span>
</button>

{showProjectForm && (
  <form
    className="project-inquiry-form"
    onSubmit={handleProjectSubmit}
  >
    <label>
      Your Name *
      <input
        type="text"
        name="name"
        value={projectForm.name}
        onChange={handleProjectField}
        placeholder="Enter your name"
        required
        maxLength={100}
      />
    </label>

    <label>
      Email Address *
      <input
        type="email"
        name="email"
        value={projectForm.email}
        onChange={handleProjectField}
        placeholder="you@example.com"
        required
        maxLength={254}
      />
    </label>

    <label>
      Company Name
      <input
        type="text"
        name="company"
        value={projectForm.company}
        onChange={handleProjectField}
        placeholder="Your company (optional)"
        maxLength={140}
      />
    </label>

    <label>
      Service Required *
      <select
        name="service"
        value={projectForm.service}
        onChange={handleProjectField}
        required
      >
        <option value="">Select a service</option>
        <option value="Web Development">Web Development</option>
        <option value="E-commerce">E-commerce</option>
        <option value="SEO & Digital Marketing">
          SEO & Digital Marketing
        </option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Digital Strategy">Digital Strategy</option>
        <option value="Other">Other</option>
      </select>
    </label>

    <label>
      Estimated Budget
      <select
        name="budget"
        value={projectForm.budget}
        onChange={handleProjectField}
      >
        <option value="">Select budget (optional)</option>
        <option value="Under $200">Under $200</option>
        <option value="$200-$500">$200–$500</option>
        <option value="$500-$1000">$500–$1,000</option>
        <option value="$1000+">$1,000+</option>
        <option value="To be discussed">To be discussed</option>
      </select>
    </label>

    <label>
      Project Details *
      <textarea
        name="details"
        value={projectForm.details}
        onChange={handleProjectField}
        placeholder="Tell us about your project..."
        rows={5}
        minLength={10}
        maxLength={3000}
        required
      />
    </label>

    <button
      type="submit"
      className="contact-button"
      disabled={projectSending}
    >
      {projectSending ? "Submitting..." : "Submit Inquiry"}
      <span>↗</span>
    </button>


   
  </form>
  
)}
{projectStatus === "success" && (
  <p className="project-success-message" role="status">
    Thank you! Your inquiry has been submitted successfully.
    We'll get back to you soon.
  </p>
)}

{projectStatus === "error" && (
  <p className="project-error-message" role="alert">
    {projectError || "Your inquiry could not be sent. Please try again."}
  </p>
)}


            </div>

             <div className="about-art">
            <span className="about-index"> THE STUDIO</span>

            <div className="about-symbol-wrap">
              <img
                className="about-symbol"
                src={logo}
                alt="Fourfold Digital logo"
              />
            </div>

            <span className="about-word">FOURFOLD®</span>

            <div className="about-art-footer">
              <span>FOUR PERSPECTIVES.</span>
              <span>ONE DIRECTION. ↗</span>
            </div>
          </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <BrandLogo onHome={goHome} />

        <p>Good ideas deserve great execution.</p>

        <div className="footer-right">
          <a href="#home">BACK TO TOP ↑</a>
          <span>© {new Date().getFullYear()} FOURFOLD DIGITAL</span>
        </div>
      </footer>
    </div>
  );
}

export default App;