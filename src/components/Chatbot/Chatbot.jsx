import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaTimes, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Welcome to ACK St. Jude Miritini Parish Church! 🙏\n\nHow may I assist you today? You can ask about our service times, ministries, events or contact information.", 
      isUser: false 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const formRef = useRef(null);

  const quickReplies = [
    "Service Times",
    "Contact Info",
    "Ministries",
    "Prayer Request",
    "Giving",
    "Chat on WhatsApp"
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = '254745002529';
    const message = 'Hello, I have a question about ACK St. Jude Miritini Parish';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const botResponses = {
    greeting: "Welcome to ACK St. Jude Miritini Parish Church! 🙏\n\nHow may I assist you today? You can ask about our service times, ministries, events or contact information.",
    
    schedule: `📅 **Weekly Service Schedule**\n\n**Sunday Services**\n⛪ Early Morning Service: 6:00 AM – 7:30 AM\n⛪ Second Service: 8:00 AM – 9:30 AM\n👥 Youth Service: 10:00 AM – 11:00 AM\n🙏 Main Service: 11:00 AM – 12:30 PM\n\n**Monday**\n🙏 Prayers: 5:30 PM – 6:30 PM\n\n**Tuesday**\n🏠 Home-Based Fellowships: 5:00 PM – 6:30 PM\n\n**Wednesday**\n📖 Bible Study: 5:30 PM – 7:00 PM\n\n**Thursday**\n🎵 Choir Practice: 5:00 PM – 6:30 PM\n🎶 Praise & Worship: 5:30 PM – 6:00 PM\n\n**Friday**\n🙌 Thanksgiving Service: 5:30 PM – 6:30 PM\n\n**Saturday**\n🎶 Praise & Worship: 5:30 PM – 6:30 PM\n🎵 Choir Practice: 5:30 PM – 7:00 PM\n\nWould you like me to remind you of any particular day or service?`,

    contact: `**Contact Information**\n\n📍 **Location:**\nMiritini, Mombasa, Kenya\n\n📞 **Phone:**\n+254 745 002 529\n\n📧 **Emails:**\n- revotieno4christ@gmail.com\n- ackstjudemiritinichurch@gmail.com`,

    ministries: `**Ministries & Fellowships**\n\nACK St. Jude Miritini Parish hosts vibrant ministries including:\n\n• KAMA (Men's Fellowship)\n• Mother's Union\n• KAYO (Youth Ministry)\n• Children's Ministry\n• Choir\n• Praise & Worship Team\n\nWould you like more details about any of these ministries or their meeting schedules?`,

    prayer: `**Prayer Requests** 🙏\n\nWe would be honored to pray with you. Please share your prayer request and our church leadership will include it in our prayers.\n\nYou can also submit prayer requests during our services or contact our prayer team directly.`,

    giving: `**Giving & Donations** 💝\n\nYour generous support helps our church continue its mission and ministries. Here are the ways you can give:\n\n1. **M-Pesa Paybill:** \n   • Business No: 123456\n   • Account: Donation\n\n2. **Bank Transfer:**\n   • Bank: [Bank Name]\n   • Account Name: ACK St. Jude Miritini\n   • Account Number: [Account Number]\n   • Branch: [Branch Name]\n\nThank you for your generosity and support!`,

    pastoral: `**Pastoral Support** ✝️\n\nOur pastoral team is here to provide spiritual guidance, counseling and support.\n\nFor pastoral care, please contact:\n📞 +254 745 002 529\n📧 revotieno4christ@gmail.com\n\nOffice hours: Monday-Friday, 8:00 AM - 5:00 PM`,

    bibleVerse: `**Bible Verse of the Day** 📖\n\n*"The Lord is my light and my salvation—whom shall I fear?"*\n– **Psalm 27:1**\n\nWould you like another scripture or have any questions about this verse?`,

    default: "I'm here to help! You can ask about our services, ministries, events or contact information. How may I assist you today?"
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Process user input and generate appropriate response
      const userMessageLower = inputValue.toLowerCase();
      let response = '';

      if (userMessageLower.includes('time') || userMessageLower.includes('schedule') || userMessageLower.includes('service')) {
        response = botResponses.schedule;
      } 
      else if (userMessageLower.includes('contact') || userMessageLower.includes('address') || userMessageLower.includes('email') || userMessageLower.includes('phone')) {
        response = botResponses.contact;
      }
      else if (userMessageLower.includes('ministr') || userMessageLower.includes('fellowship') || userMessageLower.includes('group')) {
        response = botResponses.ministries;
      }
      else if (userMessageLower.includes('pray') || userMessageLower.includes('prayer')) {
        response = botResponses.prayer;
      }
      else if (userMessageLower.includes('give') || userMessageLower.includes('donat') || userMessageLower.includes('offer')) {
        response = botResponses.giving;
      }
      else if (userMessageLower.includes('pastor') || userMessageLower.includes('counsel') || userMessageLower.includes('guidance')) {
        response = botResponses.pastoral;
      }
      else if (userMessageLower.includes('bible') || userMessageLower.includes('verse') || userMessageLower.includes('scripture')) {
        response = botResponses.bibleVerse;
      }
      else if (userMessageLower.includes('whatsapp') || userMessageLower.includes('chat with us') || userMessageLower.includes('talk to someone')) {
        handleWhatsAppClick();
        response = "I've opened WhatsApp for you. You can chat with our support team directly. If WhatsApp didn't open, you can reach us at +254 745 002 529 (Support Team ACK St. Jude Miritini Parish)";
      }
      else if (userMessageLower.includes('hello') || userMessageLower.includes('hi') || userMessageLower.includes('hey')) {
        response = botResponses.greeting;
      }
      else {
        response = botResponses.default;
      }

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
  }, [messages]);

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-title">
              <img 
                src="/images/cropped-LOGOmsa.png" 
                alt="ACK St. Jude Miritini Logo" 
                className="header-logo"
              />
              <h3>ACK St. Jude Miritini</h3>
            </div>
            <div className="chat-header-actions">
              <button 
                className="whatsapp-button" 
                onClick={handleWhatsAppClick}
                title="Chat with us on WhatsApp"
              >
                <FaWhatsapp className="whatsapp-icon" />
              </button>
            <button className="close-btn" onClick={toggleChat}>
              <FaTimes />
            </button>
            </div>
          </div>
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.isUser ? 'user' : 'bot'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {!isLoading && messages.length === 1 && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button 
                  key={index} 
                  className="quick-reply-btn"
                  onClick={() => {
                    setInputValue(reply);
                    // Small delay to ensure state updates before form submission
                    setTimeout(() => {
                      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }, 10);
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
          <form ref={formRef} onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about services, ministries or contact info..."
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </form>
        </div>
      ) : (
        <button className="chatbot-button" onClick={toggleChat}>
          <FaEnvelope className="chatbot-icon" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
