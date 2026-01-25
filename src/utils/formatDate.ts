export function formatRelativeTime(timestamp: number) {
	const diff = Date.now() - timestamp;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) return "Now";
	if (minutes < 60) return `${minutes} min ago`;
	if (hours < 24) return `${hours} h ago`;
	if (days < 7) return `${days} days ago`;

	return new Date(timestamp).toLocaleDateString("sv-SE");
}

export function formatDateOnly(timestamp: number) {
	return new Date(timestamp).toLocaleDateString("sv-SE");
}
