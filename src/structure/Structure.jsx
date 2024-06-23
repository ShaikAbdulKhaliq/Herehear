import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Qr from "../components/QR/Qr.jsx";
import EnterDetails from "../components/Authentication/EnterDetails/EnterDetails.jsx";
import Interest from "../components/Authentication/Interest/Interest.jsx";
import AllEvents_V1 from "../components/Dashboard/AllEvents_V1/AllEvents_V1.jsx";
import Default_Dashboard from "../components/Dashboard/Default_Dashboard/Default_Dashboard.jsx";
import Itinerary from "../components/Dashboard/Itinerary/Itinerary.jsx";
import EventDetails from "../components/Dashboard/EventDetails/EventDetails.jsx";
import Choose_Seats from "../components/Dashboard/choose_seats/Choose_Seats.jsx";
import SelectSeats from "../components/Dashboard/choose_seats/SelectSeats.jsx";
import FillDetails from "../components/Dashboard/PaymentSection/FillDetails/FillDetails.jsx";
import Payment from "../components/Dashboard/PaymentSection/CardPayment/Payment.jsx";
import Ticket from "../components/Dashboard/PaymentSection/Ticket/Ticket.jsx";
import ConfirmedTickets from "../components/Dashboard/PaymentSection/ConfirmedTicket/ConfirmedTickets.jsx";
import Favourites from "../components/Dashboard/Favourites/Favourites.jsx";
import Radio_List from "../components/Dashboard/Radio_List/Radio_List.jsx";
import Profile from "../components/Profile/Profile.jsx";
import Edit_Profile from "../components/Profile/Edit_Profile/Edit_Profile.jsx";
import Login from "../components/Authentication/Login/Login.jsx";
import AudioExperience from "../components/Dashboard/AudioExperience/AudioExperience.jsx";
import AddDetails from "../components/TourGuide/AddDetails/AddDetails.jsx";
import Guide from "../components/TourGuide/Guide.jsx";
import TourGuideProfile from "../components/TourGuide/TourGuideProfile.jsx";
import GuideProfileDetails from "../components/TourGuide/GuideProfileDetails.jsx";
import SeatCategory from "../components/Dashboard/choose_seats/SelectSeatType/SeatCategory.jsx";
import ProtectedRoute from "./Protected_routes/Protected_routes.jsx";
import EventSelection from "../components/Authentication/InterestPage1/EventSelection.jsx";
import Tourguide from "../components/TourGuide/Tourguide.jsx";
import Createproduct from "../components/TourGuide/Createproduct/Createproduct.jsx";
import Productpricing from "../components/TourGuide/Productpricing/Productpricing.jsx";
import Meetingpoint from "../components/TourGuide/Meetingpoint/Meetingpoint.jsx";
import Availability from "../components/TourGuide/Availability/Availability.jsx";
import Uploadingdocs from "../components/TourGuide/Uploaddocs/Uploadingdocs.jsx";
import { ToastContainer } from "react-toastify";
import SplashScreen from "../components/EntryPage/SplashScreen.jsx";
import Loader from "../components/EntryPage/LoaderScreen.jsx";
import ErrorScreen from "../components/EntryPage/ErrorScreen.jsx";

const Structure = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/Loader" element={<Loader />} />
          <Route path="*" element={<ErrorScreen />} />
          <Route path="/qr" element={<Qr />} />

          <Route path="/authentication">
            <Route path="login" element={<Login />} />
            <Route path="details" element={<EnterDetails />} />
            <Route path="interest" element={<Interest />} />
            <Route path="interestspage" element={<EventSelection />} />
          </Route>

          <Route path="/dashboard">
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <Default_Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="alleventsv1"
              element={
                <ProtectedRoute>
                  <AllEvents_V1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="itinerary"
              element={
                <ProtectedRoute>
                  <Itinerary />
                </ProtectedRoute>
              }
            />
            <Route
              path="eventdetails"
              element={
                <ProtectedRoute>
                  <EventDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="choose_seats"
              element={
                <ProtectedRoute>
                  <Choose_Seats />
                </ProtectedRoute>
              }
            />
            <Route
              path="seat_category"
              element={
                <ProtectedRoute>
                  <SeatCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="select_seats"
              element={
                <ProtectedRoute>
                  <SelectSeats />
                </ProtectedRoute>
              }
            />
            <Route
              path="fill_details"
              element={
                <ProtectedRoute>
                  <FillDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="fill_payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="ticket"
              element={
                <ProtectedRoute>
                  <Ticket />
                </ProtectedRoute>
              }
            />
            <Route
              path="confirmed_tickets"
              element={
                <ProtectedRoute>
                  <ConfirmedTickets />
                </ProtectedRoute>
              }
            />
            <Route
              path="favourites"
              element={
                <ProtectedRoute>
                  <Favourites />
                </ProtectedRoute>
              }
            />
            <Route
              path="radio_list"
              element={
                <ProtectedRoute>
                  <Radio_List />
                </ProtectedRoute>
              }
            />
            <Route
              path="audio_experience"
              element={
                <ProtectedRoute>
                  <AudioExperience />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="tour-guide"
            element={
              <ProtectedRoute>
                <Tourguide />
              </ProtectedRoute>
            }
          >
            <Route
              path="add-details"
              element={
                <ProtectedRoute>
                  <AddDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-product"
              element={
                <ProtectedRoute>
                  <Createproduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="product-pricing"
              element={
                <ProtectedRoute>
                  <Productpricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="meeting-point"
              element={
                <ProtectedRoute>
                  <Meetingpoint />
                </ProtectedRoute>
              }
            />
            <Route
              path="availability"
              element={
                <ProtectedRoute>
                  <Availability />
                </ProtectedRoute>
              }
            />
            <Route
              path="upload-docs"
              element={
                <ProtectedRoute>
                  <Uploadingdocs />
                </ProtectedRoute>
              }
            />
            <Route
              path="guide"
              element={
                <ProtectedRoute>
                  <Guide />
                </ProtectedRoute>
              }
            />
            <Route
              path="guide_profile"
              element={
                <ProtectedRoute>
                  <TourGuideProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="guide_details"
              element={
                <ProtectedRoute>
                  <GuideProfileDetails />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="profile">
            <Route path="" element={<Profile />} />
            <Route path="edit_profile" element={<Edit_Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Structure;
