function ImageTable({ images }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image ID</th>
                    <th>Tag</th>
                    <th>Size (MB)</th>
                </tr>
            </thead>

            <tbody>
                {images.map((image) => (
                    <tr key={image.id}>
                        <td>{image.id}</td>
                        <td>{image.tag}</td>
                        <td>{image.size}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ImageTable;