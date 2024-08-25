import React, { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Customized,
	Rectangle,
} from "recharts";

// using Customized gives you access to all relevant chart props
const CustomizedRectangle = (props: any) => {
	const { formattedGraphicalItems } = props;
	// get first and second series in chart
	const firstSeries = formattedGraphicalItems[1];
	const secondSeries = formattedGraphicalItems[2];

	// render custom content using points from the graph
	return firstSeries?.props?.points.map(
		(firstSeriesPoint: any, index: any) => {
			const secondSeriesPoint = secondSeries?.props?.points[index];
			const yDifference = firstSeriesPoint.y - secondSeriesPoint.y;

			return (
				<Rectangle
					key={firstSeriesPoint.payload.name}
					width={10}
					height={yDifference}
					x={secondSeriesPoint.x - 5}
					y={secondSeriesPoint.y}
					fill={
						yDifference > 0 ? "red" : yDifference < 0 ? "green" : "none"
					}
				/>
			);
		}
	);
};

interface Chartprops {
	width: number;
	height: number;
	data: any[];
}
type SharePriceData = {
	"date-time": string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	adj: number;
};

const RectangleContent = ({ width, height, data }: Chartprops) => {
	const [selectedOption, setSelectedOption] = useState<"1d" | "1w" | "1m">(
		"1d"
	);
	const [filteredData, setFilteredData] = useState<SharePriceData[]>([]);

	useEffect(() => {
		const lastDate = new Date(data[data.length - 1]["date-time"]);

		if (selectedOption === "1d") {
			const lastDayData = data.filter((data) => {
				const dataDate = new Date(data["date-time"]);
				return (
					dataDate.getDate() === lastDate.getDate() &&
					dataDate.getMonth() === lastDate.getMonth() &&
					dataDate.getFullYear() === lastDate.getFullYear()
				);
			});
			setFilteredData(lastDayData);
		} else if (selectedOption === "1w") {
			const last7DaysData: SharePriceData[] = [];
			let daysCounted = 0;

			for (let i = data.length - 1; i >= 0; i--) {
				const dataDate = new Date(data[i]["date-time"]);

				if (dataDate <= lastDate && daysCounted < 7) {
					last7DaysData.push(data[i]);

					if (dataDate.getDate() !== lastDate.getDate()) {
						daysCounted++;
						lastDate.setDate(lastDate.getDate() - 1);
					}
				}
			}

			setFilteredData(last7DaysData.reverse());
		} else if (selectedOption === "1m") {
			setFilteredData(data);
		}
	}, [data, selectedOption]);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value as "1d" | "1w" | "1m");
	};
	return (
		<>

            <h1>Apple share price</h1>
			<label htmlFor="timeRange">Select Time Range: </label>
			<select
				id="timeRange"
				value={selectedOption}
				onChange={handleSelectChange}
			>
				<option value="1d">1d</option>
				<option value="1w">1w</option>
				<option value="1m">1m</option>
			</select>
			<ResponsiveContainer width="100%" height={height}>
				<LineChart
					width={width}
					height={height}
					data={filteredData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={"date-time"}  padding={{ left: 10, right: 10 }}/>
					<YAxis domain={["dataMin - 1", "dataMax + 1"]} />
					<Tooltip />
					<Legend />
					<Line
						type="basis"
						dot={false}
						dataKey="high"
						stroke="#99EE99"
						opacity={selectedOption == "1m" ? 0 : 1}
						zoomAndPan=""
					/>
					<Line
						type="monotone"
						dot={false}
						dataKey="close"
						stroke="#008000"
						opacity={1}
					/>
					<Line
						type="basis"
						dot={false}
						dataKey="open"
						stroke="#FF0000"
						opacity={selectedOption == "1m" ? 0 : 1}
						zoomAndPan=""
					/>
					<Line
						type="basis"
						dot={false}
						dataKey="low"
						stroke="#FF9F9F"
						opacity={selectedOption == "1m" ? 0 : 1}
						zoomAndPan=""
					/>
					<Customized component={CustomizedRectangle} />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
};

export default RectangleContent;
