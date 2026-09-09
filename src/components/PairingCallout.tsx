type PairingCalloutProps = {
  wine: string;
  cheese: string;
  whyItWorks: string;
  servingTips: string;
};

export default function PairingCallout({
  wine,
  cheese,
  whyItWorks,
  servingTips,
}: PairingCalloutProps) {
  return (
    <aside
      className="my-8 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-cream-dark to-cream shadow-sm"
      aria-label="Pairing callout"
    >
      <div className="border-b border-gold/30 bg-burgundy px-5 py-3">
        <p className="font-serif text-lg font-semibold tracking-wide text-gold-light">
          Pairing callout
        </p>
      </div>
      <dl className="grid gap-4 p-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-xs font-semibold uppercase tracking-wider text-gold">
            Wine
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink">{wine}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-xs font-semibold uppercase tracking-wider text-gold">
            Cheese
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink">{cheese}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wider text-gold">
            Why it works
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink">{whyItWorks}</dd>
        </div>
        <div className="sm:col-span-2 rounded-xl bg-burgundy/5 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-wider text-burgundy">
            Serving tips
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink/90">
            {servingTips}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
