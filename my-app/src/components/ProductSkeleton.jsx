function ProductSkeleton() {
  return (
    <div className="border p-3 rounded-lg shadow bg-white animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-md mb-3" />  {/* Image */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />       {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-1/4" />           {/* Price */}
    </div>
  );
}
export default ProductSkeleton