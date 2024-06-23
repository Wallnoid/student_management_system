import { usePayments } from "../../paymentsContext";
import OutcomesChart from "./outcome-chart";

export default function GraphTwoContainer() {
  const { outcomePayments } = usePayments();

  return (
    <div className="w-full md:w-1/4 px-1 pt-4 center">
      <div className="border-2 h-80 rounded-md">
      <div className="flex flex-col justify-between text-center font-bold h-full p-4">
      Categorias de Egresos:
      <OutcomesChart payments={outcomePayments}></OutcomesChart>
      </div>
      </div>
    </div>
  );
}