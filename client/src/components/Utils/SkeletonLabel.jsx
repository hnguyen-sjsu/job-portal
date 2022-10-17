import React from "react";
import Skeleton from "@mui/material/Skeleton";

function SkeletonLabel(props) {
	const { text, width, animation } = props;
	return (
		<>
			{text ? (
				text
			) : (
				<Skeleton
					variant="text"
					width={width ? width : 100}
					animation={animation ? animation : false}
				/>
			)}
		</>
	);
}

export default SkeletonLabel;
