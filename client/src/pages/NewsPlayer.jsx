import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { getNewsById, getPersonalizedNews, recordPlay } from "../services/news";

export default function NewsPlayer() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { preference } = useAuth();
  const [item, setItem] = useState(null);
  const [playlist, setPlaylist] = useState(location.state?.playlist || []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [{ data: news }, feed] = await Promise.all([
          getNewsById(id),
          playlist.length ? Promise.resolve(null) : getPersonalizedNews(),
        ]);
        setItem(news);
        if (feed) setPlaylist(feed.data.items || []);
      } catch {
        setError("This story could not be opened.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const current = useMemo(
    () => playlist.find((entry) => entry._id === id) || item,
    [playlist, id, item]
  );

  const onPlayStart = async (news) => {
    try {
      await recordPlay(news._id, { progress: 0, completed: false });
    } catch {
      // playback tracking should not block audio
    }
  };

  if (loading) return <LoadingSpinner label="Opening player" />;
  if (error) {
    return (
      <div className="p-6">
        <p className="text-rose-300">{error}</p>
        <button type="button" className="mt-4 text-violet-300" onClick={() => navigate("/news")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <AudioPlayer
      item={current}
      playlist={playlist.length ? playlist : current ? [current] : []}
      narrator={preference?.narrator}
      onClose={() => navigate("/news")}
      onChangeTrack={(next) =>
        navigate(`/news/${next._id}`, { state: { playlist }, replace: true })
      }
      onPlayStart={onPlayStart}
    />
  );
}
