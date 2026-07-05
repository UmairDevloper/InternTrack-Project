import HomeNavbar from "@/components/HomeNavbar"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;background:#F7F5F0;color:#1A1A2E;overflow-x:hidden}

        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 2rem;height:60px;display:flex;align-items:center;justify-content:space-between;background:rgba(10,15,30,0.92);backdrop-filter:blur(12px);border-bottom:0.5px solid rgba(255,255,255,0.08)}
        .nav-logo{font-size:17px;font-weight:600;color:#fff;letter-spacing:-0.3px;text-decoration:none}
        .nav-logo span{color:#5B5FEF}
        .nav-links{display:flex;gap:2rem;list-style:none}
        .nav-links a{color:rgba(255,255,255,0.65);text-decoration:none;font-size:14px;transition:color 0.2s}
        .nav-links a:hover{color:#fff}
        .nav-cta{background:#5B5FEF;color:#fff;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;transition:background 0.2s}
        .nav-cta:hover{background:#4347C9}

        .hero{min-height:100vh;background:#0A0F1E;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 2rem 60px;text-align:center;position:relative;overflow:hidden}
        .hero::before{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(91,95,239,0.15) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(91,95,239,0.15);border:0.5px solid rgba(91,95,239,0.35);border-radius:100px;padding:6px 14px;margin-bottom:2rem;font-size:12px;font-weight:500;color:#5B5FEF;letter-spacing:0.5px;text-transform:uppercase}
        .eyebrow-dot{width:6px;height:6px;border-radius:50%;background:#5B5FEF;display:inline-block;animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:700;color:#fff;line-height:1.1;letter-spacing:-1px;max-width:780px;margin-bottom:1.25rem}
        .hero-title em{font-style:italic;color:#5B5FEF}
        .hero-sub{font-size:17px;color:rgba(255,255,255,0.55);max-width:520px;line-height:1.7;margin-bottom:2.5rem}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:4rem}
        .btn-primary{background:#5B5FEF;color:#fff;padding:13px 28px;border-radius:10px;font-size:15px;font-weight:500;text-decoration:none;transition:all 0.2s;display:inline-block}
        .btn-primary:hover{background:#4347C9;transform:translateY(-1px)}
        .btn-ghost{background:transparent;color:rgba(255,255,255,0.75);padding:13px 28px;border-radius:10px;font-size:15px;font-weight:500;text-decoration:none;border:0.5px solid rgba(255,255,255,0.2);transition:all 0.2s;display:inline-block}
        .btn-ghost:hover{border-color:rgba(255,255,255,0.45);color:#fff}

        .kanban-preview{width:100%;max-width:720px;background:rgba(255,255,255,0.04);border:0.5px solid rgba(255,255,255,0.1);border-radius:16px;padding:20px;display:flex;gap:12px;overflow:hidden}
        .k-col{flex:1;min-width:0}
        .k-col-head{font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;padding:6px 10px;border-radius:6px;margin-bottom:10px;text-align:center}
        .k-applied .k-col-head{background:rgba(59,130,246,0.15);color:#60a5fa}
        .k-interview .k-col-head{background:rgba(234,179,8,0.15);color:#facc15}
        .k-offer .k-col-head{background:rgba(168,85,247,0.15);color:#c084fc}
        .k-accepted .k-col-head{background:rgba(34,197,94,0.15);color:#4ade80}
        .k-rejected .k-col-head{background:rgba(239,68,68,0.15);color:#f87171}
        .k-card{background:rgba(255,255,255,0.07);border:0.5px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 12px;margin-bottom:8px;transition:all 0.4s cubic-bezier(.4,0,.2,1)}
        .k-company{font-size:10px;color:rgba(255,255,255,0.4);font-weight:500;margin-bottom:3px}
        .k-role{font-size:12px;color:rgba(255,255,255,0.85);font-weight:500}
        .k-dot{font-size:10px;color:rgba(255,255,255,0.3);margin-top:4px}

        .stats-bar{background:#111827;padding:2rem;display:flex;justify-content:center;gap:4rem;flex-wrap:wrap;border-top:0.5px solid rgba(255,255,255,0.06);border-bottom:0.5px solid rgba(255,255,255,0.06)}
        .stat{text-align:center}
        .stat-num{font-size:28px;font-weight:600;color:#fff;font-family:'Playfair Display',serif}
        .stat-label{font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px;letter-spacing:0.3px}

        section{padding:6rem 2rem}
        .container{max-width:1000px;margin:0 auto}
        .section-label{font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#5B5FEF;margin-bottom:1rem}
        .section-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:700;color:#1A1A2E;line-height:1.2;margin-bottom:1rem;max-width:600px}
        .section-sub{font-size:16px;color:#5C5A6B;line-height:1.7;max-width:520px;margin-bottom:3rem}

        .features-section{background:#F7F5F0}
        .feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
        .feature-card{background:#fff;border:0.5px solid rgba(0,0,0,0.08);border-radius:16px;padding:2rem;transition:all 0.25s;position:relative;overflow:hidden}
        .feature-card:hover{transform:translateY(-3px);border-color:rgba(91,95,239,0.25);box-shadow:0 12px 40px rgba(91,95,239,0.08)}
        .feature-icon{width:44px;height:44px;border-radius:12px;background:rgba(91,95,239,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;font-size:20px}
        .feature-title{font-size:16px;font-weight:600;color:#1A1A2E;margin-bottom:0.5rem}
        .feature-desc{font-size:14px;color:#5C5A6B;line-height:1.65}
        .feature-badge{position:absolute;top:1.25rem;right:1.25rem;font-size:10px;font-weight:600;background:rgba(139,168,136,0.15);color:#4a7a47;border-radius:100px;padding:3px 10px;letter-spacing:0.3px}

        .how-section{background:#fff}
        .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem}
        .step{text-align:center;padding:1.5rem 1rem}
        .step-num{width:48px;height:48px;border-radius:50%;background:#0A0F1E;color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-family:'Playfair Display',serif;font-size:18px;font-weight:700}
        .step-title{font-size:15px;font-weight:600;color:#1A1A2E;margin-bottom:0.5rem}
        .step-desc{font-size:13px;color:#5C5A6B;line-height:1.6}

        .compare-section{background:#F7F5F0}
        .compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
        .compare-card{border-radius:16px;padding:2rem;border:0.5px solid rgba(0,0,0,0.08)}
        .compare-card-them{background:#fff}
        .compare-card-us{background:#0A0F1E;border-color:rgba(91,95,239,0.3)}
        .compare-label{font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;margin-bottom:1.25rem}
        .compare-label-them{color:#5C5A6B}
        .compare-label-us{color:#5B5FEF}
        .compare-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;font-size:14px}
        .compare-item-them{color:#888}
        .compare-item-us{color:rgba(255,255,255,0.8)}
        .ci-icon{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:10px;font-weight:700}
        .ci-icon-them{background:rgba(0,0,0,0.06);color:#aaa}
        .ci-icon-us{background:rgba(91,95,239,0.25);color:#5B5FEF}

        .pricing-section{background:#fff}
        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;max-width:860px}
        .price-card{border-radius:16px;padding:2rem;border:0.5px solid rgba(0,0,0,0.08);background:#fff;position:relative}
        .price-card-featured{background:#0A0F1E;border-color:rgba(91,95,239,0.4)}
        .price-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#5B5FEF;color:#fff;font-size:11px;font-weight:600;padding:4px 14px;border-radius:100px;white-space:nowrap;letter-spacing:0.3px}
        .price-plan{font-size:13px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:0.75rem}
        .price-plan-light{color:#5C5A6B}
        .price-plan-dark{color:rgba(255,255,255,0.5)}
        .price-amount{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;line-height:1;margin-bottom:0.25rem}
        .price-amount-light{color:#1A1A2E}
        .price-amount-dark{color:#fff}
        .price-period{font-size:13px;margin-bottom:1.5rem}
        .price-period-light{color:#5C5A6B}
        .price-period-dark{color:rgba(255,255,255,0.45)}
        .price-divider{height:0.5px;margin-bottom:1.5rem}
        .price-divider-light{background:rgba(0,0,0,0.06)}
        .price-divider-dark{background:rgba(255,255,255,0.1)}
        .price-feature{display:flex;align-items:center;gap:10px;font-size:13px;margin-bottom:10px}
        .price-feature-light{color:#5C5A6B}
        .price-feature-dark{color:rgba(255,255,255,0.75)}
        .pf-check{font-size:14px;font-weight:700;flex-shrink:0}
        .pf-check-light{color:#5B5FEF}
        .pf-check-dark{color:#818cf8}
        .price-btn{display:block;text-align:center;margin-top:1.75rem;padding:11px;border-radius:10px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.2s;cursor:pointer;width:100%}
        .price-btn-outline{background:transparent;color:#1A1A2E;border:0.5px solid rgba(0,0,0,0.15)}
        .price-btn-outline:hover{background:rgba(0,0,0,0.04)}
        .price-btn-solid{background:#5B5FEF;color:#fff;border:none}
        .price-btn-solid:hover{background:#4347C9}

        footer{background:#0A0F1E;padding:3rem 2rem;text-align:center;border-top:0.5px solid rgba(255,255,255,0.06)}
        .footer-logo{font-size:18px;font-weight:600;color:#fff;margin-bottom:0.5rem}
        .footer-logo span{color:#5B5FEF}
        .footer-sub{font-size:13px;color:rgba(255,255,255,0.35)}

        @keyframes cardIn{from{opacity:0;transform:translateY(8px) scale(0.96)}to{opacity:1;transform:none}}
        .card-appearing{animation:cardIn 0.4s cubic-bezier(.4,0,.2,1) forwards}
        .card-moving{opacity:0;transform:translateY(-8px) scale(0.96);transition:all 0.4s cubic-bezier(.4,0,.2,1)}
      `}</style>

      {/* NAV */}

      <HomeNavbar />
    

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          Built for internship season
        </div>
        <h1 className="hero-title">
          Stop losing track of<br /><em>where you applied</em>
        </h1>
        <p className="hero-sub">
          InternTrack keeps every application, deadline, and interview round in one place — so you can focus on landing the role.
        </p>
        <div className="hero-btns">
          <Link href="/dashboard/add" className="btn-primary">Start tracking free</Link>
          <a href="#how" className="btn-ghost">See how it works</a>
        </div>

        <div className="kanban-preview">
          <div className="k-col k-applied">
            <div className="k-col-head">Applied</div>
            <div className="k-card" id="k-card-move">
              <div className="k-company">Stripe</div>
              <div className="k-role">Backend Engineer Intern</div>
              <div className="k-dot">Applied 3 days ago</div>
            </div>
            <div className="k-card">
              <div className="k-company">Notion</div>
              <div className="k-role">Product Design Intern</div>
              <div className="k-dot">Applied 1 week ago</div>
            </div>
          </div>
          <div className="k-col k-interview" id="k-col-interview">
            <div className="k-col-head">Interview</div>
            <div className="k-card">
              <div className="k-company">Figma</div>
              <div className="k-role">Frontend Engineer Intern</div>
              <div className="k-dot">Round 2 scheduled</div>
            </div>
          </div>
          <div className="k-col k-offer">
            <div className="k-col-head">Offer</div>
          </div>
          <div className="k-col k-accepted">
            <div className="k-col-head">Accepted</div>
          </div>
          <div className="k-col k-rejected">
            <div className="k-col-head">Rejected</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[
          { num: "2,400+", label: "Students tracking" },
          { num: "18,000+", label: "Applications logged" },
          { num: "94%", label: "Never miss a deadline" },
          { num: "3×", label: "More organised than spreadsheets" },
        ].map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything you need, nothing you don't</h2>
          <p className="section-sub">Designed specifically for students juggling multiple applications across dozens of companies.</p>
          <div className="feature-grid">
            {[
              { icon: "📋", title: "Visual Kanban board", desc: "Drag applications between stages — Applied, Interview, Offer, Accepted — and see your entire pipeline at a glance.", badge: null },
              { icon: "🏢", title: "Company profiles", desc: "Store website, industry, and notes per company. InternTrack auto-links companies across multiple applications.", badge: "Smart" },
              { icon: "⏰", title: "Deadline tracking", desc: "Set application deadlines and see them surface on every card. Never miss a closing date again.", badge: null },
              { icon: "🎤", title: "Interview rounds", desc: "Log every interview round — type, date, outcome, notes. Track exactly where you are in each process.", badge: null },
              { icon: "🔗", title: "Job link storage", desc: "Save the original posting URL with every application. Jump back to the job description before each round.", badge: null },
              { icon: "✏️", title: "Edit anything, anytime", desc: "Update status, notes, and company details from the detail page. Your data stays current as situations evolve.", badge: "New" },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
                {f.badge && <div className="feature-badge">{f.badge}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="section-label">How it works</div>
          <h2 className="section-title">Up and running in under two minutes</h2>
          <p className="section-sub">No setup, no configuration, no spreadsheet formulas to learn.</p>
          <div className="steps">
            {[
              { n: "1", title: "Sign in with Google", desc: "One click and your account is ready. No passwords, no forms." },
              { n: "2", title: "Add your first application", desc: "Enter the company, role, job URL, and deadline. Takes 20 seconds." },
              { n: "3", title: "Drag as you progress", desc: "Move cards across columns as you hear back. The board tells your whole story." },
              { n: "4", title: "Land the role", desc: "Stay organised through every round until you accept the offer that's right for you." },
            ].map((s) => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="compare-section" id="compare">
        <div className="container">
          <div className="section-label">Why InternTrack</div>
          <h2 className="section-title">Better than a spreadsheet in every way that matters</h2>
          <p className="section-sub">Students have been tracking applications in Google Sheets for years. InternTrack was built to fix every frustration that creates.</p>
          <div className="compare-grid">
            <div className={`compare-card compare-card-them`}>
              <div className="compare-label compare-label-them">Spreadsheets</div>
              {[
                "Manual status columns with no visual hierarchy",
                "No deadline visibility — you have to remember to check",
                "Company data duplicated across every row",
                "No place to log interview rounds or outcomes",
                "Breaks on mobile — not built for on-the-go updates",
                "No way to link back to the original job posting",
              ].map((t) => (
                <div className="compare-item compare-item-them" key={t}>
                  <span className="ci-icon ci-icon-them">✕</span>{t}
                </div>
              ))}
            </div>
            <div className="compare-card compare-card-us">
              <div className="compare-label compare-label-us">InternTrack</div>
              {[
                "Visual Kanban — your pipeline at a glance",
                "Deadlines shown on every card, always visible",
                "Company profiles shared across all applications",
                "Full interview round history per application",
                "Works on any device, any screen size",
                "Job URL saved — one click back to the posting",
              ].map((t) => (
                <div className="compare-item compare-item-us" key={t}>
                  <span className="ci-icon ci-icon-us">✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Simple, honest pricing</h2>
          <p className="section-sub">Free while you're in school. Upgrade when you're ready for more.</p>
          <div className="pricing-grid">

            <div className="price-card">
              <div className="price-plan price-plan-light">Free</div>
              <div className="price-amount price-amount-light">$0</div>
              <div className="price-period price-period-light">forever, no card needed</div>
              <div className="price-divider price-divider-light" />
              {["Up to 25 applications","Full Kanban board","Company profiles","Deadline tracking","Google sign-in"].map((f) => (
                <div className="price-feature price-feature-light" key={f}><span className="pf-check pf-check-light">✓</span>{f}</div>
              ))}
              <Link href="/dashboard" className="price-btn price-btn-outline">Get started</Link>
            </div>

            <div className="price-card price-card-featured">
              <div className="price-badge">Most popular</div>
              <div className="price-plan price-plan-dark">Pro</div>
              <div className="price-amount price-amount-dark">$4</div>
              <div className="price-period price-period-dark">per month, billed annually</div>
              <div className="price-divider price-divider-dark" />
              {["Unlimited applications","Everything in Free","Interview round tracking","Export to CSV","Priority support"].map((f) => (
                <div className="price-feature price-feature-dark" key={f}><span className="pf-check pf-check-dark">✓</span>{f}</div>
              ))}
              <Link href="/dashboard" className="price-btn price-btn-solid">Start free trial</Link>
            </div>

            <div className="price-card">
              <div className="price-plan price-plan-light">Teams</div>
              <div className="price-amount price-amount-light">$12</div>
              <div className="price-period price-period-light">per seat / month</div>
              <div className="price-divider price-divider-light" />
              {["Everything in Pro","Shared company database","Career centre dashboard","Bulk student import","Dedicated support"].map((f) => (
                <div className="price-feature price-feature-light" key={f}><span className="pf-check pf-check-light">✓</span>{f}</div>
              ))}
              <button className="price-btn price-btn-outline">Contact us</button>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Intern<span>Track</span></div>
        <p className="footer-sub">Built for students, by people who remember how stressful applications are.</p>
      </footer>

      {/* KANBAN ANIMATION */}
      <script dangerouslySetInnerHTML={{ __html: `
        const newCards = [
          {company:'Airbnb',role:'Data Science Intern',note:'Applied today'},
          {company:'Linear',role:'Software Engineer Intern',note:'Applied 2 days ago'},
          {company:'Vercel',role:'Developer Relations Intern',note:'Applied 5 days ago'},
        ]
        let ci = 0
        function animateKanban() {
          const applied = document.querySelector('.k-applied')
          const interview = document.getElementById('k-col-interview')
          const card = document.getElementById('k-card-move')
          if (!applied || !interview || !card) return
          card.style.opacity = '0'
          card.style.transform = 'translateY(-8px) scale(0.96)'
          card.style.transition = 'all 0.4s cubic-bezier(.4,0,.2,1)'
          setTimeout(() => {
            card.remove()
            const next = newCards[ci % newCards.length]; ci++
            const nc = document.createElement('div')
            nc.className = 'k-card card-appearing'
            nc.setAttribute('id','k-card-move')
            nc.innerHTML = '<div class="k-company">'+next.company+'</div><div class="k-role">'+next.role+'</div><div class="k-dot">'+next.note+'</div>'
            applied.appendChild(nc)
            const mc = document.createElement('div')
            mc.className = 'k-card card-appearing'
            mc.innerHTML = '<div class="k-company">Stripe</div><div class="k-role">Backend Engineer Intern</div><div class="k-dot">Interview scheduled ✦</div>'
            interview.appendChild(mc)
            setTimeout(() => { if(interview.children.length > 3) interview.removeChild(interview.children[1]) }, 2000)
          }, 450)
        }
        setInterval(animateKanban, 3500)
      `}} />
    </>
  )
}