import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Banknote,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Coffee,
  Facebook,
  HandHeart,
  HelpCircle,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Navigation,
  PackageCheck,
  Phone,
  Recycle,
  Search,
  Send,
  Settings as SettingsIcon,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Star,
  Trash2,
  Twitter,
  Users,
  Wallet,
} from "lucide-react";
import {
  BottomNav,
  CategoryChips,
  EmptyState,
  Field,
  FoodArt,
  FoodCard,
  IconButton,
  InfoRow,
  Logo,
  QtyStepper,
  SectionTitle,
  Timeline,
  TopBar,
} from "./components.jsx";
import { categories, faqs, statusSteps } from "./data.js";

const money = (value) => `₱${value}`;

/* ----------------------------------- Loading ------------------------------------ */

export function Loading({ message = "Preparing your rescues..." }) {
  return (
    <div className="screen loading-screen">
      <div className="loading-screen__center">
        <Logo light />
        <div className="loading-screen__spinner" aria-label="Loading">
          <span />
          <span />
          <span />
        </div>
        <h1>Local Leftover Rescue</h1>
        <p>{message}</p>
      </div>
      <div className="loading-screen__bar"><i /></div>
      <small>Good food. Second chances.</small>
    </div>
  );
}

/* ---------------------------------- Onboarding --------------------------------- */

export function Onboarding({ onGetStarted, onLogin }) {
  return (
    <div className="screen splash">
      <div className="splash__glow splash__glow--one" />
      <div className="splash__glow splash__glow--two" />

      <div className="splash__content">
        <Logo light />
        <div className="splash__art" aria-hidden="true">
          <div className="splash__plate">
            <img src="/images/chicken-rice.jpg" alt="" />
            <span className="splash__leaf"><Leaf size={28} /></span>
          </div>
          <span className="splash__orbit splash__orbit--a"><img src="/images/vegetable-salad.jpg" alt="" /></span>
          <span className="splash__orbit splash__orbit--b"><img src="/images/bread-pastries.jpg" alt="" /></span>
          <span className="splash__orbit splash__orbit--c"><img src="/images/fruit-box.jpg" alt="" /></span>
        </div>

        <div className="splash__copy">
          <span className="eyebrow eyebrow--light">GOOD FOOD. SECOND CHANCES.</span>
          <h1>
            A little rescue.<br />
            <em>A lot of good.</em>
          </h1>
          <p>Rescue delicious leftovers from nearby shops before they go to waste.</p>
        </div>

        <div className="splash__actions">
          <button className="btn btn--light btn--block" onClick={onGetStarted}>
            Get Started <ArrowRight size={18} />
          </button>
          <button className="btn btn--ghost-light btn--block" onClick={onLogin}>
            Login
          </button>
        </div>

        <p className="splash__footnote">One good meal. Less food going to waste.</p>
      </div>
    </div>
  );
}

export function Welcome({ onFinish, onLogin }) {
  const slides = [
    {
      icon: <Search size={34} />,
      tag: "FRESH FINDS",
      title: "Good food, nearby.",
      body: "Discover leftover meals, bakery treats and fresh produce from shops around your neighborhood.",
    },
    {
      icon: <HandHeart size={34} />,
      tag: "CLAIM & PICK UP",
      title: "Rescue in a few taps.",
      body: "Claim a listing, choose your payment, and pick up at the time shown. Simple and waste-free.",
    },
    {
      icon: <Recycle size={34} />,
      tag: "REAL IMPACT",
      title: "Track every good deed.",
      body: "Follow your order, collect your meal, and watch your rescue history grow.",
    },
  ];
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const last = index === slides.length - 1;

  return (
    <div className="screen onboarding">
      <div className="onboarding__top">
        <button className="link-btn" onClick={onFinish}>Skip</button>
        <Logo compact />
      </div>

      <div className="onboarding__body">
        <div className="onboarding__art">
          <span>{slide.icon}</span>
          <span className="onboarding__spark onboarding__spark--a">✦</span>
          <span className="onboarding__spark onboarding__spark--b">✦</span>
        </div>
        <span className="eyebrow">{slide.tag}</span>
        <h1>{slide.title}</h1>
        <p>{slide.body}</p>
      </div>

      <div className="onboarding__bottom">
        <div className="dots" aria-label={`Slide ${index + 1} of ${slides.length}`}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot-btn ${i === index ? "dot-btn--active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="btn btn--primary btn--block"
          onClick={() => (last ? onFinish() : setIndex(index + 1))}
        >
          {last ? "Browse Now" : "Next"} <ArrowRight size={18} />
        </button>
        <button className="link-btn link-btn--center" onClick={onLogin}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

export function Login({ onBack, onSubmit, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="screen auth">
      <TopBar title="Welcome back" subtitle="Log in to keep rescuing" onBack={onBack} />
      <div className="auth__art"><Logo /></div>
      <div className="auth__form">
        <h2>Login</h2>
        <p className="muted">One good meal is a tap away.</p>
        <Field label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
        <Field label="Password" type="password" placeholder="Enter your password" value={password} onChange={setPassword} />
        <button className="link-btn link-btn--right" onClick={onSubmit}>Forgot password?</button>
        <button className="btn btn--primary btn--block" onClick={onSubmit}>
          Login <ArrowRight size={18} />
        </button>
        <div className="divider"><span>or</span></div>
        <button className="btn btn--outline btn--block" onClick={onSignUp}>Create an account</button>
        <p className="auth__hint"><ShieldCheck size={14} /> Demo mode — any email and password works.</p>
      </div>
    </div>
  );
}

export function SignUp({ onBack, onSubmit, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="screen auth">
      <TopBar title="Join the rescue" subtitle="Good food deserves a second chance" onBack={onBack} />
      <div className="auth__form auth__form--top">
        <span className="eyebrow">GET STARTED</span>
        <h2>Create your account</h2>
        <p className="muted">Save your favorite finds and track every pickup.</p>
        <Field label="Full name" placeholder="Juan Dela Cruz" value={name} onChange={setName} />
        <Field label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
        <Field label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={setPassword} />
        <label className="check-row">
          <input type="checkbox" defaultChecked />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>
        <button className="btn btn--primary btn--block" onClick={onSubmit}>
          Sign Up <ArrowRight size={18} />
        </button>
        <button className="link-btn link-btn--center" onClick={onLogin}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------- Home ------------------------------------- */

export function Home({
  foods,
  wishlist,
  category,
  setCategory,
  unread,
  onWishlist,
  onOpen,
  onNotifications,
  onProfile,
  onListing,
  onAdd,
}) {
  const visible = category === "All" ? foods : foods.filter((food) => food.category === category);

  return (
    <div className="screen home">
      <header className="home-header">
        <div className="home-header__row">
          <Logo />
          <div className="home-header__actions">
            <IconButton label="Notifications" badge={unread} onClick={onNotifications}>
              <Bell size={20} />
            </IconButton>
            <IconButton label="Profile" onClick={onProfile}>
              <span className="avatar">A</span>
            </IconButton>
          </div>
        </div>
        <button className="search-bar" onClick={onListing}>
          <Search size={18} />
          <span>Search meals, bakeries, near you...</span>
          <span className="search-bar__filter"><SlidersHorizontal size={16} /></span>
        </button>
        <div className="location-line">
          <MapPin size={14} /> Pickup near <strong>Sabayle, Cebu</strong>
          <ChevronRight size={14} />
        </div>
      </header>

      <div className="promo-card">
        <div className="promo-card__copy">
          <span className="eyebrow">FRESH PICKS TODAY</span>
          <h2>Good food,<br />nearby.</h2>
          <p>Fresh finds to rescue before they're gone.</p>
          <button className="btn btn--small" onClick={onListing}>Browse Now <ArrowRight size={15} /></button>
        </div>
        <div className="promo-card__art" aria-hidden="true">
          <img src="/images/chicken-rice.jpg" alt="" />
          <i>✦</i>
          <i>✦</i>
        </div>
      </div>

      <section className="section">
        <SectionTitle title="Browse categories" />
        <CategoryChips items={categories} value={category} onChange={setCategory} />
      </section>

      <section className="section">
        <SectionTitle title="Fresh finds to rescue" action="Near you" onAction={onListing} />
        <div className="food-grid">
          {visible.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onOpen={onOpen}
              onWishlist={onWishlist}
              wished={wishlist.includes(food.id)}
            />
          ))}
        </div>
      </section>

      <div className="neighborhood-card">
        <span className="neighborhood-card__icon"><Sprout size={22} /></span>
        <div>
          <strong>Made for your neighborhood</strong>
          <p>Every rescue keeps good food in the community and out of the bin.</p>
        </div>
        <ChevronRight size={18} />
      </div>

      <BottomNav
        active="home"
        onChange={(id) => {
          if (id === "listing") onListing();
          if (id === "add") onAdd();
          if (id === "profile") onProfile();
        }}
      />
    </div>
  );
}

/* ------------------------------------ Listing ----------------------------------- */

export function Listing({
  foods,
  wishlist,
  onWishlist,
  onOpen,
  onHome,
  onAdd,
  onProfile,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    return foods.filter((food) => {
      const matchCategory = category === "All" || food.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        food.name.toLowerCase().includes(q) ||
        food.shop.toLowerCase().includes(q) ||
        food.category.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [foods, query, category]);

  return (
    <div className="screen listing">
      <header className="topbar topbar--plain">
        <div className="topbar__row">
          <div className="topbar__title-wrap">
            <h1>Food listings</h1>
            <p>Fresh picks around you</p>
          </div>
          <Logo compact />
        </div>
        <div className="search-bar search-bar--static">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search food or shop..."
            aria-label="Search food or shop"
          />
          {query && (
            <button className="search-bar__clear" onClick={() => setQuery("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>
      </header>

      <div className="listing__filters">
        <CategoryChips items={categories} value={category} onChange={setCategory} />
        <button className="sort-btn"><SlidersHorizontal size={15} /> Nearest</button>
      </div>

      <div className="listing__count">
        <strong>{results.length} finds</strong>
        <span>Available for pickup today</span>
      </div>

      <div className="food-list">
        {results.length ? (
          results.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              horizontal
              onOpen={onOpen}
              onWishlist={onWishlist}
              wished={wishlist.includes(food.id)}
            />
          ))
        ) : (
          <EmptyState
            icon={<Search size={26} />}
            title="No finds match that"
            body="Try another category or search for a different food or shop."
            action="Clear filters"
            onAction={() => {
              setQuery("");
              setCategory("All");
            }}
          />
        )}
      </div>

      <BottomNav
        active="listing"
        onChange={(id) => {
          if (id === "home") onHome();
          if (id === "add") onAdd();
          if (id === "profile") onProfile();
        }}
      />
    </div>
  );
}

/* ---------------------------------- Food details --------------------------------- */

export function FoodDetails({
  food,
  wished,
  qty,
  setQty,
  cartCount,
  onBack,
  onWishlist,
  onAdd,
  onOpenCart,
}) {
  return (
    <div className="screen food-details">
      <TopBar
        title="Food Details"
        onBack={onBack}
        right={
          <IconButton label="Add to wishlist" onClick={() => onWishlist(food.id)}>
            <HeartIcon filled={wished} />
          </IconButton>
        }
      />

      <div className="food-hero" style={{ background: food.color }}>
        <span className="food-hero__emoji">
          <span className="food-art__fallback">{food.emoji}</span>
          {food.image && <img src={food.image} alt={food.name} />}
        </span>
        <span className="food-hero__badge"><Star size={12} fill="currentColor" /> {food.rating}</span>
      </div>

      <div className="food-details__content">
        <div className="food-details__title">
          <div>
            <span className="eyebrow">{food.category.toUpperCase()}</span>
            <h1>{food.name}</h1>
          </div>
          <strong className="food-details__price">{money(food.price)}</strong>
        </div>

        <div className="tag-row">
          <span className="tag tag--green">{food.portions} portions left</span>
          <span className="tag">{food.distance} away</span>
          <span className="tag">{food.badge}</span>
        </div>

        <p className="body-copy">{food.description}</p>

        <div className="info-card">
          <InfoRow icon={<Clock size={17} />} label="Best before" value={food.expires} />
          <InfoRow icon={<MapPin size={17} />} label="Pickup location" value={food.shop} sub={`${food.distance} from you`} />
          <InfoRow icon={<Users size={17} />} label="Donor / shop" value={food.shop} sub="Verified rescue partner" />
        </div>

        <div className="quantity-card">
          <div>
            <strong>Quantity</strong>
            <span>Maximum {food.portions} portions available</span>
          </div>
          <QtyStepper value={qty} onChange={setQty} max={food.portions} />
        </div>

        <button
          className={`wishlist-btn ${wished ? "wishlist-btn--active" : ""}`}
          onClick={() => onWishlist(food.id)}
        >
          <HeartIcon filled={wished} /> {wished ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      <div className="sticky-cta">
        {cartCount > 0 && (
          <button className="cart-peek" onClick={onOpenCart} aria-label="Open cart">
            <ShoppingBag size={19} />
            <span>{cartCount}</span>
          </button>
        )}
        <div className="sticky-cta__price">
          <small>Total</small>
          <strong>{money(food.price * qty)}</strong>
        </div>
        <button className="btn btn--primary" onClick={() => onAdd(food, qty)}>
          Add to Cart <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.7-7.7 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

/* -------------------------------------- Cart ------------------------------------- */

export function Cart({
  items,
  subtotal,
  total,
  payment,
  setPayment,
  onBack,
  onQty,
  onRemove,
  onPlace,
  onOpenFood,
}) {
  return (
    <div className="screen cart">
      <TopBar title="My Cart" subtitle={`${items.length} item${items.length === 1 ? "" : "s"} to rescue`} onBack={onBack} />

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={26} />}
          title="Your cart is empty"
          body="Find a fresh pick nearby and add it here to claim your rescue."
          action="Browse food"
          onAction={onBack}
        />
      ) : (
        <>
          <div className="cart-items">
            {items.map(({ food, qty }) => (
              <article className="cart-item" key={food.id}>
                <button className="cart-item__art" onClick={() => onOpenFood(food)} style={{ background: food.color }} aria-label={`View ${food.name}`}>
                  <span className="food-art__fallback">{food.emoji}</span>
                  {food.image && <img src={food.image} alt="" />}
                </button>
                <div className="cart-item__info">
                  <h3>{food.name}</h3>
                  <p>{food.shop}</p>
                  <span className="cart-item__price">{money(food.price)}</span>
                </div>
                <div className="cart-item__actions">
                  <button className="icon-btn icon-btn--danger" onClick={() => onRemove(food.id)} aria-label={`Remove ${food.name}`}>
                    <Trash2 size={16} />
                  </button>
                  <QtyStepper value={qty} onChange={(next) => onQty(food.id, next)} max={food.portions} />
                </div>
              </article>
            ))}
          </div>

          <section className="section">
            <SectionTitle title="Order Summary" />
            <div className="summary-card">
              <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div className="summary-row"><span>Pickup / delivery fee</span><strong className="free">FREE</strong></div>
              <div className="summary-row summary-row--line"><span>Total</span><strong>{money(total)}</strong></div>
            </div>
          </section>

          <section className="section">
            <SectionTitle title="Payment method" />
            <div className="payment-list">
              <button
                className={`payment-option ${payment === "cash" ? "payment-option--active" : ""}`}
                onClick={() => setPayment("cash")}
              >
                <span className="payment-option__icon"><Banknote size={19} /></span>
                <span><strong>Cash on Pickup</strong><small>Pay at the shop when you collect.</small></span>
                <span className="radio-dot" />
              </button>
              <button
                className={`payment-option ${payment === "gcash" ? "payment-option--active" : ""}`}
                onClick={() => setPayment("gcash")}
              >
                <span className="payment-option__icon"><Wallet size={19} /></span>
                <span><strong>GCash / E-Wallet</strong><small>Pay securely before pickup.</small></span>
                <span className="radio-dot" />
              </button>
            </div>
          </section>

          <div className="pickup-note">
            <MapPin size={17} />
            <div><strong>Pickup only</strong><span>Cafe de oro - Sabayle · Today, 3:00 PM</span></div>
          </div>

          <div className="sticky-cta">
            <div className="sticky-cta__price">
              <small>Total</small>
              <strong>{money(total)}</strong>
            </div>
            <button className="btn btn--primary" onClick={onPlace}>
              Place Order <ArrowRight size={17} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* --------------------------------- Order summary --------------------------------- */

export function OrderSummary({ order, onHome, onTrack, onHistory }) {
  if (!order) return null;
  return (
    <div className="screen order-summary">
      <div className="success-hero">
        <span className="success-hero__check"><Check size={30} strokeWidth={3} /></span>
        <span className="eyebrow eyebrow--light">CLAIM CONFIRMED</span>
        <h1>Your rescue is reserved!</h1>
        <p>Order #{order.id}</p>
      </div>

      <div className="order-summary__content">
        <div className="info-card">
          <InfoRow icon={<CalendarDays size={17} />} label="Order date" value={order.date} />
          <InfoRow icon={<MapPin size={17} />} label="Pickup" value={order.shop || "Cafe de oro - Sabayle"} sub={order.pickup || "Today, 3:00 PM"} />
          <InfoRow icon={<Wallet size={17} />} label="Payment" value={order.payment === "gcash" ? "GCash / E-Wallet" : "Cash on Pickup"} />
        </div>

        <SectionTitle title="Your items" />
        <div className="mini-order">
          {order.items.map(({ food, qty }) => (
            <div className="mini-order__row" key={food.id}>
              <span className="mini-order__emoji" style={{ background: food.color }}>
                <span className="food-art__fallback">{food.emoji}</span>
                {food.image && <img src={food.image} alt="" />}
              </span>
              <span><strong>{food.name}</strong><small>× {qty}</small></span>
              <strong>{money(food.price * qty)}</strong>
            </div>
          ))}
          <div className="mini-order__total"><span>Total</span><strong>{money(order.total)}</strong></div>
        </div>

        <SectionTitle title="Rescue progress" />
        <div className="card"><Timeline steps={statusSteps} current={order.status} compact /></div>

        <div className="stack-buttons">
          <button className="btn btn--primary btn--block" onClick={onTrack}>Track My Rescue <ArrowRight size={17} /></button>
          <button className="btn btn--outline btn--block" onClick={onHistory}>View Order History</button>
          <button className="link-btn link-btn--center" onClick={onHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Track my rescue -------------------------------- */

export function Track({ order, onBack, onHistory, onCollected, onComplete }) {
  if (!order) return null;
  const headline = [
    "Your meal is reserved.",
    "A little care, before pickup.",
    "Your meal is ready!",
    "Thanks for the rescue!",
  ][order.status];
  const detail = [
    `${order.shop || "Cafe de oro"} has your claim. We'll let you know when your meal is ready.`,
    `${order.shop || "Cafe de oro"} is preparing your Chicken Rice. Please wait for the ready update.`,
    `Head to the pickup location at ${order.pickup || "3:00 PM"}. Show your order number when you arrive.`,
    "Your meal was collected. Enjoy it — you just kept good food out of the bin.",
  ][order.status];

  return (
    <div className="screen track">
      <TopBar title="Track My Rescue" subtitle="Follow your meal from claim to pickup" onBack={onBack} />

      <div className={`status-hero status-hero--${order.status}`}>
        <span className="status-hero__icon">
          {order.status === 3 ? <PackageCheck size={28} /> : <Sparkles size={28} />}
        </span>
        <span className="eyebrow eyebrow--light">ORDER STATUS</span>
        <h2>{headline}</h2>
        <p>{detail}</p>
      </div>

      <div className="track__body">
        <div className="order-number-card">
          <div>
            <small>Show this order number</small>
            <strong>#{order.id}</strong>
          </div>
          <div className="fake-qr" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => <i key={i} className={i % 3 === 0 ? "on" : ""} />)}
          </div>
        </div>

        <SectionTitle title="Rescue progress" />
        <div className="card"><Timeline steps={statusSteps} current={order.status} /></div>

        <SectionTitle title="Pickup details" />
        <div className="info-card">
          <InfoRow icon={<MapPin size={17} />} label="Location" value={order.shop || "Cafe de oro - Sabayle"} sub="Sabayle, Cebu" />
          <InfoRow icon={<Clock size={17} />} label="Pickup time" value={order.pickup || "Today, 3:00 PM"} />
          <InfoRow icon={<Navigation size={17} />} label="Getting there" value="Pickup only" sub="No delivery arranged for this order" />
        </div>

        {order.status === 2 && (
          <div className="collect-card">
            <strong>Collected your meal?</strong>
            <p>Confirm pickup so we can complete your rescue.</p>
            <button className="btn btn--primary btn--block" onClick={onCollected}>I've Collected It <Check size={17} /></button>
          </div>
        )}

        {order.status < 2 && (
          <button className="btn btn--outline btn--block" onClick={onCollected}>
            Simulate next update <ArrowRight size={16} />
          </button>
        )}

        {order.status === 3 && (
          <button className="btn btn--primary btn--block" onClick={onComplete}>See rescue summary <ArrowRight size={17} /></button>
        )}

        <button className="btn btn--quiet btn--block" onClick={onHistory}>View Order History</button>
      </div>
    </div>
  );
}

/* ---------------------------------- Completion ----------------------------------- */

export function Complete({ order, onHome, onHistory }) {
  const rescuedFood = order?.items?.[0]?.food;
  return (
    <div className="screen complete">
      <div className="complete__art" aria-hidden="true">
        <span className="complete__rings" />
        <span className="complete__check"><Check size={44} strokeWidth={3} /></span>
        <span className="complete__emoji">
        <span className="food-art__fallback">{rescuedFood?.emoji || "🍗"}</span>
        {rescuedFood?.image && <img src={rescuedFood.image} alt="" />}
      </span>
      </div>
      <span className="eyebrow">RESCUE COMPLETE</span>
      <h1>Thanks for the rescue!</h1>
      <p className="complete__copy">
        Your {order?.items?.[0]?.food?.name || "Chicken Rice"} was collected today at 3:05 PM.<br />
        Enjoy your meal.
      </p>

      <div className="complete__stats">
        <div><strong>1</strong><small>Meal rescued</small></div>
        <div><strong>₱{order?.total || 50}</strong><small>Food saved</small></div>
        <div><strong>0.4kg</strong><small>Waste avoided</small></div>
      </div>

      <div className="complete__order">
        <span>Order #{order?.id || "LLR-1104-021"}</span>
        <span className="tag tag--green">Completed</span>
      </div>

      <div className="stack-buttons">
        <button className="btn btn--primary btn--block" onClick={onHome}>Find Your Next Rescue <ArrowRight size={17} /></button>
        <button className="btn btn--outline btn--block" onClick={onHistory}>View Order History</button>
      </div>
    </div>
  );
}

/* -------------------------------- Order history ---------------------------------- */

export function History({ orders, onBack, onOpenOrder }) {
  return (
    <div className="screen history">
      <TopBar title="Order History" subtitle="Your past rescues" onBack={onBack} />
      <div className="history__summary">
        <span><Award size={18} /></span>
        <div><strong>{orders.length} rescues so far</strong><small>Every meal makes a difference.</small></div>
      </div>
      <div className="history__list">
        {orders.map((order) => {
          const first = order.items?.[0];
          const food = first?.food;
          return (
            <button className="history-card" key={order.id} onClick={() => onOpenOrder(order)}>
              <span className="history-card__art" style={{ background: food?.color || order.color }}>
                <span className="food-art__fallback">{food?.emoji || order.emoji}</span>
                {food?.image && <img src={food.image} alt="" />}
              </span>
              <span className="history-card__body">
                <span className="history-card__head">
                  <strong>{food?.name || order.item}</strong>
                  <span className="tag tag--green">Completed</span>
                </span>
                <small>#{order.id}</small>
                <small>{order.date}</small>
                <span className="history-card__foot">
                  <strong>{money(order.total)}</strong>
                  <span>View Details <ChevronRight size={14} /></span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- Notifications --------------------------------- */

export function Notifications({ items, onBack, onMarkAll, onMark, onBrowse }) {
  const unread = items.filter((item) => item.unread).length;
  const iconFor = (tone) =>
    tone === "success" ? <CheckCircle2 size={18} /> : tone === "fresh" ? <Sprout size={18} /> : tone === "reminder" ? <Clock size={18} /> : <PackageCheck size={18} />;

  return (
    <div className="screen notifications">
      <TopBar
        title="Notifications"
        subtitle={unread ? `${unread} unread` : "All caught up"}
        onBack={onBack}
        right={
          unread > 0 ? (
            <button className="link-btn" onClick={onMarkAll}>Mark all as read</button>
          ) : null
        }
      />

      <div className="notification-list">
        {items.map((item) => (
          <button
            key={item.id}
            className={`notification ${item.unread ? "notification--unread" : ""}`}
            onClick={() => onMark(item.id)}
          >
            <span className={`notification__icon notification__icon--${item.tone}`}>{iconFor(item.tone)}</span>
            <span className="notification__body">
              <span className="notification__head">
                <strong>{item.title}</strong>
                {item.unread && <i className="unread-dot" />}
              </span>
              <small>{item.body}</small>
              <em>{item.time}</em>
            </span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>

      <div className="notification__footer">
        <button className="btn btn--outline btn--block" onClick={onBrowse}>Browse More Food</button>
      </div>
    </div>
  );
}

/* ----------------------------------- About us ------------------------------------ */

export function About({ onBack, onContact }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="screen about">
      <TopBar title="About Us" subtitle="Why we rescue" onBack={onBack} />

      <div className="about-hero">
        <span className="about-hero__icon"><Leaf size={30} /></span>
        <span className="eyebrow eyebrow--light">OUR STORY</span>
        <h1>Good food shouldn't go to waste.</h1>
        <p>Local Leftover Rescue connects neighbors with shops that have perfectly good food left at the end of the day.</p>
      </div>

      <div className="about-grid">
        <div className="about-card"><span><Sparkles size={20} /></span><strong>Our Mission</strong><p>Make rescuing leftover food the easiest, most rewarding choice in every neighborhood.</p></div>
        <div className="about-card"><span><Sprout size={20} /></span><strong>Our Vision</strong><p>A community where good meals find people before they find the bin.</p></div>
      </div>

      <SectionTitle title="Why choose us" />
      <div className="why-list">
        <div><span><MapPin size={18} /></span><p><strong>Hyperlocal picks</strong><small>Food is just around the corner.</small></p></div>
        <div><span><ShieldCheck size={18} /></span><p><strong>Verified partners</strong><small>Shops we know and trust.</small></p></div>
        <div><span><Recycle size={18} /></span><p><strong>Real impact</strong><small>Track every meal you save.</small></p></div>
        <div><span><HandHeart size={18} /></span><p><strong>Community first</strong><small>Neighbors helping neighbors.</small></p></div>
      </div>

      <div className="impact-card">
        <span className="eyebrow">SUSTAINABILITY GOALS</span>
        <h2>Small rescues. Big change.</h2>
        <div className="impact-card__stats">
          <div><strong>1,240</strong><small>meals rescued</small></div>
          <div><strong>480kg</strong><small>food saved</small></div>
          <div><strong>62</strong><small>shop partners</small></div>
        </div>
      </div>

      <SectionTitle title="Our team & partners" />
      <div className="partner-row">
        <span><Coffee size={18} /> Cafe de oro</span>
        <span><Sprout size={18} /> Green Bowl</span>
        <span><ShoppingBag size={18} /> Market Corner</span>
      </div>

      <SectionTitle title="FAQs" />
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className={`faq ${openFaq === index ? "faq--open" : ""}`} key={faq.q}>
            <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
              <span>{faq.q}</span>
              <ChevronDown size={17} />
            </button>
            {openFaq === index && <p>{faq.a}</p>}
          </div>
        ))}
      </div>

      <button className="btn btn--outline btn--block about__contact" onClick={onContact}>
        <Mail size={17} /> Contact Us
      </button>
    </div>
  );
}

/* ---------------------------------- Contact us ----------------------------------- */

export function Contact({ onBack }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="screen contact">
      <TopBar title="Contact Us" subtitle="We're here to help" onBack={onBack} />

      {sent ? (
        <div className="sent-card">
          <span><Send size={28} /></span>
          <h2>Message sent!</h2>
          <p>Thanks {form.name || "there"}. We'll get back to you at {form.email || "your email"} soon.</p>
          <button className="btn btn--primary btn--block" onClick={() => setSent(false)}>Send another message</button>
        </div>
      ) : (
        <div className="contact-form">
          <span className="eyebrow">CONTACT FORM</span>
          <h2>Say hello</h2>
          <p className="muted">Questions about a pickup or a listing? Drop us a note.</p>
          <Field label="Name" placeholder="Your name" value={form.name} onChange={update("name")} />
          <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} />
          <Field label="Message" placeholder="How can we help?" value={form.message} onChange={update("message")} multiline />
          <button className="btn btn--primary btn--block" onClick={() => setSent(true)}>
            Send Message <Send size={17} />
          </button>
        </div>
      )}

      <SectionTitle title="Contact information" />
      <div className="info-card">
        <InfoRow icon={<Mail size={17} />} label="Email" value="hello@localleftoverrescue.org" />
        <InfoRow icon={<Phone size={17} />} label="Phone" value="+63 917 555 0142" />
        <InfoRow icon={<MapPin size={17} />} label="Address" value="Sabayle, Cebu City, Philippines" />
        <InfoRow icon={<HelpCircle size={17} />} label="Help / Support" value="Available daily, 8:00 AM – 9:00 PM" />
      </div>

      <SectionTitle title="Follow us" />
      <div className="social-row">
        <button aria-label="Instagram"><Instagram size={19} /></button>
        <button aria-label="Facebook"><Facebook size={19} /></button>
        <button aria-label="Twitter"><Twitter size={19} /></button>
      </div>
    </div>
  );
}

/* ----------------------------------- Profile ------------------------------------- */

export function Profile({ onNavigate, rescueCount }) {
  const menu = [
    { icon: <ShoppingBag size={18} />, label: "Order History", to: "history" },
    { icon: <Bell size={18} />, label: "Notifications", to: "notifications" },
    { icon: <Leaf size={18} />, label: "About Us", to: "about" },
    { icon: <Mail size={18} />, label: "Contact & Support", to: "contact" },
    { icon: <SettingsIcon size={18} />, label: "Settings", to: "settings" },
  ];

  return (
    <div className="screen profile">
      <header className="topbar topbar--plain">
        <div className="topbar__row">
          <div className="topbar__title-wrap"><h1>Profile</h1><p>Your rescue journey</p></div>
          <Logo compact />
        </div>
      </header>

      <div className="profile-card">
        <span className="profile-card__avatar">A</span>
        <div><h2>Allyssa Mae</h2><p>Rescuer since Nov 2026</p></div>
        <button className="icon-btn" aria-label="Edit profile"><SettingsIcon size={17} /></button>
      </div>

      <div className="profile-stats">
        <div><strong>{rescueCount}</strong><small>Rescues</small></div>
        <div><strong>{rescueCount * 1}</strong><small>Meals saved</small></div>
        <div><strong>{(rescueCount * 0.4).toFixed(1)}kg</strong><small>Waste avoided</small></div>
      </div>

      <div className="menu-list">
        {menu.map((item) => (
          <button key={item.label} onClick={() => onNavigate(item.to)}>
            <span>{item.icon}</span>
            <strong>{item.label}</strong>
            <ChevronRight size={17} />
          </button>
        ))}
      </div>

      <button className="btn btn--quiet btn--block" onClick={() => onNavigate("onboarding")}>Log out</button>

      <BottomNav active="profile" onChange={(id) => onNavigate(id === "add" ? "add" : id)} />
    </div>
  );
}

/* --------------------------------- Add listing ----------------------------------- */

export function AddListing({ onBack, onPublish }) {
  const [form, setForm] = useState({ name: "", category: "Meals", portions: "1", pickup: "Today, 7:00 PM", location: "" });
  const update = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="screen add-listing">
      <TopBar title="List Leftover Food" subtitle="Share what's left with neighbors" onBack={onBack} />
      <div className="add-listing__art">
        <span><img src="/images/fruit-box.jpg" alt="" /></span>
        <p>Snap a photo of your leftover food and add the details below.</p>
        <button className="btn btn--small btn--outline">Add photo</button>
      </div>
      <div className="add-listing__form">
        <Field label="Food name" placeholder="e.g. Chicken Rice" value={form.name} onChange={update("name")} />
        <label className="field">
          <span>Category</span>
          <select value={form.category} onChange={(event) => update("category")(event.target.value)}>
            {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <Field label="Portions available" type="number" placeholder="1" value={form.portions} onChange={update("portions")} />
        <Field label="Pickup time" placeholder="Today, 7:00 PM" value={form.pickup} onChange={update("pickup")} />
        <Field label="Pickup location" placeholder="Shop name or address" value={form.location} onChange={update("location")} />
        <button className="btn btn--primary btn--block" onClick={() => onPublish(form)}>
          Publish Listing <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- Settings ------------------------------------- */

export function Settings({ onBack }) {
  const rows = ["Account details", "Pickup preferences", "Payment methods", "Privacy", "Help center"];
  return (
    <div className="screen settings">
      <TopBar title="Settings" subtitle="Manage your rescue app" onBack={onBack} />
      <div className="menu-list">
        {rows.map((row) => (
          <button key={row}><span><SettingsIcon size={18} /></span><strong>{row}</strong><ChevronRight size={17} /></button>
        ))}
      </div>
    </div>
  );
}
