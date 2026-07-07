const API_BASE = "/api";

export async function getSummary() {
    const response = await fetch(`${API_BASE}/summary`);
    return await response.json();
}

export async function getContainers() {
    const response = await fetch(`${API_BASE}/containers`);
    return await response.json();
}

export async function stopContainer(containerId) {
    const response = await fetch(
        `${API_BASE}/containers/${containerId}/stop`,
        {
            method: "POST",
        }
    );

    return await response.json();
}

export async function startContainer(containerId) {
    const response = await fetch(
        `${API_BASE}/containers/${containerId}/start`,
        {
            method: "POST",
        }
    );

    return await response.json();
}

export async function restartContainer(containerId) {
    const response = await fetch(
        `${API_BASE}/containers/${containerId}/restart`,
        {
            method: "POST",
        }
    );

    return await response.json();
}

export async function deleteContainer(containerId) {
    const response = await fetch(
        `${API_BASE}/containers/${containerId}/delete`,
        {
            method: "POST",
        }
    );

    return await response.json();
}

export async function getImages() {
    const response = await fetch(`${API_BASE}/images`);
    return await response.json();
}

export async function getSecurity() {
    const response = await fetch(`${API_BASE}/security`);
    return await response.json();
}

export async function getNetworks() {
    const response = await fetch(`${API_BASE}/networks`);
    return await response.json();
}

export async function getVolumes() {
    const response = await fetch(`${API_BASE}/volumes`);
    return await response.json();
}

export async function getContainerLogs(containerId) {
    const response = await fetch(
        `${API_BASE}/containers/${containerId}/logs`
    );

    return await response.json();
}