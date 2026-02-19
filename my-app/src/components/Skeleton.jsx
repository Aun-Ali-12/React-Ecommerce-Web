import ProductSkeleton from "./Skeleton/ProductSkeleton"
function SkeletonLoader({ count }) {
    return (
        <>
            {Array(count).fill(0).map((_, i) => (
                <div key={i}>
                    <ProductSkeleton />
                </div>
            ))}
        </>
    );
}

export default SkeletonLoader