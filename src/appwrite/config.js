import conf from '../conf/conf.js'
import { Client,ID,Databases,Storage,Query } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases=new Databases(this.client)
            this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,desc,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    desc,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(err){
            console.log(err);     
        }
    }

    async updatePost(slug,{title,desc,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    desc,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch(err){
            console.log(err);
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(err){
            console.log("Err in getPost:",err);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }
        catch(err){
            console.log("appwrite service :: getPosts :: error",err);
            return false
        }
    }

    //file uploads

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch (error) {
        console.log("appwrite service :: uploadFile :: error",error);
        return false
      }

    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
              )
              return true
        }
        catch(error){
            console.log("appwrite service :: deleteFile :: error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFileView(
          conf.appwriteBucketId,
          fileId,
        )
    }
}

const service = new Service();
export default service 
