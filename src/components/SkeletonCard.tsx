const SkeletonCard = () => {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="aspect-project skeleton" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 skeleton rounded" />
          <div className="h-5 w-16 skeleton rounded" />
        </div>
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-12 skeleton rounded" />
          <div className="h-6 w-14 skeleton rounded" />
          <div className="h-6 w-10 skeleton rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
