import Course from '../models/course.model.js';

// Publish a course
export const publishCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.published = true;
    await course.save();
    res.status(200).json({ message: 'Course published successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit course
export const editCourse = async (req, res) => {
  const { courseId } = req.params;
  const updateData = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    Object.assign(course, updateData);
    await course.save();
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.remove();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
