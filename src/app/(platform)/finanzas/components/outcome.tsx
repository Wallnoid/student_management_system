import { usePayments } from "../paymentsContext";

export default function OutcomeContainer() {
  const { outcomePayments } = usePayments();

  const getOutcome = () => {
    if (!outcomePayments) {
      return -1;
    }
    let totalOutcome = 0;

    outcomePayments.forEach(payment => {
      totalOutcome += payment.monto;
    });

    return totalOutcome.toFixed(2);
  }

  const getMensualOutcome = () => {
    if (!outcomePayments) {
      return -1;
    }
    const now = new Date();
    let totalOutcome = 0;
  
    outcomePayments.forEach(payment => {
      const paymentDate = new Date(payment.fecha_hora_creacion);
      if (paymentDate.getFullYear() === now.getFullYear() && paymentDate.getMonth() === now.getMonth()) {
        totalOutcome += payment.monto;
      }
    });
  
    return totalOutcome.toFixed(2);
  }

  const getAnualOutcome = () => {
    if (!outcomePayments) {
      return -1;
    }
    const now = new Date();
    let totalOutcome = 0;
  
    outcomePayments.forEach(payment => {
      const paymentDate = new Date(payment.fecha_hora_creacion);
      if (paymentDate.getFullYear() === now.getFullYear()) {
        totalOutcome += payment.monto;
      }
    });
  
    return totalOutcome.toFixed(2);
  }
  

  return (
    <div className="w-full md:w-1/4 px-1 py-1 pb-2">
      <div className="border-2 h-64 rounded-md ">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h2 className="text-lg font-semibold">Egresos</h2>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Egresos totales</p>
                <p className="text-lg font-semibold">$ {getOutcome().toString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Egresos mensuales</p>
                <p className="text-lg font-semibold">$ {getMensualOutcome().toString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Egresos anuales</p>
            <p className="text-lg font-semibold">$ {getAnualOutcome().toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}