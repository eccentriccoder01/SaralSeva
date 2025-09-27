let startTime = Date.now();

export function getUptimeSeconds() {
    return Math.floor((Date.now() - startTime) / 1000);
}

export function getUptime() {
    let totalSeconds = getUptimeSeconds();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

export function getMemoryUsage() {
    return {
        heapUsed: process.memoryUsage().heapUsed,
        rss: process.memoryUsage().rss
    };
}

export function getHealth() {
    return {
        uptime: getUptime(),
        memoryUsage: getMemoryUsage(),
        nodeVersion: process.version,
        pid: process.pid
    };
}