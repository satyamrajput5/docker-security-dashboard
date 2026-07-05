import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { getSummary, getContainers, stopContainer, startContainer, restartContainer, deleteContainer } from "./services/api";
import SummaryCard from "./components/SummaryCard";
import ContainerTable from "./components/ContainerTable";
import "./App.css"
import"./components/ContainerTable.css"

function App() {

  const [summary, setSummary] = useState(null);

  const [containers, setContainers] = useState([]);

  async function loadData() {
      const summaryData = await getSummary();
      setSummary(summaryData);
      const containerData = await getContainers();
      setContainers(containerData)
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
        loadData();
    }, 5000);

    return () => clearInterval(interval);
    }, []);

  async function handleStop(containerId) {
    await stopContainer(containerId);
    await loadData();
}

async function handleStart(containerId) {
  await startContainer(containerId);
  await loadData();
}

async function handleRestart(containerId) {
  try {
      const response = await restartContainer(containerId);

      console.log(response.message);

      await loadData();
  } catch (error) {
      console.error("Failed to restart container:", error);
  }
}

async function handleDelete(containerId) {
  const confirmed = window.confirm(
      "Are you sure you want to delete this container?"
  );

  if (!confirmed) {
      return;
  }

  await deleteContainer(containerId);
  await loadData();
}

  return (
    <>
      <Navbar />
      {summary && (
        <div className="summary-grid">
          <SummaryCard title="Total Containers" value={summary.total}/>
          <SummaryCard title="Running" value={summary.running} />
          <SummaryCard title="Stopped" value={summary.stopped} />
          <ContainerTable 
          containers={containers}
          onStop={handleStop}
          onStart={handleStart}
          onRestart={handleRestart}
          onDelete={handleDelete}
          />
        </div>
    )}
    </>
  );
}

export default App;

