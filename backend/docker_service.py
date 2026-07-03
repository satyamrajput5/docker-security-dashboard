import docker
from pprint import pprint #for debugging and exploring

client = docker.from_env()

def get_running_containers():
    containers = client.containers.list()

    result = []

    for container in containers:
        result.append({"name" : container.name,
                       "status" : container.status,
                       "id": container.short_id})
        
    return result

def get_summary():
    containers = client.containers.list(all=True)

    running = 0
    stopped = 0

    for container in containers:
        if container.status == "running":
            running += 1
        else:
            stopped += 1

    return{
        "total": len(containers),
        "running": running,
        "stopped": stopped
    }

def get_images():
    images = client.images.list()

    result = []

    for image in images:
        result.append({
            "id": image.short_id,
            "tag": image.tags
        })
    
    return result

def get_system():
    info = client.info()

    return {
        "docker_version": info["ServerVersion"],
        "os": info["OperatingSystem"],
        "kernel": info["KernelVersion"],
        "architecture": info["Architecture"],
        "cpus": info["NCPU"],
        "memory": round(info["MemTotal"] / (1024 ** 3), 2),
        "driver": info["Driver"]
    }

def get_volumes():

    volumes = client.volumes.list()

    result = []

    for volume in volumes:
        result.append({
            "name": volume.name,
            "driver": volume.attrs["Driver"],
            "mountpoint": volume.attrs["Mountpoint"]
        })

    return result

def get_networks():

    networks = client.networks.list()
    
    result = []

    for network in networks:
        result.append({
            "name": network.name,
            "driver": network.attrs["Driver"],
            "scope": network.attrs["Scope"]
        })
    
    return result

def get_security():
    containers = client.containers.list(all=True)

    issues = []

    for container in containers:

        host_config = container.attrs["HostConfig"]
        config = container.attrs["Config"]

        # Privileged mode
        if host_config["Privileged"]:
            issues.append({
                "container": container.name,
                "severity": "High",
                "issue": "Running in privileged mode"
            })

        # Running as root
        user = config.get("User", "")

        if user == "" or user == "root":
            issues.append({
                "container": container.name,
                "severity": "Medium",
                "issue": "Running as root"
            })

        # Host networking
        if host_config["NetworkMode"] == "host":
            issues.append({
                "container": container.name,
                "severity": "High",
                "issue": "Using host network"
            })

        # No restart policy
        restart_policy = host_config["RestartPolicy"]

        if restart_policy["Name"] == "":
            issues.append({
                "container": container.name,
                "severity": "Low",
                "issue": "No restart policy configured"
            })

    return issues

def stop_container(container_id):
    container = client.containers.get(container_id)
    container.stop()

    return{"message": "Container stopped successfully"}