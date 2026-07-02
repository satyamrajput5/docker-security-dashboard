import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { getSummary, getContainers } from "./services/api";
import SummaryCard from "./components/SummaryCard";
import ContainerTable from "./components/ContainerTable";
import "./App.css"
import"./components/ContainerTable.css"

function App() {

  const [summary, setSummary] = useState(null);

  const [containers, setContainers] = useState([]);

  useEffect(() => {
    async function loadData() {
        const summaryData = await getSummary();
        setSummary(summaryData);

        const containerData = await getContainers();
        setContainers(containerData)
    }

    loadData();
  }, []);

  return (
    <>
      <Navbar />
      {summary && (
        <div className="summary-grid">
          <SummaryCard title="Total Containers" value={summary.total}/>
          <SummaryCard title="Running" value={summary.running} />
          <SummaryCard title="Stopped" value={summary.stopped} />
          <ContainerTable containers={containers}/>
        </div>
    )}
    </>
  );
}

export default App;

