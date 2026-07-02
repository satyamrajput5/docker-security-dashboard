export async function getSummary() {
    const response = await fetch("http://127.0.0.1:8000/summary");

    const data = await response.json();

    return data;
}

export async function getContainers() {
    const response = await fetch("http://127.0.0.1:8000/containers");

    return await response.json();

}

