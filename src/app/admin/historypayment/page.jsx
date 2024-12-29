// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState([]);

//   // Fungsi untuk fetch data dari Firestore
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "cart"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Fungsi untuk memperbarui status di Firestore
//   const handleApproval = async (transactionId) => {
//     try {
//       const transactionDoc = doc(db, "cart", transactionId);
//       await updateDoc(transactionDoc, {
//         status: "disetujui", // Menambahkan atau memperbarui field "status"
//       });

//       // Perbarui status di state lokal
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((transaction) =>
//           transaction.id === transactionId
//             ? { ...transaction, status: "disetujui" }
//             : transaction
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="transaction-history">
//       <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//       {transactions.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         transactions.map((transaction) => (
//           <div key={transaction.id} className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//             <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//             <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//             <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//             {transaction.pesanan ? (
//               <table className="table-auto w-full border">
//                 <thead>
//                   <tr>
//                     <th>Judul</th>
//                     <th>Kategori</th>
//                     <th>Deskripsi</th>
//                     <th>Harga</th>
//                     <th>Status</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transaction.pesanan.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.title}</td>
//                       <td>{item.category}</td>
//                       <td>{item.description}</td>
//                       <td>{item.price}</td>
//                       <td>{transaction.status || "Belum Disetujui"}</td>
//                       <td>
//                         <button
//                           className="bg-blue-500 text-white px-3 py-1 rounded"
//                           onClick={() => handleApproval(transaction.id)}
//                           disabled={transaction.status === "disetujui"} // Disable jika sudah disetujui
//                         >
//                           {transaction.status === "disetujui"
//                             ? "Sudah Disetujui"
//                             : "Setujui"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Pesanan tidak tersedia.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default TransactionHistory;



// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
// import NavbarAdmin from "@/components/NavbarAdmin";

// const TransactionHistory = () => {
//   const [transactions, setTransactions] = useState([]);

//   // Fungsi untuk fetch data dari Firestore
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "cart"));
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   // Fungsi untuk memperbarui status di Firestore dan menambah transaksi
//   const handleApproval = async (transactionId) => {
//     try {
//       // 1. Update the status in the 'cart' collection
//       const transactionDoc = doc(db, "cart", transactionId);
//       await updateDoc(transactionDoc, {
//         status: "disetujui", // Update status to 'disetujui'
//       });

//       // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
//       const transactionSnapshot = await getDocs(doc(db, "cart", transactionId));
//       const transactionData = transactionSnapshot.data();

//       // 3. Add the transaction to the 'transactions' collection
//       if (transactionData) {
//         await addDoc(collection(db, "transactions"), {
//           order_id: transactionData.order_id,
//           user_id: transactionData.user_id,
//           userName: transactionData.userName,
//           status: "disetujui", // Transaction is approved
//           pesanan: transactionData.pesanan,
//           gross_amount: transactionData.gross_amount,
//           payment_type: transactionData.payment_type,
//           timeStamp: transactionData.timeStamp,
//           timestamp: new Date(), // Timestamp when added to transactions collection
//         });
//       }

//       // 4. Perbarui status di state lokal
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((transaction) =>
//           transaction.id === transactionId
//             ? { ...transaction, status: "disetujui" }
//             : transaction
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status or adding to transactions:", error);
//     }
//   };

//   return (
//     <>
//     <NavbarAdmin/>
//     <div className="transaction-history"         style={{ paddingTop: "150px", paddingLeft: "100px" }}>
//       <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
//       {transactions.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         transactions.map((transaction) => (
//           <div key={transaction.id} className="mb-6 border p-4 rounded">
//             <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
//             <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
//             <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
//             <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
//             {transaction.pesanan ? (
//               <table className="table-auto w-full border">
//                 <thead>
//                   <tr>
//                     <th>Judul</th>
//                     <th>Kategori</th>
//                     <th>Deskripsi</th>
//                     <th>Harga</th>
//                     <th>Status</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transaction.pesanan.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.title}</td>
//                       <td>{item.category}</td>
//                       <td>{item.description}</td>
//                       <td>{item.price}</td>
//                       <td>{transaction.status || "Belum Disetujui"}</td>
//                       <td>
//                         <button
//                           className="bg-blue-500 text-white px-3 py-1 rounded"
//                           onClick={() => handleApproval(transaction.id)}
//                           disabled={transaction.status === "disetujui"} // Disable if already approved
//                         >
//                           {transaction.status === "disetujui"
//                             ? "Sudah Disetujui"
//                             : "Setujui"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>Pesanan tidak tersedia.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//     </>
//   );
// };

// export default TransactionHistory;



"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import NavbarAdmin from "@/components/NavbarAdmin";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCustome, setTransactionsCustome] = useState([]);
  // Fungsi untuk fetch data dari Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cart"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchTransactionsCustome = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jangkauanCustomSewa"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactionsCustome(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactionsCustome();
  }, []);

  // Fungsi untuk mencopot Baleho
  const handleRemoveBaleho = async (transactionId) => {
    try {
      // Ambil data transaksi menggunakan getDoc
      const transactionDoc = doc(db, "cart", transactionId);
      const transactionSnapshot = await getDoc(transactionDoc);

      // Periksa apakah dokumen ada
      if (transactionSnapshot.exists()) {
        // Perbarui statusMutasi di Firestore
        await updateDoc(transactionDoc, {
          statusMutasi: "Baleho Ready", // Update statusMutasi
        });

        // Perbarui status di state lokal
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, statusMutasi: "Baleho Ready" }
              : transaction
          )
        );
      } else {
        console.error("Transaksi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error memperbarui statusMutasi:", error);
    }
  };

  const handleRemoveBalehoCustome = async (transactionIdCustome) => {
    try {
      // Ambil data transaksi menggunakan getDoc
      const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
      const transactionSnapshotCustome = await getDoc(transactionDocCustome);

      // Periksa apakah dokumen ada
      if (transactionSnapshotCustome.exists()) {
        // Perbarui statusMutasi di Firestore
        await updateDoc(transactionDocCustome, {
          statusMutasi: "Baleho Ready", // Update statusMutasi
        });

        // Perbarui status di state lokal
        setTransactionsCustome((prevTransactionsCustome) =>
          prevTransactionsCustome.map((transactionCustome) =>
            transactionCustome.id === transactionId
              ? { ...transactionCustome, statusMutasi: "Baleho Ready" }
              : transactionCustome
          )
        );
      } else {
        console.error("Transaksi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error memperbarui statusMutasi:", error);
    }
  };



  // Fungsi untuk menyetujui transaksi
  const handleApproval = async (transactionId) => {
    try {
      // 1. Update the status in the 'cart' collection
      const transactionDoc = doc(db, "cart", transactionId);
      await updateDoc(transactionDoc, {
        status: "disetujui", // Update status to 'disetujui'
      });

      // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
      const transactionSnapshot = await getDoc(doc(db, "cart", transactionId));
      const transactionData = transactionSnapshot.data();

      // 3. Add the transaction to the 'transactions' collection
      if (transactionData) {
        await addDoc(collection(db, "transactions"), {
          order_id: transactionData.order_id,
          user_id: transactionData.user_id,
          userName: transactionData.userName,
          status: "disetujui", // Transaction is approved
          pesanan: transactionData.pesanan,
          gross_amount: transactionData.gross_amount,
          payment_type: transactionData.payment_type,
          timeStamp: transactionData.timeStamp,
          timestamp: new Date(), // Timestamp when added to transactions collection
        });
      }

      // 4. Perbarui status di state lokal
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status: "disetujui" }
            : transaction
        )
      );
    } catch (error) {
      console.error("Error updating status or adding to transactions:", error);
    }
  };


    // Fungsi untuk menyetujui transaksi
    const handleApprovalCustome = async (transactionIdCustome) => {
      try {
        // 1. Update the status in the 'cart' collection
        const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
        await updateDoc(transactionDocCustome, {
          statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang", // Update status to 'disetujui'
        });
  
        // 2. Fetch the transaction details from Firestore (for adding to 'transactions' collection)
        const transactionSnapshotCustome = await getDoc(doc(db, "jangkauanCustomeSewa", transactionIdCustome));
        const transactionDataCustome = transactionSnapshotCustome.data();
  
        // 3. Add the transaction to the 'transactions' collection
        if (transactionDataCustome) {
          await addDoc(collection(db, "jangkauanCustomSewa"), {
            judul: transactionDataCustome.judul,
            deskripsi: transactionDataCustome.deskripsi,
            userName: transactionDataCustome.userName,
            statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang", // Transaction is approved
            startDate: transactionDataCustome.startDate,
            endDate: transactionDataCustome.endDate,
            harga: transactionDataCustome.harga,
            hargaJangkauan: transactionDataCustome.hargaJangkauan,
            jangkauanCustome: transactionDataCustome.jangkauanCustome,
            timeStamp: transactionDataCustome.timeStamp,
            timestamp: new Date(), // Timestamp when added to transactions collection
          });
        }
  
        // 4. Perbarui status di state lokal
        setTransactionsCustome((prevTransactionsCustome) =>
          prevTransactionsCustome.map((transactionCustome) =>
            transactionCustome.id === transactionIdCustome
              ? { ...transactionCustome, statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang" }
              : transactionCustome
          )
        );
      } catch (error) {
        console.error("Error updating status or adding to transactions:", error);
      }
    };


  // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
  const handleSuccessTransaction = async (transactionId) => {
    try {
      // Ambil data transaksi menggunakan getDoc
      const transactionDoc = doc(db, "cart", transactionId);
      const transactionSnapshot = await getDoc(transactionDoc);

      // Periksa apakah dokumen ada
      if (transactionSnapshot.exists()) {
        const transactionData = transactionSnapshot.data();

        // Tambahkan transaksi ke koleksi 'cartMutasi'
        await addDoc(collection(db, "cartMutasi"), {
          userId: transactionData.userId,
          userName: transactionData.userName,
          statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
          pesanan: transactionData.pesanan,
          timeStamp: transactionData.timeStamp,
          timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
        });

        // Perbarui status di state lokal
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order" }
              : transaction
          )
        );
      } else {
        console.error("Transaksi tidak ditemukan!");
      }
    } catch (error) {
      console.error("Error memindahkan transaksi ke cartMutasi:", error);
    }
  };

    // Fungsi untuk memasukkan transaksi ke 'cartMutasi'
    // const handleSuccessTransactionCustome = async (transactionIdCustome) => {
    //   try {
    //     // Ambil data transaksi menggunakan getDoc
    //     const transactionDocCustome = doc(db, "jangkauanCustomSewa", transactionIdCustome);
    //     const transactionSnapshotCustome = await getDoc(transactionDocCustome);
  
    //     // Periksa apakah dokumen ada
    //     if (transactionSnapshotCustome.exists()) {
    //       const transactionDataCustome = transactionSnapshotCustome.data();
  
    //       // Tambahkan transaksi ke koleksi 'cartMutasi'
    //       await addDoc(collection(db, "cartMutasiCustome"), {
    //         userId: transactionDataCustome.userId,
    //         userName: transactionDataCustome.userName,
    //         // statusMutasi: "Transaksi Sukses,Baleho Sudah Di Order", // Tandai transaksi sebagai sukses
    //         statusCustome:"Di Acc Admin Silahkan Memasukkan ke Keranjang",
    //         pesananCustome: transactionDataCustome.pesananCustome,
    //         timeStamp: transactionDataCustome.timeStamp,
    //         timestamp: new Date(), // Timestamp saat ditambahkan ke 'cartMutasi'
    //       });
  
    //       // Perbarui status di state lokal
    //       setTransactionsCustome((prevTransactionsCustome) =>
    //         prevTransactionsCustome.map((transactionCustome) =>
    //           transactionCustome.id === transactionIdCustome
    //             ? { ...transactionCustome, statusCustome: "Di Acc Admin Silahkan Memasukkan ke Keranjang" }
    //             : transactionCustome
    //         )
    //       );
    //     } else {
    //       console.error("Transaksi tidak ditemukan!");
    //     }
    //   } catch (error) {
    //     console.error("Error memindahkan transaksi ke cartMutasi:", error);
    //   }
    // };

    const handleSuccessTransactionCustome = async () => {
      try {
        // Filter transactions dengan status tertentu
        const transactionsToMove = transactionsCustome.filter(
          (transactionCustome) =>
            transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
        );
    
        for (const transaction of transactionsToMove) {
          // Ambil dokumen dari Firestore
          const transactionDoc = doc(db, "jangkauanCustomSewa", transaction.id);
          const transactionSnapshot = await getDoc(transactionDoc);
    
          if (transactionSnapshot.exists()) {
            const transactionData = transactionSnapshot.data();
    
            // Tambahkan transaksi ke koleksi 'cartMutasiCustome'
            await addDoc(collection(db, "cartMutasiCustome"), {
              // userId: transactionData.userId,
              // userName: transactionData.userName,
              statusCustome: transactionData.statusCustome,
              judul: transactionData.judul,
              deskripsi: transactionData.deskripsi,
              startDate: transactionData.startDate,
              endDate: transactionData.endDate,
              harga: transactionData.harga,
              hargaJangkauan: transactionData.hargaJangkauan,
              jangkauanCustome: transactionData.jangkauanCustome,
              // timeStamp: transactionData.timeStamp,
              // timestamp: new Date(), // Waktu pemindahan
            });
    
            // Update state lokal
            setTransactionsCustome((prevTransactionsCustome) =>
              prevTransactionsCustome.map((transactionCustome) =>
                transactionCustome.id === transaction.id
                  ? { ...transactionCustome, statusCustome: "Dipindahkan ke CartMutasiCustome" }
                  : transactionCustome
              )
            );
          } else {
            console.error("Transaksi tidak ditemukan untuk ID:", transaction.id);
          }
        }
    
        console.log("Semua transaksi yang sesuai berhasil dipindahkan.");
      } catch (error) {
        console.error("Error memindahkan transaksi:", error);
      }
    };
    
    

  return (
    <>
      <NavbarAdmin />
      <div className="transaction-history" style={{ paddingTop: "150px", paddingLeft: "100px" }}>
        <h1 className="text-2xl font-bold mb-4">Riwayat Transaksi</h1>
        {transactions.length === 0 ? (
          <p>Belum ada transaksi.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="mb-6 border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">Order ID: {transaction.id}</h2>
              <p><strong>User Name:</strong> {transaction.userName || "Tidak Diketahui"}</p>
              <p><strong>Tanggal:</strong> {new Date(transaction.timeStamp?.toDate()).toLocaleString()}</p>
              <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
              {transaction.pesanan ? (
                <table className="table-auto w-full border">
                  <thead>
                    <tr>
                      <th>Judul</th>
                      <th>Kategori</th>
                      <th>Deskripsi</th>
                      <th>Harga</th>
                      <th>Status</th>
                      <th>Status Mutasi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaction.pesanan.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{transaction.status || "Belum Disetujui"}</td>
                        <td>{transaction.statusMutasi}</td>
                        <td>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleApproval(transaction.id)}
                            disabled={transaction.status === "disetujui"} // Disable if already approved
                          >
                            {transaction.status === "disetujui"
                              ? "Sudah Disetujui"
                              : "Setujui"}
                          </button>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                            onClick={() => handleSuccessTransaction(transaction.id)}
                            disabled={transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order"} // Disable if already successful
                          >
                            {transaction.statusMutasi === "Transaksi Sukses,Baleho Sudah Di Order"
                              ? "Transaksi Sukses"
                              : "Transaksi Sukses"}
                          </button>
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                            onClick={() => handleRemoveBaleho(transaction.id)}
                            disabled={transaction.statusMutasi === "Baleho Ready"} // Disable if already marked as ready
                          >
                            {transaction.statusMutasi === "Baleho Ready"
                              ? "Baleho Ready"
                              : "Copot Baleho"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Pesanan tidak tersedia.</p>
              )}
            </div>
          ))
        )}

<h1 className="text-2xl font-bold mb-4">Riwayat Transaksi Custome</h1>
{transactionsCustome.filter((transactionCustome) => transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang").length === 0 ? (
  <p>Belum ada transaksi Custome dengan status "Di Acc Admin Silahkan Memasukkan ke Keranjang".</p>
) : (
  transactionsCustome
    .filter((transactionCustome) => transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang")
    .map((transactionCustome) => (
      <div key={transactionCustome.id} className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-medium mt-4">Pesanan:</h3>
        <h2 className="text-xl font-semibold mb-2">Order ID: {transactionCustome.judul}</h2>
        <p className="text-xl font-semibold mb-2">Deksripsi: {transactionCustome.deskripsi}</p>
        <p className="text-xl font-semibold mb-2">Status: {transactionCustome.statusCustome}</p>
        <p className="text-xl font-semibold mb-2">Awal Pemasangan: {transactionCustome.startDate}</p>
        <p className="text-xl font-semibold mb-2">Akhir Pemasangan: {transactionCustome.endDate}</p>
        <p className="text-xl font-semibold mb-2">Jangkauan: {transactionCustome.jangkauanCustome}</p>
        <p className="text-xl font-semibold mb-2">Harga Total: {transactionCustome.harga}</p>
        <p className="text-xl font-semibold mb-2">Harga Sebulan: {transactionCustome.hargaJangkauan}</p>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => handleApprovalCustome(transactionCustome.id)}
          disabled={transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        >
          {transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            ? "Sudah Disetujui"
            : "Setujui"}
        </button>
        {/* <button
          className="bg-green-500 text-white px-3 py-1 rounded ml-2"
          onClick={() => handleSuccessTransactionCustome(transactionCustome.id)}
          disabled={transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        >
          {transactionCustome.statusCustome === "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            ? "Di Acc Admin Silahkan Memasukkan ke Keranjang"
            : "Di Acc Admin Silahkan Memasukkan ke Keranjang"}
        </button> */}
        <button
  className="bg-green-500 text-white px-3 py-1 rounded"
  onClick={handleSuccessTransactionCustome}
>
  Pindahkan Semua ke CartMutasiCustome
</button>

        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
          onClick={() => handleRemoveBalehoCustome(transactionCustome.id)}
          disabled={transactionCustome.statusMutasi === "Baleho Ready"}
        >
          {transactionCustome.statusMutasi === "Baleho Ready" ? "Baleho Ready" : "Copot Baleho"}
        </button>
      </div>
    ))
)}

      </div>
    </>
  );
};

export default TransactionHistory;




