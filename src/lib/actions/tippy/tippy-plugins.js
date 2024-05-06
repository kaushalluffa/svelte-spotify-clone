import tippy, { hideAll } from 'tippy.js';

export const hideOnPopperBlur = {
	name: 'hideOnPopperBlur',
	defaultValue: true,
	fn(instance) {
		return {
			onCreate() {
				instance.popper.addEventListener('focusout', (event) => {
					if (
						instance.props.hideOnPopperBlur &&
						event.relatedTarget &&
						!instance.popper.contains(event.relatedTarget)
					) {
						instance.hide();
					}
				});
			}
		};
	}
};

export const hideOnEsc = {
	name: 'hideOnEsc',
	defaultValue: true,
	fn({ hide, props }) {
		function onKeyDown(event) {
			if (event.key === 'Escape') {
				hide();
			}
		}

		return {
			onShow() {
				if (props.hideOnEsc) {
					document.addEventListener('keydown', onKeyDown);
				}
			},
			onHide() {
				if (props.hideOnEsc) {
					document.removeEventListener('keydown', onKeyDown);
				}
			}
		};
	}
};

export const hideOthersOnOpen = {
	name: 'hideOthersOnOpen',
	defaultValue: true,
	fn(instance) {
		return {
			onShow() {
				if (instance.props.hideOthersOnOpen) {
					hideAll({ exclude: instance });
				}
			}
		};
	}
};

export default tippy;
