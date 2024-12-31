import axios from 'axios'; // For making HTTP requests

const config = {
  challenge: true, // Enable password protection if true
  users: {}, // Will be populated dynamically
};

// Function to fetch keys from Pastebin
async function fetchKeys() {
  try {
    const pastebinURL = "https://pastebin.com/raw/yCVWfvqy"; // Use the raw Pastebin URL
    const response = await axios.get(pastebinURL);

    // Assuming keys are in JSON format in Pastebin
    config.users = response.data;
    console.log("Keys successfully loaded:", config.users);
  } catch (error) {
    console.error("Error fetching keys:", error);
  }
}

// Validate a user's key
function validateKey(username, key) {
  return config.users[username] === key;
}

// Example usage
(async () => {
  await fetchKeys();

  const username = "Cylis";
  const key = "Cylis164341";

  if (validateKey(username, key)) {
    console.log("Access granted.");
  } else {
    console.log("Access denied.");
  }
})();

export default config;
