"use client";

interface RecipeStepsProps {
  steps: {
    step: number;
    title: string;
    description: string;
    tips?: string;
    duration: string;
  }[];
}

export default function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((s) => (
        <div
          key={s.step}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
        >
          {/* Step header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
              {s.step}
            </span>
            <span className="text-sm font-medium text-white">{s.title}</span>
            <span className="ml-auto text-xs text-white/40">{s.duration}</span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/70 pl-9">
            {s.description}
          </p>

          {/* Tips */}
          {s.tips && (
            <div className="mt-2 ml-9 flex gap-2 rounded-lg bg-amber-500/10 px-3 py-2">
              <span className="shrink-0 text-amber-400">💡</span>
              <p className="text-xs leading-relaxed text-amber-200/80">
                {s.tips}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
