## ✨ Shop-Code Design System (Extracted from Landing Page)

### 🌟 Brand Overview

Shop-Code provides physical shop owners with a digital bridge between social media campaigns and real-life customer conversions. The visual identity is clean, tech-forward, and QR-code-centric.

---

### 🎨 Graphical Identity

#### 1. **Colors**

```css
--purple-primary: #6C63FF;
--indigo-gradient: linear-gradient(45deg, #6C63FF, #5845E9);
--charcoal-text: #2B2C34;
--grey-muted: #A0A0A8;
--white: #FFFFFF;
```

- **Purple Primary**: CTA buttons, highlights.
- **Indigo Gradient**: Hero section backgrounds.
- **Charcoal Black**: Main text.
- **Grey Muted**: Form placeholders, borders.
- **White**: Background, cards.

#### 2. **Typography**

```css
--font-heading: 'Inter', sans-serif;
--font-body: 'Open Sans', sans-serif;
```

- **Headings**: Inter, bold (700), line-height 1.3
- **Paragraphs**: Open Sans, regular (400), line-height 1.6

#### 3. **Logo & Icon Style**

- Logo: Monochrome wordmark with tech-inspired geometry.
- Icons: Rounded-line icons, 24px standard size.
- Illustrations: Flat vectors featuring QR codes, phones, and coupons.

---

### 🛋 UI Components

#### **Buttons**

```css
.btn-primary {
  background-color: var(--purple-primary);
  color: white;
  border-radius: 8px;
  padding: 0.75em 1.5em;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--purple-primary);
  color: var(--purple-primary);
  border-radius: 8px;
}
```

#### **Input Fields**

```css
input, textarea, select {
  border: 1px solid var(--grey-muted);
  border-radius: 6px;
  padding: 0.75em;
}
input:focus {
  border-color: var(--purple-primary);
  outline: none;
}
```

#### **Cards**

```css
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  padding: 1.5em;
}
```

---

### 🌐 Layout Patterns

- **Hero Section**: Gradient BG, centered text, mobile QR vector
- **Feature Cards**: Icons top-aligned, bold titles, white bg
- **Forms**: Rounded corners, purple accent focus
- **Footer**: Charcoal background with light text & hover links

---

### 🗺 Next Steps

- [C] Convert these tokens into Figma styles
- [M] Mock the core app screen (QR code interaction)
- [U] Upload UI sketches for full review
- [T] Track modern SaaS UI trends for continuous alignment

---

> This design system is extracted directly from the live branding on **shop-code.com** as of June 2025.

