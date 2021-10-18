const ShiftBy: React.FC<{ x?: number; y?: number }> = ({
  x = 0,
  y = 0,
  ...children
}) => (
  <div
    style={{
      transform: `translate(${x}px, ${y}px)`,
    }}
  >
    {children}
  </div>
);
export default ShiftBy;
