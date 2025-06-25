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

    async updateComment(commentId,{comment}){
        try {
              console.log("Updating comment ID:", commentId);       // ← Add this
        console.log("New comment text:", comment);            // ← And this

           return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCommentsCollectionId,
            commentId,
            {
                comment
            }
           )
        } catch (error) {
            console.error(error);
        }
    }

    async deleteComment(commentId){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentsCollectionId,
                commentId
            )
            return true
        } catch (error) {
            console.error("Delete Comment:",error)
            return false
        }
    }
}

const commentService = new CommentService()
export default commentService