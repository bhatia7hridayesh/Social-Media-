import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import FlexBetween from "components/FlexBetween";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const {_id, picturePath} = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            
            <Box
            width="100%"
            p="2rem 6%"
            display = {isNonMobile ? "flex": "block"}
            gap="0.5rem"
            justifyContent="space-between"
            >
                <Box flexBasis={isNonMobile ? "32%": undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                <Box flexBasis={isNonMobile ? "62%": undefined}
                mt= {isNonMobile ? undefined: "2rem"}
                >
                    <MyPostWidget picturePath = {picturePath} />
                    <PostsWidget userid={_id}/>
                </Box>
            </Box>
        </Box>
    )
}
export default HomePage;