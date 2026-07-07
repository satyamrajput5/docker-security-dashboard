function NetworkTable({ networks }) {
    return (
        <>
        <h2>Docker Networks</h2>
        <table>
            <thead>
                <tr>
                    <th>Network Name</th>
                    <th>Driver</th>
                    <th>Scope</th>
                </tr>
            </thead>

            <tbody>
                {networks.map((network) => (
                    <tr key={network.name}>
                        <td>{network.name}</td>
                        <td>{network.driver}</td>
                        <td>{network.scope}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default NetworkTable;