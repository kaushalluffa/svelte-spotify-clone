import { hideAll } from 'tippy.js';


export default function getGridPosition(
	e,
	gridNavigate,
	currentPosition
) {
	switch (e.key) {
		case 'ArrowDown': {
			e.preventDefault();
			hideAll();
			return gridNavigate.down();
		}
		case 'ArrowUp': {
			e.preventDefault();
			hideAll();
			return gridNavigate.up();
		}
		case 'ArrowRight': {
			e.preventDefault();
			return gridNavigate.right();
		}
		case 'ArrowLeft':
			e.preventDefault();
			return gridNavigate.left();

		case 'PageDown': {
			e.preventDefault();
			return gridNavigate.lastRow();
		}
		case 'PageUp': {
			e.preventDefault();
			return gridNavigate.firstRow();
		}
		case 'Home': {
			e.preventDefault();
			if (currentPosition) {
				return e.ctrlKey ? gridNavigate.firstCell() : gridNavigate.firstCellInCurrentRow();
			}
			break;
		}
		case 'End':
			e.preventDefault();
			if (currentPosition) {
				return e.ctrlKey ? gridNavigate.lastCell() : gridNavigate.lastCellInCurrentRow();
			}
			break;
		default:
			break;
	}
}