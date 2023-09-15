import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectNavbar, setIsSearchDrawerOpen, setToggleDrawer } from "src/redux/slices/navbar";
import SearchDrawer from "../navbar/SearchDrawer";
import SettingsDrawer from "../navbar/SettingsDrawer";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function Header({ type = "menu", singleChapter }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { open, isSearchDrawerOpen } = useSelector(selectNavbar, shallowEqual);
	const router = useRouter();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="fixed"
				sx={(theme) => ({
					bgcolor: theme.palette.background.paper,
					color: "#000",
					// zIndex: theme.zIndex.drawer + 1,
				})}
			>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
							{<MenuIcon color="primary" />}
						</IconButton>
						<Box
							onClick={() => router.push("/")}
							sx={{
								display: { xs: "none", sm: "block" },
								cursor: "pointer",
							}}
						>
							<Typography variant="h6" noWrap component="div" color="primary">
								Quran App
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<SettingsDrawer />
						<SettingsIcon color="primary" onClick={() => dispatch(setToggleDrawer(!open))} />
						<Search>
							<SearchIconWrapper>
								<SearchIcon color="primary" />
							</SearchIconWrapper>
							<StyledInputBase
								sx={{ color: theme.palette.primary.main }}
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
					</Box>
				</Toolbar>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
					}}
				>
					<Button>{singleChapter?.transliteratedName}</Button>
					<Button onClick={() => dispatch(setIsSearchDrawerOpen(!isSearchDrawerOpen))}>
						{isSearchDrawerOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
					</Button>
					<SearchDrawer />
				</Box>
			</AppBar>
		</Box>
	);
}
