import Link from 'next/link';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="logo">Logo</div>
      <div className="footer-links">
        <Link href="/contact">Contact Us</Link>
        <Link href="/about">About Us</Link>
        <Link href="/help">Help Center</Link>
        <Link href="/blog">Blog Posts</Link>
        <Link href="/feedback">Feedback Form</Link>
      </div>
      <div className="social-icons">
        <a href="#">F</a>
        <a href="#">I</a>
        <a href="#">Y</a>
      </div>
    </footer>
  );
}
