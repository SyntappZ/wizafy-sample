import React, { useEffect, useState } from "react";
import img from "../images/tempProfile.jpg";
import { AiOutlineHome } from "react-icons/ai";
import { MdPlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { GiRegeneration } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const [page, setPage] = useState("/");
  const links = [
    {
      title: "Home",
      link: "/",
      icon: <AiOutlineHome className="icon" />
    },
    {
      title: "Playlists",
      link: "/playlists",
      icon: <MdPlaylistPlay className="icon" />
    },
    {
      title: "Generator",
      link: "/generator",
      icon: <GiRegeneration className="icon" />
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <FiSettings className="icon" />
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
          <img src={img} alt="profile" />
        </div>
        <h4>Farzan Faruk</h4>
        <p>tomjones@gmail.com</p>
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
            />
          ))}
        </div>
      </div>

      <div className="create-playlist">
        <LinkContainer
          title="Create Playlist"
          icon={<MdPlaylistAdd className="icon" />}
          link="/createPlaylist"
          page={page}
        />
      </div>
    </div>
  );
};

export default SideNav;

const LinkContainer = ({ title, icon, link, page }) => {
  const selectedStyle = {
    background: "#554fd8",
    color: "#fff",
    boxShadow: "10px 10px 20px -11px #554fd8"
  };

  return (
    <Link
      to={link}
      style={page === link ? selectedStyle : null}
      className="link"
    >
      {icon}
      <h4>{title}</h4>
    </Link>
  );
};
