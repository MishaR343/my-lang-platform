// filepath: c:\Users\user\Desktop\my-lang-platform\frontend_NEXT\src\app\layout.js
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'My App',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}