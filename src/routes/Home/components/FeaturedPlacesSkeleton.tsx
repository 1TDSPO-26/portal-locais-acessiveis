export function FeaturedPlacesSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      aria-hidden="true"
    >
      <div className="h-64 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
}