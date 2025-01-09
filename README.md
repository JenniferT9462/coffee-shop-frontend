# coffee-shop-frontend

This is a project to build a frontend for a coffee shop. The project will include a variety of components and features to create a user-friendly experience for customers.

[Live link](https://coffee-shop-frontend-eight.vercel.app/)

## Development Plan
### Day 1: Project Setup
[Day 1](day-1.md)
### Day 2: Component and Form Development
[Day 2](day-2.md)
### Day 3: API Integration and Prop Management
[Day 3](day-3.md)
### Day 4: Authentication and API v2
[Day 4](day-4.md)
### Day 5: Shopping Cart Feature
[Day 5](day-5.md)

### Key Tools & Technologies
- Frontend: Next.js, DaisyUI, Storybook, React Hooks (useState, useQuery)
- Backend: Node.js, API v1 (non-auth) and API v2 (auth)
- Database: (Database type to be decided: e.g., MongoDB, PostgreSQL)
- Version Control: Git/GitHub

### Expected Outcome
By the end of Day 5, the project will be a fully functional e-commerce application with:

- Modular and reusable components.
- Secure and efficient API endpoints.
- A user-friendly shopping cart.
- A robust authentication system.

## Technologies

- React
- Next.js
- Tailwind CSS
- Storybook
- DaisyUI
- Vercel
- ...

## Components

- [x] Navbar
- [x] Footer
- [x] Button
- [x] Loader
- [x] Toast
- [x] ProductCard
- [x] CartItem
- [x] CartSummary

## Features
- [x] Tailwind CSS with DaisyUI integration.
- [x] Storybook for component development.
- [x] Component stubs for all components.

## Setup
If you would like to try this project out or contribute, follow these steps:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the app with `npm run dev`.
4. Open Storybook with `npm run storybook`.

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes.
4. Test your changes.
5. Push your changes to your fork.
6. Create a pull request.

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
### Design Goals
- I want to choose a different font for my project. I like `Oh No!` font. 
- I may tweak my color scheme, specifically the overall text color. And add a `dark` and `light` mode with a toggle button. 
- I still need to build a `NavBar` and what links I need to include with navigation. Also, decide how I want to display a `cart icon` with counter. I may also add some effects or animation when adding items to cart or motion effect on page loads. The animation I am thinking is similar to the McDonald's App when adding items to cart, it does a effect to the cart icon. It kinda looks like it's diving into the cart icon(may be a stretch, but we will see).

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

Give credit to any resources or inspiration you used in this project.

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Storybook](https://storybook.js.org/)
- [MicroSoft Image Creator](https://designer.microsoft.com/image-creator)
- [iconify](https://icon-sets.iconify.design/)












