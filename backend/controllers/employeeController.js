const Employee = require('../models/Employee');

// Add Employee
exports.addEmployee = async (req, res) => {
  const { name, department, position } = req.body;

  try {
    const newEmployee = new Employee({ name, department, position });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Search Employees by department or position
exports.searchEmployees = async (req, res) => {
    const { department, position } = req.query;

    try {
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;

        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
