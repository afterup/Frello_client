export function dateFormat(date) {
	const array = date.split('-');
	const year = array[0];
	const month = array[1];
	const day = array[2].split('T')[0];
	const time = array[2].split('T')[1].split('.')[0];

	return `${year}-${month}-${day} ${time}`;
}

export function findBothPosition({ elements, index }) {
	let bothPosition = {};
	if (elements[index - 1]) {
		bothPosition['leftPosition'] = elements[index - 1].position;
	}
	if (elements[index + 1]) {
		bothPosition['rightPosition'] = elements[index + 1].position;
	}
	return bothPosition;
}
