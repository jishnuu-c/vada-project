/**
 * MANI VADA - SHOP CONFIGURATION
 * 
 * Edit this central file to update your shop's address, opening hours,
 * phone number, WhatsApp, and Google Maps location.
 * 
 * NOTE: If any field is left empty (""), the website will gracefully
 * hide that information or button until you configure it.
 */

export const shopConfig = {
  // Brand name
  brandNameMalayalam: "മണിവട",
  brandNameTamil: "மணி வடை",
  tagline: "ചൂട് ചൂട് വടേ",
  taglineTranslation: "Piping Hot Vada & Authentic South Indian Tea",

  // Shop Physical Address (Leave empty "" if not yet set)
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "Kerala",
    pincode: "",
    landmark: ""
  },

  // Contact Phone Number (Leave empty "" if not yet set)
  // Example: "+91 98765 43210"
  phone: "",

  // WhatsApp Number for click-to-chat (Leave empty "" if not yet set)
  // Enter digits with country code, e.g. "919876543210"
  whatsapp: "",

  // Google Maps Location URL / Directions link (Leave empty "" if not yet set)
  // Example: "https://maps.google.com/?q=..."
  googleMapsUrl: "",

  // Opening Hours
  // Leave empty "" if not yet configured
  openingHours: {
    daysMalayalam: "എല്ലാ ദിവസവും",
    daysEnglish: "All Days",
    timingMalayalam: "രാവിലെ 6:00 മുതൽ രാത്രി 9:30 വരെ",
    timingEnglish: "6:00 AM - 9:30 PM",
    isConfigured: true // Set to false if you wish to hide opening hours
  },

  // Social Media Links (Leave empty "" if not yet set)
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: ""
  }
};
