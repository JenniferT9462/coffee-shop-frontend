# Day 1: Project Setup
## Dependencies for `Day 1`:
- Storybook and prop-types:
    ```bash
    npm install prop-types 
    npx storybook@latest init
- DaisyUI
    ```bash
    npm install --save-dev daisyui
## Set up the project structure using Next.js.
1. Create a New Next.js App:
    ```bash
    npx create-next-app@latest coffee-shop-frontend
    cd coffee-shop-frontend

Next.js setup prompts: ![screenshot of prompts](</public/nextPrompts.png>)

2. Initialize a Git Repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
3. Test Application:
    ```bash
    npm run dev
- Verify the app runs at <http://localhost:3000>

4. Update you README.md file.
    - Delete the default content.
    - Add an outline of what you plan to do or the template provided in the assignment.
    - Commit your changes.
5. Update `index.js` file.
    - Delete the default content.
    - add a simple heading to test the app.
    ```js
    export default function Home() {
        return <h1>Coffee Shop Frontend Splash Page</h1>;
    }
6. Deploy to <https://vercel.com>.
7. Create a new branch for today's work:
    ```bash
    git switch -c setup-components
## Setup Storybook
1. Install `Storybook` and `prop-types`:
    ```bash
    npm install prop-types 
    npx storybook@latest init
2. Run Storybook:
- NOTE: When first installing `Storybook` it usually auto runs. You can verify `Storybook` runs at <http://localhost:6006>
    ```bash
    npm run storybook
3. Setup `CSS` to work with `Storybook`.
- In `/styles/global.css`, you may delete the default css rules but, keep the following:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
- Add your global CSS to storybook. In the file `.storybook/previews`, import the Tailwind CSS file:
    ```js
    import '../src/styles/globals.css'; 
4. Add a Button Component to Test:
- You may delete `stories` directory in the `src` folder. These are just example stories. 
- Create a simple button component to test in Storybook:
    ```js
    // components/Button.js
    import PropTypes from 'prop-types';
    export default function Button({ label }) {
        return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{label}</button>;
    }
    Button.propTypes = {
        label: PropTypes.string.isRequired,
    };
- Open Storybook's UI by running:
    ```bash
    npm run storybook
- In storybook you can add a new story for your Button component by clicking the `+` and start typing `Button` and you should see it dropdown and select it. 

## Create Skeleton for All Components
- [x] Navbar.jsx
- [x] Footer.jsx
- [x] Button.jsx
- [x] Loader.jsx
- [x] Toast.jsx
- [x] ProductCard.jsx
- [x] CartItem.jsx
- [x] CartSummary.jsx

- Example for `NavBar`:
    ```js
    // components/Navbar.js
    import PropTypes from 'prop-types';
    export default function Navbar({title}) {
        return <div className="navbar">Navbar Component {title}</div>;
    }
    Navbar.propTypes = {
        // Add prop-types here
        title: PropTypes.string.isRequired,
    };
- Test each component in `Storybook`. 
- Add a screenshot of the `Storybook` interface to your `README.md`

## Setup DaisyUI
1. Install DaisyUI:
    ```bash
    npm install --save-dev daisyui
2. Configure DaisyUI:
    - Add DaisyUI to `tailwind.config.js`. Inside the `plugins` array add:
    ```js
    require("daisyui")
3. Add a theme to the DaisyUI configuration. 
    - Visit <https://daisyui.com/theme-generator/> to generate a custom theme or you can select a pre-generated themes. 
    - In the `tailwind.config.js` file add your custom theme. 
    - Example of a custom theme:
    ```js
    module.exports = {
        plugins: [require("daisyui")],
            daisyui: {
                themes: [
                {
                    coffeeShop: {
                    primary: "#6B4F4F", // Replace with your custom color
                    secondary: "#FFD700", // Replace with your custom color
                    accent: "#C0C0C0", // Replace with your custom color
                    neutral: "#3D4451", // Replace with your custom color
                    "base-100": "#FFFFFF", // Replace with your custom color
                    },
                },
                ],
            },
    };
- Example of a pre-designed theme:
    ```js
    daisyui: {
        themes: ["coffee"]
    }
4. Test the Theme:
    - Apply the theme in your `pages/_app` file:
    ```js
    import '../styles/globals.css';

    export default function MyApp({ Component, pageProps }) {
        return (
            <div data-theme="coffeeShop">
                <Component {...pageProps} />
            </div>
        );
    }
## Create Custom CSS Rule for a Component
- NOTE: You can also create custom `CSS` for different components.
- In `styles` directory create a `.css` file. Example: `navbar.css`.
    ```css
    /* styles/navbar.css */
    .navbar {
        background-color: #6b4f4f;
        color: white;
    }
- Import CSS to the component you want custom `CSS` applied to:
    ```js
    // components/Navbar.js
    import '../styles/navbar.css';

    export default function Navbar() {
        return <div className="navbar">Navbar Component</div>;
    }
- Verify the custom style is applied to the `Navbar` component. You can navigate to <http://localhost:3000> and see the styles that you just applied. 

## Challenges
- Challenges: I can't figure out how to change the text color after using DaisyUi theme. I tried applying a color from my theme to the body in `global.css` I also tried just applying a text color to the body and nothing shows up. 

## Key Deliverables:
* A functional Next.js app with DaisyUI and Storybook integrated.
* Basic database connectivity.
* A well-documented README for onboarding.

## Features
- Tailwind CSS with DaisyUI integration.
- Storybook for component development.


