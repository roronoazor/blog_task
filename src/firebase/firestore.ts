import { db } from "./clientApp";
import { 
    collection,
    DocumentSnapshot,
    addDoc,
    limit,
    startAt, 
    getDocs, 
    doc, 
    setDoc, 
    query, 
    where, 
    orderBy, 
    Timestamp, 
    deleteDoc, 
    getDoc, 
    CollectionReference,
    DocumentReference,
    Query,
    DocumentData
} from "firebase/firestore"; 
import { Post } from "@/interfaces/post";

// Function to convert Firestore Timestamp to Date
function convertTimestampToDate(timestamp: Timestamp): Date {
    return new Date(timestamp.toMillis());
  }

// Function to create a new post
export const createPost = async (title: string, content: string) => {
    try {

      const now = Timestamp.now();
      
      const post = await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: now,
        updatedAt: now,
      });
  
      
      return {
        id: post.id, 
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };
  
  // Function to update an existing post
  export const updatePost = async (postId: string, title: string, content: string) => {
    try {
        const post = await setDoc(doc(db, "posts", postId), {
            title,
            content,
            updatedAt: Timestamp.now()
          }, { merge: true });
        
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };
  
  // Function to get all posts with pagination
  export const getPosts = async (
    pageSize: number,
    title: string,
    page: string
  ): Promise<Post[]> => {
    try {
      let queryRef:CollectionReference<DocumentData, DocumentData> = collection(db, "posts");
      let q: Query<DocumentData, DocumentData>;

      if (title){
        console.log("a")
        q = query(queryRef, orderBy("createdAt", "desc"), limit(pageSize));
      }else {
        console.log("b")
        q = query(queryRef, orderBy("createdAt", "desc"), limit(pageSize));
      }
      
      const querySnapshot = await getDocs(q);
  
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return posts;
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  };
  
  // Function to delete a post
  export const deletePost = async (postId: string) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };
  
  // Function to get details of a particular post
  export const getPostDetail = async (postId: string) => {
    try {
      
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
        const data = docSnap.data();
        if (data) {
            // Convert Firestore Timestamp to Date
            data.createdAt = convertTimestampToDate(data.createdAt);
            data.updatedAt = convertTimestampToDate(data.updatedAt);
            }
            return data as Post;
        } 

      
    } catch (error) {
      console.error('Error getting post detail:', error);
      throw error;
    }
  };
  