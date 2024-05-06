import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function (node, options) {
	const instance = tippy(node, options);
	return {
		update(newOptions) {
			instance.setProps(newOptions);
		},
		destroy() {
			instance.destroy();
		}
	};
}
