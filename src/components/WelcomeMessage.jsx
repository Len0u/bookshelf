import { useState, useEffect } from "react";
import "../css/WelcomeMessage.css";

function WelcomeMessage() {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      
      let greetingText = "";
      if (hour < 12) {
        greetingText = "Good morning";
      } else if (hour < 17) {
        greetingText = "Good afternoon";
      } else {
        greetingText = "Good evening";
      }
      
      setGreeting(greetingText);
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="welcome-message">
      <h1 className="greeting">{greeting}, Bookworm! 📚</h1>
      <p className="time">{time}</p>
      <p className="welcome-text">Ready to dive into your next great read?</p>
    </div>
  );
}

export default WelcomeMessage; 