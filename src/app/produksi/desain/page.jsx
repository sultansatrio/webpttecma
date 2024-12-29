"use client";
import useAuth from "@/app/hooks/useAuth";
import useProduct from "@/app/hooks/useProduct";
import CardItem from "@/components/CardItem";
import CardItem2 from "@/components/CardItem2";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";
import NavbarProduksi from "@/components/NavbarProduksi";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, []);

//   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();
//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           <input type="text" className="input input-bordered" />
//           <select className="select select-bordered w-full max-w-xs">
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"Fasilkom"}>Fasilkom</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {data.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               addToCart={() => addToCart(product)}
//               removeFromCart={() => removeFromCart(product)}
//               isInCart={isInCart(product.id)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;

//PEMBARUAN DENGAN MENAMBAHKAN FUNGSI SELECT OPTION
// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all"); // State untuk menyimpan kategori filter
//   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, [setData]);

//   // Menyaring produk berdasarkan kategori yang dipilih
//   const filteredData =
//     data && categoryFilter === "all"
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {/* <input type="text" className="input input-bordered" /> */}
//           <input
//             type="text"
//             className="input input-bordered"
//             onChange={(e) => {
//               const inputValue = e.target.value.toLowerCase();
//               const selectElement = document.querySelector(".select");

//               // Melakukan perulangan pada setiap opsi dropdown
//               selectElement.childNodes.forEach((option) => {
//                 if (option.value.toLowerCase().includes(inputValue)) {
//                   // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
//                   option.selected = true;
//                 }
//               });

//               // Memperbarui state kategori filter sesuai dengan input pengguna
//               setCategoryFilter(inputValue);
//             }}
//           />

//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())} // Mengubah state kategori filter berdasarkan pilihan
//           >
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"fasilkom"}>Fasilkom</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               addToCart={() => addToCart(product)}
//               removeFromCart={() => removeFromCart(product)}
//               isInCart={isInCart(product.id)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;

//MENAMBAHKAN CODE UNTUK INPUT SETSEACRH SESUAI DENGAN OPTION APABILA USER MENGETIK
// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all"); // State untuk menyimpan kategori filter
//   const [searchInput, setSearchInput] = useState(""); // State untuk menyimpan input pencarian
//   const { isInCart, removeFromCart, addToCart, data, setData } = useProduct();

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     return () => {
//       unsubProduct();
//     };
//   }, [setData]);

//   // Menyaring produk berdasarkan kategori yang dipilih
//   const filteredData =
//     data && categoryFilter === "all"
//       ? data
//       : data.filter(
//           (product) => product.category.toLowerCase() === categoryFilter
//         );

//   // Fungsi untuk memperbarui state pencarian ketika nilai input berubah
//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value.toLowerCase());
//   };

//   // Fungsi untuk memilih opsi dropdown sesuai dengan input pencarian
//   useEffect(() => {
//     const selectElement = document.querySelector('.select');

//     // Melakukan perulangan pada setiap opsi dropdown
//     selectElement.childNodes.forEach((option) => {
//       if (option.value.toLowerCase().includes(searchInput)) {
//         // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
//         option.selected = true;
//       }
//     });

//     // Memperbarui state kategori filter sesuai dengan input pencarian
//     setCategoryFilter(searchInput);
//   }, [searchInput]);

//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) =>
//               setCategoryFilter(e.target.value.toLowerCase())
//             } // Mengubah state kategori filter berdasarkan pilihan
//           >
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"fasilkom"}>Fasilkom</option>
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
//           {filteredData.map((product) => (
//             <CardItem
//               key={product.id}
//               imageUrl={product.image}
//               fakultas={product.category}
//               judul={product.title}
//               deskripsi={product.description}
//               harga={product.price}
//               addToCart={() => addToCart(product)}
//               removeFromCart={() => removeFromCart(product)}
//               isInCart={isInCart(product.id)}
//             />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Product;

// import { useRouter } from "next/router";
// import { db } from "@/firebase/firebase";

const Desain = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [newAssetNotification, setNewAssetNotification] = useState(false);
  const [AssetNotification, setAssetNotification] = useState(false);
  const { isInCart, removeFromCart, addToCart } = useProduct();

  useEffect(() => {
    if (user && userProfile.role === "produksi") {
      router.push("/produksi/desain");
    }
  }, [user, userProfile, router]);

  // useEffect(() => {
  //   const unsubProduct = onSnapshot(collection(db, "products"), (snapshot) => {
  //     let list = [];
  //     snapshot.docs.forEach((doc) => {
  //       list.push({ id: doc.id, ...doc.data() });
  //     });
  //     setData(list);
  //     setNewAssetNotification(true); // Setelah perubahan data, atur notifikasi untuk menampilkan pesan bahwa ada aset baru
  //     alert("New Asset Add");
  //   }, (error) => {
  //     console.log(error);
  //   });
  //   return () => {
  //     unsubProduct();
  //   };
  // }, []);
  // useEffect(() => {
  //   const unsubProduct = onSnapshot(collection(db, "products"), (snapshot) => {
  //     let list = [];
  //     snapshot.docs.forEach((doc) => {
  //       list.push({ id: doc.id, ...doc.data() });
  //     });

  //     // Memeriksa apakah ada aset baru yang ditambahkan
  //     if (list.length > data.length) {
  //       setNewAssetNotification(true); // Jika ada aset baru, atur notifikasi untuk ditampilkan
  //       alert("New Asset Added");
  //     } else if (list.length === data.length) {
  //       setAssetNotification(true); // Jika tidak ada aset baru, atur notifikasi untuk ditampilkan
  //       alert("Happy Shopping");
  //     }

  //     setData(list);
  //   }, (error) => {
  //     console.log(error);
  //   });
  //   return () => {
  //     unsubProduct();
  //   };
  // }, []);

  //USE EFFECT YANG FIX BUAT ALERT
  useEffect(() => {
    const unsubProduct = onSnapshot(
      collection(db, "desain"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        // Memeriksa apakah ada aset baru yang ditambahkan
        const isNewAssetAdded = list.length === data.length;
        // const isAsset = list.length > data.length;
        if (isNewAssetAdded) {
          setNewAssetNotification(true); // Jika ada aset baru, atur notifikasi untuk ditampilkan
          setAssetNotification(false); // Jika ada aset baru, atur notifikasi "Happy Shopping" menjadi false
          // alert("New Asset Added");
        } else {
          setNewAssetNotification(false); // Jika tidak ada aset baru, atur notifikasi "New Asset Added" menjadi false
          setAssetNotification(true); // Jika tidak ada aset baru, atur notifikasi untuk "Happy Shopping"
          // alert("Happy Shopping");
        }

        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubProduct();
    };
  }, []);

  // Menyaring produk berdasarkan kategori yang dipilih
  const filteredData =
    data && categoryFilter === ""
      ? data
      : data.filter(
          (product) => product.category.toLowerCase() === categoryFilter
        );

  // Fungsi untuk memperbarui state pencarian ketika nilai input berubah
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  // Fungsi untuk memilih opsi dropdown sesuai dengan input pencarian
  useEffect(() => {
    const selectElement = document.querySelector(".select");
    // Melakukan perulangan pada setiap opsi dropdown
    selectElement.childNodes.forEach((option) => {
      if (option.value.toLowerCase().includes(searchInput)) {
        // Jika nilai opsi cocok dengan input pengguna, opsi tersebut akan dipilih
        option.selected = true;
      }
    });
    // Memperbarui state kategori filter sesuai dengan input pencarian
    setCategoryFilter(searchInput);
  }, [searchInput]);

  // // Fungsi untuk menyembunyikan notifikasi asset baru telah ditambahkan setelah beberapa waktu
  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNewAssetNotification(false);
    }, 5000); // Menampilkan notifikasi selama 5 detik
    return () => clearTimeout(notificationTimeout);
  }, [newAssetNotification]);

  // Fungsi untuk menyembunyikan notifikasi asset yang bukan baru setelah beberapa waktu
  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setAssetNotification(false);
    }, 5000); // Menampilkan notifikasi selama 5 detik
    return () => clearTimeout(notificationTimeout);
  }, [AssetNotification]);

  // {newAssetNotification && (
  //   <div className="notification p-8 md:p-24 mt-10">New asset added!</div>
  // )}
  // {AssetNotification && (
  //   <div className="notification flex flex-col p-8 md:p-24 mt-10">
  //     <span>Happy Hunting</span>
  //   </div>
  // )}
  
  return (
    <div>
      <NavbarProduksi />
      <div className="p-8 md:p-24 mt-10">
        <div className="flex justify-between mb-10">
          <h2 className="text-3xl mb-3">All Desain</h2>
          {AssetNotification && (
            <div className="notification-3xl mb-3">
              Happy Hunting
            </div>
          )}
          <input
            type="text"
            className="input input-bordered"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
          >
            <option value={"all"}>All</option>
            <option value={"jakarta"}>Fikom</option>
            <option value={"solo"}>DKV</option>
            <option value={"yogyakarta"}>Fasilkom</option>
            <option value={"klaten"}>Baleho</option>
            <option value={"lampung"}>Baleho</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
          {filteredData.map((product) => (
            // <CardItem
            //   key={product.id}
            //   imageUrl={product.image}
            //   fakultas={product.category}
            //   judul={product.title}
            //   deskripsi={product.description}
            //   harga={product.price}
            // //   addToCart={() => addToCart(product)}
            //   removeFromCart={() => removeFromCart(product)}
            //   isInCart={isInCart(product.id)}
            // />
            <CardItem2
                key={product.id}
               imageUrl={product.image}
               fakultas={product.category}
               judul={product.title}
               deskripsi={product.description}
               harga={product.price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Desain;
