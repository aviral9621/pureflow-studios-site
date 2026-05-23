import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MessageCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import { ViewState } from '../types';
import {
  ChipGrid,
  Choice,
  QuestionScreen,
  StepAmbient,
  StepShell,
  TextField,
} from './shared/StepFormParts';

// ─── Config ──────────────────────────────────────────────────────────────────

interface BookCallPageProps {
  onViewChange: (view: ViewState) => void;
}

const TOTAL_STEPS = 4;

const MEETING_TYPES: Choice[] = [
  { value: 'intro_15', label: '15-min intro chat', sub: 'Quick fit-check. Zero pressure.', icon: Sparkles },
  { value: 'discovery_30', label: '30-min discovery call', sub: 'Real project? Let’s scope it.', icon: Target },
];

// Mon-Sat 10:00 - 19:00, 30-min slots (IST). Adjust freely.
const BUSINESS_DAYS = [1, 2, 3, 4, 5, 6]; // Mon=1 ... Sat=6 (Sun=0 excluded)
const SLOT_START_HOUR = 10;
const SLOT_END_HOUR = 19;
const SLOT_INTERVAL_MIN = 30;
const BOOKING_HORIZON_DAYS = 21;

// In production, fetch booked slots from Supabase. Until then, empty.
const BOOKED_SLOTS: Set<string> = new Set();

// ─── Utilities ───────────────────────────────────────────────────────────────

const pad = (n: number) => String(n).padStart(2, '0');

const formatDateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

const isBusinessDay = (d: Date) => BUSINESS_DAYS.includes(d.getDay());

const isWithinHorizon = (d: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = addDays(today, BOOKING_HORIZON_DAYS);
  return d >= today && d <= end;
};

const generateSlotsForDay = (date: Date): { iso: string; label: string }[] => {
  const slots: { iso: string; label: string }[] = [];
  for (let h = SLOT_START_HOUR; h < SLOT_END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_INTERVAL_MIN) {
      const slot = new Date(date);
      slot.setHours(h, m, 0, 0);
      const iso = slot.toISOString();
      if (BOOKED_SLOTS.has(iso)) continue;
      const label = slot.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      slots.push({ iso, label });
    }
  }
  return slots;
};

const detectTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Asia/Kolkata';
  }
};

// ─── ICS file generation (no server needed) ──────────────────────────────────

const buildIcs = (opts: {
  uid: string;
  title: string;
  description: string;
  startUtc: Date;
  durationMin: number;
  location: string;
}) => {
  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const end = new Date(opts.startUtc.getTime() + opts.durationMin * 60_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pureflow Studios//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${opts.uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(opts.startUtc)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${opts.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
};

const downloadIcs = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const googleCalLink = (title: string, description: string, startUtc: Date, durationMin: number) => {
  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const end = new Date(startUtc.getTime() + durationMin * 60_000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    dates: `${fmt(startUtc)}/${fmt(end)}`,
    location: 'Google Meet — link in calendar invite',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// ─── State ───────────────────────────────────────────────────────────────────

interface BookingForm {
  meetingType: string;
  selectedDate: string; // YYYY-MM-DD
  selectedSlot: string; // ISO string
  name: string;
  email: string;
  whatsapp: string;
  notes: string;
}

const EMPTY: BookingForm = {
  meetingType: '',
  selectedDate: '',
  selectedSlot: '',
  name: '',
  email: '',
  whatsapp: '',
  notes: '',
};

// ─── Page ────────────────────────────────────────────────────────────────────

export const BookCallPage: React.FC<BookCallPageProps> = ({ onViewChange }) => {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<BookingForm>(EMPTY);
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timezone = useMemo(detectTimezone, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    // Scroll the form back to the top so the new step's content is visible.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const meetingTypeData = MEETING_TYPES.find((t) => t.value === form.meetingType);
  const durationMin = form.meetingType === 'discovery_30' ? 30 : 15;
  const selectedSlotDate = form.selectedSlot ? new Date(form.selectedSlot) : null;

  const isStepValid = (): boolean => {
    switch (step) {
      case 0: return !!form.meetingType;
      case 1: return !!form.selectedDate;
      case 2: return !!form.selectedSlot;
      case 3: return form.name.trim().length >= 1 && /^\S+@\S+\.\S+$/.test(form.email);
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      // ─────────────────────────────────────────────────────────────────────
      // CRM webhook — wire to Supabase Edge Function `/api/book` that:
      //   1. Validates the slot is still free (SELECT FROM bookings WHERE scheduled_at = ...)
      //   2. INSERTs into the bookings table
      //   3. (Optional) Sends a Resend confirmation email with the .ics attached
      //   4. (Optional) Schedules a WhatsApp reminder via Botbee
      //
      //   const res = await fetch('/api/book', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ ...form, timezone, durationMin }),
      //   });
      //   if (!res.ok) throw new Error('Booking failed');
      // ─────────────────────────────────────────────────────────────────────

      console.info('[BookCall] payload', { ...form, timezone, durationMin });
      await new Promise((r) => setTimeout(r, 800));
      setDone(true);
    } catch (err) {
      setError('Something glitched. Try again or ping us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  // Enter to continue / submit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || submitting) return;
      if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
        if (isStepValid()) {
          if (step === TOTAL_STEPS - 1) handleSubmit();
          else goNext();
        }
      }
      if (e.key === 'Escape') onViewChange('home');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, form, done, submitting]);

  if (done && selectedSlotDate) {
    return (
      <BookedScreen
        slot={selectedSlotDate}
        durationMin={durationMin}
        meetingLabel={meetingTypeData?.label ?? 'Call'}
        name={form.name}
        notes={form.notes}
        timezone={timezone}
        onViewChange={onViewChange}
      />
    );
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      <StepAmbient />

      <StepShell
        step={step}
        total={TOTAL_STEPS}
        onBack={() => (step === 0 ? onViewChange('home') : goPrev())}
        onClose={() => onViewChange('home')}
        footer={
          <>
            <p className="hidden text-[11.5px] text-white/40 sm:block">
              Press <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-white/70">Enter</kbd> to continue
            </p>
            <button
              type="button"
              onClick={step === TOTAL_STEPS - 1 ? handleSubmit : goNext}
              disabled={!isStepValid() || submitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2f86] via-[#d946ef] to-[#a855f7] px-7 text-[14px] font-bold text-white shadow-[0_10px_40px_-12px_rgba(255,47,134,0.55)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:h-12 sm:w-auto sm:px-8 sm:text-[14.5px]"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Booking…
                </>
              ) : step === TOTAL_STEPS - 1 ? (
                <>
                  Confirm booking
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </>
        }
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={reduced ? false : { opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -direction * 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {step === 0 && (
              <QuestionScreen
                eyebrow="Meeting type"
                title="How long do you need?"
                hint="Both are free. Cameras optional."
              >
                <ChipGrid
                  choices={MEETING_TYPES}
                  value={form.meetingType}
                  onChange={(v) => { setForm({ ...form, meetingType: v }); setTimeout(goNext, 220); }}
                />
              </QuestionScreen>
            )}

            {step === 1 && (
              <QuestionScreen
                eyebrow="Date"
                title="Pick a day."
                hint={`Times shown in ${timezone.replace('_', ' ')}.`}
              >
                <CalendarPicker
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  selectedKey={form.selectedDate}
                  onSelect={(d) => {
                    setForm({ ...form, selectedDate: formatDateKey(d), selectedSlot: '' });
                    setTimeout(goNext, 220);
                  }}
                />
              </QuestionScreen>
            )}

            {step === 2 && form.selectedDate && (
              <QuestionScreen
                eyebrow="Time"
                title="Pick a slot."
                hint={(() => {
                  const d = new Date(form.selectedDate);
                  return d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
                })()}
              >
                <SlotPicker
                  date={new Date(form.selectedDate)}
                  selectedSlot={form.selectedSlot}
                  onSelect={(iso) => {
                    setForm({ ...form, selectedSlot: iso });
                    setTimeout(goNext, 220);
                  }}
                />
              </QuestionScreen>
            )}

            {step === 3 && (
              <QuestionScreen
                eyebrow="Your details"
                title="Last step."
                hint="We'll send the calendar invite to your email."
              >
                <div className="space-y-3.5">
                  <TextField
                    label="Your name"
                    required
                    autoFocus
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <TextField
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    hint="For the calendar invite"
                  />
                  <TextField
                    label="WhatsApp (optional)"
                    type="tel"
                    value={form.whatsapp}
                    onChange={(v) => setForm({ ...form, whatsapp: v })}
                    hint="For a reminder an hour before"
                  />
                  <TextField
                    label="Anything we should know? (optional)"
                    multiline
                    value={form.notes}
                    onChange={(v) => setForm({ ...form, notes: v })}
                  />
                </div>

                {/* Confirmation summary card */}
                {selectedSlotDate && meetingTypeData && (
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#ff3f8d]/25 bg-[#ff3f8d]/[0.06] p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#ff3f8d]/50 bg-black text-[#ff7eb2]">
                      <CalendarIcon className="h-5 w-5" strokeWidth={1.9} />
                    </div>
                    <div className="min-w-0 flex-1 text-[13px] sm:text-[13.5px]">
                      <p className="font-semibold text-white">{meetingTypeData.label}</p>
                      <p className="text-white/65">
                        {selectedSlotDate.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })} ·{' '}
                        {selectedSlotDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </p>
                    </div>
                  </div>
                )}

                {error && <p className="mt-3 text-[12.5px] text-rose-400">{error}</p>}
              </QuestionScreen>
            )}
          </motion.div>
        </AnimatePresence>
      </StepShell>
    </main>
  );
};

// ─── Calendar picker ─────────────────────────────────────────────────────────

const CalendarPicker: React.FC<{
  month: Date;
  onMonthChange: (d: Date) => void;
  selectedKey: string;
  onSelect: (d: Date) => void;
}> = ({ month, onMonthChange, selectedKey, onSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = startOfMonth(month);
  const totalDays = daysInMonth(month);
  const startDay = firstDay.getDay(); // 0..6
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));

  const monthLabel = month.toLocaleString(undefined, { month: 'long', year: 'numeric' });

  // Limits — don't allow navigating past horizon or before this month
  const minMonth = startOfMonth(today);
  const maxDate = addDays(today, BOOKING_HORIZON_DAYS);
  const maxMonth = startOfMonth(maxDate);

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.025] p-4 sm:p-5">
      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          disabled={month.getTime() <= minMonth.getTime()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40 text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-sans text-[15px] font-semibold text-white sm:text-base">{monthLabel}</p>
        <button
          type="button"
          onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          disabled={month.getTime() >= maxMonth.getTime()}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40 text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 sm:gap-1.5 sm:text-[11px]">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={`${d}-${i}`}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const inHorizon = isWithinHorizon(d);
          const isBiz = isBusinessDay(d);
          const isPast = d < today;
          const enabled = inHorizon && isBiz && !isPast;
          const selected = formatDateKey(d) === selectedKey;
          const isToday = isSameDay(d, today);

          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => enabled && onSelect(d)}
              disabled={!enabled}
              className={`relative aspect-square rounded-lg text-[13px] font-medium transition-all sm:text-[14px] ${
                selected
                  ? 'bg-gradient-to-br from-[#ff2f86] to-[#a855f7] text-white shadow-[0_0_20px_-4px_rgba(255,47,134,0.6)]'
                  : enabled
                    ? 'bg-white/[0.04] text-white hover:bg-white/[0.10] hover:scale-105'
                    : 'cursor-not-allowed text-white/15'
              }`}
            >
              {d.getDate()}
              {isToday && !selected && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ff3f8d]" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[11.5px] text-white/40">
        Mon–Sat available. Sundays off.
      </p>
    </div>
  );
};

// ─── Slot picker ─────────────────────────────────────────────────────────────

const SlotPicker: React.FC<{
  date: Date;
  selectedSlot: string;
  onSelect: (iso: string) => void;
}> = ({ date, selectedSlot, onSelect }) => {
  const slots = useMemo(() => generateSlotsForDay(date), [date]);

  if (slots.length === 0) {
    return (
      <div className="rounded-2xl border border-white/12 bg-white/[0.025] p-6 text-center">
        <Clock className="mx-auto mb-3 h-6 w-6 text-white/40" strokeWidth={1.5} />
        <p className="text-[14px] text-white/60">No free slots on this day.</p>
        <p className="mt-1 text-[12px] text-white/40">Try another day or ping us on WhatsApp.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-2.5">
      {slots.map((s) => {
        const selected = selectedSlot === s.iso;
        return (
          <button
            key={s.iso}
            type="button"
            onClick={() => onSelect(s.iso)}
            className={`flex h-12 items-center justify-center rounded-xl border text-[13.5px] font-semibold transition-all sm:h-14 sm:text-[14.5px] ${
              selected
                ? 'border-[#ff3f8d]/70 bg-gradient-to-br from-[#ff3f8d]/20 to-[#a855f7]/15 text-white shadow-[0_0_20px_-8px_rgba(255,47,134,0.6)]'
                : 'border-white/12 bg-white/[0.025] text-white hover:border-white/30 hover:bg-white/[0.05]'
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
};

// ─── Booked screen ───────────────────────────────────────────────────────────

const BookedScreen: React.FC<{
  slot: Date;
  durationMin: number;
  meetingLabel: string;
  name: string;
  notes: string;
  timezone: string;
  onViewChange: (v: ViewState) => void;
}> = ({ slot, durationMin, meetingLabel, name, notes, timezone, onViewChange }) => {
  const dateLabel = slot.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  const timeLabel = slot.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  const uid = `${slot.getTime()}-${(name || 'guest').replace(/\s+/g, '-').toLowerCase()}@pureflowstudios`;
  const title = `${meetingLabel} — Pureflow Studios`;
  const description = `Booked via pureflowstudios.com\n\nGuest: ${name}${notes ? `\nNotes: ${notes}` : ''}`;

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-x-0 top-1/3 mx-auto h-[500px] w-[500px]"
          style={{ background: 'radial-gradient(closest-side, rgba(255,47,134,0.25), transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ff3f8d]/40 bg-gradient-to-br from-[#ff3f8d]/20 to-[#a855f7]/10 shadow-[0_10px_40px_-10px_rgba(255,47,134,0.55)] sm:h-20 sm:w-20"
        >
          <Check className="h-7 w-7 text-white sm:h-9 sm:w-9" strokeWidth={2.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <span className="font-serif italic text-white/95 text-[clamp(1.6rem,3.2vw,2.8rem)] leading-[1.1]">
            You're
          </span>
          <span className="hero-automation-text mt-1 inline-block leading-none text-[clamp(2.2rem,5vw,4.5rem)]" data-text="BOOKED IN.">
            BOOKED IN.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-7 w-full max-w-sm rounded-2xl border border-white/12 bg-white/[0.04] p-5"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{meetingLabel}</p>
          <p className="mt-2 font-sans text-[18px] font-semibold text-white sm:text-[20px]">{dateLabel}</p>
          <p className="mt-1 text-[15px] text-white/70">{timeLabel} · {timezone.replace('_', ' ')}</p>
          <p className="mt-3 text-[12px] text-white/40">
            Calendar invite + Google Meet link will hit your inbox shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-6 grid w-full max-w-sm grid-cols-2 gap-2"
        >
          <a
            href={googleCalLink(title, description, slot, durationMin)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-[12.5px] font-semibold text-white transition-all hover:bg-white/[0.10] hover:border-white/30"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Google
          </a>
          <button
            type="button"
            onClick={() => {
              const ics = buildIcs({ uid, title, description, startUtc: slot, durationMin, location: 'Google Meet' });
              downloadIcs(`pureflow-${slot.getTime()}.ics`, ics);
            }}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 text-[12.5px] font-semibold text-white transition-all hover:bg-white/[0.10] hover:border-white/30"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            .ics file
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="mt-4 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:gap-3"
        >
          <a
            href="https://wa.me/916393640650"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[14px] font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.99]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp now
          </a>
          <button
            onClick={() => onViewChange('home')}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 text-[14px] font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40"
          >
            Back to home
          </button>
        </motion.div>
      </div>
    </main>
  );
};
