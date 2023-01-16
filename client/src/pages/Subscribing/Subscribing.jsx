import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Link, useLocation, useParams} from "react-router-dom";
import {styled} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import noFollowers from "../../assets/img/no_followers.png"
import {Typography} from "@mui/material";
import {getUsers} from "../../services/userApi";

const Subscribing = () => {
    const {username} = useParams();
    const path = useLocation().pathname;
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowings, setUserFollowings] = useState([]);

    useEffect( () => {
        getUsers().then(users => {
            setUserFollowers(users?.filter(user => user.followings.includes(username)))
            setUserFollowings(users?.filter(user => user.followers.includes(username)));
        });
    }, []);


    const StyledLink = styled(props => (<Link {...props}/>))(() => ({
        "&:hover": {
           backgroundColor: "rgba(15, 20, 25, 0.1)",
            transition: "0.2s"
        },
        "&": {
            color: "black",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            textAlign: "center",
            padding: "15px 0",
            fontFamily: "Arial, sans-serif",
            textDecoration: "none"
        }
    }))

    return (
        <Box sx={{width: "100%", marginTop: "25px"}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "space-around"}}>
                        <StyledLink sx={{borderBottom: path.includes("followers") ? "2px solid black": "none"}}
                                    to={`/${username}/followers`}>
                            Followers
                        </StyledLink>

                        <StyledLink sx={{borderBottom: path.includes("followings") ? "2px solid black": "none"}}
                                    to={`/${username}/followings`}>
                            Followings
                        </StyledLink>
            </Box>


            {
                path.includes("followers") &&
                    <>
                        {userFollowers?.length > 0 ? userFollowers?.map(u => (
                            <ProfilePreview
                                key={u.id}
                                userTag={u.userTag}
                                username={u.name}
                                id={u.id}
                                avatar={u.avatarImgUrl}
                                descr={u.bio}
                            />
                        )) :
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "70%", margin: "0 auto"}}>
                                <img src={noFollowers} alt="No followers image."/>
                                <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>Looking for followers?</Typography>
                                <Typography variant={"subtitle2"}>When someone follows this account, they’ll show up here. Tweeting and interacting with others helps boost followers.</Typography>
                            </Box>

                        }
                    </>

            }
            {
                path.includes("followings") &&
                    <>
                        {userFollowings.length > 0 ? userFollowings?.map(u => (
                            <ProfilePreview
                                key={u.id}
                                userTag={u.userTag}
                                username={u.name}
                                id={u.id}
                                avatar={u.avatarImgUrl}
                                descr={u.bio}
                            />

                        )) :
                            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", maxWidth: "70%", margin: "0 auto"}}>
                                <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>Be in the know</Typography>
                                <Typography variant={"subtitle2"}>Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.</Typography>
                            </Box>
                        }
                    </>
            }
        </Box>
    );
};

export default Subscribing;