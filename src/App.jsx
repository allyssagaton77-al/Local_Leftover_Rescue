import React, { useEffect, useMemo, useRef, useState } from "react";
import { Toast } from "./components.jsx";
import {
  foods as initialFoods,
  initialNotifications,
  pastOrders,
} from "./data.js";
import {
  About,
  AddListing,
  Cart,
  Complete,
  Contact,
  FoodDetails,
  History,
  Home,
  Listing,
  Loading,
  Login,
  Notifications,
  Onboarding,
  OrderSummary,
  Profile,
  Settings,
  SignUp,
  Track,
  Welcome,
} from "./screens.jsx";

const makeId = () =>
  `LLR-${Math.floor(1105 + Math.random() * 700)}-${Math.floor(10 + Math.random() * 89)}`;

const today = () =>
  new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function App() {
  const [screen, setScreen] = useState("loading");
  const [loadingTarget, setLoadingTarget] = useState("onboarding");
  const [allFoods, setAllFoods] = useState(initialFoods);
  const [selectedFood, setSelectedFood] = useState(initialFoods[0]);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(["vegetable-salad"]);
  const [homeCategory, setHomeCategory] = useState("All");
  const [payments, setPayments] = useState("cash");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [orders, setOrders] = useState(pastOrders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [toast, setToast] = useState("");
  const bodyRef = useRef(null);

  const go = (next) => {
    setScreen(next);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  const goLoading = (target) => {
    setLoadingTarget(target);
    setScreen("loading");
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  const notify = (message) => setToast(message);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (screen !== "loading") return undefined;
    const timer = window.setTimeout(() => go(loadingTarget), 1900);
    return () => window.clearTimeout(timer);
  }, [screen, loadingTarget]);

  const cartItems = useMemo(
    () =>
      cart
        .map((entry) => {
          const food = allFoods.find((item) => item.id === entry.id);
          return food ? { food, qty: entry.qty } : null;
        })
        .filter(Boolean),
    [cart, allFoods]
  );

  const subtotal = cartItems.reduce((sum, { food, qty: count }) => sum + food.price * count, 0);
  const cartCount = cartItems.reduce((sum, { qty: count }) => sum + count, 0);
  const unread = notifications.filter((item) => item.unread).length;

  const openFood = (food) => {
    setSelectedFood(food);
    setQty(1);
    go("food");
  };

  const toggleWishlist = (id) => {
    const saved = wishlist.includes(id);
    setWishlist((prev) => (saved ? prev.filter((item) => item !== id) : [...prev, id]));
    notify(saved ? "Removed from wishlist" : "Saved to wishlist");
  };

  const addToCart = (food, count = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, qty: Math.min(food.portions, item.qty + count) } : item
        );
      }
      return [...prev, { id: food.id, qty: count }];
    });
    notify(`${food.name} added to cart`);
  };

  const changeQty = (id, next) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: next } : item)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    notify("Item removed from cart");
  };

  const placeOrder = () => {
    if (!cartItems.length) {
      notify("Your cart is empty");
      return;
    }
    const shop = cartItems[0].food.shop;
    const order = {
      id: makeId(),
      date: today(),
      items: cartItems,
      total: subtotal,
      status: 0,
      shop,
      pickup: cartItems[0].food.pickup,
      payment: payments,
    };
    setOrders((prev) => [order, ...prev]);
    setCurrentOrder(order);
    setCart([]);
    notify("Claim confirmed! Your meal is reserved.");
    go("order");
  };

  const updateStatus = (nextStatus, destination) => {
    if (!currentOrder) return;
    const updated = { ...currentOrder, status: nextStatus };
    setCurrentOrder(updated);
    setOrders((prev) => prev.map((order) => (order.id === updated.id ? updated : order)));
    if (destination) go(destination);
  };

  const openOrder = (order) => {
    setCurrentOrder(order);
    go(order.status === 3 ? "complete" : "track");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
    notify("All notifications marked as read");
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const publishListing = (form) => {
    const newFood = {
      id: `custom-${Date.now()}`,
      name: form.name || "New leftover find",
      shop: form.location || "Your shop",
      price: 30,
      category: form.category,
      portions: Math.max(1, Number(form.portions) || 1),
      pickup: form.pickup || "Today, 7:00 PM",
      distance: "Near you",
      expires: "Best before today",
      emoji: "🍲",
      image: "/images/fruit-box.jpg",
      color: "#e5efe0",
      badge: "New",
      rating: 5,
      description: "A fresh leftover listing shared by a neighbor. Message the shop through the app to arrange pickup.",
    };
    setAllFoods((prev) => [newFood, ...prev]);
    notify("Your listing is live!");
    go("listing");
  };

  const renderScreen = () => {
    switch (screen) {
      case "loading":
        return <Loading />;
      case "onboarding":
        return <Onboarding onGetStarted={() => go("welcome")} onLogin={() => go("login")} />;
      case "welcome":
        return <Welcome onFinish={() => goLoading("home")} onLogin={() => go("login")} />;
      case "login":
        return (
          <Login
            onBack={() => go("onboarding")}
            onSubmit={() => goLoading("home")}
            onSignUp={() => go("signup")}
          />
        );
      case "signup":
        return (
          <SignUp
            onBack={() => go("login")}
            onSubmit={() => goLoading("home")}
            onLogin={() => go("login")}
          />
        );
      case "home":
        return (
          <Home
            foods={allFoods}
            wishlist={wishlist}
            category={homeCategory}
            setCategory={setHomeCategory}
            unread={unread}
            onWishlist={toggleWishlist}
            onOpen={openFood}
            onNotifications={() => go("notifications")}
            onProfile={() => go("profile")}
            onListing={() => go("listing")}
            onAdd={() => go("add")}
          />
        );
      case "listing":
        return (
          <Listing
            foods={allFoods}
            wishlist={wishlist}
            onWishlist={toggleWishlist}
            onOpen={openFood}
            onHome={() => go("home")}
            onAdd={() => go("add")}
            onProfile={() => go("profile")}
          />
        );
      case "food":
        return (
          <FoodDetails
            food={selectedFood}
            wished={wishlist.includes(selectedFood.id)}
            qty={qty}
            setQty={setQty}
            cartCount={cartCount}
            onBack={() => go("listing")}
            onWishlist={toggleWishlist}
            onAdd={addToCart}
            onOpenCart={() => go("cart")}
          />
        );
      case "cart":
        return (
          <Cart
            items={cartItems}
            subtotal={subtotal}
            total={subtotal}
            payment={payments}
            setPayment={setPayments}
            onBack={() => go("food")}
            onQty={changeQty}
            onRemove={removeFromCart}
            onPlace={placeOrder}
            onOpenFood={openFood}
          />
        );
      case "order":
        return (
          <OrderSummary
            order={currentOrder}
            onHome={() => go("home")}
            onTrack={() => go("track")}
            onHistory={() => go("history")}
          />
        );
      case "track":
        return (
          <Track
            order={currentOrder}
            onBack={() => go("order")}
            onHistory={() => go("history")}
            onCollected={() =>
              updateStatus(
                Math.min(3, (currentOrder?.status || 0) + 1),
                currentOrder?.status === 2 ? "complete" : undefined
              )
            }
            onComplete={() => go("complete")}
          />
        );
      case "complete":
        return <Complete order={currentOrder} onHome={() => go("home")} onHistory={() => go("history")} />;
      case "history":
        return <History orders={orders} onBack={() => go("profile")} onOpenOrder={openOrder} />;
      case "notifications":
        return (
          <Notifications
            items={notifications}
            onBack={() => go("home")}
            onMarkAll={markAllRead}
            onMark={markRead}
            onBrowse={() => go("listing")}
          />
        );
      case "about":
        return <About onBack={() => go("profile")} onContact={() => go("contact")} />;
      case "contact":
        return <Contact onBack={() => go("profile")} />;
      case "profile":
        return (
          <Profile
            onNavigate={(target) => go(target)}
            rescueCount={orders.length}
          />
        );
      case "add":
        return <AddListing onBack={() => go("home")} onPublish={publishListing} />;
      case "settings":
        return <Settings onBack={() => go("profile")} />;
      default:
        return <Onboarding onGetStarted={() => go("welcome")} onLogin={() => go("login")} />;
    }
  };

  return (
    <div className="app-stage">
      <div className="phone">
        <div className="phone__body" ref={bodyRef}>{renderScreen()}</div>
        <Toast message={toast} />
      </div>
    </div>
  );
}
