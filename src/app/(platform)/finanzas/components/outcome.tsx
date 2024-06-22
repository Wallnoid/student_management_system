export default function OutcomeContainer() {
  return (
    <div className="w-full md:w-1/4 px-1 py-1 pb-2">
      <div className="border-2 h-64 rounded-md ">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h2 className="text-lg font-semibold">Egresos</h2>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Egresos totales</p>
                <p className="text-lg font-semibold">$ 5,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Egresos mensuales</p>
                <p className="text-lg font-semibold">$ 2,500</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Egresos anuales</p>
            <p className="text-lg font-semibold">$ 30,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}