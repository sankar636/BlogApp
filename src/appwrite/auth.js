import conf from '../conf/conf'

import { Client, Account, ID } from 'appwrite'
// part(1.) ---> using class
// export class AuthService {
//     client = new Client();
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//     }

//     async createAccount({ email, password, name }) {
//         try {
//             const userAccount = await this.account.create(ID.unique(), email, password, name);
//             if (userAccount) {
//                 //call another method
//                 return this.login({email,password})
//             } else {
//                 return userAccount;
//             }

//         } catch (error) {
//             console.log(error);
//             throw error;
//         }

//     }
//     async login({email, password}){
//         try {
//             return await this.account.createEmailPasswordSession(email, password);
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }

//     async getCurrentUser(){
//         try {
//             return await this.account.get()
//         } catch (error) {
//             console.log("Appwrite serive :: getCurrentUser :: error", error);            
//             return null
//         }
//     }

//     async logout(){
//         try {
//             return await this.account.deleteSessions()
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
// }

// const authService = new AuthService();

// export default authService;

// part(2.) ---> Using function


// Initialize client and account once
const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const account = new Account(client);

// Service functions
async function createAccount({ email, password, name }) {
    try {
        const userAccount = await account.create(ID.unique(), email, password, name);
        if (userAccount) {
            // Call another method if needed
        } else {
            return userAccount;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function login({ email, password }) {
    try {
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
        return null;
    }
}

async function logout() {
    try {
        return await account.deleteSessions();
    } catch (error) {
        console.log(error);
    }
}

// Export all service functions together
const authService = {
    createAccount,
    login,
    getCurrentUser,
    logout,
};

export default authService;
