import { useState } from "react";
import "./faqSection.css";
import { handleKeyPress } from "../accessiblity/handleKeyPressed";

const faqs = [
    {
        question: "What is this platform about?",
        answer: "This platform allows users to explore museums across Wales while promoting Welsh culture, heritage, and accessibility. It provides information about museums, events, and educational resources related to Welsh language and history."
    },
    {
        question: "Can I explore museums across Wales?",
        answer: "Yes. Users can browse and explore different museums across Wales through the 'All Museums' section. The list of museums will continue to grow as more museums are added to the platform."
    },
    {
        question: "Can I see museum events?",
        answer: "Yes. The platform provides information about events related to museums across Wales. This allows users to discover exhibitions, activities, and special events happening at different museums."
    },
    {
        question: "Does the platform provide personalised recommendations?",
        answer: "Yes. The system includes AI-powered recommendations that help users discover museums based on their interests, preferences, or other contextual factors." 
    },
    {
        question: "What does the AI chatbot do?",
        answer: "The AI chatbot can answer questions about museums in Wales, help users navigate the platform, provide suggestions on where to visit, and assist users in discovering museums that match their interests." 
    },
    {
        question: "Can the AI recommend places based on how I feel?",
        answer: "Yes. If a user is unsure where to go or would like suggestions, they can talk with the AI chatbot. Based on the conversation or mood expressed by the user, the AI can recommend museums or places that may be suitable to visit." 
    },
    {
        question: "How does the platform support accessibility?",
        answer: "The platform aims to support accessibility by providing helpful information and guidance when available. Users can also ask the AI chatbot questions related to accessibility when planning a museum visit." 
    },
    {
        question: "What if I need to confirm accessibility before visiting a museum?",
        answer: "If you require specific accessibility information, it is recommended to contact the museum directly. Museums usually provide phone numbers or email contacts so visitors can confirm accessibility features before visiting." 
    },
    {
        question: "Can the AI chatbot replace contacting the museum?",
        answer: "No. The AI chatbot provides general guidance and suggestions. For the most accurate and up-to-date accessibility information, users should contact the museum directly."
    },
    {
        question: "Does the platform include tools related to Welsh culture and language?",
        answer: "Yes. The platform includes educational tools - Library related to Welsh language, culture, and heritage. These tools aim to help users learn more about Wales while exploring its museums and historical resources." 
    },
    {
        question: "Are all museums in Wales included?",
        answer: "Not all museums are currently included. The platform will continue to update and expand its database to include more museums across Wales over time."
    },
    {
        question: "Who is this platform designed for?",
        answer: "The platform is designed for anyone interested in exploring museums in Wales, including tourists, students, and local visitors. It is particularly focused on making museum discovery easier and more accessible for a wide range of users." 
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleItem = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <h2 className="faq-title">FAQs</h2>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            
                            
                            key={index}
                            className={`faq-item ${activeIndex === index ? "active" : ""
                                }`}
                        >
                            <div
                                tabIndex="0"
                                className="faq-question"
                                onClick={() => handleKeyPress(toggleItem(index))    }
                                onKeyDown={(e) => handleKeyPress(e, () => toggleItem(index))}
                            >
                                {faq.question}
                                <span className="faq-icon">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </div>

                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;