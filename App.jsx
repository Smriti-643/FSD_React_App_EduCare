
import { useEffect, useState } from "react";
import CourseCard from "./components/CourseCard";
import EnrollmentForm from "./components/EnrollmentForm";
import EnrollmentList from "./components/EnrollmentList";
import "./App.css";

const API_URL = "http://localhost:5000/enrollments";

const courses = [
  {
    id: 1,
    title: "Python Programming",
    icon: "🐍",
    description:
      "Master programming fundamentals, Python syntax and problem-solving skills.",
    duration: "8 Weeks",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Data Science Basics",
    icon: "📊",
    description:
      "Discover data analysis, visualization and the foundations of data science.",
    duration: "10 Weeks",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Web Development",
    icon: "💻",
    description:
      "Build beautiful, interactive websites using HTML, CSS and JavaScript.",
    duration: "12 Weeks",
    level: "Beginner",
  },
];

function App() {
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchEnrollments() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch enrolment records.");
      }

      const data = await response.json();
      setEnrollments(data);
      setError("");
    } catch (err) {
      setError("Database connection failed. Please check JSON Server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnrollments();
  }, []);

  async function handleSave(formData) {
    try {
      const isEditing = Boolean(editingEnrollment);
      const url = isEditing
        ? `${API_URL}/${editingEnrollment.id}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to save enrolment.");
      }

      alert(
        isEditing
          ? "Enrolment updated successfully!"
          : "Student registered successfully!"
      );

      setEditingEnrollment(null);
      setSelectedCourse("");
      await fetchEnrollments();
    } catch (err) {
      alert("Something went wrong while saving the record.");
      throw err;
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enrolment?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete enrolment.");
      }

      setEnrollments((previous) =>
        previous.filter((student) => student.id !== id)
      );

      if (editingEnrollment?.id === id) {
        setEditingEnrollment(null);
      }

      alert("Enrolment deleted successfully!");
    } catch (err) {
      alert("Unable to delete the record.");
    }
  }

  function handleEdit(student) {
    setEditingEnrollment(student);
    setSelectedCourse("");

    document
      .getElementById("enrollment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function handleCourseSelect(courseName) {
    setEditingEnrollment(null);
    setSelectedCourse(courseName);

    document
      .getElementById("enrollment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function goToRegistration() {
    setEditingEnrollment(null);
    setSelectedCourse("");

    document
      .getElementById("enrollment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app">
      {/* NAVIGATION */}
      <header className="navbar">
        <a href="#home" className="logo">
          EduCare<span> AI.</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#enrollment-form">Register</a>
          <a href="#records">Enrolments</a>
        </nav>

        <button className="nav-cta" onClick={goToRegistration}>
          Get Started <span>↗</span>
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="live-dot"></span>
              YOUR NEXT CHAPTER STARTS HERE
            </div>

            <h1>
              Learn without limits.
              <span> Build your future.</span>
            </h1>

            <p className="hero-description">
              Discover your potential with thoughtfully designed courses.
              Learn in-demand skills, explore new possibilities and take the
              next step towards your goals with EduCare AI.
            </p>

            <div className="hero-actions">
              <a href="#courses" className="hero-button">
                Explore Courses <span>→</span>
              </a>

              <button
                className="hero-secondary"
                onClick={goToRegistration}
              >
                Join EduCare <span>↗</span>
              </button>
            </div>

            <div className="hero-social-proof">
              <div className="avatar-stack">
                <span>👩🏻</span>
                <span>👨🏽</span>
                <span>👩🏾</span>
                <span>👨🏻</span>
              </div>
              <div>
                <strong>Start your learning journey</strong>
                <small>Explore. Learn. Grow.</small>
              </div>
            </div>
          </div>

          {/* DECORATIVE LEARNING DASHBOARD */}
          <div className="hero-visual">
            <div className="visual-orbit orbit-one"></div>
            <div className="visual-orbit orbit-two"></div>

            <div className="floating-badge badge-top">
              <span className="badge-icon">✦</span>
              <div>
                <strong>Learn something new</strong>
                <small>Every single day</small>
              </div>
            </div>

            <div className="learning-card">
              <div className="learning-card-header">
                <div>
                  <span className="mini-label">YOUR LEARNING SPACE</span>
                  <h3>Welcome, Learner!</h3>
                </div>
                <span className="card-sparkle">✦</span>
              </div>

              <div className="learning-art">
                <div className="art-circle art-circle-one"></div>
                <div className="art-circle art-circle-two"></div>
                <div className="book-emoji">📚</div>
                <div className="art-star star-one">✦</div>
                <div className="art-star star-two">✧</div>
              </div>

              <div className="learning-card-footer">
                <div>
                  <span className="mini-label">YOUR NEXT STEP</span>
                  <strong>Choose a course</strong>
                </div>
                <span className="next-arrow">↗</span>
              </div>

              <div className="learning-progress">
                <span></span>
              </div>
            </div>

            <div className="floating-badge badge-bottom">
              <span className="badge-check">✓</span>
              <div>
                <strong>Skills for tomorrow</strong>
                <small>One course at a time</small>
              </div>
            </div>

            <div className="floating-symbol symbol-one">✧</div>
            <div className="floating-symbol symbol-two">✦</div>
          </div>
        </div>

        <div className="hero-bottom-line">
          <span>LEARN WITH PURPOSE</span>
          <span>✦</span>
          <span>GROW WITH CONFIDENCE</span>
          <span>✦</span>
          <span>BUILD YOUR FUTURE</span>
        </div>
      </section>

      {/* STATISTICS STRIP */}
      <section className="stats-strip">
        <div className="stat-item">
          <span className="stat-icon">🎓</span>
          <div>
            <strong>3</strong>
            <span>Learning pathways</span>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">👩‍💻</span>
          <div>
            <strong>{enrollments.length}</strong>
            <span>Registered learners</span>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">🚀</span>
          <div>
            <strong>100%</strong>
            <span>Focus on growth</span>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">💡</span>
          <div>
            <strong>Future</strong>
            <span>Starts with learning</span>
          </div>
        </div>
      </section>

      <main className="container">
        {/* COURSES */}
        <section className="courses-section" id="courses">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">EXPLORE AND DISCOVER</span>
              <h2>Find your next skill.</h2>
              <p className="section-description">
                Carefully selected learning pathways to help you move forward.
              </p>
            </div>
            <span className="heading-decoration">✳</span>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleCourseSelect}
              />
            ))}
          </div>
        </section>

        {/* WHY EDUCARE */}
        <section className="why-section">
          <div className="why-heading">
            <span className="section-eyebrow">THE EDUCARE DIFFERENCE</span>
            <h2>Learning that moves you forward.</h2>
            <p>
              Your goals deserve more than ordinary learning. Make every
              learning step count.
            </p>
          </div>

          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-icon">🎯</span>
              <h3>Learn with direction</h3>
              <p>
                Explore structured courses designed to help you build useful
                skills and confidence.
              </p>
            </article>

            <article className="benefit-card">
              <span className="benefit-icon">⚡</span>
              <h3>Move at your pace</h3>
              <p>
                Choose a learning mode that works for you and take the next
                step on your terms.
              </p>
            </article>

            <article className="benefit-card">
              <span className="benefit-icon">🌱</span>
              <h3>Grow every day</h3>
              <p>
                Build a foundation in technology and keep discovering what
                you can achieve.
              </p>
            </article>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="steps-section">
          <div className="steps-heading">
            <span className="section-eyebrow">GETTING STARTED IS SIMPLE</span>
            <h2>Your learning journey, in three steps.</h2>
          </div>

          <div className="steps-grid">
            <div className="step-item">
              <span className="step-number">01</span>
              <h3>Explore</h3>
              <p>Discover the course that matches your interests.</p>
            </div>

            <div className="step-item">
              <span className="step-number">02</span>
              <h3>Enrol</h3>
              <p>Complete your registration and choose your learning mode.</p>
            </div>

            <div className="step-item">
              <span className="step-number">03</span>
              <h3>Begin</h3>
              <p>Take your first step towards learning something new.</p>
            </div>
          </div>
        </section>

        {/* REGISTRATION */}
        <EnrollmentForm
          onSave={handleSave}
          editingEnrollment={editingEnrollment}
          selectedCourse={selectedCourse}
        />

        {/* ENROLMENT RECORDS */}
        <section id="records">
          {loading ? (
            <p>Loading enrolment records...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <EnrollmentList
              enrollments={enrollments}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <a href="#home" className="footer-logo">
              EduCare<span> AI.</span>
            </a>
            <p>
              Empowering curious minds to discover new skills and build
              meaningful futures through learning.
            </p>
          </div>

          <div className="footer-links">
            <strong>Explore</strong>
            <a href="#home">Home</a>
            <a href="#courses">Courses</a>
            <a href="#enrollment-form">Register</a>
            <a href="#records">Enrolments</a>
          </div>

          <div className="footer-links">
            <strong>Your journey</strong>
            <a href="#courses">Discover courses</a>
            <a href="#enrollment-form">Join EduCare</a>
            <a href="#records">Manage enrolment</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 EduCare AI. All rights reserved.</span>
          <span>Designed for curious minds. ✦</span>
        </div>
      </footer>
    </div>
  );
}

export default App;


