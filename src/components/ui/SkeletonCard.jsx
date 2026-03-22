export function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton" style={{ aspectRatio: '16/9' }} />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="flex gap-2 mt-1">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton" style={{ height: '400px' }} />
      <div className="p-6 flex flex-col gap-4">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-8 w-full rounded" />
        <div className="skeleton h-8 w-4/5 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex gap-4 py-4 border-b" style={{ borderColor: 'var(--bd)' }}>
      <div className="skeleton flex-shrink-0" style={{ width: '96px', height: '72px', borderRadius: '6px' }} />
      <div className="flex-1 flex flex-col gap-2.5">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-28 rounded" />
      </div>
    </div>
  )
}
