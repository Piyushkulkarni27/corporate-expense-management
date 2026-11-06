import React, { useState, useEffect } from 'react';

function App() {
  // १. स्टेट्स (States) तयार करणे
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ employeeName: '', description: '', amount: '' });
  const [loading, setLoading] = useState(true);

  // २. बॅकएंड (Spring Boot) कडून डेटा आणण्यासाठी (GET API)
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    fetch('http://localhost:8080/api/expenses')
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("बॅकएंड सर्व्हर चालू नाहीये!", err);
        setLoading(false);
      });
  };

  // ३. फॉर्म सबमिट केल्यावर नवीन क्लेम सेव्ह करण्यासाठी (POST API)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then((res) => res.json())
    .then((newExpense) => {
      // स्क्रीनवरील लिस्टमध्ये नवीन क्लेम लगेच जोडणे
      setExpenses([...expenses, newExpense]);
      // फॉर्म रिकामा करणे
      setForm({ employeeName: '', description: '', amount: '' });
    })
    .catch((err) => alert("डेटा सेव्ह करताना एरर आला!"));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '5px' }}>Corporate Expense Management System</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginTop: '0', marginBottom: '30px' }}>C-DAC Java Full Stack Project</p>
      
      {/* १. नवीन क्लेम ॲड करण्याचा फॉर्म */}
      <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '0 auto 40px' }}>
        <h3 style={{ marginTop: '0', color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '8px' }}>Add New Expense Claim</h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Employee Name:</label>
            <input type="text" value={form.employeeName} onChange={e => setForm({...form, employeeName: e.target.value})} required style={{ width: '95%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. Amit Kulkarni" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Expense Description:</label>
            <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required style={{ width: '95%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. Client Dinner / Travel Allowance" />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Amount (INR):</label>
            <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required style={{ width: '95%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="e.g. 2500" />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Submit Claim</button>
        </form>
      </div>

      {/* २. बिलांची यादी दाखवणारा टेबल */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ marginTop: '0', color: '#34495e' }}>Submitted Expense Claims</h3>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>डेटा लोड होत आहे...</p>
        ) : expenses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>अजून एकही बिलाचा क्लेम सबमिट केलेला नाही.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>ID</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Employee Name</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Description</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Amount</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{exp.id}</td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{exp.employeeName}</td>
                  <td style={{ padding: '12px' }}>{exp.description}</td>
                  <td style={{ padding: '12px' }}>₹{exp.amount}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: '#ffeaa7', color: '#d63031', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;