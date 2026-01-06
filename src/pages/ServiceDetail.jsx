import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/services";
import Header from "../components/Header";
import { useBooking } from "../context/BookingContext";

const phone = "9999999999";
const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const service = services.find(s => s.id === Number(id));

  const [selectedVariant, setSelectedVariant] = useState(
    service && service.variants && service.variants[0] || null
  );

  if (!service) {
    navigate("/");
    return null;
  }

  // 🔥 SINGLE SOURCE OF TRUTH FOR BOOKING
  const startAndRedirectBooking = (variant) => {
    if (!variant) return;
    setSelectedVariant(variant);
    startBooking(service, variant);
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-28">
      <Header showBack title={service.name} />

      <div className="container mx-auto px-4 py-6">

        {/* ================= SERVICE HEADER ================= */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <div className="flex gap-4">
            <img
              src={service.image}
              alt={service.name}
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <span className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                {service.category}
              </span>
              <h2 className="text-2xl font-bold">{service.name}</h2>
              <p className="text-sm text-neutral-600 mt-1">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        {/* ================= VARIANTS ================= */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Choose Your Option</h3>

          <div className="space-y-5">
            {service.variants.map((v) => {
              const isSelected = selectedVariant && selectedVariant.id === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`border-2 rounded-2xl overflow-hidden cursor-pointer transition
                    ${isSelected
                      ? "border-pink-600 ring-4 ring-pink-100"
                      : "border-neutral-200 hover:border-pink-300"
                    }`}
                >
                  {/* ================= MOBILE ================= */}
                  <div className="block sm:hidden">
                    <div
                      className="relative h-64"
                      onClick={() => startAndRedirectBooking(v)}
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                      <span className="absolute top-3 right-3 bg-pink-600 text-white px-3 py-1 rounded-full font-bold">
                        ${v.price}
                      </span>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-lg">{v.name}</h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        Duration: {v.duration}
                      </p>

                     

                      <div className="flex gap-3 w-full mt-4">
                        {/* CALL BUTTON */}
                        <a
                          href={`tel:${phone}`}
                          className="flex-1 flex items-center justify-center gap-2
                                     bg-[#c2186a] text-white
                                     py-3 rounded-xl
                                     font-semibold text-sm
                                     shadow-md hover:opacity-90 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Call
                        </a>

                        {/* WHATSAPP BUTTON */}
                        <a
                          href={`https://wa.me/91${phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2
                                     bg-[#25D366] text-white
                                     py-3 rounded-xl
                                     font-semibold text-sm
                                     shadow-md hover:opacity-90 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                          >
                            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.82.834 5.445 2.27 7.65L2 30l6.5-2.18A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.2 0-4.245-.65-5.96-1.77l-.43-.28-3.85 1.29 1.29-3.75-.28-.44A11.43 11.43 0 014.5 16C4.5 9.66 9.66 4.5 16 4.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5z"/>
                          </svg>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ================= DESKTOP ================= */}
                  <div className="hidden sm:flex gap-4 p-4">
                    <div
                      className="w-48 h-56 rounded-2xl overflow-hidden"
                      onClick={() => startAndRedirectBooking(v)}
                    >
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-bold">{v.name}</h4>
                        <p className="text-sm text-neutral-600 mt-2">
                          Duration: {v.duration}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-bold text-pink-600">
                          ${v.price}
                        </span>
                      </div>

                      <div className="flex gap-4 w-full mt-6">
                        {/* CALL BUTTON */}
                        <a
                          href={`tel:${phone}`}
                          className="flex-1 flex items-center justify-center gap-3
                                     bg-[#c2186a] text-white
                                     py-4 rounded-2xl
                                     font-semibold text-lg
                                     shadow-md hover:opacity-90 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {phone}
                        </a>

                        {/* WHATSAPP BUTTON */}
                        <a
                          href={`https://wa.me/91${phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3
                                     bg-[#25D366] text-white
                                     py-4 rounded-2xl
                                     font-semibold text-lg
                                     shadow-md hover:opacity-90 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                          >
                            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.82.834 5.445 2.27 7.65L2 30l6.5-2.18A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.2 0-4.245-.65-5.96-1.77l-.43-.28-3.85 1.29 1.29-3.75-.28-.44A11.43 11.43 0 014.5 16C4.5 9.66 9.66 4.5 16 4.5S27.5 9.66 27.5 16 22.34 27.5 16 27.5z"/>
                          </svg>
                          Whatsapp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetail;
