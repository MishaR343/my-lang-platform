'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    nativeLang: '',
    targetLang: '',
    level: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Тут запит на твій бекенд, наприклад:
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Registered successfully!');
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>Create an Account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="username"
          placeholder="Username*"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          required
        />
        <div className={styles.passwordContainer}>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password*"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <input
          name="country"
          placeholder="Country*"
          value={form.country}
          onChange={handleChange}
          required
        />
        <input
          name="nativeLang"
          placeholder="Native Language*"
          value={form.nativeLang}
          onChange={handleChange}
          required
        />
        <input
          name="targetLang"
          placeholder="Target Language*"
          value={form.targetLang}
          onChange={handleChange}
          required
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          required
        >
          <option value="">Select your level*</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}