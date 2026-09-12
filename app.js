/**
 * Kunal Kumar - Tactile Desk Portfolio Engine
 * Real-time IST clock, tactile 3D card tilt, interactive checklist, and smooth dock tracking
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveISTClock();
  initInteractiveChecklist();
  initPolaroidTilt();
  initDockNavigation();
  initStickyNotes();
  initJourneyPlayCard();
  initChalkboardChecklist();
  initProjectLiveButtons();
  initContactInteractions();
});

/* ==========================================================================
   1. LIVE INDIA STANDARD TIME (IST) CLOCK
   ========================================================================== */
function initLiveISTClock() {
  const clockElement = document.getElementById('live-ist-clock');
  if (!clockElement) return;

  function updateClock() {
    // Current time in IST (UTC+5:30)
    const options = {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    const formatter = new Intl.DateTimeFormat('en-IN', options);
    const parts = formatter.formatToParts(new Date());

    const partObj = {};
    parts.forEach(p => partObj[p.type] = p.value);

    // E.g. "SAT, 12 SEP 2026 | 07:05:22 AM"
    const dateStr = `${partObj.weekday.toUpperCase()}, ${partObj.day} ${partObj.month.toUpperCase()} ${partObj.year}`;
    const timeStr = `${partObj.hour}:${partObj.minute}:${partObj.second} ${partObj.dayPeriod.toUpperCase()}`;

    clockElement.innerHTML = `<span>${dateStr}</span><br><span style="color: var(--ink-primary); font-weight: 600;">${timeStr}</span>`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   2. INTERACTIVE TO-DO CHECKLIST (Permanently Checked)
   ========================================================================== */
function initInteractiveChecklist() {
  const todoItems = document.querySelectorAll('.todo-item');

  todoItems.forEach(item => {
    // Ensure all items are permanently checked
    item.classList.add('checked');

    item.addEventListener('click', () => {
      // Keep permanently checked
      item.classList.add('checked');

      // Subtle haptic-like micro-scale animation
      item.style.transform = 'scale(0.97)';
      setTimeout(() => {
        item.style.transform = '';
      }, 120);
    });
  });
}

/* ==========================================================================
   3. POLAROID 3D TACTILE TILT
   ========================================================================== */
function initPolaroidTilt() {
  const polaroid = document.querySelector('.polaroid-card');
  if (!polaroid) return;

  polaroid.addEventListener('mousemove', (e) => {
    const rect = polaroid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    polaroid.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  polaroid.addEventListener('mouseleave', () => {
    polaroid.style.transform = 'rotate(-1.5deg)';
  });
}

/* ==========================================================================
   4. DOCK NAVIGATION TRACKING (IntersectionObserver)
   ========================================================================== */
function initDockNavigation() {
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scroll
  dockItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        dockItems.forEach(d => d.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Highlight active section on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dockItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            dockItems.forEach(d => d.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   5. INTERACTIVE STICKY NOTES
   ========================================================================== */
function initStickyNotes() {
  const stickyNote = document.getElementById('desk-sticky-note');
  if (!stickyNote) return;

  const notesList = [
    "Good Ideas Take Time. 🙂",
    "Progress over Perfection.",
    "First solve the problem, then write the code.",
    "Curiosity is the best debugger.",
    "Building things people actually use."
  ];

  let noteIdx = 0;
  stickyNote.style.cursor = 'pointer';
  stickyNote.title = "Click to flip sticky note idea!";

  stickyNote.addEventListener('click', () => {
    noteIdx = (noteIdx + 1) % notesList.length;
    const textEl = stickyNote.querySelector('.sticky-note-text');
    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = notesList[noteIdx];
        textEl.style.opacity = '1';
      }, 150);
    }
  });
}

/* ==========================================================================
   6. INTERACTIVE EDUCATION & WORK PLAYING CARD DECK
   ========================================================================== */
function initJourneyPlayCard() {
  const journeyData = [
    {
      suit: '♠',
      number: '01',
      badge: 'HIGHER EDUCATION',
      status: 'IN PROGRESS',
      title: 'Lovely Professional University',
      role: 'Bachelor of Technology in Computer Science & Engineering',
      location: '📍 Phagwara, Punjab • 2025 — 2029',
      focus: 'Core Software Engineering, Data Structures & Algorithms, Object-Oriented Systems, Database Architecture, and System Foundations.',
      bullets: [
        'Building strong foundational mastery across C, C++, and Python programming.',
        'Active algorithmic problem solving and DSA consistency on LeetCode.',
        'Developing modern responsive web architectures and normalized relational databases.'
      ],
      quote: '"Engineering the mathematical and computational bedrock for resilient systems."',
      category: 'education'
    },
    {
      suit: '♦',
      number: '02',
      badge: 'APPLIED TRAINING',
      status: 'VERIFIED',
      title: 'Anthropic • Claude Code in Action',
      role: 'Agentic Workflows & AI Fluency for Students',
      location: '📍 Anthropic Official Training • 2026',
      focus: 'Frontier developer tooling, agentic execution loops, prompt constraint architectures, and human-in-the-loop pair programming.',
      bullets: [
        'Mastered Claude Code terminal and agentic software workflows.',
        'Studied model reasoning boundaries and effective task decomposition.',
        'Applied practical AI workflows to accelerate real-world engineering projects.'
      ],
      quote: '"Using machine intelligence as an intellectual force multiplier."',
      category: 'experience'
    },
    {
      suit: '♣',
      number: '03',
      badge: 'INTERMEDIATE (BSEB)',
      status: 'COMPLETED',
      title: 'JP Plus Two High School',
      role: 'Class XII — Science / PCM Stream',
      location: '📍 Muzaffarpur, Bihar • Completed 2024',
      focus: 'Higher secondary coursework in Physics, Chemistry, and Advanced Mathematics.',
      bullets: [
        'Rigorous training in analytical mathematics and classical mechanics.',
        'Cultivated logical problem solving and systematic proof derivations.',
        'Formed the foundational STEM background for Computer Science engineering.'
      ],
      quote: '"Where mathematical curiosity met structured scientific logic."',
      category: 'education'
    },
    {
      suit: '♥',
      number: '04',
      badge: 'MATRICULATION (CBSE)',
      status: 'COMPLETED',
      title: 'RPS Public School',
      role: 'Secondary Education (Class X)',
      location: '📍 Muzaffarpur, Bihar • Completed 2022',
      focus: 'Comprehensive secondary schooling covering Mathematics, General Sciences, and English.',
      bullets: [
        'Consistently high academic discipline and STEM problem solving.',
        'Early exposure to computer basics, algorithms, and computational thinking.',
        'Active participation in school science exhibitions and team projects.'
      ],
      quote: '"The initial spark for technology and computing."',
      category: 'education'
    },
    {
      suit: '♦',
      number: '05',
      badge: 'FOUNDATIONAL TRAINING',
      status: 'VERIFIED',
      title: 'Infosys Springboard',
      role: 'Introduction to Artificial Intelligence',
      location: '📍 Infosys Springboard Portal • 2026',
      focus: 'Machine Learning paradigms, search algorithms, neural network fundamentals, and AI ethics.',
      bullets: [
        'Studied foundational concepts of supervised, unsupervised, and heuristic learning.',
        'Explored computer vision, natural language processing, and automated reasoning.',
        'Understood ethical considerations in automated decision-making systems.'
      ],
      quote: '"From theoretical heuristics to practical learning models."',
      category: 'experience'
    },
    {
      suit: '♠',
      number: '06',
      badge: 'INDEPENDENT BUILDER',
      status: 'ACTIVE',
      title: 'Algorithmic Problem Practice',
      role: 'LeetCode & GitHub Builder',
      location: '📍 LeetCode @kunalkr1773 & GitHub @Kunalkumar93',
      focus: 'Dynamic programming, tree traversals, graph algorithms, and relational database queries.',
      bullets: [
        'Consistent daily problem-solving on LeetCode strengthening core DSA intuition.',
        'Publishing clean, documented code solutions with time/space complexity analysis.',
        'Architecting normalized relational schemas (MySQL/SQLite) with ACID guarantees.'
      ],
      quote: '"Consistency is the only metric that compounds over time."',
      category: 'experience'
    }
  ];

  let currentCardIndex = 0;
  let currentFilter = 'education';
  const eventItems = document.querySelectorAll('.journey-event-item');
  const playcardBody = document.querySelector('.playcard-body');

  const suitTl = document.getElementById('card-suit-symbol-tl');
  const suitBr = document.getElementById('card-suit-symbol-br');
  const numTl = document.getElementById('card-suit-number-tl');
  const numBr = document.getElementById('card-suit-number-br');

  const typeTag = document.getElementById('playcard-type-tag');
  const statusPill = document.getElementById('playcard-status-pill');
  const titleEl = document.getElementById('playcard-title');
  const roleEl = document.getElementById('playcard-role');
  const locEl = document.getElementById('playcard-location');
  const focusEl = document.getElementById('playcard-focus-text');
  const bulletsEl = document.getElementById('playcard-bullets');
  const quoteEl = document.getElementById('playcard-quote-text');
  const counterEl = document.getElementById('deck-counter');

  const btnPrev = document.getElementById('btn-prev-card');
  const btnNext = document.getElementById('btn-next-card');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');

  function getVisibleIndices() {
    const visible = [];
    eventItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const idx = parseInt(item.getAttribute('data-index'), 10);
      if (currentFilter === 'all' || currentFilter === cat) {
        visible.push(idx);
      }
    });
    return visible;
  }

  function renderPlaycard(index) {
    if (index < 0 || index >= journeyData.length) return;
    currentCardIndex = index;
    const data = journeyData[index];

    const visibleIndices = getVisibleIndices();
    const currentPosition = visibleIndices.indexOf(index) + 1;
    const totalVisible = visibleIndices.length || journeyData.length;

    // Card fade effect
    if (playcardBody) {
      playcardBody.style.opacity = '0';
      playcardBody.style.transform = 'translateY(6px)';
    }

    setTimeout(() => {
      if (suitTl) suitTl.textContent = data.suit;
      if (suitBr) suitBr.textContent = data.suit;
      if (numTl) numTl.textContent = data.number;
      if (numBr) numBr.textContent = data.number;

      if (typeTag) typeTag.textContent = data.badge;
      if (statusPill) statusPill.textContent = data.status;
      if (titleEl) titleEl.textContent = data.title;
      if (roleEl) roleEl.textContent = data.role;
      if (locEl) locEl.textContent = data.location;
      if (focusEl) focusEl.textContent = data.focus;

      if (bulletsEl) {
        bulletsEl.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
      }

      if (quoteEl) quoteEl.textContent = data.quote;
      if (counterEl) {
        counterEl.textContent = `CARD ${currentPosition > 0 ? currentPosition : 1} OF ${totalVisible}`;
      }

      // Update active state on left list
      eventItems.forEach(item => {
        const itemIdx = parseInt(item.getAttribute('data-index'), 10);
        if (itemIdx === index) {
          item.classList.add('active');
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          item.classList.remove('active');
        }
      });

      if (playcardBody) {
        playcardBody.style.opacity = '1';
        playcardBody.style.transform = 'translateY(0)';
      }
    }, 120);
  }

  function applyFilter(filterName) {
    currentFilter = filterName;
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === filterName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    let firstVisibleIdx = null;
    eventItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const idx = parseInt(item.getAttribute('data-index'), 10);

      if (currentFilter === 'all' || currentFilter === cat) {
        item.style.display = 'block';
        if (firstVisibleIdx === null) firstVisibleIdx = idx;
      } else {
        item.style.display = 'none';
      }
    });

    const visibleIndices = getVisibleIndices();
    if (!visibleIndices.includes(currentCardIndex) && firstVisibleIdx !== null) {
      renderPlaycard(firstVisibleIdx);
    } else {
      renderPlaycard(currentCardIndex);
    }
  }

  // Bind click on left list items
  eventItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      renderPlaycard(idx);
    });
  });

  // Prev / Next controls (cycling through visible cards)
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const visible = getVisibleIndices();
      if (!visible.length) return;
      const currentPos = visible.indexOf(currentCardIndex);
      const nextPos = (currentPos - 1 + visible.length) % visible.length;
      renderPlaycard(visible[nextPos]);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const visible = getVisibleIndices();
      if (!visible.length) return;
      const currentPos = visible.indexOf(currentCardIndex);
      const nextPos = (currentPos + 1) % visible.length;
      renderPlaycard(visible[nextPos]);
    });
  }

  // Filter tabs click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  // Initial load: Default selected on 'education'
  applyFilter('education');
}

/* ==========================================================================
   7. CHALKBOARD "LEARNING NEXT" CHECKLIST INTERACTION
   ========================================================================== */
function initChalkboardChecklist() {
  const items = document.querySelectorAll('.chalk-check-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const box = item.querySelector('.chalk-checkbox');
      if (box) {
        box.textContent = item.classList.contains('checked') ? '☑' : '☐';
      }
    });
  });
}

/* ==========================================================================
   8. PROJECT "VIEW LIVE" BLANK BUTTON HANDLER & SUBTLE TOAST
   ========================================================================== */
function initProjectLiveButtons() {
  const liveBtns = document.querySelectorAll('.btn-view-live');
  liveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Live preview coming soon — check out the repository source code!');
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('craft-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'craft-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: #18181B;
      color: #F4F4F6;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 10px 18px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.15);
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      z-index: 9999;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.25s ease;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
  }, 2800);
}

/* ==========================================================================
   9. CONTACT INTERACTIONS (Copy to Clipboard & Quick Message Mailto)
   ========================================================================== */
function initContactInteractions() {
  // Copy to clipboard buttons on contact cards
  const copyBtns = document.querySelectorAll('.btn-copy-icon');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.contact-tile-card');
      const copyVal = card ? card.getAttribute('data-copy') : '';
      if (!copyVal) return;

      copyTextToClipboard(copyVal, 'Copied to clipboard: ' + copyVal);

      // Micro visual bounce
      btn.style.transform = 'scale(1.35)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });

  // Also support clicking card directly if it's not an <a> tag
  const nonLinkCards = document.querySelectorAll('.contact-tile-card:not(a)');
  nonLinkCards.forEach(card => {
    card.addEventListener('click', () => {
      const copyVal = card.getAttribute('data-copy');
      if (copyVal) {
        copyTextToClipboard(copyVal, 'Copied to clipboard: ' + copyVal);
      }
    });
  });

  // Contact quick message form submission (Formspree AJAX Integration)
  const contactForm = document.getElementById('contact-message-form');
  const submitBtn = document.getElementById('contact-submit-btn') || (contactForm ? contactForm.querySelector('button[type="submit"]') : null);

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-msg');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = msgInput ? msgInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill out all fields before sending.');
        return;
      }

      // Indicate loading state on button
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = `<span>Sending...</span> <span class="btn-send-arrow">⏳</span>`;
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formspree.io/f/xwlkjnjo', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showToast(`✨ Thank you, ${name}! Your message has been sent to Kunal.`);
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          if (data && data.errors && data.errors.length > 0) {
            const errMsgs = data.errors.map(err => err.message).join(', ');
            showToast(`Submission error: ${errMsgs}`);
          } else {
            showToast('Oops! There was a problem sending your message. Please try again or email directly.');
          }
        }
      } catch (error) {
        showToast('Network error while sending. Please check your connection or email directly.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.style.cursor = '';
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
}

function copyTextToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopyText(text, successMsg);
    });
  } else {
    fallbackCopyText(text, successMsg);
  }
}

function fallbackCopyText(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg || 'Copied to clipboard!');
  } catch (err) {
    showToast('Failed to copy. Value: ' + text);
  }
  document.body.removeChild(textArea);
}



