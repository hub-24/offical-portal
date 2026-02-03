import React from 'react';

type Theme = {
  id: string;
  label: string;
  logo: string; // path to logo file in /src/assets/logos/
  accent: string; // CSS color (hex)
};

interface Props {
  currentThemeId: string;
  themes: Theme[];
  onSelectTheme: (id: string) => void;
  onToggleDark: () => void;
  isDark: boolean;
}

const ThemeSelector: React.FC<Props> = ({ currentThemeId, themes, onSelectTheme, onToggleDark, isDark }) => {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={onToggleDark} title="Toggle Dark/Light" style={{ padding: 6, borderRadius: 8 }}>
        {isDark ? '🌙' : '🌞'}
      </button>

      <div style={{ display: 'flex', gap: 6 }}>
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => onSelectTheme(t.id)}
            title={t.label}
            style={{
              border: currentThemeId === t.id ? '2px solid #fff' : '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              padding: 6,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <img src={t.logo} alt={t.label} style={{ width: 28, height: 28, objectFit: 'contain' }} />
            <span style={{ color: '#fff', fontSize: 12 }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export type { Theme };
export default ThemeSelector;
