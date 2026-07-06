function LogsModal({ logs, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">

                <div className="modal-header">
                    <h2>Container Logs</h2>

                    <button onClick={onClose}>
                        ✕
                    </button>
                </div>

                <pre className="logs-box">
                    {logs}
                </pre>

            </div>
        </div>
    );
}

export default LogsModal;