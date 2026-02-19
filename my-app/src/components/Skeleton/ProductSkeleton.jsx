function ProductSkeleton() {
  return (
    <div className="
      bg-white rounded-2xl 
      p-4 sm:p-5 md:p-6
      shadow-lg 
      flex flex-col items-center text-center
      animate-pulse
    ">

      {/* image */}
      <div className="w-full flex justify-center mb-3 sm:mb-4">
        <div className="
          w-[38vw] h-[22vh]
          sm:w-[30vw] sm:h-[24vh]
          md:w-[14vw] md:h-[26vh]
          bg-gray-200 rounded-lg
        " />
      </div>

      {/* title */}
      <div className="h-4 bg-gray-200 rounded w-[20vw] mb-2" />

      {/* price */}
      <div className="h-5 bg-gray-200 rounded w-16 mt-1 sm:mt-2" />

      {/* button placeholder (optional) */}
      <div className="h-8 bg-gray-200 rounded w-24 mt-3 sm:mt-4" />

    </div>
  );
}
export default ProductSkeleton
