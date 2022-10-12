import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";

import appLogo from "../../assets/app-logo.svg";
import { UserContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

function MenuBar(props) {
	const { user, signOut } = useContext(UserContext);

	const { window, showOptions } = props;

	const [mobileOpen, setMobileOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleAccountClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleAccountClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	let navigate = useNavigate();

	const linkItems = user
		? user.role === "recruiter"
			? [
					{
						title: "Find Candidates",
						url: "/recruiter/candidates",
					},
					{
						title: "Post Jobs",
						url: "/recruiter/post-jobs",
					},
					{ title: "Manage Jobs", url: "/recruiter/manage-jobs" },
			  ]
			: [
					{ title: "Find Jobs", url: "/job/search" },
					{ title: "Applications", url: "/applications" },
			  ]
		: [
				{ title: "Login", url: "/account/login", primary: false },
				{
					title: "Create Account",
					url: "/account/signup",
					primary: true,
				},
		  ];

	const profileMenuItems = user
		? [
				{
					title: "Profile",
					url: "/" + user.role + "/profile",
					icon: <AccountCircleOutlinedIcon />,
				},
				{
					title: "Settings",
					url: "/" + user.role + "/settings",
					icon: <SettingsOutlinedIcon />,
				},
		  ]
		: [];

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<Box onClick={handleDrawerToggle}>
			<Typography variant="h6" sx={{ my: 2, paddingLeft: 2 }}>
				Job Portal
			</Typography>
			<Divider />
			<List>
				{linkItems.map((item, idx) => (
					<ListItem key={idx} disablePadding>
						<ListItemButton>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
				{!user && (
					<ListItem disablePadding>
						<ListItemButton>Login</ListItemButton>
					</ListItem>
				)}
				{!user && (
					<ListItem disablePadding>
						<ListItemButton>Create Account</ListItemButton>
					</ListItem>
				)}
			</List>
		</Box>
	);

	return (
		<>
			<AppBar
				component="nav"
				color="inherit"
				elevation={0}
				position="sticky"
				className="menu-bar"
			>
				<Toolbar>
					{/* {showOptions && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
					)} */}
					<img src={appLogo} height={40} />
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
						}}
					>
						Job Finder
					</Typography>
					{showOptions && (
						<>
							<Box sx={{ display: { xs: "none", sm: "block" } }}>
								{linkItems.map((item, idx) => (
									<Button
										key={idx}
										color={
											item.primary ? "primary" : "inherit"
										}
										href={item.url}
										variant={
											item.primary ? "contained" : "text"
										}
										disableElevation
									>
										{item.title}
									</Button>
								))}
							</Box>
							<Box>
								{user && (
									<IconButton
										onClick={handleAccountClick}
										size="small"
										sx={{ ml: 2 }}
									>
										{user.role === "candidate" &&
											(user.fullName.length > 0 ? (
												<Avatar
													{...stringAvatar(
														user.fullName
													)}
												/>
											) : (
												<AccountCircleRoundedIcon />
											))}
										{user.role === "recruiter" &&
											(user.companyLogoUrl.length > 0 ? (
												<Avatar
													src={user.companyLogoUrl}
												/>
											) : (
												<AccountCircleRoundedIcon />
											))}
									</IconButton>
								)}
							</Box>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleAccountClose}
				onClick={handleAccountClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
						minWidth: "200px",
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{profileMenuItems.map((item) => (
					<MenuItem
						key={item.title}
						onClick={() => {
							navigate(item.url);
						}}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						{item.title}
					</MenuItem>
				))}
				{linkItems.map((item) => (
					<MenuItem
						key={item.title}
						onClick={() => {
							navigate(item.url);
						}}
					>
						<ListItemIcon></ListItemIcon>
						{item.title}
					</MenuItem>
				))}

				<MenuItem onClick={signOut}>
					<ListItemIcon>
						<LogoutOutlinedIcon />
					</ListItemIcon>
					Sign Out
				</MenuItem>
			</Menu>
			{/* <Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: "100vw",
						},
						backdropFilter: "blur(50px)",
					}}
				>
					{drawer}
				</Drawer>
			</Box> */}
		</>
	);
}

export default MenuBar;

function stringToColor(string) {
	let hash = 0;
	let i;

	if (string === undefined) {
		string = "Unnamed User";
	}

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name) {
	if (name === undefined) {
		name = "Unnamed User";
	}
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: 32,
			height: 32,
		},
		children: `${name.split(" ")[0][0]}`,
	};
}
