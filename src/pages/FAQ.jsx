import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How long do your pickles last?",
      answer: "Our homemade pickles have a natural shelf life of 6-12 months when stored properly. Since we don't use artificial preservatives, always use a clean, dry spoon and store them in a cool, dry place. Refrigeration is recommended after opening."
    },
    {
      question: "Are there any artificial preservatives?",
      answer: "Absolutely not! We believe in 100% natural and authentic processes. We use natural preservatives like mustard oil, sesame oil, and salt, just like the traditional recipes."
    },
    {
      question: "What is your delivery timeline?",
      answer: "We typically process orders within 1-2 business days. Standard delivery within India takes 3-5 business days. You will receive a tracking link via email once your order is dispatched."
    },
    {
      question: "Do you accept returns or offer refunds?",
      answer: "Due to the perishable nature of our products, we do not accept returns. However, if your order arrives damaged or you receive the wrong item, please contact us within 48 hours of delivery with photos, and we will issue a replacement or refund."
    },
    {
      question: "Can I customize the spice level?",
      answer: "Currently, our recipes are perfected to a specific authentic taste and we do not offer custom spice levels. However, we have different products catering to various spice tolerances—from sweet & mild lemon pickle to fiery garlic pickle."
    }
  ];

  return (
    <div className="faq-page section-padding">
      <div className="container">
        <div className="faq-header text-center fade-in glassmorphism" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products, shipping, and policies.</p>
        </div>

        <div className="faq-list fade-in glassmorphism" style={{animationDelay: '0.2s', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
