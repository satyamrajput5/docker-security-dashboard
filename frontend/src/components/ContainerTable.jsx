function ContainerTable({containers}) {

    return (
        <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
        </>
    );
}

export default ContainerTable;