# coffee-shop-frontend

## Motivation

This project aims to create a seamless and user-friendly online shopping experience for a coffee shop. The goal is to provide customers with an intuitive interface to browse products, add items to their cart, and complete their purchases efficiently. The application emphasizes responsive design, component reusability, and an optimized user experience.

[Live link](https://coffee-shop-frontend-eight.vercel.app/)

## Development Plan
- Day 1: Project Setup
[Day 1](day-1.md)
- Day 2: Component and Form Development
[Day 2](day-2.md)
- Day 3: API Integration and Prop Management
[Day 3](day-3.md)
- Day 4: Authentication and API v2
[Day 4](day-4.md)
- Day 5: Shopping Cart Feature
[Day 5](day-5.md)

## Key Tools & Technologies
- Frontend: Next.js, React, Tailwind CSS, DaisyUI, Storybook
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JSON Web Tokens (JWT)
- Hosting & Deployment: Vercel (Frontend), Render (Backend)
- Version Control: Git & GitHub

## Technical Overview
The application consists of a fully functional frontend for an e-commerce coffee shop. The technical stack includes:

### Frontend Features

- Reusable Components: Navbar, Footer, Buttons, Loaders, Product Cards, Cart Items, and more.
- State Management: React Hooks (useState, useQuery).
- Component Development: Storybook is used to test and visualize UI components in isolation.
- Styling: Tailwind CSS and DaisyUI for a modern and clean design.

### Backend & API

- User Authentication: Secure login and signup using JWT authentication.
- Product Management: Dynamic product listing and product details page.
- Shopping Cart: Users can add/remove items from their cart, view order summary, and proceed to checkout.
- Checkout & Orders: A structured checkout flow with steps to review and finalize purchases.

## Wishlist & Future Plans

- Dark Mode Toggle: Implement a dark/light mode feature.
- Enhanced Animations: Improve UX with animations (e.g., a cart item animation like the McDonald’s app).
- Payment Integration: Add Stripe or PayPal for real transactions.
- Order History: Allow users to view past orders.
- Admin Dashboard: Manage products, orders, and customers.
- Mobile App: Extend the project into a mobile application.

## Setup & Installation
If you would like to run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/JenniferT9462/coffee-shop-frontend.git

2. Navigate to the project directory:
    ```bash
    cd coffee-shop-frontend

3. Install dependencies:
    ```bash
    npm install

4. Start the development server:
    ```bash
    npm run dev

5. (Optional) Start Storybook:
    ```bash
    npm run storybook

6. Open the application in your browser at http://localhost:3000

## Contributing
Interested in contributing? Follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature.
3. Make your changes and ensure they align with the project’s coding standards.
4. Test your changes locally.
5. Push your changes to your forked repository.
6. Submit a pull request (PR) for review.

## Design Process
- NavBar & Footer:
    - I use `DaisyUI` and `Iconify` for both components.
    - Coffee Icons: <https://icon-sets.iconify.design/?query=coffee> 
    - NavBar: <https://daisyui.com/components/navbar/>
    - Card: <https://daisyui.com/components/card/>
- Splash Page:
    * I used MicroSoft Image Generator for my splash page image and DaisyUI for the Hero with Overlay Image. <https://designer.microsoft.com/image-creator>
- Sign Up & Sign In:
    * I used DaisyUI for a Hero with Form.
- Product Cards:
    * I used DaisyUI Cards for my ProductCard that is used in both, `product/[id].js` and `products.js` pages.
- Cart & Checkout pages:
    * Similar to the ProductCards and Forms I used in my other pages.
    * For Checkout Page: I used DaisyUI `divider` and `steps`.  

## Screenshots

### Storybook
![storybook screenshot](</public/storybook1.png>)
### Splash Page
![splash Page](</public/splashPage.png>)
### Sign Up Page
![sign up Page](</public/signUpPage.png>)
### Sign In Page
![sign in Page](</public/signInPage.png>)
### Product Page ([id].js)
![single product page](</public/productPage.png>)
### Products Page
![products page](</public/productsPage.png>)
### Cart Page
![cart page](</public/cartPage.png>)
### Checkout Page
![checkout page](</public/checkoutPage.png>)

## Attribution

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Storybook](https://storybook.js.org/)
- [MicroSoft Image Creator](https://designer.microsoft.com/image-creator)
- [Iconify](https://icon-sets.iconify.design/)
- [Favicon](https://favicon.io/)
- [Google Fonts](https://fonts.google.com/)












