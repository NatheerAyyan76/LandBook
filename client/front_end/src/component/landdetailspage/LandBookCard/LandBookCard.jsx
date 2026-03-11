import React, { useEffect, useMemo, useState } from 'react';
import './LandBookCard.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../../utils/apiBase";

export default function LandBookCard({ land: landProp }) {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (landProp) {
      setLand(landProp);
      return;
    }
    if (!id) return;

    const fetchLand = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API_BASE}/api/v1/lands/${id}`);
        setLand(res.data?.data?.land ?? null);
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || "Failed to load land");
      } finally {
        setLoading(false);
      }
    };

    fetchLand();
  }, [id, landProp]);

  const ownerName = useMemo(() => {
    const first = land?.firstName || "";
    const last = land?.lastName || "";
    const name = `${first} ${last}`.trim();
    return name || "Owner";
  }, [land]);

  return (
    <div className="contact-container-card">
      <div className="contact-card">
        {loading && <p>Loading...</p>}
        {!!error && <p style={{ color: "crimson" }}>{error}</p>}

        {land && (
          <>
            <img
              src={land.userPhoto || `${import.meta.env.BASE_URL}lands/profile-circle.png`}
              alt={ownerName}
              className="profile-pic"
            />

            <div className="info-card-details1">
              <div className="content1">
                <h3>{ownerName}</h3>
                {land.email ? <p><a href={`mailto:${land.email}`}>{land.email}</a></p> : null}
                <p>
                  {land.city ? <span>{land.city}</span> : null}
                  {land.price != null ? <span> · {land.price} $</span> : null}
                </p>
              </div>
            </div>

            <div className="bottom-button">
              <button
                className="button-readmore"
                type="button"
                onClick={() => alert("Booking flow not implemented yet")}
              >
                Book the land
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}