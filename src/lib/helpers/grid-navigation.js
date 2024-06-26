
export default function navigate(
	grid,
	currentCell,
	totalItems
) {
	return {
		down: () => {
			if (currentCell === null) {
				return [2, 1, 1];
			} else if (currentCell[0] < totalItems + 1) {
				return [currentCell[0] + 1, currentCell[1], 1];
			}
		},
		up: () => {
			if (currentCell === null) {
				return [2, 1, 1];
			} else if (currentCell[0] > 2) {
				return [currentCell[0] - 1, currentCell[1], 1];
			}
		},
		right: () => {
			if (currentCell === null) {
				return [2, 1, 1];
			}
			if (grid && currentCell) {
				const columns = grid.querySelectorAll(`[data-row="${currentCell[0]}"]`);

				const selectablesCount = [...columns].map(
					(col) => col.querySelectorAll('a:not(.not-selectable),button:not(.not-selectable)').length
				);
				for (let index = 0; index < selectablesCount.length; index++) {
					const col = index + 1;
					const currCol = currentCell[1];
					const currSel = currentCell[2];
					if (currCol === col && currSel < selectablesCount[col - 1]) {
						return [currentCell[0], currentCell[1], currentCell[2] + 1];
					}

					if (currCol < col && selectablesCount[col - 1]) {
						return [currentCell[0], col, 1];
					}
				}
			}
		},
		left: ()  => {
			if (currentCell === null) {
				return [2, 1, 1];
			}
			if (grid && currentCell) {
				const columns = grid.querySelectorAll(`[data-row="${currentCell[0]}"]`);

				const selectablesCount = [...columns].map(
					(col) => col.querySelectorAll('a:not(.not-selectable),button:not(.not-selectable)').length
				);
				for (let index = selectablesCount.length - 1; index >= 0; index--) {
					const col = index + 1;
					const currCol = currentCell[1];
					const currSel = currentCell[2];
					if (currCol === col && currSel > 1) {
						return [currentCell[0], currentCell[1], currentCell[2] - 1];
					}

					if (currCol > col && selectablesCount[col - 1]) {
						return [currentCell[0], col, selectablesCount[col - 1]];
					}
				}
			}
		},
		lastRow: () => {
			return [totalItems + 1, currentCell?.[1] || 1, 1];
		},
		firstRow: () => {
			return [2, currentCell?.[1] || 1, 1];
		},
		firstCell: () => {
			return [2, 1, 1];
		},
		lastCell: () => {
			return [totalItems + 1, 4, 1];
		},
		firstCellInCurrentRow: () => {
			return currentCell ? [currentCell[0], 1, 1] : [2, 1, 1];
		},
		lastCellInCurrentRow: () => {
			return currentCell ? [currentCell[0], 4, 1] : [2, 4, 1];
		}
	};
}