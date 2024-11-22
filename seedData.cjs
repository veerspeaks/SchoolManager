const mongoose = require('mongoose');
const Teacher = require('./models/Teacher.cjs');
const Class = require('./models/Class.cjs');
const Student = require('./models/Student.cjs');

require('dotenv').config();

//seed Data created by Chat GPT

const teachersData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    subject: "Mathematics",
    profileImageUrl: "http://example.com/alice.jpg",
    createdAt: new Date()
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    subject: "Physics",
    profileImageUrl: "http://example.com/bob.jpg",
    createdAt: new Date()
  },
  {
    name: "Carol White",
    email: "carol.white@example.com",
    subject: "Chemistry",
    profileImageUrl: "http://example.com/carol.jpg",
    createdAt: new Date()
  }
];

const classesData = [
  {
    name: "Grade 10A",
    teacherId: null, // Will be set after teachers are inserted
    studentCount: 25,
    createdAt: new Date()
  },
  {
    name: "Grade 11B",
    teacherId: null, // Will be set after teachers are inserted
    studentCount: 30,
    createdAt: new Date()
  },
  {
    name: "Grade 12C",
    teacherId: null, // Will be set after teachers are inserted
    studentCount: 28,
    createdAt: new Date()
  }
];

const studentsData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    classId: null, // Will be set after classes are inserted
    profileImageUrl: "http://example.com/john.jpg",
    isDeleted: false,
    createdAt: new Date()
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    classId: null, // Will be set after classes are inserted
    profileImageUrl: "http://example.com/jane.jpg",
    isDeleted: false,
    createdAt: new Date()
  }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');

  // Insert teachers and get their IDs
  const insertedTeachers = await Teacher.insertMany(teachersData);
  console.log('Teachers seeded successfully');

  // Assign teacher IDs to classes
  classesData[0].teacherId = insertedTeachers[0]._id;
  classesData[1].teacherId = insertedTeachers[1]._id;
  classesData[2].teacherId = insertedTeachers[2]._id;

  // Insert classes and get their IDs
  const insertedClasses = await Class.insertMany(classesData);
  console.log('Classes seeded successfully');

  // Assign class IDs to students
  studentsData[0].classId = insertedClasses[0]._id;
  studentsData[1].classId = insertedClasses[1]._id;

  // Insert students
  await Student.insertMany(studentsData);
  console.log('Students seeded successfully');

  mongoose.disconnect();
})
.catch((err) => {
  console.error('Error seeding data:', err);
  mongoose.disconnect();
});