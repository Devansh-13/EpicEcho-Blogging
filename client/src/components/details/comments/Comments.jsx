import styled from "@emotion/styled";
import { Box,Button,TextareaAutosize } from "@mui/material";
import { useContext,useState,useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";
import Comment from "./Comment";

const Container=styled(Box)`
margin-top:100px;

`

const StyledTextArea=styled(TextareaAutosize)`
height:100px;
width:85%;
margin:0 20px;
`


const Image=styled('img')(
    {
        width:50,
        height:50,
        borderRadius:"50%"
    }
)

const initialValues={
    name:"",
    postId:"",
    comments:"",
    date:new Date()
}

export const Comments=({post})=>{

   

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment,setComment]=useState(initialValues);
    const [comments,setComments]=useState([]);
    const [toggle,setToggle]=useState(false);

    const {account}=useContext(DataContext);

    useEffect(()=>{
        
        const getData=async()=>{
            
            let response=await API.getAllComments(post._id);
            
            if(response.isSuccess){
                setComments(response.data);
            }
        }
        getData();
    },[post,toggle])

    const handleChange=(e)=>{
        setComment({
            ...comment,
            name:account.username,
            postId:post._id,
            comments:e.target.value
        });
    }

    const addComment=async(e)=>{
        let response=await API.newComment(comment);
        if(response.isSuccess){
            setComment(initialValues);
        }
        setToggle(prevState=>!prevState);
    }
    return (
        <Box>
            <Container>
                <Image src={url} alt="user"/>
                <StyledTextArea
                minRows={5}
                placeholder="What's on your mind?"
                value={comment.comments}
                onChange={(e)=>handleChange(e)}
                />
                <Button variant="contained" color="primary" size="medium"
                style={{height:"40px",marginBottom:"55px"}}
                onClick={(e)=>addComment(e)}
                >Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length>0 && comments.map(comment=>{
                        return (<Comment comment={comment} setToggle={setToggle}/>)
                    })
                }
            </Box>
        </Box>
    )
}

