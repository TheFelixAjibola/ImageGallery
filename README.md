To run the Image Gallery project locally, you'll need to follow these steps:

**Step 1: Set Up Firebase Project**

1. Go to the Firebase Console (https://console.firebase.google.com/).
2. Click on "Add project" and follow the prompts to create a new Firebase project.
3. Once the project is created, go to the project settings.
4. Under the "General" tab, scroll down to the "Your apps" section and click on the web app icon (</>).
5. Register your app by providing a nickname and enabling Firebase Hosting. Follow the setup instructions to add Firebase to your web app.

**Step 2: Clone the Repository**

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the Image Gallery project.
3. Run the following command to clone the repository:
   ```
   git clone https://github.com/thefelixajibola/image-gallery.git
   ```

**Step 3: Set Up Firebase Configuration**

1. Go to the Firebase Console and select your project.
2. In the project settings, scroll down to the "Firebase SDK snippet" section.
3. Select the "Config" radio button.
4. Copy the configuration object (a JavaScript object with keys like `apiKey`, `authDomain`, etc.).

**Step 4: Configure Firebase in the Project**

1. Navigate to the project directory (the one you cloned in Step 2).
2. Locate the `src` folder and open the `firebase.js` file.
3. Replace the placeholder Firebase configuration with the one you copied from the Firebase Console.

**Step 5: Install Dependencies**

1. Open your terminal or command prompt.
2. Navigate to the project directory (the root of the cloned repository).
3. Run the following command to install project dependencies:
   ```
   npm install
   ```

**Step 6: Run the Application**

1. After the dependencies are installed, run the following command to start the development server:
   ```
   npm run start
   ```

**Step 7: Access the Application**

1. Once the development server is running, open your web browser.
2. Access the Image Gallery application by going to http://localhost:3000/ in your browser.

**Step 8: Authentication**

1. You can sign in or sign up using the provided authentication methods. If you're running this locally, it may use Firebase Authentication for email/password or other methods you configured.

**Step 9: Upload and View Images**

1. Use the "Image Upload" section to upload images.
2. The uploaded images will be displayed in the gallery, and you can interact with them, including dragging and dropping to reorder.

That's it! You should now have the Image Gallery project running locally on your machine. You can explore the features.

**Step 7: Login Details**

1. Email: `user@example.com`
2. Password `1Password`

Regards,
FELIX AJIBOLA

