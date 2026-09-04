import React, { useState } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faBars, faXmark, faCalendarCheck, faBolt,
  faLayerGroup, faUserShield, faFilePdf, faCheck, faEnvelope, faPhone, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [feedback, setFeedback] = useState("");

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    const handleFeedback = (e) => {
        e?.preventDefault();
        if (!feedback.trim()) {
            alert("Please enter your feedback.");
            return;
        }
        alert("Thanks for your feedback!");
        setFeedback("");
    };

    return (
        <div className='bodydashboard'>
            {/* ===== NAVBAR ===== */}
            <header className="dash-header">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <span className="logo-icon"><FontAwesomeIcon icon={faCalendarCheck} /></span>
                    Smart<span className="logo-accent">Scheduler</span>
                </Link>

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
                </button>

                <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
                    <ul>
                        <li><a href="#home" onClick={closeMenu}>Home</a></li>
                        <li><a href="#features" onClick={closeMenu}>Features</a></li>
                        <li><a href="#how" onClick={closeMenu}>How it works</a></li>
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#contact-container" onClick={closeMenu}>Contact</a></li>
                    </ul>
                    <div className="nav-cta">
                        <Link to="/Signin" className="btn-ghost" onClick={closeMenu}>Sign in</Link>
                        <Link to="/Signup" className="btn-primary small" onClick={closeMenu}>
                            Get Started <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </nav>
            </header>

            {/* ===== HERO ===== */}
            <section id="home" className="hero">
                <div className="hero-bg">
                    <div className="blob blob-1" />
                    <div className="blob blob-2" />
                    <div className="grid-overlay" />
                </div>

                <div className="hero-inner">
                    <div className="hero-copy">
                        <div className="pill">
                            <FontAwesomeIcon icon={faBolt} /> New · Multi-class timetables in seconds
                        </div>
                        <h1>
                            Organise Time.<br />
                            <span className="gradient-text">Optimise Learning.</span>
                        </h1>
                        <p className="hero-sub">
                            Create clash-free weekly timetables for every class.
                            Add staff, set workloads & subjects — Smart Scheduler does the rest.
                        </p>
                        <div className="hero-actions">
                            <Link to="/Signup" className="btn-primary">
                                Get Started <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                            <Link to="/Signin" className="btn-outline">
                                Sign In
                            </Link>
                        </div>
                        <div className="hero-ticks">
                            <span><FontAwesomeIcon icon={faCheck} /> No clashes</span>
                            <span><FontAwesomeIcon icon={faCheck} /> Multi-class</span>
                            <span><FontAwesomeIcon icon={faCheck} /> PDF export</span>
                        </div>
                        <div className="hero-stats">
                            <div><strong>10k+</strong><small>Timetables made</small></div>
                            <div><strong>500+</strong><small>Schools & colleges</small></div>
                            <div><strong>30s</strong><small>Avg. generation</small></div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="tt-card">
                            <div className="tt-card-head">
                                <div className="dots"><i /><i /><i /></div>
                                <span>Class 10-A · Weekly</span>
                                <em className="live">● Live</em>
                            </div>
                            <div className="tt-grid">
                                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                                    <div className="tt-row" key={d} style={{ animationDelay: `${i * 0.12}s` }}>
                                        <b>{d}</b>
                                        <span className="chip c1">Math</span>
                                        <span className="chip c2">Science</span>
                                        <span className="chip c3">English</span>
                                    </div>
                                ))}
                            </div>
                            <div className="tt-foot">
                                <span><FontAwesomeIcon icon={faCheck} /> Clash-free verified</span>
                                <button type="button" className="btn-export"><FontAwesomeIcon icon={faFilePdf} /> Export PDF</button>
                            </div>
                        </div>
                        <div className="float-card fc1"><FontAwesomeIcon icon={faLayerGroup} /><div><strong>Multi-class</strong><small>All sections at once</small></div></div>
                        <div className="float-card fc2"><FontAwesomeIcon icon={faUserShield} /><div><strong>Load balanced</strong><small>Respects max classes</small></div></div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section id="features" className="section features">
                <p className="eyebrow">Why Smart Scheduler</p>
                <h2>Everything you need to schedule faster</h2>
                <p className="section-sub">Built for admins, principals and timetable incharges who want zero chaos.</p>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="f-icon"><FontAwesomeIcon icon={faLayerGroup} /></div>
                        <h3>Multi-class support</h3>
                        <p>Create unlimited classes and generate all timetables together — no repeated work.</p>
                    </div>
                    <div className="feature-card">
                        <div className="f-icon"><FontAwesomeIcon icon={faBolt} /></div>
                        <h3>Smart auto-allocation</h3>
                        <p>Subjects and staff auto-assigned by availability, avoiding double-booking in the same slot.</p>
                    </div>
                    <div className="feature-card">
                        <div className="f-icon"><FontAwesomeIcon icon={faUserShield} /></div>
                        <h3>Workload control</h3>
                        <p>Set max classes per week per staff and let the engine balance loads fairly.</p>
                    </div>
                    <div className="feature-card">
                        <div className="f-icon"><FontAwesomeIcon icon={faFilePdf} /></div>
                        <h3>One-click PDF</h3>
                        <p>Beautiful, print-ready timetables downloadable instantly for notice boards.</p>
                    </div>
                </div>
            </section>

            {/* ===== HOW ===== */}
            <section id="how" className="section how">
                <p className="eyebrow">How it works</p>
                <h2>Get your timetable in 3 steps</h2>
                <div className="steps">
                    <div className="step"><span className="step-no">1</span><h3>Create classes</h3><p>Add class names like 10-A, 10-B in seconds.</p></div>
                    <div className="step"><span className="step-no">2</span><h3>Add staff</h3><p>Assign subjects + max classes per week.</p></div>
                    <div className="step"><span className="step-no">3</span><h3>Generate & export</h3><p>One click to build & download PDFs.</p></div>
                </div>
                <div className="how-cta">
                    <Link to="/Signup" className="btn-primary">Try it free <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>
            </section>

            {/* ===== ABOUT ===== */}
            <section id="about" className="section about">
                <div className="about-card">
                    <p className="eyebrow">About us</p>
                    <h3>Organise Time. Optimise Learning.</h3>
                    <p>
                        Smart Time Table Scheduler helps schools and colleges eliminate timetable
                        chaos. Create multiple classes, assign staff with load limits and subjects,
                        and generate conflict-free weekly timetables in one click.
                    </p>
                </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section id="contact">
                <div id="contact-container">
                    <div className="contact-box">
                        <h1>Contact Us</h1>
                        <p className="contact-sub">We reply within 24 hours.</p>
                        <a href="mailto:support@smartscheduler.com"><FontAwesomeIcon icon={faEnvelope} /> support@smartscheduler.com</a>
                        <a href="tel:+910000000000"><FontAwesomeIcon icon={faPhone} /> +91 00000 00000</a>
                    </div>
                    <div className="feedback-box">
                        <h3>Send Feedback</h3>
                        <form onSubmit={handleFeedback}>
                            <textarea
                                placeholder="Write your feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <button type="submit" className="btn-send"><FontAwesomeIcon icon={faPaperPlane} /> Submit</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer>
                <div className="foot-inner">
                    <span><FontAwesomeIcon icon={faCalendarCheck} /> Smart Scheduler</span>
                    <p>&copy; {new Date().getFullYear()} Smart Time Table Scheduler. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
