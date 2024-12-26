import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SpecialOffersModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const offerEndDate = new Date().getTime() + 20 * 24 * 60 * 60 * 1000; // 20 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerEndDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("OFFER EXPIRED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="p-8 rounded-lg shadow-lg max-w-md w-full relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/ad8a7a119879081.60f70c7ef2c1d.gif')", // Replace with your background image URL
        }}
      >
        <div className="absolute inset-0 bg-opacity-60 rounded-lg"></div>
        <div className="relative z-10 flex justify-between items-center mb-6">
          <h3 className="text-3xl font-medium text-white">SPECIAL OFFER!</h3>
          <button onClick={onClose} className="text-white text-3xl">
            <AiOutlineClose />
          </button>
        </div>

        {/* Countdown Timer */}
        <div className="relative z-10 text-4xl font-medium text-white text-center mb-6">
          {timeLeft !== "OFFER EXPIRED" ? (
            <p className="bg-black bg-opacity-50 inline-block py-2 px-4 rounded-md">{timeLeft}</p>
          ) : (
            <p className="text-red-500">OFFER EXPIRED</p>
          )}
        </div>

        {/* Offer Description */}
        <p className="relative z-10 text-xl text-white mt-4 text-center font-semibold">
          GET 20% OFF ON ALL BOOKINGS MADE THIS MONTH!
        </p>
      </div>
    </div>
  );
};

export default SpecialOffersModal;
