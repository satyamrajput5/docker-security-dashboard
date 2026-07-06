import docker
from pprint import pprint #for debugging and exploring

client = docker.from_env()

def get_running_containers():
    containers = client.containers.list(all=True)

    result = []

    for container in containers:
        
        stats = container.stats(stream=False)

        memory_mb = 0
        cpu_percent = 0

        if container.status == "running":
            stats = container.stats(stream=False)

            memory_usage = stats.get("memory_stats", {}).get("usage", 0)
            memory_mb = round(memory_usage / (1024 * 1024), 2)

            cpu_stats = stats.get("cpu_stats", {})
            precpu_stats = stats.get("precpu_stats", {})

            cpu_delta = (cpu_stats.get("cpu_usage", {}).get("total_usage", 0) - precpu_stats.get("cpu_usage", {}).get("total_usage", 0))

            system_delta = ( cpu_stats.get("system_cpu_usage", 0) - precpu_stats.get("system_cpu_usage", 0))

            online_cpus = cpu_stats.get("online_cpus", 1)

            if system_delta > 0 and cpu_delta > 0:
                cpu_percent = round((cpu_delta / system_delta) * online_cpus * 100, 2,)
            else:
                cpu_percent = 0

        result.append({"name" : container.name,
                       "status" : container.status,
                       "id": container.short_id,
                       "memory": memory_mb,
                       "cpu": cpu_percent})
        
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

        tags = image.tags if image.tags else ["<none>:<none>"]

        result.append({
            "id": image.short_id,
            "tag": tags[0],
            "size": round(image.attrs["Size"] / (1024 * 1024), 2)
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

def start_container(container_id):
    container = client.containers.get(container_id)
    container.start()
    return{"message": "Container started"}

def restart_container(container_id):
    container = client.containers.get(container_id)
    container.restart()
    return {"message": "Container restarted"}

def delete_container(container_id):
    container = client.containers.get(container_id)
    container.remove(force=True)

    return {
        "message": "Container deleted"
    }

def get_container_logs(container_id):
    try:
        container = client.containers.get(container_id)

        logs = container.logs(
            tail=100,
            timestamps=False
        ).decode("utf-8", errors="ignore")

        return {
            "logs": logs
        }

    except Exception as e:
        return {
            "logs": f"Error: {str(e)}"
        }