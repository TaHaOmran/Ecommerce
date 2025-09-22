// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources= {
    en: {
      translation: {
        city: "Enter Your City",
        cityRequired: "City is required",
        invalidCity: "Enter a valid city name",
        details: "Enter Your Details",
        detailsRequired: "Details are required",
        detailsTooShort: "Details too short",
        detailsTooLong: "Details too long",
        invalidDetails: "Enter valid address details",
        phone: "Enter Your Phone",
        phoneRequired: "Phone is required",
        invalidPhone: "You must enter a valid Egyptian phone number",
        processing: "Processing...",
        payCash: "Pay with Cash",
        payVisa: "Pay with Visa",
        orderSuccess: "Successfully Ordered",
      }
    },
    ar: {
      translation: {
        city: "أدخل مدينتك",
        cityRequired: "المدينة مطلوبة",
        invalidCity: "من فضلك أدخل اسم مدينة صحيح",
        details: "أدخل التفاصيل",
        detailsRequired: "التفاصيل مطلوبة",
        detailsTooShort: "التفاصيل قصيرة جدًا",
        detailsTooLong: "التفاصيل طويلة جدًا",
        invalidDetails: "أدخل عنوانًا صحيحًا",
        phone: "أدخل رقم الهاتف",
        phoneRequired: "رقم الهاتف مطلوب",
        invalidPhone: "يجب إدخال رقم هاتف مصري صحيح",
        processing: "جاري المعالجة...",
        payCash: "الدفع نقدًا",
        payVisa: "الدفع ببطاقة فيزا",
        orderSuccess: "تم الطلب بنجاح",
      }
    }
  }
  

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
