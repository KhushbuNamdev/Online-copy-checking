import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePic from "../assets/profilep.jpg";
import "../styles/global.css";
import { getProfileThunk } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, profile, loading } = useSelector((state) => state.auth);

  const profileRef = useRef(null);

  useEffect(() => {
    if (token && !profile) {
      dispatch(getProfileThunk(token));
    }
  }, [token, profile, dispatch]);

  // ✅ close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        navigate(-1); // or navigate("/dashboard")
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-overlay">
      <div className="profile-container" ref={profileRef}>
        <div className="profile-box-page">
          <div className="profile-inner">
            <img src={profilePic} alt="Profile" className="profile-img-large" />

            <h2>{profile?.name || "No Name Found"}</h2>
            <p>{profile?.email || "No Email Found"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}