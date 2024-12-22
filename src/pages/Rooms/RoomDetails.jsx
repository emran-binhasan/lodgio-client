import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { format } from "date-fns"; // For date formatting
import DatePicker from "react-datepicker"; // Install `react-datepicker` for the date picker
import "react-datepicker/dist/react-datepicker.css";

const RoomDetails = () => {
  const param = useParams();
  const id = param.id;
  const roomData = useLoaderData();

  const {
    hotelName,
    roomName,
    pricePerNight,
    features,
    amenities,
    roomFeatures,
    extraServices,
    imageUrl,
    description,
    reviews,
    availability,
  } = roomData;

  // State for modal and date selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date to proceed with the booking.");
      return;
    }

    // Simulate a booking API call
    console.log({
      id,
      roomName,
      selectedDate: format(selectedDate, "yyyy-MM-dd"),
    });
    
    alert("Room booked successfully!");
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Image Section */}
      <div className="mb-6">
        <img
          src={imageUrl}
          alt={`${roomName}`}
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Room Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-2">{roomName}</h1>
          <p className="text-gray-500 text-sm mb-4">{hotelName}</p>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <p className="text-gray-600 text-sm mb-4">
            <span>{features.guests} Guests</span> ·{" "}
            <span>{features.size} Room Size</span> ·{" "}
            <span>{features.type}</span> · <span>{features.bedType}</span>
          </p>

          {/* Amenities */}
          <h2 className="text-2xl font-semibold mb-4">Room Amenities</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <h2 className="text-2xl font-semibold mb-4">Room Features</h2>
          <ul className="space-y-4 mb-6">
            {roomFeatures.map((feature, index) => (
              <li key={index} className="text-gray-700">
                <strong>{feature.title}:</strong> {feature.description}
              </li>
            ))}
          </ul>

          {/* Reviews */}
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {reviews?.length > 0 ? (
            <ul className="space-y-4 mb-6">
              {reviews?.map((review, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-md">
                  <p className="text-gray-800">{review.comment}</p>
                  <span className="text-sm text-gray-500">
                    - {review.userName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews available for this room.</p>
          )}
        </div>

        {/* Booking Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Reserve <span className="text-gray-500">From ${pricePerNight}/night</span>
          </h2>
          <button
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            onClick={() => setIsModalOpen(true)}
            disabled={!availability}
          >
            {availability ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
            <p className="text-gray-700 mb-2">
              <strong>Room:</strong> {roomName}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Hotel:</strong> {hotelName}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price Per Night:</strong> ${pricePerNight}
            </p>
            <label htmlFor="booking-date" className="block text-gray-600 mb-2">
              Select Booking Date
            </label>
            <DatePicker
              id="booking-date"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <div className="flex justify-between items-center mt-6">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;