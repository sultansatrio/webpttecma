// import { numberToRupiah } from "@/utils/rupiah";
// import React from "react";

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   fakultas,
//   addToCart,
//   removeFromCart,
//   isInCart,
// }) => {
//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//       </div>
//       <div className="px-6 py-3">
//         {isInCart ? ( // ubah teks tombol berdasarkan properti inCart
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart} // tambahkan event onClick removeFromCart
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCart}
//           >
//             Add To Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CardItem;


//update tgl 26 desember 2024
// import { numberToRupiah } from "@/utils/rupiah";
// import React, { useState, useEffect } from "react";
// import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore"; // Import Firestore functions

// const CardItem = ({
//   imageUrl,
//   judul,
//   deskripsi,
//   harga,
//   hargaJangkauan,
//   jangkauan,
//   statusCustome,
//   fakultas,
//   addToCart,
//   addToCartCustome,
//   removeFromCart,
//   removeFromCartCustome,
//   isInCart,
//   isInCartCustome,
// }) => {
//   const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
//   const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
//   const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate

//   const db = getFirestore(); // Initialize Firestore

//   useEffect(() => {
//     // Listen for changes on the Firestore document
//     const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         setStatusPermintaan(data.statusCustome); // Update status from Firestore data
//       }
//     });

//     // Cleanup listener when the component is unmounted or judul changes
//     return () => unsubscribe();
//   }, [db, judul]);

//   const handleToggleInput = () => {
//     setShowInput(!showInput);
//   };

//   const handleInputChange = (e) => {
//     setJangkauanCustome(e.target.value);
//   };

//   // const handleSaveJangkauan = async () => {
//   //   try {
//   //     const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//   //     await setDoc(docRef, {
//   //       jangkauan,
//   //       imageUrl,
//   //       judul,
//   //       deskripsi,
//   //       harga,
//   //       hargaJangkauan,
//   //       fakultas,
//   //     });
//   //     console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//   //       jangkauan,
//   //       imageUrl,
//   //       judul,
//   //       deskripsi,
//   //       harga,
//   //       hargaJangkauan,
//   //       fakultas,
//   //     });
//   //   } catch (error) {
//   //     console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//   //   }
//   //   setShowInput(false); // Sembunyikan input setelah menyimpan
//   // };


//   const handleSaveJangkauan = async () => {
//     try {
//       // Pastikan jangkauan dan hargaJangkauan adalah angka
//       const parsedJangkauan = parseFloat(jangkauanCustome);
//       const parsedHargaJangkauan = parseFloat(hargaJangkauan);
  
//       // Periksa apakah parsing berhasil
//       if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
//         throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
//       }
  
//       // Hitung harga
//       const harga = parsedJangkauan * parsedHargaJangkauan;
  
//       const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
//       await setDoc(docRef, {
//         jangkauanCustome: parsedJangkauan,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//       });
//       console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
//         jangkauanCustome: parsedJangkauan,
//         imageUrl,
//         judul,
//         deskripsi,
//         statusCustome,
//         harga,
//         hargaJangkauan: parsedHargaJangkauan,
//         fakultas,
//       });
//     } catch (error) {
//       console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
//     }
//     setShowInput(false); // Sembunyikan input setelah menyimpan
//   };
  
//   return (
//     <div className="w-full rounded overflow-hidden shadow-lg">
//       <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
//       <div className="px-6 py-3">
//         {fakultas && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {fakultas}
//           </p>
//         )}
//         <div className=" text-xl mb-2">{judul}</div>
//         <p className="text-gray-700 text-base">{deskripsi}</p>
//         {harga && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
//         )}
//         <br/>
//         <p>Harga Sebulan</p>
//         {hargaJangkauan && (
//           <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
//         )}
//         <br/>
//         <p>Massa Sewa</p>
//         {jangkauan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {jangkauan}
//           </p>
//         )}
//         <br/>
//         <p>Status Custome</p>
//         {statusPermintaan && (
//           <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
//             {statusPermintaan}
//           </p>
//         )}
//       </div>
//       <div className="px-6 py-3">
//         {isInCart ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCart}
//           >
//             Remove From Cart
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCart}
//           >
//             Add To Cart
//           </button>
//         ) }
//         {/* <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button> */}
//       </div>
//       <div className="px-6 py-3">
//         {isInCartCustome ? (
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
//             onClick={removeFromCartCustome}
//           >
//             Remove From Cart Custome
//           </button>
//         ) : (
//           <button
//             className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
//             onClick={addToCartCustome}
//           >
//             Add To Cart Cutome
//           </button>
//         ) }
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
//           onClick={handleToggleInput}
//         >
//           {showInput ? "Cancel" : "Add Jangkauan"}
//         </button>
//       </div>
//       {showInput && (
//         <div className="px-6 py-3">
//           <input
//             type="text"
//             className="border rounded w-full py-2 px-3 text-gray-700"
//             placeholder="Masukkan deskripsi jangkauan sewa"
//             value={jangkauanCustome}
//             onChange={handleInputChange}
//           />
//           <button
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
//             onClick={handleSaveJangkauan}
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardItem;






import { numberToRupiah } from "@/utils/rupiah";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const CardItem = ({
  imageUrl,
  judul,
  deskripsi,
  harga,
  hargaJangkauan,
  jangkauan,
  statusCustome,
  fakultas,
  addToCart,
  addToCartCustome,
  removeFromCart,
  removeFromCartCustome,
  isInCart,
  isInCartCustome,
}) => {
  const [showInput, setShowInput] = useState(false); // State untuk mengontrol tampilan input
  const [jangkauanCustome, setJangkauanCustome] = useState(""); // State untuk menyimpan jangkauan sewa
  const [statusPermintaan, setStatusPermintaan] = useState(statusCustome); // State untuk menyimpan statusCustome yang terupdate
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const db = getFirestore(); // Initialize Firestore

  // useEffect(() => {
  //   // Listen for changes on the Firestore document
  //   const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
  //   const unsubscribe = onSnapshot(docRef, (docSnap) => {
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       setStatusPermintaan(data.statusCustome); // Update status from Firestore data
  //     }
  //   });

  //   // Cleanup listener when the component is unmounted or judul changes
  //   return () => unsubscribe();
  // }, [db, judul]);

  useEffect(() => {
    // Listen for changes on the Firestore document
    const docRef = doc(db, "jangkauanCustomSewa", judul);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStatusPermintaan(data.statusCustome); // Update status from Firestore data
  
        // Tambahkan item ke keranjang jika status di-ACC admin
        if (
          data.statusCustome ===
          "Di Acc Admin Silahkan Memasukkan ke Keranjang"
        ) {
          if (!isInCart) {
            addToCart(); // Panggil fungsi untuk menambahkan ke keranjang
            console.log(`${judul} telah ditambahkan ke keranjang.`);
          }
        }
      }
    });
  
    return () => unsubscribe();
  }, [db, judul, isInCart, addToCart]);
  

  const handleToggleInput = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e) => {
    setJangkauanCustome(e.target.value);
  };

const handleStartDateChange = (e) => {
  setStartDate(e.target.value);
};

const handleEndDateChange = (e) => {
  setEndDate(e.target.value);
};

  const handleSaveJangkauan = async () => {
    try {
      // Pastikan jangkauan dan hargaJangkauan adalah angka
      const parsedJangkauan = parseFloat(jangkauanCustome);
      const parsedHargaJangkauan = parseFloat(hargaJangkauan);
  
      // Periksa apakah parsing berhasil
      if (isNaN(parsedJangkauan) || isNaN(parsedHargaJangkauan)) {
        throw new Error("jangkauan atau hargaJangkauan bukan angka yang valid.");
      }
  
      // Hitung harga
      const harga = parsedJangkauan * parsedHargaJangkauan;
  
      const docRef = doc(db, "jangkauanCustomSewa", judul); // Use judul as document ID
      await setDoc(docRef, {
        jangkauanCustome: parsedJangkauan,
        startDate,
        endDate,
        imageUrl,
        judul,
        deskripsi,
        statusCustome,
        harga,
        hargaJangkauan: parsedHargaJangkauan,
        fakultas,
      });
      console.log("Deskripsi Jangkauan Sewa berhasil disimpan:", {
        jangkauanCustome: parsedJangkauan,
        startDate,
        endDate,
        imageUrl,
        judul,
        deskripsi,
        statusCustome,
        harga,
        hargaJangkauan: parsedHargaJangkauan,
        fakultas,
      });
    } catch (error) {
      console.error("Gagal menyimpan deskripsi jangkauan sewa:", error);
    }
    setShowInput(false); // Sembunyikan input setelah menyimpan
  };
  
  return (
    <div className="w-full rounded overflow-hidden shadow-lg">
      <img className="w-full h-44 object-cover" src={imageUrl} alt={judul} />
      <div className="px-6 py-3">
        {fakultas && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {fakultas}
          </p>
        )}
        <div className=" text-xl mb-2">{judul}</div>
        <p className="text-gray-700 text-base">{deskripsi}</p>
        {harga && (
          <p className="text-red-600 text-base mt-2">{numberToRupiah(harga)}</p>
        )}
        <br/>
        <p>Harga Sebulan</p>
        {hargaJangkauan && (
          <p className="text-red-600 text-base mt-2">{numberToRupiah(hargaJangkauan)}</p>
        )}
        <br/>
        <p>Massa Sewa</p>
        {jangkauan && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {jangkauan}
          </p>
        )}
        <br/>
        <p>Status Custome</p>
        {statusPermintaan && (
          <p className="text-gray-400 font-semibold text-base mt-2 uppercase">
            {statusPermintaan}
          </p>
        )}
      </div>
      <div className="px-6 py-3">
        {isInCart ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded"
            onClick={removeFromCart}
          >
            Remove From Cart
          </button>
        ) : (
          <button
            className="bg-gray-200 hover:bg-teal-500 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
            onClick={addToCart}
          >
            Add To Cart
          </button>
        ) }
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleToggleInput}
        >
          {showInput ? "Cancel" : "Add Jangkauan"}
        </button>
      </div>
      {showInput && (
        <div className="px-6 py-3">
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Masukkan deskripsi jangkauan sewa"
            value={jangkauanCustome}
            onChange={handleInputChange}
          />
          <input
  type="date"
  className="border rounded w-full py-2 px-3 text-gray-700"
  placeholder="Masukkan tanggal mulai"
  value={startDate}
  onChange={handleStartDateChange}
/>

<input
  type="date"
  className="border rounded w-full py-2 px-3 text-gray-700"
  placeholder="Masukkan tanggal akhir"
  value={endDate}
  onChange={handleEndDateChange}
/>

          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleSaveJangkauan}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CardItem;