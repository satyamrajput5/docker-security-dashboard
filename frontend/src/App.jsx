import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { getSummary, getContainers, stopContainer, startContainer, restartContainer, deleteContainer, getImages, getSecurity, getVolumes, getNetworks, getContainerLogs } from "./services/api";
import SummaryCard from "./components/SummaryCard";
import ContainerTable from "./components/ContainerTable";
import ImageTable from "./components/ImageTable";
import SecurityTable from "./components/SecurityTable";
import NetworkTable from "./components/NetworkTable";
import LogsModal from "./components/LogsModal";
import "./App.css"
import"./components/ContainerTable.css"
import VolumeTable from "./components/VolumeTable";

function App() {

  const [summary, setSummary] = useState(null);

  const [containers, setContainers] = useState([]);

  const [images, setImages] = useState([]);

  const [security, setSecurity] = useState([]);

  const [networks, setNetworks] = useState([]);

  const [volumes, setVolumes] = useState([]);

  const [logs, setLogs] = useState("");

  const [showLogs, setShowLogs] = useState(false);

  async function loadData() {
      const summaryData = await getSummary();
      setSummary(summaryData);

      const containerData = await getContainers();
      setContainers(containerData)

      const imageData = await getImages();
      setImages(imageData);

      const securityData = await getSecurity();
      setSecurity(securityData);

      const networkData = await getNetworks();
      setNetworks(networkData);

      const volumeData = await getVolumes(); 
      setVolumes(volumeData);
      
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

async function handleLogs(containerId) {
  const data = await getContainerLogs(containerId);

  setLogs(data.logs);
  setShowLogs(true);
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
          onLogs={handleLogs}
          />
          <div className="images-section">
          <h2>Docker Images</h2>

          <ImageTable images={images} />
        </div>

        <div className="security-section">
        <h2>Container Security</h2>
        <SecurityTable security={security}/>
        </div>
        <NetworkTable networks={networks} />
        <VolumeTable volumes={volumes}/>
        </div>
    )}

        {showLogs && (
        <LogsModal
          logs={logs}
          onClose={() => setShowLogs(false)}
        />
      )}

    </>
  );
}

export default App;

