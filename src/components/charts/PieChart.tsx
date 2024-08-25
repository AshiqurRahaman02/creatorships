import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

interface Chartprops {
	title: string;
	width: number;
	height: number;
	data: any[];
}
const ShareHolderPieChart = ({ title, width, height, data }: Chartprops) => {
	return (
		<div style={{ width, height, textAlign: "center" }}>
			<h1 className="text-xl">{title}</h1>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart width={400} height={400}>
					<Pie
						dataKey="value"
						isAnimationActive={false}
						data={data}
						cx="50%"
						cy="50%"
						outerRadius={80}
						fill="#8884d8"
						label
					/>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
export default ShareHolderPieChart;
