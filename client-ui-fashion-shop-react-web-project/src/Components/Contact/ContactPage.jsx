import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank You ${name} for Contacting Us. We will Get Back to You Soon.\n\nYour Mail Id - ${email}.\nYour Message is - ${message}`
    );
    setname("");
    setEmail("");
    setmessage("");
  };

  return (
      <>
        <div className="contactSection">
          <h2>Liên Hệ Với Chúng Tôi</h2>
          <div className="contactInfo">
            <div className="contactAddress">
              <div className="address">
                <h3>Cửa Hàng tại VIETNAM</h3>
                <p>
                  Viet Nam number 1
                </p>
              </div>
            </div>
            <div className="contactForm">
              <h3>Liên Hệ Với Chúng Tôi</h3>
              <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Tên *"
                    onChange={(e) => setname(e.target.value)}
                    required
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Địa chỉ Email *"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    rows={10}
                    cols={40}
                    placeholder="Thông điệp của bạn"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                />
                <button type="submit">Gửi</button>
              </form>
            </div>
          </div>
        </div>
      </>
  );
};

export default ContactPage;
