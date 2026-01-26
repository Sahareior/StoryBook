import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, ScrollRestoration } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import {
  ArrowLeft,
  Check,
  Copy,
  Lightbulb,
  LightbulbIcon,
  RotateCcw,
  Save,
  Send,
  Share2,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import owlAnimation from "../../assets/owl2.json";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  useCreateStoryMutation,
  useOwlbertChatMutation,
  useRealtimeCheckMutation,
} from "../../redux/api/authApi";
import { toast } from "react-hot-toast";

export default function StoryCreatorStudio() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isValidType = ["image/png", "image/jpeg", "image/jpg"].includes(
      file.type,
    );
    if (!isValidType) {
      alert("Only PNG and JPG files are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }
    setUploadedImage(file);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState(location.state?.title || "");
  const [content, setContent] = useState(location.state?.story || "");
  const [showEmoji, setShowEmoji] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Story Helper! 🌟 I can help you write amazing stories. What would you like to write about today?",
      sender: "ai",
    },
  ]);
  const [savedStories, setSavedStories] = useState(() => [
    {
      id: 1,
      title: "The Rainbow Adventure",
      timestamp: Date.now() - 172800000,
    },
    {
      id: 2,
      title: "My Pet Dragon",
      timestamp: Date.now() - 432000000,
    },
  ]);

  const [createStory, { isLoading: isSaving }] = useCreateStoryMutation();
  const [owlbertChat, { isLoading: isChatting }] = useOwlbertChatMutation();
  const [realtimeCheck, { isLoading: isChecking }] = useRealtimeCheckMutation();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const messageIdRef = useRef(2);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const quickQuestions = [
    "Help me start a story about space",
    "What's a good word for happy?",
    "Give me ideas for a character",
    "How should my story end?",
  ];

  const handleSendMessage = async (text) => {
    if (!text.trim() || isChatting) return;

    const userMsg = { id: messageIdRef.current++, text: text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setTimeout(scrollToBottom, 50);

    try {
      const response = await owlbertChat({
        message: text,
        context: content || "Writing a story",
      }).unwrap();

      const aiMsg = {
        id: messageIdRef.current++,
        text:
          response.reply ||
          "I'm not sure how to help with that, but keep writing!",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMsg]);
      setTimeout(scrollToBottom, 50);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg = {
        id: messageIdRef.current++,
        text: "Oops! I'm having a little trouble connecting. Please try again in a bit! 🦉",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const getWordCount = (text) => {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };

  const handleRealtimeCheck = async (text, setter) => {
    // Detect punctuation at the end of the input (ignoring trailing spaces)
    const punctuationRegex = /[.!?]\s*$/;
    if (!punctuationRegex.test(text)) return;

    // Extract the last sentence to check
    // We split by punctuation but keep it, then trim
    const sentences = text.split(/(?<=[.!?])\s*/);
    const lastSentence =
      sentences[sentences.length - 1] || sentences[sentences.length - 2];

    if (!lastSentence || lastSentence.length < 5) return;

    try {
      const response = await realtimeCheck({ text: lastSentence }).unwrap();

      if (response.corrections && response.corrections.length > 0) {
        let fixedSentence = lastSentence;

        response.corrections.forEach((corr) => {
          // Replace original with suggestion (case insensitive for simpler matching)
          const regex = new RegExp(`\\b${corr.original}\\b`, "gi");
          fixedSentence = fixedSentence.replace(regex, corr.suggestion);
        });

        if (fixedSentence !== lastSentence) {
          // Update the full text state with the fixed sentence
          const updatedText = text.replace(lastSentence, fixedSentence);
          setter(updatedText);
          toast.success("Owlbert polished your sentence! ✨", {
            icon: "🦉",
            duration: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Realtime check error:", error);
    }
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    handleRealtimeCheck(val, setTitle);
  };

  const handleContentChange = (e) => {
    const val = e.target.value;
    setContent(val);
    handleRealtimeCheck(val, setContent);
  };

  const handleClear = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setTitle("");
    setContent("");
    setChatInput("");
    setMessages([
      {
        id: 1,
        text: "Hi! I'm your Story Helper! 🌟 I can help you write amazing stories. What would you like to write about today?",
        sender: "ai",
      },
    ]);
    messageIdRef.current = 2;
    setShowClearConfirm(false);
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please provide both a title and content for your story!");
      return;
    }
    setShowShareToast(true);
  };

  const handleCopyLink = () => {
    const link = "https://storybook.app/share/story-123";
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please provide both a title and content for your story!");
      return;
    }

    try {
      const response = await createStory({
        title: title,
        content: content,
      }).unwrap();

      toast.success("Story saved successfully! ✨");

      // Prepend the new story to the list
      const newStory = {
        id: response.id || Date.now(),
        title: response.title,
        timestamp: Date.now(),
      };

      setSavedStories((prev) => [newStory, ...prev]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Save error:", error);
      toast.error(
        error?.data?.message || "Failed to save story. Please try again.",
      );
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFF0F5] to-white p-4 md:p-8 lg:p-20">
      <ScrollRestoration />
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 lg:gap-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors flex-shrink-0"
          >
            <ArrowLeft color="#364153" />
          </button>
          <WandSparkles size={32} className="md:w-10 md:h-10" color="#FFB6C1" />
          <h1 className="text-gray-800 text-lg md:text-xl lg:text-2xl headerFont font-bold">
            Story Creator Studio
          </h1>
        </div>
        <div className="flex headerFont gap-2 md:gap-4 justify-start lg:justify-between flex-wrap w-full lg:w-auto">
          <button
            onClick={handleClear}
            className="px-4 py-2 md:px-7 bg-white rounded-full shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] outline outline-2 outline-offset-[-2px] outline-sky-300 transition-colors hover:bg-sky-50 flex items-center gap-2 text-gray-800 text-xs md:text-sm font-bold"
          >
            <RotateCcw size={16} color="#2D3748" />
            Clear
          </button>
          <button
            style={{
              background:
                "linear-gradient(90.49deg, #FFB6C1 0.57%, #FFDAB9 99.28%)",
            }}
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 md:px-7 bg-gradient-to-br from-[#FFE87C] to-[#FFDAB9] rounded-full shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] transition-all hover:shadow-md hover:brightness-105 flex items-center gap-2 text-gray-800 text-xs md:text-sm font-bold ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <Save size={16} color="#2D3748" />
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              background:
                "linear-gradient(90deg, #213C2D -0.36%, #98D8C8 100%)",
            }}
            onClick={handlePublish}
            className="px-4 py-2 md:px-7 bg-gradient-to-br from-[#87CEEB] to-[#98D8C8] rounded-full shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] transition-all hover:shadow-md hover:brightness-105 flex items-center gap-2 text-white text-xs md:text-sm font-bold"
          >
            <Share2 size={16} color="#ffffff" />
            Publish
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor */}
        <div className="col-span-1 lg:col-span-8 rounded-2xl shadow-sm bg-white border">
          <div className="p-4 md:p-6 pb-2">
            <input
              placeholder="Give your story a title…"
              value={title}
              onChange={handleTitleChange}
              className="w-full headerFont border-b pb-2 focus:outline-none text-neutral-950/50 text-base md:text-xl font-bold"
            />
          </div>

          <div className="p-4 md:p-6 pt-0 relative">
            {isChecking && (
              <div className="absolute top-0 right-6 flex items-center gap-2 text-xs text-teal-600 font-bold animate-pulse">
                <Sparkles size={12} /> Owlbert is checking...
              </div>
            )}
            <textarea
              placeholder="Once upon a time…"
              value={content}
              onChange={handleContentChange}
              className="min-h-[300px] normalFont md:min-h-[420px] w-full resize-none text-gray-700 text-base md:text-lg font-normal focus:outline-none bg-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 31px, #E2E8F0 32px)",
                backgroundSize: "100% 32px",
                lineHeight: "32px",
              }}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              {/* Emoji */}
              <div className="relative mt-2 sm:mt-4">
                <button
                  className="text-xs text-gray-600 font-bold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center gap-2 headerFont"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <Sparkles size={16} color="#4A5565" /> Add Stickers & Emojis{" "}
                  {showEmoji ? (
                    <IoMdArrowDropdown size={20} />
                  ) : (
                    <IoMdArrowDropup size={20} />
                  )}
                </button>

                {showEmoji && (
                  <div className="absolute z-10 mt-2">
                    <EmojiPicker
                      onEmojiClick={(e) => setContent((prev) => prev + e.emoji)}
                    />
                  </div>
                )}
              </div>

              <div className="text-right text-xs md:text-base font-normal text-gray-500 mt-2 headerFont">
                {getWordCount(content)} lines
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          <div>
            <div className="rounded-2xl bg-gradient-to-br from-[#87CEEB] to-[#98D8C8] shadow-sm">
              <div className="p-6 space-y-3 flex flex-col items-center text-center">
                <DotLottieReact
                  data={owlAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ width: 150, height: 120 }}
                />
                <p className="text-white text-base font-bold headerFont">
                  Hi! I'm Owlbert!
                </p>
                <p className="text-white text-base font-normal normalFont">
                  Your friendly writing assistant
                </p>
                <div className="w-full bg-white/20 rounded-2xl inline-flex flex-col justify-start items-start p-4 gap-1">
                  <p className="justify-start text-white text-xs font-bold headerFont">
                    Need help?
                  </p>
                  <p className="w-full justify-start text-white text-sm font-normal normalFont">
                    I can suggest ideas, help you spell words, or give you
                    inspiration!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles size={20} color="#7C3AED" />
            <p className="text-gray-700 text-sm font-normal headerFont">
              Story Helper
            </p>
          </div>
          {/* Chatbox */}
          <div className="w-full h-[340px] normalFont bg-white rounded-[20px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] outline outline-2 outline-offset-[-2px] outline-black/10 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-6 ${
                      msg.sender === "user"
                        ? "bg-[#213C2D]/80 text-white rounded-2xl rounded-tr-sm shadow-sm"
                        : "bg-slate-200 text-gray-700 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="mt-4">
                  <p className="text-xs text-slate-500 mb-3 ml-1">
                    Quick questions:
                  </p>
                  <div className="flex flex-col gap-2">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="w-fit text-left px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-gray-700 transition-colors border border-black/5"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isChatting && (
                <div className="flex justify-start">
                  <div className="bg-slate-200 text-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-black/5">
              <div className="flex gap-2 items-center bg-white rounded-2xl outline outline-2 outline-offset-[-2px] outline-black/10 px-2 py-1 focus-within:outline-[#213C2D]/50 transition-all">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSendMessage(chatInput)
                  }
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm text-gray-700 placeholder-slate-400 focus:outline-none bg-transparent"
                />
                <button
                  onClick={() => handleSendMessage(chatInput)}
                  className="w-10 h-10 flex items-center justify-center bg-[#213C2D] hover:bg-[#213C2D]/80 rounded-xl shadow-sm transition-colors"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Card 1 */}
        <div className="p-7 bg-white rounded-3xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] outline outline-4 outline-offset-[-4px] outline-amber-200/30 inline-flex flex-col justify-start items-start gap-4">
          <div className="flex items-center gap-2">
            <Lightbulb color="#FFD700" />
            <h1 className="text-gray-800 text-base font-bold headerFont">
              Upload image
            </h1>
          </div>
          <div
            className="w-full normalFont p-4 bg-gradient-to-b from-[#FFF8E6] to-[#FFF0F5] rounded-2xl inline-flex flex-col justify-start items-center cursor-pointer hover:brightness-95 transition"
            onClick={handleImageDivClick}
          >
            <Upload color="#99A1AF" strokeWidth={3} />
            <p className="justify-start text-gray-700 text-sm font-normal leading-6">
              Upload Story Image
            </p>
            <p className="justify-start text-gray-700 text-xs font-normal leading-6">
              PNG, JPG files (Max 10MB)
            </p>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {uploadedImage && (
              <p className="mt-2 text-green-600 text-xs font-bold">
                {uploadedImage.name} selected
              </p>
            )}
          </div>
          <button className="self-stretch text-xs headerFont h-10 w-full bg-gradient-to-b from-amber-200 to-orange-200 rounded-full shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] flex justify-center items-center text-gray-800 font-bold leading-6 hover:brightness-105 transition-all">
            {uploadedImage ? "Uploaded" : "Upload"}
          </button>
        </div>
        {/* Card 2 */}
        <div className="p-7 bg-white rounded-3xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] outline outline-4 outline-offset-[-4px] outline-emerald-200/30  inline-flex flex-col justify-start items-start gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-gray-800 text-base font-bold headerFont">
              Quick Tips 📝
            </h1>
          </div>
          <div className="flex flex-col items-start justify-center gap-3 normalFont">
            <div className="flex items-center gap-2">
              <div className="justify-start text-sky-300 text-base font-bold leading-6">
                •
              </div>
              <div className="justify-start text-gray-600 text-sm font-normal leading-5">
                Start with "Once upon a time..."
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="justify-start text-emerald-200 text-base font-bold leading-6">
                •
              </div>
              <div className="justify-start text-gray-600 text-sm font-normal leading-5">
                Describe what you see and feel
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="justify-start text-red-200 text-base font-bold leading-6">
                •
              </div>
              <div className="justify-start text-gray-600 text-sm font-normal leading-5">
                Give your characters fun names
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="justify-start text-amber-200 text-base font-bold leading-6">
                •
              </div>
              <div className="justify-start text-gray-600 text-sm font-normal leading-5">
                Don't forget a happy ending!
              </div>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="w-full p-6 bg-white rounded-3xl shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.10)] outline outline-4 outline-offset-[-4px] outline-[#FFEAED] inline-flex flex-col justify-start items-start gap-3">
          <div className="w-full flex items-center justify-between">
            <h1 className="justify-start text-gray-800 text-xs xl:text-base headerFont font-bold leading-7">
              My Saved Stories
            </h1>
            <p className="text-gray-800 normalFont text-sm xl:text-base font-bold">
              <a href="/myStories">View All</a>
            </p>
          </div>
          {savedStories.map((story) => (
            <div
              key={story.id}
              className="w-full p-3 bg-[#4A5565]/5 rounded-2xl inline-flex flex-col justify-start items-start"
            >
              <p className="self-stretch justify-start text-[#4A5565] text-xs font-bold leading-5 truncate headerFont">
                {story.title}
              </p>
              <p className="self-stretch justify-start normalFont text-[#4A5565] text-xs font-normal leading-4">
                Last edited{" "}
                {story.timestamp ? getTimeAgo(story.timestamp) : "Just now"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Confirmation Toast */}
      {showClearConfirm && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 z-50 flex flex-col items-center gap-3">
          <p className="text-gray-800 font-bold text-sm">
            Are you sure you want to clear everything?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-1.5 rounded-xl text-gray-600 hover:bg-gray-50 font-bold text-xs border border-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmClear}
              className="px-4 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-600 font-bold text-xs shadow-sm transition-colors"
            >
              Yes, Clear All
            </button>
          </div>
        </div>
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 z-50 flex flex-col items-center gap-3 w-[90vw] max-w-xs sm:w-80">
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-800 font-bold text-sm">
              Share your story! 🚀
            </p>
            <button
              onClick={() => setShowShareToast(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full bg-slate-50 p-2 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 truncate flex-1 select-all">
              https://storybook.app/share/story-123
            </p>
            <button
              onClick={handleCopyLink}
              className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              {isCopied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
