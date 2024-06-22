"use client";
import { useEffect, useState } from "react";
import GraphOneContainer from "./components/income-list-container/graph_1";
import GraphTwoContainer from "./components/outcome-list-container/graph_2";
import GraphThreeContainer from "./components/balance-graph/balance-graph";
import IncomeContainer from "./components/income";
import MainInfoContainer from "./components/main-container/main_info";
import OutcomeContainer from "./components/outcome";
import BalanceGraphContainer from "./components/balance-graph/balance-graph";
import { Payments } from "@/interfaces/Payments";
import { getAllPayments } from "@/services/payments.service";
import { PaymentsProvider } from "./paymentsContext";

export default function Page() {
  const [contestPayments, setContestPayments] = useState<Payments[]>();
  const [eventPayments, setEventPayments] = useState<Payments[]>();
  const [variousPayments, setVariousPayments] = useState<Payments[]>();
  const[incomePayments, setIncomePayments] = useState<Payments[]>();
  const[outcomePayments, setOutcomePayments] = useState<Payments[]>();


  useEffect(() => {
    const fetchPayments = async () => {
      const contestData = await getAllPayments("concursos");
      const eventData = await getAllPayments("eventos");
      const variousData = await getAllPayments("varios");

      // Add category to each payment
      const contestPaymentsWithCategory = contestData.map(payment => ({ ...payment, categoria: "concurso" }));
      const eventPaymentsWithCategory = eventData.map(payment => ({ ...payment, categoria: "evento" }));
      const variousPaymentsWithCategory = variousData.map(payment => ({ ...payment, categoria: "varios" }));

      setContestPayments(contestPaymentsWithCategory);
      setEventPayments(eventPaymentsWithCategory);
      setVariousPayments(variousPaymentsWithCategory);

      const allPayments = [...contestPaymentsWithCategory, ...eventPaymentsWithCategory, ...variousPaymentsWithCategory];
      const filteredIncomePayments = allPayments.filter(payment => payment.tipo === "ingreso");
      const filteredOutcomePayments = allPayments.filter(payment => payment.tipo === "egreso");

      setIncomePayments(filteredIncomePayments);
      setOutcomePayments(filteredOutcomePayments);
    };

    fetchPayments();
  }, []);

  return (
    <PaymentsProvider value={{ contestPayments, eventPayments, variousPayments, incomePayments, outcomePayments }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap">
          <MainInfoContainer />
          <GraphOneContainer />
          <GraphTwoContainer />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap">
          <OutcomeContainer />
          <IncomeContainer />
          <BalanceGraphContainer />
        </div>
      </div>
    </PaymentsProvider>
  );
}
