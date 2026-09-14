import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState("en");

    const translations = {

        // ================= ENGLISH =================
        en: {
            home: "Home",
            disease: "Disease",
            assistant: "AI Assistant",
            marketplace: "Marketplace",
            cart: "Cart",
            logout: "Logout",

            welcome: "Welcome",
            dashboard: "AQUA-SENSE DASHBOARD",

            monitorAquarium:
                "Monitor your aquarium and keep your fish healthy.",

            currentTankStatus:
                "CURRENT TANK STATUS",

            aquariumHealthy:
                "Your aquarium is healthy",

            everythingGood:
                "Everything looks good right now.",

            fishHealth: "Fish Health",
            waterQuality: "Water Quality",
            temperature: "Temperature",
            phLevel: "pH Level",

            diseaseDetection: "Disease Detection",
            uploadImage: "Upload Image",
            analyze: "Analyze",
            healthy: "Healthy",
            diseased: "Diseased",

            aquasenseTools: "AQUASENSE TOOLS",
            exploreAquasense: "Explore Aqua-Sense",

            tankAnalysis: "Tank Analysis",
            tankAnalysisDescription:
                "Check your aquarium's current health and water conditions.",

            diseaseDetectionDescription:
                "Upload a fish image and check for possible diseases.",

            aiAssistant: "AI Assistant",
            aiAssistantDescription:
                "Get helpful guidance for your aquarium.",

            marketplaceDescription:
                "Find products for fish health and aquarium care.",

            askAssistant: "Ask Aqua-Sense AI",
            typeMessage: "Type your message...",
            send: "Send",
            listening: "Listening...",

            products: "Products",
            addToCart: "Add to Cart",
            viewCart: "View Cart",

            profile: "Profile",
            settings: "Settings"
        },


        // ================= HINDI =================
        hi: {
            home: "होम",
            disease: "रोग पहचान",
            assistant: "AI सहायक",
            marketplace: "बाज़ार",
            cart: "कार्ट",
            logout: "लॉग आउट",

            welcome: "स्वागत है",
            dashboard: "AQUA-SENSE डैशबोर्ड",

            monitorAquarium:
                "अपने एक्वेरियम की निगरानी करें और अपनी मछलियों को स्वस्थ रखें।",

            currentTankStatus:
                "वर्तमान टैंक स्थिति",

            aquariumHealthy:
                "आपका एक्वेरियम स्वस्थ है",

            everythingGood:
                "अभी सब कुछ ठीक दिख रहा है।",

            fishHealth: "मछली का स्वास्थ्य",
            waterQuality: "पानी की गुणवत्ता",
            temperature: "तापमान",
            phLevel: "pH स्तर",

            diseaseDetection: "रोग पहचान",
            uploadImage: "छवि अपलोड करें",
            analyze: "विश्लेषण करें",
            healthy: "स्वस्थ",
            diseased: "रोगग्रस्त",

            aquasenseTools: "AQUASENSE टूल्स",
            exploreAquasense: "Aqua-Sense को एक्सप्लोर करें",

            tankAnalysis: "टैंक विश्लेषण",
            tankAnalysisDescription:
                "अपने एक्वेरियम के वर्तमान स्वास्थ्य और पानी की स्थिति की जाँच करें।",

            diseaseDetectionDescription:
                "मछली की तस्वीर अपलोड करें और संभावित रोगों की जाँच करें।",

            aiAssistant: "AI सहायक",
            aiAssistantDescription:
                "अपने एक्वेरियम के लिए उपयोगी मार्गदर्शन प्राप्त करें।",

            marketplaceDescription:
                "मछली के स्वास्थ्य और एक्वेरियम की देखभाल के लिए उत्पाद खोजें।",

            askAssistant: "Aqua-Sense AI से पूछें",
            typeMessage: "अपना संदेश लिखें...",
            send: "भेजें",
            listening: "सुन रहा है...",

            products: "उत्पाद",
            addToCart: "कार्ट में जोड़ें",
            viewCart: "कार्ट देखें",

            profile: "प्रोफ़ाइल",
            settings: "सेटिंग्स"
        },


        // ================= BENGALI =================
        bn: {
            home: "হোম",
            disease: "রোগ শনাক্তকরণ",
            assistant: "AI সহায়ক",
            marketplace: "বাজার",
            cart: "কার্ট",
            logout: "লগ আউট",

            welcome: "স্বাগতম",
            dashboard: "AQUA-SENSE ড্যাশবোর্ড",

            monitorAquarium:
                "আপনার অ্যাকোয়ারিয়াম পর্যবেক্ষণ করুন এবং মাছকে সুস্থ রাখুন।",

            currentTankStatus:
                "বর্তমান ট্যাঙ্কের অবস্থা",

            aquariumHealthy:
                "আপনার অ্যাকোয়ারিয়াম সুস্থ",

            everythingGood:
                "এই মুহূর্তে সবকিছু ঠিকঠাক দেখাচ্ছে।",

            fishHealth: "মাছের স্বাস্থ্য",
            waterQuality: "জলের গুণমান",
            temperature: "তাপমাত্রা",
            phLevel: "pH স্তর",

            diseaseDetection: "রোগ শনাক্তকরণ",
            uploadImage: "ছবি আপলোড করুন",
            analyze: "বিশ্লেষণ করুন",
            healthy: "সুস্থ",
            diseased: "অসুস্থ",

            aquasenseTools: "AQUASENSE টুলস",
            exploreAquasense: "Aqua-Sense অন্বেষণ করুন",

            tankAnalysis: "ট্যাঙ্ক বিশ্লেষণ",
            tankAnalysisDescription:
                "আপনার অ্যাকোয়ারিয়ামের বর্তমান স্বাস্থ্য এবং জলের অবস্থা পরীক্ষা করুন।",

            diseaseDetectionDescription:
                "একটি মাছের ছবি আপলোড করুন এবং সম্ভাব্য রোগ পরীক্ষা করুন।",

            aiAssistant: "AI সহায়ক",
            aiAssistantDescription:
                "আপনার অ্যাকোয়ারিয়ামের জন্য সহায়ক নির্দেশনা পান।",

            marketplaceDescription:
                "মাছের স্বাস্থ্য এবং অ্যাকোয়ারিয়াম যত্নের জন্য পণ্য খুঁজুন।",

            askAssistant: "Aqua-Sense AI-কে জিজ্ঞাসা করুন",
            typeMessage: "আপনার বার্তা লিখুন...",
            send: "পাঠান",
            listening: "শুনছি...",

            products: "পণ্য",
            addToCart: "কার্টে যোগ করুন",
            viewCart: "কার্ট দেখুন",

            profile: "প্রোফাইল",
            settings: "সেটিংস"
        },


        // ================= TAMIL =================
        ta: {
            home: "முகப்பு",
            disease: "நோய் கண்டறிதல்",
            assistant: "AI உதவியாளர்",
            marketplace: "சந்தை",
            cart: "வண்டி",
            logout: "வெளியேறு",

            welcome: "வரவேற்கிறோம்",
            dashboard: "AQUA-SENSE டாஷ்போர்டு",

            monitorAquarium:
                "உங்கள் மீன் தொட்டியை கண்காணித்து, உங்கள் மீன்களை ஆரோக்கியமாக வைத்திருங்கள்.",

            currentTankStatus:
                "தற்போதைய தொட்டி நிலை",

            aquariumHealthy:
                "உங்கள் மீன் தொட்டி ஆரோக்கியமாக உள்ளது",

            everythingGood:
                "இப்போது அனைத்தும் நன்றாக உள்ளது.",

            fishHealth: "மீன் ஆரோக்கியம்",
            waterQuality: "நீர் தரம்",
            temperature: "வெப்பநிலை",
            phLevel: "pH அளவு",

            diseaseDetection: "நோய் கண்டறிதல்",
            uploadImage: "படத்தை பதிவேற்றவும்",
            analyze: "பகுப்பாய்வு செய்யவும்",
            healthy: "ஆரோக்கியமான",
            diseased: "நோயுற்ற",

            aquasenseTools: "AQUASENSE கருவிகள்",
            exploreAquasense: "Aqua-Sense ஐ ஆராயுங்கள்",

            tankAnalysis: "தொட்டி பகுப்பாய்வு",
            tankAnalysisDescription:
                "உங்கள் மீன் தொட்டியின் தற்போதைய ஆரோக்கியம் மற்றும் நீர் நிலையை சரிபார்க்கவும்.",

            diseaseDetectionDescription:
                "மீனின் படத்தை பதிவேற்றி, சாத்தியமான நோய்களை சரிபார்க்கவும்.",

            aiAssistant: "AI உதவியாளர்",
            aiAssistantDescription:
                "உங்கள் மீன் தொட்டிக்கான பயனுள்ள வழிகாட்டுதலைப் பெறுங்கள்.",

            marketplaceDescription:
                "மீன் ஆரோக்கியம் மற்றும் தொட்டி பராமரிப்புக்கான பொருட்களைக் கண்டறியுங்கள்.",

            askAssistant: "Aqua-Sense AI-யிடம் கேளுங்கள்",
            typeMessage: "உங்கள் செய்தியை உள்ளிடவும்...",
            send: "அனுப்பவும்",
            listening: "கேட்கிறது...",

            products: "தயாரிப்புகள்",
            addToCart: "வண்டியில் சேர்க்கவும்",
            viewCart: "வண்டியைப் பார்க்கவும்",

            profile: "சுயவிவரம்",
            settings: "அமைப்புகள்"
        }
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}