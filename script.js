/**
 * Nexoria Solution - Main Script
 * Handles navigation, interactive sliders, FAQ accordions, and modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. Mobile Menu & Header Scroll Effect
  // --------------------------------------------------
  const header = document.getElementById('mainHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      const icon = mobileToggle.querySelector('i');
      if (isActive) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        document.body.style.overflow = 'hidden'; // Prevent background scroll when mobile menu open
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking normal nav links or mega menu items
    document.querySelectorAll('.nav-link:not(.dropdown-toggle), .mega-item, .mega-footer-btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Mobile dropdown toggle handling (Services accordion in mobile drawer)
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          e.stopPropagation();
          const parent = toggle.closest('.nav-item-dropdown');
          if (parent) {
            parent.classList.toggle('mobile-open');
          }
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // --------------------------------------------------
  // 2. Testimonial Carousel / Slider
  // --------------------------------------------------
  const testimonials = [
    {
      quote: "Nexoria Solution completely transformed our online presence. Our new website is stunning, and our organic traffic increased by 150% in just three months.",
      name: "David R.",
      role: "E-commerce Founder",
      avatarBg: "#2563eb"
    },
    {
      quote: "Working with Nexoria was an absolute pleasure. Their team turned our outdated website into a modern, user-friendly platform, the results speak for themselves.",
      name: "Sarah M.",
      role: "Retail Brand Owner",
      avatarBg: "#8b5cf6"
    },
    {
      quote: "From strategy to execution, Nexoria handled everything. Our lead generation doubled within the first quarter.",
      name: "Ahmed K.",
      role: "SaaS Startup Founder",
      avatarBg: "#06b6d4"
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteElem = document.getElementById('tQuote');
  const nameElem = document.getElementById('tName');
  const roleElem = document.getElementById('tRole');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  function updateTestimonial(index) {
    if (!quoteElem || !nameElem || !roleElem) return;

    // Fade out briefly
    const card = document.querySelector('.testimonial-slider-card');
    if (card) card.style.opacity = '0.4';

    setTimeout(() => {
      const t = testimonials[index];
      quoteElem.textContent = `"${t.quote}"`;
      nameElem.textContent = t.name;
      roleElem.textContent = t.role;
      if (card) card.style.opacity = '1';
    }, 200);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });

    // Auto rotate every 6 seconds
    setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    }, 6000);
  }

  // --------------------------------------------------
  // 3. Interactive FAQ Accordion
  // --------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other active items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --------------------------------------------------
  // 4. Modal System (Portfolio, Growth Audit, Services, Blog)
  // --------------------------------------------------
  const activeModalOverlay = document.getElementById('globalModalOverlay');
  const modalContainer = document.getElementById('globalModalContent');

  function openModal(htmlContent) {
    if (!activeModalOverlay || !modalContainer) return;
    modalContainer.innerHTML = htmlContent;
    activeModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Bind close button
    const closeBtns = modalContainer.querySelectorAll('.close-modal-trigger');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
  }

  function closeModal() {
    if (!activeModalOverlay) return;
    activeModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (activeModalOverlay) {
    activeModalOverlay.addEventListener('click', (e) => {
      if (e.target === activeModalOverlay) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------
  // 4A. Portfolio Modal (PDF Download & Case Studies)
  // --------------------------------------------------
  const portfolioTriggers = document.querySelectorAll('.open-portfolio-modal');
  portfolioTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolioHTML = `
        <div class="modal-box" style="max-width: 750px;">
          <button class="modal-close close-modal-trigger"><i class="fa-solid fa-xmark"></i></button>
          <div style="text-align: center; margin-bottom: 2rem;">
            <span class="eyebrow"><i class="fa-solid fa-folder-open"></i> Portfolio Showcase</span>
            <h2 style="font-size: 2rem; margin-top: 0.5rem;">Nexoria Growth Portfolio</h2>
            <p style="color: #64748b; font-size: 0.95rem;">Explore our recent digital transformations and download our full 2026 Agency Credentials PDF.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2rem;">
            <div style="background: #f8fafc; padding: 1.25rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <span style="background: rgba(37,99,235,0.1); color: #2563eb; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">E-COMMERCE</span>
              <h4 style="margin: 0.5rem 0 0.25rem; font-size: 1.1rem;">Aura Luxury Store</h4>
              <p style="font-size: 0.85rem; color: #475569;">Complete UI/UX & SEO overhaul resulting in 180% revenue increase.</p>
            </div>
            <div style="background: #f8fafc; padding: 1.25rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <span style="background: rgba(139,92,246,0.1); color: #8b5cf6; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">SALL / TECH</span>
              <h4 style="margin: 0.5rem 0 0.25rem; font-size: 1.1rem;">HyperScale Cloud</h4>
              <p style="font-size: 0.85rem; color: #475569;">Targeted PPC lead generation doubling demo signups in 60 days.</p>
            </div>
          </div>

          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 1.75rem; border-radius: 14px; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div>
              <h4 style="color: #fff; font-size: 1.1rem;">Download Agency Portfolio (PDF)</h4>
              <p style="color: #94a3b8; font-size: 0.88rem;">24-Page Detailed Case Studies & Rate Card</p>
            </div>
            <a href="#" id="downloadPdfBtn" class="btn btn-primary" style="padding: 0.75rem 1.4rem;">
              <i class="fa-solid fa-file-pdf"></i> Download PDF
            </a>
          </div>
        </div>
      `;
      openModal(portfolioHTML);

      // Handle PDF Download Simulation
      setTimeout(() => {
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        if (downloadPdfBtn) {
          downloadPdfBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            downloadPdfBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...`;
            setTimeout(() => {
              downloadPdfBtn.innerHTML = `<i class="fa-solid fa-check"></i> Downloaded!`;
              alert("Nexoria Solution Portfolio PDF successfully saved!");
            }, 1200);
          });
        }
      }, 100);
    });
  });

  // --------------------------------------------------
  // 4B. Free Growth Audit Modal Trigger
  // --------------------------------------------------
  const auditTriggers = document.querySelectorAll('.open-audit-modal');
  auditTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const auditHTML = `
        <div class="modal-box">
          <button class="modal-close close-modal-trigger"><i class="fa-solid fa-xmark"></i></button>
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <span class="eyebrow"><i class="fa-solid fa-chart-line"></i> Free Consultation</span>
            <h2 style="font-size: 1.8rem; margin-top: 0.5rem;">Get Your Free Growth Audit</h2>
            <p style="color: #64748b; font-size: 0.95rem;">Enter your business details and our experts will review your website and marketing strategy.</p>
          </div>

          <form id="auditForm">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" class="form-control" placeholder="John Doe" required />
            </div>
            <div class="form-group">
              <label>Work Email</label>
              <input type="email" class="form-control" placeholder="john@company.com" required />
            </div>
            <div class="form-group">
              <label>Website URL</label>
              <input type="url" class="form-control" placeholder="https://yourcompany.com" required />
            </div>
            <div class="form-group">
              <label>Primary Goal</label>
              <select class="form-control" style="background-color:#fff;">
                <option>Increase Organic Traffic & SEO</option>
                <option>Redesign Website & Improve Conversion</option>
                <option>Run High-ROI Paid Ads (PPC)</option>
                <option>Full Digital Branding overhaul</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.9rem;">
              Request Audit & Consultation <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
      `;
      openModal(auditHTML);

      setTimeout(() => {
        const form = document.getElementById('auditForm');
        if (form) {
          form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            openModal(`
              <div class="modal-box" style="text-align: center; padding: 3rem 2rem;">
                <button class="modal-close close-modal-trigger"><i class="fa-solid fa-xmark"></i></button>
                <div style="width: 70px; height: 70px; background: rgba(37,99,235,0.1); color: #2563eb; font-size: 2.2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
                <h2>Audit Request Received!</h2>
                <p style="color: #64748b; margin: 1rem 0 2rem;">Thank you! Our growth team is currently analyzing your site. We will email your custom growth report within 24 hours.</p>
                <button class="btn btn-primary close-modal-trigger">Done</button>
              </div>
            `);
          });
        }
      }, 100);
    });
  });

  // --------------------------------------------------
  // 4C. See All Services Modal (All 10 Services)
  // --------------------------------------------------
  const allServicesBtn = document.getElementById('seeAllServicesBtn');
  if (allServicesBtn) {
    allServicesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const allServicesHTML = `
        <div class="modal-box" style="max-width: 900px;">
          <button class="modal-close close-modal-trigger"><i class="fa-solid fa-xmark"></i></button>
          <div style="text-align: center; margin-bottom: 2rem;">
            <span class="eyebrow"><i class="fa-solid fa-cubes"></i> Comprehensive Capability</span>
            <h2 style="font-size: 2rem; margin-top: 0.5rem;">All 10 Growth Services</h2>
            <p style="color: #64748b;">Full-service digital agency solutions for startups and established brands.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;">
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #2563eb; margin-bottom: 0.3rem;"><i class="fa-solid fa-laptop-code"></i> 1. Web Development & Design</h4>
              <p style="font-size: 0.88rem; color: #475569;">Fast, clean, high-converting responsive sites built with modern code standards.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #2563eb; margin-bottom: 0.3rem;"><i class="fa-solid fa-bullhorn"></i> 2. Digital Marketing Services</h4>
              <p style="font-size: 0.88rem; color: #475569;">One dedicated team running and optimizing your entire digital growth engine.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #2563eb; margin-bottom: 0.3rem;"><i class="fa-solid fa-magnifying-glass-chart"></i> 3. SEO & Search Engine Optimization</h4>
              <p style="font-size: 0.88rem; color: #475569;">Be the answer high-intent customers find first on Google search.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #8b5cf6; margin-bottom: 0.3rem;"><i class="fa-solid fa-rectangle-ad"></i> 4. PPC & Ad Management</h4>
              <p style="font-size: 0.88rem; color: #475569;">Targeted Google, Meta & LinkedIn campaigns optimized for maximum ROI.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #8b5cf6; margin-bottom: 0.3rem;"><i class="fa-solid fa-share-nodes"></i> 5. Social Media Management</h4>
              <p style="font-size: 0.88rem; color: #475569;">Engaging content strategy and community management across platforms.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #8b5cf6; margin-bottom: 0.3rem;"><i class="fa-solid fa-pen-nib"></i> 6. Branding & Identity</h4>
              <p style="font-size: 0.88rem; color: #475569;">Memorable logos, brand guidelines, and visual positioning systems.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #2563eb; margin-bottom: 0.3rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> 7. UX/UI Design</h4>
              <p style="font-size: 0.88rem; color: #475569;">User-centric interface research, wireframing, and interactive prototyping.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #2563eb; margin-bottom: 0.3rem;"><i class="fa-solid fa-cart-shopping"></i> 8. E-commerce Development</h4>
              <p style="font-size: 0.88rem; color: #475569;">Scalable Shopify, WooCommerce & custom web storefronts.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #2563eb; margin-bottom: 0.3rem;"><i class="fa-solid fa-file-pen"></i> 9. Content Marketing</h4>
              <p style="font-size: 0.88rem; color: #475569;">High-impact blogs, whitepapers, and copy that convert readers into leads.</p>
            </div>
            <div style="padding: 1.25rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
              <h4 style="color: #8b5cf6; margin-bottom: 0.3rem;"><i class="fa-solid fa-chart-pie"></i> 10. Analytics & Growth Consulting</h4>
              <p style="font-size: 0.88rem; color: #475569;">Data attribution, conversion rate optimization (CRO) & executive reports.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary open-audit-modal">Schedule Free Consultation</button>
          </div>
        </div>
      `;
      openModal(allServicesHTML);
    });
  }

  // --------------------------------------------------
  // 4D. Blog Article Reader Modals
  // --------------------------------------------------
  const blogTriggers = document.querySelectorAll('.open-blog-modal');
  blogTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const title = trigger.dataset.title || "Latest Insights from Nexoria Solution";
      const blogHTML = `
        <div class="modal-box" style="max-width: 750px;">
          <button class="modal-close close-modal-trigger"><i class="fa-solid fa-xmark"></i></button>
          <span class="eyebrow"><i class="fa-solid fa-newspaper"></i> Insight & Article</span>
          <h2 style="font-size: 1.8rem; margin: 0.5rem 0 1rem; line-height: 1.3;">${title}</h2>
          <div style="font-size: 0.88rem; color: #64748b; margin-bottom: 1.5rem;">
            <span><i class="fa-regular fa-user"></i> Nexoria Growth Team</span> &bull; 
            <span><i class="fa-regular fa-calendar"></i> August 2026</span>
          </div>
          <div style="color: #334155; line-height: 1.8; font-size: 1rem;">
            <p style="margin-bottom: 1rem;">In today's hyper-competitive digital landscape, brands cannot rely on vanity metrics alone. Every digital asset—from landing pages to search campaigns—must be engineered for conversion and strategic clarity.</p>
            <p style="margin-bottom: 1rem;">At <strong>Nexoria Solution</strong>, we combine data-driven user experience research with cutting-edge front-end architecture to deliver measurable growth for our partners worldwide.</p>
          </div>
          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
            <button class="btn btn-outline-dark close-modal-trigger">Close Article</button>
            <button class="btn btn-primary open-audit-modal">Request Consultation</button>
          </div>
        </div>
      `;
      openModal(blogHTML);
    });
  });
});
