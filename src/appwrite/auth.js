import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite"


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client 
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account=new Account(this.client)

    }

 


    async  createAccount({email,password,name}){
      try{
       const userAccount = await this.account.create(ID.unique(),email,password,name)
       console.log("User account created:", userAccount);
       if(userAccount){
        return this.login({email,password})
       }
       else{
        return userAccount
       }
      }
      catch(err){
        throw err;
      }
    }
 
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(err){
            throw err
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(err){
             throw err
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(err){
            console.log("Appwrite service::logout::error",err ); 
        }
    }
}

const authService = new AuthService()

export default authService;