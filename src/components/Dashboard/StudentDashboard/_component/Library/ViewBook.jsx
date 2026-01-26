import React, { useState } from "react";
import {
  IoArrowBack,
  IoBookmarkOutline,
  IoSettingsOutline,
  IoVolumeMedium,
} from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetReadStorySingleQuery } from "../../../../../redux/api/authApi";

const ViewBook = () => {
  const { "read-book": storyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: storyData,
    isLoading: isFetching,
    isError,
  } = useGetReadStorySingleQuery(storyId);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState("");
  const [wordDefinition, setWordDefinition] = useState(null);
  const [isDictionaryLoading, setIsDictionaryLoading] = useState(false);

  // Use title from state if available, otherwise fallback
  const storyTitle = location.state?.title || "Story Reader";

  const pages = storyData?.content_pages || [];
  const totalPages = pages.length;
  const currentContent = pages[currentPageIndex] || "";

  // Handle word selection
  const handleWordClick = async (word) => {
    const cleanWord = word
      .replace(/[.,!?;:'"()]/g, "")
      .toLowerCase()
      .trim();

    if (!cleanWord || cleanWord.length < 2) return;

    setSelectedWord(cleanWord);
    setIsDictionaryLoading(true);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`,
      );

      if (!response.ok) {
        throw new Error("Word not found");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const wordData = data[0];
        const meanings = wordData.meanings || [];

        const definition =
          meanings.length > 0 && meanings[0].definitions.length > 0
            ? meanings[0].definitions[0].definition
            : "Definition not available";

        const phonetics = wordData.phonetics?.[0]?.text || "";

        setWordDefinition({
          word: cleanWord,
          definition: definition,
          phonetics: phonetics,
          partOfSpeech: meanings[0]?.partOfSpeech || "",
          example: meanings[0]?.definitions[0]?.example || "",
        });
      }
    } catch {
      setWordDefinition({
        word: cleanWord,
        definition: "Definition not found. Try another word.",
        phonetics: "",
        partOfSpeech: "",
        example: "",
      });
    } finally {
      setIsDictionaryLoading(false);
    }
  };

  const renderContent = (content) => {
    if (!content) return null;
    return content.split(/(\s+)/).map((word, index) => {
      const cleanWord = word
        .replace(/[.,!?;:'"()]/g, "")
        .toLowerCase()
        .trim();
      const isClickable = cleanWord.length >= 2;

      return (
        <React.Fragment key={index}>
          {isClickable ? (
            <span
              className={`cursor-pointer hover:text-blue-600 hover:bg-yellow-100 px-1 rounded transition-colors ${
                selectedWord === cleanWord
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : ""
              }`}
              onClick={() => handleWordClick(word)}
              title={`Click to look up "${cleanWord}"`}
            >
              {word}
            </span>
          ) : (
            <span>{word}</span>
          )}
        </React.Fragment>
      );
    });
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setSelectedWord("");
      setWordDefinition(null);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setSelectedWord("");
      setWordDefinition(null);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium headerFont">
            Opening Story...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="text-center space-y-4">
          <p className="text-xl text-red-500 font-semibold headerFont">
            Failed to load story content.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-teal-600 text-white rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF6EA] to-[#FFFDF9]">
      <div className="w-full px-4 md:px-8 lg:w-[90vw] xl:w-[80vw] mx-auto py-6 md:py-10 lg:py-16 space-y-6 lg:space-y-10">
        <header className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <IoArrowBack />
          </button>

          <h2 className="font-semibold text-gray-800 text-base md:text-xl headerFont">
            {storyTitle}
          </h2>

          <div className="flex gap-3">
            <button className="p-2 bg-white shadow-lg rounded-full hover:text-pink-500 transition-colors">
              <IoBookmarkOutline size={24} />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:text-teal-500 transition-colors">
              <IoSettingsOutline />
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-auto lg:h-[calc(100vh-250px)]">
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 leading-relaxed text-gray-800 flex-1 lg:overflow-y-auto border-4 border-white">
              <div className="space-y-6">
                <p className="text-lg md:text-2xl normalFont whitespace-pre-wrap leading-loose">
                  {renderContent(currentContent)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 sm:gap-0 headerFont">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className={`w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-white shadow-lg hover:opacity-90 transition transform active:scale-95 ${
                  currentPageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ← Previous Page
              </button>

              <span className="text-sm md:text-base font-bold text-gray-500 order-first sm:order-none bg-white px-6 py-2 rounded-full shadow-inner border border-gray-100">
                Page {currentPageIndex + 1} of {totalPages}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className={`w-full sm:w-auto px-8 py-3 rounded-full text-white shadow-lg hover:opacity-90 transition transform active:scale-95 ${
                  currentPageIndex === totalPages - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                style={{
                  background:
                    "linear-gradient(90deg, #213C2D 0%, #98D8C8 100%)",
                }}
              >
                Next Page →
              </button>
            </div>
          </div>

          <div className="w-full lg:w-80 flex flex-col space-y-6 h-auto">
            <div className="lg:sticky lg:top-6 space-y-6">
              <WordHelper
                selectedWord={selectedWord}
                wordDefinition={wordDefinition}
                isLoading={isDictionaryLoading}
                onClear={() => {
                  setSelectedWord("");
                  setWordDefinition(null);
                }}
              />
              <ReadingTip />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WordHelper = ({ selectedWord, wordDefinition, isLoading, onClear }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = () => {
    if (!selectedWord) return;

    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(selectedWord);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes("Female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Karen"),
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser.");
    }
  };

  if (!selectedWord) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-teal-50">
        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
          <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider headerFont">
            Word Helper 📘
          </h4>
        </div>

        <h3 className="text-base font-bold text-gray-800 headerFont">
          Select a word
        </h3>

        <div className="normalFont bg-teal-50/50 rounded-xl p-4 text-sm text-gray-600 border border-teal-100/50 italic">
          "Click any word in the story to explore its meaning and hear how it
          sounds!"
        </div>

        <button
          onClick={speakWord}
          disabled={!selectedWord}
          className="flex items-center gap-2 justify-center w-full rounded-full bg-gray-100 text-gray-400 py-3 text-xs headerFont"
        >
          <IoVolumeMedium />
          Hear it
        </button>

        <button className="w-full headerFont rounded-full border border-gray-200 py-3 text-xs text-gray-500 hover:bg-gray-50 transition">
          Add to Vocabulary
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5 border border-purple-50">
      <div className="flex justify-between items-center border-b border-gray-50 pb-3">
        <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider headerFont">
          Word Helper 📘
        </h4>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          ✕
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 capitalize animate-pulse">
            {selectedWord}
          </h3>
          <div className="bg-purple-50/50 rounded-xl p-4 space-y-2">
            <div className="h-3 bg-purple-200 rounded animate-pulse"></div>
            <div className="h-3 bg-purple-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-800 capitalize">
              {wordDefinition?.word || selectedWord}
            </h3>
            <span className="text-sm font-medium text-purple-400 italic">
              {wordDefinition?.partOfSpeech}
            </span>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 text-gray-700 shadow-inner border border-purple-100/50">
            <p className="text-sm leading-relaxed">
              {wordDefinition?.definition || "Definition not available"}
            </p>
            {wordDefinition?.example && (
              <p className="mt-2 text-xs text-gray-500 italic border-l-2 border-purple-200 pl-2">
                "{wordDefinition.example}"
              </p>
            )}
          </div>
        </div>
      )}

      <button
        onClick={speakWord}
        className="flex items-center gap-2 justify-center w-full rounded-full bg-gradient-to-r from-[#213C2D] to-[#98D8C8] text-white py-4 text-sm font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95"
      >
        <IoVolumeMedium size={20} />
        {isSpeaking ? (
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
            <div
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        ) : (
          "Listen"
        )}
      </button>

      <button className="w-full rounded-full border border-purple-200 py-3 text-sm font-semibold text-purple-600 hover:bg-purple-50 transition-colors">
        Add to Vocabulary
      </button>
    </div>
  );
};

const ReadingTip = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3 border border-yellow-100 bg-gradient-to-b from-white to-yellow-50/30">
    <h4 className="flex items-center gap-2 font-bold text-yellow-600 headerFont text-xs uppercase tracking-widest">
      <span className="text-lg">💡</span> Reading Tip
    </h4>
    <p className="text-sm text-gray-600 normalFont leading-relaxed">
      Take your time and imagine the story in your mind. What do you think will
      happen next?
    </p>
  </div>
);

export default ViewBook;
