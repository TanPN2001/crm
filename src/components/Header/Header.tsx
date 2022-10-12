import './Header.css';
import { BsEye } from 'react-icons/bs';
import { GoSearch } from 'react-icons/go';
import { MdOutlineHelp } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { IoNotificationsSharp } from 'react-icons/io5';
import { BiChevronDown, BiCircle } from 'react-icons/bi';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Tippy from '@tippyjs/react/headless';

function Header() {
    const navigate = useNavigate();

    const [showResult, setShowResult] = useState(false);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleLogout = async () => {
        if (localStorage) {
            await localStorage.clear();
        }
        navigate('/login');
    };

    return (
        <div className="WrapperHeader">
            <div className="LogoHeader">
                <img
                    className="ImgLogoHeader"
                    src="//bizweb.dktcdn.net/assets/admin/images/icon-svg/sub_logosapo-02.svg"
                    alt="SapoWeb"
                    title="SapoWeb"
                ></img>
                <BsEye color="white" size={20} className="BsEyeLogoHeader"></BsEye>
            </div>
            <div className="SearchHeader">
                <div className="InputHeader">
                    <GoSearch color="black" size={16}></GoSearch>
                    <input placeholder="Search..."></input>
                </div>
                <div className="HelpHeader QuickShot">
                    <MdOutlineHelp className="IconHeader" size={25}></MdOutlineHelp>
                    <div>Help</div>
                </div>
                <div className="CommentsHeader QuickShot">
                    <FaHeart className="IconHeader" size={20}></FaHeart>
                    <label>Comments</label>
                </div>
                <div className="ProfileHeader QuickShot">
                    <img
                        className="ImgProfileHeader"
                        alt="Error display picture"
                        src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/298732448_3462673400633789_2464192759066806713_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=mSSt8mFKEzQAX8_SO5w&_nc_ht=scontent.fhan14-3.fna&oh=00_AT9off3ftfAnbOANer9MiJ0HwFBh9fEq9xkmIjhvTJPRXA&oe=63406480"
                    ></img>
                    <div className="ProfileHeaderSelect">
                        <div className="ProfileHeaderSelect">Pham Ngoc Tan</div>
                        <div className="ProfileHeaderSelect">Try it out</div>
                    </div>
                    <Tippy
                        interactive
                        // visible
                        render={(attrs) => (
                            <div tabIndex={-1} {...attrs}>
                                <div className="PopUpIconProfileHeaderSelect">
                                    <button onClick={handleLogout}>Login</button>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        )}
                        onClickOutside={handleHideResult}
                    >
                        <button className="IconProfileHeaderSelect ButIconProfileHeaderSelect ">
                            <BiChevronDown size={25}></BiChevronDown>
                        </button>
                    </Tippy>
                </div>
                <div className="NotifyHeader QuickShot">
                    <IoNotificationsSharp className="IconHeader" size={25}></IoNotificationsSharp>
                    <div className="NumOfNotyHeader"></div>
                </div>
            </div>
        </div>
    );
}

export default Header;
