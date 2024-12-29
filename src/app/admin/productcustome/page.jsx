"use client";
import useAuth from "@/app/hooks/useAuth";
import NavbarAdmin from "@/components/NavbarAdmin";
import { db, storage } from "@/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductCustome = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && userProfile.role === "user") {
      router.push("/");
    }
  }, [user, userProfile, router]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("jakarta");
  const [jangkauan, setJangkauan] = useState("3 Bulan");
  const [price, setPrice] = useState("");
  const [priceJangkauan, setPriceJangkauan] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "jangkauanCustomSewa"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    const uploadFile = async () => {
      const storageRef = ref(
        storage,
        "jangkauanCustomSewa/" +
          new Date().getTime() +
          file.name.replace(" ", "%20") +
          "UEU"
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadUrl(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
    return () => {
      unsub();
    };
  }, [file]);

  
  const handleDelete = async (id, image) => {
    try {
      await deleteDoc(doc(db, "jangkauanCustomSewa", id));
      setData(data.filter((item) => item.id !== id));

      const desertRef = ref(storage, image);
      await deleteObject(desertRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcc = async (id) => {
    try {
        const docRef = doc(db, "jangkauanCustomSewa", id);
        await updateDoc(docRef, {
            statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang"
        });
        console.log("statusCustome updated successfully.");
    } catch (error) {
        console.error("Error updating document:", error);
    }
};


const handleDecline = async (id) => {
    try {
        const docRef = doc(db, "jangkauanCustomSewa", id);
        await updateDoc(docRef, {
            statusCustome: "Permintaan Anda Ditolak"
        });
        console.log("statusCustome updated successfully.");
    } catch (error) {
        console.error("Error updating document:", error);
    }
};



  return (
    <div className="w-[87%] mx-auto mt-32">
      <NavbarAdmin />

      <div className="flex justify-between items-center gap-3 mb-10">
        <h1 className="text-3xl font-semibold mb-3">Product Custome List</h1>
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered w-full max-w-xs"
        />
        <label className="form-control w-full max-w-xs">
          <select className="select select-bordered">
            <option>All</option>
            <option>Jakarta</option>
            <option>Yogyakarta</option>
            <option>Lampung</option>
            <option>Solo</option>
            <option>Baleho 1</option>
            <option>Baleho 2</option>
            <option>Baleho 3</option>
            <option>Baleho 4</option>
            <option>Baleho 5</option>
            <option>Baleho 6</option>
            <option>Baleho 7</option>
            <option>Baleho 8</option>
            <option>Baleho 9</option>
            <option>Baleho 10</option>
          </select>
        </label>
        
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Kategori</th>
              <th>Jangkauan</th>
              <th>Awal Pemasangan</th>
              <th>Akhir Pemasangan</th>
              <th>Harga Sebulan</th>
              <th>Price</th>
              <th>Status Custome</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data &&
              data.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={product.imageUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.judul}</td>
                  <td>{product.deskripsi}</td>
                  <td>{product.fakultas}</td>
                  <td>{product.jangkauanCustome}</td>
                  <td>{product.startDate}</td>
                  <td>{product.endDate}</td>
                  <td>{product.hargaJangkauan}</td>
                  <td>{product.harga}</td>
                  <td>{product.statusCustome}</td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(product.id, product.imageUrl)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn "
                      onClick={() => handleAcc(product.id, product.imageUrl)}
                    >
                      Acc
                    </button>
                    <button
                      className="btn "
                      onClick={() => handleDecline(product.id, product.imageUrl)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCustome;
