import React, { useState } from "react"
import {
	Button,
	IconButton,
	ListItemText,
	ListItem,
	List,
	Drawer,
	Box,
	Typography,
	useMediaQuery
} from "@material-ui/core"
import { Menu, Close, Facebook, GitHub, LinkedIn, Twitter } from "@material-ui/icons"
import useStyles from "./Style"
import Fade from "react-reveal/Fade"
import { Link, useLocation } from "react-router-dom"
import { tabs } from "./Data"

function NavBar() {
	const classes = useStyles()
	const [openDrawer, setOpenDrawer] = useState(false)
	const mobile = useMediaQuery("(max-width: 700px)")
	const location = useLocation()

	const handleDrawer = () => {
		setOpenDrawer(!openDrawer)
	}
	const handleTabClick = () => {
		setOpenDrawer(!openDrawer)
	}
	return (
		<Box className={classes.onTop}>
			<div className={classes.overflow}>
				<Fade left delay={500}>
					<div>
						<Link to="/work">
							<Button className={classes.projectBtn} variant="contained" color="primary">
								My Projects
							</Button>
						</Link>
					</div>
				</Fade>
			</div>
			{!mobile && (
				<>
					<Fade right delay={1500}>
						<IconButton onClick={handleDrawer}>
							<Menu className={classes.menuIcon} />
						</IconButton>
					</Fade>
				</>
			)}
			<SocialMedia mobile={mobile} handleDrawer={handleDrawer} />

			<Drawer anchor="top" open={openDrawer} classes={{ paper: classes.paper }}>
				<Box component="div" py={3} className={classes.overflow}>
					<IconButton onClick={handleDrawer}>
						<Close className={classes.menuIcon} />
					</IconButton>
				</Box>
				<List lign="center">
					{tabs.map((tab, i) => (
						<Link to={tab.link} key={i} className={classes.link}>
							<ListItem onClick={() => handleTabClick(tab.index)} button className={classes.tabs}>
								<ListItemText>
									<Fade left delay={tab.delay}>
										<Typography
											variant="h3"
											className={location.pathname === tab.link ? classes.active : ""}>
											{tab.tab}
										</Typography>
									</Fade>
								</ListItemText>
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>
		</Box>
	)
}

export default NavBar

function SocialMedia({ mobile, handleDrawer }) {
	const classes = useStyles()
	const location = useLocation()
	const icons = [
		{
			icon: <GitHub style={{ color: "#4078c0" }} className={classes.socialIcons} />,
			url: "https://github.com/murtaja1",
			delay: 2500
		},
		{
			icon: <LinkedIn style={{ color: "#0e76a8 " }} className={classes.socialIcons} />,
			url: "https://www.linkedin.com/in/murtaja-adnan-2a02b9206/",
			delay: 2700
		},
		{
			icon: <Twitter style={{ color: "#1DA1F2" }} className={classes.socialIcons} />,
			url: "https://twitter.com/murtj14",
			delay: 2800
		},
		{
			icon: <Facebook style={{ color: "#4267B2" }} className={classes.socialIcons} />,
			url: "https://www.facebook.com/murtaja.adnan.52",
			delay: 2900
		}
	]
	return (
		<div className={classes.socialIconsMobile}>
			{(location.pathname !== "/about") | !mobile
				? icons.map((icon, i) => (
						<IconButton key={i}>
							<Fade top delay={icon.delay}>
								<a href={icon.url}>{icon.icon}</a>
							</Fade>
						</IconButton>
				  ))
				: ""}
			{mobile && (
				<IconButton onClick={handleDrawer}>
					<Fade top delay={3000}>
						<Menu className={classes.mobileMenuIcon} />
					</Fade>
				</IconButton>
			)}
		</div>
	)
}
