import ProductSkeleton from "./ProductSkeleton";
function SkeletonLoader({ count }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-3">
            {Array(count).fill(0).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}

export default SkeletonLoader