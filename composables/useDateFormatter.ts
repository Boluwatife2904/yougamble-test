import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function useDateFormatter() {
	const getRelativeTime = (date: string) => {
		return dayjs(date).fromNow();
	};

	return {
		getRelativeTime,
	};
}
