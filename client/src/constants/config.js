//API_NOTIFICATIONS MESSAGES

export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:"Loading....",
        message: "Please wait while we load your data."

    },
    success:{
        title:"Success",
        message: "Your request has been processed successfully"  
    },
    responseFailure:{
        title:"Error",
        message: "An error occured while fteching data from the server,"
    },
    requestFailure:{
        title:"Error",
        message:"An error occured while parsing request data. "
    },
    networkError:{
        title:"Error",
        message: "A network error occurred. Please check your internet."
    }

}
//ApI service calls
// sample request
//need service call:{url:"/",method:GET,params
export const SERVICE_URLs={
    userSignup : {url:'/signup',method:'POST'},
    userLogin: {url:'/login',method:'POST'},
    uploadFile:  {url:'/file/upload', method:'POST'},
    createPost: {url:'/create', method:'POST'},
    getAllPosts: {url:'/posts',method:"GET",params:true},
    getPostById: {url:'/post',method:"GET",query:true},
    updatePost: {url:'update',method:"PUT",query:true},
    deletePost: {url:'delete',method:"DELETE",query:true},
    newComment: {url:'/comment/new',method:"POST"},
    getAllComments: {url:'/comments',method:"GET",query:true},
    deleteComment: {url:'/comment/delete',method:"DELETE",query:true}
}



