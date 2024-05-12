import { writable } from 'svelte/store';
import uniqid from 'uniqid';

function createToastsStore() {
	const { update, subscribe } = writable([]);
	function removeToast(id) {
		update((toasts) => toasts?.filter((toast) => toast?.id !== id));
	}
	function addToast({ type, message, id, timeout = 3000 }) {
		update((toasts) => [{ type, message, id, timeout }, ...toasts]);
		if (timeout) {
			setTimeout(() => {
				removeToast(id);
			}, timeout);
		}
	}
	return {
		subscribe,
		info: (message, timeout) => addToast({ type: 'info', message, id: uniqid(), timeout }),
		success: (message, timeout) => addToast({ type: 'success', message, id: uniqid(), timeout }),
		warning: (message, timeout) => addToast({ type: 'warning', message, id: uniqid(), timeout }),
		error: (message, timeout) => addToast({ type: 'error', message, id: uniqid(), timeout }),
		remove: (id) => removeToast(id)
	};
}
export default createToastsStore();
