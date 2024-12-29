import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

const useProduct = () => {
  const { user, userProfile } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCustome, setCartCustome] = useState([]);
  const [data, setData] = useState([]);

  // get product
  useEffect(() => {
    const unsubProduct = onSnapshot(
      collection(db, "products"),
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
    return () => {
      unsubProduct();
    };
  }, []);

  // get cart
  useEffect(() => {
    const fetchCartData = () => {
      const cartDoc = doc(db, "cart", user.uid);
      const unsubCart = onSnapshot(
        cartDoc,
        (cartSnapshot) => {
          if (cartSnapshot.exists()) {
            const cartData = cartSnapshot.data();
            setCart(cartData.pesanan);
          } else {
            setCart([]);
          }
        },
        (error) => {
          console.error("Error fetching cart data:", error);
        }
      );

      return unsubCart; // Unsubscribe when component unmounts
    };

    if (user) {
      const unsubscribe = fetchCartData();
      return () => unsubscribe(); // Unsubscribe when user changes
    }
  }, [user]);

  useEffect(() => {
    const fetchCartDataCustome = () => {
      const cartDocCustome = doc(db, "cart", user.uid);
      const unsubCartCustome = onSnapshot(
        cartDocCustome,
        (cartSnapshot) => {
          if (cartSnapshot.exists()) {
            const cartDataCustome = cartSnapshot.data();
            setCartCustome(cartDataCustome.pesanan);
          } else {
            setCartCustome([]);
          }
        },
        (error) => {
          console.error("Error fetching cart data:", error);
        }
      );

      return unsubCartCustome; // Unsubscribe when component unmounts
    };

    if (user) {
      const unsubscribe = fetchCartDataCustome();
      return () => unsubscribe(); // Unsubscribe when user changes
    }
  }, [user]);

  const addToCart = async (product) => {
    const existingCartDoc = doc(db, "cart", user.uid);

    try {
      const cartSnapshot = await getDoc(existingCartDoc);
      if (cartSnapshot.exists()) {
        const existingCartData = cartSnapshot.data();
        const updatedPesanan = [...existingCartData.pesanan, product];

        await updateDoc(existingCartDoc, {
          pesanan: updatedPesanan,
          timeStamp: serverTimestamp(),
        });
      } else {
        const cartData = {
          userId: user.uid,
          userName: userProfile.name,
          timeStamp: serverTimestamp(),
          pesanan: [product],
        };

        await setDoc(existingCartDoc, cartData);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addToCartCustome = async (product) => {
    const existingCartDocCustome = doc(db, "cart", user.uid);

    try {
      const cartSnapshot = await getDoc(existingCartDocCustome);
      if (cartSnapshot.exists()) {
        const existingCartDataCustome = cartSnapshot.data();
        const updatedPesanan = [...existingCartDataCustome.pesanan, product];

        await updateDoc(existingCartDocCustome, {
          pesanan: updatedPesanan,
          timeStamp: serverTimestamp(),
        });
      } else {
        const cartDataCustome = {
          userId: user.uid,
          userName: userProfile.name,
          timeStamp: serverTimestamp(),
          pesanan: [product],
        };

        await setDoc(existingCartDocCustome, cartDataCustome);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productToRemove) => {
    const existingCartDoc = doc(db, "cart", user.uid);

    try {
      const cartSnapshot = await getDoc(existingCartDoc);
      if (cartSnapshot.exists()) {
        const existingCartData = cartSnapshot.data();
        const updatedPesanan = existingCartData.pesanan.filter(
          (product) => product.id !== productToRemove.id
        );

        await updateDoc(existingCartDoc, {
          pesanan: updatedPesanan,
          timeStamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const removeFromCartCustome = async (productToRemove) => {
    const existingCartDocCustome = doc(db, "cart", user.uid);

    try {
      const cartSnapshot = await getDoc(existingCartDocCustome);
      if (cartSnapshot.exists()) {
        const existingCartDataCustome = cartSnapshot.data();
        const updatedPesanan = existingCartDataCustome.pesanan.filter(
          (product) => product.id !== productToRemove.id
        );

        await updateDoc(existingCartDocCustome, {
          pesanan: updatedPesanan,
          timeStamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const isInCart = (productId) => {
    return cart.some((product) => product.id === productId);
  };

  const isInCartCustome = (productId) => {
    return cartCustome.some((product) => product.id === productId);
  };

  return { data, cart, cartCustome, isInCart, isInCartCustome, addToCart, addToCartCustome, removeFromCart, removeFromCartCustome, setData };
};

export default useProduct;
