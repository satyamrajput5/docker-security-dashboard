export async function getSummary() {
    const response = await fetch("http://127.0.0.1:8000/summary");

    const data = await response.json();

    return data;
}

export async function getContainers() {
    const response = await fetch("http://127.0.0.1:8000/containers");

    return await response.json();

}

export async function stopContainer(containerId){
    const response = await fetch(`http://127.0.0.1:8000/containers/${containerId}/stop`,
        {
            method: "POST",
        }
    );
    return await response.json();
}

export async function startContainer(containerId){
    const response = await fetch(`http://127.0.0.1:8000/containers/${containerId}/start`,
        {
        method: "POST",
        }
    );
    return await response.json();
}

export async function restartContainer(containerId) {
    const response = await fetch(
        `http://127.0.0.1:8000/containers/${containerId}/restart`,
        {
            method: "POST",
        }
    );
    return await response.json();
}

export async function deleteContainer(containerId) {
    const response = await fetch(
        `http://127.0.0.1:8000/containers/${containerId}/delete`,
        {
            method: "POST",
        }
    );
    return await response.json();
}

export async function getImages() {

    const response = await fetch("http://127.0.0.1:8000/images");
    
    return await response.json();
}

export async function getSecurity() {
    const response = await fetch("http://127.0.0.1:8000/security");
    return await response.json();
}

export async function getNetworks() {
    const response = await fetch("http://127.0.0.1:8000/networks");
    return await response.json();
}

export async function getVolumes() {
    const response = await fetch(`http://127.0.0.1:8000/volumes`);
    return await response.json();
}

export async function getContainerLogs(containerId) {
    const response = await fetch(
        `http://127.0.0.1:8000/containers/${containerId}/logs`
    );

    return await response.json();
}