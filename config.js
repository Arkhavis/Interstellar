const config = {
  challenge: true, // Set to true if you want to enable password protection.
  users: {}, // This will be dynamically populated from Pastebin.

  async loadKeysFromPastebin(pastebinUrl) {
    try {
      const response = await fetch(pastebinUrl);
      if (!response.ok) throw new Error("Failed to fetch keys from Pastebin.");
      
      const data = await response.text();
      // Assuming the Pastebin data is in the format:
      // username:password\nusername:password\n...
      const lines = data.split("\n");
      lines.forEach(line => {
        const [username, password] = line.split(":");
        if (username && password) {
          this.users[username.trim()] = password.trim();
        }
      });
      console.log("Keys loaded successfully:", this.users);
    } catch (error) {
      console.error("Error loading keys from Pastebin:", error);
    }
  },
};

// Usage Example:
// Replace 'PASTEBIN_RAW_URL' with your Pastebin raw URL.
const pastebinUrl = "https://pastebin.com/raw/yCVWfvqy";
config.loadKeysFromPastebin(pastebinUrl);

export default config;
