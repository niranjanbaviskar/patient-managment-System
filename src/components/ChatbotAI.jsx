import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import image1 from "../assets/doc1.png"; // Update the path if the image is in a different folder

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  const questionsAndAnswers = [
    {
      question: "What is the first symptom of the flu?",
      answer: "The first symptom of the flu is often a sudden fever or chills, followed by body aches, fatigue, and a dry cough."
    },
    {
      "question": "What are the common symptoms of a cold?",
      "answer": "The common symptoms of a cold include a runny or stuffy nose, sneezing, sore throat, and mild fatigue."
    },
    {
      "question": "What is the first symptom of the flu?",
      "answer": "The first symptom of the flu is often a sudden fever or chills, followed by body aches, fatigue, and a dry cough."
    },
    {
      "question": "What are the early signs of diabetes?",
      "answer": "The early signs of diabetes include increased thirst, frequent urination, unexplained weight loss, and fatigue."
    },
    {
      "question": "What are the symptoms of high blood pressure?",
      "answer": "High blood pressure often has no symptoms but can include headaches, shortness of breath, and nosebleeds in severe cases."
    },
    {
      "question": "What are the main symptoms of pneumonia?",
      "answer": "The main symptoms of pneumonia include a high fever, chills, chest pain, cough with mucus, and difficulty breathing."
    },
    {
      "question": "What are the key symptoms of COVID-19?",
      "answer": "The key symptoms of COVID-19 include fever, cough, fatigue, loss of taste or smell, and difficulty breathing in severe cases."
    },
    {
      "question": "What triggers asthma attacks?",
      "answer": "Asthma attacks can be triggered by allergens like dust, pollen, smoke, cold air, or physical activity."
    },
    {
      "question": "What is the most common symptom of tuberculosis?",
      "answer": "The most common symptom of tuberculosis is a persistent cough lasting more than 2 weeks, often with blood-streaked sputum."
    },
    {
      "question": "What are the symptoms of food poisoning?",
      "answer": "Symptoms of food poisoning include nausea, vomiting, stomach cramps, diarrhea, and fever."
    },
    {
      "question": "What are the warning signs of a heart attack?",
      "answer": "The warning signs of a heart attack include chest pain, shortness of breath, pain in the left arm, and sweating."
    },
    {
      "question": "What are the early symptoms of arthritis?",
      "answer": "Early symptoms of arthritis include joint pain, stiffness, swelling, and decreased range of motion."
    },
    {
      "question": "What are the symptoms of meningitis?",
      "answer": "The symptoms of meningitis include a stiff neck, fever, headache, nausea, and sensitivity to light."
    },
    {
      "question": "What are the common symptoms of malaria?",
      "answer": "The common symptoms of malaria include fever, chills, sweating, headache, and muscle pain."
    },
    {
      "question": "What are the early signs of liver disease?",
      "answer": "Early signs of liver disease include fatigue, yellowing of the skin and eyes (jaundice), and abdominal swelling."
    },
    {
      "question": "What are the symptoms of kidney stones?",
      "answer": "Symptoms of kidney stones include severe pain in the back or side, blood in urine, nausea, and vomiting."
    },
    {
      "question": "What are the first symptoms of dengue fever?",
      "answer": "The first symptoms of dengue fever include high fever, headache, joint pain, and a rash."
    },
    {
      "question": "What are the symptoms of a migraine?",
      "answer": "The symptoms of a migraine include severe throbbing headache, nausea, vomiting, and sensitivity to light and sound."
    },
    {
      "question": "What are the early signs of thyroid problems?",
      "answer": "The early signs of thyroid problems include unexplained weight changes, fatigue, and changes in heart rate."
    },
    {
      "question": "What are the symptoms of a stroke?",
      "answer": "The symptoms of a stroke include sudden numbness or weakness in the face, arm, or leg, confusion, and trouble speaking."
    },
    {
      "question": "What are the symptoms of anemia?",
      "answer": "The symptoms of anemia include fatigue, pale skin, shortness of breath, and dizziness."
    },
    {
      question: "What is the treatment for flu",
      answer: "Treatment includes rest, hydration, over-the-counter pain relievers, and antiviral drugs if prescribed by a doctor."
    },
    {
      question: "What is a common cause of fever in adults",
      answer: "A common cause of fever in adults is an infection, such as the flu or cold."
    },
    {
      question: "What are the symptoms of COVID-19",
      answer: "Common symptoms include fever, cough, shortness of breath, fatigue, and loss of taste or smell."
    },
    {
      question: "What is dehydration?",
      answer: "Dehydration is when the body doesn't have enough water to carry out its normal functions."
    },
    {
      question: "What are the symptoms of a heart attack?",
      answer: "Symptoms may include chest pain, shortness of breath, sweating, nausea, and pain radiating to the arm, neck, or jaw."
    },
    {
      question: "What is high blood pressure?",
      answer: "High blood pressure, also called hypertension, occurs when the force of blood against the artery walls is consistently too high."
    },
    {
      question: "What is diabetes?",
      answer: "Diabetes is a condition that occurs when the body cannot properly process sugar (glucose) in the blood."
    },
    {
      question: "What causes headaches?",
      answer: "Headaches can be caused by various factors such as dehydration, stress, lack of sleep, or underlying conditions like migraines."
    },
    {
      question: "What are the symptoms of asthma?",
      answer: "Symptoms of asthma include wheezing, coughing, shortness of breath, and chest tightness, especially during physical activity or at night."
    },
    {
      question: "How can I prevent the common cold?",
      answer: "Prevention includes washing hands frequently, avoiding close contact with sick individuals, and maintaining a healthy immune system."
    },
    {
      question: "What is the difference between a cold and the flu?",
      answer: "Flu symptoms are generally more severe and can include fever, muscle aches, and fatigue, while cold symptoms are usually milder, like a runny nose or sore throat."
    },
    {
      question: "What is cholesterol?",
      answer: "Cholesterol is a type of fat found in the blood that is necessary for building cells, but high levels can increase the risk of heart disease."
    },
    {
      question: "What causes nausea?",
      answer: "Nausea can be caused by a variety of factors such as indigestion, motion sickness, infections, and even anxiety."
    },
    {
      question: "What is the best way to prevent dehydration?",
      answer: "The best way to prevent dehydration is to drink plenty of fluids, especially water, and to avoid excessive caffeine and alcohol intake."
    },
    {
      question: "What are the symptoms of an allergic reaction?",
      answer: "Symptoms can include itching, swelling, hives, shortness of breath, and in severe cases, anaphylaxis."
    },
    {
      question: "What is the flu vaccine?",
      answer: "The flu vaccine is an injection that helps protect against the seasonal flu virus by stimulating the body to produce immunity."
    },
    {
      question: "What is a stroke?",
      answer: "A stroke occurs when the blood supply to part of the brain is interrupted, leading to brain damage. Symptoms can include sudden weakness, speech difficulties, and vision problems."
    },
    {
      question: "What are the symptoms of depression?",
      answer: "Symptoms include persistent sadness, loss of interest in activities, fatigue, sleep disturbances, and changes in appetite."
    },
    {
      question: "What is arthritis?",
      answer: "Arthritis is an inflammation of the joints that causes pain, swelling, stiffness, and reduced range of motion."
    },
    {
      question: "What is insomnia?",
      answer: "Insomnia is a sleep disorder characterized by difficulty falling asleep, staying asleep, or waking up too early."
    },
    {
      question: "How can I improve my immune system?",
      answer: "Eating a balanced diet, exercising regularly, getting enough sleep, and managing stress can all help strengthen the immune system."
    }
  ];
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  function handleAnswerSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Check if the answer is correct
    const currentQA = questionsAndAnswers.find(
      (item) => item.question.toLowerCase() === currentQuestion.toLowerCase()
    );

    if (currentQA) {
      setChatHistory((prev) => [
        ...prev,
        { type: "question", content: currentQuestion },
        { type: "answer", content: currentQA.answer },
      ]);
      setCorrectAnswer(true);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { type: "question", content: currentQuestion },
        { type: "answer", content: "Sorry, I don't know the answer to that." },
      ]);
      setCorrectAnswer(false);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: `url(${image1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="header" style={{ textAlign: "center", padding: "12px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "black" }}>
          HealthCare AI
        </h1>
      </header>

      <div
        className="chat-container"
        ref={chatContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          margin: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0)",
        }}
      >
        {chatHistory.length === 0 ? (
          <div>
            <h2>Welcome to HealthCare AI!</h2>
            <p>Ask anything, and I'll do my best to help you!</p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type}`}>
              <div
  style={{
    display: "flex",
    justifyContent: chat.type === "question" ? "flex-start" : "flex-end", // Align question to left, answer to right
    padding: "12px",
    borderRadius: "16px",
    marginBottom: "16px",
    maxWidth: "40%",
    backgroundColor: chat.type === "question" ? "#ff7f50" : "#edf2f7",
    color: chat.type === "question" ? "#000000" : "#2d3748",
    alignSelf: "flex-start", // Keeps the question at the left and answer at the right
    marginLeft: chat.type === "answer" ? "auto" : "0", // Push answers to the right
  }}
>
  <ReactMarkdown>{chat.content}</ReactMarkdown>
</div>

            </div>
          ))
        )}
        {generatingAnswer && <div>Thinking...</div>}
      </div>

      <form
        onSubmit={handleAnswerSubmit}
        style={{
          display: "flex",
          padding: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
        }}
      >
        <textarea
          style={{
            flex: 1,
            border: "1px solid black",
            borderRadius: "8px",
            padding: "12px",
            resize: "none",
          }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything..."
        ></textarea>
        <button
          type="submit"
          style={{
            marginLeft: "8px",
            padding: "12px 16px",
            backgroundColor: "#4299e1",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Send
        </button>
      </form>

      {correctAnswer !== null && (
        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "1.2rem" }}>
          {correctAnswer ? (
            <p style={{ color: "green" }}></p>
          ) : (<p style={{ color: "red" }}></p>
            
          )}
        </div>
      )}
    </div>
  );
}

export default App;