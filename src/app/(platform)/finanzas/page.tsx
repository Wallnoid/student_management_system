export default function Page() {
  return <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-1 pt-4">
          <div className="border-2 h-80 rounded-md">Container 1</div>
        </div>
        <div className="w-full md:w-1/4 px-1 pt-4">
          <div className="border-2 h-80 rounded-md">Container 2</div>
        </div>
        <div className="w-full md:w-1/4 px-1 pt-4">
          <div className="border-2 h-80 rounded-md">Container 3</div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 px-1 py-1 pb-2">
          <div className="border-2 h-64 rounded-md ">Container 1</div>
        </div>
        <div className="w-full md:w-1/4 px-1 py-1 pb-2">
          <div className="border-2 h-64 rounded-md">Container 2</div>
        </div>
        <div className="w-full md:w-1/2 px-1 py-1 pb-2">
          <div className="border-2 h-64 rounded-md">Container 3</div>
        </div>
      </div>
    </div>
  </>;
}