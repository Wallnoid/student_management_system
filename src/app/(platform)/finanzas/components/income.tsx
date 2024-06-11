export default function IncomeContainer() {
  return (
    <div className="w-full md:w-1/4 px-1 py-1 pb-2">
      <div className="border-2 h-64 rounded-md">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h2 className="text-lg font-semibold">Ingresos</h2>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Ingresos totales</p>
                <p className="text-lg font-semibold">$ 10,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ingresos mensuales</p>
                <p className="text-lg font-semibold">$ 5,000</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Ingresos anuales</p>
            <p className="text-lg font-semibold">$ 60,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}