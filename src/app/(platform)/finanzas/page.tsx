import GraphOneContainer from "./components/graph_1";
import GraphTwoContainer from "./components/graph_2";
import GraphThreeContainer from "./components/graph_3";
import IncomeContainer from "./components/income";
import MainInfoContainer from "./components/main-container/main_info";
import OutcomeContainer from "./components/outcome";

export default function Page() {
  return <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap">
        <MainInfoContainer></MainInfoContainer>
        <GraphOneContainer></GraphOneContainer>
        <GraphTwoContainer></GraphTwoContainer>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap">
        <OutcomeContainer></OutcomeContainer>
        <IncomeContainer></IncomeContainer>
        <GraphThreeContainer></GraphThreeContainer>
      </div>
    </div>
  </>;
}