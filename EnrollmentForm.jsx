
import { useEffect, useState } from "react";

function EnrollmentForm({
  onSave,
  editingEnrollment,
  selectedCourse
}) {
  const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    course: "",
    learningMode: ""
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingEnrollment) {
      setFormData({
        fullName: editingEnrollment.fullName,
        email: editingEnrollment.email,
        phone: editingEnrollment.phone,
        course: editingEnrollment.course,
        learningMode: editingEnrollment.learningMode
      });
    } else {
      setFormData({
        ...initialForm,
        course: selectedCourse || ""
      });
    }
  }, [editingEnrollment, selectedCourse]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course ||
      !formData.learningMode
    ) {
      alert("Please fill in all fields.");
      return;
    }

    await onSave(formData);
    setFormData(initialForm);
  }

  return (
    <section className="form-section" id="enrollment-form">
      <h2>Student Registration</h2>
      <p>Register for your preferred EduCare course.</p>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Select Course</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Choose a course</option>
          <option value="Python Programming">
            Python Programming
          </option>
          <option value="Data Science Basics">
            Data Science Basics
          </option>
          <option value="Web Development">
            Web Development
          </option>
        </select>

        <label>Learning Mode</label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="learningMode"
              value="Online"
              checked={formData.learningMode === "Online"}
              onChange={handleChange}
            />
            Online
          </label>

          <label>
            <input
              type="radio"
              name="learningMode"
              value="Offline"
              checked={formData.learningMode === "Offline"}
              onChange={handleChange}
            />
            Offline
          </label>
        </div>

        <button type="submit" className="primary-button">
          {editingEnrollment ? "Update Enrollment" : "Register Student"}
        </button>
      </form>
    </section>
  );
}

export default EnrollmentForm;
