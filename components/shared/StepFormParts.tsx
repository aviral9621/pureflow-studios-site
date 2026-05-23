import React from 'react';
import { Check } from 'lucide-react';

export interface Choice {
  value: string;
  label: string;
  sub?: string;
  icon?: React.ElementType;
}

// ─── QuestionScreen ──────────────────────────────────────────────────────────

export const QuestionScreen: React.FC<{
  eyebrow: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, hint, children }) => (
  <>
    <p className="gradient-flow-text text-[10px] font-bold uppercase tracking-[0.22em]">{eyebrow}</p>
    <h1 className="mt-3 font-sans text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.015em] text-white sm:text-[2.1rem] md:text-[2.4rem]">
      {title}
    </h1>
    {hint && <p className="mt-2 text-[13.5px] text-white/50 sm:text-[14px]">{hint}</p>}
    <div className="mt-7 sm:mt-9">{children}</div>
  </>
);

// ─── ChipGrid ────────────────────────────────────────────────────────────────

export const ChipGrid: React.FC<{
  choices: Choice[];
  value: string;
  onChange: (v: string) => void;
}> = ({ choices, value, onChange }) => (
  <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
    {choices.map((c) => {
      const selected = value === c.value;
      const Icon = c.icon;
      return (
        <button
          key={c.value}
          type="button"
          onClick={() => onChange(c.value)}
          className={`group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 sm:gap-4 sm:p-5 ${
            selected
              ? 'border-[#ff3f8d]/70 bg-gradient-to-br from-[#ff3f8d]/15 to-[#a855f7]/10 shadow-[0_0_30px_-12px_rgba(255,47,134,0.6)]'
              : 'border-white/12 bg-white/[0.025] hover:border-white/30 hover:bg-white/[0.05]'
          }`}
        >
          {Icon && (
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border bg-black transition-colors sm:h-11 sm:w-11 ${
                selected ? 'border-[#ff3f8d]/70 text-white' : 'border-white/85 text-white'
              }`}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.9} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[14.5px] font-semibold leading-tight tracking-[-0.005em] text-white sm:text-[15.5px]">
              {c.label}
            </p>
            {c.sub && <p className="mt-0.5 text-[12.5px] text-white/50 sm:text-[13px]">{c.sub}</p>}
          </div>
          <div
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
              selected ? 'border-[#ff3f8d] bg-[#ff3f8d] text-white' : 'border-white/25'
            }`}
          >
            {selected && <Check className="h-3 w-3" strokeWidth={3} />}
          </div>
        </button>
      );
    })}
  </div>
);

// ─── TextField ───────────────────────────────────────────────────────────────

export const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
  hint?: string;
  autoFocus?: boolean;
  type?: 'text' | 'email' | 'tel';
}> = ({ label, value, onChange, required, multiline, hint, autoFocus, type = 'text' }) => {
  const baseClass =
    'peer w-full rounded-xl border border-white/12 bg-black/40 px-4 pb-2.5 pt-5 text-[14.5px] text-white placeholder-transparent transition-colors duration-200 focus:border-[#ff3f8d]/60 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-[#ff3f8d]/20 sm:text-[15px]';

  return (
    <label className="relative block">
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={baseClass}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
        {label}
        {required && <span className="ml-0.5 text-[#ff3f8d]">*</span>}
      </span>
      {hint && <span className="mt-1.5 block text-[11px] text-white/40">{hint}</span>}
    </label>
  );
};

// ─── StepShell — wraps progress + back + close header common to multi-step pages

export const StepShell: React.FC<{
  step: number;
  total: number;
  onBack: () => void;
  onClose: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
}> = ({ step, total, onBack, onClose, children, footer }) => {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col px-5 pb-6 pt-20 sm:px-6 sm:pt-24">
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-1.5 text-[12px] text-white/55 transition-colors hover:text-white sm:text-[13px]"
        >
          <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {step === 0 ? 'Home' : 'Back'}
        </button>

        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">
          {String(step + 1).padStart(2, '0')} <span className="text-white/25">/ {String(total).padStart(2, '0')}</span>
        </div>

        <button
          onClick={onClose}
          className="text-[12px] text-white/45 transition-colors hover:text-white sm:text-[13px]"
        >
          Close
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-9 h-[3px] w-full overflow-hidden rounded-full bg-white/10 sm:mb-12">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ff2f86] via-[#d946ef] to-[#a855f7] transition-[width] duration-500"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* Step body */}
      <div className="relative flex-1">{children}</div>

      {/* Footer */}
      <div className="sticky bottom-0 mt-8 flex flex-col gap-2.5 bg-gradient-to-t from-black via-black/95 to-transparent pb-2 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {footer}
      </div>
    </div>
  );
};

// ─── Ambient bg — purple/pink blooms used by all step pages

export const StepAmbient: React.FC = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-brand/[0.06] rounded-full blur-[140px]" />
    <div
      className="absolute bottom-[-15%] left-[-10%] h-[460px] w-[460px]"
      style={{ background: 'radial-gradient(closest-side, rgba(255,32,160,0.18), transparent 70%)', filter: 'blur(50px)' }}
    />
    <div
      className="absolute bottom-[-15%] right-[-10%] h-[460px] w-[460px]"
      style={{ background: 'radial-gradient(closest-side, rgba(164,82,255,0.18), transparent 70%)', filter: 'blur(50px)' }}
    />
  </div>
);
