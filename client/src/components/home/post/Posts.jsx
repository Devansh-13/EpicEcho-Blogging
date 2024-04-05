import { API } from "../../../service/api";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Post from "./Post.jsx";
import { useSearchParams,Link } from "react-router-dom";
import styled from "@emotion/styled";





const Posts=()=>{
    const [posts,setPosts]=useState([]);
    const [searchParams]=useSearchParams();
    const category=searchParams.get("category");

    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getAllPosts({category:category || ""});
            if(response.isSuccess){
                setPosts(response.data);
                
            }
        }
        fetchData();
        
    },[category]);
    return (
        <>
            {
                posts && posts.length>0 ?
                <Grid container spacing={2}>
                    {
                    posts.map(post=>{
                    return (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/${post._id}`} style={{textDecoration:"none",color:"inherit"}}>
                            <Post post={post}/>
                        </Link>
                    </Grid>
                     )})}
                      </Grid>
           : <Box style={{color:"#878787",margin:"30px 80px",fontSize:18}}>No post available
                </Box>
            }
        </>
    )
}

export default Posts;