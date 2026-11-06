
function EnrollmentList({
  enrollments,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm
}) {
  const filteredEnrollments = enrollments.filter((student) => {
    const search = searchTerm.toLowerCase();

    return (
      student.fullName.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search)
    );
  });

  return (
    <section className="records-section">
      <h2>Student Enrollment Records</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search by student name, email or course..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <p className="record-count">
        Total Enrollments: {filteredEnrollments.length}
      </p>

      {filteredEnrollments.length === 0 ? (
        <p className="empty-message">No enrollment records found.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Mode</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEnrollments.map((student) => (
                <tr key={student.id}>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.learningMode}</td>

                  <td className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => onDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default EnrollmentList;
