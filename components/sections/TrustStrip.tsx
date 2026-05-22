const CLIENTS = [
  'T.S. Associates',
  'Roadlink Tourism',
  'Farineaux Travels',
  'Strataloom Research',
  'Spectrum Tour Travels',
  'The Himalayan Nest',
  'Herbal Vantage',
  'Quick Hotels',
];

export function TrustStrip() {
  return (
    <section
      aria-label="Client names"
      className="relative overflow-hidden border-y border-white/5 bg-black py-10 md:py-12"
    >
      <div className="mx-auto w-full max-w-[1880px] px-5">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.52em] text-white/42 md:text-[13px]">
          Trusted by ambitious teams across India
        </p>

        <div className="trust-marquee mt-12" aria-hidden="true">
          <div className="trust-marquee__track">
            {[0, 1].map((set) => (
              <div className="trust-marquee__group" key={set}>
                {CLIENTS.map((client) => (
                  <div
                    key={`${client}-${set}`}
                    className="trust-marquee__item whitespace-nowrap text-center font-display text-[18px] uppercase leading-none tracking-tight text-white md:text-[21px]"
                  >
                    {client}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
