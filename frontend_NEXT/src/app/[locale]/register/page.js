'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './page.module.css';

export default function RegisterPage() {
  const t = useTranslations('Register');
  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    country: '',
    nativeLang: '',
    targetLang: ''
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

    toast.loading(t('loading'), { id: 'register' });

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      toast.success(t('success'), { id: 'register' });
      router.push(`/${locale}?loginModal=1`);
      } else {
      toast.error(t('error'), { id: 'register' });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>{t('title')}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="username"
          placeholder={t('username')}
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder={t('email')}
          value={form.email}
          onChange={handleChange}
          required
        />
        <div className={styles.passwordContainer}>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('password')}
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
          list="country-list"
          name="country"
          placeholder={`${t('country')} (${t('optional')})`}
          value={form.country}
          onChange={handleChange}
        />

        <datalist id="country-list">
          <option value={t('countries.ukraine')} />
          <option value={t('countries.unitedKingdom')} />
          <option value={t('countries.unitedStates')} />
          <option value={t('countries.poland')} />
          <option value={t('countries.france')} />
          <option value={t('countries.germany')} />
          <option value={t('countries.italy')} />
          <option value={t('countries.canada')} />
          <option value={t('countries.spain')} />
          <option value={t('countries.india')} />
          <option value={t('countries.other')} />
        </datalist>


        <select
          name="nativeLang"
          value={form.nativeLang}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">{t('chooseNative')}</option>
          <option value="uk">Українська</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
        </select>

        <select
          name="targetLang"
          value={form.targetLang}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">{t('chooseTarget')}</option>
          <option value="en">English</option>
          <option value="uk">Українська</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
        </select>

        <button type="submit">{t('button')}</button>
      </form>
    </div>
  );
}
