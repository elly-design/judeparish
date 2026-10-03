import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import './Chatbot.css';

const QUICK_REPLIES = [
  'Service times',
  'How do I give?',
  'Ministries',
  'Contact us'
];

const BOT_RESPONSES = {
  greeting: "Welcome to ACK St. Jude Miritini Parish Church! \n\nHow may I assist you today? You can ask about our service times, ministries, events or contact information.",

  schedule: `Weekly Service Schedule\n\n Sunday Services \n Early Morning Service: 6:00 AM – 7:30 AM\n Second Service: 8:00 AM – 9:30 AM\n Youth Service: 10:00 AM – 11:00 AM\n Main Service: 11:00 AM – 12:30 PM\n\n Monday \n Prayers: 5:30 PM – 6:30 PM\n\n Tuesday \n Home-Zonal Fellowships: 5:00 PM – 6:30 PM\n\n Wednesday \n Bible Study: 5:30 PM – 7:00 PM\n\n Thursday \n Choir Practice: 5:00 PM – 6:30 PM\n Praise & Worship: 5:30 PM – 6:00 PM\n\n Friday \n Thanksgiving Service: 5:30 PM – 6:30 PM\n\n Saturday \n Praise & Worship: 5:30 PM – 6:30 PM\n Choir Practice: 5:30 PM – 7:00 PM\n\n Would you like me to remind you of any particular day or service?`,

  contact: `Contact Information\n\n Location:\nMiritini, Mombasa, Kenya\n\n Phone:\n+254 745 002 529\n\n Emails:\n- revotieno4christ@gmail.com\n- ackstjudemiritinichurch@gmail.com`,

  ministries: `Ministries & Fellowships\n\nACK St. Jude Miritini Parish hosts vibrant ministries including:\n\n• KAMA (Men's Fellowship)\n• Mother's Union\n• KAYO (Youth Ministry)\n• Children's Ministry\n• Choir\n• Praise & Worship Team\n\nWould you like more details about any of these ministries or their meeting schedules?`,

  prayer: `Prayer Requests \n\nWe would be honored to pray with you. Please share your prayer request and our church leadership will include it in our prayers.\n\nYou can also submit prayer requests during our services or contact our prayer team directly.`,

  giving: `Giving & Donations \n\nYour generous support helps our church continue its mission and ministries. Here are the ways you can give:\n\n1. **M-Pesa Paybill:** \n   • Paybill Number: 522533\n   • Account Number: 9500066\n   • Account Name: ACK St. Jude Miritini\n\n2. **Bank Transfer:**\n   • Bank: K.C.B\n   • Account Name: ACK St. Jude Miritini\n   • Account Number: 1272160718\n   • Branch: Changamwe\n\nThank you for your generosity and support!`,

  pastoral: `Pastoral Support \n\nOur pastoral team is here to provide spiritual guidance, counseling and support.\n\nFor pastoral care, please contact:\n +254 745 002 529\n revotieno4christ@gmail.com\n\nOffice hours: Monday-Friday, 8:00 AM - 5:00 PM`,

  bibleVerse: `Bible Verse of the Day \n\n"The Lord is my light and my salvation—whom shall I fear?"\n– **Psalm 27:1**\n\nWould you like another scripture or have any questions about this verse?`,

  whatsapp: "I've opened WhatsApp for you. You can chat with our support team directly. If WhatsApp didn't open, you can reach us at +254 745 002 529 (Support Team ACK St. Jude Miritini Parish)",

  default: "I'm here to help! You can ask about our services, ministries, events or contact information. How may I assist you today?"
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to ACK St. Jude Miritini Parish Church! \n\nHow may I assist you today?",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleWhatsAppClick = () => {
    const phoneNumber = '254745002529';
    const message = 'Hello, I have a question about ACK St. Jude Miritini Parish';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const getResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('time') || text.includes('schedule') || text.includes('service')) {
      return BOT_RESPONSES.schedule;
    }
    if (text.includes('contact') || text.includes('address') || text.includes('email') || text.includes('phone')) {
      return BOT_RESPONSES.contact;
    }
    if (text.includes('ministr') || text.includes('fellowship') || text.includes('group')) {
      return BOT_RESPONSES.ministries;
    }
    if (text.includes('pray')) {
      return BOT_RESPONSES.prayer;
    }
    if (text.includes('give') || text.includes('donat') || text.includes('offer')) {
      return BOT_RESPONSES.giving;
    }
    if (text.includes('pastor') || text.includes('counsel') || text.includes('guidance')) {
      return BOT_RESPONSES.pastoral;
    }
    if (text.includes('bible') || text.includes('verse') || text.includes('scripture')) {
      return BOT_RESPONSES.bibleVerse;
    }
    if (text.includes('whatsapp') || text.includes('chat with us') || text.includes('talk to someone')) {
      handleWhatsAppClick();
      return BOT_RESPONSES.whatsapp;
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return BOT_RESPONSES.greeting;
    }
    return BOT_RESPONSES.default;
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = getResponse(text);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I encountered an error. Please try again later.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus the input when the chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 10);
  };

  return (
    <div className={`cb-container ${isOpen ? 'cb-open' : ''}`}>
      {isOpen ? (
        <div className="cb-window" role="dialog" aria-label="Chat with ACK St. Jude Miritini">
          <div className="cb-header">
            <div className="cb-header-title">
              <img
                src="/images/cropped-LOGOmsa.png"
                alt="ACK St. Jude Miritini Logo"
                className="cb-logo"
              />
              <div className="cb-header-text">
                <h3>ACK St. Jude Miritini</h3>
                <span className="cb-status"><span className="cb-status-dot" />Online</span>
              </div>
            </div>
            <div className="cb-header-actions">
              <button
                className="cb-whatsapp"
                onClick={handleWhatsAppClick}
                title="Chat with us on WhatsApp"
                aria-label="Chat with us on WhatsApp"
              >
                <FaWhatsapp />
              </button>
              <button className="cb-close" onClick={toggleChat} aria-label="Close chat">
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="cb-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`cb-message ${message.isUser ? 'cb-message-user' : 'cb-message-bot'}`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="cb-message cb-message-bot cb-typing" aria-label="Typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isLoading && messages.length === 1 && (
            <div className="cb-quick-replies">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  className="cb-quick-reply"
                  onClick={() => sendQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSendMessage} className="cb-form">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              required
              disabled={isLoading}
              aria-label="Type your message"
            />
            <button type="submit" disabled={isLoading} aria-label="Send message">
              {isLoading ? (
                <div className="cb-spinner"></div>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </form>
        </div>
      ) : (
        <button className="cb-launcher" onClick={toggleChat} aria-label="Open chat">
          <FaComments />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
