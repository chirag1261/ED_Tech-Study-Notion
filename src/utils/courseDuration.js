export const duration = (duration) => {
    return formatDuration(duration);
}

function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
  
    const formattedDuration = [];
  
    if (hours > 0) {
        formattedDuration.push(`${hours}hr`);
    }
  
    if (minutes > 0) {
        formattedDuration.push(`${minutes}min`);
    }
  
    if (seconds > 0) {
        formattedDuration.push(`${seconds}s`);
    }
  
    return formattedDuration.join(' ');
}