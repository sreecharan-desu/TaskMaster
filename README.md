# Repository Documentation

## Repository Architecture

```mermaid
graph TB
    A[Repository] --> B[Modules: 1]
    A --> C[Sections: 4]
    B --> D[Core Components]
    B --> E[UI Components]
    B --> F[Utilities]
    C --> G[API Documentation]
    C --> H[Implementation Guides]
    C --> I[Code Examples]
    
    style A fill:#10b981,stroke:#059669,color:#ffffff
    style B fill:#3b82f6,stroke:#2563eb,color:#ffffff
    style C fill:#8b5cf6,stroke:#7c3aed,color:#ffffff
```

## Table of Contents

### 1. Core Application Components & Utilities

No description available

**Sections:**


**1.** [Recoil Atoms for User Signup State Management in React](#section-link-module-module_miscellaneous_utilities-section-optimized_recoil_atoms_for_user_signup_state_management_in_react)

**2.** [Reusable Input Component for User Dashboard Forms](#section-link-module-module_miscellaneous_utilities-section-optimized_reusable_input_component_for_user_dashboard_forms)

**3.** [Secure Your Node.js APIs: JWT Authentication Middleware for User Authorization](#section-link-module-module_miscellaneous_utilities-section-optimized_secure_your_node.js_apis:_jwt_authentication_middleware_for_user_authorization)

**4.** [Taskmaster Database Setup: Mongoose Models for Users, Admins, and Todos](#section-link-module-module_miscellaneous_utilities-section-optimized_taskmaster_database_setup:_mongoose_models_for_users,_admins,_and_todos)

---



## Navigation Guide

- **Modules**: Browse through organized code modules in the left sidebar
- **Sections**: Each module contains multiple documentation sections
- **Search**: Use the search bar to quickly find specific content
- **Headings**: Use the right sidebar to navigate within long documents
- **Actions**: Copy or download any section content using the toolbar buttons

## Task Master Frontend: User and Admin Authentication and Task Management System

This document provides a comprehensive technical overview of the user and admin authentication and task management system implemented in the Task Master frontend application. It covers the architecture, workflows, data flows, usage, and important implementation details.

### Overview

The Task Master frontend application, built with React, provides user and admin interfaces for managing tasks. Users can sign up, sign in, create, update, mark as complete, and delete tasks. Admins can sign up, sign in, and manage users (delete users). The application uses Recoil for state management and interacts with a backend API (hosted on Vercel) for data persistence and authentication.

### Architecture

The frontend application is structured into several key areas:

*   **User Authentication:** Handles user signup and sign-in processes.
*   **Admin Authentication:** Handles admin signup and sign-in processes.
*   **User Dashboard:** Provides the main interface for users to manage their tasks.
*   **Admin Dashboard:** Provides the main interface for admins to manage users.
*   **Shared Components:** Reusable UI components used across the application.
*   **Recoil State Management:** Manages application state using Recoil atoms.

The application interacts with the backend API via `fetch` requests.  The API endpoints are hardcoded in the frontend code.

### Data Flow and Workflows

#### 1. User Signup Workflow

This workflow describes the process of a user creating a new account.

```mermaid
sequenceDiagram
    participant User
    participant UserSignup Component
    participant signupstore.jsx
    participant Backend API

    User->>UserSignup Component: Enters username and password
    UserSignup Component->>signupstore.jsx: Updates Recoil atoms (usersignupusernameAtom, usersignuppasswordAtom)
    UserSignup Component->>Backend API: Sends signup request (POST /api/v1/user/signup) with username and password
    Backend API-->>UserSignup Component: Returns success or error message
    alt Signup successful
        UserSignup Component->>toast: Displays success message
        UserSignup Component->>navigate: Redirects to /user/signin after 1.5 seconds
    else Signup failed
        UserSignup Component->>toast: Displays error message
    end
```

**Explanation:**

1.  The user enters their desired username and password in the `UserSignup` component (`frontend/src/pages/user/signup/signup.jsx`).
2.  The `UserSignup` component uses `useRecoilState` to update the `usersignupusernameAtom` and `usersignuppasswordAtom` atoms defined in `signupstore.jsx` (`frontend/src/pages/user/signup/store/signupstore.jsx`).
3.  The `SignupUser` function in `UserSignup` makes a `POST` request to the `/api/v1/user/signup` endpoint on the backend API, sending the username and password in the request body.
4.  The backend API processes the request and returns a JSON response indicating success or failure.
5.  Based on the response, the `UserSignup` component displays a success or error message using the `react-hot-toast` library.
6.  If the signup is successful, the component redirects the user to the sign-in page (`/user/signin`) after a short delay.

**Code Example (UserSignup Component):**

```javascript
import { useRecoilState } from "recoil";
import { usersignuppasswordAtom, usersignupusernameAtom } from "./store/signupstore";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserSignup() {
    const navigate = useNavigate();
    const [username, setUsername] = useRecoilState(usersignupusernameAtom);
    const [password, setPassword] = useRecoilState(usersignuppasswordAtom);

    const SignupUser = async () => {
        if(username === '' || password === '') {
            toast.error('Username and password must not be empty');
            return;
        }
        
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.msg);
                setTimeout(() => navigate('/user/signin'), 1500);
            } else {
                toast.error(data.msg);
            }
        } catch(e) {
            toast.error('Error connecting to server. Please check your internet connection.');
        }
    };

    // ... (rest of the component)
}
```

#### 2. User Signin Workflow

This workflow describes the process of a user logging into their account.

```mermaid
sequenceDiagram
    participant User
    participant UserSignin Component
    participant signinstore.jsx
    participant Backend API

    User->>UserSignin Component: Enters username and password
    UserSignin Component->>signinstore.jsx: Updates Recoil atoms (userSigninusernameAtom, userSigninpasswordAtom)
    UserSignin Component->>Backend API: Sends signin request (POST /api/v1/user/signin) with username and password
    Backend API-->>UserSignin Component: Returns success or error message and token
    alt Signin successful
        UserSignin Component->>localStorage: Stores token
        UserSignin Component->>navigate: Redirects to /user/dashboard
    else Signin failed
        UserSignin Component->>toast: Displays error message
    end
```

**Explanation:**

1.  The user enters their username and password in the `UserSignin` component (`frontend/src/pages/user/signin/signin.jsx`).
2.  The `UserSignin` component uses `useRecoilState` to update the `userSigninusernameAtom` and `userSigninpasswordAtom` atoms defined in `signinstore.jsx` (`frontend/src/pages/user/signin/store/signinstore.jsx`).
3.  The `handleSignin` function in `UserSignin` makes a `POST` request to the `/api/v1/user/signin` endpoint on the backend API, sending the username and password in the request body.
4.  The backend API processes the request, authenticates the user, and returns a JSON response containing a token if successful, or an error message if not.
5.  If the sign-in is successful, the `UserSignin` component stores the token in `localStorage` and redirects the user to the dashboard (`/user/dashboard`).
6.  If the sign-in fails, the component displays an error message using the `react-hot-toast` library.

**Code Example (UserSignin Component):**

```javascript
import { useRecoilState } from "recoil";
import { userSigninpasswordAtom, userSigninusernameAtom } from "./store/signinstore";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserSignin() {
    const navigate = useNavigate();
    const [username, setUsername] = useRecoilState(userSigninusernameAtom);
    const [password, setPassword] = useRecoilState(userSigninpasswordAtom);

    const handleSignin = async () => {
        if(username === '' || password === '') {
            toast.error('Username and password must not be empty');
            return;
        }
        
        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            
            if(data.token) {
                localStorage.setItem('token', JSON.stringify(data.token));
                navigate('/user/dashboard');
            } else {
                toast.error(data.msg || 'Login failed');
            }
        } catch(e) {
            toast.error('Error connecting to server. Please check your internet connection.');
        }
    };

    // ... (rest of the component)
}
```

#### 3. Add Todo Workflow

This workflow describes the process of a user adding a new todo item.

```mermaid
sequenceDiagram
    participant User
    participant AddTodo Component
    participant dashboardStore.jsx
    participant Backend API
    participant Todos Component

    User->>AddTodo Component: Enters title and description
    AddTodo Component->>dashboardStore.jsx: Updates Recoil atoms (todoTitle, todoDescription)
    AddTodo Component->>Backend API: Sends addtodo request (POST /api/v1/user/addtodo) with title and description
    Backend API-->>AddTodo Component: Returns success or error message and todo ID
    alt Add todo successful
        AddTodo Component->>toast: Displays success message
        AddTodo Component->>Backend API: Sends gettodos request (GET /api/v1/user/gettodos)
        Backend API-->>Todos Component: Returns updated list of todos
        Todos Component->>dashboardStore.jsx: Updates Recoil atom (todosAtom)
    else Add todo failed
        AddTodo Component->>toast: Displays error message
    end
```

**Explanation:**

1.  The user enters the title and description of the new todo in the `AddTodo` component (`frontend/src/pages/user/Dashboard/Components/Addtodo.jsx`).
2.  The `AddTodo` component uses `useRecoilState` to update the `todoTitle` and `todoDescription` atoms defined in `dashboardStore.jsx` (`frontend/src/pages/user/Dashboard/store/dashboardStore.jsx`).
3.  The `handleSubmit` function in `AddTodo` makes a `POST` request to the `/api/v1/user/addtodo` endpoint on the backend API, sending the title and description in the request body.  The request includes the user's token in the `Authorization` header.
4.  The backend API processes the request, creates the new todo, and returns a JSON response indicating success or failure, along with the ID of the newly created todo.
5.  If the todo is added successfully, the `AddTodo` component displays a success message using the `react-hot-toast` library.  It then fetches the updated list of todos from the backend API using a `GET` request to `/api/v1/user/gettodos`.
6.  The `Todos` component receives the updated list of todos and updates the `todosAtom` in `dashboardStore.jsx`.
7.  If adding the todo fails, the component displays an error message using the `react-hot-toast` library.

**Code Example (AddTodo Component):**

```javascript
import { useRecoilState } from "recoil";
import { todoDescription, todosAtom, todoTitle } from "../store/dashboardStore";
import toast from 'react-hot-toast';

export function AddTodo() {
    const [title, setTitle] = useRecoilState(todoTitle);
    const [description, setDescription] = useRecoilState(todoDescription);
    const [todos, setTodos] = useRecoilState(todosAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/addtodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.msg);
                // Fetch updated todos
                const todosResponse = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/gettodos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                    }
                });
                const todosData = await todosResponse.json();
                if (todosData.success) {
                    setTodos(todosData.todos);
                }
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        }
    };

    // ... (rest of the component)
}
```

#### 4. Update Todo Workflow

This workflow describes the process of a user updating an existing todo item.

```mermaid
sequenceDiagram
    participant User
    participant Todos Component
    participant UpdateTodo Component
    participant dashboardStore.jsx
    participant Backend API

    User->>Todos Component: Clicks "Update" on a todo item
    Todos Component->>dashboardStore.jsx: Updates Recoil atom (updateStatus) to open update modal
    UpdateTodo Component->>dashboardStore.jsx: Updates Recoil atoms (updatedTitle, updatedDescription) with current todo values
    User->>UpdateTodo Component: Modifies title and/or description
    UpdateTodo Component->>Backend API: Sends updatetodo request (PUT /api/v1/user/updatetodo) with updated title and description
    Backend API-->>UpdateTodo Component: Returns success or error message
    alt Update successful
        UpdateTodo Component->>toast: Displays success message
        UpdateTodo Component->>Todos Component: Updates todo item in todosAtom
    else Update failed
        UpdateTodo Component->>toast: Displays error message
    end
    UpdateTodo Component->>dashboardStore.jsx: Updates Recoil atom (updateStatus) to close update modal
```

**Explanation:**

1.  The user clicks the "Update" button on a todo item in the `Todos` component (`frontend/src/pages/user/Dashboard/Components/Todos.jsx`).
2.  The `updateTodo` function in `Todos` updates the `updateStatus` atom in `dashboardStore.jsx` to open the `UpdateTodo` modal (`frontend/src/pages/user/Dashboard/Components/updatetodo.jsx`). The `updateStatus` atom also stores the index of the todo item being updated.
3.  The `UpdateTodo` component uses `useRecoilState` to update the `updatedTitle` and `updatedDescription` atoms with the current values of the todo item being updated.
4.  The user modifies the title and/or description in the `UpdateTodo` component.
5.  The `updateDetails` function in `UpdateTodo` makes a `PUT` request to the `/api/v1/user/updatetodo` endpoint on the backend API, sending the updated title and description in the request body and the todo ID as a query parameter. The request includes the user's token in the `Authorization` header.
6.  The backend API processes the request and returns a JSON response indicating success or failure.
7.  If the update is successful, the `UpdateTodo` component displays a success message using the `react-hot-toast` library. The component then updates the `todosAtom` in `dashboardStore.jsx` with the updated todo item.
8.  If the update fails, the component displays an error message using the `react-hot-toast` library.
9.  Finally, the `UpdateTodo` component updates the `updateStatus` atom to close the modal.

**Code Example (UpdateTodo Component):**

```javascript
import { useRecoilState } from 'recoil';
import { updatedDescription, updatedTitle, updateStatus, todosAtom } from "../store/dashboardStore";
import toast from 'react-hot-toast';

export default function UpdateTodo() {
    const [updatestatus, setUpdatestatus] = useRecoilState(updateStatus);
    const [title, setTitle] = useRecoilState(updatedTitle);
    const [description, setDescription] = useRecoilState(updatedDescription);
    const [todos, setTodos] = useRecoilState(todosAtom);

    const updateDetails = async () => {
        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/user/updatetodo?todoid=${updatestatus[0].indexes[0]}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });

            const data = await response.json();

            if (data.success) {
                setTodos(prevTodos => 
                    prevTodos.map(todo => 
                        todo._id === updatestatus[0].indexes[0]
                            ? { ...todo, Title: title, Description: description }
                            : todo
                    )
                );
                toast.success(data.msg);
                closeModal();
            } else {
                toast.error(data.msg || 'Failed to update todo');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        }
    };

    // ... (rest of the component)
}
```

#### 5. Admin Delete User Workflow

This workflow describes the process of an admin deleting a user account.

```mermaid
sequenceDiagram
    participant Admin
    participant Users Component
    participant Backend API

    Admin->>Users Component: Clicks "Delete" on a user
    Users Component->>Backend API: Sends deleteuser request (DELETE /api/v1/admin/deleteuser) with userId
    Backend API-->>Users Component: Returns success or error message
    alt Delete successful
        Users Component->>toast: Displays success message
        Users Component->>window: Reloads the page
    else Delete failed
        Users Component->>toast: Displays error message
    end
```

**Explanation:**

1.  The admin clicks the "Delete" button on a user in the `Users` component (`frontend/src/pages/admin/dashboard/components/Users.jsx`).
2.  The `handleDelete` function in `Users` makes a `DELETE` request to the `/api/v1/admin/deleteuser` endpoint on the backend API, sending the user ID as a query parameter. The request includes the admin's token in the `Authorization` header.
3.  The backend API processes the request and returns a JSON response indicating success or failure.
4.  If the deletion is successful, the `Users` component displays a success message using the `react-hot-toast` library and reloads the page.
5.  If the deletion fails, the component displays an error message using the `react-hot-toast` library.

**Code Example (Users Component):**

```javascript
import toast from 'react-hot-toast';

export function Users({ UsersList }) {
    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`https://task-master-api-psi.vercel.app/api/v1/admin/deleteuser?userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + JSON.parse(localStorage.getItem('Admintoken'))
                }
            });

            const data = await response.json();
            
            if (data.success) {
                toast.success(data.msg);
                window.location.reload();
            } else {
                toast.error(data.msg || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user. Please try again.');
        }
    };

    // ... (rest of the component)
}
```

### Recoil State Management

The application uses Recoil for managing global state. Key atoms include:

*   **User Signup:**
    *   `usersignupmessageAtom` (`signupstore.jsx`): Stores signup success/error messages.
    *   `usersignupusernameAtom` (`signupstore.jsx`): Stores the username entered during signup.
    *   `usersignuppasswordAtom` (`signupstore.jsx`): Stores the password entered during signup.
*   **User Signin:**
    *   `userSigninmessageAtom` (`signinstore.jsx`): Stores signin success/error messages.
    *   `userSigninusernameAtom` (`signinstore.jsx`): Stores the username entered during signin.
    *   `userSigninpasswordAtom` (`signinstore.jsx`): Stores the password entered during signin.
*   **Admin Signup:**
    *   `adminsignupmessageAtom` (`signupstore.jsx`): Stores signup success/error messages.
    *   `adminsignupusernameAtom` (`signupstore.jsx`): Stores the username entered during signup.
    *   `adminsignuppasswordAtom` (`signupstore.jsx`): Stores the password entered during signup.
*   **Admin Signin:**
    *   `adminsigninmessageAtom` (`signinstore.jsx`): Stores signin success/error messages.
    *   `adminsigninusernameatom` (`signinstore.jsx`): Stores the username entered during signin.
    *   `adminsigninpasswordAtom` (`signinstore.jsx`): Stores the password entered during signin.
*   **Dashboard:**
    *   `Userusername` (`dashboardStore.jsx`): Stores the current user's username.
    *   `todosAtom` (`dashboardStore.jsx`): Stores the list of todos for the current user.
    *   `todoTitle` (`dashboardStore.jsx`): Stores the title of a new todo being added.
    *   `todoDescription` (`dashboardStore.jsx`): Stores the description of a new todo being added.
    *   `updatedTitle` (`dashboardStore.jsx`): Stores the title of a todo being updated.
    *   `updatedDescription` (`dashboardStore.jsx`): Stores the description of a todo being updated.
    *   `updateStatus` (`dashboardStore.jsx`): Stores the status of the update modal (open/closed) and the index of the todo being updated.
*   **Admin Dashboard:**
    *   `username` (`admin-dashboard-store.jsx`): Stores the current admin's username.
    *   `UsersList` (`admin-dashboard-store.jsx`): Stores the list of users.
    *   `adminProfileusernameAtom` (`admin-dashboard-store.jsx`): Stores the username for admin profile updates.
    *   `adminProfilepasswordAtom` (`admin-dashboard-store.jsx`): Stores the password for admin profile updates.

These atoms are used with `useRecoilState` and `useRecoilValue` hooks to access and update the state in various components.

### Usage Guide

#### User Signup

1.  Navigate to the signup page (`/user/signup`).
2.  Enter a username and password.
3.  Click the "Sign Up" button.
4.  If the signup is successful, you will be redirected to the sign-in page.

#### User Signin

1.  Navigate to the sign-in page (`/user/signin`).
2.  Enter your username and password.
3.  Click the "Sign In" button.
4.  If the sign-in is successful, you will be redirected to the dashboard.

#### Adding a Todo

1.  Navigate to the user dashboard (`/user/dashboard`).
2.  Enter a title and description for the new todo in the "Add Todo" section.
3.  Press Enter in the description field or click outside the input boxes.
4.  The new todo will be added to the list.

#### Updating a Todo

1.  Navigate to the user dashboard (`/user/dashboard`).
2.  Click the "Update" button next to the todo you want to update.
3.  Modify the title and/or description in the update modal.
4.  Click the "Update" button in the modal.
5.  The todo will be updated in the list.

#### Marking a Todo as Complete

1.  Navigate to the user dashboard (`/user/dashboard`).
2.  Click the checkbox next to the todo you want to mark as complete.
3.  The todo will be marked as complete.

#### Deleting a Todo

1.  Navigate to the user dashboard (`/user/dashboard`).
2.  Click the "Delete" button next to the todo you want to delete.
3.  The todo will be deleted from the list.

#### Admin Signin

1.  Navigate to the admin sign-in page (`/admin/signin`).
2.  Enter your username and password.
3.  Click the "Sign In" button.
4.  If the sign-in is successful, you will be redirected to the admin dashboard.

#### Deleting a User (Admin)

1.  Navigate to the admin dashboard (`/admin/dashboard`).
2.  Click the "Delete" button next to the user you want to delete.
3.  The user will be deleted from the list.

### Important Implementation Details and Gotchas

*   **Authentication:** The application uses JSON Web Tokens (JWT) for authentication. The token is stored in `localStorage` on the client-side.
*   **API Endpoints:** The API endpoints are hardcoded in the frontend code. This should be externalized to a configuration file for better maintainability.
*   **Error Handling:** The application uses `react-hot-toast` for displaying error messages. However, more robust error handling and logging mechanisms should be implemented.
*   **Recoil State Management:** Recoil is used for managing global state. Understanding Recoil concepts like atoms and selectors is crucial for working with this application.
*   **Asynchronous Operations:** Many operations involve asynchronous `fetch` calls. Proper handling of promises and loading states is important to prevent UI issues.
*   **Duplicated Code:** There is significant code duplication between the user and admin signup/signin components.  Consider refactoring to share common logic.

### Common Issues and Troubleshooting

*   **Network Errors:** If you encounter network errors, check your internet connection and ensure that the backend API is running and accessible.
*   **Authentication Issues:** If you are unable to sign in, check your username and password. If you are still unable to sign in, try clearing your browser's cache and cookies.
*   **Data Not Updating:** If the data on the dashboard is not updating, try refreshing the page. If the issue persists, check the browser's console for any errors.
*   **"Please login first" error on Admin Dashboard:** This error occurs when the `Admintoken` is not present in local storage. Ensure you are logged in as an admin.

### Advanced Configuration and Customization Options

*   **API Endpoint Configuration:** The API endpoints can be configured by modifying the hardcoded URLs in the frontend components. However, it is recommended to externalize these URLs to a configuration file.
*   **UI Customization:** The UI can be customized by modifying the CSS styles in the `src/App.css` file and other component-specific CSS files.
*   **Recoil State Management:** The Recoil state can be customized by modifying the atoms and selectors defined in the `src/atoms` directory.

### Performance Considerations and Optimization Strategies

*   **Code Splitting:** Implement code splitting to reduce the initial load time of the application.
*   **Caching:** Implement caching mechanisms to reduce the number of requests to the backend API.
*   **Image Optimization:** Optimize images to reduce their file size and improve loading performance.
*   **Memoization:** Use `React.memo` to prevent unnecessary re-renders of components.

### Security Implications and Best Practices

*   **Token Storage:** Storing the JWT in `localStorage` is vulnerable to XSS attacks. Consider using a more secure storage mechanism, such as HTTP-only cookies.
*   **Input Validation:** Implement robust input validation on both the client-side and server-side to prevent injection attacks.
*   **Authorization:** Ensure that all API endpoints are properly protected with authorization checks to prevent unauthorized access.
*   **HTTPS:** Use HTTPS to encrypt all communication between the client and server.

### Component Relationships

The following diagram illustrates the relationships between key components in the application.

```mermaid
graph LR
    App --> BrowserRouter
    BrowserRouter --> RouteUserSignup
    BrowserRouter --> RouteUserSignin
    BrowserRouter --> RouteUserDashboard
    BrowserRouter --> RouteAdminSignup
    BrowserRouter --> RouteAdminSignin
    BrowserRouter --> RouteAdminDashboard

    RouteUserSignup --> UserSignup
    RouteUserSignin --> UserSignin
    RouteUserDashboard --> UserDashboard
    RouteAdminSignup --> AdminSignup
    RouteAdminSignin --> AdminSignin
    RouteAdminDashboard --> AdminDashboard

    UserDashboard --> Navbar
    UserDashboard --> Todos
    UserDashboard --> AddTodo
    AdminDashboard --> NavbarAdmin
    AdminDashboard --> Users

    Todos --> UpdateTodo
```

**Explanation:**

*   The `App` component is the root component of the application.
*   It uses `BrowserRouter` from `react-router-dom` to handle routing.
*   `BrowserRouter` defines several `Route` components for different URLs.
*   Each `Route` component renders a specific component based on the URL.
*   `UserDashboard` and `AdminDashboard` are the main dashboards for users and admins, respectively.
*   These dashboards include components like `Navbar`, `Todos`, `AddTodo`, and `Users` for managing tasks and users.
*   The `Todos` component includes the `UpdateTodo` component for updating existing tasks.

### Dependency Chains

The following diagram illustrates the dependency chains between key modules.

```mermaid
graph LR
    App --> main.jsx
    main.jsx --> react
    main.jsx --> react-dom
    App --> react-router-dom
    App --> recoil
    UserSignup --> signupstore.jsx
    UserSignin --> signinstore.jsx
    UserDashboard --> dashboardStore.jsx
    AdminDashboard --> admin-dashboard-store.jsx
```

**Explanation:**

*   The `App` component depends on `react`, `react-dom`, `react-router-dom`, and `recoil`.
*   The `UserSignup` component depends on `signupstore.jsx` for Recoil atoms.
*   The `UserSignin` component depends on `signinstore.jsx` for Recoil atoms.
*   The `UserDashboard` component depends on `dashboardStore.jsx` for Recoil atoms.
*   The `AdminDashboard` component depends on `admin-dashboard-store.jsx` for Recoil atoms.

### Call Sequences

The following diagram illustrates the typical call sequence for adding a new todo item.

```mermaid
sequenceDiagram
    participant User
    participant AddTodo Component
    participant Backend API
    participant Todos Component

    User->>AddTodo Component: Enters title and description
    AddTodo Component->>handleSubmit: Calls handleSubmit function
    handleSubmit->>Backend API: Sends POST request to /api/v1/user/addtodo
    Backend API-->>handleSubmit: Returns success or error message
    alt Success
        handleSubmit->>Todos Component: Fetches updated todos
        Todos Component->>setTodos: Updates todosAtom
    else Failure
        handleSubmit->>toast: Displays error message
    end
```

**Explanation:**

1.  The user enters the title and description for the new todo in the `AddTodo` component.
2.  The `AddTodo` component calls the `handleSubmit` function when the user submits the form.
3.  The `handleSubmit` function sends a `POST` request to the `/api/v1/user/addtodo` endpoint on the backend API.
4.  The backend API processes the request and returns a success or error message.
5.  If the request is successful, the `handleSubmit` function fetches the updated list of todos from the backend API and updates the `todosAtom`.
6.  If the request fails, the `handleSubmit` function displays an error message using the `react-hot-toast` library.

### State Management

The application uses Recoil for state management. The following diagram illustrates the flow of state for managing todos.

```mermaid
stateDiagram-v2
    state "Todos Component" as Todos
    state "dashboardStore.jsx (todosAtom)" as TodosAtom
    state "Backend API" as API

    Todos --> TodosAtom: Reads todos
    Todos --> API: Fetches todos
    API --> TodosAtom: Updates todos
    TodosAtom --> Todos: Re-renders
```

**Explanation:**

1.  The `Todos` component reads the list of todos from the `todosAtom` in `dashboardStore.jsx`.
2.  The `Todos` component fetches the list of todos from the backend API.
3.  The backend API returns the list of todos.
4.  The `Todos` component updates the `todosAtom` with the new list of todos.
5.  The `Todos` component re-renders to display the updated list of todos.

### Error Propagation

The application uses `try...catch` blocks to handle errors. The following diagram illustrates how errors are propagated.

```mermaid
sequenceDiagram
    participant Component
    participant API
    participant toast

    Component->>API: Makes API request
    alt Success
        API-->>Component: Returns data
    else Failure
        API-->>Component: Returns error
        Component->>toast: Displays error message
    end
```

**Explanation:**

1.  A component makes an API request.
2.  If the request is successful, the API returns the data.
3.  If the request fails, the API returns an error.
4.  The component catches the error and displays an error message using the `react-hot-toast` library.

### Connection Examples

The following code example illustrates how the `UserSignup` component connects to the backend API.

```javascript
const SignupUser = async () => {
    try {
        const response = await fetch('https://task-master-api-psi.vercel.app/api/v1/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            toast.success(data.msg);
            setTimeout(() => navigate('/user/signin'), 1500);
        } else {
            toast.error(data.msg);
        }
    } catch(e) {
        toast.error('Error connecting to server. Please check your internet connection.');
    }
};
```

**Explanation:**

*   The `fetch` function is used to make a `POST` request to the `/api/v1/user/signup` endpoint.
*   The `headers` option specifies the content type as `application/json`.
*   The `body` option specifies the data to be sent in the request body.
*   The `response.json()` method is used to parse the JSON response from the API.
*   The `toast.success()` and `toast.error()` functions are used to display success and error messages, respectively.

### Workflow Visualization

The following diagram illustrates the overall workflow of the task management system.

```mermaid
graph TD
    A[User] --> B{Authentication};
    B -- Success --> C[Dashboard];
    B -- Failure --> D[Error Message];
    C --> E{Add Task};
    C --> F{Update Task};
    C --> G{Delete Task};
    E --> H[Backend API];
    F --> H;
    G --> H;
    H -- Success --> C;
    H -- Failure --> D;
    Admin --> I{Admin Authentication};
    I -- Success --> J[Admin Dashboard];
    I -- Failure --> D;
    J --> K{Delete User};
    K --> H;
```

**Explanation:**

1.  Users and Admins start by authenticating.
2.  Successful authentication leads to their respective dashboards.
3.

From the dashboards, users can manage tasks (add, update, delete), while admins can manage users.
4.  All task and user management operations interact with the backend API.
5.  The backend API returns success or failure responses, which are then reflected in the user interface.

## Future Enhancements

*   **Password Reset:** Implement a password reset functionality to allow users to recover their accounts if they forget their passwords.
*   **Email Verification:** Add email verification during signup to ensure the validity of user email addresses.
*   **Social Login:** Integrate social login options (e.g., Google, Facebook) for a more convenient signup process.
*   **User Roles and Permissions:** Implement different user roles (e.g., admin, moderator, regular user) with varying levels of access and permissions.
*   **Improved Error Handling:** Enhance error handling and provide more informative error messages to users.
*   **UI/UX Improvements:** Continuously improve the user interface and user experience based on user feedback and usability testing.
*   **Testing:** Implement comprehensive unit and integration tests to ensure the reliability and stability of the signup functionality.

## Conclusion

This documentation provides a comprehensive overview of the Recoil atoms used for managing user signup state in a React application. By leveraging Recoil, we can effectively manage and share state across different components, resulting in a more maintainable and scalable application. The provided code examples and explanations should serve as a valuable resource for developers looking to implement similar functionality in their own projects. Remember to adapt the code and configurations to your specific needs and always prioritize security best practices when handling user data. The future enhancements outlined above offer a roadmap for further improving the signup process and overall user experience.

## User Authentication and Todo Management System Documentation

This document provides a comprehensive overview of the user authentication and todo management system, covering its architecture, workflows, usage, and implementation details. This system allows users to sign up, sign in, manage their todos, and allows administrators to manage users.

### 1. System Overview

The system comprises a frontend built with React and a backend built with Node.js, Express, and MongoDB. The frontend provides the user interface for interacting with the system, while the backend handles user authentication, todo management, and data persistence.

**Key Features:**

*   **User Authentication:** Secure signup and sign-in functionality using JWT (JSON Web Tokens).
*   **Todo Management:** Users can create, read, update, and delete todos.
*   **Admin Management:** Administrators can manage users (view and delete).
*   **Input Validation:** Zod middleware for validating user inputs.
*   **Password Hashing:** Bcrypt for securely storing user passwords.

### 2. Technical Architecture

The system follows a layered architecture, with clear separation of concerns between the frontend, backend, and database.

**2.1 Frontend (React)**

The frontend is responsible for rendering the user interface and handling user interactions. It communicates with the backend via API calls.

*   **`frontend/src/pages/user/Dashboard/Components/InputBox.jsx`:** A reusable input component used in the user dashboard.
*   **`frontend/src/pages/signup&signin-comp/InputBox.jsx`:** A reusable input component used in the signup and sign-in pages.

**2.2 Backend (Node.js, Express)**

The backend handles user authentication, todo management, and data persistence. It exposes RESTful APIs for the frontend to consume.

*   **`backend/routes/user.js`:** Defines the user-related routes (signup, signin, get todos, add todo, update todo, delete todo).
*   **`backend/routes/admin.js`:** Defines the admin-related routes (signup, signin, get users, delete user).
*   **`backend/routes/middlewares/zod/inputValidation.js`:** Middleware for validating user inputs using Zod.
*   **`backend/routes/middlewares/usermiddlewares/auth-middleware.js`:** Middleware for authenticating users using JWT.
*   **`backend/routes/middlewares/adminmiddlewares/auth-middleware.js`:** Middleware for authenticating admins using JWT.
*   **`backend/routes/middlewares/usermiddlewares/signin-middleware.js`:** Middleware for handling user sign-in.
*   **`backend/routes/middlewares/adminmiddlewares/signin-middleware.js`:** Middleware for handling admin sign-in.
*   **`backend/routes/middlewares/usermiddlewares/signup-middleware.js`:** Middleware for handling user signup.
*   **`backend/routes/middlewares/adminmiddlewares/signup-middleware.js`:** Middleware for handling admin signup.
*   **`backend/routes/middlewares/usermiddlewares/helperFNs/getTodos.js`:** Helper function to retrieve todos for a specific user.
*   **`backend/routes/middlewares/usermiddlewares/hashfns/hash-password.js`:** Helper function to hash passwords.
*   **`backend/db/db.js`:** Defines the database models (User, Admin, Todos) using Mongoose.

**2.3 Database (MongoDB)**

MongoDB is used to store user accounts, admin accounts, and todos.

### 3. Main Workflows and Data Flows

**3.1 User Signup Workflow**

1.  The user enters their username and password in the signup form on the frontend.
2.  The frontend sends a POST request to the `/signup` endpoint on the backend (`backend/routes/user.js`).
3.  The `validateInputs` middleware (`backend/routes/middlewares/zod/inputValidation.js`) validates the username and password.
4.  The `verifyUserExistence` middleware (`backend/routes/middlewares/usermiddlewares/signup-middleware.js`) checks if the username already exists in the database.
5.  The `generate_hashed_password` function (`backend/routes/middlewares/usermiddlewares/hashfns/hash-password.js`) hashes the password using bcrypt.
6.  A new user document is created in the `User` collection in MongoDB.
7.  The backend sends a success response to the frontend.

```mermaid
sequenceDiagram
    participant Frontend
    participant UserRouter
    participant ValidateInputs
    participant VerifyUserExistence
    participant HashPassword
    participant MongoDB

    Frontend->>UserRouter: POST /signup {username, password}
    UserRouter->>ValidateInputs: validateInputs(username, password)
    ValidateInputs-->>UserRouter: next()
    UserRouter->>VerifyUserExistence: verifyUserExistence(username)
    VerifyUserExistence-->>UserRouter: next()
    UserRouter->>HashPassword: generate_hashed_password(password)
    HashPassword-->>UserRouter: {success, hashed_password}
    UserRouter->>MongoDB: User.create({Username, Password})
    MongoDB-->>UserRouter: User document
    UserRouter-->>Frontend: 201 {msg, success}
```

**3.2 User Signin Workflow**

1.  The user enters their username and password in the sign-in form on the frontend.
2.  The frontend sends a POST request to the `/signin` endpoint on the backend (`backend/routes/user.js`).
3.  The `validateInputs` middleware (`backend/routes/middlewares/zod/inputValidation.js`) validates the username and password.
4.  The `fecthUserDB` middleware (`backend/routes/middlewares/usermiddlewares/signin-middleware.js`) checks if the username and password match a user in the database.
5.  The `generate_JWT_key` function (`backend/routes/middlewares/usermiddlewares/JWT/generate-auth-key.js`) generates a JWT token for the user.
6.  The backend sends the JWT token to the frontend.

```mermaid
sequenceDiagram
    participant Frontend
    participant UserRouter
    participant ValidateInputs
    participant FetchUserDB
    participant GenerateJWT
    participant MongoDB

    Frontend->>UserRouter: POST /signin {username, password}
    UserRouter->>ValidateInputs: validateInputs(username, password)
    ValidateInputs-->>UserRouter: next()
    UserRouter->>FetchUserDB: fecthUserDB(username, password)
    FetchUserDB->>MongoDB: accountExistenceCheck(username, password)
    MongoDB-->>FetchUserDB: isPresent (true/false)
    FetchUserDB-->>UserRouter: next()
    UserRouter->>GenerateJWT: generate_JWT_key(username)
    GenerateJWT-->>UserRouter: auth_token
    UserRouter-->>Frontend: 200 {token}
```

**3.3 Get Todos Workflow**

1.  The frontend sends a GET request to the `/gettodos` endpoint on the backend (`backend/routes/user.js`), including the JWT token in the `Authorization` header.
2.  The `auth_user` middleware (`backend/routes/middlewares/usermiddlewares/auth-middleware.js`) verifies the JWT token.
3.  The `auth_user` middleware extracts the username from the JWT token.
4.  The `current_user` function (`backend/routes/middlewares/usermiddlewares/auth-middleware.js`) retrieves the user's information from the database using the username.
5.  The `getTodos` function (`backend/routes/middlewares/usermiddlewares/helperFNs/getTodos.js`) retrieves the todos for the user from the database.
6.  The backend sends the todos to the frontend.

```mermaid
sequenceDiagram
    participant Frontend
    participant UserRouter
    participant AuthUser
    participant CurrentUser
    participant GetTodos
    participant MongoDB

    Frontend->>UserRouter: GET /gettodos {Authorization: Bearer <token>}
    UserRouter->>AuthUser: auth_user(token)
    AuthUser->>JWT: jwt.verify(token, JWT_KEY)
    JWT-->>AuthUser: username
    AuthUser-->>UserRouter: next()
    UserRouter->>CurrentUser: current_user(username)
    CurrentUser->>MongoDB: User.findOne({Username: username})
    MongoDB-->>CurrentUser: User document
    CurrentUser-->>UserRouter: Current_user
    UserRouter->>GetTodos: getTodos(Current_user._id)
    GetTodos->>MongoDB: Todos.find({userId: Current_user._id})
    MongoDB-->>GetTodos: Todos array
    GetTodos-->>UserRouter: todos
    UserRouter-->>Frontend: 200 {todos}
```

**3.4 Add Todo Workflow**

1. The user enters the title and description of the todo in the user dashboard on the frontend.
2. The frontend sends a POST request to the `/addtodo` endpoint on the backend (`backend/routes/user.js`), including the JWT token in the `Authorization` header and the title and description in the request body.
3. The `auth_user` middleware (`backend/routes/middlewares/usermiddlewares/auth-middleware.js`) verifies the JWT token.
4. The `auth_user` middleware extracts the username from the JWT token.
5. The `current_user` function (`backend/routes/middlewares/usermiddlewares/auth-middleware.js`) retrieves the user's information from the database using the username.
6. A new todo document is created in the `Todos` collection in MongoDB, associated with the user's ID.
7. The backend sends a success response to the frontend.

```mermaid
sequenceDiagram
    participant Frontend
    participant UserRouter
    participant AuthUser
    participant CurrentUser
    participant MongoDB

    Frontend->>UserRouter: POST /addtodo {title, description, Authorization: Bearer <token>}
    UserRouter->>AuthUser: auth_user(token)
    AuthUser->>JWT: jwt.verify(token, JWT_KEY)
    JWT-->>AuthUser: username
    AuthUser-->>UserRouter: next()
    UserRouter->>CurrentUser: current_user(username)
    CurrentUser->>MongoDB: User.findOne({Username: username})
    MongoDB-->>CurrentUser: User document
    CurrentUser-->>UserRouter: Current_user
    UserRouter->>MongoDB: Todos.create({userId: Current_user._id, Title: title, Description: description})
    MongoDB-->>UserRouter: Todo document
    UserRouter-->>Frontend: 201 {msg: "Todo added successfully", success: true}
```

**3.5 Admin Signin Workflow**

1.  The admin enters their username and password in the sign-in form on the frontend.
2.  The frontend sends a POST request to the `/signin` endpoint on the backend (`backend/routes/admin.js`).
3.  The `validateInputs` middleware (`backend/routes/middlewares/zod/inputValidation.js`) validates the username and password.
4.  The `fetchDB` middleware (`backend/routes/middlewares/adminmiddlewares/signin-middleware.js`) checks if the username and password match an admin in the database.
5.  The `generate_JWT_key` function (`backend/routes/middlewares/usermiddlewares/JWT/generate-auth-key.js`) generates a JWT token for the admin.
6.  The backend sends the JWT token to the frontend.

**3.6 Admin Get Users Workflow**

1.  The frontend sends a GET request to the `/getusers` endpoint on the backend (`backend/routes/admin.js`), including the JWT token in the `Authorization` header.
2.  The `auth_admin` middleware (`backend/routes/middlewares/adminmiddlewares/auth-middleware.js`) verifies the JWT token.
3.  The backend retrieves all users from the `User` collection in MongoDB.
4.  The backend sends the users to the frontend.

### 4. Code Examples

**4.1 InputBox Component (frontend/src/pages/user/Dashboard/Components/InputBox.jsx)**

```javascript
export function InputBox({Inputtype,placeholderText,onchangeFn}){
    return(<>
        <input type={Inputtype} placeholder={placeholderText} onChange={onchangeFn} className="m-2 p-2" style={{border : '2px solid black'}}/>
    </>)
}
```

This component is a reusable input field that can be used in various forms. It accepts the following props:

*   `Inputtype`: The type of the input field (e.g., "text", "password", "email").
*   `placeholderText`: The placeholder text for the input field.
*   `onchangeFn`: A function to be called when the input field value changes.

**4.2 validateInputs Middleware (backend/routes/middlewares/zod/inputValidation.js)**

```javascript
const zod = require('zod');

//schemas
const usernameSchema = zod.string().min(8).max(16);
const passwordSchema = zod.string().min(10).max(12);
//error messages
const usernameError = 'Username must contain 8-16 characters'
const passwordError = 'Password must contain 10-12 characters'

const checkInputs = (username,password)=>{
    const usernameCheck = usernameSchema.safeParse(username).success;
    const passwordCheck = passwordSchema.safeParse(password).success;

    if(usernameCheck && passwordCheck)
        return 0;
    else if(usernameCheck && !passwordCheck)
        return 11;
    else if(!usernameCheck && passwordCheck)
        return 21;
    else if(!usernameCheck && !passwordCheck)
        return 2;
}


const getErrorMessage = (validationCode)=>{
    if(validationCode === 11)
        return passwordError
    else if(validationCode === 21)
        return usernameError
    else if(validationCode === 2)
        return usernameError+' and '+passwordError
}

const validateInputs = (req,res,next)=>{
    const {username,password} =  req.body;
    const validationInfo = checkInputs(username,password);
    if(validationInfo == 0){
        next();
    }
    else{
        const errorMessage = getErrorMessage(validationInfo);
        res.json({
            msg : errorMessage,
            success : false
        })
    }
}

module.exports = {
    validateInputs
}
```

This middleware validates the username and password using Zod schemas. It checks if the username is between 8 and 16 characters and if the password is between 10 and 12 characters. If the inputs are invalid, it sends an error response to the client.

**4.3 getTodos Function (backend/routes/middlewares/usermiddlewares/helperFNs/getTodos.js)**

```javascript
const { Todos } = require("../../../../db/db")

const getTodos = async(userID)=>{
    let todos = await Todos.find({
        userId : userID
    })
    return todos;
}

module.exports = {
    getTodos
}
```

This function retrieves all todos for a given user ID from the database.

### 5. Usage Guide

**5.1 User Signup**

1.  Navigate to the signup page on the frontend.
2.  Enter a username and password that meet the validation criteria (8-16 characters for username, 10-12 characters for password).
3.  Click the "Sign Up" button.
4.  If the signup is successful, you will be redirected to the sign-in page.

**5.2 User Signin**

1.  Navigate to the sign-in page on the frontend.
2.  Enter your username and password.
3.  Click the "Sign In" button.
4.  If the sign-in is successful, you will be redirected to the user dashboard.

**5.3 Todo Management**

1.  Once signed in, you can add, view, update, and delete todos in the user dashboard.
2.  To add a todo, enter the title and description in the provided input fields and click the "Add Todo" button.
3.  To view your todos, they will be displayed in a list on the dashboard.
4.  To update a todo, click the "Update" button next to the todo you want to update.
5.  To delete a todo, click the "Delete" button next to the todo you want to delete.

**5.4 Admin Signin**

1.  Navigate to the admin sign-in page on the frontend.
2.  Enter your username and password.
3.  Click the "Sign In" button.
4.  If the sign-in is successful, you will be redirected to the admin dashboard.

**5.5 Admin User Management**

1.  Once signed in as an admin, you can view and delete users in the admin dashboard.
2.  To view all users, they will be displayed in a list on the dashboard.
3.  To delete a user, click the "Delete" button next to the user you want to delete.

### 6. Implementation Details and Gotchas

*   **JWT Security:** Ensure that the `JWT_KEY` is kept secret and is not exposed in the codebase. Use environment variables to store the key.
*   **Password Hashing:** Always use bcrypt or a similar library to hash passwords before storing them in the database. Never store passwords in plain text.
*   **Input Validation:** Implement robust input validation on both the frontend and backend to prevent security vulnerabilities such as SQL injection and cross-site scripting (XSS).
*   **Error Handling:** Implement proper error handling throughout the system to provide informative error messages to the user and to prevent the application from crashing.
*   **Database Security:** Secure your MongoDB database by enabling authentication, restricting access to authorized users, and regularly backing up your data.

### 7. Common Issues and Troubleshooting

*   **Invalid JWT Token:** If you encounter an "Invalid JWT Token" error, ensure that the token is being passed correctly in the `Authorization` header and that the token has not expired.
*   **Incorrect Username or Password:** If you are unable to sign in, double-check that you have entered the correct username and password.
*   **Database Connection Error:** If you encounter a database connection error, ensure that MongoDB is running and that the connection string is correct.
*   **Zod Validation Error:** If you encounter a Zod validation error, check the error message to see which input field is invalid and correct the input accordingly.

### 8. Advanced Configuration and Customization Options

*   **JWT Expiration Time:** You can configure the expiration time of the JWT token by modifying the `expiresIn` option in the `generate_JWT_key` function.
*   **Password Hashing Salt Rounds:** You can configure the number of salt rounds used by bcrypt by modifying the `saltRounds` variable in the `backend/routes/admin.js` file.
*   **Database Connection String:** You can configure the database connection string by setting the `MONGODB_URI` environment variable.
*   **Frontend Styling:** You can customize the frontend styling by modifying the CSS files in the `frontend/src` directory.

### 9. Performance Considerations and Optimization Strategies

*   **Database Queries:** Optimize database queries by using indexes and by retrieving only the necessary data.
*   **Caching:** Implement caching to reduce the number of database queries.
*   **Code Optimization:** Optimize your code by using efficient algorithms and data structures.
*   **Load Balancing:** Use load balancing to distribute traffic across multiple servers.
*   **CDN:** Use a content delivery network (CDN) to serve static assets such as images and CSS files.

### 10. Security Implications and Best Practices

*   **Authentication and Authorization:** Implement robust authentication and authorization mechanisms to protect your application from unauthorized access.
*   **Input Validation:** Implement robust input validation to prevent security vulnerabilities such as SQL injection and XSS.
*   **Data Encryption:** Encrypt sensitive data such as passwords and API keys.
*   **Regular Security Audits:** Conduct regular security audits to identify and address potential security vulnerabilities.
*   **Keep Software Up-to-Date:** Keep your software up-to-date with the latest security patches.
*   **Rate Limiting:** Implement rate limiting to prevent denial-of-service (DoS) attacks.
*   **CORS:** Configure Cross-Origin Resource Sharing (CORS) to prevent unauthorized access from other domains.

## Authentication Middleware Documentation

This document details the authentication middleware used to secure Node.js APIs. The middleware verifies JWT (JSON Web Token) tokens sent in the `Authorization` header of HTTP requests and authorizes access to protected routes. It also provides a mechanism to retrieve the current user based on the username.

### Overview

The authentication middleware consists of two primary functions: `auth_user` and `current_user`.

*   `auth_user`: This middleware function verifies the JWT token present in the `Authorization` header. If the token is valid, the request proceeds to the next middleware or route handler. If the token is invalid or missing, an error response is sent.
*   `current_user`: This asynchronous function retrieves a user object from the database based on the provided username.

### Technical Architecture

The system relies on the following components:

*   **jsonwebtoken (jwt):** A library for creating and verifying JWTs.
*   **JWT_KEY:** A secret key used to sign and verify JWTs. This key should be securely stored and managed.
*   **User model:** A database model representing users. This model is used to retrieve user information from the database.

The `auth-middleware.js` file imports these components and exports the `auth_user` middleware and `current_user` function.

**Component Relationships:**

```mermaid
graph LR
    A[auth-middleware.js] --> B(jsonwebtoken);
    A --> C(JWT_KEY);
    A --> D(User Model);
```

This diagram illustrates that `auth-middleware.js` depends on the `jsonwebtoken` library, the `JWT_KEY` constant, and the `User` model.

### Workflow and Data Flow

The primary workflow involves verifying the JWT token and authorizing access to protected routes.

**Workflow: JWT Authentication**

1.  **Request Received:** An HTTP request is received by the server.
2.  **Authorization Header Extraction:** The `auth_user` middleware extracts the `Authorization` header from the request.
3.  **Token Extraction:** The token is extracted from the `Authorization` header (e.g., `Bearer <token>`).
4.  **Token Verification:** The `jwt.verify()` function is used to verify the token using the `JWT_KEY`.
5.  **Success:** If the token is valid, the `next()` function is called, allowing the request to proceed to the next middleware or route handler.
6.  **Failure:** If the token is invalid or missing, an error response is sent to the client with the message "Auth Failed (Invalid Token)".

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant auth_user Middleware
    participant JWT Library

    Client->>Server: Request to protected route with Authorization header
    Server->>auth_user Middleware: Extract Authorization header
    auth_user Middleware->>JWT Library: Verify token using JWT_KEY
    alt Token Valid
        JWT Library-->>auth_user Middleware: Token is valid
        auth_user Middleware->>Server: next()
        Server->>Server: Process request
        Server-->>Client: Response
    else Token Invalid
        JWT Library-->>auth_user Middleware: Token is invalid
        auth_user Middleware->>Server: Error response
        Server-->>Client: { msg: 'Auth Failed (Invalid Token)' }
    end
```

This sequence diagram illustrates the flow of the JWT authentication process.

**Workflow: Retrieving Current User**

1.  **Username Provided:** A username is provided as input to the `current_user` function.
2.  **Database Query:** The `User.findOne()` method is used to query the database for a user with the specified username.
3.  **User Retrieval:** If a user is found, the user object is returned. Otherwise, `null` is returned.

```mermaid
sequenceDiagram
    participant Application
    participant current_user Function
    participant Database

    Application->>current_user Function: Call current_user(username)
    current_user Function->>Database: User.findOne({ Username: username })
    alt User Found
        Database-->>current_user Function: User object
        current_user Function-->>Application: User object
    else User Not Found
        Database-->>current_user Function: null
        current_user Function-->>Application: null
    end
```

This sequence diagram illustrates the process of retrieving the current user from the database.

### Code Examples

**Example: `auth_user` Middleware**

```javascript
const jwt  = require('jsonwebtoken');
const {JWT_KEY} = require('./JWT/generate-auth-key');
const { User } = require('../../../db/db');

const auth_user = (req,res,next)=>{
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];  // removing the Bearer

    try{
        jwt.verify(token,JWT_KEY);
        next();
    }
    catch(e){
        res.json({
            msg : 'Auth Failed (Invalid Token)'
        })
    }
}
```

This code snippet shows the implementation of the `auth_user` middleware. It extracts the token from the `Authorization` header, verifies it using `jwt.verify()`, and calls `next()` if the token is valid. If the token is invalid, it sends an error response.

**Example: `current_user` Function**

```javascript
const { User } = require('../../../db/db');

const current_user = async(username)=>{
    const current_user = await User.findOne({
        Username : username
    })
    return current_user;
}
```

This code snippet shows the implementation of the `current_user` function. It queries the database for a user with the specified username using `User.findOne()` and returns the user object.

### Usage Guide

**Using `auth_user` Middleware:**

To protect a route with the `auth_user` middleware, simply include it in the route definition:

```javascript
const express = require('express');
const router = express.Router();
const { auth_user } = require('./middlewares/usermiddlewares/auth-middleware');

router.get('/protected', auth_user, (req, res) => {
  res.json({ msg: 'Access granted' });
});

module.exports = router;
```

In this example, the `/protected` route is protected by the `auth_user` middleware. Only requests with a valid JWT token in the `Authorization` header will be able to access this route.

**Using `current_user` Function:**

To retrieve the current user based on the username, call the `current_user` function:

```javascript
const { current_user } = require('./middlewares/usermiddlewares/auth-middleware');

async function getUserData(username) {
  const user = await current_user(username);
  if (user) {
    console.log('User data:', user);
  } else {
    console.log('User not found');
  }
}

getUserData('testuser');
```

This example demonstrates how to use the `current_user` function to retrieve user data from the database.

### Implementation Details and Gotchas

*   **JWT_KEY Security:** The `JWT_KEY` is a critical security component. It should be stored securely and never exposed in the code or configuration files. Consider using environment variables or a dedicated secrets management system.
*   **Token Expiration:** JWT tokens should have an expiration time to limit the window of opportunity for attackers to use compromised tokens.
*   **Error Handling:** The `auth_user` middleware should handle errors gracefully and provide informative error messages to the client.
*   **Database Connection:** Ensure that the database connection is properly configured and that the `User` model is correctly defined.

### Common Issues and Troubleshooting

*   **Invalid Token:** If the client receives an "Auth Failed (Invalid Token)" error, it indicates that the JWT token is invalid or has expired. Verify that the token is correctly generated and that the `JWT_KEY` is consistent between the authentication server and the API server.
*   **Missing Authorization Header:** If the `Authorization` header is missing from the request, the `auth_user` middleware will not be able to extract the token. Ensure that the client is sending the `Authorization` header with the correct format (e.g., `Bearer <token>`).
*   **Database Connection Errors:** If the `current_user` function fails to retrieve the user data, it may be due to a database connection error. Verify that the database server is running and that the connection parameters are correct.

### Advanced Configuration and Customization Options

*   **Custom Token Verification:** The `jwt.verify()` function can be customized with additional options, such as specifying the allowed algorithms or audience.
*   **Custom Error Handling:** The `auth_user` middleware can be modified to provide custom error responses or logging.
*   **Role-Based Access Control (RBAC):** The `auth_user` middleware can be extended to implement RBAC by verifying the user's roles or permissions in addition to the token validity.

### Performance Considerations and Optimization Strategies

*   **Caching:** The `current_user` function can be optimized by caching the user data in memory or in a distributed cache.
*   **Database Indexing:** Ensure that the `Username` field in the `User` model is indexed to improve the performance of the `User.findOne()` query.
*   **Token Size:** Keep the JWT token size as small as possible to reduce the overhead of transmitting the token in the `Authorization` header.

### Security Implications and Best Practices

*   **JWT_KEY Management:** As mentioned earlier, the `JWT_KEY` is a critical security component and should be managed securely.
*   **Token Storage:** Avoid storing JWT tokens in local storage or cookies, as these are vulnerable to cross-site scripting (XSS) attacks. Consider using HTTP-only cookies or a more secure storage mechanism.
*   **Input Validation:** Validate all user inputs to prevent injection attacks.
*   **Regular Security Audits:** Conduct regular security audits to identify and address potential vulnerabilities.

## Taskmaster Database Layer: Mongoose Models and Connection

This document details the database layer of the Taskmaster application, focusing on the Mongoose models and connection setup defined in `backend/db/db.js`. This layer is responsible for interacting with the MongoDB database, defining the structure of the data, and providing an interface for data access and manipulation.

### Overview

The `db.js` file establishes a connection to a MongoDB Atlas cluster and defines three Mongoose schemas: `userSchema`, `adminSchema`, and `todosSchema`. These schemas represent the structure of the User, Admin, and Todo documents stored in the database. Mongoose models are then created based on these schemas, providing a convenient way to interact with the corresponding collections.

### Technical Architecture

The database layer consists of the following key components:

1.  **Mongoose Connection:** Establishes a connection to the MongoDB Atlas cluster using the provided connection string.
2.  **User Schema (`userSchema`):** Defines the structure of User documents, including `Username` and `Password` fields.
3.  **Admin Schema (`adminSchema`):** Defines the structure of Admin documents, including `Username` and `Password` fields.
4.  **Todos Schema (`todosSchema`):** Defines the structure of Todo documents, including `userId` (referencing a User document) and other task-related fields (not fully shown in the provided code snippet).
5.  **Mongoose Models (`User`, `Admin`, `Todos`):** Created from the schemas, providing an interface for performing CRUD (Create, Read, Update, Delete) operations on the corresponding collections.

### Data Flow

The data flow within the database layer can be summarized as follows:

1.  The application initiates a database connection using `mongoose.connect()`.
2.  Data is validated against the defined schemas (`userSchema`, `adminSchema`, `todosSchema`) before being written to the database.
3.  Mongoose models (`User`, `Admin`, `Todos`) are used to perform CRUD operations on the database.
4.  Data is retrieved from the database using the Mongoose models and passed back to the application.

### Workflow Analysis

#### Database Connection Workflow

This workflow describes the process of connecting to the MongoDB database using Mongoose.

```mermaid
sequenceDiagram
    participant App
    participant db.js
    participant Mongoose
    participant MongoDB Atlas

    App->>db.js: Import db.js
    db.js->>Mongoose: require('mongoose')
    db.js->>Mongoose: mongoose.connect(connectionString)
    activate Mongoose
    Mongoose->>MongoDB Atlas: Establish Connection
    activate MongoDB Atlas
    MongoDB Atlas-->>Mongoose: Connection Established
    deactivate MongoDB Atlas
    Mongoose-->>db.js: Connection Object
    deactivate Mongoose
    db.js-->>App: Export Models (User, Admin, Todos)
```

**Explanation:**

1.  The application imports the `db.js` file.
2.  `db.js` requires the Mongoose library.
3.  `db.js` calls `mongoose.connect()` with the MongoDB Atlas connection string.
4.  Mongoose attempts to establish a connection with the MongoDB Atlas cluster.
5.  MongoDB Atlas either establishes the connection or returns an error.
6.  Mongoose returns a connection object to `db.js`.
7.  `db.js` exports the Mongoose models (User, Admin, Todos) for use in the application.

### Code Examples

#### Connecting to the Database

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srecharandesu:charan%402006@cluster0.a9berin.mongodb.net/taskmaster');
```

This code snippet demonstrates how to establish a connection to the MongoDB Atlas cluster using the provided connection string.  It's crucial that the connection string is properly configured with the correct username, password, and database name.

#### Defining a Schema

```javascript
const userSchema = new mongoose.Schema({
    Username : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
})
```

This code defines the `userSchema`, which specifies the structure of User documents. It includes the `Username` and `Password` fields, both of which are defined as strings and are required.

#### Creating a Model

```javascript
const User = new mongoose.model('User',userSchema);
```

This code creates a Mongoose model named `User` based on the `userSchema`. This model can then be used to perform CRUD operations on the `User` collection in the database.

### Usage Guide

To use the database layer in your application, you need to:

1.  **Import the `db.js` file:** This will establish the database connection and export the Mongoose models.

    ```javascript
    const db = require('./db/db');
    const User = db.User;
    const Admin = db.Admin;
    const Todos = db.Todos;
    ```

2.  **Use the Mongoose models to perform CRUD operations:**

    ```javascript
    // Create a new user
    const newUser = new User({
        Username: 'testuser',
        Password: 'password123'
    });

    newUser.save()
        .then(() => console.log('User created'))
        .catch(err => console.error(err));

    // Find a user by username
    User.findOne({ Username: 'testuser' })
        .then(user => console.log(user))
        .catch(err => console.error(err));
    ```

### Implementation Details and Gotchas

*   **Connection String Security:** The connection string should be stored securely and not exposed in the codebase. Environment variables are recommended for storing sensitive information.
*   **Schema Validation:** Mongoose automatically validates data against the defined schemas before writing to the database. Ensure that your schemas accurately reflect the structure of your data.
*   **Error Handling:** Proper error handling is crucial when interacting with the database. Use `try...catch` blocks or `.catch()` methods to handle potential errors.
*   **Asynchronous Operations:** Mongoose operations are asynchronous. Use Promises or `async/await` to handle asynchronous operations correctly.

### Common Issues and Troubleshooting

*   **Connection Errors:** Verify the connection string and ensure that the MongoDB Atlas cluster is accessible from your application. Check firewall rules and network configurations.
*   **Schema Validation Errors:** Ensure that the data you are trying to write to the database conforms to the defined schemas. Check the error messages for details on the validation failures.
*   **Mongoose Version Compatibility:** Ensure that the version of Mongoose you are using is compatible with your version of MongoDB.

### Advanced Configuration and Customization Options

*   **Mongoose Options:** Mongoose provides various options for configuring the connection, schemas, and models. Refer to the Mongoose documentation for a complete list of options.
*   **Middleware:** Mongoose middleware allows you to execute custom logic before or after certain operations, such as saving or deleting documents.
*   **Plugins:** Mongoose plugins provide reusable functionality that can be added to your schemas and models.

### Performance Considerations and Optimization Strategies

*   **Indexing:** Create indexes on frequently queried fields to improve query performance.
*   **Query Optimization:** Use efficient queries to retrieve only the necessary data. Avoid using `*` in your queries.
*   **Connection Pooling:** Mongoose automatically manages connection pooling. Ensure that the connection pool size is appropriate for your application's workload.

### Security Implications and Best Practices

*   **Data Validation:** Validate all user input to prevent injection attacks.
*   **Authentication and Authorization:** Implement proper authentication and authorization mechanisms to protect your data.
*   **Data Encryption:** Encrypt sensitive data at rest and in transit.
*   **Regular Security Audits:** Conduct regular security audits to identify and address potential vulnerabilities.

### Component Relationships

The `db.js` file is a foundational component that other parts of the backend rely on. Specifically, any module that needs to interact with the database will import the models exported by `db.js`.

```mermaid
graph TD
    A[backend/routes/user.js] --> B(backend/db/db.js);
    C[backend/routes/admin.js] --> B;
    D[backend/routes/todos.js] --> B;
    B --> E[Mongoose Library];
    E --> F[MongoDB Atlas];
    style B fill:#f9f,stroke:#333,stroke-width:2px
```

**Explanation:**

*   `backend/routes/user.js`, `backend/routes/admin.js`, and `backend/routes/todos.js` all import `backend/db/db.js` to access the Mongoose models.
*   `backend/db/db.js` depends on the `Mongoose Library` to interact with MongoDB.
*   The `Mongoose Library` connects to the `MongoDB Atlas` database.

### State Management

The `db.js` file itself doesn't manage application state directly. However, it defines the structure of the data stored in the database, which represents the persistent state of the application. Changes to the database through the Mongoose models will affect the application's state.

### Error Propagation

Errors that occur during database operations (e.g., connection errors, validation errors) are typically propagated back to the calling code through Promises or `async/await`. It's important to handle these errors appropriately to prevent application crashes and provide informative error messages to the user.

### Connection Examples

#### Example: Creating a new Todo item

```javascript
// Assuming you have the userId of the user creating the todo
const newTodo = new Todos({
    userId: userId, // Replace with the actual user ID
    title: 'Grocery Shopping',
    description: 'Buy milk, eggs, and bread',
    completed: false
});

newTodo.save()
    .then(savedTodo => {
        console.log('Todo saved:', savedTodo);
    })
    .catch(err => {
        console.error('Error saving todo:', err);
    });
```

This example demonstrates how to create a new Todo item using the `Todos` model. It sets the `userId`, `title`, `description`, and `completed` fields and then saves the document to the database.

### Workflow Visualization

#### Todo Creation Workflow

This workflow illustrates the process of creating a new Todo item and saving it to the database.

```mermaid
sequenceDiagram
    participant User Interface
    participant Backend Route
    participant Todos Model
    participant MongoDB Atlas

    User Interface->>Backend Route: Create Todo Request
    Backend Route->>Todos Model: Create new Todos instance
    activate Todos Model
    Todos Model->>Todos Model: Validate data against schema
    alt Validation Success
        Todos Model->>MongoDB Atlas: Save Todo to database
        activate MongoDB Atlas
        MongoDB Atlas-->>Todos Model: Confirmation
        deactivate MongoDB Atlas
        Todos Model-->>Backend Route: Success Response
    else Validation Failure
        Todos Model-->>Backend Route: Error Response
    end
    deactivate Todos Model
    Backend Route->>User Interface: Response (Success or Error)
```

**Explanation:**

1.  The user interface sends a request to the backend to create a new Todo item.
2.  The backend route receives the request and creates a new instance of the `Todos` model.
3.  The `Todos` model validates the data against the `todosSchema`.
4.  If the validation is successful, the `Todos` model saves the Todo item to the MongoDB Atlas database.
5.  MongoDB Atlas confirms the save operation.
6.  The `Todos` model sends a success response back to the backend route.
7.  If the validation fails, the `Todos` model sends an error response back to the backend route.
8.  The backend route sends a response (success or error) back to the user interface.
