import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function useDateFormatter() {
	const formatDate = (date: string, format = "DD/MM/YYYY") => {
		return dayjs(date).format(format);
	};

	const getRelativeTime = (date: string) => {
		return dayjs(date).fromNow();
	};

	return {
		formatDate,
		getRelativeTime,
	};
}
