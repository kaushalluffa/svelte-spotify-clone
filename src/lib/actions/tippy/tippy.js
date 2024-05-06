import tippy, { hideOnEsc, hideOnPopperBlur, hideOthersOnOpen } from './tippy-plugins.js';
import 'tippy.js/dist/tippy.css';

export default function (node, options) {
	const plugins = [hideOnEsc, hideOnPopperBlur, hideOthersOnOpen];
	const _options = options ? { ...options, plugins } : { plugins };
	const instance = tippy(node, _options);
	return {
		update(newOptions) {
			const _newOptions = newOptions ? { ...newOptions, plugins } : { plugins };
			instance.setProps(_newOptions);
		},
		destroy() {
			instance.destroy();
		}
	};
}
