import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  DocumentData,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAizYFDSeXWhvd2m8qSXNDV9oC7T2RAhH0",
  authDomain: "test-back-b4f7e.firebaseapp.com",
  // projectId: "test-back-b4f7e",
  // 要在非server端執行process.env要在.env內加上NEXT_PUBLIC_的前墜(例如NEXT_PUBLIC_FIREBASE_PROJECTID)，打包時還是會顯示在客戶端，所以secret不要加前墜這樣執行。
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: "test-back-b4f7e.appspot.com",
  messagingSenderId: "990935080387",
  appId: "1:990935080387:web:5ea46aa8c026c256e27176",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore();
export const auth = getAuth();

export type Product = {
  name: string;
  type: string;
  productUrl: string;
  unit: string;
  price: number;
  quantity: number;
  inspectionUrl1?: string;
  inspectionUrl2?: string;
  category: string;
  introduction: string;
  isSell: boolean | null;
  OBTNumber?: string;
};

export type Order = {
  DeliveryTime: string;
  RecipientAddress: string;
  RecipientMobile: string;
  RecipientName: string;
  IsCollection: string;
  CollectionAmount: number;
  clientMemo: string;
  createDate: string;
  isFinish: boolean;
  Memo: string;
  totalPrice: number;
  cart: Cart[];
  id: string;
};

type Cart = {
  price: number;
  productName: string;
  quantity: number;
};

//上傳圖片到storage並回傳url
export const uploadToStorage = async (file: File): Promise<string> => {
  // ref 到指定的儲存空間，後面則是完整檔案名稱
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

//更新doc資料(每一筆doc都是一個product)
export const editProduct = async (product: Product): Promise<void> => {
  const collectionRef = collection(db, product.category);
  await updateDoc(doc(collectionRef, product.name), product);
};

// 更新開放銷售狀態
export const editIsSell = async (
  name: string,
  category: string,
  isSell: boolean
): Promise<void> => {
  const collectionRef = collection(db, category);
  await updateDoc(doc(collectionRef, name), { isSell: isSell });
};

//上傳資料到firestore
export const addNewProduct = async (product: Product): Promise<void> => {
  try {
    const collectionRef = collection(db, product.category);
    await setDoc(doc(collectionRef, product.name), product);
  } catch (error) {
    console.log(error);
  }
};

export const editOrder = async (
  id: string,
  isFinish: boolean,
  Memo: string,
  OBTNumber: string
): Promise<void> => {
  const collectionRef = collection(db, "訂單");
  await updateDoc(doc(collectionRef, id), { isFinish, Memo, OBTNumber });
};

export const delProduct = async (
  name: string,
  category: string
): Promise<void> => {
  const collectionRef = collection(db, category);
  deleteDoc(doc(collectionRef, name));
};

export const delOrder = async (id: string): Promise<void> => {
  const collectionRef = collection(db, "訂單");
  deleteDoc(doc(collectionRef, id));
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// signInAuthUserWithEmailAndPassword("test@gmail.com", "123412345").then((data) =>
//   console.log(data)
// );
