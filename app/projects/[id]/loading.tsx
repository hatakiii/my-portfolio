export default function LoadingProjectDetail() {
  return (
    <main className="project-detail-page">
      <div className="container project-detail-shell">
        <div className="skeleton" style={{ width: '160px', height: '44px' }} />

        <section className="project-detail-hero">
          <div className="project-detail-copy" style={{ gap: '16px' }}>
            <div className="skeleton" style={{ width: '120px', height: '14px' }} />
            <div className="skeleton" style={{ width: '70%', height: '56px' }} />
            <div className="skeleton" style={{ width: '100%', height: '96px' }} />
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div className="skeleton" style={{ width: '160px', height: '46px' }} />
              <div className="skeleton" style={{ width: '140px', height: '46px' }} />
            </div>
          </div>
          <div className="skeleton" style={{ minHeight: '360px', borderRadius: 'var(--radius-lg)' }} />
        </section>

        <section className="project-meta-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeleton" style={{ height: '116px' }} />
          ))}
        </section>

        <section className="project-detail-sections">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton" style={{ height: '180px' }} />
          ))}
        </section>
      </div>
    </main>
  )
}
