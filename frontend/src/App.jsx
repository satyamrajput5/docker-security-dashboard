import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { getSummary } from "./services/api";
import SummaryCard from "./components/SummaryCard";

function App() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function loadSummary() {
        const data = await getSummary();
        setSummary(data);
    }

    loadSummary();
  }, []);

  return (
    <>
      <Navbar />
      {summary && (
        <div className="summary-grid">
          <SummaryCard title="Total Containers" value={summary.total}/>
          <SummaryCard title="Running" value={summary.running} />
          <SummaryCard title="Stopped" value={summary.stopped} />
        </div>
    )}
    </>
  );
}

export default App;

