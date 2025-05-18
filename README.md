# CareMonitorDemo

- This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.
- Documentation reference :- [Documentation](https://www.notion.so/Documentation-of-CareMonitor-demo-app-1f7d1c8301518024810ed35c993a1c21?pvs=4) of the application.
# Overview of application:-
This Angular application utilizes a component-based architecture with independent, reusable UI elements for maintainability and scalability. Reactive state management via Angular Signals, particularly in feature-specific stores, separates data handling from component presentation. Services encapsulate business logic, promoting decoupling and flexibility.
The well-defined folder structure, separating core logic, features, shared components, assets, and styling, enhances organization and understandability.
Standalone components simplify the module structure, aligning with modern Angular practices.
A mocked API facilitates development, and clear instructions aid project setup.


# Follow these steps to run the Angular v19 project locally


- **Credentials for login :-**
    - `email`: `demo@caremonitor.com`
      

    ```bash
    demo@caremonitor.com
    ```

    - `password`: `Demo@123`

    ```bash
    Demo@123
    ```




- **Prerequisites:**
    - **Node.js:** Ensure you have Node.js (version 18 or higher recommended for Angular 19) installed on your system.
    You can download it from https://nodejs.org/.
    - **npm (Node Package Manager):** npm comes bundled with Node.js. You can check your version by running `npm -v` in your terminal.
    - **Angular CLI:** Install the Angular Command-Line Interface globally:
    Verify the installation by running `ng version`.

    ```bash
    npm install -g @angular/cli@~19.0.0
    ```

- **Steps to run the demo project :-**
    1. **Clone the Repository:**

    ```bash
    git clone https://github.com/MyDiaryAshish/careMonitorDemo.git](https://github.com/MyDiaryAshish/careMonitorDemo.git)
    ```

    2. **Install Dependencies:**

    ```bash
    npm install
    ```

    This command will install all the necessary dependencies defined in the `package.json` file, including Angular Material, Bootstrap, `ngx-cookie-service`, `crypto-js`, and `angular-in-memory-web-api`.

    3. **Run the Development Server:**

    ```bash
    ng serve -o
    ```

    This command will build the application and start a development server.

# Detailed Analysis of Application
This Angular application is structured to create a maintainable and scalable single-page application (SPA).
Here's a detailed analysis of key aspects:

- **Architecture:**
    - Component-Based Architecture: The application's UI is built as a hierarchy of reusable components.
    - Separation of Concerns: Different parts of the application are divided into separate modules and services for better organization and maintainability.
    - Modularity: The application is divided into components ( components are imported directly), each responsible for a specific function.
- **Authentication Flow:**
    - The application uses cookies to store authentication tokens.
    - `AuthService` manages the user's login state, handles login and logout, and provides methods to check the user's login status.
    It uses Angular Signals to hold the authentication state.
    - `AuthGuard` protects specific routes, ensuring that only authenticated users can access them.
    - The application interacts with a mock API (`MockApiService`) for authentication and data retrieval.
- **Data Management:**
    - The application uses Angular Signals for reactive state management.
    Components like `ItemsComponent` use signals to manage and display data reactively.
    - Services (`AuthService`, `ItemsStore`) are responsible for fetching and managing data.
    - Components retrieve data from services and display it in templates.
- **Layout and Navigation:**
    - The application has a common layout, defined by the `HeaderComponent` and `SidenavComponent`.
    - **Header Component:**
        - Displays the application title/logo.
        - Provides a user menu, which currently includes a logout option.
        The logout functionality is handled by calling the `AuthService.logout()` method.
    - **Sidenav Component:**
        - Provides the main navigation menu for the application.
        - Displays links to the dashboard and other main sections, such as the user list.
        - Uses Angular's `routerLink` directive for navigation and `routerLinkActive` to highlight the active route.
    - Angular Router is used to navigate between different views of the application (login, dashboard, list).
    - The application uses lazy loading to load the list component only when the user navigates to the `/list` route.
- **User Interface:**
    - Angular Material is used for UI components, providing a consistent and modern design.
    - The `spinner` and `error-banner` components are used to display loading indicators and error messages.
- **API Simulation:**
    - The application uses `angular-in-memory-web-api` to simulate a backend API.
    - `MockApiService` provides mock endpoints for login and retrieving user data.

    Overall, this Angular application demonstrates good design practices, including modularity, separation of concerns, and the use of modern tools and libraries.
    The application is well-structured, making it relatively easy to maintain and extend.

# Implemented Features:-
- **User Authentication:**
    - **Login:** Users can log in to the application using their email and password.
    The application includes a login form with validation, error handling, and a loading indicator.
    - **Authentication Guard:** Protects specific routes (e.g., Dashboard, List) and redirects unauthenticated users to the login page.
    - **Authentication Service:** Manages the user's authentication state (login/logout), stores tokens and user information, and provides login/logout functionality.
- **Dashboard:** Displays a welcome message and the email of the logged-in user.
- **Layout:**
    - **Header:** Displays the application title/logo and provides a user menu (currently with a logout option).
    - **Side-navigation:** Provides the application's main navigation menu. Option to switch between list and dashboard components
- **User List Management:**
    - **Display List:** Displays a list of users with details such as ID, name, and description.
    - **Pagination:** Divides the list of users into pages for easier viewing.
    - **Loading Indicator:** Displays a loading indicator while fetching user data.
    - **Error Handling:** Displays an error message if fetching user data fails.
- **Route Navigation:** The application uses Angular routing to navigate between different views: login, dashboard, and user list.

# Unit Test Case Details

## Tools Used

This project utilizes the following tools for its unit testing suite:

- **Jasmine:** A behavior-driven development (BDD) framework for JavaScript used to write expressive test specifications.
- **Karma:** A test runner that executes the Jasmine tests in a browser environment.

## Core Functionality Tests:

**AuthService:**

- Verifies the correct setting and retrieval of authentication tokens and user email in cookies.
- Ensures the `isLoggedIn()` method accurately reflects the authentication status.
- Confirms navigation to the dashboard upon successful login and to the login page upon logout.
- Tests the clearing of authentication cookies and resetting of user state on logout.

**AuthGuard:**

- Checks if the guard allows access to protected routes when a valid authentication token exists.
- Verifies that the guard redirects unauthenticated users to the login page.

**MockApiService:**

- Confirms that the mock API service can be instantiated correctly.
- Tests the initialization of the mock database with the expected user and item data.
- Verifies the correct parsing of request URLs, especially for login requests.
- Tests the `post()` method for the `/api/login` endpoint with valid and invalid credentials, ensuring the correct success and error responses (including status codes and response bodies).
- Confirms that `post()` for non-login collections returns `undefined`.

## Component-Specific Tests:

**AppComponent:**

- Verifies the creation of the main application component.
- Tests the conditional rendering of the loading spinner based on the authentication loading state.
- Ensures the header, sidenav, and router outlet are displayed when the user is logged in (or not in a loading state).
- Confirms that the `logout()` method in the component calls the `AuthService`'s `logout()` method.

**LoginComponent:**

- Verifies the creation and initialization of the login form with email and password controls.
- Tests that form validation (required and email format) is enforced.
- Ensures that the component attempts to log in via the `AuthService` on form submission with valid credentials.
- Tests the display of error messages for failed login attempts (invalid credentials, network errors).
- Verifies the loading state and disabling of the login button during the login process.

**DashboardComponent:**

- Verifies the creation of the dashboard component.
- Tests the retrieval and display of the user's email from the `CookieService` upon initialization.
- Handles cases where the user email cookie is not found.

**ErrorBannerComponent:**

- Verifies the creation of the error banner component.
- Tests the conditional rendering of the error card based on the presence of an error message.
- Ensures the provided error message is correctly displayed in the banner.
- Confirms the presence and styling of the error icon.

**SpinnerComponent:**

- Verifies the creation of the spinner component.
- Ensures the Material spinner element is rendered.
- Checks for the presence of custom CSS classes.

**HeaderComponent:**

- Verifies the creation of the header component.
- Tests the presence and navigation link of the "CareMonitor" title.
- Ensures the account menu button is present.
- Verifies the presence and text of the "Logout" button in the menu.
- Confirms that clicking the logout button triggers the `logout()` method, which in turn calls the `AuthService`.

**SidenavComponent:**

- Verifies the creation of the sidenav component.
- Tests the presence and `routerLink` attributes of the navigation links (Dashboard and View List).
- Ensures the `routerLinkActive` directive is applied correctly.
- Checks for the presence of Material icons and their associated text.

# Potential Future Features (Security Enhancements):

- **Data Encryption in Cookies:** Implement encryption/decryption of sensitive data (like the authentication token and user email) before storing it in cookies to enhance security.

- **Input Field Security:** Implement robust security measures on input fields to prevent common web vulnerabilities such as cross-site scripting (XSS) and other forms of injection or phishing attempts. This would involve techniques like input sanitization and validation on both the client and server-side (if a real backend were integrated).
