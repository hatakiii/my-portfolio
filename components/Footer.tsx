export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} Khatanbaatar — Built with{' '}
          <span className="footer-heart">♥</span> using Next.js & MongoDB
        </p>
        <p style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Designed & Developed by Khatanbaatar
        </p>
      </div>
    </footer>
  )
}
