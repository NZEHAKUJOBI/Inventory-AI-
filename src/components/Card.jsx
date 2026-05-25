export default function Card({ children, style = {} }) {
  return (
    <div style={{
      background: '#112233',
      border: '1px solid #1e3a5f',
      borderRadius: 12,
      padding: 20,
      ...style
    }}>
      {children}
    </div>
  );
}
