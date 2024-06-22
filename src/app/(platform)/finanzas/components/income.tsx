import { usePayments } from "../paymentsContext";

export default function IncomeContainer() {
  const { incomePayments } = usePayments();

  console.log(incomePayments);


  const getIncome = () => {
    if (!incomePayments) {
      return -1;
    }
    let totalIncome = 0;

    incomePayments.forEach(payment => {
      totalIncome += payment.monto;
    });

    return totalIncome.toFixed(2);
  }

  const getMensualIncome = () => {
    if (!incomePayments) {
      return -1;
    }
    const now = new Date();
    let totalIncome = 0;
  
    incomePayments.forEach(payment => {
      const paymentDate = new Date(payment.fecha_hora_creacion);
      if (paymentDate.getFullYear() === now.getFullYear() && paymentDate.getMonth() === now.getMonth()) {
        totalIncome += payment.monto;
      }
    });
  
    return totalIncome.toFixed(2);
  }

  const getAnualIncome = () => {
    if (!incomePayments) {
      return -1;
    }
    const now = new Date();
    let totalIncome = 0;
  
    incomePayments.forEach(payment => {
      const paymentDate = new Date(payment.fecha_hora_creacion);
      if (paymentDate.getFullYear() === now.getFullYear()) {
        totalIncome += payment.monto;
      }
    });
  
    return totalIncome.toFixed(2);
  }
  


  return (
    <div className="w-full md:w-1/4 px-1 py-1 pb-2">
      <div className="border-2 h-64 rounded-md">
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <h2 className="text-lg font-semibold">Ingresos</h2>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Ingresos totales</p>
                <p className="text-lg font-semibold">$ {getIncome().toString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ingresos mensuales</p>
                <p className="text-lg font-semibold">$ {getMensualIncome().toString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Ingresos anuales</p>
            <p className="text-lg font-semibold">$ {getAnualIncome().toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}