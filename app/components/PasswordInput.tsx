import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label htmlFor="password" className="rpg-label">
        Contrasenya
      </label>
      <div className="relative">
        <input
          id="password"
          name="password"
          // Canviem el tipus dinàmicament
          type={showPassword ? 'text' : 'password'}
          required
          // Afegim 'pr-10' (padding-right) perquè el text no es solapi amb la icona
          className="rpg-input pr-10"
          placeholder="••••••••"
        />
        <button
          type="button" // Important: type="button" per evitar que enviï el formulari
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-wood-dark/60 hover:text-wood-dark transition-colors cursor-pointer outline-none"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
    </div>
  );
}
