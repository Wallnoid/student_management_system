import ActionsRow from "./actions_row";

export default function MainInfoContainer() {
  return (
    <div className="w-full md:w-1/2 px-1 pt-4">
      <div className="border-2 h-80 rounded-md">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h2 className="text-lg font-semibold">Información general</h2>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Ingresos</p>
                <p className="text-lg font-semibold">$ 10,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Egresos</p>
                <p className="text-lg font-semibold">$ 5,000</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Balance</p>
            <p className="text-lg font-semibold">$ 5,000</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 font-bold">Acciones Rapidas:</p>
            <ActionsRow></ActionsRow>
          </div>
        </div>
      </div>
    </div>
  );
}