import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#010204', color: '#9aa', padding: 48, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 8 }}>DR-AI ECOSYSTEM</h4>
        <p style={{ color: '#7a7a7a', margin: '6px 0' }}>Ceo@eldoctooor.ae | +971 52 270 9300</p>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>
          * Legal & Medical Disclaimer: The platforms and AI agents are developed for educational, research, and operational support purposes. AI outputs regarding medical diagnoses are probabilistic and should NOT replace professional medical advice.
        </p>
        <p style={{ marginTop: 18, color: '#444', fontSize: 13 }}>© 2026 Dr-AI by Mostafa Elmourabea. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;