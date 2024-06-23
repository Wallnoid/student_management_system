import { get } from "http";
import { usePayments } from "../../paymentsContext";
import ActionsRow from "./actions_row";

export default function MainInfoContainer() {
  const { contestPayments, eventPayments, variousPayments } = usePayments();


  const getIncome = () => {
    if (!contestPayments || !eventPayments || !variousPayments) {
      return -1;
    }
    let totalIncome = 0;
  
    const addIncome = (payments) => {
      payments
        .filter(payment => payment.tipo === "ingreso")
        .forEach(payment => {
          totalIncome += payment.monto;
        });
    };
  
    addIncome(contestPayments);
    addIncome(eventPayments);
    addIncome(variousPayments);
    return totalIncome;
  }

  const getOutcome = () => {
    if (!contestPayments || !eventPayments || !variousPayments) {
      return -1;
    }
    let totalOutcome = 0;
  
    const addOutcome = (payments) => {
      payments
        .filter(payment => payment.tipo === "egreso")
        .forEach(payment => {
          totalOutcome += payment.monto;
        });
    };
  
    addOutcome(contestPayments);
    addOutcome(eventPayments);
    addOutcome(variousPayments);
  
    return totalOutcome;
  }
  
  const getBalance = () => {
    const total = getIncome() - getOutcome()
    return total.toFixed(2);
  }

  return (
    <div className="w-full md:w-1/2 px-1 pt-4">
      <div className="border-2 h-80 rounded-md">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h2 className="text-lg font-semibold">Información general</h2>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Ingresos</p>
                <p className="text-lg font-semibold">$ {getIncome() === -1 ? "0" : getIncome().toFixed(2).toString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Egresos</p>
                <p className="text-lg font-semibold">$ {getOutcome() === -1 ? "0" : getOutcome().toFixed(2).toString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Balance</p>
            <p className="text-lg font-semibold">$ {getBalance().toString()}</p>
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