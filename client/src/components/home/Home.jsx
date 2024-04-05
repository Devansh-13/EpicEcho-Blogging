import Banner from "../banner/Banner.jsx";
import Categories from "./Categories.jsx";
import { Grid } from "@mui/material";
import Posts from "./post/Posts.jsx";


const Home=()=>{
    return (
        <>
            <Banner/>
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories/>
                </Grid>
                <Grid item lg={10} sm={10} xs={12}>
                    <Posts/>
                </Grid>
                
            </Grid>
            
        </>
    )
}

export default Home;