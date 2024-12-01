const express = require('express');
const router = express.Router();
const { addEmployee, getAllEmployees, getEmployeeById, searchEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.post('/employees', addEmployee);
router.get('/employees', getAllEmployees);
router.get('/search', searchEmployees);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

const Employee = require('../models/Employee');

// Search employees by department or position
router.get('/search', async (req, res) => {
    try {
        const { department, position } = req.query;
        const query = {};

        if (department) {
            query.department = department;
        }
        if (position) {
            query.position = position;
        }

        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error searching employees', error });
    }
});

module.exports = router;

