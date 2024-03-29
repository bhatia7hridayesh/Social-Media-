import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";

import { ManageAccountsOutlined, 
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://127.0.0.1:8000/user/${userId}`,
        {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    return (
        <WidgetWrapper>
            {/*FIRST ROW*/}
            <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile.${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx = {{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }}}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
            <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />
            {/*SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color: main}} />
                    <Typography color={medium}>{location}</Typography>

                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize="large" sx={{color: main}} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>                
            </Box>
            <Divider />
            {/*THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}> Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500"> {viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Impressions of Your Post</Typography>
                    <Typography color={main} fontWeight="500"> {impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />
            {/*FORTH ROW */}
            <Box p="1rem 0">
                <Typography fontWeight="500" color={main} fontSize="1rem" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img  src="../assets/twitter.png" alt="Twitter"/>
                        <Box>
                            <Typography color={main} fontWeight="500">twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>

                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color: main}}/>
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img  src="../assets/linkedin.png" alt="LinkedIN"/>
                        <Box>
                            <Typography color={main} fontWeight="500">LinkedIN</Typography>
                            <Typography color={medium}>Network Platform </Typography>

                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color: main}}/>
                </FlexBetween>
            </Box>
            
        </WidgetWrapper>
    )
}

export default UserWidget;