import { VITAMIN_SOURCES } from "../data/database";

export default function VitaminLibrary() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-sage font-mono mb-1">Instrument 04</div>
        <h2 className="font-display text-2xl md:text-3xl text-paper">Bibliothèque des vitamines</h2>
        <p className="text-muted text-sm mt-1 max-w-xl">
          Repère rapide des rôles et meilleures sources alimentaires pour les principaux nutriments suivis
          dans le comparateur.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {VITAMIN_SOURCES.map((v) => (
          <div key={v.vitamin} className="bg-panel border border-line rounded-sm p-5">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-lg text-copperLight">{v.vitamin}</h3>
            </div>
            <p className="text-xs text-muted font-mono mb-3">{v.role}</p>
            <div className="tick-divider mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {v.sources.map((s) => (
                <span key={s} className="text-[11px] font-mono px-2 py-1 rounded-sm bg-panel2 border border-line text-sageLight">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
