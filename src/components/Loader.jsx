export default function Loader({ size = 48 }) {
  return (
    /* full-screen overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-#f5f5f5">
      {/* selve spinneren */}
      <div
        className="rounded-full border-4 border-primary border-t-transparent animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
