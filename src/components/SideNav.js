import React, { useEffect, useState, useContext } from "react";
import img from "../images/tempProfile.jpg";
import { AiOutlineHome } from "react-icons/ai";
import { MdPlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { GiRegeneration, GiCubes } from "react-icons/gi";

import { PlaylistStore } from "../context/ContextProvider";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const contextStore = useContext(PlaylistStore);
  const { toggleModal } = contextStore;
  const {
    username,
    profileImage,
    email,
    accessToken,
    generatedPlaylist,
  } = contextStore.state;
  const [page, setPage] = useState("/");

  const iconStyle = accessToken ? "icon" : "icon disabled-link";

  useEffect(() => {
    if (generatedPlaylist.length > 0) {
      toggleModal();
    }
  }, [generatedPlaylist]);

  const links = [
    {
      title: "Home",
      link: "/",
      icon: <AiOutlineHome className={iconStyle} />,
    },
    {
      title: "Explore",
      link: "/explore",
      icon: <GiCubes className={iconStyle} />,
    },
    {
      title: "Playlists",
      link: "/playlists",
      icon: <MdPlaylistPlay className={iconStyle} />,
    },
    {
      title: "Generator",
      link: "/generator",
      icon: <GiRegeneration className={iconStyle} />,
    },
   
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
              accessToken={accessToken}
            />
          ))}
        </div>
      </div>

      <div className="create-playlist">
        <LinkContainer
          title="Create Playlist"
          icon={<MdPlaylistAdd className={iconStyle} />}
          link={null}
          accessToken={accessToken}
          openModal={toggleModal}
        />
      </div>
    </div>
  );
};

export default SideNav;

const LinkContainer = ({ title, icon, link, page, accessToken, openModal }) => {
  const selectedStyle = {
    background: "#554fd8",
    color: "#fff",
    boxShadow: "10px 10px 20px -11px #554fd8",
  };

  return (
    <>
      {link ? (
        <Link
          to={link}
          style={page === link ? selectedStyle : null}
          className={accessToken ? "link" : "link disabled-link"}
        >
          {icon}
          <h5>{title}</h5>
        </Link>
      ) : (
        <div
          onClick={openModal}
          className={accessToken ? "link" : "link disabled-link"}
        >
          {icon}
          <h5>{title}</h5>
        </div>
      )}
    </>
  );
};
