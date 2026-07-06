function ContainerTable({ containers, onStop, onStart, onRestart, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Memory</th>
                    <th>CPU</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {containers.map((container) => (
                    <tr key={container.id}>
                        <td>{container.name}</td>

                        <td>
                            <span
                                className={
                                    container.status === "running"
                                        ? "status-running"
                                        : "status-stopped"
                                }
                            >
                                {container.status}
                            </span>
                        </td>

                        <td>{container.memory} MB</td>

                        <td>{container.cpu}%</td>

                        <td>
                            <div className="action-buttons">
                                {container.status === "running" ? (
                                    <button
                                        className="stop-btn"
                                        onClick={() => onStop(container.id)}
                                    >
                                        Stop
                                    </button>
                                ) : (
                                    <button
                                        className="start-btn"
                                        onClick={() => onStart(container.id)}
                                    >
                                        Start
                                    </button>
                                )}

                                <button
                                    className="restart-btn"
                                    onClick={() => onRestart(container.id)}
                                >
                                    Restart
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(container.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ContainerTable;