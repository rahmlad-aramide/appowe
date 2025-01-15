import {Alert, Share} from 'react-native';
import {HUGGINGFACE_API_KEY} from '@env';

export const shareProverb = async (proverb) => {
  const shareMessage = `
    Hey! I came across this insightful Yoruba proverb on AppOwe and I thought of sharing with you. 
    
    Proverb: "${proverb.proverb}"
    Meaning: ${proverb.meaning}
    English Equivalent: ${proverb.englishEquivalent}
    
    Want to contribute or suggest more proverbs? Reach out to Abdrahman Oladimeji (Rahmlad) on WhatsApp via: https://wa.me/2349023600083?text=Hi%20Rahmlad.%0AI%20am%20interested%20in%20contributing%20to%20the%20AppOwe%20proverbs%20catalog!
    `;
    // It's really handy for understanding cultural wisdom, which could be great for your studies and personal growth.
    // Curious for more? Check out AppOwe for daily proverbs that inspire and educate. 
    //  Get it here: [App Store/Google Play Store link]

  try {
     await Share.share({
      message: shareMessage,
      title: "A Proverb for Thought from AppOwe",
      subject: "A Proverb for Thought from AppOwe",
      url: 'https://res.cloudinary.com/djlvrslgc/image/upload/v1712930871/AppOwe/AppOwe_Splash_screen_ewi7fn.png',
    });
  } catch (error) {
    console.error('Share error:', error.message);
    Alert.alert("An error occured", error.message);
  }
};
// To be switched to .env variables

const apiKey = __DEV__ ? HUGGINGFACE_API_KEY : process.env.HUGGINGFACE_API_KEY;
const TRANSLATION_API_URL= "https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt"

export const translateText = async (text, targetLang) => {
  try {
    const apiResponse = await fetch(
      `${TRANSLATION_API_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: { src_lang: 'en_XX', tgt_lang: targetLang },
        }),
      }
    );

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.json().catch(() => ({
        message: "An error has occured. Please try again."
      }));
      return { error: errorBody.message || "Translation service is currently unavailable. Please try again later." };
    }

    const data = await apiResponse.json();
    if (!data || !data[0] || !data[0].translation_text) {
      return { error: "Received invalid data from translation service." };
    }

    return { result: data[0].translation_text };
  } catch (error) {
    console.error("Error during translation:", error);
    return { error: "An unexpected error occurred while translating. Please check your network connection." };
  }
};


function constructErrorMessage(response, errorBody) {
  // Function to handle different error scenarios based on the API's response status
  switch (response.status) {
    case 503:
      return "Service temporarily unavailable, please try again later.";
    case 400:
      return "Bad request to the server: " + (errorBody.message || "Check your request payload.");
    case 401:
      return "Unauthorized: Please check your API credentials.";
    case 404:
      return "Resource not found: Check the API URL.";
    default:
      return errorBody.message || "An unknown error occurred.";
  }
}


export const extractTranslatedParts = (translatedText, delimiter = " ||| ") => {

  const parts = translatedText?.split(delimiter);
  return {
      meaning: parts[0],
      englishEquivalent: parts[1],
      details: parts[2]
  };
}

export const truncateString = (str, maxLength=50) => {
  if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
  }
  return str;
}

export const handleSelectProverb = (navigation, proverb) => {
  navigation.navigate("ProverbDetails", { proverbId: proverb.id });
};

export const headingTranslations = {
  fr_XX: {
      translation: "Traduction",
      meaning: "Sens",
      englishEquivalent: "French",
      details: "Détails"
  },
  es_XX: {
      translation: "Traducción",
      meaning: "Significado",
      englishEquivalent: "Spanish",
      details: "Detalles"
  },
  de_DE: {
      translation: "Übersetzung",
      meaning: "Bedeutung",
      englishEquivalent: "German",
      details: "Details"
  },
  pt_XX: {
      translation: "Tradução",
      meaning: "Significado",
      englishEquivalent: "Portuguese",
      details: "Detalhes"
  }
};
