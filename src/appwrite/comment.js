import conf from "../conf/conf";
import { Client,ID,Databases,Query } from "appwrite";

export class CommentService{
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.databases = new Databases(this.client);    
    }

    async createComment({postId,userId,username,comment}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                ID.unique(),
                {
                    postId,
                    userId,
                    username,
                    comment
                }
            );
        } catch (error) {
             console.error("createComment error:",error)
             return false
        }
    }  
    
    async getCommentByPostId(postId){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                [Query.equal("postId",postId)]
            )
        } catch (error) {
            console.error("getComments error:",error);
            return [];
        }
    }
}

const commentService = new CommentService()
export default commentService