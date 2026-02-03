import React from 'react';
import ThemeSelector, { Theme } from './ThemeSelector';

interface Props {
  logoPath: string;
  isDark: boolean;
  onToggleDark: () => void;
  currentThemeId: string;
  themes: Theme[];
  onSelectTheme: (id: string) => void;
  onProfileClick?: () => void;
}

const TopBar: React.FC<Props> = ({ logoPath, isDark, onToggleDark, themes, currentThemeId, onSelectTheme, onProfileClick }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: isDark ? '#04050a' : '#fff', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={logoPath} alt="H-24 Logo" style={{ height: 40 }} />
        <div style={{ fontWeight: 800, color: isDark ? '#fff' : '#111' }}>HUB-24</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ThemeSelector currentThemeId={currentThemeId} themes={themes} onSelectTheme={onSelectTheme} onToggleDark={onToggleDark} isDark={isDark} />
        <button onClick={onProfileClick} style={{ padding: '8px 12px', borderRadius: 8, background: isDark ? '#0b63ff' : '#0b63ff', color: '#fff', border: 'none' }}>
          Profile
        </button>
      </div>
    </header>
  );
};

export default TopBar;
