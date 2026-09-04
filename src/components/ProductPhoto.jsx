import { useState } from 'react';

export default function ProductPhoto({ src, alt, className = '', fallback = '🍽️' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-panel2 ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-panel2 to-panel">{fallback}</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
}
