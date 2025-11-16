export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
      <div className="flex gap-5 p-6">
        <div className="w-40 h-40 flex-shrink-0 bg-gray-200 rounded-lg" />

        <div className="flex-1 min-w-0 flex flex-col space-y-3">
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>

          <div className="h-6 bg-gray-200 rounded w-32" />

          <div className="grid grid-cols-2 gap-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded w-32" />
                <div className="h-6 bg-gray-200 rounded w-24" />
              </div>
              <div className="h-12 bg-gray-200 rounded w-40" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
        <div className="h-3 bg-gray-200 rounded w-32" />
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}
