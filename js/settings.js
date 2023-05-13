const darkModeCheckbox = document.querySelector("#dark-mode-checkbox");
const compactModeCheckbox = document.querySelector("#compact-mode-checkbox");
const emailNotificationsCheckbox = document.querySelector(
  "#email-notifications-checkbox"
);
const pushNotificationsCheckbox = document.querySelector(
  "#push-notifications-checkbox"
);
const saveSettingsButton = document.querySelector("#save-settings-button");

// Load saved settings from localStorage
const savedSettings = JSON.parse(localStorage.getItem("settings"));

if (savedSettings) {
  darkModeCheckbox.checked = savedSettings.darkMode;
  compactModeCheckbox.checked = savedSettings.compactMode;
  emailNotificationsCheckbox.checked = savedSettings.emailNotifications;
  pushNotificationsCheckbox.checked = savedSettings.pushNotifications;
}

saveSettingsButton.addEventListener("click", () => {
  // Save settings to localStorage
  // Save settings to localStorage
  const settings = {
    darkMode: darkModeCheckbox.checked,
    compactMode: compactModeCheckbox.checked,
    emailNotifications: emailNotificationsCheckbox.checked,
    pushNotifications: pushNotificationsCheckbox.checked,
  };

  localStorage.setItem("settings", JSON.stringify(settings));

  alert("Settings saved successfully!");
});
