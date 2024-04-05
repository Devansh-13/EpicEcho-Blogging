import axios from "axios";
import { API_NOTIFICATION_MESSAGES,SERVICE_URLs } from "../constants/config.js";

import { getAccessToken,getType } from "../utils/commonUtils.js";

const API_URl="http://localhost:1400";
const axiosInstance=axios.create({
    baseURL:API_URl,
    timeout:10000,//for APPI delay when it is in pending state
    headers:{
        "Accept": "application/json, form-data", 
        "Content-Type": "application/json"
    }

})

//intercerptor.req.use(successCallback),failCallback)
axiosInstance.interceptors.request.use(
    function (config){
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url=config.url+"/"+config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here
       
        return processResponse(response);
    },
    function(error){
        //stop loader here also
        return Promise.reject(processError(error));
    }
);

// if success-> return {isSuccess:true,dara:object}
// if fail-> return {isFailure:true,status:string,code:int} 

const processResponse=(response)=>{
    
    if(response?.status === 200){
        return { isSuccess:true,
            data: response.data
        };

    }
    else{
       
        return {
            isFailure : true ,
            status : response?.status,
            message:response?.message,
            code:response?.code

        }
    }
}

// if success-> return {isSuccess:true,dara:object}
// if fail-> return {isFailure:true,status:string,code:int} 
const processError=async (error)=>{
    if(error.response){
        // request was made and the servr respnded with other code than 2**
        //error in server response
        console.log("Error in response",error.toJSON());
        return {
            isError:true,
            message:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }
    else if(error.request){
        //error in request
        console.log("Error in request",error.toJSON());
        return {
            isError:true,
            message:API_NOTIFICATION_MESSAGES.requestFailure,
            code:""
        }
    }
    else{
        //erro in network
        console.log("Error in network",error.toJSON());
        return {
            isError:true,
            message:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}

const API ={};
// userSignup:{url:'/signup',method:'POST'}
for(const [key,value] of Object.entries(SERVICE_URLs)){
    API[key]=(body,showUpoadProgress,showDownloadProgress)=>{
        return axiosInstance({
            method:value.method,
            url:value.url,
            data:value.method==="DELETE" ? {} : body,
            responseType:value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress:function (progressEvent){
                if(showUpoadProgress){
                    let percentageCompleted=Math.round( (progressEvent.loaded *100) / progressEvent.total )
                    showUpoadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function (progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round( (progressEvent.loaded *100) / progressEvent.total )
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    }
}

export { API };
