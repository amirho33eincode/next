// Initialize Supabase
// const { createClient } = supabase;
// const supabaseUrl = 'https://vjxrqmrnsxlspnujgbbr.supabase.co'; // Replace with your Supabase URL
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeHJxbXJuc3hsc3BudWpnYmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTk5OTgsImV4cCI6MjA2MDI3NTk5OH0.44lVu8fLSFtGnCTeOc0X9zZEXql2xQPfry4tsheD9QU'; // Replace with your Supabase anon key
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to handle user sign up
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
          email,
          password,
      });

      if (error) {
          alert('Sign Up Error: ' + error.message);
          console.error('Sign Up Error:', error.message);
      } else {
          alert('Sign Up Successful! Check your email for verification.');
          console.log('User signed up:', user);
          
          // Navigate to another page after sign up
          window.location.href = 'index.html'; // Change 'welcome.html' to your target page
      }
}



// Function to handle user login
async function logIn(email, password) {
    const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
    });

    if (error) {
        alert('Login Error: ' + error.message);
        console.error('Login Error:', error.message);
    } else {
        alert('Login Successful!');
        console.log('User logged in:', user);
        // You can redirect the user or load user-specific data here
    }
}

// Function to handle form submissions
document.querySelector('.form__content').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const nameInput = document.querySelector('.form__input[type="text"]');
    const emailInput = document.querySelector('.form__input[type="email"]');
    const passwordInput = prompt('Please enter your password:'); // Prompts for the password

    if (this.querySelector('input[type="submit"]').value === 'Sign Up') {
        signUp(emailInput.value, passwordInput);
    } else {
        logIn(emailInput.value, passwordInput);
    }
});
