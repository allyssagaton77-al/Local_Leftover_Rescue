import React from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Heart,
  Home,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

export function Logo({ compact = false, light = false }) {
  return (
    <div className={`logo ${light ? "logo--light" : ""}`}>
      <span className="logo__mark" aria-hidden="true">
        <Leaf size={compact ? 18 : 22} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="logo__text">
          <strong>LOCAL LEFTOVER</strong>
          <small>RESCUE</small>
        </span>
      )}
    </div>
  );
}

export function TopBar({ title, subtitle, onBack, right }) {
  return (
    <header className="topbar">
      <div className="topbar__row">
        {onBack ? (
          <button className="icon-btn" onClick={onBack} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <Logo compact />
        )}
        <div className="topbar__title-wrap">
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="topbar__right">{right}</div>
      </div>
    </header>
  );
}

export function IconButton({ children, label, onClick, badge }) {
  return (
    <button className="icon-btn icon-btn--relative" onClick={onClick} aria-label={label}>
      {children}
      {badge > 0 && <span className="icon-btn__badge">{badge}</span>}
    </button>
  );
}

export function SectionTitle({ title, action, onAction }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && (
        <button className="link-btn" onClick={onAction}>
          {action} <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

export function CategoryChips({ items, value, onChange }) {
  return (
    <div className="chips" role="tablist" aria-label="Food categories">
      {items.map((item) => (
        <button
          key={item}
          role="tab"
          aria-selected={value === item}
          className={`chip ${value === item ? "chip--active" : ""}`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function FoodArt({ food, size = "card" }) {
  return (
    <div
      className={`food-art food-art--${size}`}
      style={{ background: food.color }}
      aria-hidden="true"
    >
      <span className="food-art__fallback">{food.emoji}</span>
      {food.image && (
        <img className="food-art__img" src={food.image} alt="" loading="lazy" />
      )}
      {food.badge && <span className="food-art__badge">{food.badge}</span>}
    </div>
  );
}

export function FoodCard({ food, onOpen, onWishlist, wished, horizontal = false }) {
  return (
    <article
      className={`food-card ${horizontal ? "food-card--horizontal" : ""}`}
      onClick={() => onOpen(food)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen(food);
      }}
    >
      <div className="food-card__media">
        <FoodArt food={food} size={horizontal ? "small" : "card"} />
        <button
          className={`wish-btn ${wished ? "wish-btn--active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onWishlist(food.id);
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} fill={wished ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="food-card__body">
        <div className="food-card__title-row">
          <h3>{food.name}</h3>
          <span className="price">₱{food.price}</span>
        </div>
        <p className="food-card__shop">{food.shop}</p>
        <div className="food-card__meta">
          <span>{food.portions} portions left</span>
          <span className="dot" />
          <span>{food.distance}</span>
        </div>
        <div className="food-card__foot">
          <span>🕒 {food.pickup}</span>
          <span className="food-card__go">
            View <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}

export function InfoRow({ icon, label, value, sub }) {
  return (
    <div className="info-row">
      <span className="info-row__icon">{icon}</span>
      <span className="info-row__text">
        <small>{label}</small>
        <strong>{value}</strong>
        {sub && <em>{sub}</em>}
      </span>
    </div>
  );
}

export function QtyStepper({ value, onChange, min = 1, max = 9 }) {
  return (
    <div className="qty-stepper">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={15} />
      </button>
      <span>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}

export function Timeline({ steps, current, compact = false }) {
  return (
    <ol className={`timeline ${compact ? "timeline--compact" : ""}`}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li
            key={step.label}
            className={`timeline__item ${done ? "is-done" : ""} ${active ? "is-active" : ""}`}
          >
            <span className="timeline__dot">
              {done ? <Check size={13} strokeWidth={3} /> : index + 1}
            </span>
            <span className="timeline__text">
              <strong>{step.label}</strong>
              <small>{step.hint}</small>
            </span>
            {active && <span className="timeline__tag">Current</span>}
          </li>
        );
      })}
    </ol>
  );
}

export function BottomNav({ active, onChange }) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "listing", label: "Listing", icon: ShoppingBag },
    { id: "add", label: "Add", icon: Plus, special: true },
    { id: "profile", label: "Profile", icon: UserRound },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(({ id, label, icon: Icon, special }) => (
        <button
          key={id}
          className={`nav-item ${active === id ? "nav-item--active" : ""} ${
            special ? "nav-item--add" : ""
          }`}
          onClick={() => onChange(id)}
          aria-current={active === id ? "page" : undefined}
        >
          <span className="nav-item__icon">
            <Icon size={special ? 22 : 20} strokeWidth={special ? 2.6 : 2} />
          </span>
          <small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      <Sparkles size={16} />
      <span>{message}</span>
    </div>
  );
}

export function Field({ label, type = "text", placeholder, value, onChange, multiline, name }) {
  const shared = {
    name: name || label,
    value,
    placeholder,
    onChange: (event) => onChange(event.target.value),
  };

  return (
    <label className="field">
      <span>{label}</span>
      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}
    </label>
  );
}

export function EmptyState({ icon, title, body, action, onAction }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">{icon || <Bell size={26} />}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      {action && (
        <button className="btn btn--primary" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal__head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
