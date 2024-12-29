// // Mutasi.jsx

// import React from 'react';
// import { numberToRupiah } from "@/utils/rupiah";

// const MutasiDrawer = ({ cart, totalPrice, phoneNumber, otpCode, setPhoneNumber, setOtpCode, handlePesanClick, isOtpSent }) => {
//   return (
//     <div>
//       <h2>Detail Pesanan</h2>
//       <ul>
//         {cart.map((item) => (
//           <li key={item.id}>
//             <p>{item.title}: {numberToRupiah(item.price)}</p>
//           </li>
//         ))}
//       </ul>
//       <p>Total: {numberToRupiah(totalPrice)}</p>
//       <input
//         type="text"
//         placeholder="Masukkan Nomor Telepon"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//         className="border p-2 mb-4"
//       />
//       <input
//         type="text"
//         placeholder="Masukkan Kode OTP"
//         value={otpCode}
//         onChange={(e) => setOtpCode(e.target.value)}
//         className="border p-2 mb-4"
//       />
//       <button
//         className="btn btn-accent mt-2 w-full"
//         onClick={handlePesanClick}
//       >
//         {isOtpSent ? 'Verifikasi OTP' : 'Kirim OTP'}
//       </button>
//     </div>
//   );
// };

// export default MutasiDrawer;


// Mutasi.jsx

import React from 'react';
import { numberToRupiah } from "@/utils/rupiah";

const MutasiDrawer = ({
  cart = [],         // Default to an empty array if cart is undefined
  totalPrice = 0,    // Default to 0 if totalPrice is undefined
  phoneNumber,
  otpCode,
  setPhoneNumber,
  setOtpCode,
  handlePesanClick,
  isOtpSent
}) => {
  return (
    <div>
      <h2>Detail Pesanan</h2>
      {/* Check if cart is an array and render the list */}
      <ul>
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id}>
              <p>{item.title}: {numberToRupiah(item.price)}</p>
            </li>
          ))
        ) : (
          <li><p>No items in the cart.</p></li> // Display message when cart is empty or not an array
        )}
      </ul>
      {/* Ensure totalPrice is always a number */}
      <p>Total: {numberToRupiah(totalPrice)}</p>

      {/* Phone Number and OTP Inputs */}
      <input
        type="text"
        placeholder="Masukkan Nomor Telepon"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="text"
        placeholder="Masukkan Kode OTP"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        className="border p-2 mb-4"
      />
      
      {/* Button */}
      <button
        className="btn btn-accent mt-2 w-full"
        onClick={handlePesanClick}
      >
        {isOtpSent ? 'Verifikasi OTP' : 'Kirim OTP'}
      </button>
    </div>
  );
};

export default MutasiDrawer;
