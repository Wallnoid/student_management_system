// paymentsContext.tsx
import { createContext, useContext } from "react";
import { Payments } from "@/interfaces/Payments";

interface PaymentsContextProps {
  contestPayments?: Payments[];
  eventPayments?: Payments[];
  variousPayments?: Payments[];
  incomePayments?: Payments[];
  outcomePayments?: Payments[];
}

const PaymentsContext = createContext<PaymentsContextProps | undefined>(undefined);

export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error("usePayments must be used within a PaymentsProvider");
  }
  return context;
};

export const PaymentsProvider = PaymentsContext.Provider;
