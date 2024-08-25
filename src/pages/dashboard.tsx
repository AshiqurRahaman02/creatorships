import RectangleContent from "@/components/charts/RectangleContent";
import React from "react";
import ShareHolderPieChart from "@/components/charts/PieChart";

import sampleMonthSharePriceData from "@/data/sampleMonthSharePriceData";
import sampleShareHoldersData from "@/data/holders";

// let apiUrl =  `https://seeking-alpha.p.rapidapi.com/symbols/get-chart?symbol=aapl&period=1y`

type SharePriceData = {
	id: string;
	type: string;
	attributes: {
		[dateTime: string]: {
			open: number;
			high: number;
			low: number;
			close: number;
			volume: number;
			adj: number;
		};
	};
};

type ConvertedSharePriceData = {
	"date-time": string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	adj: number;
};

function Dashboard() {
	function convertSharePriceData(
		data: SharePriceData
	): ConvertedSharePriceData[] {
		const convertedData: ConvertedSharePriceData[] = [];

		const { attributes } = data;
		for (const [dateTime, values] of Object.entries(attributes)) {
			convertedData.push({
				"date-time": dateTime,
				...values,
			});
		}

		return convertedData;
	}

	const prepareChartData = (data: typeof sampleShareHoldersData) => {
		const majorHolders = data.major_holder.map((holder) => {
			if (holder.index != "institutionsCount") {
				return { name: holder.index, value: parseFloat(holder.Value) };
			}
		});

		const mutualHolders = data.mutual_holder.map((holder) => ({
			name: holder.Holder,
			value: parseFloat(holder.pctHeld),
		}));

		return { majorHolders, mutualHolders };
	};

	return (
		<div>
			<RectangleContent
				width={1300}
				height={500}
				data={convertSharePriceData(sampleMonthSharePriceData)}
			/>
			<div className="flex mt-10">
				<ShareHolderPieChart
					title="Major holders in tesla"
					width={1300}
					height={500}
					data={sampleShareHoldersData.major_holder.map((holder) => {
						if (holder.index != "institutionsCount") {
							return {
								name: holder.index,
								value: parseFloat(holder.Value),
							};
						}
					})}
				/>
				<ShareHolderPieChart
					title="Mutual holders in tesla"
					width={1300}
					height={500}
					data={sampleShareHoldersData.mutual_holder.map((holder) => ({
						name: holder.Holder,
						value: parseFloat(holder.pctHeld),
					}))}
				/>
			</div>
		</div>
	);
}

export default Dashboard;
