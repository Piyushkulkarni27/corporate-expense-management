package com.example.demo.controller;

import com.example.demo.model.Expense;
import com.example.demo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*") // यामुळे फ्रंटएंड (React) कडून येणारा डेटा ब्लॉक होत नाही
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    // १. सर्व बिलांची लिस्ट फ्रंटएंडला पाठवण्यासाठी (GET Request)
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // २. नवीन बिलाचा क्लेम डेटाबेसमध्ये सेव्ह करण्यासाठी (POST Request)
    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        expense.setStatus("Pending"); // सुरुवातीला प्रत्येक बिलाचा स्टेटस Pending राहील
        return expenseRepository.save(expense);
    }
}