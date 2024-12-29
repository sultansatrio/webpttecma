"use client";
import useAuth from "@/app/hooks/useAuth";
import useProduct from "@/app/hooks/useProduct";
import useProductCustome from "@/app/hooks/useProductCustome";
import CardItem from "@/components/CardItem";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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

const Product = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [newAssetNotification, setNewAssetNotification] = useState(false);
  const [AssetNotification, setAssetNotification] = useState(false);
  const { isInCart, removeFromCart, addToCart } = useProduct();
  const { isInCartCustome, removeFromCartCustome, addToCartCustome } = useProductCustome();

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
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
      collection(db, "products"),
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
      <Navbar />
      <div className="p-8 md:p-24 mt-10">
        <div className="flex justify-between mb-10">
          <h2 className="text-3xl mb-3">All Products</h2>
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
            <option value={"jakarta"}>Jakarta</option>
            <option value={"yogyakarta"}>Yogyakarta</option>
            <option value={"lampung"}>Lampung</option>
            <option value={"solo"}>Solo</option>
            <option value={"baleho 2"}>Baleho</option>
            <option value={"baleho 3"}>Baleho</option>
            <option value={"baleho 4"}>Baleho</option>
            <option value={"baleho 5"}>Baleho</option>
            <option value={"baleho 6"}>Baleho</option>
            <option value={"baleho 7"}>Baleho</option>
            <option value={"baleho 8"}>Baleho</option>
            <option value={"baleho 9"}>Baleho</option>
            <option value={"baleho 10"}>Baleho</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
          {filteredData.map((product) => (
            <CardItem
              key={product.id}
              imageUrl={product.image}
              fakultas={product.category}
              judul={product.title}
              deskripsi={product.description}
              harga={product.price}
              hargaJangkauan={product.priceJangkauan}
              jangkauan={product.jangkauan}
              statusCustome={product.statusCustome}
              addToCart={() => addToCart(product)}
              addToCartCustome={()=> addToCartCustome(product)}
              addToMutasi={() => addToMutasi(product)}
              removeFromCart={() => removeFromCart(product)}
              removeFromCartCustome={()=>removeFromCartCustome(product)}
              isInCart={isInCart(product.id)}
              isInCartCustome={isInCartCustome(product.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;



// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import useProduct from "@/app/hooks/useProduct";
// import CardItem from "@/components/CardItem";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Product = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [searchInput, setSearchInput] = useState("");
//   const [data, setData] = useState([]);
//   const [orderLocations, setOrderLocations] = useState([]);
//   const [newAssetNotification, setNewAssetNotification] = useState(false);
//   const [assetNotification, setAssetNotification] = useState(false);
//   const { isInCart, removeFromCart, addToCart } = useProduct();

//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }
//   }, [user, userProfile, router]);

//   // Fetch products from Firestore
//   useEffect(() => {
//     const unsubProduct = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         let productList = [];
//         snapshot.docs.forEach((doc) => {
//           productList.push({ id: doc.id, ...doc.data() });
//         });
//         setData(productList);
//       },
//       (error) => console.log(error)
//     );
//     return () => unsubProduct();
//   }, []);

//   // Fetch order locations from Firestore
//   useEffect(() => {
//     const unsubOrders = onSnapshot(
//       collection(db, "users"),
//       (snapshot) => {
//         let locations = [];
//         snapshot.docs.forEach((doc) => {
//           const location = doc.data().companyAddress;
//           if (location) locations.push(location);
//         });
//         setOrderLocations(locations);
//       },
//       (error) => console.log(error)
//     );
//     return () => unsubOrders();
//   }, []);

//   // Filter products based on category and order locations
//   const filteredData = data.filter((product) => {
//     const productCategory = product.category.toLowerCase().trim();
//     const locationMatch = orderLocations.some(
//       (location) => location.toLowerCase().trim() === productCategory
//     );

//     if (categoryFilter === "all") {
//       return locationMatch; // Show products that match any order location
//     }
    
//     return productCategory === categoryFilter;
//   });

//   // Debug filtered results
//   console.log("Filtered Products:", filteredData);

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value.toLowerCase());
//   };

//   useEffect(() => {
//     const selectElement = document.querySelector(".select");
//     selectElement.childNodes.forEach((option) => {
//       if (option.value.toLowerCase().includes(searchInput)) {
//         option.selected = true;
//       }
//     });
//     setCategoryFilter(searchInput);
//   }, [searchInput]);

//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setNewAssetNotification(false);
//     }, 5000);
//     return () => clearTimeout(notificationTimeout);
//   }, [newAssetNotification]);

//   useEffect(() => {
//     const notificationTimeout = setTimeout(() => {
//       setAssetNotification(false);
//     }, 5000);
//     return () => clearTimeout(notificationTimeout);
//   }, [assetNotification]);

//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 md:p-24 mt-10">
//         <div className="flex justify-between mb-10">
//           <h2 className="text-3xl mb-3">All Products</h2>
//           {assetNotification && (
//             <div className="notification-3xl mb-3">
//               Happy Hunting
//             </div>
//           )}
//           <input
//             type="text"
//             className="input input-bordered"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//           />
//           <select
//             className="select select-bordered w-full max-w-xs"
//             onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}
//           >
//             <option value={"all"}>All</option>
//             <option value={"fikom"}>Fikom</option>
//             <option value={"dkv"}>DKV</option>
//             <option value={"fasilkom"}>Fasilkom</option>
//             <option value={"baleho 1"}>Baleho</option>
//             <option value={"baleho 2"}>Baleho</option>
//             <option value={"baleho 3"}>Baleho</option>
//             <option value={"baleho 4"}>Baleho</option>
//             <option value={"baleho 5"}>Baleho</option>
//             <option value={"baleho 6"}>Baleho</option>
//             <option value={"baleho 7"}>Baleho</option>
//             <option value={"baleho 8"}>Baleho</option>
//             <option value={"baleho 9"}>Baleho</option>
//             <option value={"baleho 10"}>Baleho</option>
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
//               addToMutasi={() => addToMutasi(product)}
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
