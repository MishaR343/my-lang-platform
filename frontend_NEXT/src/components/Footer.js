import Link from 'next/link';
import FacebookIcon from '/public/footer/Facebook.svg';
import InstagramIcon from '/public/footer/Instagram.svg';
import YoutubeIcon from '/public/footer/Youtube.svg';  
import XIcon from '/public/footer/X.svg';
import LogoIcon from '/public//Logo.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="logo">      
        <a href="#" ><LogoIcon className="logo" /></a>
      </div>
      <div className="footer-links">
        <Link href="/contact">Contact Us</Link>
        <Link href="/about">About Us</Link>
        <Link href="/help">Help Center</Link>
        <Link href="/blog">Blog Posts</Link>
        <Link href="/feedback">Feedback Form</Link>
      </div>
      <div className="social-icons">
        <a href="#" ><FacebookIcon className="social-icon" /></a>
        <a href="#" ><InstagramIcon className="social-icon" /></a>
        <a href="#" ><YoutubeIcon className="social-icon" /></a>
        <a href="#" ><XIcon className="social-icon" /></a>
      </div>
    </footer>
  );
}
