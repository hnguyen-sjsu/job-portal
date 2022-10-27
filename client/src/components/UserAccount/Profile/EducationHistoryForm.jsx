import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { UserContext } from "../../../providers/AuthProvider";

function EducationHistoryForm(props) {
	const { loading, educationItems, setEducationItems } = props;

	const handleChange = (e, index) => {
		const { name, value } = e.target;
		const updatedItems = educationItems.map((item, i) => {
			return index === i ? { ...item, [name]: value } : item;
		});

		setEducationItems([...updatedItems]);
	};

	const handleAddNewEducation = () => {
		setEducationItems([...educationItems, {}]);
	};

	return (
		<Stack spacing={2}>
			<Typography variant="h4" fontWeight="bold">
				Education History
			</Typography>
			{educationItems.map((item, index) => (
				<Grid container key={index} spacing={2}>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor="schoolName">School</InputLabel>
							<TextField
								placeholder="Enter the school name"
								name="schoolName"
								size="small"
								value={item.schoolName}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="degree">Degree</InputLabel>
							<TextField
								placeholder="Your degree"
								name="degree"
								size="small"
								value={item.degree}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="major">Major</InputLabel>
							<TextField
								placeholder="Major"
								name="major"
								size="small"
								value={item.major}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="startDate">
								Start Date
							</InputLabel>
							<TextField
								placeholder="MM/YYYY"
								name="startDate"
								size="small"
								value={item.startDate}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={6}>
						<Stack spacing={1}>
							<InputLabel htmlFor="endDate">
								End Date (or expected)
							</InputLabel>
							<TextField
								placeholder="MM/YYYY"
								name="endDate"
								size="small"
								value={item.endDate}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Stack spacing={1}>
							<InputLabel htmlFor="description">
								Description
							</InputLabel>
							<TextField
								name="description"
								multiline
								minRows={2}
								value={item.description}
								onChange={(e) => {
									handleChange(e, index);
								}}
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} textAlign="right">
						{index !== 0 && (
							<Button
								startIcon={
									<RemoveRoundedIcon fontSize="small" />
								}
							>
								Remove this Education History
							</Button>
						)}
						<Divider />
					</Grid>
				</Grid>
			))}
			<Button
				startIcon={<AddRoundedIcon fontSize="small" />}
				onClick={handleAddNewEducation}
				fullWidth
			>
				Add Another Education History
			</Button>
		</Stack>
	);
}
export default EducationHistoryForm;
