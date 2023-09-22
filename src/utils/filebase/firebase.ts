import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  collectionGroup,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  getDocs,
  DocumentData,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAizYFDSeXWhvd2m8qSXNDV9oC7T2RAhH0",
  authDomain: "test-back-b4f7e.firebaseapp.com",
  projectId: "test-back-b4f7e",
  storageBucket: "test-back-b4f7e.appspot.com",
  messagingSenderId: "990935080387",
  appId: "1:990935080387:web:5ea46aa8c026c256e27176",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore();

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
  isSell: boolean;
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

//上傳資料到firestore
export const addNewProduct = async (product: Product): Promise<void> => {
  try {
    const collectionRef = collection(db, product.category);
    await setDoc(doc(collectionRef, product.name), product);
  } catch (error) {
    console.log(error);
  }
};

// export const getProducts = async (): Promise<DocumentData[]> => {
//   const querySnapshot = await getDocs(collection(db, "產品"));
//   const data = querySnapshot.docs.map((doc) => doc.data());
//   return data;
// };

/////////////////////////////////////////////////////////////////////////
//更新資料(待修正)
// export const editProduct = async (
//   product: UpdateProduct
// ): Promise<void> => {
//   const { 普通香蕉 } = product;

//   const collectionRef = collection(db, "產品");
//   await updateDoc(doc(collectionRef, product.name), product.普通香蕉); // 找不到直接新增新欄位
//   await updateDoc(
//     doc(collectionRef, product.name), "普通香蕉",    product.普通香蕉); //會整個蓋掉
//   await updateDoc(doc(collectionRef, product.name), "普通香蕉", { product }); //會直接在普通香蕉下面新增一個完整product
//   await updateDoc(doc(collectionRef, product.name), "普通香蕉", product); //會直接在普通香蕉下面新增一個完整product
// };

// export declare type UpdateData<T> = T extends Primitive ? T : T extends {} ? {
//   [K in keyof T]?: UpdateData<T[K]> | FieldValue;
// } & NestedUpdateFields<T> : Partial<T>;

// export declare type Primitive = string | number | boolean | undefined | null;

export const getProducts = async (): Promise<DocumentData[]> => {
  const querySnapshot = await getDocs(collection(db, "水果"));
  // console.log("1", querySnapshot);
  const data = querySnapshot.docs.map((doc) => {
    return doc.data();
  });
  return data;
};
