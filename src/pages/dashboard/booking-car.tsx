// Dashboard Booking Car removed — this stub redirects to main dashboard
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardBookingCar: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);
  return null;
};

export default DashboardBookingCar;
