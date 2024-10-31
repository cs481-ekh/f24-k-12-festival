"use client";

import React, { useState, useEffect } from 'react';
import { FaUniversalAccess, FaCog, FaTimes, FaSearchPlus } from 'react-icons/fa';

const translations = {
  en: {
    accessibilityOptions: "Accessibility Options",
    biggerText: "Bigger Text",
    dyslexicFont: "Dyslexic Font",
    readPage: "Read Page",
    stopReading: "Stop Reading",
    colors: "Colors",
    invertColors: "Invert Colors",
    highContrast: "High Contrast",
    brightness: "Brightness",
    contrast: "Contrast",
    language: "Language",
    resetSettings: "Reset settings",
    settings: "Settings",
  },
  es: {
    accessibilityOptions: "Opciones de Accesibilidad",
    biggerText: "Texto Más Grande",
    dyslexicFont: "Fuente para Dislexia",
    readPage: "Leer Página",
    stopReading: "Detener Lectura",
    colors: "Colores",
    invertColors: "Invertir Colores",
    highContrast: "Alto Contraste",
    brightness: "Brillo",
    contrast: "Contraste",
    language: "Idioma",
    resetSettings: "Restablecer ajustes",
    settings: "Configuraciones",
  },
  de: {
    accessibilityOptions: "Barrierefreiheit Optionen",
    biggerText: "Größerer Text",
    dyslexicFont: "Dyslexie Schriftart",
    readPage: "Seite Vorlesen",
    stopReading: "Vorlesen Stoppen",
    colors: "Farben",
    invertColors: "Farben Invertieren",
    highContrast: "Hoher Kontrast",
    brightness: "Helligkeit",
    contrast: "Kontrast",
    language: "Sprache",
    resetSettings: "Einstellungen zurücksetzen",
    settings: "Einstellungen",
  },
  fr: {
    accessibilityOptions: "Options d'Accessibilité",
    biggerText: "Texte Plus Grand",
    dyslexicFont: "Police Dyslexique",
    readPage: "Lire la Page",
    stopReading: "Arrêter la Lecture",
    colors: "Couleurs",
    invertColors: "Inverser les Couleurs",
    highContrast: "Contraste Élevé",
    brightness: "Luminosité",
    contrast: "Contraste",
    language: "Langue",
    resetSettings: "Réinitialiser les paramètres",
    settings: "Paramètres",
  },
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [textSizeLevel, setTextSizeLevel] = useState(0);
  const [brightnessLevel, setBrightnessLevel] = useState(0);
  const [contrastLevel, setContrastLevel] = useState(0);
  const [isDyslexicFont, setDyslexicFont] = useState(false);
  const [isInverted, setInverted] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [activeFeature, setActiveFeature] = useState(null);

  const toggleWidget = () => setIsOpen(!isOpen);
  const closeWidget = () => setIsOpen(false);
  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const textSizeLevels = [100, 120, 140];
  const brightnessLevels = [100, 90, 80];
  const contrastLevels = [100, 125, 150];

  const getMainContent = () => document.getElementById("mainContent");

  const increaseFontSize = () => {
    const mainContentElements = document.querySelectorAll("#mainContent, .main-content");

    setTextSizeLevel((textSizeLevel + 1) % textSizeLevels.length);
    setActiveFeature("textSize");

    mainContentElements.forEach((element) => {
      element.style.fontSize = `${textSizeLevels[textSizeLevel]}%`;
    });
  };

  const increaseBrightness = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      setBrightnessLevel((brightnessLevel + 1) % brightnessLevels.length);
      mainContent.style.filter = `brightness(${brightnessLevels[brightnessLevel]}%)`;
      setActiveFeature("brightness");
    }
  };

  const increaseContrast = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      setContrastLevel((contrastLevel + 1) % contrastLevels.length);
      mainContent.style.filter = `contrast(${contrastLevels[contrastLevel]}%)`;
      setActiveFeature("contrast");
    }
  };

  const toggleHighContrast = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      mainContent.classList.toggle("high-contrast");
      setActiveFeature("highContrast");
    }
  };

  const toggleDyslexicFont = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      setDyslexicFont(!isDyslexicFont);
      mainContent.classList.toggle("dyslexic-font");
      setActiveFeature("dyslexicFont");
    }
  };

  const toggleInvertColors = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      setInverted(!isInverted);
      mainContent.classList.toggle("invert-colors");
      setActiveFeature("invertColors");
    }
  };

  const toggleReadText = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      if (!isReading) {
        const speech = new SpeechSynthesisUtterance(mainContent.innerText);
        window.speechSynthesis.speak(speech);
        setIsReading(true);
        setActiveFeature("readText");
        speech.onend = () => setIsReading(false);
      } else {
        window.speechSynthesis.cancel();
        setIsReading(false);
        setActiveFeature(null);
      }
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("preferredLanguage", selectedLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const resetSettings = () => {
    const mainContent = getMainContent();
    if (mainContent) {
      setTextSizeLevel(0);
      setBrightnessLevel(0);
      setContrastLevel(0);
      setDyslexicFont(false);
      setInverted(false);
      setIsReading(false);
      setActiveFeature(null);

      mainContent.style.fontSize = '100%';
      mainContent.style.filter = 'brightness(100%) contrast(100%)';
      mainContent.classList.remove("high-contrast", "dyslexic-font", "invert-colors");

      window.speechSynthesis.cancel();
    }
  };

  const getButtonStyle = (feature) => {
    return `p-2 rounded ${
      activeFeature === feature ? "bg-black text-white" : "bg-gray-200"
    }`;
  };

  const t = translations[language] || translations.en;

  return (
    <div>
      <button
        onClick={toggleWidget}
        className="fixed right-6 w-16 h-16 bg-black text-white rounded-full shadow-lg flex items-center justify-center"
        style={{ zIndex: 1000, bottom: '20px' }}
        aria-label={t.accessibilityOptions}
      >
        <FaUniversalAccess size={32} />
      </button>

      {isOpen && (
        <div className={`fixed top-0 ${window.innerWidth < 768 ? "left-0 w-full" : "right-0 w-80"} bottom-0 bg-white p-4 rounded-lg shadow-lg z-50 overflow-y-auto`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{t.accessibilityOptions}</h3>
            <button onClick={openSettings} aria-label={t.settings}>
              <FaCog size={20} />
            </button>
            <button onClick={closeWidget} aria-label="Close">
              <FaTimes size={20} />
            </button>
          </div>

          {!isSettingsOpen && (
            <>
              <h4 className="font-semibold mb-2">{t.biggerText}</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button onClick={increaseFontSize} className={getButtonStyle("textSize")}>
                  <FaSearchPlus size={24} />
                  <span>{t.biggerText}</span>
                  <div className="flex mt-2 space-x-1">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className={`h-1 w-8 rounded-full ${index < textSizeLevel ? "bg-gray-400" : "bg-gray-200"}`}></div>
                    ))}
                  </div>
                </button>
                <button onClick={toggleDyslexicFont} className={getButtonStyle("dyslexicFont")}>
                  {t.dyslexicFont}
                </button>
                <button onClick={toggleReadText} className={getButtonStyle("readText")}>
                  {isReading ? t.stopReading : t.readPage}
                </button>
              </div>

              <h4 className="font-semibold mb-2">{t.colors}</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button onClick={toggleInvertColors} className={getButtonStyle("invertColors")}>
                  {t.invertColors}
                </button>
                <button onClick={toggleHighContrast} className={getButtonStyle("highContrast")}>
                  {t.highContrast}
                </button>
                <button onClick={increaseBrightness} className={getButtonStyle("brightness")}>
                  {t.brightness}
                </button>
                <button onClick={increaseContrast} className={getButtonStyle("contrast")}>
                  {t.contrast}
                </button>
              </div>

              <button onClick={resetSettings} className="w-full bg-black text-white p-2 rounded mt-4">
                {t.resetSettings}
              </button>
            </>
          )}

          {isSettingsOpen && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">{t.language}</h4>
              <select value={language} onChange={handleLanguageChange} className="w-full bg-gray-200 p-2 rounded">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
                <option value="fr">French</option>
              </select>
              <button onClick={closeSettings} className="mt-4 bg-black text-white p-2 rounded w-full">
                Back to Options
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
