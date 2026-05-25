import { useTheme } from '../theme/ThemeContext';

export default function Card({ children, style = {} }) {
  const { colors } = useTheme();
  return (
    <div style={{
      background: colors.cardBg,
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: 20,
      ...style
    }}>
      {children}
    </div>
  );
}
