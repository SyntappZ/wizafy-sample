import React, { useEffect, useState, useContext } from "react";
import img from "../images/tempProfile.jpg";
import { AiOutlineHome } from "react-icons/ai";
import { MdPlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { GiRegeneration, GiCubes } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { PlaylistStore } from "../context/ContextProvider";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const contextStore = useContext(PlaylistStore);
  const { username, profileImage, email, signedIn } = contextStore.state;
  const [page, setPage] = useState("/");
  const iconStyle = signedIn ? "icon" : "icon disabled-link";
  const links = [
    {
      title: "Home",
      link: "/",
      icon: <AiOutlineHome className={iconStyle} />
    },
    {
      title: "Explore",
      link: "/explore",
      icon: <GiCubes className={iconStyle} />
    },
    {
      title: "Playlists",
      link: "/playlists",
      icon: <MdPlaylistPlay className={iconStyle} />
    },
    {
      title: "Generator",
      link: "/generator",
      icon: <GiRegeneration className={iconStyle} />
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <FiSettings className={iconStyle} />
    }
  ];

  let location = useLocation();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setPage(location.pathname);
    }
    return () => {
      mounted = false;
    };
  }, [location]);

  return (
    <div className="nav-container">
      <div className="profile-wrap">
        <div className="picture-wrap">
          <img src={profileImage ? profileImage : img} alt="profile" />
        </div>
        <h4>{username}</h4>
        <p>{email}</p>
      </div>
      <div className="page-navigator">
        <div className="links">
          {links.map((link, i) => (
            <LinkContainer
              title={link.title}
              icon={link.icon}
              link={link.link}
              page={page}
              key={i}
              signedIn={signedIn}
            />
          ))}
        </div>
      </div>

      <div className="create-playlist">
        <LinkContainer
          title="Create Playlist"
          icon={<MdPlaylistAdd className={iconStyle} />}
          link="/createPlaylist"
          page={page}
          signedIn={signedIn}
        />
      </div>
    </div>
  );
};

export default SideNav;

const LinkContainer = ({ title, icon, link, page, signedIn }) => {
  const selectedStyle = {
    background: "#554fd8",
    color: "#fff",
    boxShadow: "10px 10px 20px -11px #554fd8"
  };

  return (
    <Link
      to={link}
      style={page === link ? selectedStyle : null}
      className={signedIn ? "link" : "link disabled-link"}
    >
      {icon}
      <h4>{title}</h4>
    </Link>
  );
};
