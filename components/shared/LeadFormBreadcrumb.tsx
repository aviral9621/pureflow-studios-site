import { ArrowLeft } from 'lucide-react';

interface LeadFormBreadcrumbProps {
  label: string;
  onBack: () => void;
  onHome: () => void;
  onServices: () => void;
}

export function LeadFormBreadcrumb({ label, onBack, onHome, onServices }: LeadFormBreadcrumbProps) {
  return (
    <div className="absolute top-24 left-6 md:top-28 md:left-10 z-40 flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        <span className="hidden md:inline">Back</span>
      </button>

      <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/45">
        <button type="button" onClick={onHome} className="transition-colors hover:text-white">
          Home
        </button>
        <span>/</span>
        <button type="button" onClick={onServices} className="transition-colors hover:text-white">
          Services
        </button>
        <span>/</span>
        <span className="text-white">{label}</span>
      </nav>
    </div>
  );
}
