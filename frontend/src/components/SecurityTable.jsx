function SecurityTable({ security }){
    return (
    <table>
        <thead>
            <tr>
                <th> Container </th>
                <th> Severity </th>
                <th> Issue </th>
            </tr>
        </thead>
        <tbody>
        {security.map((issue) => (
            
                <tr key={issue.container + issue.issue}>
                <td>{issue.container}</td>
                <td>{issue.severity}</td>
                <td>{issue.issue}</td>
                
                </tr>
            ))}
        </tbody>
    </table>
    
    );
}

export default SecurityTable;