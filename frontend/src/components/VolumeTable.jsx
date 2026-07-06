function VolumeTable({ volumes }) {
    return (
        <div className="table-section">
            <h2>Docker Volumes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Volume Name</th>
                        <th>Driver</th>
                        <th>Mount Point</th>
                        <th>Scope</th>
                    </tr>
                </thead>

                <tbody>
                    {volumes.length > 0 ? (
                        volumes.map((volume) => (
                            <tr key={volume.name}>
                                <td>{volume.name}</td>
                                <td>{volume.driver}</td>
                                <td>{volume.mountpoint}</td>
                                <td>{volume.scope}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No Docker volumes found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default VolumeTable;