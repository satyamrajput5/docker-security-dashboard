function ContainerTable({containers, onStop, onStart, onRestart}) {

    return (
        <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {containers.map(container =>(
                            <tr key={container.name}>
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
                                <td>
                                {container.status === "running" ? (
                                    <>
                                        <button onClick={() => onStop(container.id)}>
                                            Stop
                                        </button>

                                        <button onClick={() => onRestart(container.id)}>
                                            Restart
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => onStart(container.id)}>
                                        Start
                                    </button>
                                )}
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </>
    );
}

export default ContainerTable;