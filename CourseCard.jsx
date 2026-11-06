
function CourseCard({ course, onEnroll }) {
  const courseStyles = {
    1: {
      category: "PROGRAMMING",
      theme: "python-theme",
      label: "Build your logic",
      highlight: "Popular choice",
      visual: "🐍",
      visualText: "CODE • CREATE • SOLVE",
    },
    2: {
      category: "DATA & ANALYTICS",
      theme: "data-theme",
      label: "Discover insights",
      highlight: "Explore data",
      visual: "📊",
      visualText: "ANALYSE • DISCOVER • GROW",
    },
    3: {
      category: "WEB TECHNOLOGY",
      theme: "web-theme",
      label: "Create experiences",
      highlight: "Build online",
      visual: "💻",
      visualText: "DESIGN • DEVELOP • LAUNCH",
    },
  };

  const design = courseStyles[course.id] || courseStyles[1];

  return (
    <article className={`course-card premium-course ${design.theme}`}>
      <div className="course-art">
        <span className="course-category">{design.category}</span>
        <span className="course-highlight">{design.highlight}</span>

        <div className="course-art-circle circle-back"></div>
        <div className="course-art-circle circle-front"></div>

        <span className="course-art-icon">{design.visual}</span>
        <span className="course-art-caption">{design.visualText}</span>
        <span className="course-art-sparkle">✦</span>
      </div>

      <div className="premium-course-content">
        <div className="course-subtitle">{design.label}</div>

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="course-details">
          <span>◷ {course.duration}</span>
          <span>✧ {course.level}</span>
        </div>

        <div className="course-card-bottom">
          <span className="course-enrol-label">Start learning today</span>

          <button
            className="course-enrol-button"
            onClick={() => onEnroll(course.title)}
          >
            Enrol Now <span>↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;

